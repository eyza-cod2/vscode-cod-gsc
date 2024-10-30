import * as vscode from 'vscode';
import assert from 'assert';
import * as tests from '../Tests.test';
import { GscHoverProvider } from '../../GscHoverProvider';
import { GscFunction } from '../../GscFunctions';
import { GscDefinitionProvider } from '../../GscDefinitionProvider';


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscAll.CoD2MP', () => {

    setup(async () => {
        await tests.activateExtension();
    });

    test('GscAll.CoD2MP.casting', async () => {
        const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'casting.gsc']);
        
        tests.checkDiagnostic(gsc.diagnostics, 0, "Casting to data type is not supported for CoD2 MP", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });


    test('GscAll.CoD2MP.functionOverwriting', async () => {
        const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'functionOverwriting.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'spawn' is overwriting build-in function", vscode.DiagnosticSeverity.Information);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'hide' is overwriting build-in function", vscode.DiagnosticSeverity.Information);
        assert.ok(gsc.diagnostics.length === 2);
    });


    test('GscAll.CoD2MP.functionParameters', async () => {
        const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'functionParameters.gsc']);

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


    test('GscAll.CoD2MP.functionParametersLocal', async () => {
        const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'functionParametersLocal.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'p0' does not expect any parameters, got 1", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'p0' does not expect any parameters, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'p1' expect 1 parameter, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 3, "Function 'p2' expect 2 parameters, got 3", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 4, "Function 'p2' expect 2 parameters, got 5", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 5);
    });


    test('GscAll.CoD2MP.functionUndefined', async () => {
        const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'functionUndefined.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'unknownLocalFunction' is not defined!", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'func2' is not defined in 'functionUndefinedFuncs.gsc'!", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 2);
    });


    test('GscAll.CoD2MP.invalidFile', async () => {
        const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'invalidFile.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "File 'unknown_path\\script.gsc' was not found in workspace folder 'GscAll.CoD2MP'", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });


    
    test('GscAll.CoD2MP.ItselfInclude', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'scripts', 'ItselfInclude.gsc']);
            
            tests.checkDiagnostic(gsc.diagnostics, 0, "File is including itself", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 1);

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(3, 6));
            tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "func1", parameters: []}, true, tests.filePathToUri("GscAll.CoD2MP/scripts/ItselfInclude.gsc").toString()).value);

            const locations1 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(3, 6));
            tests.checkDefinition(locations1, "GscAll.CoD2MP/scripts/ItselfInclude.gsc");


        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });







    test('GscAll.CoD2MP.DuplicateInclude', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscAll.CoD2MP', 'scripts', 'DuplicateInclude.gsc']);
            
            tests.checkDiagnostic(gsc.diagnostics, 0, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 1, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'func2' is already defined in this file!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 3, "Function 'func3' is already defined in included file 'GscAll.CoD2MP/scripts/file3.gsc'!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 4, "Function 'func5' is already defined in this file!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 5, "Function 'func5' is already defined in this file!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 6, "Duplicate function definition of 'duplicate'!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 7, "Duplicate function definition of 'duplicate'!", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 8);

            var hover = await GscHoverProvider.getHover(gsc, new vscode.Position(10, 7));
            var md = GscFunction.generateMarkdownDescription({name: "func2", parameters: []}, true, undefined, undefined);
            md.appendMarkdown('\n\r');
            md.appendMarkdown('--------------------------------------------------------------------------  \n\r');
            md.appendMarkdown(GscFunction.generateMarkdownDescription({name: "func2", parameters: []}, false, tests.filePathToUri("GscAll.CoD2MP/scripts/file2.gsc").toString(), "Included via '#include'").value);
            tests.checkHover(hover, md.value);

            var hover = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 3));
            var md = GscFunction.generateMarkdownDescription({name: "func5", parameters: []}, true, undefined, undefined);
            md.appendMarkdown('\n\r');
            md.appendMarkdown('--------------------------------------------------------------------------  \n\r');
            md.appendMarkdown(GscFunction.generateMarkdownDescription({name: "func5", parameters: []}, false, tests.filePathToUri("GscAll.CoD2MP/scripts/file5.gsc").toString(), "Included via '#include'").value);
            md.appendMarkdown('\n\r');
            md.appendMarkdown('--------------------------------------------------------------------------  \n\r');
            md.appendMarkdown(GscFunction.generateMarkdownDescription({name: "func5", parameters: []}, false, tests.filePathToUri("GscAll.CoD2MP/scripts/file6.gsc").toString(), "Included via '#include'").value);
            tests.checkHover(hover, md.value);

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });
});
