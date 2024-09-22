import * as vscode from 'vscode';
import { GscFileParser, GscData, GroupType } from './GscFileParser';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigErrorDiagnostics, GscConfig, GscGame, GscGameRootFolder } from './GscConfig';
import { LoggerOutput } from './LoggerOutput';
import { GscDiagnosticsCollection } from './GscDiagnosticsCollection';

/**
 * On startup scan every .gsc file, parse it, and save the result into memory.
 * Watch file changes and parse the files again when changed.
 * When file is opened in editor, use the editor content.
 */
export class GscFiles {

    private static cachedFilesPerWorkspace: Map<string, GscWorkspaceFileData> = new Map();

    private static parseAllFiles = false;

    private static statusBarItem: vscode.StatusBarItem | undefined;
    private static debugWindow: vscode.WebviewPanel | undefined = undefined;
    
    static async activate(context: vscode.ExtensionContext) {
        this.parseAllFiles = true;

        // Create a status bar item to show background task indicator
        GscFiles.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        GscFiles.statusBarItem.text = "$(sync~spin) Parsing GSC files...";
        GscFiles.statusBarItem.tooltip = "Background task in progress";
        GscFiles.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground'); // Example of using a theme color for error state
        
        context.subscriptions.push(GscFiles.statusBarItem);

        context.subscriptions.push(vscode.workspace.onDidCreateFiles(this.onCreateFiles));
        context.subscriptions.push(vscode.workspace.onDidDeleteFiles(this.onDeleteFiles));
        context.subscriptions.push(vscode.workspace.onDidRenameFiles(e => this.onRenameFiles));
        context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(e => this.onChangeWorkspaceFolders(e)));
        context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(e => this.onChangeEditorSelection(e)));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFile', this.debugParsedGscFile));
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFileStructure', this.debugParsedGscFileStructure));
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugItemBeforeCursor', this.debugItemBeforeCursor));        
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedUris', this.debugParsedUris));        
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugCachedFiles', () => this.showDebugWindow(context)));    
        context.subscriptions.push(vscode.commands.registerCommand('gsc.parseAll', () => setTimeout(() => this.initialParse(), 1)));

        GscConfig.onDidConfigChange(async () => { await this.onDidConfigChange(); });

        // Restore the debug window if it was open in the last session
        if (context.globalState.get('debugWindowOpen')) {
            this.showDebugWindow(context);
        }

    }


    static deactivate() {
        //console.log("Deactivating GscFiles");
        this.closeDebugWindow();
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
    public static async getFileData(fileUri: vscode.Uri, forceParsing: boolean = false, doParseNotify: boolean = true): Promise<GscFile>  {
        
        // Get workspace folder where the file is located
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);

        // This file is part of workspace
        if (workspaceFolder !== undefined) {
            // Run initial scan of all files if it is not done yet
            if (this.parseAllFiles) {          
                this.parseAllFiles = false;  
                await this.initialParse();
            }
        }

        const doLog = doParseNotify;
        if (doLog) {
            LoggerOutput.log("[GscFiles] Getting file data", vscode.workspace.asRelativePath(fileUri));
        }

        // This file is not part of workspace, return it and do not cache it
        if (workspaceFolder === undefined) {
            const gsc = await this.parseFile(fileUri);
            const gscFile = new GscFile(gsc, fileUri, workspaceFolder);
            if (doLog) {
                LoggerOutput.log("[GscFiles] Done (not part of workspace)", fileUri.toString());
            }
            return gscFile;
        }

        // Get data of workspace that contains cached files
        let dataOfWorkspace = this.cachedFilesPerWorkspace.get(workspaceFolder.uri.toString());
        if (dataOfWorkspace === undefined) {
            dataOfWorkspace = new GscWorkspaceFileData(workspaceFolder);
            this.cachedFilesPerWorkspace.set(workspaceFolder.uri.toString(), dataOfWorkspace);
        }

        // Try to get cached file
        let fileData = dataOfWorkspace.getParsedFile(fileUri);
        let bParsed = false;
        
        // If file is not found in cache
        if (fileData === undefined) {
            // Parse the file and save it into cache
            const gsc = await this.parseFile(fileUri);
            fileData = new GscFile(gsc, fileUri, workspaceFolder);
            dataOfWorkspace.addParsedFile(fileData);
            bParsed = true;
        
        // If cached file was found
        } else {
            // If its forced to parse (so cache is ignored)
            if (forceParsing) {
                // Parse the file and update the cache file data
                const gsc = await this.parseFile(fileUri);       
                fileData.updateData(gsc);
                bParsed = true;
            } else {
                doParseNotify = false; // Do not notify because the files was not parsed
            }
        }

        // If opened, update debug window
        this.updateDebugCachedFilesWindow();


        // When all files are being parsed, ignoreNotify is true
        if (doParseNotify) {
            await GscDiagnosticsCollection.generateDiagnostics(fileData);
        }

        if (doLog) {
            LoggerOutput.log("[GscFiles] Done, " + (bParsed ? "was parsed" : "loaded from cache"), vscode.workspace.asRelativePath(fileUri));
        }

        return fileData;
    }





    public static async initialParse() {
        if (GscFiles.statusBarItem) {
            GscFiles.statusBarItem.show();
        } 

        this.removeAllCachedFiles();

        // Parse all
        await GscFiles.parseAndCacheAllFiles();


        if (GscFiles.statusBarItem) {
            GscFiles.statusBarItem.hide();
            GscFiles.statusBarItem.dispose();
            GscFiles.statusBarItem = undefined;
        } 

        // Update diagnostics for all files
        await GscDiagnosticsCollection.updateDiagnosticsAll("all files parsed");
    }

    /**
     * Load all .gsc files opened in editor or found in workspace file system, parse them and save them into memory
     */
    public static async parseAndCacheAllFiles() {
        LoggerOutput.log("[GscFiles] Parsing all GSC files...");
        const start = performance.now();

        // Find all GSC files in repository
        var files = await vscode.workspace.findFiles('**/*.gsc');

        const poolSize = 4; // Number of files to parse concurrently
        let i = 0;
        
        const parseFile = async (file: vscode.Uri, index: number) => {
            const gsc = await this.getFileData(file, true, false);
            if (GscFiles.statusBarItem) {
                GscFiles.statusBarItem.text = `$(sync~spin) Parsing GSC file ${index + 1}/${files.length}...`;
                GscFiles.statusBarItem.tooltip = file.fsPath;
            }
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

        LoggerOutput.log("[GscFiles] All GSC files parsed, files: " + this.getCachedFiles().length + ", time: " + elapsed + "ms");
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

        let dataOfWorkspace = this.cachedFilesPerWorkspace.get(workspaceUri.toString());
 
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
            for (const workspaceData of this.cachedFilesPerWorkspace.values()) {
                allParsedFiles = allParsedFiles.concat(workspaceData.getAllParsedFileData());
            }
        
        } else {
            for (const workspaceUri of workspaceUris) {
                const workspaceData = this.cachedFilesPerWorkspace.get(workspaceUri.toString());
                if (workspaceData !== undefined) {
                    allParsedFiles = allParsedFiles.concat(workspaceData.getAllParsedFileData());
                }
            }
        }

        return allParsedFiles;
    }


    public static removeAllCachedFiles() {
        this.cachedFilesPerWorkspace.clear();

        // If opened, update debug window
        this.updateDebugCachedFilesWindow();
    }




    /**
     * Parse file according to Uri. If the file is opened is editor, the content is used. Otherwise the file's content is read from the file system.
     * @param fileUri Uri of file to parse
     * @returns Parsed data
     */
    public static async parseFile(fileUri: vscode.Uri): Promise<GscData> {
        //console.log("Parsing " + vscode.workspace.asRelativePath(fileUri) + "");

        const start = performance.now();

        // Check if the file is opened in any editor
        const openedTextDocument = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === fileUri.toString());
        
        var content: string;
        if (openedTextDocument) {
            content = openedTextDocument.getText();
        } else {
            const fileContent = await vscode.workspace.fs.readFile(fileUri);      
            content =  Buffer.from(fileContent).toString('utf8'); // Convert the Uint8Array content to a string
        }
        //const endLoading = performance.now();
        try {
            const gscData = GscFileParser.parse(content);
            //const endParsing = performance.now();
            //console.log(`  total time: ${(endParsing - start).toFixed(1)}, loading: ${(endLoading - start).toFixed(1)}, parsing: ${(endParsing - endLoading).toFixed(1)}`);
            return gscData;
        } catch (error) {
            void vscode.window.showErrorMessage("Error while parsing file " + vscode.workspace.asRelativePath(fileUri) + ". " + error);
            throw error;
        }
    }










    /**
     * Gets all possible workspace folders where the file can be found and referenced.
     * It includes current workspace and included workspace folders via settings.
     * The workspace folders are sorted by their indexes (first being the last workspace folder in editor).
     * @param workspaceFolder Workspace folder from which the reference is made.
     * @returns Array of workspace folders where the file can be found.
     */
    public static getReferenceableWorkspaceFolders(workspaceFolder: vscode.WorkspaceFolder): vscode.WorkspaceFolder[] {

        /*
            Define all possible locations where the file can be found
                - The workspace where the file is located
                - Included workspace folders via settings
        */

        // Get included workspace folders from settings
        const includedWorkspaceFolderNames = GscConfig.getIncludedWorkspaceFolders(workspaceFolder.uri);
        // Convert them to WorkspaceFolder objects
        const includedWorkspaceFolders = includedWorkspaceFolderNames
            .map(folderName => vscode.workspace.workspaceFolders?.find(f => f.name === folderName))
            .filter(f => f !== undefined);
        
        // Add also this document
        includedWorkspaceFolders.push(workspaceFolder);

        // Sort the folders by workspace indexes
        // By this users can specify the order of mods loaded in game
        includedWorkspaceFolders.sort((a, b) => {
            return a.index - b.index;
        });

        // Reverse to loop the last folder as first
        includedWorkspaceFolders.reverse();

        return includedWorkspaceFolders;
    }


    /**
     * Gets all possible cached GSC files thats are referenceable from the specified workspace folder.
     * It includes files from current workspace and files from included workspace folders via settings.
     * @param workspaceFolder Workspace folder from which the files are referenced.
     * @returns Array of cached files that are available for the workspace folder.
     */
    public static getReferenceableCachedFiles(workspaceFolder: vscode.WorkspaceFolder): GscFile[] {

        // Define all possible locations where the file can be found (globally included workspace folders)
        const includedWorkspaceFolders = GscFiles.getReferenceableWorkspaceFolders(workspaceFolder);  

        // Get all cached files from defined workspace folders
        const cachedFiles = this.getCachedFiles(includedWorkspaceFolders.map(f => f.uri));

        return cachedFiles;
    }


    /**
     * Get all possible game root folders where GSC files can be found and referenced. 
     * It includes game root folder from current workspace and game root folders from included workspace folders via settings.
     * @param workspaceFolder Workspace folder from which the game root folders are referenced.
     * @returns Array of game root folders where the file can be found. The first item is the game root folder from the workspace where the file is located. Other items are game root folders from included workspace folders sorted by their indexes.
     */
    public static getReferenceableGameRootFolders(workspaceFolder: vscode.WorkspaceFolder): GscGameRootFolder[] {
        
        // Define all possible locations where the file can be found (globally included workspace folders)
        const includedWorkspaceFolders = GscFiles.getReferenceableWorkspaceFolders(workspaceFolder);  

        // Convert workspace folders to URIs taking game root folder into account
        const uris = includedWorkspaceFolders.map(f => GscConfig.getGameRootFolder(f.uri)!);
        
        return uris;
    }


    /**
     * Get referenced file in specified file. It tries to find the file in all possible locations where it can be found (workspace folder and included workspace folders).
     * @param gscFile GSC file where the reference is located.
     * @param referencedFilePath Path in GSC file format (e.g. scripts\scriptName)
     * @returns The reference status and the parsed file data if found
     */
    public static getReferencedFileForFile(gscFile: GscFile, referencedFilePath: string): GscDataAndReferenceState {
    
        for (const referenceableGameRoot of gscFile.referenceableGameRootFolders) {
            const gscFilePathUri = vscode.Uri.joinPath(referenceableGameRoot.uri, referencedFilePath.replace(/\\/g, '/') + ".gsc");                      
            const gsc = GscFiles.getCachedFile(gscFilePathUri, referenceableGameRoot.workspaceFolder.uri);

            if (gsc === undefined) {
                continue; // not found, try next workspace folder
            }

            var state = GscFileReferenceState.LocalFile;
            if (referenceableGameRoot.workspaceFolder !== gscFile.workspaceFolder) {
                state = GscFileReferenceState.IncludedWorkspaceFolder;
            }

            return {gscFile: gsc, referenceState: state};
        }

        return {gscFile: undefined, referenceState: GscFileReferenceState.NotFound};
    }












    static isValidGscFile(filePath: string): boolean {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile() && path.extname(filePath).toLowerCase() === '.gsc';
    }


    static onCreateFiles(e: vscode.FileCreateEvent) {
        for(const file of e.files) {
            if (!GscFiles.isValidGscFile(file.fsPath)) {
                continue;
            }
            void GscFiles.getFileData(file);
            LoggerOutput.log("[GscFiles] Added " + vscode.workspace.asRelativePath(file) + " for parsing, because new file is created");
        }
    }
    static onDeleteFiles(e: vscode.FileDeleteEvent) {
        // Refresh all to ensure correct validation
        LoggerOutput.log("[GscFiles] Re-parsing all because some file was deleted");
        void GscFiles.initialParse();
    }

    // Called when file or folder is renamed or moved
    static onRenameFiles(e: vscode.FileRenameEvent) {
        // Refresh all to ensure correct validation
        LoggerOutput.log("[GscFiles] Re-parsing all because some file was renamed");
        void GscFiles.initialParse();
    }

    static onChangeWorkspaceFolders(e: vscode.WorkspaceFoldersChangeEvent) {
        // Refresh all to ensure correct validation
        LoggerOutput.log("[GscFiles] Re-parsing all because workspace folders changed");
        void GscFiles.initialParse();
    }

    private static async onDidConfigChange() {
        LoggerOutput.log("[GscFiles] Configuration changed, updating cached files configuration.");
        // Update configuration for GscFile before DiagnosticCollection is called
        for (const [uriKey, workspaceData] of this.cachedFilesPerWorkspace) {
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
        const gscFile = await GscFiles.getFileData(vscode.window.activeTextEditor.document.uri);
        GscFiles.debugParsedFile(gscFile);
    }

    static async debugParsedGscFileStructure() {
        if (vscode.window.activeTextEditor === undefined) {
            return;
        }
        const gscFile = await GscFiles.getFileData(vscode.window.activeTextEditor.document.uri);
        console.log(GscFileParser.debugAsString(gscFile.data.root.tokensAll, gscFile.data.root, true));
    }

    static async debugItemBeforeCursor() {
        if (vscode.window.activeTextEditor === undefined) {
            console.log("No active editor.");
            return;
        }
        const position = vscode.window.activeTextEditor.selection.active;

        console.log("Getting item before cursor position L:" + position.line + " C:" + position.character);

        const gscData = await GscFiles.getFileData(vscode.window.activeTextEditor.document.uri);
        
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
    NotFound,
    LocalFile,
    IncludedWorkspaceFolder
}


export class GscFile {
    
    /** URI as lower-case string */
    id: string;
    
    /** URI of the file */
    uri: vscode.Uri;


    /** Locations where other files can be found */
    referenceableGameRootFolders: GscGameRootFolder[];

    ignoredFilePaths: string[];
    ignoredFunctionNames: string[];
    currentGame: GscGame;
    errorDiagnostics: ConfigErrorDiagnostics;


    diagnostics: vscode.Diagnostic[] = [];


    constructor(
        /** Parsed data */
        public data: GscData,
        /** URI of the file */
        uri?: vscode.Uri, // might be undefined for tests
        /** Workspace folder to which this file belongs to */
        public workspaceFolder?: vscode.WorkspaceFolder,
    ) {
        if (uri === undefined) {
            uri = vscode.Uri.parse("file://undefined");
        }
        this.id = uri.toString().toLowerCase();
        this.uri = uri;

        if (workspaceFolder !== undefined) {
            const data = GscWorkspaceFileData.getConfig(workspaceFolder);
            this.referenceableGameRootFolders = data.referenceableGameRootFolders;
            this.currentGame = data.currentGame;
            this.ignoredFunctionNames = data.ignoredFunctionNames;
            this.ignoredFilePaths = data.ignoredFilePaths;
            this.errorDiagnostics = data.errorDiagnostics;
        } else {
            this.referenceableGameRootFolders = [];
            this.currentGame = GscGame.UniversalGame;
            this.ignoredFunctionNames = [];
            this.ignoredFilePaths = [];
            this.errorDiagnostics = ConfigErrorDiagnostics.Enable;
        }
    }

    updateData(data: GscData) {
        this.data = data;
    }
}






export type GscDataAndReferenceState = {
    gscFile: GscFile | undefined,
    referenceState: GscFileReferenceState
};


/**
 * GSC files parsed in workspace folder
 */
class GscWorkspaceFileData {
    private parsedFiles: Map<string, GscFile> = new Map();

    constructor(
        public workspaceFolder: vscode.WorkspaceFolder
    ) {}

    addParsedFile(data: GscFile) {
        this.parsedFiles.set(data.id, data);
    }

    getParsedFile(uri: vscode.Uri): GscFile | undefined {
        const data = this.parsedFiles.get(uri.toString().toLowerCase());

        return data;
    }

    removeParsedFile(uri: vscode.Uri): boolean {
        return this.parsedFiles.delete(uri.toString().toLowerCase());
    }

    getAllParsedFileData(): GscFile[] {
        return Array.from(this.parsedFiles.values());
    }

    updateConfiguration() {
        const data = GscWorkspaceFileData.getConfig(this.workspaceFolder);

        // Loop all GscFile and update their configuration
        for (const file of this.parsedFiles.values()) {
            file.referenceableGameRootFolders = data.referenceableGameRootFolders;
            file.currentGame = data.currentGame;
            file.ignoredFunctionNames = data.ignoredFunctionNames;
            file.ignoredFilePaths = data.ignoredFilePaths;
            file.errorDiagnostics = data.errorDiagnostics;
        }
    }

    static getConfig(workspaceFolder: vscode.WorkspaceFolder) {

        // Get config for workspace folder
        const referenceableGameRootFolders = GscFiles.getReferenceableGameRootFolders(workspaceFolder);
        const currentGame = GscConfig.getSelectedGame(workspaceFolder.uri);
        const ignoredFunctionNames = GscConfig.getIgnoredFunctionNames(workspaceFolder.uri);
        const ignoredFilePaths = GscConfig.getIgnoredFilePaths(workspaceFolder.uri);
        const errorDiagnostics = GscConfig.getErrorDiagnostics(workspaceFolder.uri);

        return {referenceableGameRootFolders, currentGame, ignoredFunctionNames, ignoredFilePaths, errorDiagnostics};
    }
}