import * as vscode from 'vscode';
import assert from 'assert';
import * as tests from '../Tests.test';


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscDiagnosticsCollection.CoD2MP', () => {

    setup(async () => {
        await tests.activateExtension();
    });

    test('GscDiagnosticsCollection.CoD2MP.casting', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.CoD2MP', 'casting.gsc']);
        
        tests.checkDiagnostic(gsc.diagnostics, 0, "Casting to data type is not supported for CoD2 MP", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionOverwriting', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.CoD2MP', 'functionOverwriting.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'spawn' is overwriting build-in function", vscode.DiagnosticSeverity.Information);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'hide' is overwriting build-in function", vscode.DiagnosticSeverity.Information);
        assert.ok(gsc.diagnostics.length === 2);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionParameters', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.CoD2MP', 'functionParameters.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 3, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 4, "Function 'aCos' can not be called on object (does not support callon object)", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 5, "Function 'getAmmoCount' must be called on object (callon object is missing)", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 6, "Function 'spawn' expect min 2 parameters, got 0", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 7, "Function 'spawn' expect min 2 parameters, got 1", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 8, "Function 'spawn' expect max 5 parameters, got 6", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 9, "Function 'spawn' expect max 5 parameters, got 7", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 10, "Function 'spawn' expect max 5 parameters, got 8", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 11);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionParametersLocal', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.CoD2MP', 'functionParametersLocal.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'p0' does not expect any parameters, got 1", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'p0' does not expect any parameters, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'p1' expect 1 parameter, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 3, "Function 'p2' expect 2 parameters, got 3", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 4, "Function 'p2' expect 2 parameters, got 5", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 5);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionUndefined', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.CoD2MP', 'functionUndefined.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'unknownLocalFunction' is not defined!", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'func2' is not defined in 'functionUndefinedFuncs.gsc'!", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 2);
    });


    test('GscDiagnosticsCollection.CoD2MP.invalidFile', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.CoD2MP', 'invalidFile.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "File 'unknown_path\\script.gsc' was not found in workspace folder 'GscDiagnosticsCollection.CoD2MP'", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });
});






suite('GscDiagnosticsCollection.UniversalGame', () => {

    setup(async () => {
        await tests.activateExtension();
    });

    test('GscDiagnosticsCollection.UniversalGame.casting', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.UniversalGame', 'casting.gsc']);

        assert.ok(gsc.diagnostics.length === 0);
    });

    test('GscDiagnosticsCollection.UniversalGame.functionOverwriting', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.UniversalGame', 'functionOverwriting.gsc']);

        assert.ok(gsc.diagnostics.length === 0);
    });


    test('GscDiagnosticsCollection.UniversalGame.functionParameters', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.UniversalGame', 'functionParameters.gsc']);

        assert.ok(gsc.diagnostics.length === 0);
    });


    test('GscDiagnosticsCollection.CoD2MP.functionParametersLocal', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.UniversalGame', 'functionParametersLocal.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'p0' does not expect any parameters, got 1", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'p0' does not expect any parameters, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'p1' expect 1 parameter, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 3, "Function 'p2' expect 2 parameters, got 3", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 4, "Function 'p2' expect 2 parameters, got 5", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 5);
    });


    test('GscDiagnosticsCollection.UniversalGame.functionUndefined', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.UniversalGame', 'functionUndefined.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'func2' is not defined in 'functionUndefinedFuncs.gsc'!", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });


    test('GscDiagnosticsCollection.UniversalGame.invalidFile', async () => {
        const gsc = await tests.loadGscFile(['GscDiagnosticsCollection.UniversalGame', 'invalidFile.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "File 'unknown_path\\script.gsc' was not found in workspace folder 'GscDiagnosticsCollection.UniversalGame'", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });
});
