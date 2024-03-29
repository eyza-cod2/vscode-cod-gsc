/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(__webpack_require__(1));
const FunctionDefinitionProvider_1 = __webpack_require__(2); // Adjust the path as necessary
const HoverProvider_1 = __webpack_require__(3); // Adjust the path as necessary
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "gsc" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('gsc.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from gsc!');
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.languages.registerHoverProvider('gsc', new HoverProvider_1.HoverProvider()));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('gsc', new FunctionDefinitionProvider_1.FunctionDefinitionProvider()));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FunctionDefinitionProvider = void 0;
const GscFunction_1 = __webpack_require__(4);
class FunctionDefinitionProvider {
    async provideDefinition(document, position, token) {
        var func = new GscFunction_1.GscFunctionClass();
        var funcLocations = await func.getLocationsOfFunctionUnderCursor(document, position);
        if (funcLocations.length > 0) {
            return funcLocations;
        }
        return null;
    }
}
exports.FunctionDefinitionProvider = FunctionDefinitionProvider;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoverProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const GscFunction_1 = __webpack_require__(4);
class HoverProvider {
    async provideHover(document, position, token) {
        var func = new GscFunction_1.GscFunctionClass();
        var funcDef = await func.getFunctionDefinitionOfFunctionUnderCursor(document, position);
        if (!funcDef) {
            return;
        }
        var filePath = funcDef.file.fsPath;
        // Check if there is any workspace opened
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
            // Check if the file path starts with the workspace root path
            if (filePath.startsWith(workspaceRoot)) {
                // Strip the workspace part of the path
                filePath = filePath.substring(workspaceRoot.length + 1); // +1 to remove the leading '/'
            }
        }
        let hoverText = new vscode.MarkdownString();
        hoverText.appendText(filePath);
        hoverText.appendMarkdown("\n\n"); // Two newlines for a new paragraph, for more space you could use "\n\n---\n\n" for a horizontal rule
        hoverText.appendMarkdown(`**${funcDef.name}**(${funcDef.parameters})`);
        return new vscode.Hover(hoverText);
    }
}
exports.HoverProvider = HoverProvider;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GscFunctionClass = void 0;
const vscode = __importStar(__webpack_require__(1));
class GscFunctionClass {
    /**
     * This function gets the keyword under the user cursor, checks if its valid function name, and return an array of locations where the function is defined
     * @param document
     * @param position
     * @returns Array of locations (files and position) of functions
     */
    async getLocationsOfFunctionUnderCursor(document, position) {
        // Get the function data under the cursor
        const func = await this.getDataAboutFunctionUnderCursor(document, position);
        if (!func) {
            return [];
        }
        return func.locations;
    }
    /**
     * This function gets the keyword under the user cursor, checks if its valid function name, and returns data about function definition
     * @param document
     * @param position
     * @returns Data about function definition
     */
    async getFunctionDefinitionOfFunctionUnderCursor(document, position) {
        // Get the function data under the cursor
        const func = await this.getDataAboutFunctionUnderCursor(document, position);
        if (!func) {
            return;
        }
        // Defined on too many places, ignore
        if (func.locations.length !== 1) {
            return;
        }
        // Get data of function definition
        const data = this.getFunctionDefinitionInFile(func.locations[0].uri, func.name);
        return data;
    }
    /**
     * This function gets the keyword under the user cursor, checks if its valid function name, and returns data about function reference
     * @param document
     * @param position
     * @returns Data about function reference
     */
    async getDataAboutFunctionUnderCursor(document, position) {
        // Get the word the user is hovering over
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return; // No word under the cursor
        }
        const word = document.getText(wordRange);
        const line = document.lineAt(position.line).text; // "    scripts\path::func(param1, param2, "string");"
        const left = line.substring(0, wordRange.end.character);
        const right = line.substring(wordRange.start.character, line.length - 1);
        // [1]="scripts\path", [2]="::", [3]="func"
        const leftRegex = left.match("(\\b[A-Za-z_][A-Za-z_0-9]*(?:\\\\[A-Za-z_][A-Za-z_0-9]*)*)?\\s*(::)\\s*([A-Za-z_][A-Za-z_0-9]*)$");
        const rightRegex = right.match("^[A-Za-z_][A-Za-z_0-9]*\\s*\\(");
        // Its not a function call neither function pointer
        if (!rightRegex && !leftRegex) {
            return;
        }
        const path = leftRegex?.[1];
        const locations = [];
        if (path) // "scripts\path" or undefined
         {
            var locations2 = await this.getLocationsOfFunctionDefinitionBySubpath(path + ".gsc", word);
            locations.push(...locations2);
        }
        // If file is not set, its function in this file, or included, or global
        else {
            // Try to find the function in this file
            const loc = await this.getLocationOfFunctionDefinitionInFile(vscode.Uri.file(document.fileName), word);
            if (loc !== undefined) {
                locations.push(loc);
            }
            // Then check all files via #include declaration
            const includedFiles = this.getIncludedFiles(document);
            for (let includedFile of includedFiles) {
                var locations2 = await this.getLocationsOfFunctionDefinitionBySubpath(includedFile, word);
                locations.push(...locations2);
            }
        }
        const data = {
            name: word,
            path: leftRegex?.[1],
            isPointer: (leftRegex !== null && rightRegex === null),
            locations: locations
        };
        return data;
    }
    /**
     * Find all files that match the referenced path that contains function definition
     * @param subpath The path referenced in script
     * @param functionName Name of function
     * @returns Array of locations (files and position) of functions
     */
    async getLocationsOfFunctionDefinitionBySubpath(subpath, functionName) {
        const pattern = `**/${subpath}`;
        const files = await vscode.workspace.findFiles(pattern);
        const locations = [];
        for (const file of files) {
            const location = await this.getLocationOfFunctionDefinitionInFile(file, functionName);
            if (location !== undefined) {
                locations.push(location);
            }
        }
        return locations;
    }
    /**
     * Gets position of function definition in file
     * @param file Uri file path
     * @param functionName Name of function to locate
     * @returns Location (file and position) of function in specified name
     */
    async getLocationOfFunctionDefinitionInFile(file, functionName) {
        const def = await this.getFunctionDefinitionInFile(file, functionName);
        if (!def) {
            return;
        }
        return new vscode.Location(def.file, new vscode.Position(def.line, def.character));
    }
    /**
     * Get function definition data from file
     * @param file Uri file path
     * @param functionName Name of function to locate
     * @returns Data about function
     */
    async getFunctionDefinitionInFile(file, functionName) {
        // Check if the file is opened in any editor
        const openedTextDocument = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === file.toString());
        var content;
        if (openedTextDocument) {
            // File is open in an editor, return its content
            content = openedTextDocument.getText();
        }
        else {
            // File is not open, read its content from the file system
            const fileContent = await vscode.workspace.fs.readFile(file);
            // Convert the Uint8Array content to a string
            content = Buffer.from(fileContent).toString('utf8');
        }
        // [1] = function name, [2] = all params, [3] = comments between funcname() and {
        const functionRegex = new RegExp("\\b(" + functionName + ")\\s*\\(((?:\\/\\*[^\\*\\/]*?\\*\\/|\\/\\/[^\\n]*?\\n|\\s|\\w|,)*?)\\)((?:\\/\\*[^\\*\\/]*?\\*\\/|\\/\\/[^\\n]*?\\n|\\s)*?){", 'gm');
        // Use matchAll to find all matches and their positions
        const matches = content.matchAll(functionRegex);
        for (const match of matches) {
            if (match.index !== undefined) {
                const startPosition = match.index;
                const contentUpToMatch = content.substring(0, startPosition);
                const lines = contentUpToMatch.split(/\r?\n/);
                const line = lines.length - 1;
                const char = startPosition - (contentUpToMatch.lastIndexOf('\n') + 1);
                const data = {
                    name: functionName,
                    parameters: match[2],
                    file: file,
                    offset: startPosition,
                    line: line,
                    character: char
                };
                return data;
            }
        }
    }
    /**
     * Gets list of paths referenced via #include statement in provided document
     * @param document
     * @returns Array of paths referenced via #include statement
     */
    getIncludedFiles(document) {
        // [1] = path
        const functionRegex = new RegExp("#include\\s*([A-Za-z_][A-Za-z_0-9]*(?:\\\\[A-Za-z_][A-Za-z_0-9]*)*)\\s*;", 'gm');
        const paths = [];
        const content = document.getText();
        // Use matchAll to find all matches and their positions
        const matches = content.matchAll(functionRegex);
        for (const match of matches) {
            if (match.index !== undefined) {
                const path = match[1] + ".gsc";
                paths.push(path);
            }
        }
        return paths;
    }
}
exports.GscFunctionClass = GscFunctionClass;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map