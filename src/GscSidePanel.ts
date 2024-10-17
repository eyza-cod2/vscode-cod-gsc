import * as vscode from 'vscode';
import { LoggerOutput } from './LoggerOutput';
import { GscWorkspaceTreeDataProvider } from './GscSidePanelWorkspaceTreeDataProvider';
import { GscFileTreeDataProvider } from './GscSidePanelFileTreeDataProvider';
import { OtherViewProvider } from './GscSidePanelOtherViewProvider';

export class GscSidePanel {
    public static fileInfoProvider: GscFileTreeDataProvider;
    public static workspaceInfoProvider: GscWorkspaceTreeDataProvider;
    public static otherViewProvider: OtherViewProvider;

    // Activates the logger and registers the necessary disposal function
    static async activate(context: vscode.ExtensionContext) {
        LoggerOutput.log("[GscSidePanel] Activating");

        this.fileInfoProvider = new GscFileTreeDataProvider();
        context.subscriptions.push(vscode.window.registerTreeDataProvider("gsc-view-file-info", GscSidePanel.fileInfoProvider));

        this.workspaceInfoProvider = new GscWorkspaceTreeDataProvider();
        context.subscriptions.push(vscode.window.registerTreeDataProvider("gsc-view-workspace-info", GscSidePanel.workspaceInfoProvider));

        this.otherViewProvider = new OtherViewProvider();
        context.subscriptions.push(vscode.window.registerWebviewViewProvider("gsc-view-other", GscSidePanel.otherViewProvider));
    }

}