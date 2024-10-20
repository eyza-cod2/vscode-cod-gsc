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
        public rangeFunctionName: vscode.Range,
        public rangeScope: vscode.Range,
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
    uri: vscode.Uri,
    reason: string
};


export type GscVariableDefinition = {
    variableReference: GscGroup,
    type: GscVariableDefinitionType
};






export enum GscFunctionState {
    NameIgnored,
    Found,
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
    static getFunctionReferenceState(
        funcInfo: {name:string, path: string} | undefined,
        gscFile: GscFile)
        : GscFunctionStateAndDefinitions
    {
        function ret(state: GscFunctionState, definitions: GscFunctionDefinition[]) {
            return {state: state, definitions: definitions};
        }
           
        // Get file URI and position where the file is defined
        const definitions = GscFunctions.getFunctionDefinitions(gscFile, funcInfo);

        // File not found
        if (definitions === undefined) {
            // This file path is ignored by configuration
            if (funcInfo && gscFile.config.ignoredFilePaths.some(ignoredPath => funcInfo.path.toLowerCase().startsWith(ignoredPath.toLowerCase()))) {
                return ret(GscFunctionState.NotFoundFileButIgnored, []);
            }
            return ret(GscFunctionState.NotFoundFile, []);           
        }

        // Function was found in exactly one place
        else if (definitions.length >= 1) {
            return ret(GscFunctionState.Found, definitions);
        }

        // This function is predefined function
        else if (funcInfo && funcInfo.path === "" && CodFunctions.isPredefinedFunction(funcInfo.name, gscFile.config.currentGame)) {
            return ret(GscFunctionState.FoundInPredefined, definitions);
        }

        // Function name was not found
        else 
        {
            // This function name is ignored by configuration
            if (funcInfo && gscFile.config.ignoredFunctionNames.some(name => name.toLowerCase() === funcInfo.name.toLowerCase())) {
                return ret(GscFunctionState.NameIgnored, []); // TODO rename to NotFoundNameButIgnored?
            
            // External function call
            } else if (funcInfo && funcInfo.path.length > 0) {
                return ret(GscFunctionState.NotFoundFunctionExternal, definitions);
            
            // Local function call
            } else {
                return ret(GscFunctionState.NotFoundFunctionLocal, definitions);
            }
        }

    }

    /**
     * Get function defined in specified GSC file by its name. Only current file is used, included files are ignored.
     * If the function name is not specified, all functions are returned.
     */
    public static getLocalFunctionDefinitions(gscFile: GscFile, funcName?: string) : GscFunction[]
    {
        if (funcName === undefined) {
            return gscFile.data.functions;
        }
        const funcNameId = funcName.toLowerCase();

        const functions = gscFile.data.functions.filter(f => f.nameId === funcNameId);

        return functions;
    }



    /**
     * Get function definitions available for specified GSC file by its name and file path.
     * It uses local or external file and files included by '#include' directive.
     * If the function name and file path is not specified, all functions are returned.
     * If the file path is specified but the file is not found, undefined is returned. If the file is found, but function name is not, it will return an empty array.
     */
    public static getFunctionDefinitions(gscFile: GscFile, funcInfo: {name: string, path: string | ""} | undefined) : GscFunctionDefinition[] | undefined
    {
        let funcDefinitions: GscFunctionDefinition[] = [];
        const funcNameId = funcInfo ? funcInfo.name.toLowerCase() : undefined;

        if (!gscFile.workspaceFolder) {
            return undefined; // This file is not part of workspace
        }

        // Its external function call
        if (funcInfo && funcInfo.path.length > 0) 
        {
            const referenceData = GscFiles.getReferencedFileForFile(gscFile, funcInfo.path);
            const referencedGscFile = referenceData.gscFile;
            if (referencedGscFile === undefined) {
                return undefined;
            }

            for (const f of referencedGscFile.data.functions) {
                if (!funcInfo || f.nameId === funcNameId) {
                    const funcDefinition: GscFunctionDefinition = {
                        func: f, 
                        uri: referencedGscFile.uri, 
                        reason: referenceData.referenceState === GscFileReferenceState.IncludedWorkspaceFolder ? "Included via workspace folder settings" : ""
                    };
                    funcDefinitions.push(funcDefinition);
                }
            }
        } 

        // Its local function or included function
        else {

            // TODO look into additional global include list

            // Find function in this file
            for (const f of gscFile.data.functions) {
                if (!funcInfo || f.nameId === funcNameId) {
                    const funcDefinition: GscFunctionDefinition = {
                        func: f, 
                        uri: gscFile.uri, 
                        reason: /*"Local function"*/""
                    };
                    funcDefinitions.push(funcDefinition);
                }
            }

            // Loop through all included files
            for (const includedPath of gscFile.data.includes) {

                const referencedFile = GscFiles.getReferencedFileForFile(gscFile, includedPath).gscFile;
                if (referencedFile === undefined) {
                    continue; // File not found
                }
                if (referencedFile.uri.toString() === gscFile.uri.toString()) {
                    continue; // This includes itself, functions are already added
                }
                
                for (const f of referencedFile.data.functions) {
                    if (!funcInfo || f.nameId === funcNameId) {
                        const funcDefinition: GscFunctionDefinition = {
                            func: f, 
                            uri: referencedFile.uri, 
                            reason: "Included via '#include'"
                        };
                        funcDefinitions.push(funcDefinition);
                    }
                }

            }

        }
        
        return funcDefinitions;
    }

}