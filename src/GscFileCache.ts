import * as vscode from 'vscode';
import * as os from 'os';
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


export class GscFileCache {

    /**
     * Generates a normalized identifier (ID) from a given vscode.Uri.
     * 
     * This function creates a consistent and comparable ID from a vscode.Uri by:
     * 1. Using the `scheme`, `authority`, and `path` components of the URI.
     * 2. Converting the path to lowercase on Windows to ensure that file comparisons are case-insensitive
     *    (since Windows filesystems are typically case-insensitive).
     * 3. Normalizing the path separators (`/`) to ensure consistency across platforms.
     * 
     * @param uri - The URI to generate an ID from.
     * @returns A string that represents a consistent ID for the given URI, usable for cross-platform file comparison.
     */
    public static getUriId(uri: vscode.Uri): string {
        let normalizedPath = uri.path; // it uses forward slashes

        // Normalize the path for case-insensitive platforms (e.g., Windows)
        if (os.platform() === 'win32') {
            normalizedPath = normalizedPath.toLowerCase();
        }
    
        // Include the authority and other relevant parts of the Uri
        const id = `${uri.scheme}://${uri.authority}${normalizedPath}`;
    
        return id;
    }


    /**
     * Generates an ID from a given vscode.Uri that represents game path, which is case-insensitive.
     * @param uri - The URI to generate an ID from.
     * @returns A string that represents a consistent ID for the given URI
     */
    public static getGamePathId(uri: vscode.Uri): string {
        let normalizedPath = uri.path; // it uses forward slashes

        // Normalize the path to be case-insensitive
        normalizedPath = normalizedPath.toLowerCase();
    
        // Include the authority and other relevant parts of the Uri
        const id = `${uri.scheme}://${uri.authority}${normalizedPath}`;
    
        return id;
    }
}


export class GscCachedFilesPerWorkspace {

    private cachedFilesPerWorkspace: Map<string, GscWorkspaceFileData> = new Map();

    createNewWorkspace(workspaceFolder: vscode.WorkspaceFolder): GscWorkspaceFileData {
        const data = new GscWorkspaceFileData(workspaceFolder);
        const id = GscFileCache.getUriId(workspaceFolder.uri);
        this.cachedFilesPerWorkspace.set(id, data);
        return data;
    }

    getWorkspace(workspaceUri: vscode.Uri): GscWorkspaceFileData | undefined {
        const id = GscFileCache.getUriId(workspaceUri);
        return this.cachedFilesPerWorkspace.get(id);
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

    getParsedFilesByFileOrFolderPath(uri: vscode.Uri): GscFile[] | undefined {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        if (workspaceFolder === undefined) {
            return;
        }
        const workspaceData = this.getWorkspace(workspaceFolder.uri);
        if (workspaceData === undefined) {
            return;
        }
        const files = workspaceData.getParsedFilesByFileOrFolderPath(uri);
        return files;
    }

    removeWorkspace(workspaceUri: vscode.Uri) {
        const workspaceData = this.getWorkspace(workspaceUri);
        if (workspaceData === undefined) {
            return false;
        }
        workspaceData.removeAllParsedFiles();

        const id = GscFileCache.getUriId(workspaceUri);
        return this.cachedFilesPerWorkspace.delete(id);
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
        const id = GscFileCache.getGamePathId(gscFile.uri);
        if (!this.parsedFiles.has(id)) {
            LoggerOutput.log("[GscFileCache] Added file to cache", vscode.workspace.asRelativePath(gscFile.uri));
        } else {
            LoggerOutput.log("[GscFileCache] Updated file in cache", vscode.workspace.asRelativePath(gscFile.uri));
        }
        this.parsedFiles.set(id, gscFile);
        
        Events.GscFileCacheFileHasChanged(gscFile.uri);
    }

    getParsedFile(uri: vscode.Uri): GscFile | undefined {
        const id = GscFileCache.getGamePathId(uri);
        const data = this.parsedFiles.get(id);

        return data;
    }

    getParsedFilesByFileOrFolderPath(uri: vscode.Uri): GscFile[] {
        const files: GscFile[] = [];
        const id = GscFileCache.getGamePathId(uri);
        for (const [fileId, file] of this.parsedFiles) {
            if (fileId === id || fileId.startsWith(id + "/")) {
                files.push(file);
            }
        }
        return files;
    }

    removeParsedFile(uri: vscode.Uri): boolean {
        const id = GscFileCache.getGamePathId(uri);
        const removed = this.parsedFiles.delete(id);

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
