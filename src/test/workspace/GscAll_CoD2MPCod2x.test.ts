import assert from 'assert';
import * as tests from '../Tests.test';
import { CodFunctions } from '../../CodFunctions';
import { GscGame } from '../../GscConfig';


/*
These tests depend on pre-created files in ./src/test/workspace/GscAll.CoD2MPCod2x
These files are copied into temp folder (configured in .vscode-test.mjs).

The CoD2 MP + CoD2x variant inherits all stock CoD2 MP functions and adds
22 CoD2x-specific functions (player methods + level functions).
*/

suite('GscAll.CoD2MPCod2x', () => {

    setup(async () => {
        await tests.activateExtension();
    });


    test('GscAll.CoD2MPCod2x.inheritsStockCoD2MP', () => {
        // The variant must include both stock CoD2 MP functions and CoD2x additions.
        const stock = CodFunctions.getDefinitions(GscGame.CoD2MP).length;
        const cod2x = CodFunctions.getDefinitions(GscGame.CoD2MPCod2x).length;
        assert.ok(cod2x > stock, `CoD2x variant (${cod2x}) should include strictly more functions than stock CoD2 MP (${stock})`);
    });


    test('GscAll.CoD2MPCod2x.cod2xFunctions', async () => {
        // Exercises every CoD2x function with the correct callOn shape and the
        // minimum required argument count.
        const gsc = await tests.loadGscFile(['GscAll.CoD2MPCod2x', 'cod2xFunctions.gsc']);
        assert.strictEqual(gsc.diagnostics.length, 0, "Expected zero diagnostics, got: " +
            gsc.diagnostics.map(d => d.message).join(" | "));
    });


    test('GscAll.CoD2MPCod2x.stockInherited', async () => {
        // Stock CoD2 MP functions must remain resolvable under the CoD2x variant.
        const gsc = await tests.loadGscFile(['GscAll.CoD2MPCod2x', 'stockInherited.gsc']);
        assert.strictEqual(gsc.diagnostics.length, 0, "Expected zero diagnostics, got: " +
            gsc.diagnostics.map(d => d.message).join(" | "));
    });

});
