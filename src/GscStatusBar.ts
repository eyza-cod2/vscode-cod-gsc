import * as vscode from 'vscode';
import { GscConfig } from './GscConfig';
import { EXTENSION_ID } from './extension';
import { LoggerOutput } from './LoggerOutput';
import { GscFiles } from './GscFiles';

export class GscStatusBar {

	private static gameBarItem: vscode.StatusBarItem;
	private static settingsBarItem: vscode.StatusBarItem;

	static async activate(context: vscode.ExtensionContext) {      
		LoggerOutput.log("[GscStatusBar] Activating"); 

		// Command to open extension settings
		const openExtensionSettingsCommand = 'gsc.openExtensionSettings';
		context.subscriptions.push(vscode.commands.registerCommand(openExtensionSettingsCommand, async () => {
			await vscode.commands.executeCommand('workbench.action.openWorkspaceSettings', '@ext:' + EXTENSION_ID);
		}));

		// Status bar item to open extension settings
		this.settingsBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 98);
		this.settingsBarItem.text = "$(settings-gear) GSC Settings";
		this.settingsBarItem.tooltip = "Open GSC Settings";
		this.settingsBarItem.command = openExtensionSettingsCommand;
		context.subscriptions.push(this.settingsBarItem);
		this.settingsBarItem.show();





		// Create a new status bar item that we can manage
		const gameCommandID = 'gsc.changeGame';

		this.gameBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
		this.gameBarItem.command = gameCommandID;
		this.gameBarItem.tooltip = 'Click to select a game';

		// Register the command to show the quick pick
		context.subscriptions.push(vscode.commands.registerCommand(gameCommandID, GscConfig.showGameQuickPick));
		context.subscriptions.push(this.gameBarItem);


		// Initial update of the status bar visibility
		await this.updateStatusBar("init");


	}


	// Function to update the visibility of the status bar item based on the language type
	public static async updateStatusBar(debugText: string) {
		const activeEditor = vscode.window.activeTextEditor;
		
		this.gameBarItem.hide();
		this.settingsBarItem.hide();

		if (activeEditor) {
			const languageId = activeEditor.document.languageId;
			if (languageId === 'gsc') {

				const uri = activeEditor.document.uri;
				
				// This file is not part of workspace
				const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
				if (workspaceFolder === undefined) {
					return;
				}

				LoggerOutput.log(`[GscStatusBar] Updating status bar because: ${debugText}`, vscode.workspace.asRelativePath(uri));

				const gscFile = GscFiles.getCachedFile(uri);
				
				const currentGame = (gscFile === undefined || debugText === "configChanged") ? GscConfig.getSelectedGame(workspaceFolder.uri) : gscFile.config.currentGame;
				
				LoggerOutput.log(`[GscStatusBar] Status bar updated with game: "${currentGame}"`, vscode.workspace.asRelativePath(uri));

				this.gameBarItem.text = "$(notebook-open-as-text) " + (currentGame);
				
				this.gameBarItem.show();
				this.settingsBarItem.show();	
			}
		}

	};

}