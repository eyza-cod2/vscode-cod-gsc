import * as vscode from 'vscode';

// These must match with package.json settings
export enum GscGame {
	UniversalGame = "Universal game",
	CoD1 = "CoD1",
	CoD2SP = "CoD2 SP",
	CoD2MP = "CoD2 MP",
}

// These must match with package.json settings
export enum ConfigErrorDiagnostics {
	Enable = "Enable",
	Disable = "Disable"
}



export class GscConfig {

	public static game: GscGame = GscGame.UniversalGame;


	static async activate(context: vscode.ExtensionContext) {       
	}


	/**
	 * Get path to game root folder. By default the game root folder is the workspace path. It can be changed in settings. Each folder can also have custom settings.
	 */
	public static getGameRootFolderOfFile(uri: vscode.Uri): vscode.Uri | undefined {
		
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
		
		if (!workspaceFolder) {
			return undefined;
		}

		const config = vscode.workspace.getConfiguration('gsc', uri);
		const configFolder = config.get<string>('gameRootFolder');

		if (configFolder) {
			return vscode.Uri.joinPath(workspaceFolder.uri, configFolder);
		} else {        
            return workspaceFolder.uri;
		}
	}


	public static changeRootFolder(uri: vscode.Uri, rootFolder: string) {
		const config = vscode.workspace.getConfiguration('gsc', uri);
		return config.update('gameRootFolder', rootFolder, vscode.ConfigurationTarget.WorkspaceFolder);
	}



	/**
	 * Get array of ignored function names
	 */
	public static getIgnoredFunctionNames(uri: vscode.Uri) {
        const config = vscode.workspace.getConfiguration('gsc', uri);
        const ignoredFunctionNames: string[] = config.get('ignoredFunctionNames', []);
		return ignoredFunctionNames;
	}
	public static addIgnoredFunctionName(uri: vscode.Uri, value: string) {
		const config = vscode.workspace.getConfiguration('gsc', uri);
		const ignoredFunctionNames: string[] = config.get('ignoredFunctionNames', []);
		ignoredFunctionNames.push(value);
		return config.update('ignoredFunctionNames', ignoredFunctionNames, vscode.ConfigurationTarget.WorkspaceFolder);
	}

	/**
	 * Get array of ignored file paths
	 */
	public static getIgnoredFilePaths(uri: vscode.Uri) {
		// Load ignored function names
        const config = vscode.workspace.getConfiguration('gsc', uri);
        const ignoredFunctionNames: string[] = config.get('ignoredFilePaths', []);

		return ignoredFunctionNames;
	}
	public static addIgnoredFilePath(uri: vscode.Uri, value: string | string[]) {
		const config = vscode.workspace.getConfiguration('gsc', uri);
		const ignoredFilePaths: string[] = config.get('ignoredFilePaths', []);
		if (typeof value === 'string') {
			ignoredFilePaths.push(value);
		} else{
			ignoredFilePaths.push(...value);
		}
		return config.update('ignoredFilePaths', ignoredFilePaths, vscode.ConfigurationTarget.WorkspaceFolder);
	}


	public static getErrorDiagnostics(uri: vscode.Uri): ConfigErrorDiagnostics {
		// Load ignored function names
        const config = vscode.workspace.getConfiguration('gsc', uri);
		const selectedOption = config.get<string>('errorDiagnostics', GscGame.UniversalGame);

		return GscConfig.errorDiagnosticsStringToEnum(selectedOption, ConfigErrorDiagnostics.Enable);
	}
	public static async updateErrorDiagnostics(uri: vscode.Uri, value: ConfigErrorDiagnostics) {
		// Load ignored function names
        const config = vscode.workspace.getConfiguration('gsc', uri);
		await config.update("errorDiagnostics", value, vscode.ConfigurationTarget.WorkspaceFolder);
	}
	public static errorDiagnosticsStringToEnum(game: string, def: ConfigErrorDiagnostics = ConfigErrorDiagnostics.Enable): ConfigErrorDiagnostics {	
		return (Object.values(ConfigErrorDiagnostics) as Array<string>).includes(game)
        ? (game as ConfigErrorDiagnostics)
        : def;
	}






	/**
	 * Get array of included workspace folders
	 */
	public static getIncludedWorkspaceFolders(uri: vscode.Uri) {
		// Load ignored function names
        const config = vscode.workspace.getConfiguration('gsc', uri);
        const includedWorkspaceFolders: string[] = config.get('includedWorkspaceFolders', []);

		return includedWorkspaceFolders;
	}
	public static addIncludedWorkspaceFolders(uri: vscode.Uri, value: string | string[]) {
		const config = vscode.workspace.getConfiguration('gsc', uri);
		const includedWorkspaceFolders: string[] = config.get('includedWorkspaceFolders', []);
		if (typeof value === 'string') {
			includedWorkspaceFolders.push(value);
		} else{
			includedWorkspaceFolders.push(...value);
		}
		return config.update('includedWorkspaceFolders', includedWorkspaceFolders, vscode.ConfigurationTarget.WorkspaceFolder);
	}


	public static isUniversalGame(game: GscGame): boolean {
        return game === GscGame.UniversalGame;
	}

	public static gameStringToEnum(game: string, defaultGame: GscGame = GscGame.UniversalGame): GscGame {	
		return (Object.values(GscGame) as Array<string>).includes(game)
        ? (game as GscGame)
        : defaultGame;
	}

	/**
	 * Get selected game.
	 */
	public static getSelectedGame(uri: vscode.Uri): GscGame {
        // Check if the URI is part of the workspace
        if (!vscode.workspace.getWorkspaceFolder(uri)) {
            return GscGame.UniversalGame;
        }
		// Load ignored function names
        const config = vscode.workspace.getConfiguration('gsc', uri);
		const selectedOption = config.get<string>('game', GscGame.UniversalGame);

		return GscConfig.gameStringToEnum(selectedOption, GscGame.UniversalGame);
	}

	public static async updateSelectedGame(uri: vscode.Uri, game: GscGame) {
        // Check if the URI is part of the workspace
        if (!vscode.workspace.getWorkspaceFolder(uri)) {
            throw new Error("The file is not part of the workspace.");
        }
		// Load ignored function names
        const config = vscode.workspace.getConfiguration('gsc', uri);

		await config.update("game", game, vscode.ConfigurationTarget.WorkspaceFolder);
	}

	public static async showGameQuickPick() {
		const options: vscode.QuickPickItem[] = [
			{ label: GscGame.UniversalGame },
			{ label: GscGame.CoD2SP },
			{ label: GscGame.CoD2MP }
		];
	
		const selection = await vscode.window.showQuickPick(options, {
			placeHolder: 'Select an option',
			canPickMany: false,
		});

		if (selection) {
			const activeEditor = vscode.window.activeTextEditor;
			if (activeEditor) {
				try {
					// Update configuration setting
					await GscConfig.updateSelectedGame(activeEditor.document.uri, GscConfig.gameStringToEnum(selection.label));
				} catch (error) {
					await vscode.window.showErrorMessage(`Failed to update setting: ${error}`);
				}
			}
		}	
	}

}