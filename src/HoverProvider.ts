import * as vscode from 'vscode';
import { GscFunctionClass } from './GscFunction';

export class HoverProvider implements vscode.HoverProvider {
    
    public async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined> {

        var func = new GscFunctionClass();

        var funcDef = await func.getFunctionDefinitionOfFunctionUnderCursor(document, position);
        if (!funcDef) {
            return;
        }

        var filePath = funcDef.file.fsPath;

        // Check if there is any workspace opened
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

            // Check if the file path starts with the workspace root path
            if (filePath.startsWith(workspaceRoot)) {
                // Strip the workspace part of the path
                filePath = filePath.substring(workspaceRoot.length + 1); // +1 to remove the leading '/'
            }
        }

        let hoverText = new vscode.MarkdownString();
        hoverText.appendText(filePath);
        hoverText.appendMarkdown("\n\n"); // Two newlines for a new paragraph, for more space you could use "\n\n---\n\n" for a horizontal rule
        hoverText.appendMarkdown(`**${funcDef.name}**(${funcDef.parameters})`);

        return new vscode.Hover(hoverText);
    }
}