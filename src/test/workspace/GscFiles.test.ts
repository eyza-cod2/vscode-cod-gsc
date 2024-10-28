import * as vscode from 'vscode';
import * as tests from '../Tests.test';
import assert from 'assert';
import { GscFiles } from '../../GscFiles';
import { LoggerOutput } from '../../LoggerOutput';
import { Issues } from '../../Issues';


suite('GscFiles', () => {

    setup(async () => {
        await tests.activateExtension();
    });

    async function checkInitialState() {
        const gsc = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
        // Check error
        tests.checkDiagnostic(gsc.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(gsc.diagnostics.length, 1);

        // Check cached files
        const cachedFiles = GscFiles.getCachedFiles([gsc.workspaceFolder!.uri]);
        cachedFiles.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
        tests.checkCachedFile(cachedFiles, 0, ['GscFiles', 'scripts', 'file1.gsc']);
        tests.checkCachedFile(cachedFiles, 1, ['GscFiles', 'scripts', 'file2.gsc']);
        tests.checkCachedFile(cachedFiles, 2, ['GscFiles', 'scripts3', 'file3.gsc']);
        tests.checkCachedFile(cachedFiles, 3, ['GscFiles', 'scripts3', 'subscripts3', 'subfile3.gsc']);
        assert.strictEqual(cachedFiles.length, 4);
    }


    test('file rename', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File rename - start");

            await checkInitialState();



            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1.gsc' to 'file1_renamed.gsc'");

            const file1 = tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc');

            // Rename file in workspace
            void vscode.workspace.fs.rename(file1, vscode.Uri.file(file1.fsPath.replace("file1.gsc", "file1_renamed.gsc")));
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1_renamed.gsc'), "(1)");

            // Load renamed file
            const gsc2 = await tests.loadGscFile(['GscFiles', 'scripts', 'file1_renamed.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc2.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc2.diagnostics.length, 1);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file1_renamed.gsc']);
            tests.checkCachedFile(cachedFiles2, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            tests.checkCachedFile(cachedFiles2, 2, ['GscFiles', 'scripts3', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 3, ['GscFiles', 'scripts3', 'subscripts3', 'subfile3.gsc']);
            assert.strictEqual(cachedFiles2.length, 4);



            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1_renamed.gsc' to 'file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(vscode.Uri.file(file1.fsPath.replace("file1.gsc", "file1_renamed.gsc")), file1);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");

            
            
            
            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] File rename - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file rename .old', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File rename - start");

            await checkInitialState();



            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1.gsc' to 'file1.gsc.old'");

            const file1 = tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc');

            // Rename file in workspace
            void vscode.workspace.fs.rename(file1, vscode.Uri.file(file1.fsPath.replace("file1.gsc", "file1.gsc.old")));
            
            // Wait till it is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file2.gsc'), "(1)");

            // Check error
            const diagnostics = vscode.languages.getDiagnostics(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'));
            assert.strictEqual(diagnostics.length, 0);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([tests.filePathToUri('GscFiles')]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file2.gsc']);
            tests.checkCachedFile(cachedFiles2, 1, ['GscFiles', 'scripts3', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 2, ['GscFiles', 'scripts3', 'subscripts3', 'subfile3.gsc']);
            assert.strictEqual(cachedFiles2.length, 3);





            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1.gsc.old' to 'file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(vscode.Uri.file(file1.fsPath.replace("file1.gsc", "file1.gsc.old")), file1);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");




            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] File rename - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file create', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File create - start");

            await checkInitialState();



            LoggerOutput.log("[Tests][GscFiles] File create - 'file3.gsc'");

            // Create file in workspace
            void vscode.workspace.fs.writeFile(tests.filePathToUri('GscFiles', 'scripts', 'file3.gsc'), new TextEncoder().encode("main() { error3 }"));
     
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file3.gsc'), "(1)");

            // Load renamed file
            const gsc2 = await tests.loadGscFile(['GscFiles', 'scripts', 'file3.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc2.diagnostics, 0, "Unexpected token error3", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc2.diagnostics.length, 1);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles2, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            tests.checkCachedFile(cachedFiles2, 2, ['GscFiles', 'scripts', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 3, ['GscFiles', 'scripts3', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 4, ['GscFiles', 'scripts3', 'subscripts3', 'subfile3.gsc']);
            assert.strictEqual(cachedFiles2.length, 5);



            LoggerOutput.log("[Tests][GscFiles] Delete file - 'file3.gsc'");

            // Delete the new file
            void vscode.workspace.fs.delete(tests.filePathToUri('GscFiles', 'scripts', 'file3.gsc'));

            // Wait till deleted is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file2.gsc'), "(2)");

            // Check error
            const diagnostics = vscode.languages.getDiagnostics(tests.filePathToUri('GscFiles', 'scripts', 'file3.gsc'));
            assert.strictEqual(diagnostics.length, 0);

            
            
            
            
            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] File create - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file move', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File move - start");

            await checkInitialState();



            LoggerOutput.log("[Tests][GscFiles] File move - move file from 'scripts/file1.gsc' to 'scripts2/file1.gsc'");

            const file1 = tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc');

            // Rename file in workspace
            void vscode.workspace.fs.rename(file1, tests.filePathToUri('GscFiles', 'scripts2', 'file1.gsc'));
            
            // Wait till it is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts2', 'file1.gsc'), "(1)");

            // Load renamed file
            const gsc2 = await tests.loadGscFile(['GscFiles', 'scripts2', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc2.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc2.diagnostics.length, 1);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file2.gsc']);
            tests.checkCachedFile(cachedFiles2, 1, ['GscFiles', 'scripts2', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles2, 2, ['GscFiles', 'scripts3', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 3, ['GscFiles', 'scripts3', 'subscripts3', 'subfile3.gsc']);
            assert.strictEqual(cachedFiles2.length, 4);





            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'scripts2/file1.gsc' to 'scripts/file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(tests.filePathToUri('GscFiles', 'scripts2', 'file1.gsc'), file1);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");

            
            
            
            
            
            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] File rename - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('folder rename', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] Folder rename - start");

            await checkInitialState();



            LoggerOutput.log("[Tests][GscFiles] Folder rename - renaming folder 'scripts3' to 'scripts3_new'");

            const scriptsUri = tests.filePathToUri('GscFiles', 'scripts3');
            const scriptsNewUri = tests.filePathToUri('GscFiles', 'scripts3_new');

            // Rename file in workspace
            void vscode.workspace.fs.rename(scriptsUri, scriptsNewUri);
            
            // Wait till it is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts3_new', 'file3.gsc'), "(1)");

            // Load renamed file
            const gsc2 = await tests.loadGscFile(['GscFiles', 'scripts3_new', 'file3.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc2.diagnostics, 0, "Unexpected token error3", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc2.diagnostics.length, 1);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles2, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            tests.checkCachedFile(cachedFiles2, 2, ['GscFiles', 'scripts3_new', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 3, ['GscFiles', 'scripts3_new', 'subscripts3', 'subfile3.gsc']);
            assert.strictEqual(cachedFiles2.length, 4);





            LoggerOutput.log("[Tests][GscFiles] Folder rename - back");

            // Rename file in workspace
            void vscode.workspace.fs.rename(scriptsNewUri, scriptsUri);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts3', 'file3.gsc'), "(2)");

            
            
            
            
            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] Folder rename - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });





    test('non-gsc file', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] Non-GSC - start");

            await checkInitialState();



            // Promise till diagnostics change
            var updated = false;
            void tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(1)").then(() => {
                updated = true;
            });;


            // Create file in workspace
            LoggerOutput.log("[Tests][GscFiles] Non-GSC - create 'file3.txt'");
            void vscode.workspace.fs.writeFile(tests.filePathToUri('GscFiles', 'scripts', 'file3.txt'), new TextEncoder().encode("main() { error3 }"));
            await tests.waitForFileSystemChange("create", tests.filePathToUri('GscFiles', 'scripts', 'file3.txt'));

            // Rename
            LoggerOutput.log("[Tests][GscFiles] Non-GSC - rename 'file3.txt' to 'file3_new.txt'");
            void vscode.workspace.fs.rename(tests.filePathToUri('GscFiles', 'scripts', 'file3.txt'), tests.filePathToUri('GscFiles', 'scripts', 'file3_new.txt'));
            //await tests.waitForFileSystemChange("delete", tests.filePathToUri('GscFiles', 'scripts', 'file3.txt'));
            await tests.waitForFileSystemChange("create", tests.filePathToUri('GscFiles', 'scripts', 'file3_new.txt'));

            // Move
            LoggerOutput.log("[Tests][GscFiles] Non-GSC - move 'scripts/file3_new.txt' to 'scripts3/file3_new.txt'");
            void vscode.workspace.fs.rename(tests.filePathToUri('GscFiles', 'scripts', 'file3_new.txt'), tests.filePathToUri('GscFiles', 'scripts3', 'file3_new.txt'));
            //await tests.waitForFileSystemChange("delete", tests.filePathToUri('GscFiles', 'scripts', 'file3_new.txt'));
            await tests.waitForFileSystemChange("create", tests.filePathToUri('GscFiles', 'scripts3', 'file3_new.txt'));

            // Delete
            LoggerOutput.log("[Tests][GscFiles] Non-GSC - delete 'scripts3/file3_new.txt'");
            void vscode.workspace.fs.delete(tests.filePathToUri('GscFiles', 'scripts3', 'file3_new.txt'));
            await tests.waitForFileSystemChange("delete", tests.filePathToUri('GscFiles', 'scripts3', 'file3_new.txt'));


            // Wait for potential diagnostics change
            await new Promise(resolve => setTimeout(resolve, 500));

            // Text files should nto trigger diagnostics
            assert.strictEqual(updated, false, "Text files should not trigger diagnostics update");



            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] File create - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file update', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File update - start");

            await checkInitialState();



            LoggerOutput.log("[Tests][GscFiles] File update - update 'file1.gsc'");

            const file1 = tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc');

            const contentOriginal = await vscode.workspace.fs.readFile(file1);

            // Change
            void vscode.workspace.fs.writeFile(file1, new TextEncoder().encode("//main() { }"));
            
            const promiseFileChange = tests.waitForFileSystemChange("change", file1);
            const promiseDiagUpdate = tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(1)");
            await Promise.all([promiseFileChange, promiseDiagUpdate]);

            // Load renamed file
            const gsc2 = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            assert.strictEqual(gsc2.diagnostics.length, 0);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles2, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            tests.checkCachedFile(cachedFiles2, 2, ['GscFiles', 'scripts3', 'file3.gsc']);
            tests.checkCachedFile(cachedFiles2, 3, ['GscFiles', 'scripts3', 'subscripts3', 'subfile3.gsc']);
            assert.strictEqual(cachedFiles2.length, 4);



            LoggerOutput.log("[Tests][GscFiles] File update - back");

            // Rename file in workspace
            void vscode.workspace.fs.writeFile(file1, contentOriginal);
            await tests.waitForFileSystemChange("change", file1);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");

            
            
            
            await checkInitialState();


            LoggerOutput.log("[Tests][GscFiles] File update - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });
});
