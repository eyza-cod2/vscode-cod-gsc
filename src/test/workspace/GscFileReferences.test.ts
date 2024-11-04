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
import { GscFileAndReferenceState, GscFileReferenceState } from '../../GscFiles';
import { GscMarkdownGenerator } from '../../GscMarkdownGenerator';


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

            const hover1_include = await GscHoverProvider.getHover(gsc, new vscode.Position(0, 40));
            tests.checkHover(hover1_include, " File: `" + vscode.workspace.asRelativePath(tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc"), true) + "` &nbsp;&nbsp; (local file)  \n"); 

            // Correct path
            // FunctionReferencesFolder\FunctionReferencesFile::funcName();
            const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 57));
            tests.checkHover(hover1, GscMarkdownGenerator.generateFunctionDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const hover1_file = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 40));
            tests.checkHover(hover1_file, " File: `" + vscode.workspace.asRelativePath(tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc"), true) + "` &nbsp;&nbsp; (local file)  \n"); 
            const locations1 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(5, 57));
            tests.checkDefinition(locations1, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Lowercase path
            // functionreferencesfolder\FunctionReferencesFile::funcName();
            const hover2 = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 57));
            tests.checkHover(hover2, GscMarkdownGenerator.generateFunctionDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const hover2_file = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 40));
            tests.checkHover(hover2_file, " File: `" + vscode.workspace.asRelativePath(tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc"), true) + "` &nbsp;&nbsp; (local file)  \n"); 
            const locations2 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(8, 57));
            tests.checkDefinition(locations2, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file
            // functionreferencesfolder\functionreferencesfile::funcName();
            const hover3 = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 57));
            tests.checkHover(hover3, GscMarkdownGenerator.generateFunctionDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const hover3_file = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 40));
            tests.checkHover(hover3_file, " File: `" + vscode.workspace.asRelativePath(tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc"), true) + "` &nbsp;&nbsp; (local file)  \n"); 
            const locations3 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(11, 57));
            tests.checkDefinition(locations3, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Lowercase path + file + func name
            // functionreferencesfolder\functionreferencesfile::funcname();
            const hover4 = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 57));
            tests.checkHover(hover4, GscMarkdownGenerator.generateFunctionDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString()).value);
            const hover4_file = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 40));
            tests.checkHover(hover4_file, " File: `" + vscode.workspace.asRelativePath(tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc"), true) + "` &nbsp;&nbsp; (local file)  \n"); 
            const locations4 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(14, 57));
            tests.checkDefinition(locations4, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");


            // Hover over "includedFuncName();" - its case insensitive, external file should be found
            const hover5 = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 8));
            tests.checkHover(hover5, GscMarkdownGenerator.generateFunctionDescription({name: "includedFuncName", parameters: []}, false, tests.filePathToUri("GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc").toString(), "Included via '#include'").value);
            const locations5 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(17, 8));
            tests.checkDefinition(locations5, "GscFileReferences.1/LowerUpperCaseFolder/FunctionReferencesFile.gsc");

            // Hover over "localFunc();" - its case insensitive, local func should be found
            const hover6 = await GscHoverProvider.getHover(gsc, new vscode.Position(20, 8));
            tests.checkHover(hover6, GscMarkdownGenerator.generateFunctionDescription({name: "LOCALFUNC", parameters: []}, true, undefined, undefined).value);
            const locations6 = await GscDefinitionProvider.getDefinitionLocations(gsc, new vscode.Position(20, 8));
            tests.checkDefinition(locations6, "GscFileReferences.1/LowerUpperCase.gsc");
            
            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    // Check case insensitivity of function calls (file paths, function names)
    test('GscFileReferences - included workspace folders 1', async () => {
        try {
            var gsc_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file1.gsc']);
            var gsc_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file2.gsc']);
            var gsc_3 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file3.gsc']);
            
            var gsc_rep_all_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_all.gsc']);
            var gsc_rep_all_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_all.gsc']);
            var gsc_rep_all_3 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file_replaced_all.gsc']);
            
            var gsc_rep_1a2_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_1_2.gsc']);
            var gsc_rep_1a2_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_1_2.gsc']);

            var gsc_rep_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_1.gsc']);


            assert.ok(gsc_1.diagnostics.length === 0);

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(1, 20); // file_replaced_all
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_all_3, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_rep_all_3.workspaceFolder!},
                {gscFile: gsc_rep_all_2, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_rep_all_2.workspaceFolder!},
                {gscFile: gsc_rep_all_1, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_rep_all_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_1, position, pathReferences, "scripts\\file_replaced_all");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            var position = new vscode.Position(1, 34); // main()
            await tests.checkHoverFunction(gsc_1, position, "main", [], "GscFileReferences.3/scripts/file_replaced_all.gsc", "");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(3, 20); // file_replaced_1_2
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_1a2_2, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_rep_1a2_2.workspaceFolder!},
                {gscFile: gsc_rep_1a2_1, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_rep_1a2_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_1, position, pathReferences, "scripts\\file_replaced_1_2");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");

            var position = new vscode.Position(3, 34); // main()
            await tests.checkHoverFunction(gsc_1, position, "main", [], "GscFileReferences.2/scripts/file_replaced_1_2.gsc", "");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(5, 20); // file_replaced_1
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_1, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_rep_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_1, position, pathReferences, "scripts\\file_replaced_1");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            var position = new vscode.Position(5, 32); // main()
            await tests.checkHoverFunction(gsc_1, position, "main", [], "GscFileReferences.1/scripts/file_replaced_1.gsc", "");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file1::main();
            var position = new vscode.Position(8, 10); // scripts\file1
            await tests.checkHoverPath(gsc_1, position, [{gscFile: gsc_1, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_1.workspaceFolder!}], "scripts\\file1");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.1/scripts/file1.gsc");

            var position = new vscode.Position(8, 22); // main()
            await tests.checkHoverFunction(gsc_1, position, "main", [], "GscFileReferences.1/scripts/file1.gsc", "");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.1/scripts/file1.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file2::main();
            var position = new vscode.Position(9, 10); // scripts\file2
            await tests.checkHoverPath(gsc_1, position, [{gscFile: gsc_2, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_2.workspaceFolder!}], "scripts\\file2");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.2/scripts/file2.gsc");

            var position = new vscode.Position(9, 22); // main()
            await tests.checkHoverFunction(gsc_1, position, "main", [], "GscFileReferences.2/scripts/file2.gsc", "");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.2/scripts/file2.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file3::main();
            var position = new vscode.Position(10, 10); // scripts\file3
            await tests.checkHoverPath(gsc_1, position, [{gscFile: gsc_3, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_3.workspaceFolder!}], "scripts\\file3");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.3/scripts/file3.gsc");

            var position = new vscode.Position(10, 22); // main()
            await tests.checkHoverFunction(gsc_1, position, "main", [], "GscFileReferences.3/scripts/file3.gsc", "");
            await tests.checkDefinitionLocation(gsc_1, position, "GscFileReferences.3/scripts/file3.gsc");


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            // Write text into document
            const document = await vscode.window.showTextDocument(gsc_1.uri);
            await document.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(14, 4), "level.");
            });
            await tests.waitForDiagnosticsChange(gsc_1.uri);

            var gsc_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file1.gsc']);

            const completions = await GscCompletionItemProvider.getCompletionItems(gsc_1, new vscode.Position(14, 10), gsc_1.config.currentGame, undefined);

            tests.checkCompletions(gsc_1, completions, 0, "file3", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc_1, completions, 1, "file2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc_1, completions, 2, "file1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            assert.ok(completions.length === 3);



            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc_1, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc_1.uri, 0, 0, 4);
            tests.checkReferenceLocation(refLocs, 1, tests.filePathToUri("GscFileReferences.3/scripts/file3.gsc"), 8, 19, 23);
            tests.checkReferenceLocation(refLocs, 2, tests.filePathToUri("GscFileReferences.2/scripts/file2.gsc"), 8, 19, 23);
            tests.checkReferenceLocation(refLocs, 3, gsc_1.uri, 8, 19, 23);
            assert.strictEqual(refLocs.length, 4);


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
            var gsc_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file1.gsc']);
            var gsc_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file2.gsc']);
            var gsc_3 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file3.gsc']);
            
            var gsc_rep_all_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_all.gsc']);
            var gsc_rep_all_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_all.gsc']);
            var gsc_rep_all_3 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file_replaced_all.gsc']);
            
            var gsc_rep_1a2_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_1_2.gsc']);
            var gsc_rep_1a2_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_1_2.gsc']);

            var gsc_rep_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_1.gsc']);


            assert.ok(gsc_2.diagnostics.length === 0);

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(1, 20); // file_replaced_all
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_all_3, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_rep_all_3.workspaceFolder!},
                {gscFile: gsc_rep_all_2, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_rep_all_2.workspaceFolder!},
                {gscFile: gsc_rep_all_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_all_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_2, position, pathReferences, "scripts\\file_replaced_all");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            var position = new vscode.Position(1, 34); // main()
            await tests.checkHoverFunction(gsc_2, position, "main", [], "GscFileReferences.3/scripts/file_replaced_all.gsc", "");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(3, 20); // file_replaced_1_2
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_1a2_2, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_rep_1a2_2.workspaceFolder!},
                {gscFile: gsc_rep_1a2_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_1a2_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_2, position, pathReferences, "scripts\\file_replaced_1_2");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");

            var position = new vscode.Position(3, 34); // main()
            await tests.checkHoverFunction(gsc_2, position, "main", [], "GscFileReferences.2/scripts/file_replaced_1_2.gsc", "");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(5, 20); // file_replaced_1
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_2, position, pathReferences, "scripts\\file_replaced_1");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            var position = new vscode.Position(5, 32); // main()
            await tests.checkHoverFunction(gsc_2, position, "main", [], "GscFileReferences.1/scripts/file_replaced_1.gsc", "");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file1::main();
            var position = new vscode.Position(8, 10); // scripts\file1
            await tests.checkHoverPath(gsc_2, position, [{gscFile: gsc_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_2.workspaceFolder!}], "scripts\\file1");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.1/scripts/file1.gsc");

            var position = new vscode.Position(8, 22); // main()
            await tests.checkHoverFunction(gsc_2, position, "main", [], "GscFileReferences.1/scripts/file1.gsc", "");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.1/scripts/file1.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file2::main();
            var position = new vscode.Position(9, 10); // scripts\file2
            await tests.checkHoverPath(gsc_2, position, [{gscFile: gsc_2, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_2.workspaceFolder!}], "scripts\\file2");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.2/scripts/file2.gsc");

            var position = new vscode.Position(9, 22); // main()
            await tests.checkHoverFunction(gsc_2, position, "main", [], "GscFileReferences.2/scripts/file2.gsc", "");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.2/scripts/file2.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file3::main();
            var position = new vscode.Position(10, 10); // scripts\file3
            await tests.checkHoverPath(gsc_2, position, [{gscFile: gsc_3, referenceState: GscFileReferenceState.IncludedWorkspaceFolderOverwritten, referenceWorkspace: gsc_3.workspaceFolder!}], "scripts\\file3");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.3/scripts/file3.gsc");

            var position = new vscode.Position(10, 22); // main()
            await tests.checkHoverFunction(gsc_2, position, "main", [], "GscFileReferences.3/scripts/file3.gsc", "");
            await tests.checkDefinitionLocation(gsc_2, position, "GscFileReferences.3/scripts/file3.gsc");


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            // Write text into document
            const document = await vscode.window.showTextDocument(gsc_2.uri);
            await document.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(14, 4), "level.");
            });
            await tests.waitForDiagnosticsChange(gsc_2.uri);

            var gsc_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file2.gsc']);

            const completions = await GscCompletionItemProvider.getCompletionItems(gsc_2, new vscode.Position(14, 10), gsc_2.config.currentGame, undefined);

            tests.checkCompletions(gsc_2, completions, 0, "file3", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc_2, completions, 1, "file2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc_2, completions, 2, "file1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            assert.ok(completions.length === 3);



            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc_2, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc_2.uri, 0, 0, 4);
            tests.checkReferenceLocation(refLocs, 1, tests.filePathToUri("GscFileReferences.3/scripts/file3.gsc"), 9, 19, 23);
            tests.checkReferenceLocation(refLocs, 2, tests.filePathToUri("GscFileReferences.2/scripts/file2.gsc"), 9, 19, 23);
            tests.checkReferenceLocation(refLocs, 3, gsc_1.uri, 9, 19, 23);
            assert.strictEqual(refLocs.length, 4);

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
            var gsc_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file1.gsc']);
            var gsc_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file2.gsc']);
            var gsc_3 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file3.gsc']);
            
            var gsc_rep_all_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_all.gsc']);
            var gsc_rep_all_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_all.gsc']);
            var gsc_rep_all_3 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file_replaced_all.gsc']);
            
            var gsc_rep_1a2_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_1_2.gsc']);
            var gsc_rep_1a2_2 = await tests.loadGscFile(['GscFileReferences.2', 'scripts', 'file_replaced_1_2.gsc']);

            var gsc_rep_1 = await tests.loadGscFile(['GscFileReferences.1', 'scripts', 'file_replaced_1.gsc']);


            assert.ok(gsc_3.diagnostics.length === 0);

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(1, 20); // file_replaced_all
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_all_3, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_rep_all_3.workspaceFolder!},
                {gscFile: gsc_rep_all_2, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_all_2.workspaceFolder!},
                {gscFile: gsc_rep_all_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_all_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_3, position, pathReferences, "scripts\\file_replaced_all");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            var position = new vscode.Position(1, 34); // main()
            await tests.checkHoverFunction(gsc_3, position, "main", [], "GscFileReferences.3/scripts/file_replaced_all.gsc", "");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.3/scripts/file_replaced_all.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(3, 20); // file_replaced_1_2
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_1a2_2, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_1a2_2.workspaceFolder!},
                {gscFile: gsc_rep_1a2_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_1a2_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_3, position, pathReferences, "scripts\\file_replaced_1_2");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");

            var position = new vscode.Position(3, 34); // main()
            await tests.checkHoverFunction(gsc_3, position, "main", [], "GscFileReferences.2/scripts/file_replaced_1_2.gsc", "");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.2/scripts/file_replaced_1_2.gsc");


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var position = new vscode.Position(5, 20); // file_replaced_1
            var pathReferences: GscFileAndReferenceState[] = [ // First is the used file
                {gscFile: gsc_rep_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_rep_1.workspaceFolder!}
            ];
            await tests.checkHoverPath(gsc_3, position, pathReferences, "scripts\\file_replaced_1");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            var position = new vscode.Position(5, 32); // main()
            await tests.checkHoverFunction(gsc_3, position, "main", [], "GscFileReferences.1/scripts/file_replaced_1.gsc", "");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.1/scripts/file_replaced_1.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file1::main();
            var position = new vscode.Position(8, 10); // scripts\file1
            await tests.checkHoverPath(gsc_3, position, [{gscFile: gsc_1, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_2.workspaceFolder!}], "scripts\\file1");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.1/scripts/file1.gsc");

            var position = new vscode.Position(8, 22); // main()
            await tests.checkHoverFunction(gsc_3, position, "main", [], "GscFileReferences.1/scripts/file1.gsc", "");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.1/scripts/file1.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file2::main();
            var position = new vscode.Position(9, 10); // scripts\file2
            await tests.checkHoverPath(gsc_3, position, [{gscFile: gsc_2, referenceState: GscFileReferenceState.IncludedWorkspaceFolder, referenceWorkspace: gsc_2.workspaceFolder!}], "scripts\\file2");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.2/scripts/file2.gsc");

            var position = new vscode.Position(9, 22); // main()
            await tests.checkHoverFunction(gsc_3, position, "main", [], "GscFileReferences.2/scripts/file2.gsc", "");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.2/scripts/file2.gsc");

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // scripts\file3::main();
            var position = new vscode.Position(10, 10); // scripts\file3
            await tests.checkHoverPath(gsc_3, position, [{gscFile: gsc_3, referenceState: GscFileReferenceState.LocalFile, referenceWorkspace: gsc_3.workspaceFolder!}], "scripts\\file3");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.3/scripts/file3.gsc");

            var position = new vscode.Position(10, 22); // main()
            await tests.checkHoverFunction(gsc_3, position, "main", [], "GscFileReferences.3/scripts/file3.gsc", "");
            await tests.checkDefinitionLocation(gsc_3, position, "GscFileReferences.3/scripts/file3.gsc");


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            // Write text into document
            const document = await vscode.window.showTextDocument(gsc_3.uri);
            await document.edit(editBuilder => {
                editBuilder.insert(new vscode.Position(14, 4), "level.");
            });
            await tests.waitForDiagnosticsChange(gsc_3.uri);

            var gsc_2 = await tests.loadGscFile(['GscFileReferences.3', 'scripts', 'file3.gsc']);

            const completions = await GscCompletionItemProvider.getCompletionItems(gsc_3, new vscode.Position(14, 10), gsc_2.config.currentGame, undefined);

            tests.checkCompletions(gsc_3, completions, 0, "file3", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc_3, completions, 1, "file2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            tests.checkCompletions(gsc_3, completions, 2, "file1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer], undefined);
            assert.ok(completions.length === 3);



            // Check references of "main" function
            const refLocs = await GscReferenceProvider.getFunctionReferenceLocations(gsc_3, new vscode.Position(0, 2));
            tests.checkReferenceLocation(refLocs, 0, gsc_3.uri, 0, 0, 4);
            tests.checkReferenceLocation(refLocs, 1, tests.filePathToUri("GscFileReferences.3/scripts/file3.gsc"), 10, 19, 23);
            tests.checkReferenceLocation(refLocs, 2, tests.filePathToUri("GscFileReferences.2/scripts/file2.gsc"), 10, 19, 23);
            tests.checkReferenceLocation(refLocs, 3, gsc_1.uri, 10, 19, 23);
            assert.strictEqual(refLocs.length, 4);

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
