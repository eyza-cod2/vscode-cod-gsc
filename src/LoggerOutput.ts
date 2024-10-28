import * as vscode from 'vscode';

interface LogEntry {
    timestamp: Date;
    message: string;
}

export class LoggerOutput {
    private static outputChannel: vscode.OutputChannel | undefined;
    private static outputChannelFiles: vscode.OutputChannel | undefined;
    private static isDisposed = false;
    private static logBuffer: LogEntry[] = []; // Internal log buffer

    // Activates the logger and registers the necessary disposal function
    static activate(context: vscode.ExtensionContext) {
        if (!this.outputChannel) {
            this.outputChannel = vscode.window.createOutputChannel('GSC Logs');
        }
        if (!this.outputChannelFiles) {
            this.outputChannelFiles = vscode.window.createOutputChannel('GSC File Logs');
        }
        // Ensure the output channel is disposed of when the extension is deactivated
        context.subscriptions.push({
            dispose: () => this.dispose(),
        });
    }

    // Log a message to the custom output channel
    static log(message: string, rightMessage?: string, spaces?: number) {
        if (!this.outputChannel) {
            return;
        }

        if (spaces === undefined) {
            spaces = 100;
        }

        // If there is a right message, align the left message to number of spaces and then add the right message
        if (rightMessage !== undefined) {
            message = message.padEnd(spaces) + "" + rightMessage;
        }

        const now = new Date();
        const timestamp = LoggerOutput.getFormattedTimestamp(now);
        const fullMessage = `${timestamp} ${message}`;

        // Append to OutputChannel
        this.outputChannel.appendLine(fullMessage);

        // Store in internal buffer with timestamp
        this.logBuffer.push({
            timestamp: now,
            message: fullMessage,
        });

        // Clean up old logs beyond 5 minutes
        this.cleanUpOldLogs();
    }


    // Log a message to the custom output channel
    static logFile(message: string, rightMessage?: string, spaces?: number) {
        if (!this.outputChannelFiles) {
            return;
        }

        this.log(message, rightMessage, spaces);

        if (spaces === undefined) {
            spaces = 100;
        }

        // If there is a right message, align the left message to number of spaces and then add the right message
        if (rightMessage !== undefined) {
            message = message.padEnd(spaces) + "" + rightMessage;
        }

        const now = new Date();
        const timestamp = LoggerOutput.getFormattedTimestamp(now);
        const fullMessage = `${timestamp} ${message}`;

        // Append to outputChannelFiles
        this.outputChannelFiles.appendLine(fullMessage);
    }


    // Method to retrieve the logs from the last 5 minutes, from latest to oldest
    static getLogs(maxLines: number | undefined = undefined, maxSecondsAgo: number): string[] {
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - maxSecondsAgo * 1000); // 5 minutes ago

        const recentLogs: string[] = [];

        // Iterate backwards since logs are stored in chronological order
        for (let i = this.logBuffer.length - 1; i >= 0; i--) {
            const logEntry = this.logBuffer[i];
            if (logEntry.timestamp >= fiveMinutesAgo) {
                recentLogs.push(logEntry.message);
            } else {
                recentLogs.push('...'); // Indicate that there are older logs
                break;
            }
            if (maxLines !== undefined && recentLogs.length >= maxLines) {
                recentLogs.push('...'); // Indicate that there are more logs
                break;
            }
        }

        return recentLogs;
    }

    // Helper to format the current timestamp
    private static getFormattedTimestamp(date: Date): string {
        const currentDate = new Date();

        const formattedDate = `${currentDate.getFullYear()}-${
          (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
          currentDate.getDate().toString().padStart(2, '0')} ${
          currentDate.getHours().toString().padStart(2, '0')}:${
          currentDate.getMinutes().toString().padStart(2, '0')}:${
          currentDate.getSeconds().toString().padStart(2, '0')}.${
          currentDate.getMilliseconds().toString().padStart(3, '0')}`;

        return formattedDate; // Example: 2024-09-14 10:15:59.649
    }

    // Clean up old logs that are older than 5 minutes
    private static cleanUpOldLogs() {
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago

        // Find the index where logs are newer than five minutes ago
        let firstRecentLogIndex = 0;
        for (let i = 0; i < this.logBuffer.length; i++) {
            if (this.logBuffer[i].timestamp >= fiveMinutesAgo) {
                firstRecentLogIndex = i;
                break;
            }
        }

        // Remove old logs from the buffer
        if (firstRecentLogIndex > 0) {
            this.logBuffer = this.logBuffer.slice(firstRecentLogIndex);
        }
    }

    // Disposes of the output channel when no longer needed
    static dispose() {
        if (!this.isDisposed) {
            this.outputChannel?.dispose();
            this.outputChannelFiles?.dispose();
            
            this.isDisposed = true;
        }
    }
}
