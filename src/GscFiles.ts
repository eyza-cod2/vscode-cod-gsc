import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { GscFileParser, GscData, GroupType } from './GscFileParser';
import { GscCachedFilesPerWorkspace } from './GscFileCache';
import { GscFile } from './GscFile';
import { GscConfig, GscGameRootFolder } from './GscConfig';
import { LoggerOutput } from './LoggerOutput';
import { GscDiagnosticsCollection } from './GscDiagnosticsCollection';
import { Events } from './Events';
import { Issues } from './Issues';

/**
 * On startup scan every .gsc file, parse it, and save the result into memory.
 * Watch file changes and parse the files again when changed.
 * When file is opened in editor, use the editor content.
 */
export class GscFiles {

    private static cachedFiles: GscCachedFilesPerWorkspace = new GscCachedFilesPerWorkspace();

    private static statusBarItem: vscode.StatusBarItem;
    private static debugWindow: vscode.WebviewPanel | undefined = undefined;

    private static fileWatcher: vscode.FileSystemWatcher;

    
    static async activate(context: vscode.ExtensionContext) {
        LoggerOutput.log("[GscFiles] Activating");

        // Create a status bar item to show background task indicator
        GscFiles.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        GscFiles.statusBarItem.text = "$(sync~spin) Parsing GSC files...";
        GscFiles.statusBarItem.tooltip = "Background task in progress";
        GscFiles.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground'); // Example of using a theme color for error state     
        context.subscriptions.push(GscFiles.statusBarItem);

        // Commands
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFile', this.debugParsedGscFile));
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFileStructure', this.debugParsedGscFileStructure));
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugItemBeforeCursor', this.debugItemBeforeCursor));        
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedUris', this.debugParsedUris));        
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugCachedFiles', () => this.showDebugWindow(context)));    
        context.subscriptions.push(vscode.commands.registerCommand('gsc.parseAll', () => setTimeout(() => this.parseAllFiles(), 1)));

        // Handle file changes
        this.handleFileChanges(context);

        // Parse all files on startup
        await this.parseAllFiles();

        // Restore the debug window if it was open in the last session
        if (context.globalState.get('debugWindowOpen')) {
            this.showDebugWindow(context);
        }
    }


    static deactivate() {
        //console.log("Deactivating GscFiles");
        this.closeDebugWindow();
        this.fileWatcher.dispose();
    }



    /**
     * Get parsed file data from cache, opened document or file on disk.
     * If the file is in cache memory, the cached data is returned unless forceParsing is true.
     * If the file is not cached or forceParsing is true, the file is parsed and saved into cache.
     * If the file is not part of workspace, it is just parsed and not cached.
     * @param fileUri Uri of the file to get.
     * @param forceParsing If true, the file is parsed even if it is already in cache.
     * @param doParseNotify
     * @returns 
     */
    public static async getFileData(fileUri: vscode.Uri, forceParsing: boolean = false, reason: string): Promise<GscFile>  {
        
        // Get workspace folder where the file is located
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);

        LoggerOutput.log("[GscFiles] Getting parsed data of file... (" + reason + ")", vscode.workspace.asRelativePath(fileUri));
        

        // This file is not part of workspace, return it and do not cache it
        if (workspaceFolder === undefined) {
            const gsc = await this.parseFile(fileUri);
            const gscFile = new GscFile(gsc, fileUri, workspaceFolder, gsc.version);
            LoggerOutput.log("[GscFiles] Done (not part of workspace), version: " + gsc.version, fileUri.toString());
            return gscFile;
        }

        // Get data of workspace that contains cached files
        let dataOfWorkspace = this.cachedFiles.getWorkspace(workspaceFolder.uri);
        if (dataOfWorkspace === undefined) {
            dataOfWorkspace = this.cachedFiles.createNewWorkspace(workspaceFolder);
        }

        // Try to get cached file
        let fileData = dataOfWorkspace.getParsedFile(fileUri);
        let bParsed = false;
        
        // If file is not found in cache
        if (fileData === undefined) {
            // Parse the file and save it into cache
            const gsc = await this.parseFile(fileUri);
            fileData = new GscFile(gsc, fileUri, workspaceFolder, gsc.version);
            // If this is not valid gsc file, return it and do not cache it
            if (!this.isValidGscFile(fileUri.fsPath)) {
                LoggerOutput.log("[GscFiles] Done (not valid GSC file), version: " + gsc.version, fileUri.toString());
                return fileData;
            }
            dataOfWorkspace.addParsedFile(fileData);
            bParsed = true;
        
        // If cached file was found
        } else {
            // If its forced to parse (so cache is ignored)
            if (forceParsing) {
                // Parse the file and update the cache file data
                const gsc = await this.parseFile(fileUri);       
                fileData.updateData(gsc, gsc.version);
                bParsed = true;
            }
        }

        // If opened, update debug window
        this.updateDebugCachedFilesWindow();

        if (bParsed) {
            Events.GscFileParsed(fileData);
        }

        LoggerOutput.log("[GscFiles] Done, " + (bParsed ? "file was parsed" : "data loaded from cache") + ", version: " + fileData.version, vscode.workspace.asRelativePath(fileUri));

        return fileData;
    }





    public static async parseAllFiles() {
        GscFiles.statusBarItem.show();

        this.removeAllCachedFiles();

        // Parse all
        await GscFiles.parseAndCacheAllFiles();

        GscFiles.statusBarItem.hide();

        // Update diagnostics for all files
        await GscDiagnosticsCollection.updateDiagnosticsForAll("all files parsed");
    }

    /**
     * Load all .gsc files opened in editor or found in workspace file system, parse them and save them into memory.
     * @param workspaceFolder Workspace folder where to search for GSC files. If not specified, all workspace folders are searched.
     */
    public static async parseAndCacheAllFiles(workspaceFolder?: vscode.WorkspaceFolder) {
        
        if (workspaceFolder) {
            LoggerOutput.log("[GscFiles] Parsing all GSC files in workspace '" + workspaceFolder.name + "'...");
        } else {
            LoggerOutput.log("[GscFiles] Parsing all GSC files in all workspaces...");
        } 
        
        const start = performance.now();

        // Determine the search pattern based on the workspace folder
        const searchPattern = workspaceFolder ? new vscode.RelativePattern(workspaceFolder, "**/*.gsc") : "**/*.gsc";

        // Find all GSC files in the specified workspace folder or in the entire repository
        var files = await vscode.workspace.findFiles(searchPattern);

        const poolSize = 4; // Number of files to parse concurrently
        let i = 0;
        
        const parseFile = async (file: vscode.Uri, index: number) => {
            const gsc = await this.getFileData(file, true, "parsing all files");
            GscFiles.statusBarItem.text = `$(sync~spin) Parsing GSC file ${index + 1}/${files.length}...`;
            GscFiles.statusBarItem.tooltip = file.fsPath;
        };
        
        // Split the files into chunks of files
        const chunks = [];
        for (let i = 0; i < files.length; i += poolSize) {
            chunks.push(files.slice(i, i + poolSize));
        }
        
        for (const chunk of chunks) {
            await Promise.all(chunk.map((file, index) => parseFile(file, i + index)));
            i += chunk.length;
        }

        let elapsed = performance.now() - start;

        //this.debugParsedFiles(true);
        //console.log(this, "Files:", this.parsedFiles.size, "Total time:", elapsed, "Errors:", errors);

        LoggerOutput.log("[GscFiles] All GSC files parsed, files: " + files.length + ", time: " + elapsed + "ms");
    }





    /**
     * Get parsed file data by file URI
     * @param fileUri The URI of the file to get from cache
     * @param workspaceUri The URI of the workspace where the file is located. If not specified, the workspace is determined from the file URI.
     * @returns Parsed file data or undefined if not found in cache
     */
    public static getCachedFile(fileUri: vscode.Uri, workspaceUri?: vscode.Uri): GscFile | undefined {
        
        if (workspaceUri === undefined) {
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
            workspaceUri = workspaceFolder?.uri;
            if (workspaceUri === undefined) {
                return undefined;
            }
        }

        let dataOfWorkspace = this.cachedFiles.getWorkspace(workspaceUri);
 
        if (dataOfWorkspace === undefined) {
            return undefined; // Given workspace was not saved in memory yet, meaning no file in this workspace was parsed
        }

        const parsedFile = dataOfWorkspace.getParsedFile(fileUri);

        return parsedFile;
    }


    /**
     * Get all cached files.
     * @param workspaceUris Array of workspace URIs. If defined, only files from these workspaces are returned.
     * @returns Array of parsed files with their URIs.
     */
    public static getCachedFiles(workspaceUris?: vscode.Uri[]): GscFile[] {

        let allParsedFiles: GscFile[] = [];
        
        if (workspaceUris === undefined) {
            for (const workspaceData of this.cachedFiles.getAllWorkspaces()) {
                allParsedFiles = allParsedFiles.concat(workspaceData.getAllParsedFileData());
            }
        
        } else {
            for (const workspaceUri of workspaceUris) {
                const workspaceData = this.cachedFiles.getWorkspace(workspaceUri);
                if (workspaceData !== undefined) {
                    allParsedFiles = allParsedFiles.concat(workspaceData.getAllParsedFileData());
                }
            }
        }

        return allParsedFiles;
    }


    public static removeAllCachedFiles() {
        this.cachedFiles.clear();

        // If opened, update debug window
        this.updateDebugCachedFilesWindow();
    }




    /**
     * Parse file according to Uri. If the file is opened is editor, the content is used. Otherwise the file's content is read from the file system.
     * @param fileUri Uri of file to parse
     * @returns Parsed data
     */
    public static async parseFile(fileUri: vscode.Uri): Promise<GscData & {version: number}> {
        //console.log("Parsing " + vscode.workspace.asRelativePath(fileUri) + "");

        //const start = performance.now();

        // Check if the file is opened in any editor
        const openedTextDocument = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === fileUri.toString());
        
        var content: string;
        var version: number;
        if (openedTextDocument) {
            content = openedTextDocument.getText();
            version = openedTextDocument.version;
        } else {
            const fileContent = await vscode.workspace.fs.readFile(fileUri);      
            content =  Buffer.from(fileContent).toString('utf8'); // Convert the Uint8Array content to a string
            version = -1;
        }
        //const endLoading = performance.now();
        try {
            const gscData = GscFileParser.parse(content);
            //const endParsing = performance.now();
            //console.log(`  total time: ${(endParsing - start).toFixed(1)}, loading: ${(endLoading - start).toFixed(1)}, parsing: ${(endParsing - endLoading).toFixed(1)}`);
            return { ...gscData, version: version };
        } catch (error) {
            const errorNew = new Error("Error while parsing file " + vscode.workspace.asRelativePath(fileUri) + ". " + error);
            throw errorNew;
        }
    }










    /**
     * Loads all possible workspace folders where the file can be found and referenced.
     * It includes current workspace and included workspace folders via settings.
     * The workspace folders are sorted by their indexes (first being the last workspace folder in editor).
     * @param workspaceFolder Workspace folder from which the reference is made.
     * @returns Array of workspace folders where the file can be found.
     */
    public static loadReferenceableWorkspaceFolders(workspaceFolder: vscode.WorkspaceFolder): vscode.WorkspaceFolder[] {

        /*
            Define all possible locations where the file can be found
                - The workspace where the file is located
                - Included workspace folders via settings
        */

        /*
            raw
            mod - includes raw
            mappack - includes mod and raw
        */

        // Get included workspace folders from settings
        const includedWorkspaceFolderNames = GscConfig.getIncludedWorkspaceFolders(workspaceFolder.uri);
        // Convert them to WorkspaceFolder objects
        const includedWorkspaceFolders = includedWorkspaceFolderNames
            .map(folderName => vscode.workspace.workspaceFolders?.find(f => f.name === folderName))
            .filter(f => f !== undefined);
        
        // Add also this document
        includedWorkspaceFolders.push(workspaceFolder);

        // Find workspace folders that includes this workspace folder
        for (const workspaceFolder2 of vscode.workspace.workspaceFolders ?? []) {
            const cfgIncludedWorkspaceFolderNames = GscConfig.getIncludedWorkspaceFolders(workspaceFolder2.uri);
            // This workspace folder includes the referenced workspace folder
            if (cfgIncludedWorkspaceFolderNames.includes(workspaceFolder.name)) {
                includedWorkspaceFolders.push(workspaceFolder2);
            }
        }

        // Sort the folders by workspace indexes
        // By this users can specify the order of mods loaded in game
        includedWorkspaceFolders.sort((a, b) => {
            return a.index - b.index;
        });

        // Reverse to loop the last folder as first
        includedWorkspaceFolders.reverse();

        // Return unique workspace folders
        const uniqueWorkspaceFolders = Array.from(new Set(includedWorkspaceFolders));

        return uniqueWorkspaceFolders;
    }


    /**
     * Gets all possible cached GSC files thats are referenceable from the specified workspace folder.
     * It includes files from current workspace and files from included workspace folders via settings.
     * @param workspaceFolder Workspace folder from which the files are referenced.
     * @param includeReplacedFiles If true, all cached files are returned. If false, only files that would be referenced by the game are returned (e.g. there are 2 files with the same game path in 2 workspace folders, only the last workspace file will be used).
     * @returns Array of cached files that are available for the workspace folder.
     */
    public static getReferenceableCachedFiles(workspaceFolderUri: vscode.Uri, includeReplacedFiles: boolean): GscFile[] {

        const workspaceCache = this.cachedFiles.getWorkspace(workspaceFolderUri);

        // Define all possible locations where the file can be found (globally included workspace folders)
        const includedWorkspaceFolders = workspaceCache?.config.referenceableWorkspaceFolders ?? [];

        // Get all cached files from defined workspace folders
        const cachedFiles = this.getCachedFiles(includedWorkspaceFolders.map(f => f.uri));

        if (includeReplacedFiles) {
            return cachedFiles;
        } else {
            const newCachedFiles: Map<string, GscFile> = new Map();
            for (const gscFile of cachedFiles) {            
                if (!newCachedFiles.has(gscFile.gamePath)) {
                    newCachedFiles.set(gscFile.gamePath, gscFile);
                }
            }
            return Array.from(newCachedFiles.values());
        }
    }


    /**
     * Get all possible game root folders where GSC files can be found and referenced. 
     * It includes game root folder from current workspace and game root folders from included workspace folders via settings.
     * @param workspaceFolder Workspace folder from which the game root folders are referenced.
     * @returns Array of game root folders where the file can be found. The first item is the game root folder from the workspace where the file is located. Other items are game root folders from included workspace folders sorted by their indexes.
     */
    public static loadReferenceableGameRootFolders(workspaceFolder: vscode.WorkspaceFolder): GscGameRootFolder[] {
        
        // Define all possible locations where the file can be found (globally included workspace folders)
        const includedWorkspaceFolders = GscFiles.loadReferenceableWorkspaceFolders(workspaceFolder);  

        // Convert workspace folders to URIs taking game root folder into account
        const uris = includedWorkspaceFolders.map(f => GscConfig.getGameRootFolder(f.uri)!);
        
        return uris;
    }


    /**
     * Get referenced file in specified file. It tries to find the file in all possible locations where it can be found (workspace folder and included workspace folders).
     * File must be part of workspace to be found.
     * @param gscFile GSC file where the reference is located.
     * @param referencedFilePath Path in GSC file format (e.g. scripts\scriptName)
     * @returns The reference status and the parsed file data if found
     */
    public static getReferencedFileForFile(gscFile: GscFile, referencedFilePath: string): GscFileAndReferenceState | undefined {
    
        const file = this.getReferencedFilesForFile(gscFile, referencedFilePath, true);

        if (file.length > 0) {
            return file[0];
        }

        return undefined;
    }


    /**
     * Get the referenced file in specified file from all included workspaces.
     * The first item in the array is the file that should be used. Other items are files that are replaced by the first file.
     * File must be part of workspace to be found.
     * @param gscFile GSC file where the reference is located.
     * @param referencedFilePath Path in GSC file format (e.g. scripts\scriptName)
     * @returns Array of reference status and the parsed file data if found
     */
    public static getReferencedFilesForFile(gscFile: GscFile, referencedFilePath: string, exitOnFirst: boolean = false): GscFileAndReferenceState[] {
        const referencedFiles: GscFileAndReferenceState[] = [];

        if (!gscFile.workspaceFolder) {
            return referencedFiles;
        }

        for (const referenceableGameRoot of gscFile.config.referenceableGameRootFolders) {
            const gscFilePathUri = vscode.Uri.joinPath(referenceableGameRoot.uri, referencedFilePath.replace(/\\/g, '/') + ".gsc");                      
            const gsc = GscFiles.getCachedFile(gscFilePathUri, referenceableGameRoot.workspaceFolder.uri);

            if (gsc === undefined || !gsc.workspaceFolder) {
                continue; // not found or not part of workspace, try next workspace folder
            }

            var state = GscFileReferenceState.LocalFile;
            var workspace = gsc.workspaceFolder;
            if (referenceableGameRoot.workspaceFolder !== gscFile.workspaceFolder) {
                if (gsc.workspaceFolder.index > gscFile.workspaceFolder.index) {
                    state = GscFileReferenceState.IncludedWorkspaceFolderOverwritten;
                } else {
                    state = GscFileReferenceState.IncludedWorkspaceFolder;
                }
                workspace = referenceableGameRoot.workspaceFolder;
            }
            
            referencedFiles.push({gscFile: gsc, referenceState: state, referenceWorkspace: workspace});

            if (exitOnFirst) {
                break;
            }
        }

        return referencedFiles;
    }


    /**
     * Converts the file URI into game path considering game root folder (eg. "c:/mod/src/maps/mp/script.gsc" -> "maps\mp\script.gsc")
     */
    public static getGamePathFromGscFile(gscFile: GscFile): string {
        
        if (gscFile.workspaceFolder && gscFile.config.rootFolder) {
            var path = gscFile.uri.fsPath.replace(gscFile.config.rootFolder.uri.fsPath, "").replace(/\//g, '\\');
        } else {
            var path = vscode.workspace.asRelativePath(gscFile.uri).replace(/\//g, '\\');
        }

        if (path.startsWith("\\")) {
            path = path.substring(1);
        }
        path = path.replace(/\.gsc/i, "");

        return path;
    }

    /**
     * Check if the GSC file is replaced by another file in another workspace folder (reverse reference).
     */
    public static isFileReplacedByAnotherFile(gscFile: GscFile): boolean {

        const referencedFiles = this.getReferencedFileForFile(gscFile, gscFile.gamePath);

        if (referencedFiles && referencedFiles.gscFile !== gscFile) {
            return true;
        }
        return false;
    }


    /**
     * Check if the GSC file is ignored by settings.
     */
    public static isFileIgnoredBySettings(gscFile: GscFile, gamePath: string): boolean {
        if (gscFile.config.ignoredFilePaths.some(ignoredPath => gamePath.toLowerCase().startsWith(ignoredPath.toLowerCase()))) {
            return true;
        }
        return false;
    }











    private static debounceTimersDiagnostics: Map<string, NodeJS.Timeout> = new Map();

    /** Update diagnostics collection of single file or all files, will happen after 250ms if not other call happens */
    private static updateDiagnosticsDebounced(uri: vscode.Uri | undefined, debugText: string, debounceTime: number = 250) {
        const gscFile = uri ? this.getCachedFile(uri) : undefined;

        // Provided uri is not cached GSC file
        if (uri && !gscFile) {
            return;
        }

        const uriString = uri?.toString() ?? "";

        if (uri) {
            LoggerOutput.log("Debouncing diagnostics update for file (" + debounceTime + "ms, " + debugText + ")", vscode.workspace.asRelativePath(uri));
        } else {
            LoggerOutput.log("Debouncing diagnostics update for all (" + debounceTime + "ms, " + debugText + ")");
        }

        // If updating all, cancel all previous timers
        if (!uri) {
            if (this.debounceTimersDiagnostics.size > 0) {
                LoggerOutput.log("Debouncing canceling previous " + this.debounceTimersDiagnostics.size + " timers - diagnostics update for all (" + debounceTime + "ms, " + debugText + ")");
                for (const [key, value] of this.debounceTimersDiagnostics) {
                    clearTimeout(value);
                }
                this.debounceTimersDiagnostics.clear();
            }
        } else {
            // Cancel previous timer, if any
            const existingTimer = this.debounceTimersDiagnostics.get(uriString);
            if (existingTimer) {
                if (uri) {
                    LoggerOutput.log("Debouncing canceled - diagnostics update for file (" + debounceTime + "ms, " + debugText + ")", vscode.workspace.asRelativePath(uri));
                } else {
                    LoggerOutput.log("Debouncing canceled - diagnostics update for all (" + debounceTime + "ms, " + debugText + ")");
                }
                clearTimeout(existingTimer);
            }
        }

        if (gscFile) {
            this.debounceTimersDiagnostics.set(uriString, setTimeout(() => {
                LoggerOutput.log("Debouncing done (" + debounceTime + "ms elapsed) - diagnostics update for file (" + debugText + ")", vscode.workspace.asRelativePath(uri!));
                this.debounceTimersDiagnostics.delete(uriString);

                GscDiagnosticsCollection.updateDiagnosticsForFile(gscFile);
            }, debounceTime));    
        } else {
            this.debounceTimersDiagnostics.set("", setTimeout(() => {
                LoggerOutput.log("Debouncing done (" + debounceTime + "ms elapsed) - diagnostics update for all (" + debugText + ")");
                this.debounceTimersDiagnostics.delete("");
                
                void GscDiagnosticsCollection.updateDiagnosticsForAll(debugText);
            }, debounceTime));
        }
    }





    private static debounceTimersParse: Map<string, NodeJS.Timeout> = new Map();

    /** Parse single file or all files, will happen after 250ms if not other call happens */
    private static parseFileAndDiagnoseDebounced(uri: vscode.Uri | undefined, doAllDiagnosticUpdate: boolean, debugText: string, debounceTime: number = 250) {

        const uriString = uri?.toString() ?? "";

        if (uri) {
            LoggerOutput.log("Debouncing parse for file (" + debounceTime + "ms, " + debugText + ")", vscode.workspace.asRelativePath(uri));
        } else {
            LoggerOutput.log("Debouncing parse for all (" + debounceTime + "ms, " + debugText + ")");
        }

        // If updating all, cancel all previous timers
        if (!uri) {
            if (this.debounceTimersParse.size > 0) {
                LoggerOutput.log("Debouncing canceling previous " + this.debounceTimersDiagnostics.size + " timers - parse for all (" + debounceTime + "ms, " + debugText + ")");
                for (const [key, value] of this.debounceTimersParse) {
                    clearTimeout(value);
                }
                this.debounceTimersParse.clear();
            }
        } else {
            // Cancel previous timer, if any
            const existingTimer = this.debounceTimersParse.get(uriString);
            if (existingTimer) {
                if (uri) {
                    LoggerOutput.log("Debouncing canceled - parse for file (" + debounceTime + "ms, " + debugText + ")", vscode.workspace.asRelativePath(uri));
                } else {
                    LoggerOutput.log("Debouncing canceled - parse for all (" + debounceTime + "ms, " + debugText + ")");
                }
                clearTimeout(existingTimer);
            }
        }

        if (uri) {
            this.debounceTimersParse.set(uriString, setTimeout(async () => {
                LoggerOutput.log("Debouncing done (" + debounceTime + "ms elapsed) - parse file (" + debugText + ")", vscode.workspace.asRelativePath(uri!));
                this.debounceTimersParse.delete(uriString);

                await this.getFileData(uri, true, debugText);

                // Update all diagnostics if requested
                // Will be true if file is changed on disc
                if (doAllDiagnosticUpdate) {
                    // This updated file might be referenced in other files for which some errors might be solved
                    // Update diagnostics for all files (in debounced way if multiple files are changed)
                    this.updateDiagnosticsDebounced(undefined, debugText);
                
                // Update diagnostics only for this file
                // Don't do that if there is already planned update for all files
                } else {
                    const isAllDiagnosticsUpdatePlanned = this.debounceTimersDiagnostics.has("");
                    if (!isAllDiagnosticsUpdatePlanned) {
                        // This file might be referenced in other files for which some errors might be solved
                        // Its not practical to refresh all files each time file changes
                        // Instead update only files opened in editor
                        // Other files gets updated when some of the file changes on disc (is saved)
                        const openedTextDocuments = vscode.workspace.textDocuments;
                        for (const document of openedTextDocuments) {
                            // Update diagnostics for all opened files (gsc file must be cached)
                            this.updateDiagnosticsDebounced(document.uri, debugText);
                        }
                    }
                }
            }, debounceTime));    
        } else {
            this.debounceTimersParse.set("", setTimeout(async () => {
                LoggerOutput.log("Debouncing done (" + debounceTime + "ms elapsed) - parsing for all (" + debugText + ")");
                this.debounceTimersParse.delete("");
                
                await this.parseAllFiles();

            }, debounceTime));
        }
    }





    private static handleFileChanges(context: vscode.ExtensionContext) {

        this.fileWatcher = vscode.workspace.createFileSystemWatcher('**');

        // Subscribe to file system events
        this.fileWatcher.onDidDelete((uri) => this.onFileNotification("delete", uri), this, context.subscriptions);
        this.fileWatcher.onDidCreate((uri) => this.onFileNotification("create", uri), this, context.subscriptions);
        this.fileWatcher.onDidChange((uri) => this.onFileNotification("change", uri), this, context.subscriptions);
    }

    private static foldersWaitingForFileNotifications: Map<string, NodeJS.Timeout> = new Map();

    private static async onFileNotification(type: "create" | "delete" | "change", uri: vscode.Uri, manual: boolean = false) {
        try {
            // Notify about change
            Events.FileSystemChanged(type, uri, manual);

            // Delete of file / directory
            if (type === "delete") {
                LoggerOutput.logFile("[GscFiles] Detected '" + type + "' of file / folder", vscode.workspace.asRelativePath(uri));

                // Remove files from cache that starts with this path          
                // At this point it might be directory or file
                //   If it is directory, it might contain GSC files (or other files)
                //   If it is file, it might be GSC file (or other file)
                const filesToRemove = this.cachedFiles.getParsedFilesByFileOrFolderPath(uri);

                if (filesToRemove && filesToRemove.length > 0) {
                    LoggerOutput.logFile("[GscFiles]   - cached GSC files to remove: " + filesToRemove.length);
                    for (const file of filesToRemove) {
                        LoggerOutput.logFile("[GscFiles]     - " + vscode.workspace.asRelativePath(file.uri));
                    }

                    for (const file of filesToRemove) {
                        this.cachedFiles.removeCachedFile(file.uri);
                    }

                    // Re-diagnose all files, because this file might generate reference errors in other files
                    this.updateDiagnosticsDebounced(undefined, "file deleted");
                } else {
                    LoggerOutput.logFile("[GscFiles]   - no cached GSC files found to remove");
                }

            // Create or change of file / directory
            } else {
                var stat: vscode.FileStat;
                try {
                    stat = await vscode.workspace.fs.stat(uri);
                } catch (error) {
                    // Stat might fail if the file is deleted / renamed before the stat is called, or if the file is not accessible
                    // Ignore the error
                    LoggerOutput.logFile("[GscFiles] Detected '" + type + "', but unable to get file stats" + (manual ? ", manually triggered" : ""), vscode.workspace.asRelativePath(uri));
                    LoggerOutput.logFile("[GscFiles]   - error: " + error);
                    return;
                }

                const isValidGscFile = this.isValidGscFile(uri.fsPath, stat);
                const isDirectory = stat.type === vscode.FileType.Directory;
    
                LoggerOutput.logFile("[GscFiles] Detected '" + type + "'" + (isValidGscFile ? ", GSC file" : "") + (isDirectory ? ", directory" : "") + (manual ? ", manually triggered" : ""), vscode.workspace.asRelativePath(uri));
    
                if (isValidGscFile) {
                    if (type === "create") {

                        // Check if there is timer waiting for files in this directory (check path prefix)
                        for (const [pathPrefix, timer] of this.foldersWaitingForFileNotifications) {
                            if (uri.fsPath.startsWith(pathPrefix)) {
                                clearTimeout(timer);
                                this.foldersWaitingForFileNotifications.delete(pathPrefix);
                                LoggerOutput.logFile("[GscFiles]   - canceled timer for directory check");
                            }
                        }

                        LoggerOutput.logFile("[GscFiles]   - running immediately forced file parsing + debounced diagnostics update for all", vscode.workspace.asRelativePath(uri));

                        // Parse the new file
                        void GscFiles.getFileData(uri, true, "new file created");

                        // Re-diagnose all files, because this new file might solve reference errors in other files
                        this.updateDiagnosticsDebounced(undefined, "new file created");
                        
                    } else if (type === "change") {
                        LoggerOutput.logFile("[GscFiles]   - running debounced file parsing + diagnostics update for all", vscode.workspace.asRelativePath(uri));

                        // Force parsing the updated file and then update diagnostics for all files
                        this.parseFileAndDiagnoseDebounced(uri, true, "file " + vscode.workspace.asRelativePath(uri) + " changed on disc");
                    }

                // Its directory
                } else if (isDirectory) {
                    if (type === "create") {
                        // New directory might contain GSC files (if the folder was moved)
                        // There is a bug when folder is moved - create event is not called for each file in the folder
                        //   but when the folder is copied (so create folder even is also called), then create event is called for each file in the folder
                        // Solution: when folder is created, prepare timed callback that loads GSC files manually unless create event is called for each file in the folder

                        this.foldersWaitingForFileNotifications.set(uri.fsPath, setTimeout(async () => {
                            try {
                                this.foldersWaitingForFileNotifications.delete(uri.fsPath);

                                LoggerOutput.logFile("[GscFiles] Timer elapsed - check files in directory", vscode.workspace.asRelativePath(uri));

                                // Get all files in the new directory
                                const gscFileUris: vscode.Uri[] = [];
                                async function readDirectoryRecursive(directoryUri: vscode.Uri) {
                                    const files = await vscode.workspace.fs.readDirectory(directoryUri);
                                    for (const [file, fileType] of files) {
                                        const fileUri = vscode.Uri.joinPath(directoryUri, file);
                                        if (fileType === vscode.FileType.File && GscFiles.isValidGscFile(fileUri.fsPath)) {
                                            gscFileUris.push(fileUri);
                                        } else if (fileType === vscode.FileType.Directory) {
                                            await readDirectoryRecursive(fileUri); // Recursive call
                                        }
                                    }
                                }
                                await readDirectoryRecursive(uri);

                                LoggerOutput.logFile("[GscFiles]   - GSC files in directory: " + gscFileUris.length);
                                for (const gscFile of gscFileUris) {
                                    LoggerOutput.logFile("[GscFiles]     - " + vscode.workspace.asRelativePath(gscFile));
                                }

                                for (const gscFile of gscFileUris) {
                                    void this.onFileNotification("create", gscFile, true);
                                }
                            } catch (error) {
                                Issues.handleError(new Error("Error while processing files in directory. " + error));
                                throw error;
                            }
                        }, 200));

                        LoggerOutput.logFile("[GscFiles]   - added timer to check the directory for files");
                    }

                // Non-gsc file
                } else {
                    LoggerOutput.logFile("[GscFiles]   - not GSC file or directory, ignoring");
                }
            }
        } catch (error) {
            Issues.handleError(new Error("Error while processing file change notification. " + error));
            throw error;
        }
    }

    static isValidGscFile(filePath: string, stats?: vscode.FileStat): boolean {
        if (stats) {
            return stats.type === vscode.FileType.File && path.extname(filePath).toLowerCase() === '.gsc';
        } else {
            return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile() && path.extname(filePath).toLowerCase() === '.gsc';
        }
    }



    /**
     * An event that is emitted when a text document is changed. This usually happens when the contents changes but also when other things like the dirty-state changes.
     * Note: Is saved also on document save
     * @param event 
     * @returns 
     */
    public static onTextDocumentChange(event: vscode.TextDocumentChangeEvent) {

        // No changes, ignore the event (file was just saved for example)
        if (event.contentChanges.length === 0) {
            return;
        }

        const uri = event.document.uri;

        // Check if the file is GSC file
        if (!GscFiles.isValidGscFile(uri.fsPath)) {
            return;
        }

        LoggerOutput.log("[GscFiles] Document changed", vscode.workspace.asRelativePath(uri));

        // Parse the updated file and then update diagnostics only for opened text documents
        this.parseFileAndDiagnoseDebounced(uri, false, "file " + vscode.workspace.asRelativePath(uri) + " changed in editor");

    }


    static async onChangeWorkspaceFolders(e: vscode.WorkspaceFoldersChangeEvent) {

        for (const removed of e.removed) {
            LoggerOutput.log("[GscFiles] Workspace folder removed", removed.uri.toString());
            // Remove all cached files and the workspace itself
            this.cachedFiles.removeWorkspace(removed.uri);
        }

        for (const added of e.added) {
            LoggerOutput.log("[GscFiles] Workspace folder added", added.uri.toString());
            // Parse all files in new workspace
            await this.parseAndCacheAllFiles(added);
        }

        // Re-diagnose all files, because this file might generate/fix reference errors in other files
        this.updateDiagnosticsDebounced(undefined, "workspace folders changed");
    }

    public static updateConfigurationOfCachedFiles() {
        LoggerOutput.log("[GscFiles] Configuration changed, updating cached files configuration.");
        // Update configuration for GscFile before DiagnosticCollection is called
        for (const workspaceData of this.cachedFiles.getAllWorkspaces()) {
            workspaceData.updateConfiguration();
        }	
    }

    static onChangeEditorSelection(e: vscode.TextEditorSelectionChangeEvent) {
        if (this.debugWindow) {
            this.debugWindow.webview.html = this.getWebviewContent();
        }
    }






    static async debugParsedGscFile() {
        if (vscode.window.activeTextEditor === undefined) {
            return;
        }
        const gscFile = await GscFiles.getFileData(vscode.window.activeTextEditor.document.uri, false, "debugging parsed file");
        GscFiles.debugParsedFile(gscFile);
    }

    static async debugParsedGscFileStructure() {
        if (vscode.window.activeTextEditor === undefined) {
            return;
        }
        const gscFile = await GscFiles.getFileData(vscode.window.activeTextEditor.document.uri, false, "debugging parsed file structure");
        console.log(GscFileParser.debugAsString(gscFile.data.root.tokensAll, gscFile.data.root, true));
    }

    static async debugItemBeforeCursor() {
        if (vscode.window.activeTextEditor === undefined) {
            console.log("No active editor.");
            return;
        }
        const position = vscode.window.activeTextEditor.selection.active;

        console.log("Getting item before cursor position L:" + position.line + " C:" + position.character);

        const gscData = await GscFiles.getFileData(vscode.window.activeTextEditor.document.uri, false, "debugging item before cursor");
        
        // Get group before cursor
        var groupAtCursor = gscData.data.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor === undefined) {
            console.log("No item found at position.");
            return;
        }
        console.log(GscFileParser.debugAsString(gscData.data.root.tokensAll, groupAtCursor, true));

        console.log();

        const funcNameAndPath = groupAtCursor.getFunctionReferenceInfo();
        if (funcNameAndPath !== undefined) {
            console.log("Function path: " + funcNameAndPath.path);
            console.log("Function name: " + funcNameAndPath.name);
        } else {
            console.log("Function not detected.");
        }
    }

    public static debugParsedFile(gscFile: GscFile) {
        
        const gsc = gscFile.data;

        console.log("Functions:");
        gsc.functions.forEach(f => {
            console.log("  " + f.name + "(" + f.parameters.map(p => p.name).join(", ") + ")");
        });
        console.log("");
        console.log("Variable definitions:");
        gsc.levelVariablesDefinitions.forEach(v => {
            console.log("  " + v.variableReference.getTokensAsString().padEnd(30));
        });
        gsc.gameVariablesDefinitions.forEach(v => {
            console.log("  " + v.variableReference.getTokensAsString().padEnd(30));
        });
        gsc.functions.forEach(f => {
            f.localVariableDefinitions.forEach(v => {
                console.log("  " + v.variableReference.getTokensAsString().padEnd(30), "  -> " + f.name + "()");
            });
        });
    }

    public static debugParsedUris() {
        console.log("Parsed files:");

        const sortedGscFiles = [...GscFiles.getCachedFiles()].sort((a, b) => {
            return a.uri.toString().localeCompare(b.uri.toString());
        });

        sortedGscFiles.forEach((uri) => {
            console.log("  " + uri);
        });
    }
 
    public static showDebugWindow(context: vscode.ExtensionContext) {
        // If the panel already exists, reveal it
        if (this.debugWindow) {
            //this.debugWindow.reveal(vscode.ViewColumn.One);
            this.debugWindow.dispose();
            this.debugWindow = undefined;
            return;
        }

        // Otherwise, create a new panel
        this.debugWindow = vscode.window.createWebviewPanel(
            'debugWindow', 
            'Debug Window', 
            vscode.ViewColumn.Two, 
            {
                retainContextWhenHidden: true // Keeps the webview alive even when not visible
            }
        );

        //console.log("New debug window created.");

        void context.globalState.update('debugWindowOpen', true);

        this.debugWindow.webview.html = this.getWebviewContent();

        // Handle when the panel is disposed (closed)
        this.debugWindow.onDidDispose(() => {
            
            //console.log("this.debugWindow.onDidDispose", this.debugWindow);

            // If it is still defined, it means it was closed by user, otherwise it was closed by code
            if (this.debugWindow) {
                void context.globalState.update('debugWindowOpen', false);
                this.debugWindow = undefined;
            }

        }, null, context.subscriptions);
    }

    public static closeDebugWindow() {
        if (GscFiles.debugWindow) {
            //console.log("GscFiles.closeDebugWindow();");

            const debugWindow = GscFiles.debugWindow;
            GscFiles.debugWindow = undefined; // set to undefined to indicate that it was closed by code in dispose event

            debugWindow.dispose(); // close the window
        }
    }

    private static updateDebugCachedFilesWindow() {
        if (GscFiles.debugWindow) {
            GscFiles.debugWindow.webview.html = this.getWebviewContent();
        }
    }

    private static getWebviewContent(): string {
        const editor = vscode.window.activeTextEditor;

        var html = `
            <html>
            <body>
                <h1>Debug Information</h1>
        `;

        if (editor) {
            const cursor = editor.selection.active;
            const cursorRange = new vscode.Range(editor.selection.start, editor.selection.end);
            const uri = editor.document.uri;

            html += `<p>Cursor position: ${cursor.line}, ${cursor.character}      start: ${cursorRange.start.line}, ${cursorRange.start?.character}      end: ${cursorRange.end?.line}, ${cursorRange.end?.character}</p>`;


            const gscFile = GscFiles.getCachedFile(uri);

            if (gscFile === undefined) {
                html += "<p>File is not part of workspace: " + uri.fsPath + "</p>";
            } else {

                // Get group before cursor
                var groupAtCursorStart = gscFile.data.root.findGroupOnLeftAtPosition(cursorRange.start.translate(0, 1));


                if (groupAtCursorStart === undefined) {
                    html += "<p>No item found at position.</p>";
                } else {

                    if (cursorRange.isEmpty) {
                        html += "<pre>" + GscFileParser.debugGroupAsString(gscFile.data.root.tokensAll, undefined, groupAtCursorStart, 0, true, groupAtCursorStart) + "</pre>";
                        html += "<pre>----------------------------------------------------------------------------------------</pre>";
                        html += "<pre>" + GscFileParser.debugAsString(gscFile.data.root.tokensAll, groupAtCursorStart.findParentOfType(GroupType.Root)!, true, groupAtCursorStart) + "</pre>";
                    } else {
                        const parentInRange = groupAtCursorStart.getParentWithinRange(cursorRange);
                        if (parentInRange === undefined) {
                            html += "<pre>No group found in selected range</pre>";
                        } else {
                            html += "<pre>" + GscFileParser.debugGroupAsString(gscFile.data.root.tokensAll, undefined, parentInRange, 0, true) + "</pre>";
                        }
                    }             

                    html += "<br>";

                    const funcNameAndPath = groupAtCursorStart.getFunctionReferenceInfo();
                    if (funcNameAndPath !== undefined) {
                        html += "<pre>";
                        html += "Function:\n";
                        html += "   path: " + funcNameAndPath.path + "\n";
                        html += "   name: " + funcNameAndPath.name + "\n";
                        html += "</pre>";
                    } else {
                        html += "Function not detected." + "<br>";
                    }
                }
                html += "<br>";
            }

        }

        html += `${this.getCachedFiles().map(f => `${f.uri.fsPath}<br>`).join('')}`;

        html += `
            </body>
            </html>
         `;

        return html;
    }
}












export enum GscFileReferenceState {
    LocalFile,
    IncludedWorkspaceFolder,
    IncludedWorkspaceFolderOverwritten
}

export type GscFileAndReferenceState = {
    gscFile: GscFile,
    referenceState: GscFileReferenceState
    referenceWorkspace: vscode.WorkspaceFolder
};