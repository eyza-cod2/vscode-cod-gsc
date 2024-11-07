import * as vscode from 'vscode';
import assert from 'assert';
import * as tests from '../Tests.test';
import { GscRenameProvider } from '../../GscRenameProvider';
import { Issues } from '../../Issues';


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscRename', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    test('GscRename 1', async () => {
        try {
            const uri_3_rename = tests.filePathToUri('GscRename.3', 'root', 'scripts', 'rename.gsc');
            const uri_3_file_all = tests.filePathToUri('GscRename.3', 'root', 'scripts', 'file_all.gsc');
            const uri_2_file2 = tests.filePathToUri('GscRename.2', 'scripts', 'file2.gsc');
            const uri_1_file1 = tests.filePathToUri('GscRename.1', 'scripts', 'file1.gsc');


            const gsc = await tests.loadGscFile(['GscRename.3', 'root', 'scripts', 'rename.gsc']);

            assert.equal(gsc.diagnostics.length, 0);

            // scripts\file_all::func_to_be_renamed();
            const editLocations = await GscRenameProvider.getRenameEdits(gsc, new vscode.Position(1, 30));
            
            editLocations.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkReferenceLocation(editLocations, 0, uri_1_file1, 1, 22, 40);
            tests.checkReferenceLocation(editLocations, 1, uri_2_file2, 1, 22, 40);
            tests.checkReferenceLocation(editLocations, 2, uri_3_file_all, 0, 0, 18);
            tests.checkReferenceLocation(editLocations, 3, uri_3_file_all, 5, 4, 22);
            tests.checkReferenceLocation(editLocations, 4, uri_3_file_all, 7, 13, 31);
            tests.checkReferenceLocation(editLocations, 5, uri_3_file_all, 9, 11, 29);
            tests.checkReferenceLocation(editLocations, 6, uri_3_file_all, 10, 16, 34);
            tests.checkReferenceLocation(editLocations, 7, uri_3_file_all, 11, 9, 27);
            tests.checkReferenceLocation(editLocations, 8, uri_3_rename, 1, 22, 40);
            tests.checkReferenceLocation(editLocations, 9, uri_3_rename, 6, 22, 40);
            tests.checkReferenceLocation(editLocations, 10, uri_3_rename, 8, 29, 47);
            tests.checkReferenceLocation(editLocations, 11, uri_3_rename, 10, 29, 47);
            tests.checkReferenceLocation(editLocations, 12, uri_3_rename, 11, 34, 52);
            tests.checkReferenceLocation(editLocations, 13, uri_3_rename, 12, 27, 45);



            // Waiters for diagnostics change
            var waitEdits1 = tests.waitForDiagnosticsChange(uri_3_rename, "waiting for " + uri_3_rename + " diagnostics change");
            var waitEdits2 = tests.waitForDiagnosticsChange(uri_3_file_all, "waiting for " + uri_3_file_all + " diagnostics change");
            var waitEdits3 = tests.waitForDiagnosticsChange(uri_2_file2, "waiting for " + uri_2_file2 + " diagnostics change");
            var waitEdits4 = tests.waitForDiagnosticsChange(uri_1_file1, "waiting for " + uri_1_file1 + " diagnostics change");

            // Rename to: func_renamed
            var edit = new vscode.WorkspaceEdit();
            for (const location of editLocations) {
                edit.replace(location.uri, location.range, "func_renamed2");
            }
            await vscode.workspace.applyEdit(edit);


            // Wait for diagnostics change
            await Promise.all([waitEdits1, waitEdits2, waitEdits3, waitEdits4]);

            // Check diagnostics
            var diag1 = await waitEdits1;
            var diag2 = await waitEdits2;
            var diag3 = await waitEdits3;
            var diag4 = await waitEdits4;

            assert.equal(diag1.length, 0);
            assert.equal(diag2.length, 0);
            assert.equal(diag3.length, 0);
            assert.equal(diag4.length, 0);






            // Now rename directly on function definition

            const gsc2 = await tests.loadGscFile(['GscRename.3', 'root', 'scripts', 'file_all.gsc']);

            // scripts\file_all::func_to_be_renamed();
            const editLocations2 = await GscRenameProvider.getRenameEdits(gsc2, new vscode.Position(0, 0));

            editLocations2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkReferenceLocation(editLocations2, 0, uri_1_file1, 1, 22, 35);
            tests.checkReferenceLocation(editLocations2, 1, uri_2_file2, 1, 22, 35);
            tests.checkReferenceLocation(editLocations2, 2, uri_3_file_all, 0, 0, 13);
            tests.checkReferenceLocation(editLocations2, 3, uri_3_file_all, 5, 4, 17);
            tests.checkReferenceLocation(editLocations2, 4, uri_3_file_all, 7, 13, 26);
            tests.checkReferenceLocation(editLocations2, 5, uri_3_file_all, 9, 11, 24);
            tests.checkReferenceLocation(editLocations2, 6, uri_3_file_all, 10, 16, 29);
            tests.checkReferenceLocation(editLocations2, 7, uri_3_file_all, 11, 9, 22);
            tests.checkReferenceLocation(editLocations2, 8, uri_3_rename, 1, 22, 35);
            tests.checkReferenceLocation(editLocations2, 9, uri_3_rename, 6, 22, 35);
            tests.checkReferenceLocation(editLocations2, 10, uri_3_rename, 8, 29, 42);
            tests.checkReferenceLocation(editLocations2, 11, uri_3_rename, 10, 29, 42);
            tests.checkReferenceLocation(editLocations2, 12, uri_3_rename, 11, 34, 47);
            tests.checkReferenceLocation(editLocations2, 13, uri_3_rename, 12, 27, 40);


            // Waiters for diagnostics change
            var waitEdits1 = tests.waitForDiagnosticsChange(uri_3_rename, "waiting for " + uri_3_rename + " diagnostics change");
            var waitEdits2 = tests.waitForDiagnosticsChange(uri_3_file_all, "waiting for " + uri_3_file_all + " diagnostics change");
            var waitEdits3 = tests.waitForDiagnosticsChange(uri_2_file2, "waiting for " + uri_2_file2 + " diagnostics change");
            var waitEdits4 = tests.waitForDiagnosticsChange(uri_1_file1, "waiting for " + uri_1_file1 + " diagnostics change");

            // Rename to: func_renamed
            var edit = new vscode.WorkspaceEdit();
            for (const location of editLocations2) {
                edit.replace(location.uri, location.range, "func_renamed3");
            }
            await vscode.workspace.applyEdit(edit);


            // Wait for diagnostics change
            await Promise.all([waitEdits1, waitEdits2, waitEdits3, waitEdits4]);

            // Check diagnostics
            var diag1 = await waitEdits1;
            var diag2 = await waitEdits2;
            var diag3 = await waitEdits3;
            var diag4 = await waitEdits4;

            assert.equal(diag1.length, 0);
            assert.equal(diag2.length, 0);
            assert.equal(diag3.length, 0);
            assert.equal(diag4.length, 0);


            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });
});