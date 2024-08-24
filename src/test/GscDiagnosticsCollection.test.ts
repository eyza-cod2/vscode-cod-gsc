import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import assert from 'assert';
import { GscFile } from '../GscFile';



function checkItem(diagnosticItems: vscode.Diagnostic[], index: number, errorText: string, severity: vscode.DiagnosticSeverity) {

    function message(message: string, current: string, expected: string) {
        var debugText = diagnosticItems.map((diagnostic, i) => "  " + i + ": " + diagnostic.message + "   [" + vscode.DiagnosticSeverity[diagnostic.severity] + "]").join('\n');
        return "diagnostics[" + index + "] = '" + current + "'. Expected: '" + expected + "'. Message: " + message + ")\n\nErrors:\n" + debugText;
    }

    var item = diagnosticItems.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));
    
    assert.ok(item.message === errorText, message("Unexpected error message", item.message, errorText));
    assert.ok(item.severity === severity, message("Unexpected severity", vscode.DiagnosticSeverity[item.severity], vscode.DiagnosticSeverity[severity]));
   
}

function waitForDiagnosticsUpdate(uri: vscode.Uri): Promise<vscode.Diagnostic[]> {
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

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testWorkspaceDir = path.join(os.tmpdir(), 'vscode-test-workspace');


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscDiagnosticsCollection.CoD2MP', () => {

    test('GscDiagnosticsCollection.CoD2MP.casting', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'casting.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;

        checkItem(diagnostics, 0, "Casting to data type is not supported for CoD2 MP", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 1);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionOverwriting', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'functionOverwriting.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;


        checkItem(diagnostics, 0, "Function 'spawn' is overwriting build-in function", vscode.DiagnosticSeverity.Information);
        checkItem(diagnostics, 1, "Function 'hide' is overwriting build-in function", vscode.DiagnosticSeverity.Information);
        assert.ok(diagnostics.length === 2);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionParameters', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'functionParameters.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;


        checkItem(diagnostics, 0, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 1, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 2, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 3, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 4, "Function 'aCos' can not be called on object (does not support callon object)", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 5, "Function 'getAmmoCount' must be called on object (callon object is missing)", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 6, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 7, "Function 'spawn' expect min 2 parameters, got 1", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 8, "Function 'spawn' expect max 5 parameters, got 6", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 9, "Function 'spawn' expect max 5 parameters, got 7", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 10, "Function 'spawn' expect max 5 parameters, got 8", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 11);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionParametersLocal', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'functionParametersLocal.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;


        checkItem(diagnostics, 0, "Function 'p0' does not expect any parameters, got 1", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 1, "Function 'p0' does not expect any parameters, got 2", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 2, "Function 'p1' expect 1 parameter, got 2", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 3, "Function 'p2' expect 2 parameters, got 3", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 4, "Function 'p2' expect 2 parameters, got 5", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 5);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionUndefined', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'functionUndefined.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;


        checkItem(diagnostics, 0, "Function 'unknownLocalFunction' is not defined!", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 1, "Function 'func2' is not defined in 'functionUndefinedFuncs.gsc'!", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 2);
    });


    test('GscDiagnosticsCollection.CoD2MP.invalidFile', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'invalidFile.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;


        checkItem(diagnostics, 0, "File 'unknown_path\\script.gsc' was not found in workspace folder 'GscDiagnosticsCollection.CoD2MP'", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 1);
    });
});






suite('GscDiagnosticsCollection.UniversalGame', () => {


    test('GscDiagnosticsCollection.UniversalGame.casting', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.UniversalGame', 'casting.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;

        assert.ok(diagnostics.length === 0);
    });

    test('GscDiagnosticsCollection.UniversalGame.functionOverwriting', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.UniversalGame', 'functionOverwriting.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;

        assert.ok(diagnostics.length === 0);
    });


    test('GscDiagnosticsCollection.UniversalGame.functionParameters', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.UniversalGame', 'functionParameters.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;

        assert.ok(diagnostics.length === 0);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionParametersLocal', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.CoD2MP', 'functionParametersLocal.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;


        checkItem(diagnostics, 0, "Function 'p0' does not expect any parameters, got 1", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 1, "Function 'p0' does not expect any parameters, got 2", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 2, "Function 'p1' expect 1 parameter, got 2", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 3, "Function 'p2' expect 2 parameters, got 3", vscode.DiagnosticSeverity.Error);
        checkItem(diagnostics, 4, "Function 'p2' expect 2 parameters, got 5", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 5);
    });


    test('GscDiagnosticsCollection.UniversalGame.functionUndefined', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.UniversalGame', 'functionUndefined.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;

        assert.ok(diagnostics.length === 0);
    });


    test('GscDiagnosticsCollection.UniversalGame.invalidFile', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscDiagnosticsCollection.UniversalGame', 'invalidFile.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        const diagnosticsPromise = waitForDiagnosticsUpdate(fileUri);
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await diagnosticsPromise;

        checkItem(diagnostics, 0, "File 'unknown_path\\script.gsc' was not found in workspace folder 'GscDiagnosticsCollection.UniversalGame'", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 1);
    });
});
