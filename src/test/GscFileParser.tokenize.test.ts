import * as assert from 'assert';
import * as vscode from 'vscode';
import { GscFileParser, GscToken, TokenType } from '../GscFileParser';


function tokenEquals(token: GscToken, text: string, commentBefore: string | undefined, type: TokenType) {
    return token.name === text && token.commentBefore === commentBefore && token.type === type;
}


suite('GscFileParser.tokenize #1.1', () => {

    test(`#1.1.1  basic tokens`, async () => {
        const gsc = `/* multiline comment */ main(p1,p2) { v1 = 1; v2 = 2.34; v3 = .1337; v4 = "string"; v5 = "\\"1\\n2\\\\3.4\\""; level.v1 = level.v2; }`;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 36, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "main", " multiline comment ", TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], "p1", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ",", undefined, TokenType.ParameterSeparator));
        assert.ok(tokenEquals(tokens[i++], "p2", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "1", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v2", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "2.34", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v3", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], ".1337", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v4", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "\"string\"", undefined, TokenType.String));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v5", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], '\"\\"1\\n2\\\\3.4\\"\"', undefined, TokenType.String));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "level", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ".", undefined, TokenType.Structure));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "level", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ".", undefined, TokenType.Structure));
        assert.ok(tokenEquals(tokens[i++], "v2", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, TokenType.ScopeEnd));
    });

    test(`#1.1.2 res`, async () => {

    });


    test(`#1.1.3 comments and developer`, async () => {
        const gsc = `
//single line comment
func(){
    /*multiline comment*/
    /#
    // in developer block
    #/
}
/#
developerFunction()
{}
#/
        `;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 14, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "func", "single line comment", TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "/#", "multiline comment", TokenType.DeveloperStart));
        assert.ok(tokenEquals(tokens[i++], "#/", " in developer block", TokenType.DeveloperEnd));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, TokenType.ScopeEnd));
        assert.ok(tokenEquals(tokens[i++], "/#", undefined, TokenType.DeveloperStart));
        assert.ok(tokenEquals(tokens[i++], "developerFunction", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, TokenType.ScopeEnd));
        assert.ok(tokenEquals(tokens[i++], "#/", undefined, TokenType.DeveloperEnd));
    });


    test(`#1.1.4 preprocessors`, async () => {
        const gsc = `
#include maps\\mp\\gametypes\\script;
#using_animtree ("vehicles");
#include //a
//b
scripts\\_string
//c
;
        `;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 19, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "#include", undefined, TokenType.Preprocessor));
        assert.ok(tokenEquals(tokens[i++], "maps", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "mp", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "gametypes", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "script", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "#using_animtree", undefined, TokenType.Preprocessor));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], "\"vehicles\"", undefined, TokenType.String));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "#include", undefined, TokenType.Preprocessor));
        assert.ok(tokenEquals(tokens[i++], "scripts", "b", TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "_string", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", "c", TokenType.Semicolon));
    });

    test(`#1.1.5 function pointers`, async () => {
        const gsc = `a(){} b(){ v1=::a; v2=[[v1]](); }`;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 25, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, TokenType.ScopeEnd));
        assert.ok(tokenEquals(tokens[i++], "b", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "::", undefined, TokenType.FunctionPointer));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v2", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "[", undefined, TokenType.ArrayStart));   
        assert.ok(tokenEquals(tokens[i++], "[", undefined, TokenType.ArrayStart));   
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "]", undefined, TokenType.ArrayEnd));
        assert.ok(tokenEquals(tokens[i++], "]", undefined, TokenType.ArrayEnd));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, TokenType.ScopeEnd));
    });


    test(`#1.1.6 special characters - assigment`, async () => {
        const gsc = `f1(){ a=1; a+=1; a-=2; a*=3; a/=4; a%=5; a|=6; a&=7; a^=8; }`;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 41, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "f1", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "1", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "+=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "1", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "-=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "2", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "*=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "3", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "/=", undefined, TokenType.Assignment2), JSON.stringify(tokens[i-1]));
        assert.ok(tokenEquals(tokens[i++], "4", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "%=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "5", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "|=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "6", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "&=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "7", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "^=", undefined, TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "8", undefined, TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, TokenType.ScopeEnd));
    });

    /** 2-sided operators - chars ('+', '-','*', '/', '%'),   ('|', '&', '^', '<<', '>>')   ('==', '!=', '<', '>', '<=', '>=', '&&', '||')   */
    test(`#1.1.7 special characters - operators`, async () => {
        const gsc = `f1(){ a=1+1-1*1/1%1|1&1^1<<1>>1; b = 1==1 && 1!=1 && 1<1 && 1>1 && 1<=1 && 1>=1 || 1; }`;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;

        var tokensSequence: [string, TokenType][] = [
            ["f1", TokenType.Keyword], ["(", TokenType.ExpressionStart], [")", TokenType.ExpressionEnd], ["{", TokenType.ScopeStart],
            ["a", TokenType.Keyword], ["=", TokenType.Assignment],
            ["1", TokenType.Number], ["+", TokenType.Operator], ["1", TokenType.Number], ["-", TokenType.Operator], ["1", TokenType.Number], ["*", TokenType.Operator],
            ["1", TokenType.Number], ["/", TokenType.Operator], ["1", TokenType.Number], ["%", TokenType.Operator], ["1", TokenType.Number], ["|", TokenType.Operator],
            ["1", TokenType.Number], ["&", TokenType.Operator], ["1", TokenType.Number], ["^", TokenType.Operator], ["1", TokenType.Number], ["<<", TokenType.Operator],
            ["1", TokenType.Number], [">>", TokenType.Operator], ["1", TokenType.Number], [";", TokenType.Semicolon], 
            ["b", TokenType.Keyword], ["=", TokenType.Assignment],
            ["1", TokenType.Number], ["==", TokenType.Operator], ["1", TokenType.Number], ["&&", TokenType.Operator],
            ["1", TokenType.Number], ["!=", TokenType.Operator], ["1", TokenType.Number], ["&&", TokenType.Operator],
            ["1", TokenType.Number], ["<", TokenType.Operator], ["1", TokenType.Number], ["&&", TokenType.Operator],
            ["1", TokenType.Number], [">", TokenType.Operator], ["1", TokenType.Number], ["&&", TokenType.Operator],
            ["1", TokenType.Number], ["<=", TokenType.Operator], ["1", TokenType.Number], ["&&", TokenType.Operator],
            ["1", TokenType.Number], [">=", TokenType.Operator], ["1", TokenType.Number], ["||", TokenType.Operator], ["1", TokenType.Number],
            [";", TokenType.Semicolon], ["}", TokenType.ScopeEnd]
        ];

        assert.ok(tokens.length === tokensSequence.length, "Unexpected number of tokens: " + tokens.length);

        for (var [name, type] of tokensSequence) {
            assert.ok(tokenEquals(tokens[i], name, undefined, type), `Unexpected token(${i}) name:'${tokens[i].name}' or type:'${tokens[i].type}'. Expected name:'${name}', type:'${type}'. ` + JSON.stringify(tokens[i]));
            i++;
        } 

    });


    /** Right-sided operators - chars '++', '--' */
    /** Left-sided operator - char '!', '~' */
    test(`#1.1.8 special characters - right and left sided operators`, async () => {
        const gsc = `f1(){ a=1; a++; a--; b=!1; c=~1; }`;
        const tokens = GscFileParser.tokenize(gsc);
        var i = 0;

        var tokensSequence: [string, TokenType][] = [
            ["f1", TokenType.Keyword], ["(", TokenType.ExpressionStart], [")", TokenType.ExpressionEnd], ["{", TokenType.ScopeStart],
            ["a", TokenType.Keyword], ["=", TokenType.Assignment], ["1", TokenType.Number], [";", TokenType.Semicolon],
            ["a", TokenType.Keyword], ["++", TokenType.Assignment3], [";", TokenType.Semicolon],
            ["a", TokenType.Keyword], ["--", TokenType.Assignment3], [";", TokenType.Semicolon],
            ["b", TokenType.Keyword], ["=", TokenType.Assignment], ["!", TokenType.OperatorLeft], ["1", TokenType.Number], [";", TokenType.Semicolon],
            ["c", TokenType.Keyword], ["=", TokenType.Assignment], ["~", TokenType.OperatorLeft], ["1", TokenType.Number], [";", TokenType.Semicolon],
            ["}", TokenType.ScopeEnd]
        ];

        assert.ok(tokens.length === tokensSequence.length, "Unexpected number of tokens: " + tokens.length);

        for (var [name, type] of tokensSequence) {
            assert.ok(tokenEquals(tokens[i], name, undefined, type), `Unexpected token(${i}) name:'${tokens[i].name}' or type:'${tokens[i].type}'. Expected name:'${name}', type:'${type}'. ` + JSON.stringify(tokens[i]));
            i++;
        } 

    });

});



