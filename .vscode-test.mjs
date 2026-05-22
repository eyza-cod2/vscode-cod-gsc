import { defineConfig } from '@vscode/test-cli';
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { fileURLToPath } from 'url';

// Get extension root directory
const extensionPath = path.dirname(fileURLToPath(import.meta.url));

// Define the path to the source test workspace folder 
const sourceWorkspaceFolder = path.resolve(extensionPath, 'src/test/workspace');

const sharedConfig = {
	files: 'out/test/**/*.test.js',
	mocha: {
		timeout: 1000*60*60,
	},
	launchArgs: [
		'--disable-extensions', // Disable other extensions to avoid conflicts
	],
};

// Helper to create a fresh temp workspace for a specific version label
function createTempWorkspace(label) {
	const tempFolder = path.join(os.tmpdir(), `vscode-test-workspace-${label}`);
	const tempFile = path.join(tempFolder, 'vscode-cod-gsc-tests.code-workspace');
	if (fs.existsSync(tempFolder)) {
		fs.rmSync(tempFolder, { recursive: true, force: true });
	}
	fs.cpSync(sourceWorkspaceFolder, tempFolder, { recursive: true });
	return { tempFolder, tempFile };
}

const workspaceMin = createTempWorkspace('min');
const workspaceStable = createTempWorkspace('stable');

export default defineConfig([
	{ ...sharedConfig, version: '1.92.0', label: 'min',    workspaceFolder: workspaceMin.tempFile,    env: { VSCODE_TEST_WORKSPACE_DIR: workspaceMin.tempFolder } },
	{ ...sharedConfig, version: 'stable', label: 'stable', workspaceFolder: workspaceStable.tempFile, env: { VSCODE_TEST_WORKSPACE_DIR: workspaceStable.tempFolder } },
]);
