import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import assert from 'assert';
import { GscData, GscVariableDefinitionType } from '../GscFileParser';
import { GscHoverProvider } from '../GscHoverProvider';
import { GscDefinitionProvider } from '../GscDefinitionProvider';
import { EXTENSION_ID } from '../extension';
import { GscFile, GscFiles } from '../GscFiles';
import { GscCompletionItemProvider } from '../GscCompletionItemProvider';
import { GscCodeActionProvider } from '../GscCodeActionProvider';
import { GscFunction } from '../GscFunctions';


export const testWorkspaceDir = path.join(os.tmpdir(), 'vscode-test-workspace');



export async function activateExtension() {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension, "Extension should be available");

    // Activate the extension
    await extension!.activate();

    assert.ok(extension!.isActive, "Extension should be activated");
}



export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}



export async function loadGscFile(paths: string[], doWaitForDiagnosticsUpdate: boolean = true): Promise<[gscFile: GscFile, diagnostics: vscode.Diagnostic[]]> {

    const filePath = path.join(testWorkspaceDir, ...paths);
    const fileUri = vscode.Uri.file(filePath);

    if (doWaitForDiagnosticsUpdate) {
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);

        var gscFile = await GscFiles.getFileData(fileUri);
        
        const diagnostics = await diagnosticsPromise;
        
        return [gscFile, diagnostics];
    } else {
        var gscFile = await GscFiles.getFileData(fileUri);
        return [gscFile, []];
    }
    
}




export function checkDiagnostic(diagnosticItems: vscode.Diagnostic[], index: number, errorText: string, severity: vscode.DiagnosticSeverity) {

    function message(message: string, current: string, expected: string) {
        var debugText = diagnosticItems.map((diagnostic, i) => "  " + i + ": " + diagnostic.message + "   [" + vscode.DiagnosticSeverity[diagnostic.severity] + "]").join('\n');
        return message + "\n\ndiagnostics[" + index + "] = \n'" + current + "'. \n\nExpected: \n'" + expected + "'. \n\nErrors:\n" + debugText;
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
        return "diagnostics[" + index + "] = \n'" + current + "'. \n\nExpected: \n'" + expected + "'. \n\nMessage: " + message + ")\n\nErrors:\n" + debugText;
    }

    var item = codeActions.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));
    
    assert.deepStrictEqual(item.title, errorText, message("Unexpected error message", item.title, errorText));
    assert.deepStrictEqual(item.title, errorText, message("Unexpected error message", item.title, errorText));
}






export function checkHover(hover: vscode.Hover, expected: string) {
    assert.ok(hover !== undefined);
    assert.ok(hover.contents.length === 1);
    assert.ok(hover.contents[0] instanceof vscode.MarkdownString);
    assert.deepStrictEqual(hover.contents[0].value, expected, "Not equal:\n\nCurrent:\n'" + hover.contents[0].value + "'\n\nExpected:\n'" + expected + "'\n\n");
}

export async function checkHoverExternalFunc(gscFile: GscFile, pos: vscode.Position, name: string, parameters: {name: string, commentBefore?: string}[], pathUri: string, reason: string) {
    const hover = await GscHoverProvider.getHover(gscFile, pos);
    checkHover(hover, GscFunction.generateMarkdownDescription({name: name, parameters: parameters}, false, filePathToUri(pathUri).toString(), reason).value);
}

export function getFunctionDescription(name: string, parameters: {name: string, commentBefore?: string}[], isLocal: boolean, pathUri: string, reason: string = "") {
    return GscFunction.generateMarkdownDescription({name: name, parameters: parameters}, isLocal, filePathToUri(pathUri).toString(), reason).value;
}



export function checkDefinition(locations: vscode.Location[], expectedFileEnd: string) {
    assert.ok(locations !== undefined, "Locations are undefined");
    assert.ok(locations.length === 1, "Locations does not contain exactly one item");
    assert.ok(locations[0].uri.path.endsWith(expectedFileEnd), "Expected file end: " + expectedFileEnd + ". Actual: " + locations[0].uri.path);
}

export async function checkDefinitionFunc(gscFile: GscFile, pos: vscode.Position, pathUri: string) {
    const locations = await GscDefinitionProvider.getFunctionDefinitionLocations(gscFile, pos);
    checkDefinition(locations, pathUri);
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










export function waitForDiagnosticsUpdate(uri: vscode.Uri): Promise<vscode.Diagnostic[]> {
    return new Promise((resolve, reject) => {
        const disposable = vscode.languages.onDidChangeDiagnostics((e) => {
            console.log("onDidChangeDiagnostics event fired");
            if (e.uris.some(changedUri => changedUri.toString() === uri.toString())) {
                const diagnostics = vscode.languages.getDiagnostics(uri);
                disposable.dispose();  // Clean up the event listener
                resolve(diagnostics);
            }
        });

        // Optionally, add a timeout in case diagnostics don't update within a reasonable time
        setTimeout(() => {
            disposable.dispose();
            reject(new Error('Timeout waiting for diagnostics update'));
        }, 5000);  // Adjust the timeout as needed
    });
}

export function filePathToUri(relativePath: string): vscode.Uri {
    const filePath = path.join(testWorkspaceDir, relativePath);
    const fileUri = vscode.Uri.file(filePath);
    return fileUri;
}