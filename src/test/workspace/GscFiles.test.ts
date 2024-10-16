import * as vscode from 'vscode';
import * as tests from '../Tests.test';
import assert from 'assert';
import { GscFiles } from '../../GscFiles';
import { LoggerOutput } from '../../LoggerOutput';


suite('GscFiles', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    test('file rename', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File rename - start");

            const gsc = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 1);

            // Check cached files
            const cachedFiles = GscFiles.getCachedFiles([gsc.workspaceFolder!.uri]);
            cachedFiles.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles.length, 2);



            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1.gsc' to 'file1_renamed.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(gsc.uri, vscode.Uri.file(gsc.uri.fsPath.replace("file1.gsc", "file1_renamed.gsc")));
            
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
            assert.strictEqual(cachedFiles2.length, 2);





            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1_renamed.gsc' to 'file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(vscode.Uri.file(gsc.uri.fsPath.replace("file1.gsc", "file1_renamed.gsc")), gsc.uri);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");

            // Load renamed file
            const gsc3 = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc3.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc3.diagnostics.length, 1);

            // Check cached files
            const cachedFiles3 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles3.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles3, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles3, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles3.length, 2);


            LoggerOutput.log("[Tests][GscFiles] File rename - done");

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file rename .old', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File rename - start");

            const gsc = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 1);

            // Check cached files
            const cachedFiles = GscFiles.getCachedFiles([gsc.workspaceFolder!.uri]);
            cachedFiles.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles.length, 2);



            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1.gsc' to 'file1.gsc.old'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(gsc.uri, vscode.Uri.file(gsc.uri.fsPath.replace("file1.gsc", "file1.gsc.old")));
            
            // Wait till it is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file2.gsc'), "(1)");

            // Check error
            const diagnostics = vscode.languages.getDiagnostics(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'));
            assert.strictEqual(diagnostics.length, 0);

            // Check cached files
            const cachedFiles2 = GscFiles.getCachedFiles([tests.filePathToUri('GscFiles')]);
            cachedFiles2.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles2, 0, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles2.length, 1);





            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'file1.gsc.old' to 'file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(vscode.Uri.file(gsc.uri.fsPath.replace("file1.gsc", "file1.gsc.old")), gsc.uri);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");

            // Load renamed file
            const gsc3 = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc3.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc3.diagnostics.length, 1);

            // Check cached files
            const cachedFiles3 = GscFiles.getCachedFiles([gsc3.workspaceFolder!.uri]);
            cachedFiles3.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles3, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles3, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles3.length, 2);


            LoggerOutput.log("[Tests][GscFiles] File rename - done");

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file create', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File create - start");

            // Check cached files
            const cachedFiles = GscFiles.getCachedFiles([tests.filePathToUri('GscFiles')]);
            cachedFiles.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles.length, 2);



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
            assert.strictEqual(cachedFiles2.length, 3);



            LoggerOutput.log("[Tests][GscFiles] Delete file - 'file3.gsc'");

            // Delete the new file
            void vscode.workspace.fs.delete(tests.filePathToUri('GscFiles', 'scripts', 'file3.gsc'));

            // Wait till deleted is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file2.gsc'), "(2)");

            // Check error
            const diagnostics = vscode.languages.getDiagnostics(tests.filePathToUri('GscFiles', 'scripts', 'file3.gsc'));
            assert.strictEqual(diagnostics.length, 0);

            // Check cached files
            const cachedFiles3 = GscFiles.getCachedFiles([gsc2.workspaceFolder!.uri]);
            cachedFiles3.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles3, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles3, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles3.length, 2);


            LoggerOutput.log("[Tests][GscFiles] File create - done");

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });






    test('file move', async () => {
        try {
            LoggerOutput.log("[Tests][GscFiles] File move - start");

            const gsc = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc.diagnostics.length, 1);

            // Check cached files
            const cachedFiles = GscFiles.getCachedFiles([gsc.workspaceFolder!.uri]);
            cachedFiles.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles.length, 2);



            LoggerOutput.log("[Tests][GscFiles] File move - move file from 'scripts/file1.gsc' to 'scripts2/file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(gsc.uri, tests.filePathToUri('GscFiles', 'scripts2', 'file1.gsc'));
            
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
            assert.strictEqual(cachedFiles2.length, 2);





            LoggerOutput.log("[Tests][GscFiles] File rename - renaming file from 'scripts2/file1.gsc' to 'scripts/file1.gsc'");

            // Rename file in workspace
            void vscode.workspace.fs.rename(tests.filePathToUri('GscFiles', 'scripts2', 'file1.gsc'), gsc.uri);
            
            // Wait till new file is processed
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscFiles', 'scripts', 'file1.gsc'), "(2)");

            // Load renamed file
            const gsc3 = await tests.loadGscFile(['GscFiles', 'scripts', 'file1.gsc']);
        
            // Check error
            tests.checkDiagnostic(gsc3.diagnostics, 0, "Unexpected token error1", vscode.DiagnosticSeverity.Error);
            assert.strictEqual(gsc3.diagnostics.length, 1);

            // Check cached files
            const cachedFiles3 = GscFiles.getCachedFiles([gsc3.workspaceFolder!.uri]);
            cachedFiles3.sort((a, b) => a.uri.fsPath.localeCompare(b.uri.fsPath)); // since file order is not guaranteed, sort them by path
            tests.checkCachedFile(cachedFiles3, 0, ['GscFiles', 'scripts', 'file1.gsc']);
            tests.checkCachedFile(cachedFiles3, 1, ['GscFiles', 'scripts', 'file2.gsc']);
            assert.strictEqual(cachedFiles3.length, 2);


            LoggerOutput.log("[Tests][GscFiles] File rename - done");

        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });

});
