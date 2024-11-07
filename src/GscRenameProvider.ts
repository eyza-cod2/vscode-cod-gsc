import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GroupType, GscGroup } from './GscFileParser';
import { GscFunctions } from './GscFunctions';
import { LoggerOutput } from './LoggerOutput';
import { Issues } from './Issues';
import { GscFile } from './GscFile';

type RenameLocation = {
    uri: vscode.Uri;
    range: vscode.Range;
    name: string;
};

export class GscRenameProvider implements vscode.RenameProvider {

    static async activate(context: vscode.ExtensionContext) {
        LoggerOutput.log("[GscRenameProvider] Activating");

        context.subscriptions.push(
            vscode.languages.registerRenameProvider({ scheme: 'file', language: 'gsc' }, new GscRenameProvider())
        );
    }

    async prepareRename(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Range | { range: vscode.Range; placeholder: string } | null> {

        // Note: This function should throw an error or return a rejected thenable when the provided location doesn't allow for a rename.

        try {
            // Get parsed file
            const gscFile = await GscFiles.getFileData(document.uri, true, "provide rename edits prepare");

            const locations = await GscRenameProvider.getRenameEdits(gscFile, position, "");

            if (locations.length === 0) {
                return Promise.reject(new Error("Cannot rename this element."));
            }
    
            return document.getWordRangeAtPosition(position) ?? null;

        } catch (error) {
            Issues.handleError(error);
            return null;
        }
    }


    async provideRenameEdits(
        document: vscode.TextDocument,
        position: vscode.Position,
        newName: string,
        token: vscode.CancellationToken
    ): Promise<vscode.WorkspaceEdit | null> {

        try {
            // Get parsed file
            const gscFile = await GscFiles.getFileData(document.uri, true, "provide rename edits");

            const locations = await GscRenameProvider.getRenameEdits(gscFile, position, newName);

            const edit = new vscode.WorkspaceEdit();
            for (const location of locations) {
                edit.replace(location.uri, location.range, newName);
                LoggerOutput.log(`[GscRenameProvider] Renaming:  "${document.getText(location.range)}" -> "${newName}"  in ${vscode.workspace.asRelativePath(location.uri)} at ${location.range.start.line}:${location.range.start.character}`);
            }

            return edit;

        } catch (error) {
            Issues.handleError(error);
            return null;
        }
    }



    public static async getRenameEdits(
        gscFile: GscFile,
        position: vscode.Position,
        newName?: string
    ): Promise<vscode.Location[]>
    {
        const locations: vscode.Location[] = [];

        const gscData = gscFile.data;

        // Get group before cursor
        var groupAtCursor = gscData.root.findKeywordAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return locations;
        }

        switch (groupAtCursor.type) {
            case GroupType.FunctionName:
                const funcLocations = GscRenameProvider.getRenameEditsForFunction(gscFile, groupAtCursor);
                locations.push(...funcLocations);
                for (const location of funcLocations) {
                    LoggerOutput.log(`[GscRenameProvider] Function for rename:  "${location.name}" -> "${newName}"  in ${vscode.workspace.asRelativePath(location.uri)} at ${location.range.start.line}:${location.range.start.character}`);
                }
                break;
        
            default:
                break;
        }

        return locations;
    }


    private static getRenameEditsForFunction(gscFile: GscFile, groupAtCursor: GscGroup): (RenameLocation)[] {
        const locations: RenameLocation[] = [];
        
        // Get function info
        const funcInfo = groupAtCursor.getFunctionReferenceInfo();
        if (funcInfo === undefined) {
            return locations;
        }

        // Add function calls for rename
        const funcReferences = GscFunctions.getFunctionReferences(gscFile, funcInfo);
        if (funcReferences === undefined) {
            return locations;
        }

        // Add function definitions for rename
        locations.push(...funcReferences.map((funcRef) => { return {uri: funcRef.uri, range: funcRef.func.getRange(), name: funcRef.func.getTokensAsString()}; }));

        return locations;
    }
}