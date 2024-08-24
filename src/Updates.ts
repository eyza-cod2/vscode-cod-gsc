import * as vscode from 'vscode';
import * as path from 'path';
import { DISCORD_URL, EMAIL, EXTENSION_ID, GITHUB_URL } from './extension';

export class Updates {

    static async activate(context: vscode.ExtensionContext) {
        const currentVersion = vscode.extensions.getExtension(EXTENSION_ID)?.packageJSON.version;
        const previousVersion = context.globalState.get<string>('extensionVersion');
    
        if (previousVersion !== currentVersion) {
            
            // Show the webview if there's a new version
            const panel = vscode.window.createWebviewPanel(
                'updateNotification', // Identifies the type of the webview
                'Extension Updated', // Title of the panel displayed to the user
                vscode.ViewColumn.One, // Editor column to show the new webview panel in
                {
                    enableScripts: true, // Allow scripts in the webview
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'images'))] // Allow access to local files in 'media' folder
                }
            );  
            panel.webview.html = this.getWebviewContent(panel.webview, context.extensionPath, currentVersion);
            

            // Update the stored version to the current version
            await context.globalState.update('extensionVersion', currentVersion);
        }
    }


    private static getWebviewContent(webview: vscode.Webview, extensionPath: string, currentVersion: any): string {
        // Path to the media directory
        const mediaPath = path.join(extensionPath, 'images');
        const imageUri1 = webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'vscode-completion-3.png')));
        const imageUri2 = webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'vscode-function-hover-spawn.png')));

        function getImageUri(imageName: string) {
            return webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, imageName)));
        }

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Extension Updated</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                h1 {
                    color: #007acc;
                }
                h2 {
                    margin-top: 50px;
                }  
                img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-top: 0px;
                }
                p {
                    margin-top: 20px;
                }
                a {
                    text-decoration: none;
                    color: #007acc;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>COD GSC Extension updated to ${currentVersion}</h1>
            <p>Here are some highlights of what's new:</p>

            <h2>Completion items (with CoD2 MP functions)</h2>
            <p>Currently supported games are CoD2 MP and CoD2 SP. There is also 'Universal game' that will show functions from all games</p>
            <img src="${getImageUri('vscode-completion-3.png')}">

            <h2>Hover over function name</h2>
            <p>Additional info is showed when hovering over function names</p>
            <img src="${getImageUri('vscode-function-hover-spawn.png')}">

            <h2>Status bar</h2>
            <p>Games can be changed in status bar. Optionally it can be changed in extension settings.</p>
            <img src="${getImageUri('vscode-statusbar-game.png')}">

            <h2>Code Actions</h2>
            <p>You can ignore error about missing files.</p>
            <img src="${getImageUri('vscode-quick-fix.png')}">

            <h2>All changes:</h2>
            <p>
                - Added settings - game selection, game root folder, ignored file paths, ignored function names<br>
                - Added option in status bar to switch the game<br>
                - Added support for CoD2 MP + SP<br>
                - Added CoD2 MP + SP function definitions for auto-suggestion, hover a parameters error diagnostics<br>
                - Added warning message when build-in function is overwritten by local function<br>
                - Added code action provider to easily add file path into ignored list<br>
                - Added yellow status bar information indicating parsing and diagnosing tasks in background<br>
                - Added issue manual reporting<br>
                - Fixed case-sensitivity for file paths and function names<br>
                - Fixed structure & array auto-suggestion when written after keyword (e.g. 'wait level.xxx')<br>
                - Fixed re-diagnosing files when renamed, deleted or workspace folder changed<br>
                - Fixed handling GSC files outside of the workspace
            </p>

            <h2>Contact</h2>
            <p>If you have any issues or feedback, feel free to reach out:</p>
            <ul>
                <li><a href="${GITHUB_URL}" target="_blank">GitHub Issues</a></li>
                <li><a href="${DISCORD_URL}" target="_blank">Discord Server</a></li>
                <li><a href="${EMAIL}">Email</a></li>
            </ul>
        </body>
        </html>`;
    }
}