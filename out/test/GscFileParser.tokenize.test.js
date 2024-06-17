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
const GscFileParser_1 = require("../GscFileParser");
function tokenEquals(token, text, commentBefore, type) {
    return token.name === text && token.commentBefore === commentBefore && token.type === type;
}
suite('GscFileParser.tokenize #1.1', () => {
    test(`#1.1.1  basic tokens`, async () => {
        const gsc = `/* multiline comment */ main(p1,p2) { v1 = 1; v2 = 2.34; v3 = .1337; v4 = "string"; v5 = "\\"1\\n2\\\\3.4\\""; level.v1 = level.v2; }`;
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 36, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "main", " multiline comment ", GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], "p1", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ",", undefined, GscFileParser_1.TokenType.ParameterSeparator));
        assert.ok(tokenEquals(tokens[i++], "p2", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, GscFileParser_1.TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "1", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v2", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "2.34", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v3", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], ".1337", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v4", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "\"string\"", undefined, GscFileParser_1.TokenType.String));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v5", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], '\"\\"1\\n2\\\\3.4\\"\"', undefined, GscFileParser_1.TokenType.String));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "level", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ".", undefined, GscFileParser_1.TokenType.Structure));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "level", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ".", undefined, GscFileParser_1.TokenType.Structure));
        assert.ok(tokenEquals(tokens[i++], "v2", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, GscFileParser_1.TokenType.ScopeEnd));
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
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 14, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "func", "single line comment", GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, GscFileParser_1.TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "/#", "multiline comment", GscFileParser_1.TokenType.DeveloperStart));
        assert.ok(tokenEquals(tokens[i++], "#/", " in developer block", GscFileParser_1.TokenType.DeveloperEnd));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, GscFileParser_1.TokenType.ScopeEnd));
        assert.ok(tokenEquals(tokens[i++], "/#", undefined, GscFileParser_1.TokenType.DeveloperStart));
        assert.ok(tokenEquals(tokens[i++], "developerFunction", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, GscFileParser_1.TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, GscFileParser_1.TokenType.ScopeEnd));
        assert.ok(tokenEquals(tokens[i++], "#/", undefined, GscFileParser_1.TokenType.DeveloperEnd));
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
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 19, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "#include", undefined, GscFileParser_1.TokenType.Preprocessor));
        assert.ok(tokenEquals(tokens[i++], "maps", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, GscFileParser_1.TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "mp", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, GscFileParser_1.TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "gametypes", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, GscFileParser_1.TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "script", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "#using_animtree", undefined, GscFileParser_1.TokenType.Preprocessor));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], "\"vehicles\"", undefined, GscFileParser_1.TokenType.String));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "#include", undefined, GscFileParser_1.TokenType.Preprocessor));
        assert.ok(tokenEquals(tokens[i++], "scripts", "b", GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], '\\', undefined, GscFileParser_1.TokenType.PathSeparator));
        assert.ok(tokenEquals(tokens[i++], "_string", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", "c", GscFileParser_1.TokenType.Semicolon));
    });
    test(`#1.1.5 function pointers`, async () => {
        const gsc = `a(){} b(){ v1=::a; v2=[[v1]](); }`;
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 25, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, GscFileParser_1.TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, GscFileParser_1.TokenType.ScopeEnd));
        assert.ok(tokenEquals(tokens[i++], "b", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, GscFileParser_1.TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "::", undefined, GscFileParser_1.TokenType.FunctionPointer));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "v2", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "[", undefined, GscFileParser_1.TokenType.ArrayStart));
        assert.ok(tokenEquals(tokens[i++], "[", undefined, GscFileParser_1.TokenType.ArrayStart));
        assert.ok(tokenEquals(tokens[i++], "v1", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "]", undefined, GscFileParser_1.TokenType.ArrayEnd));
        assert.ok(tokenEquals(tokens[i++], "]", undefined, GscFileParser_1.TokenType.ArrayEnd));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, GscFileParser_1.TokenType.ScopeEnd));
    });
    test(`#1.1.6 special characters - assigment`, async () => {
        const gsc = `f1(){ a=1; a+=1; a-=2; a*=3; a/=4; a%=5; a|=6; a&=7; a^=8; }`;
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        assert.ok(tokens.length === 41, "Unexpected number of tokens: " + tokens.length);
        assert.ok(tokenEquals(tokens[i++], "f1", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "(", undefined, GscFileParser_1.TokenType.ExpressionStart));
        assert.ok(tokenEquals(tokens[i++], ")", undefined, GscFileParser_1.TokenType.ExpressionEnd));
        assert.ok(tokenEquals(tokens[i++], "{", undefined, GscFileParser_1.TokenType.ScopeStart));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "=", undefined, GscFileParser_1.TokenType.Assignment));
        assert.ok(tokenEquals(tokens[i++], "1", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "+=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "1", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "-=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "2", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "*=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "3", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "/=", undefined, GscFileParser_1.TokenType.Assignment2), JSON.stringify(tokens[i - 1]));
        assert.ok(tokenEquals(tokens[i++], "4", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "%=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "5", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "|=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "6", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "&=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "7", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "a", undefined, GscFileParser_1.TokenType.Keyword));
        assert.ok(tokenEquals(tokens[i++], "^=", undefined, GscFileParser_1.TokenType.Assignment2));
        assert.ok(tokenEquals(tokens[i++], "8", undefined, GscFileParser_1.TokenType.Number));
        assert.ok(tokenEquals(tokens[i++], ";", undefined, GscFileParser_1.TokenType.Semicolon));
        assert.ok(tokenEquals(tokens[i++], "}", undefined, GscFileParser_1.TokenType.ScopeEnd));
    });
    /** 2-sided operators - chars ('+', '-','*', '/', '%'),   ('|', '&', '^', '<<', '>>')   ('==', '!=', '<', '>', '<=', '>=', '&&', '||')   */
    test(`#1.1.7 special characters - operators`, async () => {
        const gsc = `f1(){ a=1+1-1*1/1%1|1&1^1<<1>>1; b = 1==1 && 1!=1 && 1<1 && 1>1 && 1<=1 && 1>=1 || 1; }`;
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        var tokensSequence = [
            ["f1", GscFileParser_1.TokenType.Keyword], ["(", GscFileParser_1.TokenType.ExpressionStart], [")", GscFileParser_1.TokenType.ExpressionEnd], ["{", GscFileParser_1.TokenType.ScopeStart],
            ["a", GscFileParser_1.TokenType.Keyword], ["=", GscFileParser_1.TokenType.Assignment],
            ["1", GscFileParser_1.TokenType.Number], ["+", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["-", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["*", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], ["/", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["%", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["|", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], ["&", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["^", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["<<", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], [">>", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], [";", GscFileParser_1.TokenType.Semicolon],
            ["b", GscFileParser_1.TokenType.Keyword], ["=", GscFileParser_1.TokenType.Assignment],
            ["1", GscFileParser_1.TokenType.Number], ["==", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["&&", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], ["!=", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["&&", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], ["<", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["&&", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], [">", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["&&", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], ["<=", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["&&", GscFileParser_1.TokenType.Operator],
            ["1", GscFileParser_1.TokenType.Number], [">=", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number], ["||", GscFileParser_1.TokenType.Operator], ["1", GscFileParser_1.TokenType.Number],
            [";", GscFileParser_1.TokenType.Semicolon], ["}", GscFileParser_1.TokenType.ScopeEnd]
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
        const tokens = GscFileParser_1.GscFileParser.tokenize(gsc);
        var i = 0;
        var tokensSequence = [
            ["f1", GscFileParser_1.TokenType.Keyword], ["(", GscFileParser_1.TokenType.ExpressionStart], [")", GscFileParser_1.TokenType.ExpressionEnd], ["{", GscFileParser_1.TokenType.ScopeStart],
            ["a", GscFileParser_1.TokenType.Keyword], ["=", GscFileParser_1.TokenType.Assignment], ["1", GscFileParser_1.TokenType.Number], [";", GscFileParser_1.TokenType.Semicolon],
            ["a", GscFileParser_1.TokenType.Keyword], ["++", GscFileParser_1.TokenType.Assignment3], [";", GscFileParser_1.TokenType.Semicolon],
            ["a", GscFileParser_1.TokenType.Keyword], ["--", GscFileParser_1.TokenType.Assignment3], [";", GscFileParser_1.TokenType.Semicolon],
            ["b", GscFileParser_1.TokenType.Keyword], ["=", GscFileParser_1.TokenType.Assignment], ["!", GscFileParser_1.TokenType.OperatorLeft], ["1", GscFileParser_1.TokenType.Number], [";", GscFileParser_1.TokenType.Semicolon],
            ["c", GscFileParser_1.TokenType.Keyword], ["=", GscFileParser_1.TokenType.Assignment], ["~", GscFileParser_1.TokenType.OperatorLeft], ["1", GscFileParser_1.TokenType.Number], [";", GscFileParser_1.TokenType.Semicolon],
            ["}", GscFileParser_1.TokenType.ScopeEnd]
        ];
        assert.ok(tokens.length === tokensSequence.length, "Unexpected number of tokens: " + tokens.length);
        for (var [name, type] of tokensSequence) {
            assert.ok(tokenEquals(tokens[i], name, undefined, type), `Unexpected token(${i}) name:'${tokens[i].name}' or type:'${tokens[i].type}'. Expected name:'${name}', type:'${type}'. ` + JSON.stringify(tokens[i]));
            i++;
        }
    });
});
//# sourceMappingURL=GscFileParser.tokenize.test.js.map