import * as vscode from 'vscode';
import { GscFile, GscFiles } from './GscFiles';
import { GroupType, GscData } from './GscFileParser';
import { CodFunctions } from './CodFunctions';
import { ConfigErrorDiagnostics, GscConfig } from './GscConfig';
import { GscFunctions, GscFunctionState } from './GscFunctions';
import { Issues } from './Issues';
import { LoggerOutput } from './LoggerOutput';

export class GscHoverProvider implements vscode.HoverProvider {
    
    static async activate(context: vscode.ExtensionContext) {       
        context.subscriptions.push(vscode.languages.registerHoverProvider('gsc', new GscHoverProvider()));
    }

    public async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined>  {
        try {
            LoggerOutput.log("[GscHoverProvider] Provide hover at " + position.line + ":" + position.character, vscode.workspace.asRelativePath(document.uri));
            
            // Get parsed file
            const gscData = await GscFiles.getFileData(document.uri);

            const hover = await GscHoverProvider.getHover(gscData, position);

            LoggerOutput.log("[GscHoverProvider] Done, hover: " + (hover !== undefined), vscode.workspace.asRelativePath(document.uri));

            return hover;
        } catch (error) {
            Issues.handleError(error);
        }
    }


    public static async getHover(gscFile: GscFile, position: vscode.Position): Promise<vscode.Hover | undefined> {
        let markdown = new vscode.MarkdownString();
        markdown.isTrusted = true; // enable HTML tags

        const gscData = gscFile.data;
        const uri = gscFile.uri;

        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);

        if (groupAtCursor?.type === GroupType.FunctionName) {
            const funcInfo = groupAtCursor.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {

                const isUniversalGame = GscConfig.isUniversalGame(gscFile.currentGame);
                const errorDiagnosticsDisabled = gscFile.errorDiagnostics === ConfigErrorDiagnostics.Disable;

                const res = await GscFunctions.getFunctionReferenceState({name: funcInfo.name, path: funcInfo.path}, gscFile);
    
                switch (res.state as GscFunctionState) {
                    case GscFunctionState.NameIgnored:
                        markdown.appendText(`🛈 Function name '${funcInfo.name}' is ignored by workspace settings!`);
                        break;

                    case GscFunctionState.Found:
                        res.definitions.forEach(async d => {

                            markdown.appendMarkdown(d.func.generateMarkdownDescription(d.uri === uri.toString(), d.uri, d.reason).value);
    
                            /*public static markdownAppendFunctionData(md: vscode.MarkdownString, fileUri: string, functionData: GscFunction) {
                                const parametersText = functionData.parameters.map(p => p.name).join(", ");
                                
                                md.appendCodeblock(`${functionData.name}(${parametersText})`);
                        
                                md.appendMarkdown("File: ```" + vscode.workspace.asRelativePath(vscode.Uri.parse(fileUri)) + "```");
                            }*/
                        });
                        break;


                    case GscFunctionState.FoundOnMultiplePlaces:
                        // There would be error by diagnostics
                        break;


                    case GscFunctionState.FoundInPredefined:
                        // Find in predefined functions
                        var preDefFunc = CodFunctions.getByName(funcInfo.name, funcInfo.callOn !== undefined, gscFile.currentGame);

                        if (preDefFunc === undefined) {
                            preDefFunc = CodFunctions.getByName(funcInfo.name, undefined, gscFile.currentGame)!;
                        }

                        markdown.appendMarkdown(preDefFunc.generateMarkdownDescription().value);
                        break;


                    case GscFunctionState.NotFoundFile:
                        // There would be also error by diagnostics, but it will be on file path, not on function name
                        GscHoverProvider.markdownAppendFileWasNotFound(markdown, funcInfo.name, funcInfo.path);
                        if (errorDiagnosticsDisabled) {
                            markdown.appendText(`\n\n🛈 Error diagnostics disabled via workspace settings`);
                        }
                        break;

                    case GscFunctionState.NotFoundFileButIgnored:
                        markdown.appendText(`🛈 File '${funcInfo.path}.gsc' was not found, but its ignored by workspace settings!`);
                        break;


                    case GscFunctionState.NotFoundFunctionExternal:
                        // There would be error by diagnostics, unless disabled
                        if (errorDiagnosticsDisabled) {
                            markdown.appendText(`⚠️ Function '${funcInfo.name}' is not defined in '${funcInfo.path}.gsc'!`);
                        }
                        break;


                    case GscFunctionState.NotFoundFunctionLocal:
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
                        } else {
                            // There would be error by diagnostics, unless disabled
                            if (errorDiagnosticsDisabled) {
                                markdown.appendText(`⚠️ Function '${funcInfo.name}' is not defined!!`);
                                markdown.appendText(`\n\n🛈 Error diagnostics disabled via workspace settings`);
                            }
                        }
                        break;
                }


            }
        }

        if (markdown.value === "") {
            return undefined;
        } else {
            return new vscode.Hover(markdown);
        }
    }

    public static markdownAppendFileWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ File '${path}.gsc' was not found!`);
    }

    public static markdownAppendFunctionWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ Function '${funcName}' was not found${(path !== "" ? (" in '" + path + "'") : "")}!`);
    }


}