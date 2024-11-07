import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import assert from 'assert';
import { GscVariableDefinitionType } from '../GscFileParser';
import { GscHoverProvider } from '../GscHoverProvider';
import { GscDefinitionProvider } from '../GscDefinitionProvider';
import { EXTENSION_ID } from '../extension';
import { GscFileAndReferenceState, GscFiles } from '../GscFiles';
import { GscFile } from '../GscFile';
import { GscCompletionItemProvider } from '../GscCompletionItemProvider';
import { GscCodeActionProvider } from '../GscCodeActionProvider';
import { GscFunction } from '../GscFunctions';
import { LoggerOutput } from '../LoggerOutput';
import { Events } from '../Events';
import { GscMarkdownGenerator } from '../GscMarkdownGenerator';

export const testWorkspaceDir = path.join(os.tmpdir(), 'vscode-test-workspace');



export async function activateExtension() {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension, "Extension should be available");

    // Clear all editors
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');

    if (extension.isActive) {
        return;
    }

    // Wait for the GSC to activate
    const waitGsc = new Promise<void>((resolve, reject) => {
        const event = Events.onDidGscActivate(() => {
            event.dispose();
            clearTimeout(to);
            resolve();
        });
        const to = setTimeout(() => {
            event.dispose();
            reject(new Error('Timeout waiting for extension to activate'));
        }, 5000);
    });

    // Activate the extension
    await extension!.activate();

    await waitGsc;

    assert.ok(extension!.isActive, "Extension should be activated");
}



export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}



export async function loadGscFile(paths: string[]): Promise<GscFile> {

    const filePath = path.join(testWorkspaceDir, ...paths);
    const fileUri = vscode.Uri.file(filePath);
    
    LoggerOutput.log("[Tests] loadGscFile() " + vscode.workspace.asRelativePath(fileUri));
    
    var gscFile = await GscFiles.getFileData(fileUri, true, "loadGscFile");
    return gscFile;
}




export function checkDiagnostic(diagnosticItems: readonly vscode.Diagnostic[], index: number, errorText: string, severity: vscode.DiagnosticSeverity) {

    function message(message: string, current: string, expected: string) {
        var debugText = diagnosticItems.map((diagnostic, i) => "  " + i + ": " + diagnostic.message + "   [" + vscode.DiagnosticSeverity[diagnostic.severity] + "]").join('\n');
        return message + "\n\ndiagnostics[" + index + "] = \n'" + current + "'. \n\nExpected: \n'" + expected + "'. \n\nErrors:\n" + debugText + "\n\n";
    }

    var item = diagnosticItems.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));

    assert.deepStrictEqual(item.message, errorText, message("Unexpected error message", item.message, errorText));
    assert.deepStrictEqual(item.severity, severity, message("Unexpected severity", vscode.DiagnosticSeverity[item.severity], vscode.DiagnosticSeverity[severity]));
}

export async function getQuickFixesForDiagnostic(diagnosticItems: vscode.Diagnostic[], index: number, uri: vscode.Uri): Promise<vscode.CodeAction[]> { 
    var item = diagnosticItems.at(index);
    assert.ok(item !== undefined, "Undefined diagnostic item");          
    const codeActions = await GscCodeActionProvider.getCodeActions(uri, [item]);
    const codeActionsOfDiagnostic = codeActions.filter(c => c.kind === vscode.CodeActionKind.QuickFix);
    return codeActionsOfDiagnostic || [];
}


export function checkQuickFix(codeActions: vscode.CodeAction[], index: number, errorText: string) {

    function message(message: string, current: string, expected: string) {
        var debugText = codeActions.map((diagnostic, i) => "  " + i + ": " + diagnostic.title + "   [" + diagnostic.kind?.value + "]").join('\n');
        return "diagnostics[" + index + "] = \n'" + current + "'. \n\nExpected: \n'" + expected + "'. \n\nMessage: " + message + ")\n\nErrors:\n" + debugText + "\n\n";
    }

    var item = codeActions.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));
    
    assert.deepStrictEqual(item.title, errorText, message("Unexpected error message", item.title, errorText));
    assert.deepStrictEqual(item.title, errorText, message("Unexpected error message", item.title, errorText));
}






export function checkHover(hover: vscode.Hover | undefined, expected: string) {
    assert.ok(hover !== undefined, `Hover is undefined - Actual: ${hover}, Expected: defined`);
    assert.deepStrictEqual(hover.contents.length, 1);
    assert.ok(hover.contents[0] instanceof vscode.MarkdownString);
    assert.deepStrictEqual(hover.contents[0].value, expected, "Not equal:\n\nCurrent:\n'" + hover.contents[0].value + "'\n\nExpected:\n'" + expected + "'\n\n");
}

export async function checkHoverFunction(gscFile: GscFile, pos: vscode.Position, name: string, parameters: {name: string, commentBefore?: string}[], relativePath: string, reason: string) {
    const hover = await GscHoverProvider.getHover(gscFile, pos);
    const pathUri = filePathToUri(relativePath).toString();
    checkHover(hover, GscMarkdownGenerator.generateFunctionDescription({name: name, parameters: parameters}, gscFile.uri.toString() === pathUri, pathUri, reason).value);
}

export async function checkHoverPath(gscFile: GscFile, pos: vscode.Position, fileReferences: GscFileAndReferenceState[], path: string) {
    const hover = await GscHoverProvider.getHover(gscFile, pos);  
    const md = GscMarkdownGenerator.generateFilePathDescription(fileReferences, gscFile, path).value;
    checkHover(hover, md);
}

export function getFunctionDescription(name: string, parameters: {name: string, commentBefore?: string}[], isLocal: boolean, relativePath: string, reason: string = "") {
    const pathUri = filePathToUri(relativePath).toString();
    return GscMarkdownGenerator.generateFunctionDescription({name: name, parameters: parameters}, isLocal, pathUri, reason).value;
}



export function checkDefinition(locations: vscode.Location[], expectedFileEnd: string) {
    assert.ok(locations !== undefined, "Locations are undefined");
    assert.deepStrictEqual(locations.length, 1, "Locations does not contain exactly one item");
    assert.deepStrictEqual(locations[0].uri.path.slice(-expectedFileEnd.length), expectedFileEnd, "Expected file end: " + expectedFileEnd + ". Actual: " + locations[0].uri.path);
}

export async function checkDefinitionLocation(gscFile: GscFile, pos: vscode.Position, pathUri: string) {
    const locations = await GscDefinitionProvider.getDefinitionLocations(gscFile, pos);
    checkDefinition(locations, pathUri);
}



export function checkReferenceLocation(locations: vscode.Location[], index: number, uri: vscode.Uri, rangeLine: number, rangeCharacterStart: number, rangeCharacterEnd: number) {

    function message(message: string, current: string, expected: string) {
        var debugText = locations.map((loc, i) => "  " + i + ": " + loc.uri.fsPath + "  " + loc.range.start.line + ":" + loc.range.start.character + " - " + loc.range.end.line + ":" + loc.range.end.character).join('\n');
        return message + "\n\locations[" + index + "] = \n'" + current + "'. \n\nExpected: \n'" + expected + "'. \n\nErrors:\n" + debugText + "\n\n";
    }

    var item = locations.at(index);
    assert.ok(item !== undefined, message("Undefined location at index " + index, typeof item, "undefined"));

    assert.deepStrictEqual(item.uri.toString(), uri.toString(), message("Unexpected uri", item.uri.toString(), uri.toString()));
    assert.deepStrictEqual(item.range.start.line, rangeLine, message("Unexpected rangeLine", item.range.start.line.toString(), rangeLine.toString()));
    assert.deepStrictEqual(item.range.start.character, rangeCharacterStart, message("Unexpected rangeCharacterStart", item.range.start.character.toString(), rangeCharacterStart.toString()));
    assert.deepStrictEqual(item.range.end.character, rangeCharacterEnd, message("Unexpected rangeCharacterEnd", item.range.end.character.toString(), rangeCharacterEnd.toString()));
    assert.deepStrictEqual(item.range.start.line, item.range.end.line, message("Range not on same line", item.range.start.line.toString(), item.range.end.line.toString()));
}





export function checkCompletions(gscFile: GscFile, items: vscode.CompletionItem[], index: number, labelName: string, 
    kind: vscode.CompletionItemKind, types: GscVariableDefinitionType[],
    documentation?: string
) 
{

    function message(message: string, current: string, expected: string) {
        var debugText = gscFile.data.content + "\n\n";
        debugText += printCompletionItems(items); 
        return message + ". Current: '" + current + "'. Expected: '" + expected + "'. At: " + index + ")\n\n" + debugText + "\n\n";
    }

    function printCompletionItems(items: vscode.CompletionItem[]) {
        var debugText = "";
        items.forEach((item, index) => {
            debugText += "index: " + index + "   " + 
            "label: " + (item.label as vscode.CompletionItemLabel).label + "    " +
            "kind: " + (item.kind === undefined ? "undefined" : vscode.CompletionItemKind[item.kind]) + "    " +
            "desc: " + (item.label as vscode.CompletionItemLabel).description + "    " +
            "documentation: " + (item.documentation === undefined ? "undefined" : (item.documentation as vscode.MarkdownString).value) + 
            "\n";
        });
        return debugText;
    }

    var item = items.at(index);
    assert.ok(item !== undefined, message("Undefined", "undefined", "CompletionItem"));
    
    const label = (item.label as vscode.CompletionItemLabel);
    assert.ok(label.label === labelName, message("Unexpected label name", label.label, labelName));
    assert.deepStrictEqual(item.kind, kind, message("Unexpected kind", (item.kind === undefined ? "undefined" : vscode.CompletionItemKind[item.kind]), vscode.CompletionItemKind[kind]));
   
    const description = GscCompletionItemProvider.getItemDescriptionFromTypes(types);
    assert.deepStrictEqual(label.description, description, message("Unexpected description", label.description ?? "undefined", description));
    
    if (documentation !== undefined) {
        const doc = (item.documentation as vscode.MarkdownString).value;
        assert.ok(item.documentation !== undefined, message("Undefined item.documentation", "undefined", "string | MarkdownString"));
        assert.deepStrictEqual(doc, documentation, message("Unexpected doc", doc ?? "undefined", documentation));
    } else {
        assert.strictEqual(item.documentation, undefined);
    }
}


export function checkCachedFile(cachedFiles: GscFile[], index: number, paths: string[]) {

    const filePath = path.join(testWorkspaceDir, ...paths);
    const fileUri = vscode.workspace.asRelativePath(vscode.Uri.file(filePath));

    function message(message: string, current: string, expected: string) {
        var debugText = cachedFiles.map((file, i) => "  " + i + ": " + vscode.workspace.asRelativePath(file.uri)).join('\n');
        return message + "\n\ngscFiles[" + index + "] = \n'" + current + "'. \n\nExpected: \n'" + expected + "'. \n\nErrors:\n" + debugText + "\n\n";
    }

    var item = cachedFiles.at(index);
    assert.ok(item !== undefined, message("Undefined cached file at index " + index, typeof item, "undefined"));

    assert.deepStrictEqual(vscode.workspace.asRelativePath(item.uri), fileUri, message("Unexpected uri", vscode.workspace.asRelativePath(item.uri), fileUri));
}





export function filePathToUri(...paths: string[]): vscode.Uri {
    const filePath = path.join(testWorkspaceDir, ...paths);
    const fileUri = vscode.Uri.file(filePath);
    return fileUri;
}




export function waitForDiagnosticsChange(uri: vscode.Uri, debugText: string = ""): Promise<vscode.Diagnostic[]> {
    //console.log("waitForDiagnosticsChange: " + vscode.workspace.asRelativePath(uri));
    return new Promise((resolve, reject) => {
        const disposable = Events.onDidGscDiagnosticChange((gscFile) => {
            //console.log("onDidDiagnosticsChange: " + vscode.workspace.asRelativePath(gscFile.uri));
            if (gscFile.uri.toString() === uri.toString()) {
                disposable.dispose();  // Clean up the event listener
                const diagnosticsFile = gscFile.diagnostics;
                const diagnosticsVsCode = vscode.languages.getDiagnostics(uri);

                assert.deepStrictEqual(diagnosticsFile, diagnosticsVsCode);

                resolve(diagnosticsFile);
            }
        });

        // Optionally, add a timeout in case diagnostics don't update within a reasonable time
        setTimeout(() => {
            disposable.dispose();
            reject(new Error('Timeout waiting for diagnostics update. Uri: ' + vscode.workspace.asRelativePath(uri) + ". " + debugText));
        }, 5000);  // Adjust the timeout as needed
    });
}




export function waitForFileSystemChange(type: "create" | "delete" | "change", uri: vscode.Uri, debugText: string = ""): Promise<void> {
    return new Promise((resolve, reject) => {
        const disposable = Events.onDidFileSystemChange((data) => {
            //console.log("onDidDiagnosticsChange: " + vscode.workspace.asRelativePath(gscFile.uri));
            if (data.type === type, data.uri.toString() === uri.toString()) {
                disposable.dispose();  // Clean up the event listener
                resolve();
            }
        });
        setTimeout(() => {
            disposable.dispose();
            reject(new Error('Timeout waiting for file system change. Uri: ' + vscode.workspace.asRelativePath(uri) + ". " + debugText));
        }, 5000);  // Adjust the timeout as needed
    });
}






/**
 * Normalizes any unknown error into an Error object.
 * @param error - The unknown error to normalize.
 * @returns An Error object with a standardized message.
 */
export function normalizeError(error: unknown): Error {
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
export function printDebugInfoForError(err: unknown) {
    // Local anonymous function to handle buffering
    const buildOutputBuffer = () => {
        let buffer = '';

        const appendToBuffer = (text: string) => {
            buffer += text + '\n';
        };

        appendToBuffer(` `);
        appendToBuffer(` `);
        appendToBuffer(`Error:`);
        appendToBuffer(`-----------------------------------------------------------------`);
        appendToBuffer(`${err}`);
        appendToBuffer(`-----------------------------------------------------------------`);
        appendToBuffer(` `);
        appendToBuffer(` `);
        appendToBuffer(`Debug info for failed test:`);
        appendToBuffer(`-----------------------------------------------------------------`);

        const error = normalizeError(err);

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

        const log = LoggerOutput.getLogs(500, 60).join("\n");

        appendToBuffer(` `);
        appendToBuffer(` `);
        appendToBuffer(`Logs:`);
        appendToBuffer(log);
        appendToBuffer(`-----------------------------------------------------------------`);
        appendToBuffer(` `);
        appendToBuffer(` `);

        return buffer; // Return the accumulated buffer
    };

    // Print the output buffer in a single line
    console.log(buildOutputBuffer());

    // Re-throw the error
    throw new Error(`Test failed: ${err}`);
}

