import * as vscode from 'vscode';
import assert from 'assert';
import * as tests from '../Tests.test';
import { GscDiagnosticsCollection } from '../../GscDiagnosticsCollection';
import { LoggerOutput } from '../../LoggerOutput';





suite('GscQuickFix', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    test('func references', async () => {
        const gsc = await tests.loadGscFile(['GscQuickFix', 'includedFolders.gsc']);
        
        // There should be no error
        assert.ok(gsc.diagnostics.length === 0);

        // file1::func1();
        const pos1 = new vscode.Position(2, 14);
        await tests.checkHoverExternalFunc(gsc, pos1, "func1", [], "GscQuickFix.1/file1.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(gsc, pos1, "GscQuickFix.1/file1.gsc");

        // file2::func2();
        const pos2 = new vscode.Position(5, 14);
        await tests.checkHoverExternalFunc(gsc, pos2, "func2", [], "GscQuickFix.2/subfolder/file2.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(gsc, pos2, "GscQuickFix.2/subfolder/file2.gsc");

        // file3::func3();
        const pos3 = new vscode.Position(8, 14);
        await tests.checkHoverExternalFunc(gsc, pos3, "func3", [], "GscQuickFix.3/file3.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(gsc, pos3, "GscQuickFix.3/file3.gsc");
        
        // fileReplaced::funcReplaced();
        const pos4 = new vscode.Position(11, 22);
        await tests.checkHoverExternalFunc(gsc, pos4, "funcReplaced", [], "GscQuickFix.3/fileReplaced.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(gsc, pos4, "GscQuickFix.3/fileReplaced.gsc");
        
        // dummy::main();
        const pos5 = new vscode.Position(14, 14);
        await tests.checkHoverExternalFunc(gsc, pos5, "main", [], "GscQuickFix/dummy.gsc", "");
        await tests.checkDefinitionFunc(gsc, pos5, "GscQuickFix/dummy.gsc");
    });


    test('command "add workspace folder" + "game root" + "ignore folder" + "ignore errors"', async () => {
        const gsc = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(gsc.diagnostics, 0, "File 'quickFix\\quickFixFile1.gsc' was not found in workspace folder 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "File 'quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(gsc.diagnostics.length, 3);

        const fixes1 = await tests.getQuickFixesForDiagnostic(gsc.diagnostics, 0, gsc.uri);
        tests.checkQuickFix(fixes1, 0, "Add workspace folder \"GscQuickFix.4\" for file references (workspace settings)");
        tests.checkQuickFix(fixes1, 1, "Choose folder for file references...");
        tests.checkQuickFix(fixes1, 2, "Ignore file \"quickFix\\quickFixFile1\" (workspace settings)");
        tests.checkQuickFix(fixes1, 3, "Ignore folder \"quickFix\" (workspace settings)");
        tests.checkQuickFix(fixes1, 4, "Ignore all missing files (workspace settings)");
        tests.checkQuickFix(fixes1, 5, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.strictEqual(fixes1.length, 6);

        const fixes2 = await tests.getQuickFixesForDiagnostic(gsc.diagnostics, 1, gsc.uri);
        tests.checkQuickFix(fixes2, 0, 'Add workspace folder "GscQuickFix.4" for file references and change game root folder to "quickfix" (workspace settings)');
        tests.checkQuickFix(fixes2, 1, 'Add workspace folder "GscQuickFix.4" for file references and change game root folder to "subfolder/quickfix" (workspace settings)');
        tests.checkQuickFix(fixes2, 2, "Choose folder for file references...");
        tests.checkQuickFix(fixes2, 3, 'Ignore file "quickFixFile2" (workspace settings)');
        tests.checkQuickFix(fixes2, 4, 'Ignore all missing files (workspace settings)');
        tests.checkQuickFix(fixes2, 5, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.strictEqual(fixes2.length, 6);

        const fixes3 = await tests.getQuickFixesForDiagnostic(gsc.diagnostics, 2, gsc.uri);
        tests.checkQuickFix(fixes3, 0, 'Add workspace folder "GscQuickFix.4" for file references (workspace settings)');
        tests.checkQuickFix(fixes3, 1, 'Add workspace folder "GscQuickFix.4" for file references and change game root folder to "subfolder" (workspace settings)');
        tests.checkQuickFix(fixes2, 2, "Choose folder for file references...");
        tests.checkQuickFix(fixes3, 3, 'Ignore file "quickFix\\quickFixFile2" (workspace settings)');
        tests.checkQuickFix(fixes3, 4, 'Ignore folder "quickFix" (workspace settings)');
        tests.checkQuickFix(fixes3, 5, 'Ignore all missing files (workspace settings)');
        tests.checkQuickFix(fixes3, 6, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.strictEqual(fixes3.length, 7);


        ////////////////////////

        // Execute: Add workspace folder \"GscQuickFix.4\" for file references (workspace settings)
        await vscode.commands.executeCommand(fixes1[0].command!.command, ...fixes1[0].command?.arguments || []);
        LoggerOutput.log("1. Executed command: " + fixes1[0].command?.command);
        await tests.sleep(100);
        ////////////////////////


        const gsc2 = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);

        
        tests.checkDiagnostic(gsc2.diagnostics, 0, "File 'quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix.4', 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(gsc2.diagnostics.length, 1);

        const fixes1_2 = await tests.getQuickFixesForDiagnostic(gsc2.diagnostics, 0, gsc2.uri);
        tests.checkQuickFix(fixes1_2, 0, 'Change game root folder to "quickfix" for workspace folder "GscQuickFix.4" (workspace settings)');
        tests.checkQuickFix(fixes1_2, 1, 'Change game root folder to "subfolder/quickfix" for workspace folder "GscQuickFix.4" (workspace settings)');
        tests.checkQuickFix(fixes1_2, 2, "Choose folder for file references...");
        tests.checkQuickFix(fixes1_2, 3, 'Ignore file "quickFixFile2" (workspace settings)');
        tests.checkQuickFix(fixes1_2, 4, 'Ignore all missing files (workspace settings)');
        tests.checkQuickFix(fixes1_2, 5, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.strictEqual(fixes1_2.length, 6);



        ////////////////////////

        // Execute: Add workspace folder "Change game root folder to "subfolder/quickfix" for workspace folder "GscQuickFix.4" (workspace settings)
        await vscode.commands.executeCommand(fixes1_2[1].command!.command, ...fixes1_2[1].command?.arguments || []);
        LoggerOutput.log("2. Executed command: " + fixes1_2[1].command?.command);
        await tests.sleep(100);
        ////////////////////////

        const gsc3 = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(gsc3.diagnostics, 0, "File 'quickFix\\quickFixFile1.gsc' was not found in workspace folder 'GscQuickFix.4/subfolder/quickfix', 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc3.diagnostics, 1, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix.4/subfolder/quickfix', 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(gsc3.diagnostics.length, 2);




        ////////////////////////

        // Execute: "Ignore file \"quickFix\\quickFixFile1\" (workspace settings)"
        await vscode.commands.executeCommand(fixes1[2].command!.command, ...fixes1[2].command?.arguments || []);
        LoggerOutput.log("3. Executed command: " + fixes1_2[2].command?.command);
        await tests.sleep(100);
        ////////////////////////

        const gsc4 = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(gsc4.diagnostics, 0, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix.4/subfolder/quickfix', 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(gsc4.diagnostics.length, 1);
        
        // Check also the real diagnostics array
        const realDiagnostics4 = GscDiagnosticsCollection.diagnosticCollection?.get(gsc4.uri);
        assert.ok(realDiagnostics4 !== undefined);
        tests.checkDiagnostic(realDiagnostics4, 0, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix.4/subfolder/quickfix', 'GscQuickFix.3', 'GscQuickFix.2/subfolder', 'GscQuickFix.1', 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(realDiagnostics4.length, 1);


        ////////////////////////

        // Execute: Disable error diagnostics for workspace folder "GscQuickFix" (workspace settings)
        await vscode.commands.executeCommand(fixes3[6].command!.command, ...fixes3[6].command?.arguments || []);
        LoggerOutput.log("4. Executed command: " + fixes3[6].command?.command);
        await tests.sleep(100);
        ////////////////////////

        const gsc5 = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        assert.strictEqual(gsc5.diagnostics.length, 0);


        const realDiagnostics = GscDiagnosticsCollection.diagnosticCollection?.get(gsc5.uri);
        assert.ok(realDiagnostics !== undefined);
        assert.strictEqual(realDiagnostics?.length, 0);


        //await tests.sleep(100000);
    });
});
