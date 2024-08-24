import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData, GscFunction } from './GscFileParser';
import { CodFunctions } from './CodFunctions';
import { GscConfig } from './GscConfig';

export class GscHoverProvider implements vscode.HoverProvider {
    
    static async activate(context: vscode.ExtensionContext) {       
        context.subscriptions.push(vscode.languages.registerHoverProvider('gsc', new GscHoverProvider()));
    }

    public async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined> 
    {
        // Get parsed file
        const gscData = await GscFile.getFile(document.uri);

        const hover = await GscHoverProvider.getHover(gscData, position, document.uri);

        return hover;
    }

    public static async getHover(gscData: GscData, position: vscode.Position, uri: vscode.Uri): Promise<vscode.Hover> {
        let markdown = new vscode.MarkdownString();
        markdown.isTrusted = true; // enable HTML tags

        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);

        if (groupAtCursor?.type === GroupType.FunctionName) {
            const funcInfo = groupAtCursor.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {

                const currentGame = GscConfig.getSelectedGame(uri);
                const isUniversalGame = GscConfig.isUniversalGame(currentGame);

                // Get file URI and position where the file is defined
                const definitions = await GscFile.getFunctionNameDefinitions(funcInfo.name, funcInfo.path, uri);

                // File not found
                if (definitions === undefined) {
                    if (isUniversalGame) {
                        GscHoverProvider.markdownAppendFileWasNotFound(markdown, funcInfo.name, funcInfo.path);
                    }
                }

                // Function was found in exactly one place
                else if (definitions.length === 1) {
                    definitions.forEach(async d => {
                        GscHoverProvider.markdownAppendFunctionData(markdown, d.uri, d.func);
                    });
                }

                // Function is defined on too many places
                else if (definitions.length > 1) {
                    
                }

                // This function is predefined function
                else if (funcInfo.path === "" && CodFunctions.isPredefinedFunction(funcInfo.name, currentGame)) {
                    // Find in predefined functions
                    var preDefFunc = CodFunctions.getByName(funcInfo.name, funcInfo.callOn !== undefined, currentGame);

                    if (preDefFunc === undefined) {
                        preDefFunc = CodFunctions.getByName(funcInfo.name, undefined, currentGame)!;
                    }

                    markdown.appendMarkdown(preDefFunc.generateMarkdownDescription().value);
                }

                // Function not found
                else {
                    if (isUniversalGame) {
                        
                        // Try to find all possible predefined functions
                        var preDefFunc = CodFunctions.getByName(funcInfo.name, funcInfo.callOn !== undefined, undefined);

                        if (preDefFunc === undefined) {
                            preDefFunc = CodFunctions.getByName(funcInfo.name, undefined, undefined)!;
                        }

                        if (preDefFunc !== undefined) {
                            markdown.appendMarkdown(preDefFunc.generateMarkdownDescription(true).value);
                        } else {
                            GscHoverProvider.markdownAppendFunctionWasNotFound(markdown, funcInfo.name, funcInfo.path);
                        }
                    }

                    // Function was ignored
                    else {
                        
                        const ignoredFunctionNames: string[] = GscConfig.getIgnoredFunctionNames(uri);

                        const isIgnored = ignoredFunctionNames.find(name => name.toLowerCase() === funcInfo.name.toLowerCase()) !== undefined;
                        if (isIgnored) {
                            markdown.appendText(`This function name is ignored by workspace settings`);
                        }
            
                    }
                }

            }
        }

        return new vscode.Hover(markdown);
    }

    public static markdownAppendFileWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ File '${path}.gsc' was not found!`);
    }

    public static markdownAppendFunctionWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ Function '${funcName}' was not found${(path !== "" ? (" in '" + path + "'") : "")}!`);
    }

    public static markdownAppendFunctionData(md: vscode.MarkdownString, fileUri: string, functionData: GscFunction) {
        const parametersText = functionData.parameters.map(p => p.name).join(", ");
        
        md.appendCodeblock(`${functionData.name}(${parametersText})`);

        md.appendMarkdown("File: ```" + vscode.workspace.asRelativePath(vscode.Uri.parse(fileUri)) + "```");
    }


}