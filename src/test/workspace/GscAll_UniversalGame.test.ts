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

suite('GscAll.UniversalGame', () => {

    setup(async () => {
        await tests.activateExtension();
    });

    test('GscAll.UniversalGame.casting', async () => {
        const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'casting.gsc']);

        assert.ok(gsc.diagnostics.length === 0);
    });

    test('GscAll.UniversalGame.functionOverwriting', async () => {
        const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'functionOverwriting.gsc']);

        assert.ok(gsc.diagnostics.length === 0);
    });


    test('GscAll.UniversalGame.functionParameters', async () => {
        const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'functionParameters.gsc']);

        assert.ok(gsc.diagnostics.length === 0);
    });


    test('GscAll.CoD2MP.functionParametersLocal', async () => {
        const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'functionParametersLocal.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'p0' does not expect any parameters, got 1", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'p0' does not expect any parameters, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'p1' expect 1 parameter, got 2", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 3, "Function 'p2' expect 2 parameters, got 3", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 4, "Function 'p2' expect 2 parameters, got 5", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 5);
    });


    test('GscAll.UniversalGame.functionUndefined', async () => {
        const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'functionUndefined.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'func2' is not defined in 'functionUndefinedFuncs.gsc'!", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });


    test('GscAll.UniversalGame.invalidFile', async () => {
        const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'invalidFile.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "File 'unknown_path\\script.gsc' was not found in workspace folder 'GscAll.UniversalGame'", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 1);
    });

    test('GscAll.UniversalGame.ItselfInclude', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'scripts', 'ItselfInclude.gsc']);
            
            assert.strictEqual(gsc.diagnostics.length, 0);

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(3, 6));
            tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "func1", parameters: []}, true, tests.filePathToUri("GscAll.UniversalGame/scripts/ItselfInclude.gsc").toString()).value);

            const locations1 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(3, 6));
            tests.checkDefinition(locations1, "GscAll.UniversalGame/scripts/ItselfInclude.gsc");


        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('GscAll.UniversalGame.DuplicateInclude', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscAll.UniversalGame', 'scripts', 'DuplicateInclude.gsc']);
            
            tests.checkDiagnostic(gsc.diagnostics, 0, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 1, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 2, "Duplicate function definition of 'duplicate'!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 3, "Duplicate function definition of 'duplicate'!", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 4);

            var hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(10, 7));
            var md = GscFunction.generateMarkdownDescription({name: "func2", parameters: []}, true, undefined, undefined);
            md.appendMarkdown('\n\r');
            md.appendMarkdown('--------------------------------------------------------------------------  \n\r');
            md.appendMarkdown(`Function 'func2' is also defined in this file:  \n\r`);
            md.appendMarkdown(`\n- GscAll.UniversalGame/scripts/file2.gsc`);
            tests.checkHover(hover1, md.value);

            var hover = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 3));
            var md = GscFunction.generateMarkdownDescription({name: "func5", parameters: []}, true, undefined, undefined);
            md.appendMarkdown('\n\r');
            md.appendMarkdown('--------------------------------------------------------------------------  \n\r');
            md.appendMarkdown(`Function 'func5' is also defined in these files:  \n\r`);
            md.appendMarkdown(`\n- GscAll.UniversalGame/scripts/file5.gsc`);
            md.appendMarkdown(`\n- GscAll.UniversalGame/scripts/file6.gsc`);
            tests.checkHover(hover, md.value);

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });
});
