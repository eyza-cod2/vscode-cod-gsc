import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import { DISCORD_URL, EMAIL, EXTENSION_ID, GITHUB_ISSUES_URL } from './extension';
import { LoggerOutput } from './LoggerOutput';
import path from 'path';

export class Issues {
    static statusBarItem: vscode.StatusBarItem;

    static lastError: Error | undefined;
    static lastErrorCode: string | undefined;
    static lastErrorCount: number = 0;

    static activate(context: vscode.ExtensionContext) {

		// Command to open extension settings
		const showIssueWindowCommand = 'gsc.showIssueWindow';
		context.subscriptions.push(vscode.commands.registerCommand(showIssueWindowCommand, async () => {
            this.statusBarItem.hide();
			Issues.showIssueWindow(true);
		}));

		this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
		this.statusBarItem.text = "$(error) GSC Extension Error";
		this.statusBarItem.tooltip = "Report an Issue";
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
		this.statusBarItem.command = showIssueWindowCommand;
		context.subscriptions.push(this.statusBarItem);
    }

    public static showIssueWindow(showLastError: boolean) {
        try {
            const panel = vscode.window.createWebviewPanel(
                'errorInfo', // Identifies the type of the webview
                'Report an Issue', // Title of the panel
                vscode.ViewColumn.One, // Editor column to show the new webview panel in
                {
                    enableScripts: true, // Allow scripts in the webview
                } // Webview options
            );

            const errorDetails: string[] = [];
            errorDetails.push(`Extension Version: ${vscode.extensions.getExtension(EXTENSION_ID)?.packageJSON.version}`);
            errorDetails.push(`VSCode Version: ${vscode.version}`);
            errorDetails.push(`OS: ${os.type()} ${os.release()}`);
            errorDetails.push('');

            if (showLastError && this.lastError) {
                // Stack error
                if (this.lastError.stack) {
                    errorDetails.push(this.lastError.stack);
                    errorDetails.push('');
                }

                // Code in active editor
                errorDetails.push('Code in active editor:');
                if (this.lastErrorCode) {
                    errorDetails.push(this.lastErrorCode); 
                } else {
                    errorDetails.push('- no active editor -');
                }
                errorDetails.push('');

                // Source code
                errorDetails.push('Source Code:');
                errorDetails.push(Issues.getSourceCode(this.lastError));
                errorDetails.push('');                    
            
            } else {
                // Code in active editor
                errorDetails.push('Code in active editor:');
                if (vscode.window.activeTextEditor) {
                    errorDetails.push(this.getEditorCode(vscode.window.activeTextEditor)); 
                } else {
                    errorDetails.push('- no active editor -');
                }
                errorDetails.push('');
            }

            errorDetails.push('Log (5min):');
            errorDetails.push(LoggerOutput.getLogs(undefined, 5 * 60).join('\n'));
        
            // Set the webview's HTML content
            panel.webview.html = Issues.getWebviewContent(errorDetails.join('\n'));

        } catch (error) {
            console.error(error);
        }
    }

    static handleError(err: unknown) {

        const error = Issues.normalizeError(err);

        // Save the error
        this.lastError = error;
        this.lastErrorCode = vscode.window.activeTextEditor ? this.getEditorCode(vscode.window.activeTextEditor) : undefined;
        this.lastErrorCount += 1;

        this.statusBarItem.show();

        // Show error message
        void vscode.window.showErrorMessage(`Error: ${error.message}`);

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
        <h1>Issue</h1>
        <p>Please report the issue using one of the following ways:</p>
        <ul>
            <li><a href="${GITHUB_ISSUES_URL}" target="_blank">GitHub Issues</a></li>
            <li><a href="${DISCORD_URL}" target="_blank">Discord Server</a></li>
            <li><a href="${EMAIL}">Email</a></li>
        </ul>
        <p>Details:</p>
        <pre>${errorDetails}</pre>
    </body>
    </html>`;
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


    /**
     * Extracts the file path, line number, and column number from the error stack,
     * then reads the file and returns the content of the corresponding line.
     *
     * @param error The error object containing the stack trace.
     * @returns The content of the line where the error occurred or null if it can't be retrieved.
     */
    public static getSourceCode(err: unknown): string {
        // Local anonymous function to handle buffering
        const buildOutputBuffer = () => {
            let buffer = '';

            const appendToBuffer = (text: string) => {
                buffer += text + '\n';
            };

            appendToBuffer(`-----------------------------------------------------------------`);

            const error = this.normalizeError(err);

            if (!error.stack) {
                appendToBuffer('No stack trace available');
                return buffer; // Return buffer early if no stack
            }

            const stackLines = error.stack.split('\n');

            // Collect all relevant lines in reverse order
            const relevantLines = stackLines
                .filter(line => line.includes(path.sep) && line.match(/:\d+:\d+/))
                .reverse();

            if (relevantLines.length === 0) {
                appendToBuffer('Could not find any relevant lines in stack trace');
                return buffer; // Return buffer early if no relevant lines
            }

            // Iterate over each relevant stack line in reverse order
            for (const relevantLine of relevantLines) {
                const match = relevantLine.match(/\(([^)]+):(\d+):(\d+)\)/) || relevantLine.match(/at ([^ ]+):(\d+):(\d+)/);
                if (!match) {
                    appendToBuffer('Failed to parse the stack trace');
                    continue;
                }

                const filePath = match[1];
                const lineNumber = parseInt(match[2], 10);
                const columnNumber = parseInt(match[3], 10);

                if (!fs.existsSync(filePath)) {
                    appendToBuffer(`File does not exist: ${filePath}`);
                    continue;
                }

                try {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const fileLines = fileContent.split('\n');

                    if (lineNumber < 1 || lineNumber > fileLines.length) {
                        appendToBuffer(`Line number ${lineNumber} is out of bounds in file: ${filePath}`);
                        continue;
                    }

                    appendToBuffer(`${filePath}:${lineNumber}:${columnNumber}`);
                    appendToBuffer(`-----------------------------------------------------------------`);

                    const start = Math.max(0, lineNumber - 5);
                    const end = Math.min(fileLines.length, lineNumber + 5);

                    for (let i = start; i < end; i++) {
                        const line = fileLines.at(i);
                        if (!line) {
                            continue;
                        }
                        const lineNum = i + 1;
                        const lineMarker = lineNum === lineNumber ? ' ->' : '   ';
                        appendToBuffer(`${lineNum}${lineMarker} ${line}`);
                    }

                    appendToBuffer(` `);
                    appendToBuffer(`-----------------------------------------------------------------`);
                } catch (err) {
                    appendToBuffer(`Failed to read the file: ${filePath}. Error: ${(err as Error).message}`);
                }
            }

            return buffer; // Return the accumulated buffer
        };

        try {
            return buildOutputBuffer();
        } catch (error) {
            return "Failed to retrieve source code: " + error;
        }
    }


    public static getEditorCode(editor: vscode.TextEditor, lines: number = 10): string {
        const buffer: string[] = [];
        
        // Retrieve 5 lines before and after the cursor line
        const line = editor.selection.active.line;
        const start = Math.max(0, line - lines);
        const end = Math.min(editor.document.lineCount, line + lines);
        buffer.push(`-----------------------------------------------------------------------------------------------------`);
        buffer.push(`File: ${editor.document.fileName}:${editor.selection.active.line}:${editor.selection.active.character}`);
        buffer.push(`-----------------------------------------------------------------------------------------------------`);
        // Show an '->' that will point to the line where the cursor is
        for (let i = start; i < end; i++) {
            const lineText = editor.document.lineAt(i).text;
            const lineArrow = i === line ? '->' : '  ';
            const lineNum = (i + 1).toString().padStart(3, ' ');
            buffer.push(`${lineNum} ${lineArrow} ${lineText}`);
        }
        buffer.push(`-----------------------------------------------------------------------------------------------------`);

        return buffer.join('\n');
    }


    public static errorCheckCount = 0;
    /** Check if new error is reported. For tests */
    public static checkForNewError(): void {
        if (this.lastErrorCount > this.errorCheckCount) {
            this.errorCheckCount = this.lastErrorCount;
            throw this.lastError;
        }
    }
}