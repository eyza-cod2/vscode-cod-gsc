import * as vscode from 'vscode';
import { GscFile, GscFiles } from './GscFiles';
import { GroupType, GscData, GscFileParser } from './GscFileParser';
import { GscFunctions } from './GscFunctions';
import { Issues } from './Issues';

export class GscDefinitionProvider implements vscode.DefinitionProvider {

    static async activate(context: vscode.ExtensionContext) {       
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
            const gscFile = await GscFiles.getFileData(document.uri);

            const locations = await GscDefinitionProvider.getFunctionDefinitionLocations(gscFile, position);

            return locations;
        } catch (error) {
            Issues.handleError(error);
            return null;
        }
    }


    /**
     * This function finds definitions of function names in current file, included files and in external files
     *  @example
     *     function(1, 2);
     *     function_included();
     *     _tests\definition_file::function_file();
     * @returns 
     */
    public static async getFunctionDefinitionLocations(gscFile: GscFile, position: vscode.Position): Promise<vscode.Location[]> {
        const locations: vscode.Location[] = [];

        const gscData = gscFile.data;
        
        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return locations;
        }

        if (groupAtCursor.type === GroupType.FunctionName) {
            const funcInfo = groupAtCursor.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {
                const funcDefs = await GscFunctions.getAvailableFunctionsForFile(gscFile, funcInfo.name, funcInfo.path);
                if (funcDefs !== undefined) {
                    funcDefs.forEach(f => {
                        locations.push(new vscode.Location(vscode.Uri.parse(f.uri), new vscode.Position(f.func.range.start.line, f.func.range.start.character)));
                    });
                }
            }
        }

        //console.log(groupAtCursor.toString());

        //console.log(locations.map(l => l.uri.path).join("\n"));

        return locations;
    }

}