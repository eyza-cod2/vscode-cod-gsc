import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GscConfig } from './GscConfig';
import { LoggerOutput } from './LoggerOutput';

enum GscWorkspaceTreeItemType {
    WorkspaceFolder,
    IncludedWorkspaceFolders,
    IncludedWorkspaceFolder,
    CachedGscFiles,
    CachedGscFile,
    CachedGscFileData
}

class GscWorkspaceTreeItem extends vscode.TreeItem  {

    constructor(
        public readonly label: string,
        public readonly type: GscWorkspaceTreeItemType,
        public readonly workspace: vscode.WorkspaceFolder,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly icon?: vscode.ThemeIcon,

    ) {
        super(label, collapsibleState);
        this.iconPath = icon;  
    }

    children?: GscWorkspaceTreeItem[];

    updateTimer?: NodeJS.Timeout;
}


export class GscWorkspaceTreeDataProvider implements vscode.TreeDataProvider<GscWorkspaceTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<GscWorkspaceTreeItem | undefined | void> = new vscode.EventEmitter<GscWorkspaceTreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<GscWorkspaceTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    private _cachedGscFiles: GscWorkspaceTreeItem[] = [];
    private _includedWorkspaceFolders: GscWorkspaceTreeItem[] = [];

    constructor() {
    }

    // Called also when onDidChangeTreeData is fired
    getTreeItem(element: GscWorkspaceTreeItem): vscode.TreeItem {
        
        //console.log("getTreeItem", element);

        let treeItem: vscode.TreeItem;


        switch (element.type) {
            case GscWorkspaceTreeItemType.WorkspaceFolder:
                treeItem = element;
                break;

            case GscWorkspaceTreeItemType.IncludedWorkspaceFolders:
                treeItem = element;

                // Update the children of "Cached GSC Files" now to get the count in advance, and save it into children to reuse later
                const includedFolders = GscConfig.getIncludedWorkspaceFolders(element.workspace.uri).map(name => new GscWorkspaceTreeItem(
                    name, 
                    GscWorkspaceTreeItemType.IncludedWorkspaceFolder, 
                    element.workspace, 
                    vscode.TreeItemCollapsibleState.None
                ));
                element.children = includedFolders;

                treeItem.description = (element.children ? element.children.length : 0).toString();
                break;


            case GscWorkspaceTreeItemType.IncludedWorkspaceFolder:
                treeItem = element;
                break;



            case GscWorkspaceTreeItemType.CachedGscFiles:
                treeItem = element;

                // Update the children of "Cached GSC Files" now to get the count in advance, and save it into children to reuse later
                const cachedFiles = GscFiles.getCachedFiles([element.workspace.uri]).map((file, i) => new GscWorkspaceTreeItem(
                    vscode.workspace.asRelativePath(file.uri, false),
                    GscWorkspaceTreeItemType.CachedGscFile,
                    element.workspace,
                    vscode.TreeItemCollapsibleState.None
                ));
                element.children = cachedFiles;

                treeItem.description = (element.children ? element.children.length : 0).toString();
                break;

            case GscWorkspaceTreeItemType.CachedGscFile:
                treeItem = element;
                break;

            case GscWorkspaceTreeItemType.CachedGscFileData:
                treeItem = element;
                break;
        
            default:
                throw new Error("Unknown tree item type");
                break;
        }
    
        return treeItem;
    }

    // Called also when parent item is expanded
    getChildren(element?: GscWorkspaceTreeItem): GscWorkspaceTreeItem[] {
        const items: GscWorkspaceTreeItem[] = [];

        //console.log("getChildren", element);

        // Its a root element
        if (!element) {

            // Add workspace folders
            const workspaceFolders = vscode.workspace.workspaceFolders || [];
            for (const workspaceFolder of workspaceFolders) {
                items.push(new GscWorkspaceTreeItem(
                    workspaceFolder.name, 
                    GscWorkspaceTreeItemType.WorkspaceFolder, 
                    workspaceFolder, 
                    vscode.TreeItemCollapsibleState.Expanded, 
                    new vscode.ThemeIcon('folder'))
                );
            }
            this._includedWorkspaceFolders.length = 0;
            this._cachedGscFiles.length = 0;
            return items;
        }
        else {
            switch (element.type) {
                case GscWorkspaceTreeItemType.WorkspaceFolder:

                    const includedWorkspaceFoldersItem = new GscWorkspaceTreeItem(
                        "Included Workspace Folders", 
                        GscWorkspaceTreeItemType.IncludedWorkspaceFolders, 
                        element.workspace, 
                        vscode.TreeItemCollapsibleState.Collapsed
                    );
                    this._includedWorkspaceFolders.push(includedWorkspaceFoldersItem);
                    items.push(includedWorkspaceFoldersItem);


                    const cachedGscFilesItem = new GscWorkspaceTreeItem(
                        "Cached GSC Files", 
                        GscWorkspaceTreeItemType.CachedGscFiles, 
                        element.workspace, 
                        vscode.TreeItemCollapsibleState.Collapsed
                    );
                    this._cachedGscFiles.push(cachedGscFilesItem);
                    items.push(cachedGscFilesItem);

                    return items;

                case GscWorkspaceTreeItemType.IncludedWorkspaceFolders:
                    // Included workspace folders are generated when "Included Workspace Folders" is refreshed (to get the count), so use that
                    return element.children || [];


                case GscWorkspaceTreeItemType.CachedGscFiles:
                    // Cached files are generated when "Cached GSC Files" is refreshed (to get the count), so use that
                    return element.children || [];


                case GscWorkspaceTreeItemType.CachedGscFile:
                    break;
            }
        }

        return element.children || [];
    }

    refreshAll(): void {
        LoggerOutput.log("[GscSidePanel] Workspace view - refreshing all");

        this._onDidChangeTreeData.fire();
    }

    refreshCachedGscFiles(fileUri: vscode.Uri): void {
        //LoggerOutput.log("[GscSidePanel] Workspace view - debouncing update of 'Cached GSC files'", vscode.workspace.asRelativePath(fileUri));

        const workspaceUri = vscode.workspace.getWorkspaceFolder(fileUri)?.uri;
        const cachedGscFilesItem = this._cachedGscFiles.find(item => item.workspace?.uri.toString() === workspaceUri?.toString());

        if (cachedGscFilesItem) {
            //console.log("debuncing item to update", cachedGscFilesItem.workspace?.name);

            if (cachedGscFilesItem.updateTimer) {
                clearTimeout(cachedGscFilesItem.updateTimer);
            }
            cachedGscFilesItem.updateTimer = setTimeout(() => {
                LoggerOutput.log("[GscSidePanel] Workspace view - refreshing 'Cached GSC files' for " + cachedGscFilesItem.workspace?.name + " (debounced)", vscode.workspace.asRelativePath(fileUri));

                this._onDidChangeTreeData.fire(cachedGscFilesItem);
            }, 500);

        } else {
            // Not found, it means the workspace is not in the tree.
            // It gets refreshed by another event.
        }
    }



    refreshIncludedWorkspaceFolders(): void {
        LoggerOutput.log("[GscSidePanel] Workspace view - update of 'Included workspace folders', count: " + this._includedWorkspaceFolders.length);

        //this._includedWorkspaceFolders;
        for (const item of this._includedWorkspaceFolders) {
            this._onDidChangeTreeData.fire(item);
        }
    }
}

