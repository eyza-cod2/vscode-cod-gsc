import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GscFile } from './GscFile';
import { GroupType } from './GscFileParser';
import { CodFunctions } from './CodFunctions';
import { ConfigErrorDiagnostics, GscConfig } from './GscConfig';
import { GscFunctions, GscFunctionState } from './GscFunctions';
import { Issues } from './Issues';
import { LoggerOutput } from './LoggerOutput';

export class GscHoverProvider implements vscode.HoverProvider {
    
    static async activate(context: vscode.ExtensionContext) {    
        LoggerOutput.log("[GscHoverProvider] Activating");
           
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
            const gscData = await GscFiles.getFileData(document.uri, false, "provide hover");

            const hover = await GscHoverProvider.getHover(gscData, position);

            LoggerOutput.log("[GscHoverProvider] Done, hover: " + (hover !== undefined), vscode.workspace.asRelativePath(document.uri));

            return hover;
        } catch (error) {
            Issues.handleError(error);
        }
    }


    public static async getHover(gscFile: GscFile, position: vscode.Position): Promise<vscode.Hover | undefined> {
        let hoverRange: vscode.Range | undefined = undefined;
        let markdown = new vscode.MarkdownString();
        markdown.isTrusted = true; // enable HTML tags

        const gscData = gscFile.data;
        const uri = gscFile.uri;
        const isUniversalGame = GscConfig.isUniversalGame(gscFile.config.currentGame);
        const errorDiagnosticsDisabled = gscFile.config.errorDiagnostics === ConfigErrorDiagnostics.Disable;

        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);

        if (groupAtCursor?.type === GroupType.FunctionName) {
            const funcInfo = groupAtCursor.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {

                const res = GscFunctions.getFunctionReferenceState({name: funcInfo.name, path: funcInfo.path}, gscFile);
    
                switch (res.state as GscFunctionState) {
                    case GscFunctionState.NameIgnored:
                        markdown.appendText(`🛈 Function name '${funcInfo.name}' is ignored by workspace settings!`);
                        break;

                    case GscFunctionState.Found:

                        for (let i = 0; i < res.definitions.length; i++) {
                            const d = res.definitions[i];
                            if (!gscFile.config.gameConfig.duplicateFunctionDefinitions && i > 0) {
                                markdown.appendMarkdown('\n\r');
                                markdown.appendMarkdown('--------------------------------------------------------------------------  \n\r');
                            }

                            markdown.appendMarkdown(d.func.generateMarkdownDescription(d.uri.toString() === uri.toString(), d.uri.toString(), d.reason).value);

                            if (gscFile.config.gameConfig.duplicateFunctionDefinitions) {
                                if (res.definitions.length > 1) {
                                    const files = res.definitions
                                        .filter((f, i) => (i > 0) && (f.uri.toString() !== uri.toString())); // ignore first definition and current file (if duplicate func)
                                        
                                    if (files.length > 0) {
                                        markdown.appendMarkdown('\n\r');
                                        markdown.appendMarkdown('--------------------------------------------------------------------------  \n\r');
                                        if (files.length === 1) {
                                            markdown.appendMarkdown(`Function '${funcInfo.name}' is also defined in this file:  \n\r`);
                                        } else {
                                            markdown.appendMarkdown(`Function '${funcInfo.name}' is also defined in these files:  \n\r`);
                                        }
                                        markdown.appendMarkdown(files.map(f => `\n- ${vscode.workspace.asRelativePath(f.uri)}`).join(""));
                                    }
                                }
                                break; // Show only first definition for universal game
                            }
                        }
                        break;


                    case GscFunctionState.FoundInPredefined:
                        // Find in predefined functions
                        var preDefFunc = CodFunctions.getByName(funcInfo.name, funcInfo.callOn !== undefined, gscFile.config.currentGame);

                        if (preDefFunc === undefined) {
                            preDefFunc = CodFunctions.getByName(funcInfo.name, undefined, gscFile.config.currentGame)!;
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

        } else if (groupAtCursor?.type === GroupType.Path) {
            const path = groupAtCursor.getTokensAsString();
            const fileReference = GscFiles.getReferencedFileForFile(gscFile, path);
            if (fileReference !== undefined && fileReference.gscFile !== undefined) {
                markdown.appendMarkdown("File: `" + vscode.workspace.asRelativePath(fileReference.gscFile.uri, true) + "`");
                hoverRange = groupAtCursor.getRange();
            } else {
                // There would be error by diagnostics, unless disabled
                if (errorDiagnosticsDisabled) {
                    markdown.appendText(`⚠️ Path '${path}' is not valid!`);
                    markdown.appendText(`\n\n🛈 Error diagnostics disabled via workspace settings`);
                }
            }

        }

        if (markdown.value === "") {
            return undefined;
        } else {
            return new vscode.Hover(markdown, hoverRange);
        }
    }

    public static markdownAppendFileWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ File '${path}.gsc' was not found!`);
    }

    public static markdownAppendFunctionWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ Function '${funcName}' was not found${(path !== "" ? (" in '" + path + "'") : "")}!`);
    }


}