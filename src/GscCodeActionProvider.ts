import * as vscode from 'vscode';
import { GscConfig } from './GscConfig';
import * as path from 'path';

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

        context.subscriptions.push(vscode.commands.registerCommand('gsc.changeRootFolder', async (workspaceUri: vscode.Uri, rootFolder: string) => {
            await GscConfig.changeRootFolder(workspaceUri, rootFolder);
            await vscode.window.showInformationMessage(`Changed root folder to '${rootFolder}'.`);
        }));
    }
   
   
    async provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext, token: vscode.CancellationToken): Promise<vscode.CodeAction[]> {
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
                var fileParentFolder: string | undefined = undefined;
                if (parts.length > 1) {
                    fileParentFolder = parts[0];
                }

                const action = new vscode.CodeAction('Ignore file "' + filePath + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                action.command = {
                    title: 'Add "' + filePath + '" to workspace settings',
                    command: 'gsc.addFilePathIntoIgnored',
                    arguments: [workspaceFolder.uri, filePath]
                };
                codeActions.push(action);

                if (fileParentFolder) {
                    const action = new vscode.CodeAction('Ignore folder "' + fileParentFolder + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                    action.command = {
                        title: 'Add "' + fileParentFolder + '" to workspace settings',
                        command: 'gsc.addFilePathIntoIgnored',
                        arguments: [workspaceFolder.uri, fileParentFolder]
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



                // Check if this file is deeper in the folder structure
                const filePathWithExtension = (filePath.replace(/\\/g, '/') + ".gsc").toLowerCase();
                const files = await vscode.workspace.findFiles("**/*.gsc");
                // Filter results manually for a case-insensitive match
                for (const file of files) {              
                    // Get the workspace folder for the found file
                    const workspaceFolder = vscode.workspace.getWorkspaceFolder(file);
                    if (!workspaceFolder) {
                        continue;
                    }
                    const relativePath = path.relative(workspaceFolder.uri.fsPath, file.fsPath).toLowerCase().replace(/\\/g, '/');
                    if (relativePath.endsWith(filePathWithExtension)) {
                        // Extract the part of the path before the subPath
                        const requiredRootFolder = relativePath.toLowerCase().replace(`/${filePathWithExtension.toLowerCase()}`, '');

                        const action3 = new vscode.CodeAction('Change game root folder to "' + requiredRootFolder + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                        action3.command = {
                            title: 'Change game root folder to "' + requiredRootFolder + '" (workspace settings)',
                            command: 'gsc.changeRootFolder',
                            arguments: [workspaceFolder.uri, requiredRootFolder]
                        };
                        codeActions.splice(0, 0, action3); // Insert at the beginning
                    }
                }

            }

        }

        return codeActions;
    }
}