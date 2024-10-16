import * as vscode from 'vscode';
import { GscFile, GscFileConfig } from './GscFile';
import { GscFiles } from './GscFiles';
import { GscConfig } from './GscConfig';
import { Events } from './Events';
import { LoggerOutput } from './LoggerOutput';




export class GscCachedFilesPerWorkspace {

    private cachedFilesPerWorkspace: Map<string, GscWorkspaceFileData> = new Map();

    createNewWorkspaceFileData(workspaceFolder: vscode.WorkspaceFolder): GscWorkspaceFileData {
        const data = new GscWorkspaceFileData(workspaceFolder);
        this.cachedFilesPerWorkspace.set(workspaceFolder.uri.toString(), data);
        return data;
    }

    getWorkspaceFileData(workspaceUri: vscode.Uri): GscWorkspaceFileData | undefined {
        return this.cachedFilesPerWorkspace.get(workspaceUri.toString());
    }

    removeCachedFile(fileUri: vscode.Uri) {
        // Get workspace folder where the file is located
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
        if (workspaceFolder === undefined) {
            return;
        }
        let dataOfWorkspace = this.getWorkspaceFileData(workspaceFolder.uri);
        if (dataOfWorkspace === undefined) {
            return;
        }
        dataOfWorkspace.removeParsedFile(fileUri);
    }

    removeWorkspaceFiles(workspaceUri: vscode.Uri) {
        const workspaceData = this.getWorkspaceFileData(workspaceUri);
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

    constructor(
        public workspaceFolder: vscode.WorkspaceFolder
    ) {}

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
        const data = GscWorkspaceFileData.getConfig(this.workspaceFolder);

        // Loop all GscFile and update their configuration
        for (const file of this.parsedFiles.values()) {
            file.config.referenceableGameRootFolders = data.referenceableGameRootFolders;
            file.config.currentGame = data.currentGame;
            file.config.ignoredFunctionNames = data.ignoredFunctionNames;
            file.config.ignoredFilePaths = data.ignoredFilePaths;
            file.config.errorDiagnostics = data.errorDiagnostics;
            file.config.gameConfig = data.gameConfig;
        }
    }

    static getConfig(workspaceFolder: vscode.WorkspaceFolder): GscFileConfig {

        // Get config for workspace folder
        const referenceableGameRootFolders = GscFiles.getReferenceableGameRootFolders(workspaceFolder);
        const currentGame = GscConfig.getSelectedGame(workspaceFolder.uri);
        const ignoredFunctionNames = GscConfig.getIgnoredFunctionNames(workspaceFolder.uri);
        const ignoredFilePaths = GscConfig.getIgnoredFilePaths(workspaceFolder.uri);
        const errorDiagnostics = GscConfig.getErrorDiagnostics(workspaceFolder.uri);
        const gameConfig = GscConfig.gamesConfigs.get(currentGame)!;

        return {referenceableGameRootFolders, currentGame, ignoredFunctionNames, ignoredFilePaths, errorDiagnostics, gameConfig};
    }
}
