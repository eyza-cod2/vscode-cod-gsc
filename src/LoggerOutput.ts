import * as vscode from 'vscode';

export class LoggerOutput {
    private static outputChannel: vscode.OutputChannel;
    private static isDisposed = false;

    // Activates the logger and registers the necessary disposal function
    static activate(context: vscode.ExtensionContext) {
        if (!this.outputChannel) {
            this.outputChannel = vscode.window.createOutputChannel('GSC Logs');
        }

        // Ensure the output channel is disposed of when the extension is deactivated
        context.subscriptions.push({
            dispose: () => this.dispose(),
        });
    }

    // Log a message to the custom output channel
    static log(message: string) {
        if (!this.outputChannel) {
            this.outputChannel = vscode.window.createOutputChannel('GSC Logs');
        }
        const timestamp = LoggerOutput.getFormattedTimestamp();
        this.outputChannel.appendLine(`${timestamp} ${message}`);
        
        //this.outputChannel.show(); // Bring the output panel to the front if necessary
    }

    // Helper to format the current timestamp
    private static getFormattedTimestamp(): string {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toISOString().slice(11, 23);
        return `${date} ${time}`; // Example: 2024-09-14 10:15:59.649
    }

    // Disposes of the output channel when no longer needed
    static dispose() {
        if (!this.isDisposed && this.outputChannel) {
            this.outputChannel.dispose();
            this.isDisposed = true;
        }
    }
}
