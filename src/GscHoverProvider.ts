import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData, GscFunction } from './GscFileParser';

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

        const hover = await GscHoverProvider.getHover(gscData, position, document.uri);

        return hover;
    }

    public static async getHover(gscData: GscData, position: vscode.Position, uri: vscode.Uri): Promise<vscode.Hover> {
        let markdown = new vscode.MarkdownString();
        markdown.isTrusted = true; // enable HTML tags

        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);

        if (groupAtCursor?.type === GroupType.FunctionName) {
            const funcNameAndPath = groupAtCursor.getFunctionNameAndPath();
            if (funcNameAndPath !== undefined) {

                // Get file URI and position where the file is defined
                const definitions = await GscFile.getFunctionNameDefinitions(funcNameAndPath.name, funcNameAndPath.path, uri);

                if (definitions === undefined) {
                    GscHoverProvider.markdownAppendFileWasNotFound(markdown, funcNameAndPath.name, funcNameAndPath.path);
                }
                else if (definitions.length === 0) {
                    GscHoverProvider.markdownAppendFunctionWasNotFound(markdown, funcNameAndPath.name, funcNameAndPath.path);
                } 
                else {
                    definitions.forEach(async d => {

                        const gscData = await GscFile.getFile(d.uri);
    
                        const functionData = gscData.functions.find(f => f.nameId === funcNameAndPath.name.toLowerCase());
    
                        if (functionData === undefined) { return; }
    
                        GscHoverProvider.markdownAppendFunctionData(markdown, d.uri, functionData);
                    });
                }
            }
        }

        return new vscode.Hover(markdown);
    }

    public static markdownAppendFileWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ File '${path}.gsc' was not found!`);
    }

    public static markdownAppendFunctionWasNotFound(md: vscode.MarkdownString, funcName: string, path: string) {
        md.appendText(`⚠️ Function '${funcName}' was not found${(path !== "" ? (" in '" + path + "'") : "")}!`);
    }

    public static markdownAppendFunctionData(md: vscode.MarkdownString, fileUri: vscode.Uri, functionData: GscFunction) {
        const parametersText = functionData.parameters.map(p => p.name).join(", ");
        
        md.appendCodeblock(`${functionData.name}(${parametersText})`);

        md.appendMarkdown("File: ```" + vscode.workspace.asRelativePath(fileUri) + "```");
    }
}