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

    
    // Check case insensitivity of function calls (file paths, function names)
    test('GscAll.FunctionReferences -> error + hover + definition', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscAll', 'FunctionReferences.gsc']);
            
            // There should be no error - everything is case insensitive
            assert.ok(gsc.diagnostics.length === 0);

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 58));
            tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            //checkHover(hover1, "\n```\nfuncName()\n```\nFile: ```GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc```");
            const locations1 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(5, 58));
            tests.checkDefinition(locations1, "GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Lowercase path
            // functionreferencesfolder\FunctionReferencesFile::funcName();
            const hover2 = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 58));
            tests.checkHover(hover2, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations2 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(8, 58));
            tests.checkDefinition(locations2, "GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file
            // functionreferencesfolder\functionreferencesfile::funcName();
            const hover3 = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 58));
            tests.checkHover(hover3, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations3 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(11, 58));
            tests.checkDefinition(locations3, "GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file + func name
            // functionreferencesfolder\functionreferencesfile::funcname();
            const hover4 = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 58));
            tests.checkHover(hover4, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations4 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(14, 58));
            tests.checkDefinition(locations4, "GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Hover over "includedFuncName();" - its case insensitive, external file should be found
            const hover5 = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 8));
            tests.checkHover(hover5, GscFunction.generateMarkdownDescription({name: "includedFuncName", parameters: []}, false, tests.filePathToUri("GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString(), "Included via '#include'").value);
            const locations5 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(17, 8));
            tests.checkDefinition(locations5, "GscAll/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Hover over "localFunc();" - its case insensitive, local func should be found
            const hover6 = await GscHoverProvider.getHover(gsc, new vscode.Position(20, 8));
            tests.checkHover(hover6, GscFunction.generateMarkdownDescription({name: "LOCALFUNC", parameters: []}, true, undefined, undefined).value);
            const locations6 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(20, 8));
            tests.checkDefinition(locations6, "GscAll/FunctionReferences.gsc");
            
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
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