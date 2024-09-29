import * as vscode from 'vscode';
import { LoggerOutput } from './LoggerOutput';
import { Issues } from './Issues';

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


export type GscGameRootFolder = {
	uri: vscode.Uri;
	workspaceFolder: vscode.WorkspaceFolder;
	relativePath: string
}


type ConfigChangeHandler = () => Promise<void> | void;


export type GscGameConfig = {
	game: GscGame;
	/** Allow file being #include itself */
	includeFileItself: boolean;
	/** Allow global variable definitions */
	globalVariables: boolean;
	/** Allow /# #/ */
	developerBlocks: boolean;
	/** Allow /# #/ inside another /# #/ */
	developerBlocksRecursive: boolean;
	
	foreach: boolean;
	doWhile: boolean;
	arrayInitializer: boolean;
	ternary: boolean;
}


export class GscConfig {

	public static gamesConfigs: Map<GscGame, GscGameConfig> = new Map(
		[
			[GscGame.UniversalGame, {
				game: GscGame.UniversalGame,
				includeFileItself: true, 
				globalVariables: true,
				developerBlocks: true,
				developerBlocksRecursive: true,
				foreach: true, 
				doWhile: true, 
				arrayInitializer: true, 
				ternary: true,
			}],
			[GscGame.CoD1, {
				game: GscGame.CoD1,
				includeFileItself: false, 
				globalVariables: false,
				developerBlocks: false,
				developerBlocksRecursive: false,
				foreach: false, 
				doWhile: true, 
				arrayInitializer: false, 
				ternary: false,
			}],
			[GscGame.CoD2SP, {
				game: GscGame.CoD2SP,
				includeFileItself: false, 
				globalVariables: false,
				developerBlocks: true,
				developerBlocksRecursive: false,
				foreach: false, 
				doWhile: false, 
				arrayInitializer: false, 
				ternary: false,
			}],
			[GscGame.CoD2MP, {
				game: GscGame.CoD2MP,
				includeFileItself: false, 
				globalVariables: false,
				developerBlocks: true,
				developerBlocksRecursive: false,
				foreach: false, 
				doWhile: false, 
				arrayInitializer: false, 
				ternary: false,
			}],
		]
	);

    private static configChangeSubscribers: ConfigChangeHandler[] = [];


	static async activate(context: vscode.ExtensionContext) { 
		vscode.workspace.onDidChangeConfiguration((e) => this.onDidChangeConfiguration(e), null, context.subscriptions);
	}


	/**
	 * Handle vscode configuration change event. 
	 * Emit a configuration change event. This will call all subscribers in the order they were added.
	 */
	private static async onDidChangeConfiguration(e: vscode.ConfigurationChangeEvent) {
		if (e.affectsConfiguration('gsc')) {
			LoggerOutput.log("[GscConfig] GSC configuration changed.");
			
			for (const handler of this.configChangeSubscribers) {
				try {
					const result = handler();
					if (result instanceof Promise) {
						await result;
					}
				} catch (error) {
					Issues.handleError(error);
				}
			}
		}
	}


    /**
	 * Subscribe to configuration changes. The handler will be called whenever the configuration changes. Subscribers are called in the order they were added.
	 * @param handler 
	 */
    public static onDidConfigChange(handler: ConfigChangeHandler): vscode.Disposable {
        this.configChangeSubscribers.push(handler);
        return vscode.Disposable.from({
            dispose: () => {
                const index = this.configChangeSubscribers.indexOf(handler);
                if (index > -1) {
                    this.configChangeSubscribers.splice(index, 1);
                }
            }
        });
    }




	/**
	 * Get path to game root folder. By default the game root folder is the workspace path. It can be changed in settings. Each folder can also have custom settings.
	 */
	public static getGameRootFolder(fileOrWorkspaceURI: vscode.Uri): GscGameRootFolder | undefined {
		
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileOrWorkspaceURI);
		
		if (!workspaceFolder) {
			return undefined;
		}

		const config = vscode.workspace.getConfiguration('gsc', fileOrWorkspaceURI);
		const gameRootSubpath = config.get<string>('gameRootFolder');

		if (gameRootSubpath) {
			return {uri: vscode.Uri.joinPath(workspaceFolder.uri, gameRootSubpath.replace(/\\/g, '/')), workspaceFolder: workspaceFolder, relativePath: workspaceFolder.name + "/" + gameRootSubpath};
		} else {        
            return {uri: workspaceFolder.uri, workspaceFolder: workspaceFolder, relativePath: workspaceFolder.name};
		}
	}


	public static changeRootFolder(uri: vscode.Uri, rootFolder: string) {
		LoggerOutput.log("[GscConfig] Changing game root folder to: " + rootFolder, vscode.workspace.asRelativePath(uri));
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
		LoggerOutput.log("[GscConfig] Adding ignored function name: " + value, vscode.workspace.asRelativePath(uri));
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
		LoggerOutput.log("[GscConfig] Adding ignored file path: " + value, vscode.workspace.asRelativePath(uri));
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
		LoggerOutput.log("[GscConfig] Changing error diagnostics to: " + value, vscode.workspace.asRelativePath(uri));
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
		const valueStr = (typeof value === 'string') ? value : value.join(", ");
		LoggerOutput.log("[GscConfig] Adding included workspace folder: " + valueStr, vscode.workspace.asRelativePath(uri));
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
		LoggerOutput.log("[GscConfig] Changing selected game to: " + game, vscode.workspace.asRelativePath(uri));
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