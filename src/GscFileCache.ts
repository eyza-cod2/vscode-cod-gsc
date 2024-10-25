import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GscFiles } from './GscFiles';
import { ConfigErrorDiagnostics, GscConfig, GscGame, GscGameConfig, GscGameRootFolder } from './GscConfig';
import { Events } from './Events';
import { LoggerOutput } from './LoggerOutput';



// Configuration of workspace that applies to all files within the workspace
export type GscFilesConfig = {
    /** All possible game root folders where GSC files can be found and referenced. */
    referenceableGameRootFolders: GscGameRootFolder[];
    /** All possible game root folders where GSC files can be found and referenced, including reverse references */
    referenceableGameRootFoldersAll: GscGameRootFolder[];

    /** All possible workspace folders where GSC files can be found and referenced */
    referenceableWorkspaceFolders: vscode.WorkspaceFolder[];
    /** All possible workspace folders where GSC files can be found and referenced, including reverse references */
    referenceableWorkspaceFoldersAll: vscode.WorkspaceFolder[];

    /** Game root folder */
    rootFolder: GscGameRootFolder | undefined;
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


export class GscCachedFilesPerWorkspace {

    private cachedFilesPerWorkspace: Map<string, GscWorkspaceFileData> = new Map();

    createNewWorkspace(workspaceFolder: vscode.WorkspaceFolder): GscWorkspaceFileData {
        const data = new GscWorkspaceFileData(workspaceFolder);
        this.cachedFilesPerWorkspace.set(workspaceFolder.uri.toString(), data);
        return data;
    }

    getWorkspace(workspaceUri: vscode.Uri): GscWorkspaceFileData | undefined {
        return this.cachedFilesPerWorkspace.get(workspaceUri.toString());
    }

    removeCachedFile(fileUri: vscode.Uri) {
        // Get workspace folder where the file is located
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
        if (workspaceFolder === undefined) {
            return;
        }
        let dataOfWorkspace = this.getWorkspace(workspaceFolder.uri);
        if (dataOfWorkspace === undefined) {
            return;
        }
        dataOfWorkspace.removeParsedFile(fileUri);
    }

    removeWorkspace(workspaceUri: vscode.Uri) {
        const workspaceData = this.getWorkspace(workspaceUri);
        if (workspaceData === undefined) {
            return false;
        }
        workspaceData.removeAllParsedFiles();

        return this.cachedFilesPerWorkspace.delete(workspaceUri.toString());
    }

    getAllWorkspaces() {
        return this.cachedFilesPerWorkspace.values();
    }
    clear() {
        this.cachedFilesPerWorkspace.clear();
    }

}

/**
 * GSC files parsed in workspace folder
 */
export class GscWorkspaceFileData {
    private parsedFiles: Map<string, GscFile> = new Map();

    public config: GscFilesConfig;

    constructor(
        public workspaceFolder: vscode.WorkspaceFolder
    ) {
        this.config = GscWorkspaceFileData.loadConfig(this.workspaceFolder);
    }

    addParsedFile(gscFile: GscFile) {
        if (!this.parsedFiles.has(gscFile.id)) {
            LoggerOutput.log("[GscFileCache] Added file to cache", vscode.workspace.asRelativePath(gscFile.uri));
        } else {
            LoggerOutput.log("[GscFileCache] Updated file in cache", vscode.workspace.asRelativePath(gscFile.uri));
        }
        this.parsedFiles.set(gscFile.id, gscFile);
        
        Events.GscFileCacheFileHasChanged(gscFile.uri);
    }

    getParsedFile(uri: vscode.Uri): GscFile | undefined {
        const data = this.parsedFiles.get(uri.toString().toLowerCase());

        return data;
    }

    removeParsedFile(uri: vscode.Uri): boolean {
        const removed = this.parsedFiles.delete(uri.toString().toLowerCase());

        if (removed) {
            LoggerOutput.log("[GscFileCache] Removed file from cache", vscode.workspace.asRelativePath(uri));

            Events.GscFileCacheFileHasChanged(uri);
        } else {
            LoggerOutput.log("[GscFileCache] File not found in cache", vscode.workspace.asRelativePath(uri));
        }

        return removed;
    }

    removeAllParsedFiles() {
        const files = this.getAllParsedFileData();
        for (const file of files) {
            this.removeParsedFile(file.uri);
        }
    }

    getAllParsedFileData(): GscFile[] {
        return Array.from(this.parsedFiles.values());
    }

    updateConfiguration() {
        this.config = GscWorkspaceFileData.loadConfig(this.workspaceFolder);

        // Loop all GscFile and update their configuration
        for (const file of this.parsedFiles.values()) {
            file.config = this.config;

            file.gamePath = GscFiles.getGamePathFromGscFile(file);
        }
    }



    /**
     * Loads current settings for the workspace folder and returns them as GscFilesConfig object.
     */
    public static loadConfig(workspaceFolder: vscode.WorkspaceFolder): GscFilesConfig {
        const currentGame = GscConfig.getSelectedGame(workspaceFolder.uri);

        return {
            referenceableGameRootFolders: GscFiles.loadReferenceableGameRootFolders(workspaceFolder, false), 
            referenceableGameRootFoldersAll: GscFiles.loadReferenceableGameRootFolders(workspaceFolder, true), 
            referenceableWorkspaceFolders: GscFiles.loadReferenceableWorkspaceFolders(workspaceFolder, false), 
            referenceableWorkspaceFoldersAll: GscFiles.loadReferenceableWorkspaceFolders(workspaceFolder, true), 
            rootFolder: GscConfig.getGameRootFolder(workspaceFolder.uri), 
            currentGame: currentGame, 
            ignoredFunctionNames: GscConfig.getIgnoredFunctionNames(workspaceFolder.uri), 
            ignoredFilePaths: GscConfig.getIgnoredFilePaths(workspaceFolder.uri), 
            errorDiagnostics: GscConfig.getErrorDiagnostics(workspaceFolder.uri), 
            gameConfig: GscConfig.gamesConfigs.get(currentGame)!
        };
    }
}
