// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Gsc } from './Gsc';
import { Issues } from './Issues';
import { Updates } from './Updates';

export const EXTENSION_ID = 'eyza.cod-gsc';
export const GITHUB_ISSUES_URL = 'https://github.com/eyza-cod2/vscode-cod-gsc/issues';
export const GITHUB_URL = 'https://github.com/eyza-cod2/vscode-cod-gsc';
export const DISCORD_URL = 'https://discord.gg/5WUpcMqUG7';
export const EMAIL = 'mailto:kratas.tom' + '@' + 'seznam.cz';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	Issues.activate(context);
	
	await Gsc.activate(context);

	await Updates.activate(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}