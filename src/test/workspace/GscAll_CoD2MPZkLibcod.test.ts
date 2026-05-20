import * as vscode from 'vscode';
import assert from 'assert';
import * as tests from '../Tests.test';
import { CodFunctions } from '../../CodFunctions';
import { GscGame } from '../../GscConfig';


/*
These tests depend on pre-created files in ./src/test/workspace/GscAll.CoD2MPZkLibcod
These files are copied into temp folder (configured in .vscode-test.mjs).

The CoD2 MP + zk_libcod variant inherits all stock CoD2 MP functions and adds
libcod-specific ones. For libcod-modified stock functions (bulletTrace,
obituary, playFxForPlayer, etc.), the libcod signature wins via the
exact-match-first lookup in CodFunctions.getByName.
*/

suite('GscAll.CoD2MPZkLibcod', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    test('GscAll.CoD2MPZkLibcod.inheritsStockCoD2MP', () => {
        // The variant must include both stock CoD2 MP functions and libcod additions.
        const stock = CodFunctions.getDefinitions(GscGame.CoD2MP).length;
        const libcod = CodFunctions.getDefinitions(GscGame.CoD2MPZkLibcod).length;
        assert.ok(libcod > stock, `libcod variant (${libcod}) should include strictly more functions than stock CoD2 MP (${stock})`);
    });


    test('GscAll.CoD2MPZkLibcod.libcodFunctions', async () => {
        // Exercises every libcod function with the correct callOn shape and the
        // minimum required argument count. If any libcod entry regresses (wrong
        // callOn flag, wrong required-arg count, renamed), this fails and the
        // diagnostic message names the culprit.
        const gsc = await tests.loadGscFile(['GscAll.CoD2MPZkLibcod', 'libcodFunctions.gsc']);
        assert.strictEqual(gsc.diagnostics.length, 0, "Expected zero diagnostics, got: " +
            gsc.diagnostics.map(d => d.message).join(" | "));
    });


    test('GscAll.CoD2MPZkLibcod.stockInherited', async () => {
        // Stock CoD2 MP functions must remain resolvable under the libcod variant.
        const gsc = await tests.loadGscFile(['GscAll.CoD2MPZkLibcod', 'stockInherited.gsc']);
        assert.strictEqual(gsc.diagnostics.length, 0, "Expected zero diagnostics, got: " +
            gsc.diagnostics.map(d => d.message).join(" | "));
    });


    test('GscAll.CoD2MPZkLibcod.bulletTraceOverride', async () => {
        // bulletTrace has stock signature (4 args max) and a libcod signature
        // (5 args max, extra content mask). Under the libcod variant the
        // exact-match-first lookup must pick the libcod entry — so a 5-arg
        // call should NOT produce "expect max 4 parameters" errors.
        const gsc = await tests.loadGscFile(['GscAll.CoD2MPZkLibcod', 'bulletTraceOverride.gsc']);
        assert.strictEqual(gsc.diagnostics.length, 0, "Expected zero diagnostics, got: " +
            gsc.diagnostics.map(d => d.message).join(" | "));
    });


    test('GscAll.CoD2MPZkLibcod.callOnValidation', async () => {
        // Verifies callOn validation works on libcod functions. Catches the
        // class of bug where a libcod method (e.g. earthquakeForPlayer) was
        // generated with no callOn — making it silently accept being called
        // without an object, or (when fixed) correctly require one.
        const gsc = await tests.loadGscFile(['GscAll.CoD2MPZkLibcod', 'callOnValidation.gsc']);

        tests.checkDiagnostic(gsc.diagnostics, 0, "Function 'earthquakeForPlayer' must be called on object (callon object is missing)", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Function 'setClipmask' must be called on object (callon object is missing)", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 2, "Function 'getSystemTime' can not be called on object (does not support callon object)", vscode.DiagnosticSeverity.Error);
        assert.strictEqual(gsc.diagnostics.length, 3);
    });});
