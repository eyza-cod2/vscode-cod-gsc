import * as vscode from 'vscode';
import { GscData } from "./GscFileParser";
import { ConfigErrorDiagnostics, GscConfig, GscGame } from './GscConfig';
import { GscFilesConfig, GscWorkspaceFileData } from './GscFileCache';
import { GscFiles } from './GscFiles';

/**
 * This type holds workspace configuration for current GSC file to easily access configuration without actually reading it from config file.
 * When configuration is changed, it is updated in all GscFile instances.
 */


export class GscFile {
    
    /** URI as lower-case string */
    id: string;
    
    /** URI of the file */
    uri: vscode.Uri;

    /** Path of this file from game perspective. For example: maps\mp\gametypes\script.gsc */
    gamePath: string;

    /** Configuration related to this file */
    config: GscFilesConfig;

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
            this.config = GscWorkspaceFileData.loadConfig(workspaceFolder);
        } else {
            this.config = {
                referenceableGameRootFolders: [],
                referenceableGameRootFoldersAll: [],
                referenceableWorkspaceFolders: [],
                referenceableWorkspaceFoldersAll: [],
                rootFolder: undefined,
                currentGame: GscGame.UniversalGame,
                ignoredFunctionNames: [],
                ignoredFilePaths: [],
                errorDiagnostics: ConfigErrorDiagnostics.Enable,
                gameConfig: GscConfig.gamesConfigs.get(GscGame.UniversalGame)!
            };
        }

        this.gamePath = GscFiles.getGamePathFromGscFile(this);
    }

    updateData(data: GscData, version: number) {
        this.data = data;
        this.version = version;
    }
}
