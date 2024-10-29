import * as vscode from 'vscode';
import * as tests from '../Tests.test';
import assert from 'assert';
import { GscHoverProvider } from '../../GscHoverProvider';
import { GscFunction } from '../../GscFunctions';
import { GscDefinitionProvider } from '../../GscDefinitionProvider';
import { GscCompletionItemProvider } from '../../GscCompletionItemProvider';
import { GscVariableDefinitionType } from '../../GscFileParser';
import { GscReferenceProvider } from '../../GscReferenceProvider';
import { Issues } from '../../Issues';


suite('GscFileReferences', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    // Check case insensitivity of function calls (file paths, function names)
    test('GscFileReferences - lower upper case', async () => {
        try {
            const gsc = await tests.loadGscFile(['GscFileReferences.1', 'LowerUpperCase.gsc']);
            
            // There should be no error - everything is case insensitive
            assert.ok(gsc.diagnostics.length === 0);

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 57));
            tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            //checkHover(hover1, "\n```\nfuncName()\n```\nFile: ```GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc```");
            const locations1 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(5, 57));
            tests.checkDefinition(locations1, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Lowercase path
            // functionreferencesfolder\FunctionReferencesFile::funcName();
            const hover2 = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 57));
            tests.checkHover(hover2, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations2 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(8, 57));
            tests.checkDefinition(locations2, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file
            // functionreferencesfolder\functionreferencesfile::funcName();
            const hover3 = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 57));
            tests.checkHover(hover3, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations3 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(11, 57));
            tests.checkDefinition(locations3, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file + func name
            // functionreferencesfolder\functionreferencesfile::funcname();
            const hover4 = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 57));
            tests.checkHover(hover4, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const locations4 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(14, 57));
            tests.checkDefinition(locations4, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Hover over "includedFuncName();" - its case insensitive, external file should be found
            const hover5 = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 8));
            tests.checkHover(hover5, GscFunction.generateMarkdownDescription({name: "includedFuncName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString(), "Included via '#include'").value);
            const locations5 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(17, 8));
            tests.checkDefinition(locations5, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Hover over "localFunc();" - its case insensitive, local func should be found
            const hover6 = await GscHoverProvider.getHover(gsc, new vscode.Position(20, 8));
            tests.checkHover(hover6, GscFunction.generateMarkdownDescription({name: "LOCALFUNC", parameters: []}, true, undefined, undefined).value);
            const locations6 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(20, 8));
            tests.checkDefinition(locations6, "GscFileReferences.1/LowerUpperCase.gsc");
            
            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    // Check case insensitivity of function calls (file paths, function names)
    test('GscFileReferences - included workspace folders 1', async () => {
        try {
            var gsc = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file1.gsc']);
            

            tests.checkDiagnostic(gsc.diagnostics, 0, "File 'scripts\\file2.gsc' was not found in workspace folder 'GscFileReferences.1'", vscode.DiagnosticSeverity.Error);
            tests.checkDiagnostic(gsc.diagnostics, 1, "File 'scripts\\file3.gsc' was not found in workspace folder 'GscFileReferences.1'", vscode.DiagnosticSeverity.Error);
            assert.ok(gsc.diagnostics.length === 2);


            var position = new vscode.Position(1, 34);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.3/scripts/file_replaced_all.gsc", "Included via other workspace folder settings.  \nFile in current workspace is being overwritten.");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            var position = new vscode.Position(3, 34);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.2/scripts/file_replaced_1_2.gsc", "Included via other workspace folder settings.  \nFile in current workspace is being overwritten.");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");

            var position = new vscode.Position(5, 32);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.1/scripts/file_replaced_1.gsc", "");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            var position = new vscode.Position(8, 22);
            var hover = await GscHoverProvider.getHover(gsc, position);
            tests.checkHover(hover, GscFunction.generateMarkdownDescription({name: "main", parameters: []}, true, undefined, undefined).value);     
            var locations = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, position);
            tests.checkDefinition(locations, "GscFileReferences.1/scripts/file1.gsc");


            // Write text into document
            const document = await vscode.window.showTextDocument(gsc.uri);
            await document.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(14, 4), "level.");
            });
            await tests.waitForDiagnosticsChange(gsc.uri);

            var gsc = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file1.gsc']);

            const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(14, 10), gsc.config.currentGame, undefined);

            tests.checkCompletions(gsc, completions, 0, "file1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            assert.ok(completions.length === 1);



            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc.uri, 0, 0, 4);
            tests.checkReferenceLocation(refLocs, 1, gsc.uri, 8, 19, 23);
            assert.strictEqual(refLocs.length, 2);


            // Close text editor
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');


            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    // Check case insensitivity of function calls (file paths, function names)
    test('GscFileReferences - included workspace folders 2', async () => {
        try {
            var gsc = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file2.gsc']);
            

            tests.checkDiagnostic(gsc.diagnostics, 0, "File 'scripts\\file3.gsc' was not found in workspace folder 'GscFileReferences.2', 'GscFileReferences.1'", vscode.DiagnosticSeverity.Error);
            assert.ok(gsc.diagnostics.length === 1);


            var position = new vscode.Position(1, 34);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.3/scripts/file_replaced_all.gsc", "Included via other workspace folder settings.  \nFile in current workspace is being overwritten.");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            var position = new vscode.Position(3, 34);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.2/scripts/file_replaced_1_2.gsc", "");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");

            var position = new vscode.Position(5, 32);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.1/scripts/file_replaced_1.gsc", "Included via workspace folder settings");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");


            var position = new vscode.Position(8, 22);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.1/scripts/file1.gsc", "Included via workspace folder settings");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.1/scripts/file1.gsc");

            var position = new vscode.Position(9, 22);
            var hover = await GscHoverProvider.getHover(gsc, position);
            tests.checkHover(hover, GscFunction.generateMarkdownDescription({name: "main", parameters: []}, true, undefined, undefined).value);     
            var locations = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, position);
            tests.checkDefinition(locations, "GscFileReferences.2/scripts/file2.gsc");


            // Write text into document
            const document = await vscode.window.showTextDocument(gsc.uri);
            await document.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(14, 4), "level.");
            });
            await tests.waitForDiagnosticsChange(gsc.uri);

            var gsc = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file2.gsc']);

            const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(14, 10), gsc.config.currentGame, undefined);

            tests.checkCompletions(gsc, completions, 0, "file2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc, completions, 1, "file1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            assert.ok(completions.length === 2);

            // Close text editor
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');


            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    // Check case insensitivity of function calls (file paths, function names)
    test('GscFileReferences - included workspace folders 3', async () => {
        try {
            var gsc = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file3.gsc']);
            

            assert.ok(gsc.diagnostics.length === 0);


            var position = new vscode.Position(1, 34);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.3/scripts/file_replaced_all.gsc", "");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            var position = new vscode.Position(3, 34);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.2/scripts/file_replaced_1_2.gsc", "Included via workspace folder settings");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");

            var position = new vscode.Position(5, 32);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.1/scripts/file_replaced_1.gsc", "Included via workspace folder settings");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");


            var position = new vscode.Position(8, 22);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.1/scripts/file1.gsc", "Included via workspace folder settings");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.1/scripts/file1.gsc");

            var position = new vscode.Position(9, 22);
            await tests.checkHoverExternalFunc(gsc, position, "main", [], "GscFileReferences.2/scripts/file2.gsc", "Included via workspace folder settings");
            await tests.checkDefinitionFunc(gsc, position, "GscFileReferences.2/scripts/file2.gsc");

            var position = new vscode.Position(10, 22);
            var hover = await GscHoverProvider.getHover(gsc, position);
            tests.checkHover(hover, GscFunction.generateMarkdownDescription({name: "main", parameters: []}, true, undefined, undefined).value);     
            var locations = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, position);
            tests.checkDefinition(locations, "GscFileReferences.3/scripts/file3.gsc");


            // Write text into document
            const document = await vscode.window.showTextDocument(gsc.uri);
            await document.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(14, 4), "level.");
            });
            await tests.waitForDiagnosticsChange(gsc.uri);

            var gsc = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file3.gsc']);

            const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(14, 10), gsc.config.currentGame, undefined);

            tests.checkCompletions(gsc, completions, 0, "file3", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc, completions, 1, "file2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc, completions, 2, "file1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            assert.ok(completions.length === 3);

            // Close text editor
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');


            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });



    test('GscFileReferences - function references - case', async () => {
        try {
            var gsc = await tests.loadGscFile(['GscFileReferences.1', 'LowerUpperCaseFolder', 'FunctionReferencesFile.gsc']);
            
            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc.uri, 0, 0, 8);
            tests.checkReferenceLocation(refLocs, 1, tests.filePathToUri("GscFileReferences.1", "LowerUpperCase.gsc"), 5, 49, 57);
            tests.checkReferenceLocation(refLocs, 2, tests.filePathToUri("GscFileReferences.1", "LowerUpperCase.gsc"), 8, 49, 57);
            tests.checkReferenceLocation(refLocs, 3, tests.filePathToUri("GscFileReferences.1", "LowerUpperCase.gsc"), 11, 49, 57);
            tests.checkReferenceLocation(refLocs, 4, tests.filePathToUri("GscFileReferences.1", "LowerUpperCase.gsc"), 14, 49, 57);
            assert.strictEqual(refLocs.length, 5);

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });



    test('GscFileReferences - function references - in all files', async () => {
        try {
            var gsc = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file_replaced_all.gsc']);
            

            assert.strictEqual(gsc.diagnostics.length, 0);


            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc.uri, 0, 0, 4);
            tests.checkReferenceLocation(refLocs, 1, tests.filePathToUri("GscFileReferences.3", "scripts", "file3.gsc"), 1, 31, 35);
            tests.checkReferenceLocation(refLocs, 2, tests.filePathToUri("GscFileReferences.2", "scripts", "file2.gsc"), 1, 31, 35);
            tests.checkReferenceLocation(refLocs, 3, tests.filePathToUri("GscFileReferences.1", "scripts", "file1.gsc"), 1, 31, 35);
            assert.strictEqual(refLocs.length, 4);


            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });



    test('GscFileReferences - function references - in replaced file', async () => {
        try {
            var gsc = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_all.gsc']);
            

            assert.strictEqual(gsc.diagnostics.length, 0);


            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc.uri, 0, 0, 4);
            assert.strictEqual(refLocs.length, 1);


            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });

});
