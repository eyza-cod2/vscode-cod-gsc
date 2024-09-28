import * as assert from 'assert';
import * as vscode from 'vscode';
import { GscFileParser, GscGroup, GroupType, GscVariableDefinitionType } from '../GscFileParser';


function checkGroup(rootGroup: GscGroup, group: GscGroup, groupType: GroupType, tokenStart: number, tokenEnd: number, itemsLen: number) {
     
    var debugTextFull = GscFileParser.debugAsString(rootGroup.tokensAll, rootGroup, true);
    //var debugText = GscFileParser.debugAsString(rootGroup.tokensAll, rootGroup, false, group);
    var expectedTests = GscFileParser.generateTestChecks(rootGroup.tokensAll, rootGroup);

    function message(message: string, current: string, expected: string) {
        return message + ". Current: '" + current + "'. Expected: '" + expected + "'. At: (" + tokenStart + " - " + tokenEnd + ")\n" 
            //+ debugText 
            + "\n\n" 
            + debugTextFull 
            + "\nExpected tests:\n" 
            + expectedTests;
    }

    assert.ok(group.items.length === itemsLen, message("Unexpected number of items in group", group.items.length.toString(), itemsLen.toString()));
    assert.ok(group.type === groupType, message("Unexpected group type", GroupType[group.type], GroupType[groupType]));
    assert.ok(group.tokenIndexStart === tokenStart, message("Unexpected token start index", group.tokenIndexStart.toString(), tokenStart.toString()));
    assert.ok(group.tokenIndexEnd === tokenEnd, message("Unexpected token end index", group.tokenIndexEnd.toString(), tokenEnd.toString()));

    assert.ok(group.parent?.items.indexOf(group) !== -1, message("Parent does not contain this group", "0", "1"));
}

function checkGroup2(rootGroup: GscGroup, group: GscGroup | undefined, groupType: GroupType, tokenStart: number, tokenEnd: number, solved: boolean, itemsLen: number, deadCode: boolean | undefined = undefined) {
     
    var debugTextFull = GscFileParser.debugAsString(rootGroup.tokensAll, rootGroup, true);
    //var debugText = GscFileParser.debugAsString(rootGroup.tokensAll, rootGroup, false, group);
    var expectedTests = GscFileParser.generateTestChecks(rootGroup.tokensAll, rootGroup);

    function message(message: string, current: string, expected: string) {
        //console.log(debugTextFull);
        return message + ". Current: '" + current + "'. Expected: '" + expected + "'. At: (" + tokenStart + " - " + tokenEnd + ")\n" 
            //+ debugText 
            + "\n\n" 
            + debugTextFull 
            + "\nExpected tests:\n" 
            + expectedTests
            ;
    }

    
    assert.ok(group !== undefined, message("Undefined group", "undefined", "GscGroup"));
    assert.ok(group.items.length === itemsLen, message("Unexpected number of items in group", group.items.length.toString(), itemsLen.toString()));
    assert.ok(group.type === groupType, message("Unexpected group type", GroupType[group.type], GroupType[groupType]));
    assert.ok(group.tokenIndexStart === tokenStart, message("Unexpected token start index", group.tokenIndexStart.toString(), tokenStart.toString()));
    assert.ok(group.tokenIndexEnd === tokenEnd, message("Unexpected token end index", group.tokenIndexEnd.toString(), tokenEnd.toString()));
    assert.ok(group.solved === solved, message("Unexpected solved status", group.solved.toString(), solved.toString()));
    
    assert.ok(group.parent?.items.indexOf(group) !== -1, message("Parent does not contain this group", "0", "1"));
    
    /*if (deadCode !== undefined) {
        assert.ok(group.deadCode === deadCode, message("Unexpected deadCode status", group.deadCode.toString(), deadCode.toString()));
    }*/
}





suite('GscFileParser.parse #2.1', () => {

    test(`#2.1.1 empty file`, async () => {
        const gsc = ``;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, -1, -1, 0);
    });

    test(`#2.1.2 comments`, async () => {
        const gsc = `
// single line
/* multi
line*/
///* combined*/
/*/ weird */
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, -1, -1, 0);
    });


});






suite('GscFileParser.parse #2.2 bracket pair', () => {


    test(`#2.2.1 scope`, async () => {
        const gsc = `{}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 1, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 1, 0);
    });

    test(`#2.2.2 scope2`, async () => {
        const gsc = `? {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 2, 2);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Scope, 1, 2, 0);
    });

    test(`#2.2.3 scope3`, async () => {
        const gsc = `? {} ? {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 5, 4);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Scope, 1, 2, 0);
        checkGroup(rootGroup, rootGroup.items[2], GroupType.Unknown, 3, 3, 0);
        checkGroup(rootGroup, rootGroup.items[3], GroupType.Scope, 4, 5, 0);
    });

    test(`#2.2.4 scope4`, async () => {
        const gsc = `{} ?`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 2, 2);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 1, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Unknown, 2, 2, 0);
    });

    test(`#2.2.5 scope6`, async () => {
        const gsc = `{}{}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 3, 2);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 1, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Scope, 2, 3, 0);
    });

    test(`#2.2.6 scope6`, async () => {
        const gsc = `?{}?{}?`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 6, 5);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Scope, 1, 2, 0);
        checkGroup(rootGroup, rootGroup.items[2], GroupType.Unknown, 3, 3, 0);
        checkGroup(rootGroup, rootGroup.items[3], GroupType.Scope, 4, 5, 0);
        checkGroup(rootGroup, rootGroup.items[4], GroupType.Unknown, 6, 6, 0);
    });

    test(`#2.2.7 scope error 1`, async () => {
        const gsc = `?{`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 1, 2);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Unknown, 1, 1, 0);
    });

    test(`#2.2.8 scope error 2`, async () => {
        const gsc = `?}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 1, 2);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Unknown, 1, 1, 0);
    });

    test(`#2.2.9 scope error 3`, async () => {
        const gsc = `? ? { ? ? { ? ? { ? ? } ? ?`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.Unknown, 1, 1, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.Scope, 2, 13, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Unknown, 3, 3, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Unknown, 4, 4, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2], GroupType.Scope, 5, 13, true, 5, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[0], GroupType.Unknown, 6, 6, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[1], GroupType.Unknown, 7, 7, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[2], GroupType.Scope, 8, 11, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[2].items[0], GroupType.Unknown, 9, 9, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[2].items[1], GroupType.Unknown, 10, 10, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[3], GroupType.Unknown, 12, 12, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[2].items[4], GroupType.Unknown, 13, 13, false, 0, false);
    });

    test(`#2.2.10 scope error 4`, async () => {
        const gsc = `? ? { ? ? } ? ? } ? ? } ? ?`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 11);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, false, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.Unknown, 1, 1, false, 0);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.Scope, 2, 5, false, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Unknown, 3, 3, false, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Unknown, 4, 4, false, 0);
        checkGroup2(rootGroup, rootGroup.items[3], GroupType.Unknown, 6, 6, false, 0);
        checkGroup2(rootGroup, rootGroup.items[4], GroupType.Unknown, 7, 7, false, 0);
        checkGroup2(rootGroup, rootGroup.items[5], GroupType.Unknown, 8, 8, false, 0);
        checkGroup2(rootGroup, rootGroup.items[6], GroupType.Unknown, 9, 9, false, 0);
        checkGroup2(rootGroup, rootGroup.items[7], GroupType.Unknown, 10, 10, false, 0);
        checkGroup2(rootGroup, rootGroup.items[8], GroupType.Unknown, 11, 11, false, 0);
        checkGroup2(rootGroup, rootGroup.items[9], GroupType.Unknown, 12, 12, false, 0);
        checkGroup2(rootGroup, rootGroup.items[10], GroupType.Unknown, 13, 13, false, 0);
    });

    test(`#2.2.11 scope error 5`, async () => {
        const gsc = `}{`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 1, 2);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Unknown, 1, 1, 0);
    });

    test(`#2.2.12 scopes in function`, async () => {
        const gsc = `{} func() {  {{}}  if(1) { {} }      }    {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 20, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 1, false, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.FunctionDefinition, 2, 18, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.FunctionDeclaration, 2, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.FunctionName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.FunctionParametersExpression, 3, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.FunctionScope, 5, 18, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[0], GroupType.Scope, 6, 9, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[0].items[0], GroupType.Scope, 7, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1], GroupType.TerminatedStatement, 10, 17, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1].items[0], GroupType.IfDeclaration, 10, 13, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1].items[0].items[0], GroupType.ReservedKeyword, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1].items[0].items[1], GroupType.Expression, 11, 13, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1].items[0].items[1].items[0], GroupType.Constant, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1].items[1], GroupType.IfScope, 14, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1].items[1].items[1].items[0], GroupType.Scope, 15, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.Scope, 19, 20, false, 0, false);
    });


});





suite('GscFileParser.parse #2.3 array', () => {

    test(`#2.3.0 array`, async () => {
        const gsc = `{[?]}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 4, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 4, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.ArrayInitializer, 1, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Unknown, 2, 2, 0);
    });

    test(`#2.3.1 array`, async () => {
        const gsc = `{[?][?][?]}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 10, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 10, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.ArrayInitializer, 1, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Unknown, 2, 2, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayInitializer, 4, 6, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Unknown, 5, 5, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2], GroupType.ArrayInitializer, 7, 9, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Unknown, 8, 8, 0);
    });

    test(`#2.3.2 array`, async () => {
        const gsc = `{[[?]]}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 6, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 6, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.ArrayInitializer, 1, 5, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ArrayInitializer, 2, 4, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Unknown, 3, 3, 0);
    });
});





suite('GscFileParser.parse #2.4 expression', () => {

    test(`#2.4.0 expression`, async () => {
        const gsc = `{()}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Expression, 1, 2, 0);
    });

    test(`#2.4.1 expression`, async () => {
        const gsc = `{?()?}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 5, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 5, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Unknown, 1, 1, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1], GroupType.Expression, 2, 3, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2], GroupType.Unknown, 4, 4, 0);
    });

    test(`#2.4.2 expression`, async () => {
        const gsc = `{?(?)?}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 6, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 6, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Unknown, 1, 1, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1], GroupType.Expression, 2, 4, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Unknown, 3, 3, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2], GroupType.Unknown, 5, 5, 0);
    });

    test(`#2.4.3 expression`, async () => {
        const gsc = `{?(?(?))}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 8, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 8, 2);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Unknown, 1, 1, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1], GroupType.Expression, 2, 7, 2);
        checkGroup(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Unknown, 3, 3, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.Expression, 4, 6, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.Unknown, 5, 5, 0);
    });
});


suite('GscFileParser.parse #2.5 developer', () => {

    test(`#2.5.0 developer outer`, async () => {
        const gsc = `/# {} #/`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.DeveloperBlock, 0, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Scope, 1, 2, 0);
    });

    test(`#2.5.1 developer outer`, async () => {
        const gsc = `/# {} #/ {} /# {} #/`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 9, 3);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.DeveloperBlock, 0, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Scope, 1, 2, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Scope, 4, 5, 0);
        checkGroup(rootGroup, rootGroup.items[2], GroupType.DeveloperBlock, 6, 9, 1);
        checkGroup(rootGroup, rootGroup.items[2].items[0], GroupType.Scope, 7, 8, 0);
    });

    test(`#2.5.2 developer inner`, async () => {
        const gsc = `{/# {} #/}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 5, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Scope, 0, 5, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.DeveloperBlock, 1, 4, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Scope, 2, 3, 0);
    });

    test(`#2.5.3 developer errors`, async () => {
        const gsc = `
        /# 
        func() { 
            /##/ 
            /#  
                /##/   
            #/
            {
                /##/
            }
        } 
        #/
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 16, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.DeveloperBlock, 0, 16, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDefinition, 1, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionDeclaration, 1, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.FunctionName, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionScope, 4, 15, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.DeveloperBlockInner, 5, 6, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.DeveloperBlockInner, 7, 10, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.DeveloperBlockInner, 8, 9, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.Scope, 11, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.DeveloperBlockInner, 12, 13, false, 0);
    });

    test(`#2.5.7 developer errors 2`, async () => {
        const gsc = `
        func() { 
            /##/ 
            /#  
                /##/   
            #/
            {
                /##/
                /#  
                    /##/   
                #/
            }
        } 
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 18, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 18, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.DeveloperBlockInner, 4, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.DeveloperBlockInner, 6, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.DeveloperBlockInner, 7, 8, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.Scope, 10, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.DeveloperBlockInner, 11, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1], GroupType.DeveloperBlockInner, 13, 16, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0], GroupType.DeveloperBlockInner, 14, 15, false, 0);
    });

    test(`#2.5.8 developer weird`, async () => {
        const gsc = `
        func() {

            // Ok
            if (0) 
                /#println("1");#/
            if (0) 
            /#
                println("2");
                println("3");
            #/
            else 
            /#
                println("4");
                println("5");
            #/
        
            // Ok
            for(;;)
            /#
                println("6");
                break;
            #/
        
            // Ok
            while(true)
            /#
                println("7");
                break;
            #/
        
            // Error
            switch(int)
            /#
                
            #/
        }
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 77, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 77, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 77, true, 6);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.IfDeclaration, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Expression, 5, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.IfScope, 8, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.DeveloperBlockInner, 8, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0], GroupType.TerminatedStatement, 9, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.Statement, 9, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 9, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 10, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.TerminatedStatement, 15, 43, true, 4);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.IfDeclaration, 15, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.ReservedKeyword, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1], GroupType.Expression, 16, 18, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1].items[0], GroupType.Constant, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.IfScope, 19, 30, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0], GroupType.DeveloperBlockInner, 19, 30, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0], GroupType.TerminatedStatement, 20, 24, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[0], GroupType.Statement, 20, 23, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 20, 23, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 20, 20, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 21, 23, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 22, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[1], GroupType.Terminator, 24, 24, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1], GroupType.TerminatedStatement, 25, 29, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0], GroupType.Statement, 25, 28, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0], GroupType.FunctionCall, 25, 28, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.FunctionName, 25, 25, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 26, 28, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1].items[0], GroupType.Constant, 27, 27, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[1], GroupType.Terminator, 29, 29, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[2], GroupType.ReservedKeyword, 31, 31, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3], GroupType.IfScope, 32, 43, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0], GroupType.DeveloperBlockInner, 32, 43, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0], GroupType.TerminatedStatement, 33, 37, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0].items[0], GroupType.Statement, 33, 36, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 33, 36, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 33, 33, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 34, 36, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 35, 35, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[0].items[1], GroupType.Terminator, 37, 37, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1], GroupType.TerminatedStatement, 38, 42, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1].items[0], GroupType.Statement, 38, 41, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1].items[0].items[0], GroupType.FunctionCall, 38, 41, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1].items[0].items[0].items[0], GroupType.FunctionName, 38, 38, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 39, 41, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1].items[0].items[0].items[1].items[0], GroupType.Constant, 40, 40, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[3].items[0].items[1].items[1], GroupType.Terminator, 42, 42, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.TerminatedStatement, 44, 57, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.ForDeclaration, 44, 48, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0], GroupType.ReservedKeyword, 44, 44, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1], GroupType.ForExpression, 45, 48, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1].items[0], GroupType.ForStatement, 46, 46, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1].items[0].items[0], GroupType.Terminator, 46, 46, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1].items[1], GroupType.ForStatement, 47, 47, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1].items[1].items[0], GroupType.Terminator, 47, 47, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1], GroupType.ForScope, 49, 57, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0], GroupType.DeveloperBlockInner, 49, 57, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0], GroupType.TerminatedStatement, 50, 54, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0].items[0], GroupType.Statement, 50, 53, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 50, 53, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 50, 50, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 51, 53, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 52, 52, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0].items[1], GroupType.Terminator, 54, 54, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[1], GroupType.TerminatedStatement, 55, 56, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[1].items[0], GroupType.Statement, 55, 55, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 55, 55, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[1].items[1], GroupType.Terminator, 56, 56, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3], GroupType.TerminatedStatement, 58, 70, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0], GroupType.WhileDeclaration, 58, 61, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[0], GroupType.ReservedKeyword, 58, 58, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1], GroupType.Expression, 59, 61, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1].items[0], GroupType.Constant, 60, 60, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1], GroupType.WhileScope, 62, 70, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0], GroupType.DeveloperBlockInner, 62, 70, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0], GroupType.TerminatedStatement, 63, 67, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0].items[0], GroupType.Statement, 63, 66, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 63, 66, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 63, 63, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 64, 66, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 65, 65, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[0].items[1], GroupType.Terminator, 67, 67, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[1], GroupType.TerminatedStatement, 68, 69, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[1].items[0], GroupType.Statement, 68, 68, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 68, 68, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1].items[0].items[1].items[1], GroupType.Terminator, 69, 69, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4], GroupType.SwitchDeclaration, 71, 74, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0], GroupType.ReservedKeyword, 71, 71, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1], GroupType.Expression, 72, 74, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1].items[0], GroupType.Reference, 73, 73, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1].items[0].items[0], GroupType.VariableName, 73, 73, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[5], GroupType.DeveloperBlockInner, 75, 76, true, 0);
    });
});








suite('GscFileParser.parse #2.6 variables', () => {

    test(`#2.6.0 structrue`, async () => {
        const gsc = `level.aaa`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 2, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 2, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.StructureField, 2, 2, true, 0, false);  
    });

    test(`#2.6.1 array`, async () => {
        const gsc = `game["aaa"]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 3, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 3, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
    });

    test(`#2.6.2 structrue long`, async () => {
        const gsc = `level.aaa.bbb.ccc`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 6, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 4, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 2, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.StructureField, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.StructureField, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.StructureField, 6, 6, true, 0, false);
        
    });

    test(`#2.6.3 array long`, async () => {
        const gsc = `game["a"]["b"]["c"]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 9, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.ArrayAccess, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ArrayAccess, 4, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 7, 9, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Constant, 8, 8, true, 0, false);
    });

    test(`#2.6.4 structure and array`, async () => {
        const gsc = `level.aaa["bbb"].ccc["ddd"].eee.fff["ggg"]["hhh"]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 20, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 20, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 17, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 14, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 12, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 10, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 7, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 5, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 2, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[2], GroupType.StructureField, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.ArrayAccess, 3, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[2], GroupType.StructureField, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[1], GroupType.ArrayAccess, 8, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.Token, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[2], GroupType.StructureField, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.Token, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.StructureField, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ArrayAccess, 15, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 18, 20, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Constant, 19, 19, true, 0, false);
    });

    test(`#2.6.5 local`, async () => {
        const gsc = `var1 = 1`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 2, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 2, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.Constant, 2, 2, true, 0);
    });

    test(`#2.6.6 array local index`, async () => {
        const gsc = `var1 = array[index];`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 5, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Reference, 2, 5, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.ArrayAccess, 3, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0], GroupType.Reference, 4, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0], GroupType.VariableName, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 6, 6, true, 0, false);
    });


    test(`#2.6.7 vector`, async () => {
        const gsc = `f1() { var1 = (0, 0, 0);  var2 = (1 + 1, level getY(), game["z"]); }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 32, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 32, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 32, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 13, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 12, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Vector, 6, 12, true, 5, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0], GroupType.Constant, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1], GroupType.Token, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2], GroupType.Constant, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[3], GroupType.Token, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[4], GroupType.Constant, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.TerminatedStatement, 14, 31, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.Statement, 14, 30, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.Reference, 14, 14, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0].items[0], GroupType.VariableName, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1], GroupType.Token, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2], GroupType.Vector, 16, 30, true, 5, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[0], GroupType.Value, 17, 19, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[0].items[0], GroupType.Constant, 17, 17, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[0].items[1], GroupType.Token, 18, 18, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[0].items[2], GroupType.Constant, 19, 19, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[1], GroupType.Token, 20, 20, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[2], GroupType.FunctionCallWithObject, 21, 24, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[2].items[0], GroupType.Reference, 21, 21, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 21, 21, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[2].items[1], GroupType.FunctionCall, 22, 24, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[2].items[1].items[0], GroupType.FunctionName, 22, 22, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[2].items[1].items[1], GroupType.FunctionParametersExpression, 23, 24, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[3], GroupType.Token, 25, 25, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[4], GroupType.Reference, 26, 29, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[4].items[0], GroupType.Reference, 26, 26, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[4].items[0].items[0], GroupType.VariableName, 26, 26, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[4].items[1], GroupType.ArrayAccess, 27, 29, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2].items[4].items[1].items[0], GroupType.Constant, 28, 28, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.Terminator, 31, 31, true, 0, false);
    });

    test(`#2.6.8 vector`, async () => {
        const gsc = `f1() { var1 = (aaa, bbb + ccc, -.1); }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 17, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 16, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 15, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Vector, 6, 15, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0], GroupType.VariableName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2], GroupType.Value, 9, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2].items[0], GroupType.Reference, 9, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2].items[1], GroupType.Token, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2].items[2], GroupType.Reference, 11, 11, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2].items[2].items[0], GroupType.VariableName, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[3], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[4], GroupType.Value, 13, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[4].items[0], GroupType.Token, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[4].items[1], GroupType.Constant, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 16, 16, true, 0);
    });

    test(`#2.6.9 structrue in expression`, async () => {
        const gsc = `(level).aaa`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 4, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Expression, 0, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 1, 1, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.StructureField, 4, 4, true, 0, false);
    });

    test(`#2.6.10 array in expression`, async () => {
        const gsc = `(game)["aaa"]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 5, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Expression, 0, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 1, 1, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 3, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Constant, 4, 4, true, 0, false);
    });

    test(`#2.6.11 variable in expressions`, async () => {
        const gsc = `((level).bbb).x = 1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 11, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 10, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 8, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Expression, 0, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 1, 5, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[2], GroupType.StructureField, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.StructureField, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Constant, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 11, 11, true, 0, false);
    });

    test(`#2.6.12 array with value index`, async () => {
        const gsc = `game[1 + 1]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 5, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 1, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Value, 2, 4, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Token, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[2], GroupType.Constant, 4, 4, true, 0, false);
    });
    
    test(`#2.6.13 array with expression index`, async () => {
        const gsc = `game[("aaa")]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 5, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 1, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Value, 2, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Expression, 2, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Constant, 3, 3, true, 0, false);
    });

    test(`#2.6.14 array with func call with var`, async () => {
        const gsc = `var1 = game[self func()];`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Reference, 2, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.ArrayAccess, 3, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0], GroupType.FunctionCallWithObject, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[1], GroupType.FunctionCall, 5, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[1].items[0], GroupType.FunctionName, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 6, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 9, 9, true, 0);
    });

    test(`#2.6.15 string .size`, async () => {
        const gsc = `"weapon_".size`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 2, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 2, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Constant, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.StructureField, 2, 2, true, 0);  
    });

    test(`#2.6.16 string index`, async () => {
        const gsc = `"weapon_"[0]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 3, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 3, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Constant, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0);
    });

    test(`#2.6.17 .size after func call`, async () => {
        const gsc = `getaiarray("axis").size`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 5, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCall, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.StructureField, 5, 5, true, 0); 
    });

    test(`#2.6.18 [] after func call`, async () => {
        const gsc = `getaiarray("axis")[0]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Reference, 0, 6, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCall, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ArrayAccess, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Constant, 5, 5, true, 0); 
    });

    test(`#2.6.19 xanim`, async () => {
        const gsc = `var1 = %anim_file_name`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 3, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 3, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.Constant, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[1], GroupType.XAnim, 3, 3, true, 0); 
    });

    test(`#2.6.20 array without indexer`, async () => {
        const gsc = `var1 = game[]`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 4, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.Reference, 2, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[1], GroupType.ArrayAccess, 3, 4, false, 0);
    });
});



suite('GscFileParser.parse #2.7 path and function calls', () => {

    test(`#2.7.0 path`, async () => {
        const gsc = `? aaa\\  ?  aaa\\bbb\\ccc\\  ?  path\\filename::func  ?  filename::func ?`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 20, 9);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Unknown, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[1], GroupType.Path, 1, 2, 0);
        checkGroup(rootGroup, rootGroup.items[2], GroupType.Unknown, 3, 3, 0);
        checkGroup(rootGroup, rootGroup.items[3], GroupType.Path, 4, 9, 0);
        checkGroup(rootGroup, rootGroup.items[4], GroupType.Unknown, 10, 10, 0);
        checkGroup(rootGroup, rootGroup.items[5], GroupType.FunctionPointerExternal, 11, 15, 2);
        checkGroup(rootGroup, rootGroup.items[5].items[0], GroupType.Path, 11, 13, 0);
        checkGroup(rootGroup, rootGroup.items[5].items[1], GroupType.FunctionPointer, 14, 15, 2);
        checkGroup(rootGroup, rootGroup.items[5].items[1].items[0], GroupType.Token, 14, 14, 0);
        checkGroup(rootGroup, rootGroup.items[5].items[1].items[1], GroupType.FunctionName, 15, 15, 0);
        checkGroup(rootGroup, rootGroup.items[6], GroupType.Unknown, 16, 16, 0);
        checkGroup(rootGroup, rootGroup.items[7], GroupType.FunctionPointerExternal, 17, 19, 2);
        checkGroup(rootGroup, rootGroup.items[7].items[0], GroupType.Path, 17, 17, 0);
        checkGroup(rootGroup, rootGroup.items[7].items[1], GroupType.FunctionPointer, 18, 19, 2);
        checkGroup(rootGroup, rootGroup.items[7].items[1].items[0], GroupType.Token, 18, 18, 0);
        checkGroup(rootGroup, rootGroup.items[7].items[1].items[1], GroupType.FunctionName, 19, 19, 0);
        checkGroup(rootGroup, rootGroup.items[8], GroupType.Unknown, 20, 20, 0);
    });

    test(`#2.7.1 function call`, async () => {
        const gsc = `players = CountPlayers(1);`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionCall, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.FunctionName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.FunctionParametersExpression, 3, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 6, 6, true, 0);
    });

    test(`#2.7.2 function call external`, async () => {
        const gsc = `players = maps\\mp\\gametypes\\_teams::CountPlayers();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionCall, 2, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Path, 2, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCall, 10, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.FunctionName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 11, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
    });

    test(`#2.7.3 func pointer`, async () => {
        const gsc = `var1 = ::CountPlayers;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionPointer, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.FunctionName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
    });

    test(`#2.7.4 func pointer external`, async () => {
        const gsc = `var1 = maps\\mp\\gametypes\\_teams::CountPlayers;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 10, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionPointerExternal, 2, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Path, 2, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.FunctionPointer, 9, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1], GroupType.FunctionName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 11, 11, true, 0);
    });

    test(`#2.7.5 func call`, async () => {
        const gsc = `rootscript::functionName();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 5, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCall, 0, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Path, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.FunctionCall, 2, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0], GroupType.FunctionName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[1], GroupType.FunctionParametersExpression, 3, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 5, 5, true, 0);
    });

    test(`#2.7.6 func`, async () => {
        const gsc = `players = maps\\mp\\gametypes\\_teams::CountPlayers()    /* missing ; */    players = maps\\mp\\gametypes\\_teams::CountPlayers();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 26, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 12, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.FunctionCall, 2, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Path, 2, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[1], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[2], GroupType.FunctionCall, 10, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[2].items[0], GroupType.FunctionName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 11, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 13, 26, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 13, 25, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 13, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.FunctionCall, 15, 25, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0], GroupType.Path, 15, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[1], GroupType.Token, 22, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2], GroupType.FunctionCall, 23, 25, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2].items[0], GroupType.FunctionName, 23, 23, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 24, 25, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 26, 26, true, 0);
    });

    test(`#2.7.7 func`, async () => {
        const gsc = `thread f1();     thread file::f2();   var1 f3();     var1 file::f4();    var1 thread f5();    var1 thread file::f6();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 37, false, 6);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCallWithThread, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionCall, 1, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.FunctionName, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 5, 11, false, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 5, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.FunctionCallWithThread, 5, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1], GroupType.FunctionCall, 6, 10, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1].items[0], GroupType.Path, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1].items[2], GroupType.FunctionCall, 8, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1].items[2].items[0], GroupType.FunctionName, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1].items[2].items[1], GroupType.FunctionParametersExpression, 9, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.TerminatedStatement, 12, 16, false, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Statement, 12, 15, true, 1);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0], GroupType.FunctionCallWithObject, 12, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0], GroupType.Reference, 12, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1], GroupType.FunctionCall, 13, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1].items[0], GroupType.FunctionName, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 14, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Terminator, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[3], GroupType.TerminatedStatement, 17, 23, false, 2);
        checkGroup2(rootGroup, rootGroup.items[3].items[0], GroupType.Statement, 17, 22, true, 1);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0], GroupType.FunctionCallWithObject, 17, 22, true, 2);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[0], GroupType.Reference, 17, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[0].items[0], GroupType.VariableName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[1], GroupType.FunctionCall, 18, 22, true, 3);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[1].items[0], GroupType.Path, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[1].items[1], GroupType.Token, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[1].items[2], GroupType.FunctionCall, 20, 22, true, 2);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[1].items[2].items[0], GroupType.FunctionName, 20, 20, true, 0);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[1].items[2].items[1], GroupType.FunctionParametersExpression, 21, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[3].items[1], GroupType.Terminator, 23, 23, true, 0);
        checkGroup2(rootGroup, rootGroup.items[4], GroupType.TerminatedStatement, 24, 29, false, 2);
        checkGroup2(rootGroup, rootGroup.items[4].items[0], GroupType.Statement, 24, 28, true, 1);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0], GroupType.FunctionCallWithObjectAndThread, 24, 28, true, 3);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0].items[0], GroupType.Reference, 24, 24, true, 1);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0].items[0].items[0], GroupType.VariableName, 24, 24, true, 0);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0].items[1], GroupType.ReservedKeyword, 25, 25, true, 0);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0].items[2], GroupType.FunctionCall, 26, 28, true, 2);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0].items[2].items[0], GroupType.FunctionName, 26, 26, true, 0);
        checkGroup2(rootGroup, rootGroup.items[4].items[0].items[0].items[2].items[1], GroupType.FunctionParametersExpression, 27, 28, true, 0);
        checkGroup2(rootGroup, rootGroup.items[4].items[1], GroupType.Terminator, 29, 29, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5], GroupType.TerminatedStatement, 30, 37, false, 2);
        checkGroup2(rootGroup, rootGroup.items[5].items[0], GroupType.Statement, 30, 36, true, 1);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0], GroupType.FunctionCallWithObjectAndThread, 30, 36, true, 3);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[0], GroupType.Reference, 30, 30, true, 1);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[0].items[0], GroupType.VariableName, 30, 30, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[1], GroupType.ReservedKeyword, 31, 31, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[2], GroupType.FunctionCall, 32, 36, true, 3);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[2].items[0], GroupType.Path, 32, 32, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[2].items[1], GroupType.Token, 33, 33, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[2].items[2], GroupType.FunctionCall, 34, 36, true, 2);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[2].items[2].items[0], GroupType.FunctionName, 34, 34, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5].items[0].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 35, 36, true, 0);
        checkGroup2(rootGroup, rootGroup.items[5].items[1], GroupType.Terminator, 37, 37, true, 0);
    });

    test(`#2.7.8 function call with param`, async () => {
        const gsc = `func(p1, p2) { players = CountPlayers(1, 1+1, var1, level.aaa); }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 24, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 24, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.FunctionParameterName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.FunctionParameterName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 6, 24, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 7, 23, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 7, 22, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.FunctionCall, 9, 22, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0], GroupType.FunctionName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1], GroupType.FunctionParametersExpression, 10, 22, true, 7);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[0], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[1], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2], GroupType.Value, 13, 15, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2].items[0], GroupType.Constant, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2].items[1], GroupType.Token, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2].items[2], GroupType.Constant, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[3], GroupType.Token, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[4], GroupType.Reference, 17, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[4].items[0], GroupType.VariableName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[5], GroupType.Token, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[6], GroupType.Reference, 19, 21, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[6].items[0], GroupType.Reference, 19, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[6].items[0].items[0], GroupType.VariableName, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[6].items[1], GroupType.Token, 20, 20, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[6].items[2], GroupType.StructureField, 21, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 23, 23, true, 0);
    });

    test(`#2.7.9 function call with param`, async () => {
        const gsc = `func(p1, p2) { players = CountPlayers(1, 1+1, var1); }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 20, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 20, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.FunctionParameterName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.FunctionParameterName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 6, 20, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 7, 19, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 7, 18, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.FunctionCall, 9, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0], GroupType.FunctionName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1], GroupType.FunctionParametersExpression, 10, 18, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[0], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[1], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2], GroupType.Value, 13, 15, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2].items[0], GroupType.Constant, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2].items[1], GroupType.Token, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[2].items[2], GroupType.Constant, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[3], GroupType.Token, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[4], GroupType.Reference, 17, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1].items[4].items[0], GroupType.VariableName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 19, 19, true, 0);
    });

    test(`#2.7.10 function dereference`, async () => {
        const gsc = `[[func]]();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCall, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.FunctionDereference, 0, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[2], GroupType.ReservedKeyword, 3, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });

    test(`#2.7.11 function dereference 2`, async () => {
        const gsc = `[[level.onConnecting[i]]]();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 12, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 12, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 11, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCall, 0, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.FunctionDereference, 0, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.Value, 2, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Reference, 2, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[0], GroupType.Reference, 2, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[2], GroupType.StructureField, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[1], GroupType.ArrayAccess, 5, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[1].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[1].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[2], GroupType.ReservedKeyword, 8, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 10, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 12, 12, true, 0);
    });

    test(`#2.7.12 function dereference 3`, async () => {
        const gsc = `level [[func]]();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCallWithObject, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionCall, 1, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.FunctionDereference, 1, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0].items[1], GroupType.Reference, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0].items[1].items[0], GroupType.VariableName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0].items[2], GroupType.ReservedKeyword, 4, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 6, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 8, 8, true, 0);
    });

    test(`#2.7.13 function dereference 4`, async () => {
        const gsc = `level thread [[func]]();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCallWithObjectAndThread, 0, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.ReservedKeyword, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.FunctionCall, 2, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0], GroupType.FunctionDereference, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0].items[1], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0].items[1].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0].items[2], GroupType.ReservedKeyword, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[1], GroupType.FunctionParametersExpression, 7, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 9, 9, true, 0);
    });

    test(`#2.7.14 function dereference 5`, async () => {
        const gsc = `[[::func]]();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCall, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.FunctionDereference, 0, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.Value, 2, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0], GroupType.FunctionPointer, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0].items[1], GroupType.FunctionName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[2], GroupType.ReservedKeyword, 4, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 6, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 8, 8, true, 0);
    });



    test(`#2.7.15 function with variable as func`, async () => {
        const gsc = `var = getVar() thread func1();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionCallWithObjectAndThread, 2, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.FunctionCall, 2, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.FunctionName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 3, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.ReservedKeyword, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCall, 6, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.FunctionName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 7, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 9, 9, true, 0);
    });



    test(`#2.7.16 function with rare objects`, async () => {
        const gsc = `var1 = [[f]]() thread ttt();  var2 = ::getVar thread ttt();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 22, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionCallWithObjectAndThread, 2, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 2, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.FunctionCall, 2, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.FunctionDereference, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[1], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[1].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[2], GroupType.ReservedKeyword, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 7, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.ReservedKeyword, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCall, 10, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.FunctionName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 11, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 14, 22, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 14, 21, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 14, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.FunctionCallWithObjectAndThread, 16, 21, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0], GroupType.Reference, 16, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0], GroupType.FunctionPointer, 16, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[0], GroupType.Token, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[1], GroupType.FunctionName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[1], GroupType.ReservedKeyword, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2], GroupType.FunctionCall, 19, 21, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2].items[0], GroupType.FunctionName, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 20, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 22, 22, true, 0);
    });


    test(`#2.7.17 reserved keywords in path`, async () => {
        const gsc = `players = maps\\mp\\return\\_teams::CountPlayers();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.FunctionCall, 2, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Path, 2, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCall, 10, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.FunctionName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionParametersExpression, 11, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
    });


    test(`#2.7.18 function call with variable in bracket`, async () => {
        const gsc = `(level) CountPlayers();`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionCallWithObject, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Expression, 0, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 1, 1, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.FunctionCall, 3, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.FunctionName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 4, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 6, 6, true, 0);
    });

});



suite('GscFileParser.parse #2.8 assigment', () => {
    test(`#2.8.0 assigment`, async () => {
        const gsc = `aaa = 1; level.aaa = 2; game["aaa"] = 3; b = level.aaa;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 22, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 2, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 4, 9, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 4, 8, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 4, 6, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[2], GroupType.StructureField, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Constant, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.TerminatedStatement, 10, 16, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Statement, 10, 15, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0], GroupType.Reference, 10, 13, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0], GroupType.Reference, 10, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1], GroupType.ArrayAccess, 11, 13, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1].items[0], GroupType.Constant, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1], GroupType.Token, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2], GroupType.Constant, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Terminator, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3], GroupType.TerminatedStatement, 17, 22, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0], GroupType.Statement, 17, 21, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0], GroupType.Reference, 17, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[0], GroupType.VariableNameGlobal, 17, 17, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[1], GroupType.Token, 18, 18, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2], GroupType.Reference, 19, 21, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[0], GroupType.Reference, 19, 19, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[0].items[0], GroupType.VariableName, 19, 19, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[1], GroupType.Token, 20, 20, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[2], GroupType.StructureField, 21, 21, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[1], GroupType.Terminator, 22, 22, true, 0, false);
    });

    test(`#2.8.1 assigment 2`, async () => {
        const gsc = `aaa += 1; level.aaa += 2; game["aaa"] += 3; bbb += level.aaa;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 22, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 3, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 2, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 4, 9, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 4, 8, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 4, 6, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[2], GroupType.StructureField, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Constant, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.TerminatedStatement, 10, 16, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Statement, 10, 15, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0], GroupType.Reference, 10, 13, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0], GroupType.Reference, 10, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1], GroupType.ArrayAccess, 11, 13, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1].items[0], GroupType.Constant, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1], GroupType.Token, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2], GroupType.Constant, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Terminator, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3], GroupType.TerminatedStatement, 17, 22, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0], GroupType.Statement, 17, 21, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0], GroupType.Reference, 17, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[0].items[0], GroupType.VariableName, 17, 17, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[1], GroupType.Token, 18, 18, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2], GroupType.Reference, 19, 21, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[0], GroupType.Reference, 19, 19, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[0].items[0], GroupType.VariableName, 19, 19, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[1], GroupType.Token, 20, 20, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[0].items[2].items[2], GroupType.StructureField, 21, 21, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[3].items[1], GroupType.Terminator, 22, 22, true, 0, false);
    });

    test(`#2.8.2 assigment 3`, async () => {
        const gsc = `aaa++; level.aaa++; game["aaa"]++;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 2, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 1, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 3, 7, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 3, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 3, 5, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.Reference, 3, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[1], GroupType.Token, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[2], GroupType.StructureField, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.TerminatedStatement, 8, 13, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Statement, 8, 12, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0], GroupType.Reference, 8, 11, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0], GroupType.Reference, 8, 8, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1], GroupType.ArrayAccess, 9, 11, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[1].items[0], GroupType.Constant, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1], GroupType.Token, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Terminator, 13, 13, true, 0, false);
    });

    test(`#2.8.3 assigment 4`, async () => {
        const gsc = `func() { v1 = v2; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });
});


suite('GscFileParser.parse #2.9 operators, values', () => {

    test(`#2.9.0 opers`, async () => {
        const gsc = `var1 = 1 + 2 - 3 * 4 / 5 && 6 || 7 > 8 < 9`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 18, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 18, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2], GroupType.Value, 2, 18, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Value, 2, 16, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0], GroupType.Value, 2, 14, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0], GroupType.Value, 2, 12, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0], GroupType.Value, 2, 10, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0], GroupType.Value, 2, 8, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Value, 2, 6, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Value, 2, 4, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Constant, 2, 2, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 3, 3, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[0].items[2], GroupType.Constant, 4, 4, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 5, 5, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[2], GroupType.Constant, 6, 6, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 7, 7, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[2], GroupType.Constant, 8, 8, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 9, 9, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[0].items[2], GroupType.Constant, 10, 10, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[1], GroupType.Token, 11, 11, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0].items[2], GroupType.Constant, 12, 12, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[1], GroupType.Token, 13, 13, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[2], GroupType.Constant, 14, 14, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[1], GroupType.Token, 15, 15, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0].items[2], GroupType.Constant, 16, 16, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[1], GroupType.Token, 17, 17, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[2], GroupType.Constant, 18, 18, 0);
    });


    test(`#2.9.1 operators`, async () => {
        const gsc = `aaa && !bbb`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup(rootGroup, rootGroup, GroupType.Root, 0, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0], GroupType.Value, 0, 3, 3);
        checkGroup(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2], GroupType.Value, 2, 3, 2);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Token, 2, 2, 0);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[1], GroupType.Reference, 3, 3, 1);
        checkGroup(rootGroup, rootGroup.items[0].items[2].items[1].items[0], GroupType.VariableName, 3, 3, 0);
    });

    test(`#2.9.2 expression solving`, async () => {
        const gsc = `((1) + 1 + ())`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Expression, 0, 9, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Value, 1, 8, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Value, 1, 5, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Value, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.Token, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.Constant, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 7, 8, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Expression, 7, 8, false, 0, false);
    });


    test(`#2.9.3 expressions and opers`, async () => {
        const gsc = `f1() { var1 = (CountPlayers(level.allies + 1) - 1) == 0; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 21, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 21, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 21, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 20, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 19, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Value, 6, 19, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0], GroupType.Value, 6, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0], GroupType.Expression, 6, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0], GroupType.Value, 7, 16, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 7, 14, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 8, 14, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Value, 9, 13, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[0], GroupType.Reference, 9, 11, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 9, 9, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[0].items[2], GroupType.StructureField, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[1], GroupType.Token, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1].items[0].items[2], GroupType.Constant, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[1], GroupType.Token, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[0].items[0].items[0].items[2], GroupType.Constant, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[1], GroupType.Token, 18, 18, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2].items[2], GroupType.Constant, 19, 19, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 20, 20, true, 0, false);
    });



    test(`#2.9.4 pos neg numbers`, async () => {
        const gsc = `(+1 + -1 * -.1)`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Expression, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Value, 1, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Value, 1, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Value, 1, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2], GroupType.Value, 4, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[0], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[2].items[1], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 7, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Constant, 8, 8, true, 0);
    });
    test(`#2.9.5 pos neg numbers`, async () => {
        const gsc = `var1 = 1 + -1 + -.1 > -5.1`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 11, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.Value, 2, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.Value, 2, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0], GroupType.Value, 2, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[0], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[2], GroupType.Value, 4, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[2].items[0], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0].items[2].items[1], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[2], GroupType.Value, 7, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[2].items[0], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[2].items[1], GroupType.Constant, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[1], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[2], GroupType.Value, 10, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[2].items[0], GroupType.Token, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[2].items[1], GroupType.Constant, 11, 11, true, 0);
    });

    test(`#2.9.6 pos neg numbers`, async () => {
        const gsc = `var1 = -1; var2 = !-.1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 10, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 5, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 5, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Value, 7, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[1], GroupType.Value, 8, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[1].items[0], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[1].items[1], GroupType.Constant, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 10, 10, true, 0);
    });

    test(`#2.9.7 empty expression`, async () => {
        const gsc = `var1 = (()); var1 = ((0));`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 14, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Expression, 2, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Expression, 3, 4, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 7, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 7, 13, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Value, 9, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0], GroupType.Expression, 9, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0], GroupType.Expression, 10, 12, false, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[0], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 14, 14, true, 0);
    });

    
});




suite('GscFileParser.parse #2.10 if', () => {
    test(`#2.10.0 if`, async () => {
        const gsc = `if (1) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 5, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.IfDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.IfScope, 4, 5, true, 0, false);
    });

    test(`#2.10.1 if else`, async () => {
        const gsc = `if (1) {} else {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.IfDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.IfScope, 4, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.ReservedKeyword, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3], GroupType.IfScope, 7, 8, true, 0, false);
    });

    test(`#2.10.2 if else if`, async () => {
        const gsc = `if (1) {} else if (2) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 12, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 12, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.IfDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.IfScope, 4, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.ReservedKeyword, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3], GroupType.IfScope, 7, 12, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0], GroupType.TerminatedStatement, 7, 12, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0], GroupType.IfDeclaration, 7, 10, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[0], GroupType.ReservedKeyword, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1], GroupType.Expression, 8, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1].items[0], GroupType.Constant, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[1], GroupType.IfScope, 11, 12, true, 0, false);
    });

    test(`#2.10.3 if else if else if`, async () => {
        const gsc = `if (1) {} else if (2) {} else if (3) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 19, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 19, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.IfDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.IfScope, 4, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.ReservedKeyword, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3], GroupType.IfScope, 7, 19, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0], GroupType.TerminatedStatement, 7, 19, true, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0], GroupType.IfDeclaration, 7, 10, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[0], GroupType.ReservedKeyword, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1], GroupType.Expression, 8, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1].items[0], GroupType.Constant, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[1], GroupType.IfScope, 11, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[2], GroupType.ReservedKeyword, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3], GroupType.IfScope, 14, 19, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0], GroupType.TerminatedStatement, 14, 19, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0], GroupType.IfDeclaration, 14, 17, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0].items[0], GroupType.ReservedKeyword, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0].items[1], GroupType.Expression, 15, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0].items[1].items[0], GroupType.Constant, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[1], GroupType.IfScope, 18, 19, true, 0, false);
    });

    test(`#2.10.4 if else if else if else`, async () => {
        const gsc = `if (1) {} else if (2) {} else if (3) {} else {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 22, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 22, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.IfDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.IfScope, 4, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.ReservedKeyword, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3], GroupType.IfScope, 7, 22, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0], GroupType.TerminatedStatement, 7, 22, true, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0], GroupType.IfDeclaration, 7, 10, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[0], GroupType.ReservedKeyword, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1], GroupType.Expression, 8, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1].items[0], GroupType.Constant, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[1], GroupType.IfScope, 11, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[2], GroupType.ReservedKeyword, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3], GroupType.IfScope, 14, 22, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0], GroupType.TerminatedStatement, 14, 22, true, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0], GroupType.IfDeclaration, 14, 17, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0].items[0], GroupType.ReservedKeyword, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0].items[1], GroupType.Expression, 15, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[0].items[1].items[0], GroupType.Constant, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[1], GroupType.IfScope, 18, 19, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[2], GroupType.ReservedKeyword, 20, 20, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[3].items[0].items[3], GroupType.IfScope, 21, 22, true, 0, false);
    });

    test(`#2.10.5 if else with statement`, async () => {
        const gsc = `if (var1) var1=2; else var1=1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 12, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 12, false, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.IfDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.IfScope, 4, 7, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 7, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 6, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.ReservedKeyword, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3], GroupType.IfScope, 9, 12, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0], GroupType.TerminatedStatement, 9, 12, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0], GroupType.Statement, 9, 11, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[0], GroupType.Reference, 9, 9, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[0].items[0], GroupType.VariableName, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[1], GroupType.Token, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[0].items[2], GroupType.Constant, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[3].items[0].items[1], GroupType.Terminator, 12, 12, true, 0, false);
    });

});


suite('GscFileParser.parse #2.11 return', () => {
    test(`#2.11.0 return`, async () => {
        const gsc = `return;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 1, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 1, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 1, 1, true, 0);
    });

    test(`#2.11.1 return value`, async () => {
        const gsc = `return 1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 2, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 2, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 1, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Constant, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 2, 2, true, 0);
    });

    test(`#2.11.2 return 1 + 1`, async () => {
        const gsc = `return 1 + 1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Value, 1, 3, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Constant, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
    });

    test(`#2.11.3 return var`, async () => {
        const gsc = `return var1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 2, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 2, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 1, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Reference, 1, 1, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 2, 2, true, 0);
    });

    test(`#2.11.4 return -1`, async () => {
        const gsc = `return -1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 3, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 3, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Value, 1, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 3, 3, true, 0);
    });

    test(`#2.11.5 return func pointer`, async () => {
        const gsc = `return ::funcName;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 3, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 3, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionPointer, 1, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.FunctionName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 3, 3, true, 0);
    });
});



suite('GscFileParser.parse #2.12 keywords with arguments', () => {

    test(`#2.12.0 waittillframeend`, async () => {
        const gsc = `waittillframeend;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 1, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 1, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 1, 1, true, 0);
    });

    test(`#2.12.2 wait`, async () => {
        const gsc = `wait 0.1; wait var1; wait 1+1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 10, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 2, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 1, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Constant, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 3, 5, false, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 3, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.ReservedKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.TerminatedStatement, 6, 10, false, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Statement, 6, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0], GroupType.ReservedKeyword, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1], GroupType.Value, 7, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1].items[0], GroupType.Constant, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1].items[2], GroupType.Constant, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Terminator, 10, 10, true, 0);
    });

    test(`#2.12.3 waittill`, async () => {
        const gsc = `level waittill ("abc", player)`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.KeywordCallWithObject, 0, 6, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.KeywordCall, 1, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.ReservedKeyword, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.KeywordParametersExpression, 2, 6, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.Constant, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.Token, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[2], GroupType.Reference, 5, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[2].items[0], GroupType.VariableName, 5, 5, true, 0, false);
    });

    test(`#2.12.4 endon`, async () => {
        const gsc = `level endon("strat_time_end")`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.KeywordCallWithObject, 0, 4, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.KeywordCall, 1, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.ReservedKeyword, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.KeywordParametersExpression, 2, 4, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.Constant, 3, 3, true, 0, false);
    });

    test(`#2.12.5 notify`, async () => {
        const gsc = `level notify("joined", assignment, self);`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 8, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.KeywordCallWithObject, 0, 8, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.KeywordCall, 1, 8, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.ReservedKeyword, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.KeywordParametersExpression, 2, 8, true, 5, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[0], GroupType.Constant, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[1], GroupType.Token, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[2], GroupType.Reference, 5, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[2].items[0], GroupType.VariableName, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[3], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[4], GroupType.Reference, 7, 7, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[4].items[0], GroupType.VariableName, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 9, 9, true, 0, false);
    });

    test(`#2.12.6 notify with variable reference`, async () => {
        const gsc = `game["player"] notify("test");`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 7, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.KeywordCallWithObject, 0, 7, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.ArrayAccess, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1].items[0], GroupType.Constant, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.KeywordCall, 4, 7, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.ReservedKeyword, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.KeywordParametersExpression, 5, 7, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[0], GroupType.Constant, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 8, 8, true, 0, false);
    });

    test(`#2.12.7 notify with variable reference 2`, async () => {
        const gsc = `level.player notify("test");`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.KeywordCallWithObject, 0, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 2, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[2], GroupType.StructureField, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.KeywordCall, 3, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.ReservedKeyword, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.KeywordParametersExpression, 4, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[0], GroupType.Constant, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0, false);
    });


    test(`#2.12.8 notify with function call`, async () => {
        const gsc = `getEnt() waittill ( "trigger" );`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.KeywordCallWithObject, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.FunctionCall, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.KeywordCall, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.ReservedKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.KeywordParametersExpression, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[0], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });


    test(`#2.12.9 waittillmatch`, async () => {
        const gsc = `level waittillmatch ( "trigger", "value_to_match" );`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.KeywordCallWithObject, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1], GroupType.KeywordCall, 1, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[0], GroupType.ReservedKeyword, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1], GroupType.KeywordParametersExpression, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[0], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[1].items[1].items[2], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });
});



suite('GscFileParser.parse #2.13 for', () => {

    test(`#2.13.0 for`, async () => {
        const gsc = `for (;;) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Terminator, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 5, 6, true, 0);
    });

    test(`#2.13.1 for`, async () => {
        const gsc = `for (i = 0; i < 5; i++) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 14, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 14, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 12, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 12, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 5, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 4, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 4, 4, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 6, 9, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Value, 6, 8, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.Reference, 6, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[0], GroupType.VariableName, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[1], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2], GroupType.Constant, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.ForStatement, 10, 11, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 10, 11, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 10, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 13, 14, true, 0, false);
    });

    test(`#2.13.2 for`, async () => {
        const gsc = `for (; i < 5; i++) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 11, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Value, 3, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.Reference, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[0], GroupType.VariableName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.ForStatement, 7, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 7, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 10, 11, true, 0);
    });

    test(`#2.13.3 for`, async () => {
        const gsc = `for (; ; i++) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Terminator, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.ForStatement, 4, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 4, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 7, 8, true, 0);
    });

    test(`#2.13.4 for`, async () => {
        const gsc = `for (; true;) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 3, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 6, 7, true, 0);
    });

    test(`#2.13.5 for`, async () => {
        const gsc = `for (;;) i++;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 3, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Terminator, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 5, 7, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 5, 7, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 5, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 5, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0, false);
    });

    test(`#2.13.6 for`, async () => {
        const gsc = `for (i = 1;();i++) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 6, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Value, 6, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.Expression, 6, 7, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.ForStatement, 9, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 9, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 9, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 12, 13, true, 0);
    });

    test(`#2.13.7 for while if`, async () => {
        const gsc = `
        f() {
            i = 1;
            while(i == 1)
                for(;;)
                    if (i == 0)
                        break;
                    else
                        i = 0;
        }
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 32, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 32, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 32, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.TerminatedStatement, 8, 31, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.WhileDeclaration, 8, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.ReservedKeyword, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1], GroupType.Expression, 9, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1].items[0], GroupType.Value, 10, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1].items[0].items[0], GroupType.Reference, 10, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.VariableName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1].items[0].items[1], GroupType.Token, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1].items[0].items[2], GroupType.Constant, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.WhileScope, 14, 31, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0], GroupType.TerminatedStatement, 14, 31, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0], GroupType.ForDeclaration, 14, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[1], GroupType.ForExpression, 15, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[1].items[0], GroupType.ForStatement, 16, 16, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[1].items[1], GroupType.ForStatement, 17, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[0].items[1].items[1].items[0], GroupType.Terminator, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1], GroupType.ForScope, 19, 31, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 19, 31, true, 4);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0], GroupType.IfDeclaration, 19, 24, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.Expression, 20, 24, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1].items[0], GroupType.Value, 21, 23, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1].items[0].items[0], GroupType.Reference, 21, 21, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[0], GroupType.VariableName, 21, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1].items[0].items[1], GroupType.Token, 22, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[0].items[1].items[0].items[2], GroupType.Constant, 23, 23, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[1], GroupType.IfScope, 25, 26, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 25, 26, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[1].items[0].items[0], GroupType.Statement, 25, 25, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 25, 25, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[1].items[0].items[1], GroupType.Terminator, 26, 26, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[2], GroupType.ReservedKeyword, 27, 27, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3], GroupType.IfScope, 28, 31, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0], GroupType.TerminatedStatement, 28, 31, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0].items[0], GroupType.Statement, 28, 30, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0].items[0].items[0], GroupType.Reference, 28, 28, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0].items[0].items[0].items[0], GroupType.VariableName, 28, 28, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0].items[0].items[1], GroupType.Token, 29, 29, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0].items[0].items[2], GroupType.Constant, 30, 30, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1].items[0].items[1].items[0].items[3].items[0].items[1], GroupType.Terminator, 31, 31, true, 0);
    });


    test(`#2.13.8 for error 1`, async () => {
        const gsc = `
            for (;)                  
            for (i = 1;)             
            for (; i < 5)              
                break;
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 19, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 19, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 3, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Terminator, 2, 2, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 4, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 19, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ForDeclaration, 4, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.ForExpression, 5, 10, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0], GroupType.TerminatedStatement, 6, 9, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 6, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.ForScope, 11, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 11, 19, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0], GroupType.ForDeclaration, 11, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.ForExpression, 12, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[0], GroupType.ForStatement, 13, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[0].items[0], GroupType.Terminator, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[1], GroupType.Value, 14, 16, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[1].items[0], GroupType.Reference, 14, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[1].items[0].items[0], GroupType.VariableName, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[1].items[1], GroupType.Token, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1].items[1].items[2], GroupType.Constant, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1], GroupType.ForScope, 18, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 18, 19, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1].items[0].items[0], GroupType.Statement, 18, 18, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1].items[0].items[1], GroupType.Terminator, 19, 19, true, 0);
    });


    test(`#2.13.9 for error 2`, async () => {
        const gsc = `     
            for (i = 1; i < 5)
            for (i = 1;();i++)   
                break;
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 23, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 23, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Value, 6, 8, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[2], GroupType.Constant, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 10, 23, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 10, 23, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ForDeclaration, 10, 21, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.ForExpression, 11, 21, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0], GroupType.ForStatement, 12, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 12, 14, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 12, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[1], GroupType.ForStatement, 16, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[1].items[0], GroupType.Value, 16, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[1].items[0].items[0], GroupType.Expression, 16, 17, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[2], GroupType.ForStatement, 19, 20, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 19, 20, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 19, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 20, 20, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.ForScope, 22, 23, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 22, 23, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0], GroupType.Statement, 22, 22, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 22, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1], GroupType.Terminator, 23, 23, true, 0);
    });


    test(`#2.13.10 for variable`, async () => {
        const gsc = `for (i = 1; variable; i++) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 12, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 12, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 10, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 6, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.ForStatement, 8, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 8, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 8, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 11, 12, true, 0);

    });



    test(`#2.13.11 for with function call`, async () => {
        const gsc = `for (i = 1; level isOk(); i++) {}`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 15, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 15, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 13, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.ForStatement, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ForStatement, 6, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Statement, 6, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.FunctionCallWithObject, 6, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[1], GroupType.FunctionCall, 7, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[1].items[0], GroupType.FunctionName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 8, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.ForStatement, 11, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 11, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.Reference, 11, 11, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 14, 15, true, 0);
    });
    
/*

    test(`#2.13.8 deadCode`, async () => {
        const gsc = `for (;;) {   if (1) { i = 1; break; i = 2; }    i = 3;    continue;    i = 4; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.groupenize(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 32, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 32, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Token, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 5, 32, true, 4, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 6, 21, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.IfDeclaration, 6, 9, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Expression, 7, 9, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0], GroupType.Constant, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.IfScope, 10, 21, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 11, 14, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0], GroupType.Statement, 11, 13, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.VariableReference, 11, 11, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.Token, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[1], GroupType.Token, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[1], GroupType.TerminatedStatement, 15, 16, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[1].items[0], GroupType.Statement, 15, 15, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[1].items[0].items[0], GroupType.ReservedKeyword, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[1].items[1], GroupType.Token, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2], GroupType.TerminatedStatement, 17, 20, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2].items[0], GroupType.Statement, 17, 19, true, 3, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2].items[0].items[0], GroupType.VariableReference, 17, 17, true, 1, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 17, 17, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2].items[0].items[1], GroupType.Token, 18, 18, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2].items[0].items[2], GroupType.Constant, 19, 19, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[2].items[1], GroupType.Token, 20, 20, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.TerminatedStatement, 22, 25, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.Statement, 22, 24, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.VariableReference, 22, 22, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0].items[0], GroupType.VariableName, 22, 22, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1], GroupType.Token, 23, 23, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[2], GroupType.Constant, 24, 24, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.Token, 25, 25, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.TerminatedStatement, 26, 27, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.Statement, 26, 26, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0], GroupType.ReservedKeyword, 26, 26, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1], GroupType.Token, 27, 27, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3], GroupType.TerminatedStatement, 28, 31, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0], GroupType.Statement, 28, 30, true, 3, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[0], GroupType.VariableReference, 28, 28, true, 1, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[0].items[0], GroupType.VariableName, 28, 28, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1], GroupType.Token, 29, 29, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[2], GroupType.Constant, 30, 30, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1], GroupType.Token, 31, 31, true, 0, true);
    });



    test(`#2.13.9 deadCode 2`, async () => {
        const gsc = `for (;;) {  i = 1;    continue;    i = 2;    if (i) {}   i = 4; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.groupenize(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 26, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 26, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForDeclaration, 0, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForExpression, 1, 4, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Token, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForScope, 5, 26, true, 5, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 6, 9, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 6, 8, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.VariableReference, 6, 6, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Token, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.TerminatedStatement, 10, 11, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.Statement, 10, 10, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.ReservedKeyword, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.Token, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.TerminatedStatement, 12, 15, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.Statement, 12, 14, true, 3, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0], GroupType.VariableReference, 12, 12, true, 1, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[0], GroupType.VariableName, 12, 12, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1], GroupType.Token, 13, 13, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[2], GroupType.Constant, 14, 14, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1], GroupType.Token, 15, 15, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3], GroupType.TerminatedStatement, 16, 21, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0], GroupType.IfDeclaration, 16, 19, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[0], GroupType.ReservedKeyword, 16, 16, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1], GroupType.Expression, 17, 19, true, 1, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1].items[0], GroupType.VariableReference, 18, 18, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1].items[0].items[0], GroupType.VariableName, 18, 18, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1], GroupType.IfScope, 20, 21, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4], GroupType.TerminatedStatement, 22, 25, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0], GroupType.Statement, 22, 24, true, 3, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0], GroupType.VariableReference, 22, 22, true, 1, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0].items[0], GroupType.VariableName, 22, 22, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[1], GroupType.Token, 23, 23, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[2], GroupType.Constant, 24, 24, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1], GroupType.Token, 25, 25, true, 0, true);
    });
*/
/*

    test(`#2.13.10 deadCode 2`, async () => {
        const gsc = `for (;;) {  i = 1;    continue;    i = 2;    if (i) {}   i = 4; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.groupenize(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 32, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 32, false, 2, false);

    });*/
});

suite('GscFileParser.parse #2.14 switch', () => {

    test(`#2.14.0 switch 1`, async () => {
        const gsc = `switch(i) { default: break; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.SwitchDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.SwitchScope, 4, 9, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.CaseLabel, 5, 6, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.CaseScope, 7, 8, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.TerminatedStatement, 7, 8, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.Statement, 7, 7, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1], GroupType.Terminator, 8, 8, true, 0, false);
    });

    test(`#2.14.1 switch 2`, async () => {
        const gsc = `switch(i) { case 1: break; case 2: break; default: break; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 19, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 19, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.SwitchDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.SwitchScope, 4, 19, true, 6, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.CaseLabel, 5, 7, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Constant, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[2], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.CaseScope, 8, 9, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.TerminatedStatement, 8, 9, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0], GroupType.Statement, 8, 8, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0].items[1], GroupType.Terminator, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.CaseLabel, 10, 12, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.ReservedKeyword, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1], GroupType.Constant, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[2], GroupType.Token, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3], GroupType.CaseScope, 13, 14, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0], GroupType.TerminatedStatement, 13, 14, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[0], GroupType.Statement, 13, 13, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[0].items[0], GroupType.ReservedKeyword, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0].items[1], GroupType.Terminator, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4], GroupType.CaseLabel, 15, 16, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0], GroupType.ReservedKeyword, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1], GroupType.Token, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[5], GroupType.CaseScope, 17, 18, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[5].items[0], GroupType.TerminatedStatement, 17, 18, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[5].items[0].items[0], GroupType.Statement, 17, 17, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[5].items[0].items[0].items[0], GroupType.ReservedKeyword, 17, 17, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[5].items[0].items[1], GroupType.Terminator, 18, 18, true, 0, false);
    });

    test(`#2.14.2 switch 3`, async () => {
        const gsc = `switch(i) { case 1: case 2: i = 0; break; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 17, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 17, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.SwitchDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.SwitchScope, 4, 17, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.CaseLabel, 5, 7, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Constant, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[2], GroupType.Token, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.CaseLabel, 8, 10, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.ReservedKeyword, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.Constant, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[2], GroupType.Token, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.CaseScope, 11, 16, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.TerminatedStatement, 11, 14, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0], GroupType.Statement, 11, 13, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[0], GroupType.Reference, 11, 11, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[1], GroupType.Token, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[2], GroupType.Constant, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1], GroupType.Terminator, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1], GroupType.TerminatedStatement, 15, 16, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0], GroupType.Statement, 15, 15, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[0].items[0], GroupType.ReservedKeyword, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[1].items[1], GroupType.Terminator, 16, 16, true, 0, false);
    });

    test(`#2.14.3 switch unexpected token`, async () => {
        const gsc = `switch(i) { i = 0; case 1: i = 1; case 2: i = 2; break; i = 3; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);
        
        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 29, false, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 29, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.SwitchDeclaration, 0, 3, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Reference, 2, 2, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.VariableName, 2, 2, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.SwitchScope, 4, 29, true, 5, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 5, 8, false, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 5, 7, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 5, 5, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 5, 5, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 6, 6, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 7, 7, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 8, 8, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.CaseLabel, 9, 11, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[0], GroupType.ReservedKeyword, 9, 9, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[1], GroupType.Constant, 10, 10, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1].items[2], GroupType.Token, 11, 11, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.CaseScope, 12, 15, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0], GroupType.TerminatedStatement, 12, 15, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0], GroupType.Statement, 12, 14, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[0], GroupType.Reference, 12, 12, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 12, 12, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[1], GroupType.Token, 13, 13, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[0].items[2], GroupType.Constant, 14, 14, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2].items[0].items[1], GroupType.Terminator, 15, 15, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3], GroupType.CaseLabel, 16, 18, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[0], GroupType.ReservedKeyword, 16, 16, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[1], GroupType.Constant, 17, 17, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3].items[2], GroupType.Token, 18, 18, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4], GroupType.CaseScope, 19, 28, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0], GroupType.TerminatedStatement, 19, 22, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0], GroupType.Statement, 19, 21, true, 3, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0].items[0], GroupType.Reference, 19, 19, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0].items[0].items[0], GroupType.VariableName, 19, 19, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0].items[1], GroupType.Token, 20, 20, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[0].items[2], GroupType.Constant, 21, 21, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[0].items[1], GroupType.Terminator, 22, 22, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1], GroupType.TerminatedStatement, 23, 24, true, 2, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1].items[0], GroupType.Statement, 23, 23, true, 1, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1].items[0].items[0], GroupType.ReservedKeyword, 23, 23, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[1].items[1], GroupType.Terminator, 24, 24, true, 0, false);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2], GroupType.TerminatedStatement, 25, 28, true, 2, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2].items[0], GroupType.Statement, 25, 27, true, 3, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2].items[0].items[0], GroupType.Reference, 25, 25, true, 1, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2].items[0].items[0].items[0], GroupType.VariableName, 25, 25, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2].items[0].items[1], GroupType.Token, 26, 26, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2].items[0].items[2], GroupType.Constant, 27, 27, true, 0, true);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[4].items[2].items[1], GroupType.Terminator, 28, 28, true, 0, true);
    });

});


suite('GscFileParser.parse #2.15 preprocessors', () => {

    test(`#2.15.0 include`, async () => {
        const gsc = `#include maps\\mp\\gametypes\\global\\_global;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 10, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedPreprocessorStatement, 0, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.PreprocessorStatement, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Path, 1, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 10, 10, true, 0);
    });

 
    test(`#2.15.1 using_animtree`, async () => {
        const gsc = `#using_animtree ("generic_human");`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedPreprocessorStatement, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.PreprocessorStatement, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.PreprocessorAnimtreeParametersExpression, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Expression, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
    }); 

 
    test(`#2.15.2 animtree`, async () => {
        const gsc = `tree = #animtree;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 3, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 2, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Constant, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.ReservedKeyword, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 3, 3, true, 0);
    });   

});


suite('GscFileParser.parse #2.16 terminators', () => {

    
    test(`#2.16.0 not needed terminator`, async () => {
        const gsc = `func() { ; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.ExtraTerminator, 4, 4, true, 0);
    });

    test(`#2.16.1 double-terminated statements`, async () => {
        const gsc = `func() { var1 = 1;; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[2], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.ExtraTerminator, 8, 8, true, 0);
    });
    
    test(`#2.16.2 as statement`, async () => {
        const gsc = `func() { for(;;); }`; // its is not valid syntax
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 10, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.ForDeclaration, 4, 8, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.ForExpression, 5, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.ForStatement, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0], GroupType.Terminator, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[1], GroupType.ForStatement, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[1].items[0], GroupType.Terminator, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.Terminator, 9, 9, false, 0);
    });
    
    test(`#2.16.3 in switch`, async () => {
        const gsc = `switch(a) { ; }`; 
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.SwitchDeclaration, 0, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Expression, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.SwitchScope, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.Terminator, 5, 5, false, 0);
    });
    
    test(`#2.16.4 in root`, async () => {
        const gsc = `; func() {} ;`; 
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Terminator, 0, 0, false, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.FunctionDefinition, 1, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.FunctionDeclaration, 1, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.FunctionName, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.FunctionParametersExpression, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.FunctionScope, 4, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.Terminator, 6, 6, false, 0);
    });
    
    test(`#2.16.5 no body - if`, async () => {
        const gsc = `func() { if(1); } `; // its is not valid syntax
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.IfDeclaration, 4, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Expression, 5, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.Terminator, 8, 8, false, 0);
    });
    
    test(`#2.16.6 no body - if else`, async () => {
        const gsc = `func() { if(1);else; } `; // its is not valid syntax
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 11, true, 4);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.IfDeclaration, 4, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.ReservedKeyword, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Expression, 5, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[1], GroupType.Terminator, 8, 8, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[2], GroupType.ReservedKeyword, 9, 9, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[3], GroupType.Terminator, 10, 10, false, 0);
    });

    
    test(`#2.16.7 if with developer single statement`, async () => {
        const gsc = `func() {	if (1) /#a = 1;#/ } `; 
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 14, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.IfDeclaration, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1], GroupType.Expression, 5, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[1].items[0], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.IfScope, 8, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0], GroupType.DeveloperBlockInner, 8, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0], GroupType.TerminatedStatement, 9, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.Statement, 9, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.Reference, 9, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[1], GroupType.Token, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[0].items[2], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.Terminator, 12, 12, true, 0);
    });
});

suite('GscFileParser.parse #2.17 function definition', () => {

    
    test(`#2.17.0 no param`, async () => {
        const gsc = `func() { func(); }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.FunctionDefinition, 0, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.FunctionDeclaration, 0, 2, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.FunctionName, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.FunctionParametersExpression, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.FunctionScope, 3, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0], GroupType.TerminatedStatement, 4, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0], GroupType.Statement, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0], GroupType.FunctionCall, 4, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[0], GroupType.FunctionName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });

  
});


suite('GscFileParser.parse #2.18 xanim', () => {


    test(`#2.18.1 xanim string`, async () => {
        const gsc = `anim = %player_armored_car_shellshock_explosion; var1 = 1%bbb;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 10, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Constant, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.XAnim, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 5, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 5, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Value, 7, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0], GroupType.Constant, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2], GroupType.Reference, 9, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[2].items[0], GroupType.VariableName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 10, 10, true, 0);
    }); 
    
    test(`#2.18.2 xanim comparasion`, async () => {
        const gsc = `var1 = %aaa == %bbb;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Constant, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.XAnim, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Constant, 5, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.XAnim, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });


});





suite('GscFileParser.parse #2.19 casting', () => {


    test(`#2.19.1`, async () => {
        const gsc = `aaa = (int)1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.CastExpression, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.DataTypeKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 6, 6, true, 0);
    });

    test(`#2.19.2`, async () => {
        const gsc = `v = 1 + (int) + (int)int + !(int)int;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 18, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 17, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 17, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Value, 2, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Value, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[2], GroupType.Value, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[2].items[0], GroupType.Expression, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[2].items[0].items[0], GroupType.Reference, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[2].items[0].items[0].items[0], GroupType.VariableName, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2], GroupType.Value, 8, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2].items[0], GroupType.CastExpression, 8, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2].items[0].items[0], GroupType.DataTypeKeyword, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2].items[1], GroupType.Reference, 11, 11, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2].items[1].items[0], GroupType.VariableName, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Value, 13, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Token, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Value, 14, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[0], GroupType.CastExpression, 14, 16, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[0].items[0], GroupType.DataTypeKeyword, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[1], GroupType.Reference, 17, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[1].items[0], GroupType.VariableName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 18, 18, true, 0);
    }); 
    

    test(`#2.19.3`, async () => {
        const gsc = `i = (float)((int)1);`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 10, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.CastExpression, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.DataTypeKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Value, 5, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0], GroupType.Expression, 5, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0], GroupType.Value, 6, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0].items[0], GroupType.CastExpression, 6, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0].items[0].items[0], GroupType.DataTypeKeyword, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0].items[1], GroupType.Constant, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 11, 11, true, 0);
    });
    

    test(`#2.19.4`, async () => {
        const gsc = `i = (string)(bool)(float)(int)1;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 15, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 14, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Value, 2, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.CastExpression, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.DataTypeKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Value, 5, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0], GroupType.CastExpression, 5, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[0].items[0], GroupType.DataTypeKeyword, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1], GroupType.Value, 8, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1].items[0], GroupType.CastExpression, 8, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1].items[0].items[0], GroupType.DataTypeKeyword, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1].items[1], GroupType.Value, 11, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1].items[1].items[0], GroupType.CastExpression, 11, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1].items[1].items[0].items[0], GroupType.DataTypeKeyword, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1].items[1].items[1].items[1], GroupType.Constant, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 15, 15, true, 0);
    }); 

});





suite("GscFileParser.parse #2.20 groupOnLeft", () => {
    test("#2.20.1 groupOnLeft field", async () => {
        const gsc = `func() { var1.field = 1; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        var position = new vscode.Position(0, 19); // 19 = var1.field|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.StructureField, 6, 6, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1.field", "Invalid variable name 1: " + varName);

        var position = new vscode.Position(0, 20); // 20 = var1.field |
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.StructureField, 6, 6, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1.field", "Invalid variable name 2: " + varName);

        var position = new vscode.Position(0, 15); // 15 = var1.f|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.StructureField, 6, 6, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1.f", "Invalid variable name 3: " + varName);

        var position = new vscode.Position(0, 14); // 14 = var1.|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.Token, 5, 5, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1.", "Invalid variable name 4: " + varName);

        var position = new vscode.Position(0, 13); // 13 = var1|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.VariableName, 4, 4, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1", "Invalid variable name 5: " + varName);

        //assert.ok(false, GscFileParser.debugAsString(tokens, rootGroup, true) + "\n\n" + GscFileParser.debugAsString(tokens, groupAtCursor!, true));
    });

    test("#2.20.2 groupOnLeft array", async () => {
        const gsc = `func() { var1["aa"] = 1; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        var position = new vscode.Position(0, 19); // 19 = var1["aa"]|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 5, 7, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1[\"aa\"]", "Invalid variable name 1: " + varName);
        
        var position = new vscode.Position(0, 20); // 20 = var1["aa"] |
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 5, 7, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1[\"aa\"]", "Invalid variable name 2: " + varName);
        
        var position = new vscode.Position(0, 15); // 15 = var1["|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.Constant, 6, 6, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "", "Invalid variable name 3: " + varName); // empty becuase " is in array and it is not variable name

        var position = new vscode.Position(0, 14); // 14 = var1[|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 5, 7, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1[", "Invalid variable name 4: " + varName);

        var position = new vscode.Position(0, 13); // 13 = var1|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.VariableName, 4, 4, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "var1", "Invalid variable name 5: " + varName);

        //assert.ok(false, GscFileParser.debugAsString(tokens, rootGroup, true) + "\n\n" + GscFileParser.debugAsString(tokens, groupAtCursor!, true));
    });

    test("#2.20.3 groupOnLeft array 2", async () => {
        const gsc = `func() { v1["a"][0] = 1; }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        var position = new vscode.Position(0, 19);// 19 = v1["a"][0]|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 8, 10, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[\"a\"][0]", "Invalid variable name 1: " + varName);
        
        var position = new vscode.Position(0, 20); // 20 = v1["a"][0] |
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 8, 10, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[\"a\"][0]", "Invalid variable name 2: " + varName);
        
        var position = new vscode.Position(0, 18); // 18 = v1["a"][0|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.Constant, 9, 9, true, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "", "Invalid variable name 3: " + varName); // empty because 0 is in array scope and its not variable name

        var position = new vscode.Position(0, 17); // 17 = v1["a"][|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 8, 10, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[\"a\"][", "Invalid variable name 4: " + varName); 
        
        var position = new vscode.Position(0, 16); // 16 = v1["a"]|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); 
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 5, 7, true, 1);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[\"a\"]", "Invalid variable name 5: " + varName);
        
        //assert.ok(false, GscFileParser.debugAsString(tokens, rootGroup, true) + "\n\n" + GscFileParser.debugAsString(tokens, groupAtCursor!, true));
    });
    

    test("#2.20.4 groupOnLeft array 3", async () => {
        const gsc = `func() { v1[ }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        var position = new vscode.Position(0, 12); // 12 = v1[|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position);
        checkGroup2(rootGroup, groupAtCursor, GroupType.Unknown, 5, 5, false, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[", "Invalid variable name: " + varName);

        var position = new vscode.Position(0, 13); // 13 = v1[ |
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position);
        checkGroup2(rootGroup, groupAtCursor, GroupType.Unknown, 5, 5, false, 0);
        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[", "Invalid variable name: " + varName);
    });
    

    test("#2.20.5 groupOnLeft array 4", async () => {
        const gsc = `func() { v1[v2[] }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        const position = new vscode.Position(0, 15); // 15 = v1[v2[|
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position);
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 7, 8, false, 0);

        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v2[", "Invalid variable name: " + varName);
    });
    

    test("#2.20.6 groupOnLeft array 5", async () => {
        const gsc = `func() { v1[] }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        const position = new vscode.Position(0, 12);
        var groupAtCursor = rootGroup.findGroupOnLeftAtPosition(position); // 12 = v1[|
        checkGroup2(rootGroup, groupAtCursor, GroupType.ArrayAccess, 5, 6, false, 0);

        var varName = groupAtCursor!.getVariableStringBeforePosition(position);
        assert.ok(varName === "v1[", "Invalid variable name: " + varName);
    });
});










suite("GscFileParser.parse #2.21 variable type", () => {

    test("#2.21.1 variable type", async () => {

        const gsc = `
func() { 
    field1 = [];
    field1 = "";
    field1 = &""; 
    field1 = #"";  // only for COD:BO1
    field1 = 1; 
    field1 = 1.1;  
    field1 = undefined;
    field1 = ::func;
    field1 = func();
    field1 = spawnstruct();
    field1 = spawn();
    field1 = getdvar();
    field1 = (1, 0.5, 0);
    field1 = true;
    field1 = false;
    field1 = 1 + 1;
    field1 = !field1;
    field1 = field1;
    field1 = level.field1;
    field1 = mptype\\german_winterdark::main;
	tree = #animtree;
	anim = %player_armored_car_shellshock_explosion;
}
`;
        const gscData = GscFileParser.parse(gsc);

        assert.ok(gscData.functions.length === 1, "Func does not have 1 function");

        var locals = gscData.functions[0].localVariableDefinitions;

        var i = 0;
        checkLocalVar(i++, GscVariableDefinitionType.Array);
        checkLocalVar(i++, GscVariableDefinitionType.String);
        checkLocalVar(i++, GscVariableDefinitionType.LocalizedString);
        checkLocalVar(i++, GscVariableDefinitionType.CvarString);
        checkLocalVar(i++, GscVariableDefinitionType.Integer);
        checkLocalVar(i++, GscVariableDefinitionType.Float);
        checkLocalVar(i++, GscVariableDefinitionType.Undefined);
        checkLocalVar(i++, GscVariableDefinitionType.Function);
        checkLocalVar(i++, GscVariableDefinitionType.UnknownValueFromFunction); // not resolved yet
        checkLocalVar(i++, GscVariableDefinitionType.Structure);
        checkLocalVar(i++, GscVariableDefinitionType.Entity);
        checkLocalVar(i++, GscVariableDefinitionType.String);
        checkLocalVar(i++, GscVariableDefinitionType.Vector);
        checkLocalVar(i++, GscVariableDefinitionType.Bool);
        checkLocalVar(i++, GscVariableDefinitionType.Bool);
        checkLocalVar(i++, GscVariableDefinitionType.UnknownValue);
        checkLocalVar(i++, GscVariableDefinitionType.UnknownValue);
        checkLocalVar(i++, GscVariableDefinitionType.UnknownValueFromVariable); // not resolved yet
        checkLocalVar(i++, GscVariableDefinitionType.UnknownValueFromVariable); // not resolved yet
        checkLocalVar(i++, GscVariableDefinitionType.Function);
        checkLocalVar(i++, GscVariableDefinitionType.XAnim);
        checkLocalVar(i++, GscVariableDefinitionType.XAnim);

        function checkLocalVar(index: number, expectedType: GscVariableDefinitionType) {
            assert.ok(locals[index].type === expectedType, "Unexpected type on index " + index + ". Current: " + GscVariableDefinitionType[locals[index].type] + " Expected: " + GscVariableDefinitionType[expectedType]);
        }

        
        //assert.ok(false, GscFileParser.debugAsString(tokens, rootGroup, true) + "\n\n" + GscFileParser.debugAsString(tokens, groupAtCursor!, true));
    });


});










suite("GscFileParser.parse #2.22 foreach", () => {

    test("#2.22.1 foreach", async () => {
        const gsc = `foreach(value in array) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ReservedKeyword, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Identifier, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 6, 7, true, 0);
    });

    test("#2.22.2 foreach", async () => {
        const gsc = `foreach(value, key in array) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 7, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3], GroupType.ReservedKeyword, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0], GroupType.Identifier, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 8, 9, true, 0);
    });

    test("#2.22.3 foreach", async () => {
        const gsc = `foreach(value, key in level.array) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 11, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 11, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 9, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3], GroupType.ReservedKeyword, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0], GroupType.Identifier, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4], GroupType.Reference, 6, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[2], GroupType.StructureField, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 10, 11, true, 0);
    });

    test("#2.22.4 foreach", async () => {
        const gsc = `foreach(value, key in level getArray()) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 12, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 12, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 10, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3], GroupType.ReservedKeyword, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0], GroupType.Identifier, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4], GroupType.Reference, 6, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0], GroupType.FunctionCallWithObject, 6, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0].items[1], GroupType.FunctionCall, 7, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0].items[1].items[0], GroupType.FunctionName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 8, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 11, 12, true, 0);
    });

    test("#2.22.5 foreach", async () => {
        const gsc = `foreach(value in level.array) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 7, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ReservedKeyword, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Identifier, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.Reference, 4, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[2], GroupType.StructureField, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 8, 9, true, 0);
    });

    test("#2.22.6 foreach", async () => {
        const gsc = `foreach(value in array unknown) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 6, true, 4);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ReservedKeyword, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Identifier, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3], GroupType.Identifier, 5, 5, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 7, 8, true, 0);
    });

    test("#2.22.7 foreach", async () => {
        const gsc = `foreach(value, key in array unknown) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 10, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 10, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 8, true, 6);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3], GroupType.ReservedKeyword, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0], GroupType.Identifier, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[4].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[5], GroupType.Identifier, 7, 7, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 9, 10, true, 0);
    });

    test("#2.22.8 foreach", async () => {
        const gsc = `foreach(value in ) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ReservedKeyword, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Identifier, 3, 3, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 5, 6, true, 0);
    });

    test("#2.22.9 foreach", async () => {
        const gsc = `foreach(value in ) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 6, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ReservedKeyword, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Identifier, 3, 3, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 5, 6, true, 0);
    });

    test("#2.22.10 foreach", async () => {
        const gsc = `foreach(value, key) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.VariableName, 4, 4, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 6, 7, true, 0);
    });

    test("#2.22.11 foreach", async () => {
        const gsc = `foreach(value in get_players()) { }`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.ForEachDeclaration, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.ForEachExpression, 1, 7, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.ReservedKeyword, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Identifier, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.Reference, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.FunctionCall, 4, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.FunctionName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[1], GroupType.FunctionParametersExpression, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.ForEachScope, 8, 9, true, 0);
    });

});











suite("GscFileParser.parse #2.23 ternary", () => {

    test("#2.23.1 ternary", async () => {
        const gsc = `var = true ? true : false;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 6, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Constant, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });

    test("#2.23.2 ternary", async () => {
        const gsc = `var1 = var2 ? var3 : var4;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 6, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Reference, 4, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.VariableName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });

    test("#2.23.3 ternary", async () => {
        const gsc = `var = level.var1 ? level.var2 : level.var3;`;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 12, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 2, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Reference, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.VariableName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2], GroupType.StructureField, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Reference, 6, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Reference, 6, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[2], GroupType.StructureField, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Reference, 10, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Reference, 10, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.VariableName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.Token, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[2], GroupType.StructureField, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
    });

    test("#2.23.4 ternary", async () => {
        const gsc = `
    var = (true) ? (true) : (false);
    var = (var2 ? var3 : var4);
    var = (level.var1 ? level.var2 : level.var3);
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 39, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 12, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Value, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Expression, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Value, 6, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Expression, 6, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0].items[0], GroupType.Constant, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Value, 10, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Expression, 10, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 14, 23, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 14, 22, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 14, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Value, 16, 22, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0], GroupType.Expression, 16, 22, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0], GroupType.Ternary, 17, 21, true, 5);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[0], GroupType.Reference, 17, 17, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[1], GroupType.Token, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[2], GroupType.Reference, 19, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[2].items[0], GroupType.VariableName, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[3], GroupType.Token, 20, 20, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[4], GroupType.Reference, 21, 21, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2].items[0].items[0].items[4].items[0], GroupType.VariableName, 21, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 23, 23, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2], GroupType.TerminatedStatement, 24, 39, true, 2);
        checkGroup2(rootGroup, rootGroup.items[2].items[0], GroupType.Statement, 24, 38, true, 3);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0], GroupType.Reference, 24, 24, true, 1);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[0].items[0], GroupType.VariableNameGlobal, 24, 24, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[1], GroupType.Token, 25, 25, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2], GroupType.Value, 26, 38, true, 1);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0], GroupType.Expression, 26, 38, true, 1);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0].items[0], GroupType.Ternary, 27, 37, true, 5);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0].items[0].items[0], GroupType.Reference, 27, 29, true, 3);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0].items[0].items[1], GroupType.Token, 30, 30, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0].items[0].items[2], GroupType.Reference, 31, 33, true, 3);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0].items[0].items[3], GroupType.Token, 34, 34, true, 0);
        checkGroup2(rootGroup, rootGroup.items[2].items[0].items[2].items[0].items[0].items[4], GroupType.Reference, 35, 37, true, 3);
        checkGroup2(rootGroup, rootGroup.items[2].items[1], GroupType.Terminator, 39, 39, true, 0);
    });

    test("#2.23.5 ternary", async () => {
        const gsc = `
var = isDefined( trig ) ? trig has_spawnflag( 256 ) : level someOtherValue();
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 17, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 17, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 16, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 16, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.FunctionCall, 2, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.FunctionName, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.FunctionParametersExpression, 3, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0], GroupType.FunctionParameterName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCallWithObject, 7, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionCall, 8, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[0], GroupType.FunctionName, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[1], GroupType.FunctionParametersExpression, 9, 11, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[1].items[0], GroupType.Constant, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.FunctionCallWithObject, 13, 16, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Reference, 13, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.VariableName, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.FunctionCall, 14, 16, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[0], GroupType.FunctionName, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1], GroupType.FunctionParametersExpression, 15, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 17, 17, true, 0);
    });

    test("#2.23.6 ternary", async () => {
        const gsc = `
var = -1 == -1 ? -1 : -2;
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 13, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 13, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 12, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 12, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Value, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Value, 2, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.Token, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[1], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2], GroupType.Value, 5, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2].items[0], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2].items[1], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Value, 8, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Constant, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Value, 11, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Token, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.Constant, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 13, 13, true, 0);
    });

    test("#2.23.7 ternary", async () => {
        const gsc = `
var = (self f1() + self f2()) > 5 ? self f_true() : self f_false(arg1, v ? 1 : 0);
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 32, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 32, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 31, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.Ternary, 2, 31, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Value, 2, 14, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Value, 2, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.Expression, 2, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0], GroupType.Value, 3, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0], GroupType.FunctionCallWithObject, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.Reference, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[0].items[0], GroupType.VariableName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[1], GroupType.FunctionCall, 4, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[1].items[0], GroupType.FunctionName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[2], GroupType.FunctionCallWithObject, 8, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[2].items[0], GroupType.Reference, 8, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[2].items[0].items[0], GroupType.VariableName, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[2].items[1], GroupType.FunctionCall, 9, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[2].items[1].items[0], GroupType.FunctionName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0].items[0].items[2].items[1].items[1], GroupType.FunctionParametersExpression, 10, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Token, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2], GroupType.Constant, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCallWithObject, 16, 19, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Reference, 16, 16, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionCall, 17, 19, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[0], GroupType.FunctionName, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[1], GroupType.FunctionParametersExpression, 18, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 20, 20, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.FunctionCallWithObject, 21, 31, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Reference, 21, 21, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.VariableName, 21, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.FunctionCall, 22, 31, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[0], GroupType.FunctionName, 22, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1], GroupType.FunctionParametersExpression, 23, 31, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[0], GroupType.FunctionParameterName, 24, 24, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[1], GroupType.Token, 25, 25, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2], GroupType.Ternary, 26, 30, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2].items[0], GroupType.Reference, 26, 26, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2].items[0].items[0], GroupType.VariableName, 26, 26, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2].items[1], GroupType.Token, 27, 27, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2].items[2], GroupType.Constant, 28, 28, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2].items[3], GroupType.Token, 29, 29, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1].items[2].items[4], GroupType.Constant, 30, 30, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 32, 32, true, 0);
    });
});





suite("GscFileParser.parse #2.25 do while", () => {

    test("#2.25.1 do while", async () => {
        const gsc = `
do {} while (bPredictMore);
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.DoDeclaration, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.DoScope, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.DoWhileDeclaration, 3, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.WhileDeclaration, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Expression, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0], GroupType.Reference, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0].items[0], GroupType.VariableName, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });

    test("#2.25.2 do while without {}", async () => {
        const gsc = `
do a(); while(true);
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 9, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 9, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.DoDeclaration, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.DoScope, 1, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.TerminatedStatement, 1, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 1, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.FunctionCall, 1, 3, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.FunctionName, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[1], GroupType.FunctionParametersExpression, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.DoWhileDeclaration, 5, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.WhileDeclaration, 5, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Expression, 6, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0], GroupType.Constant, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 9, 9, true, 0);
    });

    test("#2.25.3 do while inner", async () => {
        const gsc = `
    do {
        do {} while (a);
    } while (a);
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 15, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 15, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 14, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.DoDeclaration, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.DoScope, 1, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.TerminatedStatement, 2, 9, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 8, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.DoDeclaration, 2, 2, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[1], GroupType.DoScope, 3, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2], GroupType.DoWhileDeclaration, 5, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2].items[0], GroupType.WhileDeclaration, 5, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2].items[0].items[1], GroupType.Expression, 6, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2].items[0].items[1].items[0], GroupType.Reference, 7, 7, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[2].items[0].items[1].items[0].items[0], GroupType.VariableName, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.DoWhileDeclaration, 11, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.WhileDeclaration, 11, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Expression, 12, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0], GroupType.Reference, 13, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0].items[0], GroupType.VariableName, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 15, 15, true, 0);
    });

    test("#2.25.4 do while missing ;", async () => {
        const gsc = `
do {} while (true)
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 6, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.Statement, 0, 6, false, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.DoDeclaration, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.DoScope, 1, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2], GroupType.DoWhileDeclaration, 3, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0], GroupType.WhileDeclaration, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[1], GroupType.Expression, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[2].items[0].items[1].items[0], GroupType.Constant, 5, 5, true, 0);
    });


    test("#2.25.5 do while complex", async () => {
        const gsc = `
    do 
    {
        thread getNotetrack(notifyName);
        bPredictMore = self PredictAnim(true);
        self notify(notifyName); // make notetrack be undefined if no anim notify occurs
        if (isdefined(notetrack))
        {
            if (notetrack == "end")
                return true;
        }
    } while (bPredictMore);
    
    aa = 1;
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 49, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 45, false, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 44, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.DoDeclaration, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.DoScope, 1, 40, true, 4);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0], GroupType.TerminatedStatement, 2, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0], GroupType.Statement, 2, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0], GroupType.FunctionCallWithThread, 2, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[0], GroupType.ReservedKeyword, 2, 2, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[1], GroupType.FunctionCall, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[1].items[0], GroupType.FunctionName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 4, 6, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[0].items[0].items[1].items[1].items[0], GroupType.FunctionParameterName, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1], GroupType.TerminatedStatement, 8, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0], GroupType.Statement, 8, 14, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0], GroupType.Reference, 8, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[0].items[0], GroupType.VariableName, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[1], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2], GroupType.FunctionCallWithObject, 10, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2].items[0], GroupType.Reference, 10, 10, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2].items[0].items[0], GroupType.VariableName, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2].items[1], GroupType.FunctionCall, 11, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2].items[1].items[0], GroupType.FunctionName, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2].items[1].items[1], GroupType.FunctionParametersExpression, 12, 14, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[0].items[2].items[1].items[1].items[0], GroupType.Constant, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[1].items[1], GroupType.Terminator, 15, 15, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2], GroupType.TerminatedStatement, 16, 21, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0], GroupType.Statement, 16, 20, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0], GroupType.KeywordCallWithObject, 16, 20, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0], GroupType.Reference, 16, 16, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[0].items[0], GroupType.VariableName, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[1], GroupType.KeywordCall, 17, 20, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[1].items[0], GroupType.ReservedKeyword, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[1].items[1], GroupType.KeywordParametersExpression, 18, 20, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[1].items[1].items[0], GroupType.Reference, 19, 19, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[0].items[0].items[1].items[1].items[0].items[0], GroupType.VariableName, 19, 19, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[2].items[1], GroupType.Terminator, 21, 21, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3], GroupType.TerminatedStatement, 22, 39, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0], GroupType.IfDeclaration, 22, 28, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0].items[0], GroupType.ReservedKeyword, 22, 22, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0].items[1], GroupType.Expression, 23, 28, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0].items[1].items[0], GroupType.FunctionCall, 24, 27, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0].items[1].items[0].items[0], GroupType.FunctionName, 24, 24, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0].items[1].items[0].items[1], GroupType.FunctionParametersExpression, 25, 27, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[0].items[1].items[0].items[1].items[0], GroupType.FunctionParameterName, 26, 26, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1], GroupType.IfScope, 29, 39, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0], GroupType.TerminatedStatement, 30, 38, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0], GroupType.IfDeclaration, 30, 35, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 30, 30, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[1], GroupType.Expression, 31, 35, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[1].items[0], GroupType.Value, 32, 34, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[1].items[0].items[0], GroupType.Reference, 32, 32, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[1].items[0].items[0].items[0], GroupType.VariableName, 32, 32, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[1].items[0].items[1], GroupType.Token, 33, 33, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[0].items[1].items[0].items[2], GroupType.Constant, 34, 34, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[1], GroupType.IfScope, 36, 38, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[1].items[0], GroupType.TerminatedStatement, 36, 38, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[1].items[0].items[0], GroupType.Statement, 36, 37, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[1].items[0].items[0].items[0], GroupType.ReservedKeyword, 36, 36, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[1].items[0].items[0].items[1], GroupType.Constant, 37, 37, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1].items[3].items[1].items[0].items[1].items[0].items[1], GroupType.Terminator, 38, 38, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.DoWhileDeclaration, 41, 44, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.WhileDeclaration, 41, 44, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.ReservedKeyword, 41, 41, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Expression, 42, 44, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0], GroupType.Reference, 43, 43, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0].items[0], GroupType.VariableName, 43, 43, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 45, 45, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1], GroupType.TerminatedStatement, 46, 49, true, 2);
        checkGroup2(rootGroup, rootGroup.items[1].items[0], GroupType.Statement, 46, 48, true, 3);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0], GroupType.Reference, 46, 46, true, 1);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[0].items[0], GroupType.VariableNameGlobal, 46, 46, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[1], GroupType.Token, 47, 47, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[0].items[2], GroupType.Constant, 48, 48, true, 0);
        checkGroup2(rootGroup, rootGroup.items[1].items[1], GroupType.Terminator, 49, 49, true, 0);
    });



});






suite("GscFileParser.parse #2.26 array initializer", () => {

    test("#2.26.1 array initializer", async () => {
        const gsc = `
array = [];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
    });


    test("#2.26.2 array initializer", async () => {
        const gsc = `
array = [ ];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 4, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 3, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 4, 4, true, 0);
    });


    test("#2.26.3 array initializer", async () => {
        const gsc = `
array = ["a", "b"];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 7, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 6, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 7, 7, true, 0);
    });


    test("#2.26.4 array initializer", async () => {
        const gsc = `
array = [-1, -2, -3];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 12, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 11, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 11, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Value, 3, 4, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Token, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Value, 6, 7, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Constant, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Value, 9, 10, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Token, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.Constant, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 12, 12, true, 0);
    });


    test("#2.26.5 array initializer", async () => {
        const gsc = `
array = [var1, level.var2, game["0"]];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 14, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 14, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 13, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 13, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Reference, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.VariableName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Reference, 5, 7, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Reference, 5, 5, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[2], GroupType.StructureField, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Reference, 9, 12, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Reference, 9, 9, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.VariableName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.ArrayAccess, 10, 12, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[0], GroupType.Constant, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 14, 14, true, 0);
    });


    test("#2.26.6 array initializer", async () => {
        const gsc = `
array = [self a(), self b(), level d()];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 18, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 18, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 17, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 17, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.FunctionCallWithObject, 3, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Reference, 3, 3, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0].items[0], GroupType.VariableName, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.FunctionCall, 4, 6, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[0], GroupType.FunctionName, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1].items[1], GroupType.FunctionParametersExpression, 5, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.FunctionCallWithObject, 8, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Reference, 8, 8, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0].items[0], GroupType.VariableName, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.FunctionCall, 9, 11, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[0], GroupType.FunctionName, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1].items[1], GroupType.FunctionParametersExpression, 10, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.FunctionCallWithObject, 13, 16, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Reference, 13, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.VariableName, 13, 13, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.FunctionCall, 14, 16, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[0], GroupType.FunctionName, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1].items[1], GroupType.FunctionParametersExpression, 15, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 18, 18, true, 0);
    });


    test("#2.26.7 array initializer", async () => {
        const gsc = `
array = [1+1, 4 / 2, (5)];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 15, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 15, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 14, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 14, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Value, 3, 5, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Value, 7, 9, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Constant, 7, 7, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[2], GroupType.Constant, 9, 9, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.Value, 11, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Expression, 11, 13, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0].items[0], GroupType.Constant, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 15, 15, true, 0);
    });


    test("#2.26.8 array initializer", async () => {
        const gsc = `
array = [ [0, 1], [10, 20], [100, 200] ];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 21, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 21, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 20, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 20, true, 5);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.ArrayInitializer, 3, 7, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[0], GroupType.Constant, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[1], GroupType.Token, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0].items[2], GroupType.Constant, 6, 6, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 8, 8, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.ArrayInitializer, 9, 13, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[0], GroupType.Constant, 10, 10, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[1], GroupType.Token, 11, 11, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2].items[2], GroupType.Constant, 12, 12, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Token, 14, 14, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4], GroupType.ArrayInitializer, 15, 19, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[0], GroupType.Constant, 16, 16, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[1], GroupType.Token, 17, 17, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[4].items[2], GroupType.Constant, 18, 18, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 21, 21, true, 0);
    });


    test("#2.26.9 array initializer - missing", async () => {
        const gsc = `
array = [0, 0, ];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 8, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 8, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 7, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 7, true, 4);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Constant, 3, 3, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[1], GroupType.Token, 4, 4, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[2], GroupType.Constant, 5, 5, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[3], GroupType.Unknown, 6, 6, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 8, 8, true, 0);
    });


    test("#2.26.10 array initializer - missing", async () => {
        const gsc = `
array = [,];
        `;
        const tokens = GscFileParser.tokenize(gsc);
        const rootGroup = GscFileParser.group(tokens);

        checkGroup2(rootGroup, rootGroup, GroupType.Root, 0, 5, false, 1);
        checkGroup2(rootGroup, rootGroup.items[0], GroupType.TerminatedStatement, 0, 5, true, 2);
        checkGroup2(rootGroup, rootGroup.items[0].items[0], GroupType.Statement, 0, 4, true, 3);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0], GroupType.Reference, 0, 0, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[0].items[0], GroupType.VariableNameGlobal, 0, 0, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[1], GroupType.Token, 1, 1, true, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2], GroupType.ArrayInitializer, 2, 4, true, 1);
        checkGroup2(rootGroup, rootGroup.items[0].items[0].items[2].items[0], GroupType.Unknown, 3, 3, false, 0);
        checkGroup2(rootGroup, rootGroup.items[0].items[1], GroupType.Terminator, 5, 5, true, 0);
    });


});