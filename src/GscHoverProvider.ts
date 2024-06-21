import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData } from './GscFileParser';

export class GscHoverProvider implements vscode.HoverProvider {
    
    static async activate(context: vscode.ExtensionContext) {       
        context.subscriptions.push(vscode.languages.registerHoverProvider('gsc', new GscHoverProvider()));
    }

    public async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined> 
    {
        // Get parsed file
        const gscData = await GscFile.getFile(document.uri);

        const hover = await this.getHover(gscData, position, document.uri);

        return hover;
    }

    public async getHover(gscData: GscData, position: vscode.Position, uri: vscode.Uri): Promise<vscode.Hover> {
        let hoverText = new vscode.MarkdownString();

        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);

        if (groupAtCursor?.type === GroupType.FunctionName) {
            const funcNameAndPath = groupAtCursor.getFunctionNameAndPath();
            if (funcNameAndPath !== undefined) {

                // Get file URI and position where the file is defined
                const definitions = await GscFile.getFunctionNameDefinitions(funcNameAndPath.name, funcNameAndPath.path, uri);

                if (definitions.length === 0) {
                    hoverText.appendText(`⚠️ Function '${funcNameAndPath.name}' was not found${(funcNameAndPath.path !== "" ? (" in '" + funcNameAndPath.path + "'") : "")}!`);
                }

                definitions.forEach(async d => {

                    const gscData = await GscFile.getFile(d.uri);

                    const functionData = gscData.functions.find(f => f.nameId === funcNameAndPath.name.toLowerCase());

                    if (functionData === undefined) { return; }

                    const parametersText = functionData.parameters.map(p => p.name).join(", ");

                    hoverText.appendText(vscode.workspace.asRelativePath(d.uri));
                    hoverText.appendMarkdown("\n\n"); // Two newlines for a new paragraph, for more space you could use "\n\n---\n\n" for a horizontal rule
                    hoverText.appendMarkdown(`**${functionData.name}**(${parametersText})`);
                });
            }
        }

        


        return new vscode.Hover(hoverText);
    }
}