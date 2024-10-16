import * as vscode from 'vscode';
import { GscGroup, GscToken, GscVariableDefinitionType } from './GscFileParser';
import { GscFiles, GscFileReferenceState } from './GscFiles';
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
        gscFile: GscFile)
        : Promise<GscFunctionStateAndDefinitions>
    {
        function ret(state: GscFunctionState, definitions: GscFunctionDefinition[]) {
            return {state: state, definitions: definitions};
        }

        // This function name is ignored by configuration
        if (funcInfo && gscFile.config.ignoredFunctionNames.some(name => name.toLowerCase() === funcInfo.name.toLowerCase())) {
            return ret(GscFunctionState.NameIgnored, []);
        }
           
        // Get file URI and position where the file is defined
        const definitions = await GscFunctions.getAvailableFunctionsForFile(gscFile, funcInfo?.name, funcInfo?.path);

        // File not found
        if (definitions === undefined) {          
            // This file path is ignored by configuration
            if (funcInfo && gscFile.config.ignoredFilePaths.some(ignoredPath => funcInfo.path.toLowerCase().startsWith(ignoredPath.toLowerCase()))) {
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
        else if (funcInfo && funcInfo.path === "" && CodFunctions.isPredefinedFunction(funcInfo.name, gscFile.config.currentGame)) {
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
    public static async getAvailableFunctionsForFile(gscFile: GscFile, funcName: string | undefined = undefined, funcFilePath: string | undefined = undefined)
    : Promise<GscFunctionDefinition[] | undefined> 
    {
        const funcDefs: GscFunctionDefinition [] = [];  
        const funcNameId = funcName ? funcName.toLowerCase() : undefined;

        if (!gscFile.workspaceFolder) {
            return undefined; // This file is not part of workspace
        }

        // Its external function call
        if (funcFilePath && funcFilePath.length > 0) 
        {
            const referenceData = GscFiles.getReferencedFileForFile(gscFile, funcFilePath);
            const referencedGscFile = referenceData.gscFile;

            if (referencedGscFile === undefined) {
                return undefined;
            }

            referencedGscFile.data.functions.forEach(f => {
                if (!funcNameId || f.nameId === funcNameId) {
                    const reason = referenceData.referenceState === GscFileReferenceState.IncludedWorkspaceFolder ? "Included via workspace folder settings" : "";
                    funcDefs.push({func: f, uri: referencedGscFile.uri.toString(), reason: reason});
                }
            });
        } 

        // Its local function or included function
        else {

            // TODO look into additional global include list

            // Find function in this file
            gscFile.data.functions.forEach(f => {
                if (!funcNameId || f.nameId === funcNameId) {
                    funcDefs.push({func: f, uri: gscFile.uri.toString(), reason: /*"Local function"*/""});
                }
            });

            // Loop through all included files
            for (const includedPath of gscFile.data.includes) {

                const referencedFile = GscFiles.getReferencedFileForFile(gscFile, includedPath).gscFile;

                if (referencedFile === undefined) {
                    continue; // File not found
                }

                if (referencedFile.uri.toString() === gscFile.uri.toString()) {
                    continue;
                }
                
                referencedFile.data.functions.forEach(f => {
                    if (!funcNameId || f.nameId === funcNameId) {
                        funcDefs.push({func: f, uri: referencedFile.uri.toString(), reason: "Included via '#include'"});
                    }
                });
            }

        }
        
        return funcDefs;
    }
}