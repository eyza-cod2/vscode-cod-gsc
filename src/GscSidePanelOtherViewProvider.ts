import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GscDiagnosticsCollection } from './GscDiagnosticsCollection';
import { Issues } from './Issues';
import { Updates } from './Updates';


export class OtherViewProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;

    constructor() {
        this.updateWebviewContent();
    }

    resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = this.getHtmlContent();

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'parseAllFiles':
                    void GscFiles.parseAllFiles();
                    break;
                case 'reDiagnoseAllFiles':
                    void GscDiagnosticsCollection.updateDiagnosticsForAll("sidePanel");
                    break;
                case 'reportIssue':
                    Issues.showIssueWindow(false);
                    break;
                case 'showExtensionUpdates':
                    Updates.showUpdateWindow();
                    break;
            }
        });
    }

    // Update the webview content based on the current active editor
    public updateWebviewContent() {
        if (!this._view) {
            return;
        }
        this._view.webview.html = this.getHtmlContent();

    }

    private getHtmlContent(): string {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: 1px solid var(--vscode-button-border, transparent);
                    border-radius: 2px;
                    padding: 4px;
                    cursor: pointer;
                    margin: 4px;
                    text-align: center;
                    line-height: 18px;
                    text-decoration: none;
                    width: 100%;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                p {
                    margin-bottom: 0;
                }
            </style>
        </head>
        <body>
            <p>GSC Files:</p>
            <button id="button1" class="codicon codicon-file">Parse all files</button><br>
            <button id="button2">Re-diagnose all files</button><br>
            
            <p>Issues:</p>
            <button id="button3">Report an issue</button><br>
            
            <p>Updates:</p>
            <button id="button4">Show extension updates</button><br>

            <script>
                const vscode = acquireVsCodeApi();
                document.getElementById('button1').addEventListener('click', () => {
                    vscode.postMessage({ command: 'parseAllFiles' });
                });
                document.getElementById('button2').addEventListener('click', () => {
                    vscode.postMessage({ command: 'reDiagnoseAllFiles' });
                });
                document.getElementById('button3').addEventListener('click', () => {
                    vscode.postMessage({ command: 'reportIssue' });
                });
                document.getElementById('button4').addEventListener('click', () => {
                    vscode.postMessage({ command: 'showExtensionUpdates' });
                });
            </script>
        </body>
        </html>`;
    }

}
