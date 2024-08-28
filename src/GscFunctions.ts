import * as vscode from 'vscode';
import { GscGroup, GscToken, GscVariableDefinitionType } from './GscFileParser';
import { GscConfig, GscGame } from './GscConfig';
import * as fs from 'fs';
import * as path from 'path';
import { GscFile } from './GscFile';
import { CodFunctions } from './CodFunctions';


export class GscFunction {

    constructor(
        /** Function name (original as it is defined in file) */
        public name: string,
        /** Lower-case function name, used to compare the same function names */
        public nameId: string,

        public parameters: GscToken[],
        /** Local variable declarations like "a = 1;". Its always statement with item[0] as Reference */
        public localVariableDefinitions: GscVariableDefinition[],
        public range: vscode.Range,
        public scopeRange: vscode.Range,
    ) {}

    public static generateMarkdownDescription(
        func: GscFunction | {name: string, parameters: {name: string, commentBefore?: string}[]}, 
        isLocalFunction: boolean, 
        uri: string | undefined,
        reason: string = "")
    : vscode.MarkdownString 
    {
		const md = new vscode.MarkdownString();
		md.isTrusted = true;
		var text = "";

        // Declaration
		text += func.name + "(";
		text += func.parameters.map(p => p.name).join(", ");
		text += ")";
		md.appendCodeblock(text);

        // Description
		//md.appendMarkdown("" + func.desc + "\n\n");

        // Parameters
		func.parameters.forEach(p => {
			text = "@param ```" + p.name + "```";
            if (p.commentBefore !== undefined && p.commentBefore !== "") {
                text += " — " + p.commentBefore;
            }
            text += "  \n";
			md.appendMarkdown(text);
		});

        if (!isLocalFunction && uri !== undefined) {
            const uri2 = vscode.Uri.parse(uri);
            const relativePath = vscode.workspace.asRelativePath(uri2);
            md.appendMarkdown("\nFile: `" + relativePath + "`");
        } else if (isLocalFunction) {
            md.appendMarkdown("\n`Local function`");
        }

        if (reason !== "") {
            md.appendMarkdown("\n\n" + reason);
        }

		return md;
    }

	public generateMarkdownDescription(isLocalFunction: boolean, uri: string | undefined, reason: string): vscode.MarkdownString {
        return GscFunction.generateMarkdownDescription(this, isLocalFunction, uri, reason);
	}	
};

export type GscFunctionDefinition = {
    func: GscFunction, 
    uri: string,
    reason: string
};


export type GscVariableDefinition = {
    variableReference: GscGroup,
    type: GscVariableDefinitionType
};





export enum GscFunctionState {
    NameIgnored,
    Found,
    FoundOnMultiplePlaces,
    FoundInPredefined,
    NotFoundFile,
    NotFoundFileButIgnored,
    NotFoundFunctionExternal,
    NotFoundFunctionLocal
}



export type GscFunctionStateAndDefinitions = {
    state: GscFunctionState, 
    definitions: GscFunctionDefinition[]
};

/**
 * On startup scan every .gsc file, parse it, and save the result into memory.
 * Watch file changes and parse the files again when changed.
 * When file is opened in editor, use the editor content.
 */
export class GscFunctions {

    static async activate(context: vscode.ExtensionContext) {
     
    }

    /**
     * Get the state of the function reference and its definitions.
     * It will tell if referenced function is found, not found, found on multiple places, ignored, etc.
     */
    static async getFunctionReferenceState(
        funcInfo: {name:string, path: string} | undefined,
        uri: vscode.Uri, 
        ignoredFunctionNames: string[], 
        ignoredFilePaths: string[], 
        currentGame: GscGame)
        : Promise<GscFunctionStateAndDefinitions>
    {
        function ret(state: GscFunctionState, definitions: GscFunctionDefinition[]) {
            return {state: state, definitions: definitions};
        }

        // This function name is ignored by configuration
        if (funcInfo && ignoredFunctionNames.some(name => name.toLowerCase() === funcInfo.name.toLowerCase())) {
            return ret(GscFunctionState.NameIgnored, []);
        }
           
        // Get file URI and position where the file is defined
        const definitions = await GscFunctions.getAvailableFunctionsForUri(uri, funcInfo?.name, funcInfo?.path);

        // File not found
        if (definitions === undefined) {          
            // This file path is ignored by configuration
            if (funcInfo && ignoredFilePaths.some(ignoredPath => funcInfo.path.toLowerCase().startsWith(ignoredPath.toLowerCase()))) {
                return ret(GscFunctionState.NotFoundFileButIgnored, []);
            }
            return ret(GscFunctionState.NotFoundFile, []);           
        }

        // Function was found in exactly one place
        else if (definitions.length === 1) {
            return ret(GscFunctionState.Found, definitions);
        }

        // Function is defined on too many places
        else if (definitions.length > 1) {
            return ret(GscFunctionState.FoundOnMultiplePlaces, definitions);
        }


        // This function is predefined function
        else if (funcInfo && funcInfo.path === "" && CodFunctions.isPredefinedFunction(funcInfo.name, currentGame)) {
            return ret(GscFunctionState.FoundInPredefined, definitions);
        }

        // Function name was not found
        else 
        {
            // External function call
            if (funcInfo && funcInfo.path.length > 0) {
                return ret(GscFunctionState.NotFoundFunctionExternal, definitions);
            
            // Local function call
            } else {
                return ret(GscFunctionState.NotFoundFunctionLocal, definitions);
            }
        }

    }



    /**
     * Get array of functions that are available for specified document URI. If funcName is specified, only functions with that name are returned.
     * If the file is not found, undefined is returned. If file is found but function is not found, it will return an empty array.
     */
    public static async getAvailableFunctionsForUri(documentUri: vscode.Uri, funcName: string | undefined = undefined, funcFilePath: string | undefined = undefined)
    : Promise<GscFunctionDefinition[] | undefined> 
    {
        const funcDefs: GscFunctionDefinition [] = [];  
        const funcNameId = funcName ? funcName.toLowerCase() : undefined;

        const fileGameRootFolderUri = GscConfig.getGameRootFolderOfFile(documentUri);

        // Its external function call
        if (funcFilePath && funcFilePath.length > 0) 
        {
            // Define all possible locations where the file can be found (globally included workspace folders)
            const includedWorkspaceFolders = GscConfig.getIncludedWorkspaceFolders(documentUri);
            // Convert them to WorkspaceFolder objects
            const includedWorkspaceFoldersUris = includedWorkspaceFolders
                .map(folderName => vscode.workspace.workspaceFolders?.find(f => f.name === folderName))
                .filter(f => f !== undefined);
            // Sort them by workspace indexes
            includedWorkspaceFoldersUris.sort((a, b) => {
                return a.index - b.index;
            });
            // Get the game root folder for each workspace
            const includedWorkspaceFoldersRoots = includedWorkspaceFoldersUris
                .map(folderUri => GscConfig.getGameRootFolderOfFile(folderUri.uri))
                .filter(f => f !== undefined);
            // Add also this document
            if (fileGameRootFolderUri !== undefined) {
                includedWorkspaceFoldersRoots.push(fileGameRootFolderUri);
            }
            // Reverse to loop this document first
            includedWorkspaceFoldersRoots.reverse();

            

            var fileFound = false;
            for (const root of includedWorkspaceFoldersRoots) {
                const gscFilePathUri = vscode.Uri.joinPath(root, funcFilePath + ".gsc").toString().toLowerCase();
                
                const gscFiles = GscFile.getCachedFiles();
                gscFiles.forEach((data, uri) => {
                    if (uri.toLowerCase() === gscFilePathUri) {
                        fileFound = true;
                        data.functions.forEach(f => {
                            if (!funcNameId || f.nameId === funcNameId) {
                                const reason = (root === includedWorkspaceFoldersRoots[0] ? /*"External function"*/"" : "Included via workspace folder settings");
                                funcDefs.push({func: f, uri: uri, reason: reason});
                            }
                        });
                    }
                });

                // Do not search in other workspace folders
                if (fileFound) {
                    break;
                }
            }
            
            if (fileFound === false) {
                return undefined;
            }

        } 

        // Its local function or included function
        else {
            if (!fileGameRootFolderUri) {
                return funcDefs;
            }

            // TODO look into additional global include list

            // Find function in this file
            const gscData = await GscFile.getFile(documentUri);
            gscData.functions.forEach(f => {
                if (!funcNameId || f.nameId === funcNameId) {
                    funcDefs.push({func: f, uri: documentUri.toString(), reason: /*"Local function"*/""});
                }
            });

            // Find function also in included files
            gscData.includes.forEach(includedPath => {
                const gscFilePathUri = vscode.Uri.joinPath(fileGameRootFolderUri, includedPath + ".gsc").toString().toLowerCase();

                // Try to find the file in parsed files
                const gscFiles = GscFile.getCachedFiles();
                gscFiles.forEach((data, uri) => {
                    if (uri.toLowerCase() === gscFilePathUri) {
                        data.functions.forEach(f => {
                            if (!funcNameId || f.nameId === funcNameId) {
                                funcDefs.push({func: f, uri: uri, reason: "Included via '#include'"});
                            }
                        });
                    }
                });          
            });
        }
        
        return funcDefs;
    }
}