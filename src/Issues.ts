import * as vscode from 'vscode';
import * as os from 'os';
import { DISCORD_URL, EMAIL, EXTENSION_ID, GITHUB_ISSUES_URL } from './extension';

export class Issues {

    private static isDisposed = false;

    static activate(context: vscode.ExtensionContext) {
        
        Issues.isDisposed = false;
        context.subscriptions.push({
            dispose: () => {
                Issues.isDisposed = true;
            }
        });
        
        let disposable = vscode.commands.registerCommand('gsc.showErrorInfo', async (errorDetails: string) => {
            const panel = vscode.window.createWebviewPanel(
                'errorInfo', // Identifies the type of the webview
                'Report an Issue', // Title of the panel
                vscode.ViewColumn.One, // Editor column to show the new webview panel in
                {
                    enableScripts: true, // Allow scripts in the webview
                } // Webview options
            );

            // Set the webview's HTML content
            panel.webview.html = Issues.getWebviewContent(errorDetails);
        });

        context.subscriptions.push(disposable);

        // VSCode runs each extension in its own separate process (the extension host)
        // It isolates the extension from the main VSCode application and other extensions. 
        // This means that the global error handlers you set up in this extension will not capture errors from other extensions or from VSCode itself.

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            if (Issues.isDisposed) {
                console.log("Extension has been disposed, ignoring unhandled exception. ", error.message);
                return; // Ignore the error since the extension is disposed
            }
            
            try {
                Issues.handleGlobalError(error);
            } catch (error) { }
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason: any) => {
            if (Issues.isDisposed) {
                console.log("Extension has been disposed, ignoring unhandled rejection.", reason.message);
                return; // Ignore the error since the extension is disposed
            }
            
            try {
                Issues.handleGlobalError(reason instanceof Error ? reason : new Error(reason));
            } catch (error) {}
        });
    }

    static handleGlobalError(error: Error) {
        const ver = vscode.extensions.getExtension(EXTENSION_ID)?.packageJSON.version;

        const errorMessage = `Error in CoD GSC Extension v${ver}: ${error.message}`;
        const errorDetails = `
Extension Version: ${ver}
VSCode Version: ${vscode.version}
OS: ${os.type()} ${os.release()}

${error.stack}

`;
    
        void vscode.window.showErrorMessage(errorMessage, 'Report Issue').then((selection) => {
            if (selection === 'Report Issue') {
                void vscode.commands.executeCommand('gsc.showErrorInfo', errorDetails);
            }
        });
    
        console.error('Unhandled error:', error);
    }

    static getWebviewContent(errorDetails: string) {


        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error Information</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            h1 {
                color: #d32f2f;
            }
            pre {
                padding: 10px;
                border-radius: 4px;
                overflow-x: auto;
                border-width: 1px;
                border-style: solid;
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
        <h1>Error Information</h1>
        <p>Information about the error occurred in the extension:</p>
        <pre>${errorDetails}</pre>
        <h2>Please report this error</h2>
        <p>Use one of the following ways:</p>
        <ul>
            <li><a href="${GITHUB_ISSUES_URL}" target="_blank">GitHub Issues</a></li>
            <li><a href="${DISCORD_URL}" target="_blank">Discord Server</a></li>
            <li><a href="${EMAIL}">Email</a></li>
        </ul>
    </body>
    </html>
            `;
    }
}