import * as vscode from 'vscode';
import assert from 'assert';
import { before } from 'mocha';
import * as tests from '../Tests.test';





suite('GscQuickFix', () => {

    before(async () => {
        await tests.activateExtension();
    });


    test('func references', async () => {
        const [gsc, diagnostics, fileUri] = await tests.loadGscFile(['GscQuickFix', 'includedFolders.gsc']);
        
        // There should be no error
        assert.ok(diagnostics.length === 0);

        // file1::func1();
        const pos1 = new vscode.Position(2, 14);
        await tests.checkHoverExternalFunc(fileUri, gsc, pos1, "func1", [], "GscQuickFix.1/file1.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(fileUri, gsc, pos1, "GscQuickFix.1/file1.gsc");

        // file2::func2();
        const pos2 = new vscode.Position(5, 14);
        await tests.checkHoverExternalFunc(fileUri, gsc, pos2, "func2", [], "GscQuickFix.2/subfolder/file2.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(fileUri, gsc, pos2, "GscQuickFix.2/subfolder/file2.gsc");

        // file3::func3();
        const pos3 = new vscode.Position(8, 14);
        await tests.checkHoverExternalFunc(fileUri, gsc, pos3, "func3", [], "GscQuickFix.3/file3.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(fileUri, gsc, pos3, "GscQuickFix.3/file3.gsc");
        
        // fileReplaced::funcReplaced();
        const pos4 = new vscode.Position(11, 22);
        await tests.checkHoverExternalFunc(fileUri, gsc, pos4, "funcReplaced", [], "GscQuickFix.3/fileReplaced.gsc", "Included via workspace folder settings");
        await tests.checkDefinitionFunc(fileUri, gsc, pos4, "GscQuickFix.3/fileReplaced.gsc");
    });


    test('command "add workspace folder" + "game root" + "ignore folder" + "ignore errors"', async () => {
        const [gsc, diagnostics, fileUri] = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(diagnostics, 0, "File 'quickFix\\quickFixFile1.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(diagnostics, 1, "File 'quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(diagnostics, 2, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics.length === 3);

        const fixes1 = await tests.getQuickFixesForDiagnostic(diagnostics, 0, fileUri);
        tests.checkQuickFix(fixes1, 0, "Add workspace folder \"GscQuickFix.4\" for file references (workspace settings)");
        tests.checkQuickFix(fixes1, 1, "Choose folder for file references...");
        tests.checkQuickFix(fixes1, 2, "Ignore file \"quickFix\\quickFixFile1\" (workspace settings)");
        tests.checkQuickFix(fixes1, 3, "Ignore folder \"quickFix\" (workspace settings)");
        tests.checkQuickFix(fixes1, 4, "Ignore all missing files (workspace settings)");
        tests.checkQuickFix(fixes1, 5, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.ok(fixes1.length === 6);

        const fixes2 = await tests.getQuickFixesForDiagnostic(diagnostics, 1, fileUri);
        tests.checkQuickFix(fixes2, 0, 'Add workspace folder "GscQuickFix.4" for file references and change game root folder to "quickfix" (workspace settings)');
        tests.checkQuickFix(fixes2, 1, 'Add workspace folder "GscQuickFix.4" for file references and change game root folder to "subfolder/quickfix" (workspace settings)');
        tests.checkQuickFix(fixes2, 2, "Choose folder for file references...");
        tests.checkQuickFix(fixes2, 3, 'Ignore file "quickFixFile2" (workspace settings)');
        tests.checkQuickFix(fixes2, 4, 'Ignore all missing files (workspace settings)');
        tests.checkQuickFix(fixes2, 5, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.ok(fixes2.length === 6);

        const fixes3 = await tests.getQuickFixesForDiagnostic(diagnostics, 2, fileUri);
        tests.checkQuickFix(fixes3, 0, 'Add workspace folder "GscQuickFix.4" for file references (workspace settings)');
        tests.checkQuickFix(fixes3, 1, 'Add workspace folder "GscQuickFix.4" for file references and change game root folder to "subfolder" (workspace settings)');
        tests.checkQuickFix(fixes2, 2, "Choose folder for file references...");
        tests.checkQuickFix(fixes3, 3, 'Ignore file "quickFix\\quickFixFile2" (workspace settings)');
        tests.checkQuickFix(fixes3, 4, 'Ignore folder "quickFix" (workspace settings)');
        tests.checkQuickFix(fixes3, 5, 'Ignore all missing files (workspace settings)');
        tests.checkQuickFix(fixes3, 6, 'Disable all error diagnostics for workspace folder "GscQuickFix" (workspace settings)');
        assert.ok(fixes3.length === 7);


        ////////////////////////

        // Execute: Add workspace folder \"GscQuickFix.4\" for file references (workspace settings)
        await vscode.commands.executeCommand(fixes1[0].command!.command, ...fixes1[0].command?.arguments || []);
        await tests.sleep(100);
        ////////////////////////

        const [gsc2, diagnostics2, fileUri2] = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(diagnostics2, 0, "File 'quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics2.length === 1);




        ////////////////////////

        // Execute: Add workspace folder "GscQuickFix.4" for file references and change game root folder to "subfolder/quickfix" (workspace settings)
        await vscode.commands.executeCommand(fixes2[1].command!.command, ...fixes2[1].command?.arguments || []);
        await tests.sleep(100);
        ////////////////////////

        const [gsc3, diagnostics3, fileUri3] = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(diagnostics3, 0, "File 'quickFix\\quickFixFile1.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(diagnostics3, 1, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics3.length === 2);




        ////////////////////////

        // Execute: "Ignore file \"quickFix\\quickFixFile1\" (workspace settings)"
        await vscode.commands.executeCommand(fixes1[2].command!.command, ...fixes1[2].command?.arguments || []);
        await tests.sleep(100);
        ////////////////////////

        const [gsc4, diagnostics4, fileUri4] = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc']);
        
        tests.checkDiagnostic(diagnostics4, 0, "File 'quickFix\\quickFixFile2.gsc' was not found in workspace folder 'GscQuickFix'", vscode.DiagnosticSeverity.Error);
        assert.ok(diagnostics4.length === 1);
        



        ////////////////////////

        // Execute: Disable error diagnostics for workspace folder "GscQuickFix" (workspace settings)
        await vscode.commands.executeCommand(fixes3[6].command!.command, ...fixes3[6].command?.arguments || []);
        await tests.sleep(100);
        ////////////////////////

        const [gsc5, diagnostics5, fileUri5] = await tests.loadGscFile(['GscQuickFix', 'includedFoldersCommand.gsc'], false);
        
        assert.ok(diagnostics5.length === 0);



        //await tests.sleep(100000);
    });
});
