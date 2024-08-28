import * as vscode from 'vscode';
import { ConfigErrorDiagnostics, GscConfig } from './GscConfig';
import * as path from 'path';

export class GscCodeActionProvider implements vscode.CodeActionProvider {
   
    static async activate(context: vscode.ExtensionContext) {        
        vscode.languages.registerCodeActionsProvider('gsc', new GscCodeActionProvider(), {
            providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
        });

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addFolderForReferences', async (workspaceUri: vscode.Uri) => {
            // Prompt the user to select a folder
            const folderUri = await vscode.window.showOpenDialog({
                canSelectFolders: true,
                canSelectFiles: false,
                canSelectMany: false,
                openLabel: 'Add selected folder to Workspace'
            });

            if (folderUri && folderUri[0]) {
                const uri = folderUri[0];

                // Get folder name from the uri
                const folderName = path.basename(uri.fsPath);
                await GscConfig.addIncludedWorkspaceFolders(workspaceUri, folderName);

                // Add the selected folder to the workspace
                vscode.workspace.updateWorkspaceFolders(
                    0, //vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0,
                    null,
                    { uri }
                );

                void vscode.window.showInformationMessage(`Added folder to workspace: ${uri.fsPath}`);
            }
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.disableErrorDiagnostics', async (workspaceUri: vscode.Uri, workspaceFolderName: string) => {
            await GscConfig.updateErrorDiagnostics(workspaceUri, ConfigErrorDiagnostics.Disable);
            void vscode.window.showInformationMessage(`Disabled error diagnostic for workspace folder '${workspaceFolderName}'`);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addFunctionNameIntoIgnored', async (workspaceUri: vscode.Uri, functionName: string) => {
            await GscConfig.addIgnoredFunctionName(workspaceUri, functionName);
            void vscode.window.showInformationMessage(`Added '${functionName}' to ignored function names.`);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addFilePathIntoIgnored', async (workspaceUri: vscode.Uri, filePath: string) => {
            await GscConfig.addIgnoredFilePath(workspaceUri, filePath);
            void vscode.window.showInformationMessage(`Added '${filePath}' to ignored file paths.`);
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
            void vscode.window.showInformationMessage(`Added all missing files to ignored file paths.`);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.changeRootFolder', async (workspaceUri: vscode.Uri, rootFolder: string) => {
            await GscConfig.changeRootFolder(workspaceUri, rootFolder);
            void vscode.window.showInformationMessage(`Changed root folder to '${rootFolder}'.`);
        }));

        context.subscriptions.push(vscode.commands.registerCommand('gsc.addIncludedWorkspaceFolders', async (workspace: vscode.WorkspaceFolder, otherWorkspace: vscode.WorkspaceFolder, rootFolder?: string) => {
            if (rootFolder) {
                await GscConfig.changeRootFolder(otherWorkspace.uri, rootFolder);
                void vscode.window.showInformationMessage(`Changed root folder to '${rootFolder}'.`);
            }
            await GscConfig.addIncludedWorkspaceFolders(workspace.uri, otherWorkspace.name);
            void vscode.window.showInformationMessage(`Added workspace folder '${otherWorkspace.name}' for file references.`);
        }));
    }
   
   
    async provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext, token: vscode.CancellationToken): Promise<vscode.CodeAction[]> {
        return GscCodeActionProvider.getCodeActions(document.uri, context.diagnostics);
    }


    public static async getCodeActions(uri: vscode.Uri, diagnostics: readonly vscode.Diagnostic[]): Promise<vscode.CodeAction[]> {
        const codeActions: vscode.CodeAction[] = [];
        

        // Iterate over diagnostics to create code actions
        for (const diagnostic of diagnostics) {

            if (typeof diagnostic.code !== "string") {
                continue;
            }

            const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
            if (!workspaceFolder) {
                continue;
            }


            const code = diagnostic.code.toString();

            if (code.startsWith("unknown_function_")) {
                
                const funcName = diagnostic.code.substring("unknown_function_".length);
                
                const action = new vscode.CodeAction('Ignore function name "' + funcName + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                action.command = {
                    title: 'Add "' + funcName + '" to workspace settings',
                    command: 'gsc.addFunctionNameIntoIgnored',
                    arguments: [workspaceFolder.uri, funcName]
                };
                codeActions.push(action);

                // TODO Add change game root folder if function is included via #include but its in deeper folder


            } else if (code.startsWith("unknown_file_path_")) {
                const filePath = diagnostic.code.substring("unknown_file_path_".length);

                // Split the path by the backslash
                const parts = filePath.split('\\');
                var fileParentFolder: string | undefined = undefined;
                if (parts.length > 1) {
                    fileParentFolder = parts[0];
                }

                const action0 = new vscode.CodeAction('Choose folder for file references...', vscode.CodeActionKind.QuickFix);
                action0.command = {
                    title: action0.title,
                    command: 'gsc.addFolderForReferences',
                    arguments: [workspaceFolder.uri]
                };
                codeActions.push(action0);


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



                // Check if this file is deeper in the folder structure or is in another workspace folder
                const filePathWithExtension = (filePath.replace(/\\/g, '/') + ".gsc").toLowerCase();
                const files = await vscode.workspace.findFiles("**/*.gsc");

                // For some reason vscode.workspace.findFiles has different sort every time, so sort it
                files.sort((a, b) => {
                    const pathA = a.fsPath;
                    const pathB = b.fsPath;
                
                    // First, compare by length of the file path (descending)
                    if (pathA.length !== pathB.length) {
                        return pathB.length - pathA.length;
                    }
                
                    // If the lengths are the same, compare alphabetically (ascending)
                    return pathA.localeCompare(pathB);
                });

                // Filter results manually for a case-insensitive match
                for (const iteratedFileUri of files) {

                    const iteratedFileUriString = iteratedFileUri.toString();
                    
                    // Ignore files not ending the the required path
                    if (!iteratedFileUri.fsPath.replace(/\\/g, '/').toLowerCase().endsWith(filePathWithExtension)) {
                        continue;
                    }

                    // Get the workspace folder for the found file
                    const fileWorkspaceFolder = vscode.workspace.getWorkspaceFolder(iteratedFileUri);
                    if (!fileWorkspaceFolder) {
                        continue;
                    }

                    // Ignore iterated file if its from different workspace folder
                    if (fileWorkspaceFolder.uri.fsPath !== workspaceFolder.uri.fsPath) {
                        
                        const rootFolder = GscConfig.getGameRootFolderOfFile(iteratedFileUri);
                        if (!rootFolder) {
                            continue;
                        }

                        const expectedFilePath = vscode.Uri.file(path.join(rootFolder.fsPath, filePathWithExtension)).toString();

                        // This file was found exactly in game root folder
                        if (expectedFilePath.toLowerCase() === iteratedFileUriString.toLowerCase()) {
                            const action3 = new vscode.CodeAction('Add workspace folder "' + fileWorkspaceFolder.name + '" for file references (workspace settings)', vscode.CodeActionKind.QuickFix);
                            action3.command = {
                                title: action3.title,
                                command: 'gsc.addIncludedWorkspaceFolders',
                                arguments: [workspaceFolder, fileWorkspaceFolder]
                            };
                            codeActions.splice(0, 0, action3); // Insert at the beginning
                        }

                        // This file was found in subfolder of game root folder
                        else {
                            const relativePath = path.relative(fileWorkspaceFolder.uri.fsPath, iteratedFileUri.fsPath).toLowerCase().replace(/\\/g, '/');
                            if (relativePath.length > filePathWithExtension.length && relativePath.indexOf('/') > -1) {
                                // Extract the part of the path before the subPath
                                const requiredRootFolder = relativePath.replace(`/${filePathWithExtension.toLowerCase()}`, '');

                                const includedWorkspaceFolders = GscConfig.getIncludedWorkspaceFolders(workspaceFolder.uri);

                                // This workspace folder is already added to the workspace settings, so just change the root folder
                                if (includedWorkspaceFolders.includes(fileWorkspaceFolder.name)) {
                                    const action3 = new vscode.CodeAction(
                                        'Change game root folder to "' + requiredRootFolder + '" for workspace folder "' + fileWorkspaceFolder.name + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                                    action3.command = {
                                        title: action3.title,
                                        command: 'gsc.changeRootFolder',
                                        arguments: [fileWorkspaceFolder.uri, requiredRootFolder]
                                    };
                                    codeActions.splice(0, 0, action3); // Insert at the beginning
                                } else {
                                    const action3 = new vscode.CodeAction(
                                        'Add workspace folder "' + fileWorkspaceFolder.name + '" for file references and ' + 
                                        'change game root folder to "' + requiredRootFolder + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                                    action3.command = {
                                        title: action3.title,
                                        command: 'gsc.addIncludedWorkspaceFolders',
                                        arguments: [workspaceFolder, fileWorkspaceFolder, requiredRootFolder]
                                    };
                                    codeActions.splice(0, 0, action3); // Insert at the beginning
                                }
        

                            }
                        }
                        
                    } else {
                        const relativePath = path.relative(fileWorkspaceFolder.uri.fsPath, iteratedFileUri.fsPath).toLowerCase().replace(/\\/g, '/');
                        if (relativePath.length > filePathWithExtension.length && relativePath.indexOf('/') > -1) {
                            // Extract the part of the path before the subPath
                            const requiredRootFolder = relativePath.replace(`/${filePathWithExtension.toLowerCase()}`, '');
    
                            const action3 = new vscode.CodeAction('Change game root folder to "' + requiredRootFolder + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                            action3.command = {
                                title: action3.title,
                                command: 'gsc.changeRootFolder',
                                arguments: [fileWorkspaceFolder.uri, requiredRootFolder]
                            };
                            codeActions.splice(0, 0, action3); // Insert at the beginning
                        }
                    }
                }

            }

        }



        // Iterate over diagnostics to create code actions
        for (const diagnostic of diagnostics) {

            if (diagnostic.severity === vscode.DiagnosticSeverity.Error) {
                    
                const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
                if (!workspaceFolder) {
                    continue;
                }

                const action = new vscode.CodeAction('Disable all error diagnostics for workspace folder "' + workspaceFolder.name + '" (workspace settings)', vscode.CodeActionKind.QuickFix);
                action.command = {
                    title: action.title,
                    command: 'gsc.disableErrorDiagnostics',
                    arguments: [workspaceFolder.uri, workspaceFolder.name]
                };
                codeActions.push(action);

                // Don't continue because we want to show only one action for all errors
                break;
            }
        }

        return codeActions;
    }
}