import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData, GscFileParser } from './GscFileParser';

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
        // Get parsed file
        const gscData = await GscFile.getFile(document.uri);

        const locations = await GscDefinitionProvider.getFunctionDefinitionLocations(gscData, position, document.uri);

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
    public static async getFunctionDefinitionLocations(gscData: GscData, position: vscode.Position, documentUri: vscode.Uri): Promise<vscode.Location[]> {
        const locations: vscode.Location[] = [];
        
        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return locations;
        }

        if (groupAtCursor.type === GroupType.FunctionName) {
            const funcInfo = groupAtCursor.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {
                const funcDefs = await GscFile.getFunctionNameDefinitions(funcInfo.name, funcInfo.path, documentUri);
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