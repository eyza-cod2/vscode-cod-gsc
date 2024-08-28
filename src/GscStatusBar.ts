import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData, GscFileParser } from './GscFileParser';
import { GscConfig } from './GscConfig';
import { EXTENSION_ID } from './extension';

export class GscStatusBar {

	static async activate(context: vscode.ExtensionContext) {       

		// Command to open extension settings
		const openExtensionSettingsCommand = 'gsc.openExtensionSettings';
		context.subscriptions.push(vscode.commands.registerCommand(openExtensionSettingsCommand, async () => {
			await vscode.commands.executeCommand('workbench.action.openWorkspaceSettings', '@ext:' + EXTENSION_ID);
		}));

		// Status bar item to open extension settings
		const settingsBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 98);
		settingsBarItem.text = "$(settings-gear) GSC Settings";
		settingsBarItem.tooltip = "Open GSC Settings";
		settingsBarItem.command = openExtensionSettingsCommand;
		context.subscriptions.push(settingsBarItem);
		settingsBarItem.show();





		// Create a new status bar item that we can manage
		const gameCommandID = 'gsc.changeGame';

		const gameBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
		gameBarItem.command = gameCommandID;
		gameBarItem.tooltip = 'Click to select a game';

		// Register the command to show the quick pick
		context.subscriptions.push(vscode.commands.registerCommand(gameCommandID, GscConfig.showGameQuickPick));
		context.subscriptions.push(gameBarItem);




		// Function to update the visibility of the status bar item based on the language type
		const updateStatusBar = async (debugText: string) => {
			const activeEditor = vscode.window.activeTextEditor;
			
			gameBarItem.hide();
			settingsBarItem.hide();

			if (activeEditor) {
				const languageId = activeEditor.document.languageId;
				if (languageId === 'gsc') {
					
					// This file is not part of workspace
					const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
					if (workspaceFolder === undefined) {
						return;
					}

					const selectedGame = GscConfig.getSelectedGame(activeEditor.document.uri);

					console.log(`Updating status bar with game: ${selectedGame} because of: ${debugText}`);

					gameBarItem.text = "$(notebook-open-as-text) " + (selectedGame);
					
					gameBarItem.show();
					settingsBarItem.show();	
				}
			}

		};

		// Register event listeners to update status bar visibility
		vscode.window.onDidChangeActiveTextEditor(() => updateStatusBar("activeEditorChanged"), null, context.subscriptions);
		
		//vscode.workspace.onDidOpenTextDocument(updateStatusBar, null, context.subscriptions);
		//vscode.workspace.onDidCloseTextDocument(updateStatusBar, null, context.subscriptions);
		
		vscode.workspace.onDidChangeConfiguration(async (e) => {
			if (e.affectsConfiguration('gsc')) {
                await updateStatusBar("configChanged");
			}
		}, null, context.subscriptions);

		// Initial update of the status bar visibility
		await updateStatusBar("init");


	}


}