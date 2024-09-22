import * as vscode from 'vscode';
import assert from 'assert';
import { GscHoverProvider } from '../../GscHoverProvider';
import { GscDefinitionProvider } from '../../GscDefinitionProvider';
import * as tests from '../Tests.test';
import { GscFunction } from '../../GscFunctions';


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscComplex', () => {

    setup(async () => {
        await tests.activateExtension();
    });
    
    // Check case insensitivity of function calls (file paths, function names)
    test('GscComplex.FunctionReferences -> error + hover + definition', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscComplex', 'FunctionReferences.gsc']);
            
            // There should be no error - everything is case insensitive
            assert.ok(gsc.diagnostics.length === 0);

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 58));
            tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            //checkHover(hover1, "\n```\nfuncName()\n```\nFile: ```GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc```");
            const locations1 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(5, 58));
            tests.checkDefinition(locations1, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Lowercase path
            // functionreferencesfolder\FunctionReferencesFile::funcName();
            const hover2 = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 58));
            tests.checkHover(hover2, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations2 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(8, 58));
            tests.checkDefinition(locations2, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file
            // functionreferencesfolder\functionreferencesfile::funcName();
            const hover3 = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 58));
            tests.checkHover(hover3, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations3 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(11, 58));
            tests.checkDefinition(locations3, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file + func name
            // functionreferencesfolder\functionreferencesfile::funcname();
            const hover4 = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 58));
            tests.checkHover(hover4, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations4 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(14, 58));
            tests.checkDefinition(locations4, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Hover over "includedFuncName();" - its case insensitive, external file should be found
            const hover5 = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 8));
            tests.checkHover(hover5, GscFunction.generateMarkdownDescription({name: "includedFuncName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString(), "Included via '#include'").value);
            const locations5 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(17, 8));
            tests.checkDefinition(locations5, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

            // Hover over "localFunc();" - its case insensitive, local func should be found
            const hover6 = await GscHoverProvider.getHover(gsc, new vscode.Position(20, 8));
            tests.checkHover(hover6, GscFunction.generateMarkdownDescription({name: "LOCALFUNC", parameters: []}, true, undefined, undefined).value);
            const locations6 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(20, 8));
            tests.checkDefinition(locations6, "GscComplex/FunctionReferences.gsc");
            
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });

    // Check case insensitivity of function calls (file paths, function names)
    test('GscComplex.DoubleInclude', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscComplex', 'scripts', 'DoubleInclude.gsc']);
            
            tests.checkDiagnostic(gsc.diagnostics, 0, "File is including itself", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 1);

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(3, 6));
            tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "func1", parameters: []}, true, tests.filePathToUri("GscComplex/scripts/DoubleInclude.gsc").toString()).value);

            const locations1 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(3, 6));
            tests.checkDefinition(locations1, "GscComplex/scripts/DoubleInclude.gsc");


        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    // Check case insensitivity of function calls (file paths, function names)
    test('GscComplex.DuplicateInclude', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscComplex', 'scripts', 'DuplicateInclude.gsc']);
            
            tests.checkDiagnostic(gsc.diagnostics, 0, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 1, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 2);

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    // Check case insensitivity of function calls (file paths, function names)
    test('GscComplex.Include', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscComplex', 'scripts', 'Include.gsc']);
            
            tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'func2' is defined in 2 places!", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 1, "File is including itself", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 2, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 3, "Duplicate #include file path", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 4);

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });

});
