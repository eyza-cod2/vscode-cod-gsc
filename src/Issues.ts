import * as vscode from 'vscode';
import * as os from 'os';
import { DISCORD_URL, EMAIL, EXTENSION_ID, GITHUB_ISSUES_URL } from './extension';
import { LoggerOutput } from './LoggerOutput';

export class Issues {

    static activate(context: vscode.ExtensionContext) {

        let disposable = vscode.commands.registerCommand('gsc.showErrorInfo', async (errorDetails: string) => {
            try {
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
            } catch (error) {
                console.error(error);
            }
        });

        context.subscriptions.push(disposable);
    }

    static handleError(err: unknown) {

        const error = Issues.normalizeError(err);

        const ver = vscode.extensions.getExtension(EXTENSION_ID)?.packageJSON.version;

        const errorMessage = `Error: ${error.message}`;


        void vscode.window.showErrorMessage(errorMessage, 'Report Issue').then((selection) => {
            if (selection === 'Report Issue') {

                const errorDetails = `
Extension Version: ${ver}
VSCode Version: ${vscode.version}
OS: ${os.type()} ${os.release()}

${error.stack}

Log (5min):
${LoggerOutput.getLogs().join('\n')}
                
                `;

                void vscode.commands.executeCommand('gsc.showErrorInfo', errorDetails);
            }
        });

        console.error(error);

        LoggerOutput.log("[Issues] " + error.message);
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


    /**
     * Normalizes any unknown error into an Error object.
     * @param error - The unknown error to normalize.
     * @returns An Error object with a standardized message.
     */
    public static normalizeError(error: unknown): Error {
        if (error instanceof Error) {
            return error;
        } else if (typeof error === 'string') {
            return new Error(error);
        } else if (typeof error === 'object' && error !== null) {
            // The error is an object, attempt to stringify it
            try {
                const errorString = JSON.stringify(error, Object.getOwnPropertyNames(error));
                return new Error(errorString);
            } catch (stringifyError) {
                return new Error('An unknown error occurred');
            }
        } else {
            // The error is of an unknown type (number, boolean, null, undefined, etc.)
            return new Error(String(error) || 'An unknown error occurred');
        }
    }
}