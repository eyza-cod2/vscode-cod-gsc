import { defineConfig } from '@vscode/test-cli';
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { fileURLToPath } from 'url';

// Get extension root directory
const extensionPath = path.dirname(fileURLToPath(import.meta.url));

// Define the path to the source test workspace folder 
const sourceWorkspaceFolder = path.resolve(extensionPath, 'src/test/workspace');

// Define the path to the temp test workspace folder
const tempWorkspaceFolder = path.join(os.tmpdir(), 'vscode-test-workspace');
const tempWorkspaceFolderFile = path.join(tempWorkspaceFolder, 'vscode-cod-gsc-tests.code-workspace');

// Attempt to delete the temp test workspace directory from previous runs
if (fs.existsSync(tempWorkspaceFolder)) {
	fs.rmSync(tempWorkspaceFolder, { recursive: true, force: true });
}

// Create a new temp workspace directory by copying the source test workspace directory
fs.cpSync(sourceWorkspaceFolder, tempWorkspaceFolder, { recursive: true });


export default defineConfig({
	files: 'out/test/**/*.test.js',
	mocha: {
		timeout: 1000*60*60,
	},
	workspaceFolder: tempWorkspaceFolderFile,
    launchArgs: [
        '--disable-extensions', // Disable other extensions to avoid conflicts
    ],
});
