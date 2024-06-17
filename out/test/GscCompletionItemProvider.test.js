"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const GscFileParser_1 = require("../GscFileParser");
const GscCompletionItemProvider_1 = require("../GscCompletionItemProvider");
function checkItem(gscData, items, index, labelName, kind, types) {
    function message(message, current, expected) {
        var debugText = gscData.content + "\n\n";
        debugText += printCompletionItems(items);
        return message + ". Current: '" + current + "'. Expected: '" + expected + "'. At: " + index + ")\n\n" + debugText + "\n\n";
    }
    var item = items.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));
    const label = item.label;
    assert.ok(label.label === labelName, message("Unexpected label name", label.label, labelName));
    assert.ok(item.kind === kind, message("Unexpected kind", (item.kind === undefined ? "undefined" : vscode.CompletionItemKind[item.kind]), vscode.CompletionItemKind[kind]));
    const description = GscCompletionItemProvider_1.GscCompletionItemProvider.getItemDescriptionFromTypes(types);
    assert.ok(label.description === description, message("Unexpected description", label.description ?? "undefined", description));
}
function printCompletionItems(items) {
    var debugText = "";
    items.forEach((item, index) => {
        debugText += "index: " + index + "   " +
            "label: " + item.label.label + "    " +
            "kind: " + (item.kind === undefined ? "undefined" : vscode.CompletionItemKind[item.kind]) + "    " +
            "desc: " + item.label.description +
            "\n";
    });
    return debugText;
}
suite('CompletionItemProvider.getCompletionItemsFromGsc #3.1', () => {
    test(`#3.1.1 one local variable`, async () => {
        const gsc = `
            func() {
                aaa = 1;

            }
        `;
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(3, 0), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });
    test(`#3.1.2 two local variable`, async () => {
        const gsc = `
            func() {
                aaa = 1;
                bbb = 2;

            }
        `;
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(4, 0), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "bbb", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(4, 5), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(4, 0), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(6, 0), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(6, 5), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa_struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(6, 16), true);
        checkItem(gscData, items, 0, "field1", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 16), true);
        checkItem(gscData, items, 0, "field1", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "field2", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 17), true);
        checkItem(gscData, items, 0, "aa_field1", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 15), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "aaa_struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 4, "aaa_struct1.field1", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 5, "aaa_struct1.field2", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(3, 0), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        assert.ok(items.length === 4, "Unexpected length of items.\n\n" + printCompletionItems(items));
    });
    test(`#3.4.2 one local array variable`, async () => {
        const gsc = `
            func() {
                struct1[0] = 1;
                struct2[0] = 1;

            }
        `;
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(4, 0), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(4, 5), true);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct2", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(4, 11), true);
        checkItem(gscData, items, 3, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 4, "struct1[0]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 5, "struct1[1]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 12), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 6, "1", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 12), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Array]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 14), true);
        checkItem(gscData, items, 0, "[0]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "[1]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 15), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "struct1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 6, "1", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(5, 15), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(11, 13), true);
        checkItem(gscData, items, 0, "field2", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 1, "field2[0]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 2, "field2[1]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 3, "field2[2]", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(11, 24), true);
        checkItem(gscData, items, 0, "level", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 1, "game", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Array]);
        checkItem(gscData, items, 2, "self", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Unknown]);
        checkItem(gscData, items, 3, "other", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 4, "s1", vscode.CompletionItemKind.Variable, [GscFileParser_1.GscVariableDefinitionType.Structure]);
        checkItem(gscData, items, 5, "0", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 6, "1", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 7, "2", vscode.CompletionItemKind.Value, [GscFileParser_1.GscVariableDefinitionType.Array]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(11, 30), true);
        checkItem(gscData, items, 0, "field1", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "field2", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Array]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(11, 26), true);
        checkItem(gscData, items, 0, ".aaa", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, ".bbb", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        const items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(11, 27), true);
        checkItem(gscData, items, 0, "aaa", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        checkItem(gscData, items, 1, "bbb", vscode.CompletionItemKind.Field, [GscFileParser_1.GscVariableDefinitionType.Integer]);
        assert.ok(items.length === 2, "Unexpected length of items.\n\n" + printCompletionItems(items));
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
        const gscData = GscFileParser_1.GscFileParser.parse(gsc);
        // First char
        var items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(0, 0), true);
        assert.ok(items.length === 0, "Unexpected length of items 1.\n\n" + printCompletionItems(items));
        // In params
        var items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(1, 5), true);
        assert.ok(items.length === 0, "Unexpected length of items 2.\n\n" + printCompletionItems(items));
        // Before {
        var items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(1, 7), true);
        assert.ok(items.length === 0, "Unexpected length of items 3.\n\n" + printCompletionItems(items));
        // After {
        var items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(1, 8), true);
        assert.ok(items.length !== 0, "Unexpected length of items 4.\n\n" + printCompletionItems(items));
        // Before }
        var items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(10, 0), true);
        assert.ok(items.length !== 0, "Unexpected length of items 4.\n\n" + printCompletionItems(items));
        // After }
        var items = await GscCompletionItemProvider_1.GscCompletionItemProvider.getCompletionItems(gscData, new vscode.Position(10, 1), true);
        assert.ok(items.length === 0, "Unexpected length of items 4.\n\n" + printCompletionItems(items));
    });
});
//# sourceMappingURL=GscCompletionItemProvider.test.js.map