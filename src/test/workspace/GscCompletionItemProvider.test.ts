import * as vscode from 'vscode';
import assert from 'assert';
import * as tests from '../Tests.test';
import { CompletionConfig, GscCompletionItemProvider } from '../../GscCompletionItemProvider';
import { GscGame } from '../../GscConfig';
import { GscVariableDefinitionType } from '../../GscFileParser';




const cfgFunctionsOnly: CompletionConfig = {
    variableItems: false,
    pathItems: false,
    keywordItems: false,
    functionItems: true,
    functionPredefinedItems: false,
};

const cfgVariablesOnly: CompletionConfig = {
    variableItems: true,
    pathItems: false,
    keywordItems: false,
    functionItems: false,
    functionPredefinedItems: false,
};


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/


suite('GscCompletionItemProvider', () => {

    setup(async () => {
        await tests.activateExtension();
    });

    // Check if local functions appears in completion list
    test(`Local functions`, async () => {
        const gsc = await tests.loadGscFile(['GscCompletionItemProvider', 'localFunctions.gsc']);
        
        // There should be no error - everything is case insensitive
        assert.ok(gsc.diagnostics.length === 0);

        const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(1, 0), GscGame.UniversalGame, cfgFunctionsOnly);
        const doc = tests.getFunctionDescription;

        tests.checkCompletions(gsc, completions, 0, "main", vscode.CompletionItemKind.Function, [], doc("main", [], true, ""));
        tests.checkCompletions(gsc, completions, 1, "localFunc1", vscode.CompletionItemKind.Function, [], doc("localFunc1", [], true, ""));
        tests.checkCompletions(gsc, completions, 2, "localFunc2", vscode.CompletionItemKind.Function, [], doc("localFunc2", [{name: "p1"}], true, ""));
        tests.checkCompletions(gsc, completions, 3, "localFunc3", vscode.CompletionItemKind.Function, [], doc("localFunc3", [{name: "p1"}, {name: "p2"}], true, ""));
        tests.checkCompletions(gsc, completions, 4, "localFunc4", vscode.CompletionItemKind.Function, [], doc("localFunc4", [], true, ""));
        assert.ok(completions.length === 5, "Unexpected length of items.\n\n");
    });


    // Check if included functions appears in completion list
    test(`Included functions`, async () => {
        const gsc = await tests.loadGscFile(['GscCompletionItemProvider', 'include.gsc']);
        
        // There should be no error - everything is case insensitive
        assert.ok(gsc.diagnostics.length === 0);

        const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(3, 0), GscGame.UniversalGame, cfgFunctionsOnly);
        const doc = tests.getFunctionDescription;

        tests.checkCompletions(gsc, completions, 0, "main", vscode.CompletionItemKind.Function, [], doc("main", [], true, ""));
        tests.checkCompletions(gsc, completions, 1, "funcLocal", vscode.CompletionItemKind.Function, [], doc("funcLocal", [], true, ""));
        tests.checkCompletions(gsc, completions, 2, "funcIncluded1", vscode.CompletionItemKind.Function, [], doc("funcIncluded1", [], false, "GscCompletionItemProvider/scripts/global.gsc", "Included via '#include'"));
        tests.checkCompletions(gsc, completions, 3, "funcIncluded2", vscode.CompletionItemKind.Function, [], doc("funcIncluded2", [], false, "GscCompletionItemProvider/scripts/global.gsc", "Included via '#include'"));
        assert.ok(completions.length === 4, "Unexpected length of items.\n\n");
    });


    // Check if included functions appears in completion list
    test(`Included functions from included workspace folder`, async () => {
        const gsc = await tests.loadGscFile(['GscCompletionItemProvider', 'includeWorkspaceFolder.gsc']);
        
        // There should be no error - everything is case insensitive
        assert.ok(gsc.diagnostics.length === 0);

        const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(3, 0), GscGame.UniversalGame, cfgFunctionsOnly);
        const doc = tests.getFunctionDescription;

        tests.checkCompletions(gsc, completions, 0, "main", vscode.CompletionItemKind.Function, [], doc("main", [], true, ""));
        tests.checkCompletions(gsc, completions, 1, "funcLocal", vscode.CompletionItemKind.Function, [], doc("funcLocal", [], true, ""));
        tests.checkCompletions(gsc, completions, 2, "funcIncluded1_includedFolder", vscode.CompletionItemKind.Function, [], doc("funcIncluded1_includedFolder", [], false, "GscCompletionItemProvider.IncludedFolder/scripts/global2.gsc", "Included via '#include'"));
        tests.checkCompletions(gsc, completions, 3, "funcIncluded2_includedFolder", vscode.CompletionItemKind.Function, [], doc("funcIncluded2_includedFolder", [], false, "GscCompletionItemProvider.IncludedFolder/scripts/global2.gsc", "Included via '#include'"));
        assert.ok(completions.length === 4, "Unexpected length of items.\n\n");
    });



    // Check if level. variable appears in completion list
    test(`Variables level.`, async () => {
        const gsc = await tests.loadGscFile(['GscCompletionItemProvider', 'variablesLevel.gsc']);
        
        // 
        tests.checkDiagnostic(gsc.diagnostics, 0, "Unexpected token level", vscode.DiagnosticSeverity.Error);
        tests.checkDiagnostic(gsc.diagnostics, 1, "Unexpected token", vscode.DiagnosticSeverity.Error);
        assert.ok(gsc.diagnostics.length === 2);

        const completions = await GscCompletionItemProvider.getCompletionItems(gsc, new vscode.Position(3, 10), GscGame.UniversalGame, cfgVariablesOnly, gsc.uri);

        tests.checkCompletions(gsc, completions, 0, "aaa_included", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        tests.checkCompletions(gsc, completions, 1, "bbb_included", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        tests.checkCompletions(gsc, completions, 2, "aaa", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        tests.checkCompletions(gsc, completions, 3, "bbb", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        assert.ok(completions.length === 4, "Unexpected length of items.\n\n");
    });
});