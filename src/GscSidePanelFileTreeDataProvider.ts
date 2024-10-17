import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';


interface GscTreeItemData {
    label: string;
    originalLabel?: string;
    children?: GscTreeItemData[];
    command?: vscode.Command;

    icon?: vscode.ThemeIcon;
}

enum GscTreeItem {
    ReferenceableGameRootFolders = 'Referenceable Game Root Folders',
    IgnoredFilePaths = 'Ignored File Paths',
    IgnoredFunctionNames = 'Ignored Function Names',
    CurrentGame = 'Current Game',
    ErrorDiagnostics = 'Error Diagnostics'
}


export class GscFileTreeDataProvider implements vscode.TreeDataProvider<GscTreeItemData> {
    private _onDidChangeTreeData: vscode.EventEmitter<GscTreeItemData | undefined | void> = new vscode.EventEmitter<GscTreeItemData | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<GscTreeItemData | undefined | void> = this._onDidChangeTreeData.event;

    constructor() {
    }

    getTreeItem(element: GscTreeItemData): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(
            element.label,
            element.children ? this.getCollapsibleState(element.originalLabel || element.label) : vscode.TreeItemCollapsibleState.None
        );

        return treeItem;
    }

    getChildren(element?: GscTreeItemData): GscTreeItemData[] {

        // Its a root element
        if (!element) {

            const editor = vscode.window.activeTextEditor;
            const gscFile = editor ? GscFiles.getCachedFile(editor.document.uri) : undefined;

            if (editor && gscFile) {

                const referenceableGameRootFolders = gscFile.config.referenceableGameRootFolders.map((folder: any) => ({ label: vscode.workspace.asRelativePath(folder.uri, true) }));
                const ignoredFilePaths = gscFile.config.ignoredFilePaths.map((path: string) => ({ label: path }));
                const ignoredFunctionNames = gscFile.config.ignoredFunctionNames.map((name: string) => ({ label: name }));
                const currentGame = [{ label: gscFile.config.currentGame }];
                const errorDiagnostics = [{ label: gscFile.config.errorDiagnostics }];
            
                return [
                    { label: `${GscTreeItem.ReferenceableGameRootFolders} (${referenceableGameRootFolders.length})`, originalLabel: GscTreeItem.ReferenceableGameRootFolders, children: referenceableGameRootFolders },
                    { label: `${GscTreeItem.IgnoredFilePaths} (${ignoredFilePaths.length})`, originalLabel: GscTreeItem.IgnoredFilePaths, children: ignoredFilePaths },
                    { label: `${GscTreeItem.IgnoredFunctionNames} (${ignoredFunctionNames.length})`, originalLabel: GscTreeItem.IgnoredFunctionNames, children: ignoredFunctionNames },
                    { label: `${GscTreeItem.CurrentGame} (${currentGame.length})`, originalLabel: GscTreeItem.CurrentGame, children: currentGame },
                    { label: `${GscTreeItem.ErrorDiagnostics} (${errorDiagnostics.length})`, originalLabel: GscTreeItem.ErrorDiagnostics, children: errorDiagnostics }
                ];
            }

            return [
                { label: 'No active editor' }
            ];
        }
        return element.children || [];
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    private getCollapsibleState(label: string): vscode.TreeItemCollapsibleState {
        switch (label) {
            case GscTreeItem.ReferenceableGameRootFolders:
            case GscTreeItem.IgnoredFilePaths:
            case GscTreeItem.IgnoredFunctionNames:
                return vscode.TreeItemCollapsibleState.Expanded;
            default:
                return vscode.TreeItemCollapsibleState.Collapsed;
        }
    }
}



