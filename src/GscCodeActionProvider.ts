import * as vscode from 'vscode';
import { GscConfig } from './GscConfig';

export class GscCodeActionProvider implements vscode.CodeActionProvider {
   
    static async activate(context: vscode.ExtensionContext) {        
        vscode.languages.registerCodeActionsProvider('gsc', new GscCodeActionProvider(), {
            providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
        });

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addFunctionNameIntoIgnored', async (workspaceUri: vscode.Uri, functionName: string) => {
            await GscConfig.addIgnoredFunctionName(workspaceUri, functionName);
            await vscode.window.showInformationMessage(`Added '${functionName}' to ignored function names.`);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addFilePathIntoIgnored', async (workspaceUri: vscode.Uri, filePath: string) => {
            await GscConfig.addIgnoredFilePath(workspaceUri, filePath);
            await vscode.window.showInformationMessage(`Added '${filePath}' to ignored file paths.`);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addAllMissingFilePathsIntoIgnored', async (workspaceUri: vscode.Uri) => {
            const allDiagnostics = vscode.languages.getDiagnostics();
            const paths = new Set<string>();
            for (const [uri, diagnostics] of allDiagnostics) {
                for (const diagnostic of diagnostics) {
                    if (typeof diagnostic.code !== "string") {
                        continue;
                    }
                    const code = diagnostic.code.toString();
                    if (code.startsWith("unknown_file_path_")) {
                        const filePath = diagnostic.code.substring("unknown_file_path_".length);
                        paths.add(filePath);
                    }
                }
            };
            await GscConfig.addIgnoredFilePath(workspaceUri, [...paths]);
            await vscode.window.showInformationMessage(`Added all missing files to ignored file paths.`);
        }));
    }
   
   
    provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.Command | vscode.CodeAction)[]> {
        const codeActions: vscode.CodeAction[] = [];
        
        

        // Iterate over diagnostics to create code actions
        for (const diagnostic of context.diagnostics) {

            if (typeof diagnostic.code !== "string") {
                continue;
            }

            const code = diagnostic.code.toString();

            if (code.startsWith("unknown_function_")) {
                
                const funcName = diagnostic.code.substring("unknown_function_".length);
                
                const uri = vscode.workspace.getWorkspaceFolder(document.uri);
                if (!uri) {
                    continue;
                }
                
                const action = new vscode.CodeAction('Ignore function name "' + funcName + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                action.command = {
                    title: 'Add "' + funcName + '" to workspace settings',
                    command: 'gsc.addFunctionNameIntoIgnored',
                    arguments: [uri, funcName]
                };
                codeActions.push(action);

            } else if (code.startsWith("unknown_file_path_")) {
                const filePath = diagnostic.code.substring("unknown_file_path_".length);

                const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
                if (!workspaceFolder) {
                    continue;
                }

                // Split the path by the backslash
                const parts = filePath.split('\\');
                var rootFolder: string | undefined = undefined;
                if (parts.length > 1) {
                    rootFolder = parts[0];
                }

                const action = new vscode.CodeAction('Ignore file "' + filePath + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                action.command = {
                    title: 'Add "' + filePath + '" to workspace settings',
                    command: 'gsc.addFilePathIntoIgnored',
                    arguments: [workspaceFolder.uri, filePath]
                };
                codeActions.push(action);

                if (rootFolder) {
                    const action = new vscode.CodeAction('Ignore folder "' + rootFolder + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                    action.command = {
                        title: 'Add "' + rootFolder + '" to workspace settings',
                        command: 'gsc.addFilePathIntoIgnored',
                        arguments: [workspaceFolder.uri, rootFolder]
                    };
                    codeActions.push(action);
                }

                const action2 = new vscode.CodeAction('Ignore all missing files (workspace settings)', vscode.CodeActionKind.QuickFix);
                action2.command = {
                    title: 'Ignore all missing files (workspace settings)',
                    command: 'gsc.addAllMissingFilePathsIntoIgnored',
                    arguments: [workspaceFolder.uri]
                };
                codeActions.push(action2);
            }

        }

        return codeActions;
    }
}