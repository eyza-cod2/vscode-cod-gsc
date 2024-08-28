import * as vscode from 'vscode';
import { GscFileParser, GscData } from './GscFileParser';
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

        this.parsedFiles.clear();

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
        // Refresh all to ensure correct validation
        console.log("Re-parsing all because some file was deleted");
        void GscFile.initialParse();
    }

    // Called when file or folder is renamed or moved
    static onRenameFiles(e: vscode.FileRenameEvent) {
        // Refresh all to ensure correct validation
        console.log("Re-parsing all because some file was renamed");
        void GscFile.initialParse();
    }

    static onChangeWorkspaceFolders(e: vscode.WorkspaceFoldersChangeEvent) {
        // Refresh all to ensure correct validation
        console.log("Re-parsing all because workspace folders changed");
        void GscFile.initialParse();
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
