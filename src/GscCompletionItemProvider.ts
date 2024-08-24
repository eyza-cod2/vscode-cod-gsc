import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData, GscGroup, GscVariableDefinition, GscVariableDefinitionType } from './GscFileParser';
import { CodFunctions } from './CodFunctions';
import { GscConfig, GscGame } from './GscConfig';

export class GscCompletionItemProvider implements vscode.CompletionItemProvider {
    
    static async activate(context: vscode.ExtensionContext) {        
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider('gsc', new GscCompletionItemProvider(), '\\', '.', '[', ']'));
    }
    
    async provideCompletionItems( document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken
    ): Promise<vscode.CompletionItem[] | vscode.CompletionList | undefined> 
    {
        // This function is called when user types a character or presses ctrl+space


        // Get parsed file
        const gscData = await GscFile.parseAndCacheFile(document.uri);

        const currentGame = GscConfig.getSelectedGame(document.uri);

        const items = await GscCompletionItemProvider.getCompletionItems(gscData, position, currentGame);

        return items;
    }
    

    /**
     * This function get suggestions for auto-complete. It supports:
     *  - variable names (eg. level.field1, game["abc"])
     *  - path (eg. maps\mp\gametypes)
     * @returns 
     */
    public static async getCompletionItems(
        gscData: GscData,
        position: vscode.Position,
        currentGame: GscGame,
        onlyVariables: boolean = false
    ): Promise<vscode.CompletionItem[]> 
    {
        const completionItems: vscode.CompletionItem[] = [];

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
                ((position.line === range.end.line && position.character < range.end.character) || position.line < range.end.line)) 
            {
                return true;
            }
        });
       
        // Debug all local variables of function
        //functionGroup?.localVariableDefinitions.forEach(c => console.log(c.variableReference.getTokensAsString() + " " + GscVariableDefinitionType[c.type]));


        // In function scope
        if (functionGroup !== undefined) {

            // Get variable string before cursor
            // For example:
            //  level.aaa
            //  array1["abc"][0]
            var variableBeforeCursor = groupAtCursor.getVariableStringBeforePosition(position);
            //console.log("Var before: '" + variableBeforeCursor + "'");

            // Decide where we are
            const inWord = variableBeforeCursor === "" || groupAtCursor?.typeEqualsToOneOf(GroupType.VariableName, GroupType.Identifier);
            const inStructureVariable = (groupAtCursor?.type === GroupType.StructureField || (groupAtCursor?.getFirstToken().name === "."));
            const inArrayBrackets = (
                (groupAtCursor?.type === GroupType.Array && position.character < groupAtCursor.getRange().end.character) || // xxx[...]
                (variableBeforeCursor.at(-1) === "[") // xxx[
            );


            if (groupAtCursor.type !== GroupType.Path) {

                // Add items for variables like level.aaa, game["bbb"] and local1.aaa[0][1]
                this.createVariableItems(completionItems, functionGroup.localVariableDefinitions, variableBeforeCursor, inWord, inStructureVariable, inArrayBrackets);
                     
                if (onlyVariables === false) {

                    // Add items for predefined keywords (like true, false, undefined, if, else, waittillframeend, ...)
                    this.createKeywordItems(completionItems, inWord, inStructureVariable, inArrayBrackets);

                    this.createFunctionItems(completionItems, inWord, inStructureVariable, inArrayBrackets, currentGame);
                }
          
            } else {

                // Add items for path
                if (onlyVariables === false) {
                    await this.createPathItems(completionItems, position, groupAtCursor);
                }  
            }
            
        }

        const duration = performance.now() - startTime;
        console.log("CompletionProvider done, exec time: " + duration + "ms");

        return completionItems;
    }




    private static createVariableItems(completionItems: vscode.CompletionItem[], localVariableDefinitions: GscVariableDefinition[], 
        variableBeforeCursor: string, inWord: boolean, inStructureVariable: boolean, inArrayBrackets: boolean) 
    {
        // Select local variables 
        const variableItems: {name: string, detail: string | undefined, types: Set<GscVariableDefinitionType>, kind: vscode.CompletionItemKind}[] = [];

        // If user typed 'level.aaa.bbb', we want to get 'level.aaa.' (last non word char index)
        const nonWordChars = variableBeforeCursor.match(/\W/g);
        const lastNonWordIndexInCursorVar = nonWordChars ? variableBeforeCursor.lastIndexOf(nonWordChars[nonWordChars.length - 1]) : -1;

        //console.log("   inWord: " + inWord);
        //console.log("   inStructureVariable: " + inStructureVariable);
        //console.log("   inArrayVariable: " + inArrayBrackets);



        // Definition of global variables
        if (!inStructureVariable && (inWord || inArrayBrackets)) {
            variableItems.push({name: "level", detail: "", types: new Set<GscVariableDefinitionType>([GscVariableDefinitionType.Structure]), kind: vscode.CompletionItemKind.Variable});
            variableItems.push({name: "game", detail: "", types: new Set<GscVariableDefinitionType>([GscVariableDefinitionType.Array]), kind: vscode.CompletionItemKind.Variable});
            variableItems.push({name: "self", detail: "", types: new Set<GscVariableDefinitionType>([GscVariableDefinitionType.Unknown]), kind: vscode.CompletionItemKind.Variable});
        }

        // Local variables
        localVariableDefinitions.forEach(g => {
            getCompletionItemFromVariableDefinition(g);
        });

        // Level variables
        if (variableBeforeCursor.startsWith("level")) {
            const gscFiles = GscFile.getCachedFiles();
            gscFiles.forEach(g => {
                g.levelVariablesDefinitions.forEach(g => {
                    getCompletionItemFromVariableDefinition(g);
                });
            });
        }

        // Game variables
        if (variableBeforeCursor.startsWith("game")) {
            const gscFiles = GscFile.getCachedFiles();
            gscFiles.forEach(g => {
                g.gameVariablesDefinitions.forEach(g => {
                    getCompletionItemFromVariableDefinition(g);
                });
            });
        }


        function getCompletionItemFromVariableDefinition(g: GscVariableDefinition) {

            // Turn group of variable reference into variable parts
            //    struct1.field1      => ["struct1", ".field"]
            //    array1[0].field1    => ["array1", "[0]", ".field1"]
            //    array1[1][0]        => ["array1", "[1]", "[0]"]
            const variableParts = g.variableReference.getVariableParts();


            var varName = "";
            var type: GscVariableDefinitionType = GscVariableDefinitionType.Unknown;
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
            } else {
                variableItems.push({name: labelName, detail: detail, types: new Set<GscVariableDefinitionType>([type]), kind: kind});
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

    }

    

    private static createKeywordItems(completionItems: vscode.CompletionItem[], inWord: boolean, inStructureVariable: boolean, inArrayBrackets: boolean) {
              
        if (inWord || inArrayBrackets) {
            completionItems.push(new vscode.CompletionItem({label: "true", description: "", detail: ""}, vscode.CompletionItemKind.Constant));
            completionItems.push(new vscode.CompletionItem({label: "false", description: "", detail: ""}, vscode.CompletionItemKind.Constant));
            completionItems.push(new vscode.CompletionItem({label: "undefined", description: "", detail: ""}, vscode.CompletionItemKind.Constant));
        }

        if (inWord) {
            completionItems.push(new vscode.CompletionItem({label: "if", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "else", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "for", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "while", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "switch", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "return", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            
            completionItems.push(new vscode.CompletionItem({label: "case", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "default", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            
            completionItems.push(new vscode.CompletionItem({label: "break", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "continue", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            
            completionItems.push(new vscode.CompletionItem({label: "thread", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "wait", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "waittill", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "waittillmatch", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));      
            completionItems.push(new vscode.CompletionItem({label: "waittillframeend", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "notify", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "endon", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
            completionItems.push(new vscode.CompletionItem({label: "breakpoint", description: "", detail: ""}, vscode.CompletionItemKind.Keyword));
        }
    }



    private static createFunctionItems(completionItems: vscode.CompletionItem[], inWord: boolean, inStructureVariable: boolean, inArrayBrackets: boolean, currentGame: GscGame) {
        
        if (inWord || inArrayBrackets) {
            
            const defs = CodFunctions.getDefinitions(currentGame);

            const isUniversalGame = GscConfig.isUniversalGame(currentGame);
            
            defs.forEach(f => {
                var desc = "";
                if (f.returnType !== "") {
                    desc = "(" + f.returnType + ")";
                }

                const item = new vscode.CompletionItem({label: f.name, description: desc, detail: ""}, vscode.CompletionItemKind.Function);
                item.documentation = f.generateMarkdownDescription(isUniversalGame);

                completionItems.push(item);
            });
        }
    }


    /**
     * Get path before cursor and search for this path in workspace folders.
     */
    private static async createPathItems(completionItems: vscode.CompletionItem[], position: vscode.Position, groupAtCursor: GscGroup) {
        
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
        const keywords: {label: string, detail: string, kind: vscode.CompletionItemKind}[] = [];
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
                        keywords.push({label: folderName, detail: "", kind: vscode.CompletionItemKind.Folder});
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

                    keywords.push({label: fileName, detail: ".gsc", kind: vscode.CompletionItemKind.File});
                }
            }
        }

        // Add completion items
        keywords.forEach(k => {
            completionItems.push(new vscode.CompletionItem({ label: k.label, description: "", detail: k.detail}, k.kind));
        });
    }







    public static getItemDescriptionFromTypes(types: GscVariableDefinitionType[]) {
        const unknownValueTypes = [GscVariableDefinitionType.UnknownValue, GscVariableDefinitionType.UnknownValueFromFunction, GscVariableDefinitionType.UnknownValueFromVariable];
        
        var typesString = types
            .filter(t => !unknownValueTypes.includes(t))
            .map(type => {
                if (type === GscVariableDefinitionType.Unknown) {
                    return "?";
                } else {
                    function addSpaceBetweenLowerUpper(str: string): string {
                        return str.replace(/([a-z])([A-Z])/g, '$1 $2');
                    }
                    return addSpaceBetweenLowerUpper(GscVariableDefinitionType[type]).toLowerCase();
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