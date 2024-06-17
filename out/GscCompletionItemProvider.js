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
exports.GscCompletionItemProvider = void 0;
const vscode = __importStar(require("vscode"));
const GscFile_1 = require("./GscFile");
const GscFileParser_1 = require("./GscFileParser");
class GscCompletionItemProvider {
    static async activate(context) {
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('gsc', new GscCompletionItemProvider(), '\\', '.', '[', ']'));
    }
    async provideCompletionItems(document, position, token) {
        // Get parsed file
        const gscData = await GscFile_1.GscFile.parseAndCacheFile(document.uri);
        const items = await GscCompletionItemProvider.getCompletionItems(gscData, position);
        return items;
    }
    /**
     * This function get suggestions for auto-complete. It supports:
     *  - variable names (eg. level.field1, game["abc"])
     *  - path (eg. maps\mp\gametypes)
     * @returns
     */
    static async getCompletionItems(gscData, position, onlyVariables = false) {
        const completionItems = [];
        //console.log("CompletionItemProvider --------------------------------------------------------");
        const startTime = performance.now();
        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return completionItems;
        }
        //console.log("Group at cursor: " + groupAtCursor.toString());
        // Get current function data
        const functionGroup = gscData.functions.find(f => {
            const range = f.scopeRange;
            if (((position.line === range.start.line && position.character > range.start.character) || position.line > range.start.line) &&
                ((position.line === range.end.line && position.character < range.end.character) || position.line < range.end.line)) {
                return true;
            }
        });
        // Debug all local variables of function
        //functionGroup?.localVariableDefinitions.forEach(c => console.log(c.variableReference.getTokensAsString() + " " + GscVariableDefinitionType[c.type]));
        if (functionGroup !== undefined) {
            // Create items for variables like level.aaa, game["bbb"] and local1.aaa[0][1]
            if (groupAtCursor.type !== GscFileParser_1.GroupType.Path) {
                this.createVariableItems(completionItems, position, groupAtCursor, gscData, functionGroup.localVariableDefinitions, onlyVariables);
            }
            // Keywords like true, false, undefined, if, else, waittillframeend, ...
            if (onlyVariables === false) {
                await this.createPathItems(completionItems, position, groupAtCursor);
            }
        }
        const duration = performance.now() - startTime;
        console.log("CompletionProvider done, exec time: " + duration + "ms");
        return completionItems;
    }
    static createVariableItems(completionItems, position, groupAtCursor, gscData, localVariableDefinitions, onlyVariables) {
        // Select local variables 
        const variableItems = [];
        // Get variable string before cursor
        // For example:
        //  level.aaa
        //  array1["abc"][0]
        var variableBeforeCursor = groupAtCursor.getVariableStringBeforePosition(position);
        //console.log("Var before: '" + variableBeforeCursor + "'");
        // Decide where we are
        const inVariableName = variableBeforeCursor === "" || groupAtCursor?.typeEqualsToOneOf(GscFileParser_1.GroupType.VariableName, GscFileParser_1.GroupType.Identifier);
        const inStructureVariable = (groupAtCursor?.type === GscFileParser_1.GroupType.StructureField || (groupAtCursor?.getFirstToken().name === "."));
        const inArrayBrackets = ((groupAtCursor?.type === GscFileParser_1.GroupType.Array && position.character < groupAtCursor.getRange().end.character) || // xxx[...]
            (variableBeforeCursor.at(-1) === "[") // xxx[
        );
        // If user typed 'level.aaa.bbb', we want to get 'level.aaa.' (last non word char index)
        const nonWordChars = variableBeforeCursor.match(/\W/g);
        const lastNonWordIndexInCursorVar = nonWordChars ? variableBeforeCursor.lastIndexOf(nonWordChars[nonWordChars.length - 1]) : -1;
        //console.log("   inVariableName: " + inVariableName);
        //console.log("   inStructureVariable: " + inStructureVariable);
        //console.log("   inArrayVariable: " + inArrayBrackets);
        // Definition of global variables
        if (!inStructureVariable && (inVariableName || inArrayBrackets)) {
            variableItems.push({ name: "level", detail: "", types: new Set([GscFileParser_1.GscVariableDefinitionType.Structure]), kind: vscode.CompletionItemKind.Variable });
            variableItems.push({ name: "game", detail: "", types: new Set([GscFileParser_1.GscVariableDefinitionType.Array]), kind: vscode.CompletionItemKind.Variable });
            variableItems.push({ name: "self", detail: "", types: new Set([GscFileParser_1.GscVariableDefinitionType.Unknown]), kind: vscode.CompletionItemKind.Variable });
        }
        // Local variables
        localVariableDefinitions.forEach(g => {
            getCompletionItemFromVariableDefinition(g);
        });
        // Level variables
        if (variableBeforeCursor.startsWith("level")) {
            const gscFiles = GscFile_1.GscFile.getCachedFiles();
            gscFiles.forEach(g => {
                g.levelVariablesDefinitions.forEach(g => {
                    getCompletionItemFromVariableDefinition(g);
                });
            });
        }
        // Game variables
        if (variableBeforeCursor.startsWith("game")) {
            const gscFiles = GscFile_1.GscFile.getCachedFiles();
            gscFiles.forEach(g => {
                g.gameVariablesDefinitions.forEach(g => {
                    getCompletionItemFromVariableDefinition(g);
                });
            });
        }
        function getCompletionItemFromVariableDefinition(g) {
            // Turn group of variable reference into variable parts
            //    struct1.field1      => ["struct1", ".field"]
            //    array1[0].field1    => ["array1", "[0]", ".field1"]
            //    array1[1][0]        => ["array1", "[1]", "[0]"]
            const variableParts = g.variableReference.getVariableParts();
            var varName = "";
            var type = GscFileParser_1.GscVariableDefinitionType.Unknown;
            var kind = vscode.CompletionItemKind.Variable;
            var labelName = "";
            var detail = "";
            for (var i = 0; i < variableParts.length; i++) {
                const part = variableParts[i];
                const isLast = i === (variableParts.length - 1);
                varName += part.text;
                type = isLast ? g.type : part.implicitType;
                kind = part.kind;
                // Var name is now longer by one part, or its last value -> time to exit
                // For example:
                //  Text before cursor  VarName
                //  struct1             struct1.aaa
                //  struct1.            struct1.aaa
                //  struct1.aaa         struct1.aaa[0]
                if (!variableBeforeCursor.startsWith(varName) || isLast) {
                    // If this longer variable name text still starts with the pre-typed text
                    if (varName.startsWith(variableBeforeCursor)) {
                        labelName = varName.substring(lastNonWordIndexInCursorVar + 1);
                        if (inArrayBrackets) {
                            if (!labelName.startsWith("[") && labelName.endsWith("]")) {
                                labelName = labelName.substring(0, labelName.length - 1); // remove array end ]
                            }
                            kind = vscode.CompletionItemKind.Value;
                        }
                    }
                    // This var does not match with text before cursor
                    // If its in structure field, don't show this variable
                    else if (inStructureVariable) {
                        varName = "";
                    }
                    // This var does not match with text before cursor
                    // If its in array, show only the root variable names
                    else if (inArrayBrackets) {
                        labelName = variableParts[0].text;
                        type = (variableParts.length === 1) ? g.type : variableParts[0].implicitType;
                        kind = variableParts[0].kind;
                    }
                    break;
                }
            }
            // Debug
            const fullVarName = g.variableReference.getTokensAsString();
            //console.log(fullVarName.padEnd(18) + "   ->   " + varName.padEnd(15) + "   ->   " + labelName.padEnd(10) + "   ->   " + GscVariableDefinitionType[type]/* + "   ->   " + detail*/ + "   ->   " + GscVariableDefinitionType[g.type]);
            // Ignore empty
            if (labelName === "") {
                return;
            }
            // Add new the variable into completion items or update existing
            const existingItem = variableItems.find(p => p.name === labelName);
            if (existingItem !== undefined) {
                existingItem.types.add(type);
                existingItem.kind = kind;
            }
            else {
                variableItems.push({ name: labelName, detail: detail, types: new Set([type]), kind: kind });
            }
        }
        // Insert local variables into completion items
        variableItems.forEach(i => {
            completionItems.push(new vscode.CompletionItem({
                label: i.name,
                detail: i.detail,
                description: GscCompletionItemProvider.getItemDescriptionFromTypes([...i.types])
            }, i.kind));
        });
        // Add predefined keywords
        if (onlyVariables === false && (inVariableName || inArrayBrackets)) {
            completionItems.push(new vscode.CompletionItem({ label: "true", description: "", detail: "" }, vscode.CompletionItemKind.Constant));
            completionItems.push(new vscode.CompletionItem({ label: "false", description: "", detail: "" }, vscode.CompletionItemKind.Constant));
            completionItems.push(new vscode.CompletionItem({ label: "undefined", description: "", detail: "" }, vscode.CompletionItemKind.Constant));
            if (inVariableName) {
                completionItems.push(new vscode.CompletionItem({ label: "if", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "else", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "for", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "while", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "switch", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "return", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "case", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "default", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "break", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "continue", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "thread", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "wait", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "waittill", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "waittillmatch", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "waittillframeend", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "notify", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "endon", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
                completionItems.push(new vscode.CompletionItem({ label: "breakpoint", description: "", detail: "" }, vscode.CompletionItemKind.Keyword));
            }
        }
    }
    /**
     * Get path before cursor and search for this path in workspace folders.
     */
    static async createPathItems(completionItems, position, groupAtCursor) {
        const pathBeforeCursor = groupAtCursor.getPathStringBeforePosition(position);
        var fileSubPath = "";
        // Remove last word after \
        //  maps\mp\file -> maps\mp
        var lastPathIndex = pathBeforeCursor.lastIndexOf("\\");
        if (lastPathIndex !== -1) {
            fileSubPath = pathBeforeCursor.substring(0, lastPathIndex);
            // Normalize backslashes or forward slashes for consistency
            fileSubPath = fileSubPath.replace(/\\/g, '/');
        }
        if (fileSubPath === "") {
            //vscode.window.showInformationMessage("not a valid file path");
            return;
        }
        // Find any files in workspace that contains this path.
        // Since this function does not return folders, search also for files in subfolder
        const files = await vscode.workspace.findFiles(`**/${fileSubPath}/{*.gsc,*/*.gsc}`);
        // Debug files
        //files.forEach(f => console.log(f.path));
        // Loop files
        const keywords = [];
        for (const file of files) {
            // Convert c:/folder1/workspaceFolder/maps/mp/file.gsc  ->  root/workspaceFolder/maps/mp/file.gsc
            var relativePath = vscode.workspace.asRelativePath(file.path, false);
            // Remove the folder prefix that user pre-typed
            //  root/workspaceFolder/maps/mp/file.gsc       -> file.gsc
            //  root/workspaceFolder/maps/mp/dir/file.gsc   -> dir/file.gsc
            const subpathIndex = relativePath.indexOf(fileSubPath);
            if (subpathIndex !== -1) {
                var subpathKeyword = relativePath.substring(subpathIndex + fileSubPath.length + 1);
                const slashIndex = subpathKeyword.indexOf("/");
                // Folder
                if (slashIndex !== -1) {
                    const folderName = subpathKeyword.substring(0, slashIndex);
                    const exists = keywords.some(k => k.label === folderName);
                    if (!exists) {
                        keywords.push({ label: folderName, detail: "", kind: vscode.CompletionItemKind.Folder });
                    }
                }
                // File
                else {
                    // Get file extension
                    var re = /(?:\.([^.]+))?$/;
                    const fileExtension = re.exec(subpathKeyword)?.[1] ?? "";
                    if (fileExtension.toLowerCase() !== "gsc") {
                        continue;
                    }
                    var fileName = subpathKeyword.substring(0, subpathKeyword.length - 4); // remove .gsc extension from file name
                    keywords.push({ label: fileName, detail: ".gsc", kind: vscode.CompletionItemKind.File });
                }
            }
        }
        // Add completion items
        keywords.forEach(k => {
            completionItems.push(new vscode.CompletionItem({ label: k.label, description: "", detail: k.detail }, k.kind));
        });
    }
    static getItemDescriptionFromTypes(types) {
        const unknownValueTypes = [GscFileParser_1.GscVariableDefinitionType.UnknownValue, GscFileParser_1.GscVariableDefinitionType.UnknownValueFromFunction, GscFileParser_1.GscVariableDefinitionType.UnknownValueFromVariable];
        var typesString = types
            .filter(t => !unknownValueTypes.includes(t))
            .map(type => {
            if (type === GscFileParser_1.GscVariableDefinitionType.Unknown) {
                return "?";
            }
            else {
                function addSpaceBetweenLowerUpper(str) {
                    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
                }
                return addSpaceBetweenLowerUpper(GscFileParser_1.GscVariableDefinitionType[type]).toLowerCase();
            }
        })
            .join(", ");
        if (typesString === "?") {
            typesString = "";
        }
        if (typesString !== "") {
            typesString = "(" + typesString + ")";
        }
        return typesString;
    }
}
exports.GscCompletionItemProvider = GscCompletionItemProvider;
//# sourceMappingURL=GscCompletionItemProvider.js.map