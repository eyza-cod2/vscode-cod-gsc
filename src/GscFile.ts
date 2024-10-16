import * as vscode from 'vscode';
import { GscData } from "./GscFileParser";
import { ConfigErrorDiagnostics, GscConfig, GscGame, GscGameConfig, GscGameRootFolder } from './GscConfig';
import { GscWorkspaceFileData } from './GscFileCache';

/**
 * This type holds workspace configuration for current GSC file to easily access configuration without actually reading it from config file.
 * When configuration is changed, it is updated in all GscFile instances.
 */
export type GscFileConfig = {
    /** All possible game root folders where GSC files can be found and referenced. */
    referenceableGameRootFolders: GscGameRootFolder[];
    /** Ignored function names */
    ignoredFunctionNames: string[];
    /** Ignored file paths */
    ignoredFilePaths: string[];
    /** Currently selected game */
    currentGame: GscGame;
    /** Mode of diagnostics collection */
    errorDiagnostics: ConfigErrorDiagnostics;
    /** Syntax configuration of the selected game */
    gameConfig: GscGameConfig;
};



export class GscFile {
    
    /** URI as lower-case string */
    id: string;
    
    /** URI of the file */
    uri: vscode.Uri;

    /** Configuration related to this file */
    config: GscFileConfig;

    /** Diagnostics generated for this file. @see GscFileDiagnostics.ts */
    diagnostics: vscode.Diagnostic[] = [];




    constructor(
        /** Parsed data */
        public data: GscData,
        /** URI of the file */
        uri?: vscode.Uri, // might be undefined for tests
        /** Workspace folder to which this file belongs to */
        public workspaceFolder?: vscode.WorkspaceFolder,
        /** The version number of open document (it will strictly increase after each change, including undo/redo). If file is not open in editor, it will be -1 */
        public version: number = -1
    ) {
        if (uri === undefined) {
            uri = vscode.Uri.parse("file://undefined");
        }
        this.id = uri.toString().toLowerCase();
        this.uri = uri;

        if (workspaceFolder !== undefined) {
            this.config = GscWorkspaceFileData.getConfig(workspaceFolder);
        } else {
            this.config = {
                referenceableGameRootFolders: [],
                currentGame: GscGame.UniversalGame,
                ignoredFunctionNames: [],
                ignoredFilePaths: [],
                errorDiagnostics: ConfigErrorDiagnostics.Enable,
                gameConfig: GscConfig.gamesConfigs.get(GscGame.UniversalGame)!
            };
        }
    }

    updateData(data: GscData, version: number) {
        this.data = data;
        this.version = version;
    }
}
