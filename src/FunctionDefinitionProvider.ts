import * as vscode from 'vscode';
import { GscFunctionClass } from './GscFunction';

export class FunctionDefinitionProvider implements vscode.DefinitionProvider {
    async provideDefinition(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken
    ): Promise<vscode.Location[] | null> {

        var func = new GscFunctionClass();

        var funcLocations = await func.getLocationsOfFunctionUnderCursor(document, position);

        if (funcLocations.length > 0)
        {
            return funcLocations;
        } 

        return null;
    }

}