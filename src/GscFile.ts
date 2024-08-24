import * as vscode from 'vscode';
import { GscFileParser, GscData, GscFunction } from './GscFileParser';
import { GscConfig } from './GscConfig';
import * as fs from 'fs';
import * as path from 'path';

/**
 * On startup scan every .gsc file, parse it, and save the result into memory.
 * Watch file changes and parse the files again when changed.
 * When file is opened in editor, use the editor content.
 */
export class GscFile {

    private static parsedFiles: Map<string, GscData> = new Map();
    private static _onDidParseDocument: vscode.EventEmitter<{uri: vscode.Uri, data: GscData}> = new vscode.EventEmitter<{uri: vscode.Uri, data: GscData}>();
    private static _onDidParseAllDocuments: vscode.EventEmitter<Map<string, GscData>> = new vscode.EventEmitter<Map<string, GscData>>();
    private static _onDidDeleteDocument: vscode.EventEmitter<vscode.Uri> = new vscode.EventEmitter<vscode.Uri>();
    private static parseAllFiles = false;

    private static statusBarItem: vscode.StatusBarItem | undefined;
    
    static async activate(context: vscode.ExtensionContext) {
        this.parseAllFiles = true;

        // Create a status bar item to show background task indicator
        GscFile.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        GscFile.statusBarItem.text = "$(sync~spin) Parsing GSC files...";
        GscFile.statusBarItem.tooltip = "Background task in progress";
        GscFile.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground'); // Example of using a theme color for error state
        
        context.subscriptions.push(GscFile.statusBarItem);

        context.subscriptions.push(vscode.workspace.onDidCreateFiles(this.onCreateFiles));
        context.subscriptions.push(vscode.workspace.onDidDeleteFiles(this.onDeleteFiles));
        context.subscriptions.push(vscode.workspace.onDidRenameFiles(this.onRenameFiles));
        context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(this.onChangeWorkspaceFolders));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFile', this.debugParsedGscFile));
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFileStructure', this.debugParsedGscFileStructure));
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugItemBeforeCursor', this.debugItemBeforeCursor));        
        context.subscriptions.push(vscode.commands.registerCommand('gsc.parseAll', () => setTimeout(() => this.initialParse(), 1)));        
    }


    /**
     * Load specified .gsc from editor or from file system, parse it, and save them into memory
     * @param fileUri Uri of file to parse
     */
    public static async parseAndCacheFile(fileUri: vscode.Uri, ignoreNotify: boolean = false): Promise<GscData>  {
        var gsc = await this.parseFile(fileUri);

        // This file is part of workspace, save it into cache; otherwise ignore it
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
        if (workspaceFolder !== undefined) {
            this.parsedFiles.set(fileUri.toString(), gsc); // Add or update
        }

        // Run initial scan of all files
        if (this.parseAllFiles) {    
            this.parseAllFiles = false;  
            
            await this.initialParse();

            this._onDidParseDocument.fire({uri: fileUri, data: gsc});

            return gsc;
        }
        else if (ignoreNotify === false) {
            // Notify all subscribers that the document has been parsed
            this._onDidParseDocument.fire({uri: fileUri, data: gsc});
        }

        return gsc;
    }


    public static async initialParse() {
        if (GscFile.statusBarItem) {
            GscFile.statusBarItem.show();
        } 

        // Parse all
        await GscFile.parseAndCacheAllFiles(true); // true = ignore notify


        // Notify subscribers that all files has been parsed
        const files = this.getCachedFiles();
        this._onDidParseAllDocuments.fire(files);

        if (GscFile.statusBarItem) {
            GscFile.statusBarItem.hide();
            GscFile.statusBarItem.dispose();
            GscFile.statusBarItem = undefined;
        } 
    }

    /**
     * Load all .gsc files opened in editor or found in workspace file system, parse them and save them into memory
     */
    public static async parseAndCacheAllFiles(ignoreNotify: boolean = false) {
        console.log("Parsing GSC files...");
        const start = performance.now();

        // Find all GSC files in repository
        var files = await vscode.workspace.findFiles('**/*.gsc');

        const poolSize = 4; // Number of files to parse concurrently
        let i = 0;
        
        const parseFile = async (file: vscode.Uri, index: number) => {
            const gsc = await this.parseAndCacheFile(file, ignoreNotify);
            if (GscFile.statusBarItem) {
                GscFile.statusBarItem.text = `$(sync~spin) Parsing GSC file ${index + 1}/${files.length}...`;
                GscFile.statusBarItem.tooltip = file.fsPath;
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

        console.log("All GSC files parsed, files: " + this.parsedFiles.size + ", time: " + elapsed + "ms");
    }



    /**
     * Load specified .gsc from editor or from file system, parse it, and save them into memory
     * @param fileUri Uri of file to parse
     */
    public static removeCachedFile(fileUri: vscode.Uri) {
        const deleted = this.parsedFiles.delete(fileUri.toString());     
        if (deleted) {
            this._onDidDeleteDocument.fire(fileUri);
        }
    }


    public static async getFile(fileUri: vscode.Uri): Promise<GscData> {
        
        // This file is not part of workspace, do not use cached files but parse it instead
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
        if (workspaceFolder === undefined) {
            return this.parseFile(fileUri);
        }
        
        var gsc = this.parsedFiles.get(fileUri.toString()) ?? await this.parseAndCacheFile(fileUri);
        return gsc;
    }

    public static getCachedFiles(): Map<string, GscData> {
        return this.parsedFiles;
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
        const openedTextDocument = vscode.workspace.textDocuments.find(doc => doc.uri === fileUri);
        
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
            await vscode.window.showErrorMessage("Error while parsing file " + vscode.workspace.asRelativePath(fileUri) + ". " + error);
            throw error;
        }
    }











    /**
     * Get location inside of file where the function is defined. 
     * If the file is not found, undefined is returned. If file is found but function is not found, it will return an empty array.
     */
    public static async getFunctionNameDefinitions(funcName: string, path: string, documentUri: vscode.Uri): Promise<{func: GscFunction, uri: string}[] | undefined> {
        const funcDefs: {func: GscFunction, uri: string} [] = [];  
        const funcNameId = funcName.toLowerCase();

        const fileGameRootFolderUri = GscConfig.getGameRootFolderOfFile(documentUri);
        if (!fileGameRootFolderUri) {
            return funcDefs;
        }

        // Its external function call
        if (path !== "") 
        {
            const gscFilePathUri = vscode.Uri.joinPath(fileGameRootFolderUri, path + ".gsc").toString().toLowerCase();
            
            var fileFound = false;


            // Try to find the file in parsed files
            const gscFiles = GscFile.getCachedFiles();
            gscFiles.forEach((data, uri) => {

                if (uri.toLowerCase() === gscFilePathUri) {
                    fileFound = true;
                    data.functions.forEach(f => {
                        if (f.nameId === funcNameId) {
                            funcDefs.push({func: f, uri: uri});
                        }
                    });
                }
            });

            if (fileFound === false) {
                return undefined;
            }
        } 

        // Its local function or included function
        else {

            // Find function in this file
            const gscData = await GscFile.getFile(documentUri);
            gscData.functions.forEach(f => {
                if (f.nameId === funcNameId) {
                    funcDefs.push({func: f, uri: documentUri.toString()});
                }
            });

            // Find function also in included files
            gscData.includes.forEach(includedPath => {
                const gscFilePathUri = vscode.Uri.joinPath(fileGameRootFolderUri, includedPath + ".gsc").toString().toLowerCase();

                // Try to find the file in parsed files
                const gscFiles = GscFile.getCachedFiles();
                gscFiles.forEach((data, uri) => {
                    if (uri.toLowerCase() === gscFilePathUri) {
                        data.functions.forEach(f => {
                            if (f.nameId === funcNameId) {
                                funcDefs.push({func: f, uri: uri});
                            }
                        });
                    }
                });          
            });
        }
        
        return funcDefs;
    }



    // Expose an event for external subscription
    public static get onDidParseDocument(): vscode.Event<{uri: vscode.Uri, data: GscData}> {
        return this._onDidParseDocument.event;
    }

    public static get onDidParseAllDocuments(): vscode.Event<Map<string, GscData>> {
        return this._onDidParseAllDocuments.event;
    }

    public static get onDidDeleteDocument(): vscode.Event<vscode.Uri> {
        return this._onDidDeleteDocument.event;
    }


    static isValidGscFile(filePath: string): boolean {
        return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile() && path.extname(filePath).toLowerCase() === '.gsc';
    }


    static onCreateFiles(e: vscode.FileCreateEvent) {
        for(const file of e.files) {
            if (!GscFile.isValidGscFile(file.fsPath)) {
                continue;
            }
            void GscFile.parseAndCacheFile(file);       
            console.log("Added " + vscode.workspace.asRelativePath(file) + " for parsing, because new file is created");
        }
    }
    static onDeleteFiles(e: vscode.FileDeleteEvent) {
        for(const file of e.files) {
            GscFile.removeCachedFile(file);
            console.log("Removed " + vscode.workspace.asRelativePath(file) + " from parsing, because the file was deleted");
        }
    }
    static onRenameFiles(e: vscode.FileRenameEvent) {
        for(const file of e.files) {
            GscFile.removeCachedFile(file.oldUri);
            
            // No need to parse the new uri, because if opened in editor, it will be parsed by semantic tokens provider
            //void GscFile.parseAndCacheFile(file.newUri);

            // TODO check which files were referencing the old file and update the references

            console.log("Re-parsed " + vscode.workspace.asRelativePath(file.newUri) + " because the file was renamed");
        }
    }
    static onChangeWorkspaceFolders(e: vscode.WorkspaceFoldersChangeEvent) {
        const filesToDelete: vscode.Uri[] = [];       
        for(const folder of e.removed) {
            if (GscFile.parsedFiles.has(folder.uri.toString())) {
                filesToDelete.push(folder.uri);
            }
        }
        for(const uri of filesToDelete) {
            GscFile.removeCachedFile(uri);
            console.log("Removed " + vscode.workspace.asRelativePath(uri) + " from parsing, because workspace folder was removed");
        }

        for(const folder of e.added) {
            void GscFile.parseAndCacheFile(folder.uri);       
            console.log("Added " + vscode.workspace.asRelativePath(folder.uri) + " for parsing, because workspace folder was added");
        }
    }



    static async debugParsedGscFile() {
        if (vscode.window.activeTextEditor === undefined) {
            return;
        }
        const gscData = await GscFile.getFile(vscode.window.activeTextEditor.document.uri);
        GscFile.debugParsedFile(gscData);
    }

    static async debugParsedGscFileStructure() {
        if (vscode.window.activeTextEditor === undefined) {
            return;
        }
        const gscData = await GscFile.getFile(vscode.window.activeTextEditor.document.uri);
        console.log(GscFileParser.debugAsString(gscData.root.tokensAll, gscData.root, true));
    }

    static async debugItemBeforeCursor() {
        if (vscode.window.activeTextEditor === undefined) {
            console.log("No active editor.");
            return;
        }
        const position = vscode.window.activeTextEditor.selection.active;

        console.log("Getting item before cursor position L:" + position.line + " C:" + position.character);

        const gscData = await GscFile.getFile(vscode.window.activeTextEditor.document.uri);
        
        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor === undefined) {
            console.log("No item found at position.");
            return;
        }
        console.log(GscFileParser.debugAsString(gscData.root.tokensAll, groupAtCursor, true));

        console.log();

        const funcNameAndPath = groupAtCursor.getFunctionReferenceInfo();
        if (funcNameAndPath !== undefined) {
            console.log("Function path: " + funcNameAndPath.path);
            console.log("Function name: " + funcNameAndPath.name);
        } else {
            console.log("Function not detected.");
        }
    }

    public static debugParsedFile(gsc: GscData) {
        
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
}
