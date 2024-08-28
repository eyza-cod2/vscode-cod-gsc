import * as vscode from 'vscode';
import assert from 'assert';
import { before } from 'mocha';
import * as tests from '../Tests.test';
import { CompletionConfig, GscCompletionItemProvider } from '../../GscCompletionItemProvider';
import { GscGame } from '../../GscConfig';




const cfgFunctionsOnly: CompletionConfig = {
    variableItems: false,
    pathItems: false,
    keywordItems: false,
    functionItems: true,
    functionPredefinedItems: false,
};


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/


suite('GscCompletionItemProvider', () => {

    before(async () => {
        await tests.activateExtension();
    });

    test(`Local functions`, async () => {
        const [gsc, diagnostics, fileUri] = await tests.loadGscFile(['GscCompletionItemProvider', 'main.gsc']);
        
        // There should be no error - everything is case insensitive
        assert.ok(diagnostics.length === 0);

        const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(1, 0), GscGame.UniversalGame, cfgFunctionsOnly, fileUri);
        const doc = tests.getFunctionDescription;

        tests.checkCompletions(gsc, completions, 0, "main", vscode.CompletionItemKind.Function, [], doc("main", [], true, ""));
        tests.checkCompletions(gsc, completions, 1, "localFunc1", vscode.CompletionItemKind.Function, [], doc("localFunc1", [], true, ""));
        tests.checkCompletions(gsc, completions, 2, "localFunc2", vscode.CompletionItemKind.Function, [], doc("localFunc2", [{name: "p1"}], true, ""));
        tests.checkCompletions(gsc, completions, 3, "localFunc3", vscode.CompletionItemKind.Function, [], doc("localFunc3", [{name: "p1"}, {name: "p2"}], true, ""));
        tests.checkCompletions(gsc, completions, 4, "localFunc4", vscode.CompletionItemKind.Function, [], doc("localFunc4", [], true, ""));
        assert.ok(completions.length === 5, "Unexpected length of items.\n\n");
    });

    test(`Included functions`, async () => {
        const [gsc, diagnostics, fileUri] = await tests.loadGscFile(['GscCompletionItemProvider', 'include.gsc']);
        
        // There should be no error - everything is case insensitive
        assert.ok(diagnostics.length === 0);

        const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(3, 0), GscGame.UniversalGame, cfgFunctionsOnly, fileUri);
        const doc = tests.getFunctionDescription;

        tests.checkCompletions(gsc, completions, 0, "main", vscode.CompletionItemKind.Function, [], doc("main", [], true, ""));
        tests.checkCompletions(gsc, completions, 1, "funcLocal", vscode.CompletionItemKind.Function, [], doc("funcLocal", [], true, ""));
        tests.checkCompletions(gsc, completions, 2, "funcIncluded1", vscode.CompletionItemKind.Function, [], doc("funcIncluded1", [], false, "GscCompletionItemProvider/scripts/global.gsc", "Included via '#include'"));
        tests.checkCompletions(gsc, completions, 3, "funcIncluded2", vscode.CompletionItemKind.Function, [], doc("funcIncluded2", [], false, "GscCompletionItemProvider/scripts/global.gsc", "Included via '#include'"));
        assert.ok(completions.length === 4, "Unexpected length of items.\n\n");
    });

});