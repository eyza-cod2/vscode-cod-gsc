"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GscFile = void 0;
const vscode = __importStar(require("vscode"));
const GscFileParser_1 = require("./GscFileParser");
/**
 * On startup scan every .gsc file, parse it, and save the result into memory.
 * Watch file changes and parse the files again when changed.
 * When file is opened in editor, use the editor content.
 */
class GscFile {
    static parsedFiles = new Map();
    static _onDidParseDocument = new vscode.EventEmitter();
    static _onDidDeleteDocument = new vscode.EventEmitter();
    static parseAllFiles = false;
    static activate(context) {
        this.parseAllFiles = true;
        context.subscriptions.push(vscode.workspace.onDidCreateFiles(this.onCreateFiles));
        context.subscriptions.push(vscode.workspace.onDidDeleteFiles(this.onDeleteFiles));
        context.subscriptions.push(vscode.workspace.onDidRenameFiles(this.onRenameFiles));
        // Command to print parsed gsc file data
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFile', async () => {
            if (vscode.window.activeTextEditor === undefined) {
                return;
            }
            const gscData = await this.getFile(vscode.window.activeTextEditor.document.uri);
            this.debugParsedFile(gscData);
        }));
        // Command to print parsed gsc file structure
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugParsedGscFileStructure', async () => {
            if (vscode.window.activeTextEditor === undefined) {
                return;
            }
            const gscData = await this.getFile(vscode.window.activeTextEditor.document.uri);
            console.log(GscFileParser_1.GscFileParser.debugAsString(gscData.root.tokensAll, gscData.root, true));
        }));
        // Command to print parsed gsc file structure
        context.subscriptions.push(vscode.commands.registerCommand('gsc.debugItemBeforeCursor', async () => {
            if (vscode.window.activeTextEditor === undefined) {
                console.log("No active editor.");
                return;
            }
            const position = vscode.window.activeTextEditor.selection.active;
            console.log("Getting item before cursor position L:" + position.line + " C:" + position.character);
            const gscData = await this.getFile(vscode.window.activeTextEditor.document.uri);
            // Get group before cursor
            var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
            if (groupAtCursor === undefined) {
                console.log("No item found at position.");
                return;
            }
            console.log(GscFileParser_1.GscFileParser.debugAsString(gscData.root.tokensAll, groupAtCursor, true));
            console.log();
            const funcNameAndPath = groupAtCursor.getFunctionNameAndPath();
            if (funcNameAndPath !== undefined) {
                console.log("Function path: " + funcNameAndPath.path);
                console.log("Function name: " + funcNameAndPath.name);
            }
            else {
                console.log("Function not detected.");
            }
        }));
    }
    // Expose an event for external subscription
    static get onDidParseDocument() {
        return this._onDidParseDocument.event;
    }
    static get onDidDeleteDocument() {
        return this._onDidDeleteDocument.event;
    }
    static onCreateFiles(e) {
        for (const file of e.files) {
            this.parseAndCacheFile(file);
            console.log(this, "Added " + vscode.workspace.asRelativePath(file) + " for parsing");
        }
    }
    static onDeleteFiles(e) {
        for (const file of e.files) {
            this.removeCachedFile(file);
            console.log(this, "Removed " + vscode.workspace.asRelativePath(file) + " from parsing");
        }
    }
    static onRenameFiles(e) {
        for (const { oldUri, newUri } of e.files) {
            this.removeCachedFile(oldUri);
            this.parseAndCacheFile(newUri);
        }
    }
    /**
     * Load all .gsc files opened in editor or found in workspace file system, parse them and save them into memory
     */
    static async parseAndCacheAllFiles() {
        console.log("Parsing GSC files...");
        const start = performance.now();
        // Find all GSC files in repository
        var files = await vscode.workspace.findFiles('**/*.gsc');
        for (const file of files) {
            var gsc = await this.parseAndCacheFile(file);
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
    static async parseAndCacheFile(fileUri) {
        var gsc = await this.parseFile(fileUri);
        this.parsedFiles.set(fileUri.toString(), gsc); // Add or update
        // Notify all subscribers that the document has been parsed
        this._onDidParseDocument.fire(fileUri);
        // Run initial scan of all files
        if (this.parseAllFiles) {
            this.parseAllFiles = false;
            await GscFile.parseAndCacheAllFiles();
            return this.getFile(fileUri);
        }
        return gsc;
    }
    /**
     * Load specified .gsc from editor or from file system, parse it, and save them into memory
     * @param fileUri Uri of file to parse
     */
    static removeCachedFile(fileUri) {
        this.parsedFiles.delete(fileUri.toString());
    }
    static async getFile(fileUri) {
        var gsc = this.parsedFiles.get(fileUri.toString()) ?? await this.parseAndCacheFile(fileUri);
        return gsc;
    }
    static getCachedFiles() {
        return this.parsedFiles;
    }
    /**
     * Parse file according to Uri. If the file is opened is editor, the content is used. Otherwise the file's content is read from the file system.
     * @param fileUri Uri of file to parse
     * @returns Parsed data
     */
    static async parseFile(fileUri) {
        console.log("Parsing " + vscode.workspace.asRelativePath(fileUri) + "");
        const start = performance.now();
        // Check if the file is opened in any editor
        const openedTextDocument = vscode.workspace.textDocuments.find(doc => doc.uri === fileUri);
        var content;
        if (openedTextDocument) {
            content = openedTextDocument.getText();
        }
        else {
            const fileContent = await vscode.workspace.fs.readFile(fileUri);
            content = Buffer.from(fileContent).toString('utf8'); // Convert the Uint8Array content to a string
        }
        const endLoading = performance.now();
        try {
            const gscData = GscFileParser_1.GscFileParser.parse(content);
            const endParsing = performance.now();
            console.log(`  total time: ${(endParsing - start).toFixed(1)}, loading: ${(endLoading - start).toFixed(1)}, parsing: ${(endParsing - endLoading).toFixed(1)}`);
            return gscData;
        }
        catch (error) {
            vscode.window.showErrorMessage("Error while parsing file " + vscode.workspace.asRelativePath(fileUri) + ". " + error);
            throw error;
        }
    }
    /**
     *
     * @param documentUri
     * @returns
     */
    static async getFunctionNameDefinitions(funcName, path, documentUri) {
        const locations = [];
        // Its external function call
        if (path !== "") {
            const filePath = path.replace(/\\/g, '/') + ".gsc";
            funcName = funcName.toLowerCase();
            // Try to find the file in parsed files
            const gscFiles = GscFile.getCachedFiles();
            gscFiles.forEach((data, uri) => {
                if (uri.endsWith(filePath)) {
                    data.functions.forEach(f => {
                        if (f.nameId === funcName) {
                            locations.push(new vscode.Location(vscode.Uri.parse(uri), new vscode.Position(f.range.start.line, f.range.start.character)));
                        }
                    });
                }
            });
        }
        // Its local function or included function
        else {
            // Find function in this file
            const gscData = await GscFile.getFile(documentUri);
            gscData.functions.forEach(f => {
                if (f.nameId === funcName) {
                    locations.push(new vscode.Location(documentUri, new vscode.Position(f.range.start.line, f.range.start.character)));
                }
            });
            // Find function also in included files
            gscData.includes.forEach(path => {
                const filePath = path.replace(/\\/g, '/') + ".gsc";
                // Try to find the file in parsed files
                const gscFiles = GscFile.getCachedFiles();
                gscFiles.forEach((data, uri) => {
                    if (uri.endsWith(filePath)) {
                        data.functions.forEach(f => {
                            if (f.nameId === funcName) {
                                locations.push(new vscode.Location(vscode.Uri.parse(uri), new vscode.Position(f.range.start.line, f.range.start.character)));
                            }
                        });
                    }
                });
            });
        }
        return locations;
    }
    static debugParsedFile(gsc) {
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
exports.GscFile = GscFile;
//# sourceMappingURL=GscFile.js.map