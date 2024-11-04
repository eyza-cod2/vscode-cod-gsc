import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GscFile } from './GscFile';
import { GroupType, GscGroup } from './GscFileParser';
import { GscFunctions } from './GscFunctions';
import { Issues } from './Issues';
import { LoggerOutput } from './LoggerOutput';

export class GscDefinitionProvider implements vscode.DefinitionProvider {

    static async activate(context: vscode.ExtensionContext) {       
        LoggerOutput.log("[GscDefinitionProvider] Activating");
        
        context.subscriptions.push(vscode.languages.registerDefinitionProvider('gsc', new GscDefinitionProvider()));
    }

    async provideDefinition(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken
    ): Promise<vscode.Location[] | null> 
    {
        try {
            // Get parsed file
            const gscFile = await GscFiles.getFileData(document.uri, false, "provide definition");

            const locations = await GscDefinitionProvider.getDefinitionLocations(gscFile, position);

            return locations;
        } catch (error) {
            Issues.handleError(error);
            return null;
        }
    }


    public static async getDefinitionLocations(gscFile: GscFile, position: vscode.Position): Promise<vscode.Location[]> {
        var locations: vscode.Location[] = [];

        const gscData = gscFile.data;
        
        // Get group before cursor
        var groupAtCursor = gscData.root.findKeywordAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return locations;
        }

        switch (groupAtCursor.type) {
            case GroupType.FunctionName:
                locations = await this.getFunctionDefinitionLocations(gscFile, groupAtCursor);
                break;

            case GroupType.Path:
                locations = await this.getPathDefinitionLocations(gscFile, groupAtCursor);
                break;
        }

        //console.log(groupAtCursor.toString());

        //console.log(locations.map(l => l.uri.path).join("\n"));

        return locations;
    }


    /**
     * This function finds definitions of function names in current file, included files and in external files
     *  @example
     *     function(1, 2);
     *     function_included();
     *     _tests\definition_file::function_file();
     * @returns 
     */
    private static async getFunctionDefinitionLocations(gscFile: GscFile, groupAtCursor: GscGroup): Promise<vscode.Location[]> {
        const locations: vscode.Location[] = [];

        const funcInfo = groupAtCursor.getFunctionReferenceInfo();
        if (funcInfo !== undefined) {
            const funcDefs = GscFunctions.getFunctionDefinitions(gscFile, funcInfo);
            if (funcDefs !== undefined && funcDefs.length > 0) {
                locations.push(new vscode.Location(funcDefs[0].uri, funcDefs[0].func.rangeFunctionName));
            }
        }

        return locations;
    }


    /** This function finds referenced files by game path */
    private static async getPathDefinitionLocations(gscFile: GscFile, groupAtCursor: GscGroup): Promise<vscode.Location[]> {
        const locations: vscode.Location[] = [];

        const path = groupAtCursor.getTokensAsString();
        const fileReference = GscFiles.getReferencedFileForFile(gscFile, path);
        if (fileReference !== undefined && fileReference.gscFile !== undefined) {
            locations.push(new vscode.Location(fileReference.gscFile.uri, fileReference.gscFile.data.root.getRange()));
        }

        return locations;
    }

}