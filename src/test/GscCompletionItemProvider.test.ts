import * as assert from 'assert';
import * as vscode from 'vscode';
import { GscFileParser, GscVariableDefinitionType, GscData } from '../GscFileParser';
import { CompletionConfig, GscCompletionItemProvider } from '../GscCompletionItemProvider';
import { GscGame } from '../GscConfig';
import { GscFile } from '../GscFile';

function checkItem(gscData: GscData, items: vscode.CompletionItem[], index: number, labelName: string, kind: vscode.CompletionItemKind, types: GscVariableDefinitionType[]) {

    function message(message: string, current: string, expected: string) {
        var debugText = gscData.content + "\n\n";
        debugText += printCompletionItems(items); 
        return message + ". Current: '" + current + "'. Expected: '" + expected + "'. At: " + index + ")\n\n" + debugText + "\n\n";
    }

    var item = items.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));
    
    const label = (item.label as vscode.CompletionItemLabel);
    assert.ok(label.label === labelName, message("Unexpected label name", label.label, labelName));
    assert.ok(item.kind === kind, message("Unexpected kind", (item.kind === undefined ? "undefined" : vscode.CompletionItemKind[item.kind]), vscode.CompletionItemKind[kind]));
   
    const description = GscCompletionItemProvider.getItemDescriptionFromTypes(types);
    assert.ok(label.description === description, message("Unexpected description", label.description ?? "undefined", description));
}


function printCompletionItems(items: vscode.CompletionItem[]) {
    var debugText = "";
    items.forEach((item, index) => {
        debugText += "index: " + index + "   " + 
        "label: " + (item.label as vscode.CompletionItemLabel).label + "    " +
        "kind: " + (item.kind === undefined ? "undefined" : vscode.CompletionItemKind[item.kind]) + "    " +
        "desc: " + (item.label as vscode.CompletionItemLabel).description + 
        "\n";
    });
    return debugText;
}

const cfgVariablesOnly: CompletionConfig = {
    variableItems: true,
    pathItems: false,
    keywordItems: false,
    functionItems: false,
    functionPredefinedItems: false,
};


suite('CompletionItemProvider.getCompletionItemsFromGsc #3.1', () => {

    test(`#3.1.1 one local variable`, async () => {
        const gsc = `
            func() {
                aaa = 1;

            }
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(3, 0), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.1.2 two local variable`, async () => {
        const gsc = `
            func() {
                aaa = 1;
                bbb = 2;

            }
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 0), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "bbb", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 5, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.1.3 one local variable, suggestion complete`, async () => {
        const gsc = `
func() {
    aaa = 1;
    bbb = 2;
    a
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 5), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });
});











suite('CompletionItemProvider.getCompletionItemsFromGsc #3.2 local structure', () => {

    test(`#3.2.1 one local structure variable`, async () => {

        const gsc = `
            func() {
                struct1 = spawnstruct();
                struct1.field1 = 1;

            }
        `;
        const gscData = GscFileParser.parse(gsc);

        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 0), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });

    test(`#3.2.2 two local structure variable`, async () => {

        const gsc = `
            func() {
                struct1 = spawnstruct();
                struct2 = spawnstruct();
                struct1.field1 = 1;
                struct2.field1 = 2;

            }
        `;
        const gscData = GscFileParser.parse(gsc);

        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(6, 0), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        assert.ok(items.length === 5, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.2.3 local structure variable, suggestion complete`, async () => {
        const gsc = `
func() {
    aaa_struct1 = spawnstruct();
    bbb_struct2 = spawnstruct();
    aaa_struct1.field1 = 1;
    bbb_struct2.field1 = 2;
    a
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(6, 5), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa_struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.2.4 local structure variable, suggestion complete`, async () => {
        const gsc = `
func() {
    aaa_struct1 = spawnstruct();
    bbb_struct2 = spawnstruct();
    aaa_struct1.field1 = 1;
    bbb_struct2.field1 = 2;
    aaa_struct1.
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(6, 16), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "field1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 1, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.2.5 local structure variable, suggestion complete`, async () => {
        const gsc = `
func() {
    aaa_struct1 = spawnstruct();
    aaa_struct1.field1 = 1;
    aaa_struct1.field2 = 2;
    aaa_struct1.
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 16), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "field1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "field2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 2, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.2.6 local structure variable, suggestion complete`, async () => {
        const gsc = `
func() {
    aaa_struct1 = spawnstruct();
    aaa_struct1.aa_field1 = 1;
    aaa_struct1.bb_field2 = 2;
    aaa_struct1.a
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 17), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "aa_field1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
    });

    test(`#3.2.7 local structure variable, suggestion complete`, async () => {
        const gsc = `
func() {
    aaa_struct1 = spawnstruct();
    aaa_struct1.field1 = 1;
    aaa_struct1.field2 = 2;
    aaa_struct1
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 15), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa_struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 4, "aaa_struct1.field1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 5, "aaa_struct1.field2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 6, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });
});






    




suite('CompletionItemProvider.getCompletionItemsFromGsc #3.4 local array', () => {

    test(`#3.4.1 one local array variable`, async () => {
        const gsc = `
            func() {
                struct1[0] = 1;

            }
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(3, 0), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.2 one local array variable`, async () => {
        const gsc = `
            func() {
                struct1[0] = 1;
                struct2[0] = 1;

            }
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 0), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 5, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.3 one local array variable`, async () => {
        const gsc = `
func() {
    struct1[0] = 1;
    struct2[0] = 1;
    s
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 5), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 5, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.4 one local array variable`, async () => {
        const gsc = `
func() {
    struct1[0] = 1;
    struct1[1] = 2;
    struct1
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 11), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct1[0]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 5, "struct1[1]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 6, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.5 one local array variable`, async () => {
        const gsc = `
func() {
    other = 1;
    struct1[0] = 1;
    struct1[1] = 2;
    struct1[
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 12), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 6, "1", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 7, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.6`, async () => {
        const gsc = `
func() {
    other = 1;
    struct1[0][0] = 1;
    struct1[0][1] = 2;
    struct1[
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 12), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 6, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.7`, async () => {
        const gsc = `
func() {
    other = 1;
    struct1[0][0] = 1;
    struct1[0][1] = 2;
    struct1[0]
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 14), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "[0]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "[1]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 2, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.8`, async () => {
        const gsc = `
func() {
    other = 1;
    struct1[0][0] = 1;
    struct1[0][1] = 2;
    struct1[0][
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 15), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 6, "1", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 7, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.4.9`, async () => {
        const gsc = `
func() {
    other = 1;
    struct1[0][0] = 1;
    struct1[0][1] = 2;
    struct1[oth
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(5, 15), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        //checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


});


suite('CompletionItemProvider.getCompletionItemsFromGsc #3.5 local array', () => {

    test(`#3.5.1 combined local`, async () => {
        const gsc = `
func() {
    other = 1;
    s1 = spawnstruct();
    s1.field1 = 1;
    s1.field2 = [];
    s1.field2[0] = 2;
    s1.field2[1] = 3;
    s1.field2[2][0] = "1";
    s1.field2[2][1] = "2";

    s1.field2
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(11, 13), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "field2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 1, "field2[0]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 2, "field2[1]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 3, "field2[2]", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.5.2 combined local`, async () => {
        const gsc = `
func() {
    other = 1;
    s1 = spawnstruct();
    s1.field1 = 1;
    s1.field2 = [];
    s1.field2[0] = 2;
    s1.field2[1] = 3;
    s1.field2[2][0] = "1";
    s1.field2[2][1] = "2";

    s1.field2[s1.field2[
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(11, 24), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "s1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 6, "1", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 7, "2", vscode.CompletionItemKind.Value, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 8, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.5.3 combined local`, async () => {
        const gsc = `
func() {
    other = 1;
    s1 = spawnstruct();
    s1.field1 = 1;
    s1.field2 = [];
    s1.field2[0] = 2;
    s1.field2[1] = 3;
    s1.field2[2][0] = "1";
    s1.field2[2][1] = "2";

    s1.field2[s1.field2[s1.fie]]
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(11, 30), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "field1", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "field2", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 2, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.5.4 combined local`, async () => {
        const gsc = `
func() {
    other = 1;
    s1 = spawnstruct();
    s1.field1 = 1;
    s1.field2 = [];
    s1.field2[0] = 2;
    s1.field2[1] = 3;
    s1.field2[2].aaa = 1;
    s1.field2[2].bbb = 2;

    s1.field2[s1.field2[2]]
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(11, 26), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, ".aaa", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, ".bbb", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 2, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });


    test(`#3.5.5 combined local`, async () => {
        const gsc = `
func() {
    other = 1;
    s1 = spawnstruct();
    s1.field1 = 1;
    s1.field2 = [];
    s1.field2[0] = 2;
    s1.field2[1] = 3;
    s1.field2[2].aaa = 1;
    s1.field2[2].bbb = 2;

    s1.field2[s1.field2[2].]
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(11, 27), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 0, "aaa", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "bbb", vscode.CompletionItemKind.Field, [GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 2, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });



    test(`#3.5.6 after wait keyword`, async () => {
        const gsc = `
func() {
    struct1[0] = 1;
    struct2[0] = 1;
    wait s
}
        `;
        const gscData = GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(4, 10), GscGame.UniversalGame, cfgVariablesOnly);

        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscVariableDefinitionType.Array]);
        assert.ok(items.length === 5, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });
});




suite('CompletionItemProvider.getCompletionItemsFromGsc #3.6 other', () => {

    test(`#3.6.1 in scope`, async () => {
        const gsc = `
func() {
    other = 1;
    s1 = spawnstruct();
    s1.field1 = 1;
    s1.field2 = [];
    s1.field2[0] = 2;
    s1.field2[1] = 3;
    s1.field2[2][0] = "1";
    s1.field2[2][1] = "2";
}
        `;
        const gscData = GscFileParser.parse(gsc);

        // First char
        var items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(0, 0), GscGame.UniversalGame, cfgVariablesOnly);
        assert.ok(items.length === 0, "Unexpected length of items 1.\n\n" + printCompletionItems(items));

        // In params
        var items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(1, 5), GscGame.UniversalGame, cfgVariablesOnly);
        assert.ok(items.length === 0, "Unexpected length of items 2.\n\n" + printCompletionItems(items));

        // Before {
        var items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(1, 7), GscGame.UniversalGame, cfgVariablesOnly);
        assert.ok(items.length === 0, "Unexpected length of items 3.\n\n" + printCompletionItems(items));

        // After {
        var items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(1, 8), GscGame.UniversalGame, cfgVariablesOnly);
        assert.ok(items.length !== 0, "Unexpected length of items 4.\n\n" + printCompletionItems(items));

        // Before }
        var items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(10, 0), GscGame.UniversalGame, cfgVariablesOnly);
        assert.ok(items.length !== 0, "Unexpected length of items 4.\n\n" + printCompletionItems(items));

        // After }
        var items = await GscCompletionItemProvider.getCompletionItems(new GscFile(gscData), new vscode.Position(10, 1), GscGame.UniversalGame, cfgVariablesOnly);
        assert.ok(items.length === 0, "Unexpected length of items 4.\n\n" + printCompletionItems(items));
    });


});