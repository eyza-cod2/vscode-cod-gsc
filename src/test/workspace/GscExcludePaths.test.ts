import * as vscode from 'vscode';
import * as tests from '../Tests.test';
import assert from 'assert';
import { GscFiles } from '../../GscFiles';
import { GscWorkspaceFileData } from '../../GscFileCache';
import { LoggerOutput } from '../../LoggerOutput';
import { Issues } from '../../Issues';
import { GscConfig } from '../../GscConfig';


suite('GscExcludePaths', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    // ---------------------------------------------------------------
    // Unit tests for isFileExcluded (pure logic, no VS Code APIs)
    // ---------------------------------------------------------------

    test('isFileExcluded - matches glob patterns', () => {
        const patterns = ['**/excluded_folder/**', '**/animtrees/**'];

        // Should be excluded
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('excluded_folder/should_be_excluded.gsc', patterns), true);
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('GscExcludePaths/excluded_folder/should_be_excluded.gsc', patterns), true);
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('animtrees/tree1.gsc', patterns), true);
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('GscExcludePaths/animtrees/tree1.gsc', patterns), true);

        // Should NOT be excluded
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('scripts/included.gsc', patterns), false);
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('GscExcludePaths/scripts/included.gsc', patterns), false);
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('scripts/also_included.gsc', patterns), false);
    });

    test('isFileExcluded - empty patterns excludes nothing', () => {
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('anything/file.gsc', []), false);
    });

    test('isFileExcluded - case insensitive', () => {
        const patterns = ['**/Excluded_Folder/**'];
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('excluded_folder/file.gsc', patterns), true);
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('EXCLUDED_FOLDER/file.gsc', patterns), true);
    });

    test('isFileExcluded - backslash normalization', () => {
        const patterns = ['**/excluded_folder/**'];
        // Backslashes in path should be normalized to forward slashes before matching
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('GscExcludePaths\\excluded_folder\\file.gsc', patterns), true);
    });

    test('isFileExcluded - malformed pattern does not throw', () => {
        const patterns = ['[invalid-glob'];
        // Should not throw, just return false
        assert.strictEqual(GscWorkspaceFileData.isFileExcluded('some/file.gsc', patterns), false);
    });


    // ---------------------------------------------------------------
    // Integration tests - verify excluded files are not in the cache
    // ---------------------------------------------------------------

    test('excluded files are not cached on startup', async () => {
        try {
            LoggerOutput.log("[Tests][GscExcludePaths] excluded files not cached - start");

            const workspaceUri = tests.filePathToUri('GscExcludePaths');

            // Get all cached files for the GscExcludePaths workspace
            const cachedFiles = GscFiles.getCachedFiles([workspaceUri]);
            const cachedPaths = cachedFiles.map(f => vscode.workspace.asRelativePath(f.uri));

            LoggerOutput.log("[Tests][GscExcludePaths] cached files: " + cachedPaths.join(', '));

            // Included files should be in cache
            assert.ok(
                cachedPaths.some(p => p.includes('scripts/included.gsc')),
                "scripts/included.gsc should be cached. Cached: " + cachedPaths.join(', ')
            );
            assert.ok(
                cachedPaths.some(p => p.includes('scripts/also_included.gsc')),
                "scripts/also_included.gsc should be cached. Cached: " + cachedPaths.join(', ')
            );

            // Excluded files should NOT be in cache
            assert.ok(
                !cachedPaths.some(p => p.includes('excluded_folder/should_be_excluded.gsc')),
                "excluded_folder/should_be_excluded.gsc should NOT be cached. Cached: " + cachedPaths.join(', ')
            );
            assert.ok(
                !cachedPaths.some(p => p.includes('animtrees/tree1.gsc')),
                "animtrees/tree1.gsc should NOT be cached. Cached: " + cachedPaths.join(', ')
            );

            // Exactly 2 files should be cached
            assert.strictEqual(cachedFiles.length, 2, "Expected 2 cached files, got " + cachedFiles.length + ": " + cachedPaths.join(', '));

            LoggerOutput.log("[Tests][GscExcludePaths] excluded files not cached - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    test('creating file in excluded folder does not cache it', async () => {
        try {
            LoggerOutput.log("[Tests][GscExcludePaths] create in excluded folder - start");

            const workspaceUri = tests.filePathToUri('GscExcludePaths');

            // Baseline: should have 2 cached files
            const cachedBefore = GscFiles.getCachedFiles([workspaceUri]);
            assert.strictEqual(cachedBefore.length, 2, "Baseline: expected 2 cached files");

            // Create a new file in the excluded folder
            const newFileUri = tests.filePathToUri('GscExcludePaths', 'excluded_folder', 'new_excluded.gsc');
            await vscode.workspace.fs.writeFile(newFileUri, new TextEncoder().encode("newExcludedFunc() { err }"));

            // Wait for the file system event to propagate
            await tests.waitForFileSystemChange("create", newFileUri);

            // Small delay to let any debounced processing finish
            await tests.sleep(500);

            // Cache should still have only 2 files
            const cachedAfter = GscFiles.getCachedFiles([workspaceUri]);
            const cachedPathsAfter = cachedAfter.map(f => vscode.workspace.asRelativePath(f.uri));

            assert.ok(
                !cachedPathsAfter.some(p => p.includes('new_excluded.gsc')),
                "new_excluded.gsc should NOT be cached. Cached: " + cachedPathsAfter.join(', ')
            );
            assert.strictEqual(cachedAfter.length, 2, "Expected 2 cached files after creating excluded file, got " + cachedAfter.length + ": " + cachedPathsAfter.join(', '));

            // Cleanup
            await vscode.workspace.fs.delete(newFileUri);
            await tests.waitForFileSystemChange("delete", newFileUri);

            LoggerOutput.log("[Tests][GscExcludePaths] create in excluded folder - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    test('creating file in included folder does cache it', async () => {
        try {
            LoggerOutput.log("[Tests][GscExcludePaths] create in included folder - start");

            const workspaceUri = tests.filePathToUri('GscExcludePaths');

            // Baseline
            const cachedBefore = GscFiles.getCachedFiles([workspaceUri]);
            assert.strictEqual(cachedBefore.length, 2, "Baseline: expected 2 cached files");

            // Create a new file in a non-excluded folder
            const newFileUri = tests.filePathToUri('GscExcludePaths', 'scripts', 'new_included.gsc');
            void vscode.workspace.fs.writeFile(newFileUri, new TextEncoder().encode("newIncludedFunc() { err_new }"));

            // Wait for diagnostics which means the file was parsed and cached
            await tests.waitForDiagnosticsChange(newFileUri, "create included file");

            // Cache should now have 3 files
            const cachedAfter = GscFiles.getCachedFiles([workspaceUri]);
            const cachedPathsAfter = cachedAfter.map(f => vscode.workspace.asRelativePath(f.uri));

            assert.ok(
                cachedPathsAfter.some(p => p.includes('scripts/new_included.gsc')),
                "scripts/new_included.gsc should be cached. Cached: " + cachedPathsAfter.join(', ')
            );
            assert.strictEqual(cachedAfter.length, 3, "Expected 3 cached files after creating included file, got " + cachedAfter.length + ": " + cachedPathsAfter.join(', '));

            // Cleanup: delete the new file
            void vscode.workspace.fs.delete(newFileUri);
            await tests.waitForDiagnosticsChange(tests.filePathToUri('GscExcludePaths', 'scripts', 'included.gsc'), "delete included file");

            // Should be back to 2
            const cachedFinal = GscFiles.getCachedFiles([workspaceUri]);
            assert.strictEqual(cachedFinal.length, 2, "Expected 2 cached files after cleanup, got " + cachedFinal.length);

            LoggerOutput.log("[Tests][GscExcludePaths] create in included folder - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });


    test('getFileData returns empty data for excluded file', async () => {
        try {
            LoggerOutput.log("[Tests][GscExcludePaths] getFileData excluded - start");

            // Try to load an excluded file directly via getFileData
            const excludedUri = tests.filePathToUri('GscExcludePaths', 'excluded_folder', 'should_be_excluded.gsc');
            const gscFile = await GscFiles.getFileData(excludedUri, true, "test excluded file");

            // The file should return with empty parse data (no functions)
            assert.strictEqual(gscFile.data.functions.length, 0,
                "Excluded file should have 0 functions but has " + gscFile.data.functions.length);

            // And it should NOT be in the cache
            const workspaceUri = tests.filePathToUri('GscExcludePaths');
            const cachedFiles = GscFiles.getCachedFiles([workspaceUri]);
            const cachedPaths = cachedFiles.map(f => vscode.workspace.asRelativePath(f.uri));
            assert.ok(
                !cachedPaths.some(p => p.includes('should_be_excluded.gsc')),
                "should_be_excluded.gsc should NOT be in cache. Cached: " + cachedPaths.join(', ')
            );

            LoggerOutput.log("[Tests][GscExcludePaths] getFileData excluded - done");

            Issues.checkForNewError();
        } catch (error) {
            tests.printDebugInfoForError(error);
        }
    });
});
