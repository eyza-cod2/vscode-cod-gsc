import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GscFile } from './GscFile';
import { GroupType } from './GscFileParser';
import { GscFunctions } from './GscFunctions';
import { Issues } from './Issues';
import { LoggerOutput } from './LoggerOutput';

export class GscReferenceProvider implements vscode.ReferenceProvider {

    static async activate(context: vscode.ExtensionContext) {       
        LoggerOutput.log("[GscReferenceProvider] Activating");
        
        context.subscriptions.push(vscode.languages.registerReferenceProvider('gsc', new GscReferenceProvider()));
    }

    async provideReferences(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        context: vscode.ReferenceContext, 
        token: vscode.CancellationToken
    ): Promise<vscode.Location[]> 
    {
        try {
            // Get parsed file
            const gscFile = await GscFiles.getFileData(document.uri, false, "provide references");

            const locations = await GscReferenceProvider.getFunctionReferenceLocations(gscFile, position);

            return locations;
        } catch (error) {
            Issues.handleError(error);
            return [];
        }
    }


    public static async getFunctionReferenceLocations(gscFile: GscFile, position: vscode.Position): Promise<vscode.Location[]> {
        const locations: vscode.Location[] = [];

        const gscData = gscFile.data;
        
        // Get group before cursor
        var groupAtCursor = gscData.root.findKeywordAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return locations;
        }

        if (groupAtCursor.type === GroupType.FunctionName) {
            const funcInfo = groupAtCursor.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {

                const funcRefs = GscFunctions.getFunctionReferences(gscFile, funcInfo);
                if (funcRefs === undefined) {
                    return locations;
                }
                for (const funcRef of funcRefs) {
                    locations.push(new vscode.Location(funcRef.uri, funcRef.func.getRange()));
                }

            }
        }
        return locations;
    }

}