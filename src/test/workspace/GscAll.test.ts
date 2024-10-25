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

suite('GscAll', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    test('GscAll.SingleLine', async () => {
        const gsc = await tests.loadGscFile(['GscAll', 'SingleLine.gsc']);
        
        tests.checkDiagnostic(gsc.diagnostics, 0, 'Structure field access should be on single line.', vscode.DiagnosticSeverity.Information);
        tests.checkDiagnostic(gsc.diagnostics, 1, 'Function calls with object should be on single line.', vscode.DiagnosticSeverity.Information);
        tests.checkDiagnostic(gsc.diagnostics, 2, 'Function calls with object should be on single line.', vscode.DiagnosticSeverity.Information);
        assert.ok(gsc.diagnostics.length === 3);
    });


    test('GscAll.DuplicatedFunction', async () => {
        const gsc = await tests.loadGscFile(['GscAll', 'DuplicatedFunction.gsc']);
        
        tests.checkDiagnostic(gsc.diagnostics, 0, "Duplicate function definition of 'main'!", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Duplicate function definition of 'main'!", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 2);
    });

});