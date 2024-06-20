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
exports.GscVariableDefinitionType = exports.KeywordType = exports.GscData = exports.GscGroup = exports.TokenType = exports.GscFileParser = exports.GroupType = void 0;
const vscode = __importStar(require("vscode"));
var GroupType;
(function (GroupType) {
    /** The root of the tree */
    GroupType[GroupType["Root"] = 0] = "Root";
    /** Unresolved group */
    GroupType[GroupType["Unknown"] = 1] = "Unknown";
    /** Content surrounded by /##/ */
    GroupType[GroupType["DeveloperBlock"] = 2] = "DeveloperBlock";
    /** Content surrounded by /##/ */
    GroupType[GroupType["DeveloperBlockInner"] = 3] = "DeveloperBlockInner";
    /** Content surrounded by {} */
    GroupType[GroupType["Scope"] = 4] = "Scope";
    /** Content surrounded by () */
    GroupType[GroupType["Expression"] = 5] = "Expression";
    /** Content surrounded by [] */
    GroupType[GroupType["Array"] = 6] = "Array";
    /** Single token like ; && || ++ -- ... */
    GroupType[GroupType["Token"] = 7] = "Token";
    /** Predefined words like if, else, return, ... */
    GroupType[GroupType["ReservedKeyword"] = 8] = "ReservedKeyword";
    /** Not resolved word, probably variable name or function name */
    GroupType[GroupType["Identifier"] = 9] = "Identifier";
    /** Tokens considered as constants - numbers, strings, ... */
    GroupType[GroupType["Constant"] = 10] = "Constant";
    /** Path to an external file */
    GroupType[GroupType["Path"] = 11] = "Path";
    /** %xanim_file_name */
    GroupType[GroupType["XAnim"] = 12] = "XAnim";
    /** Expression with 3 parameters -> (0, 0, 0) */
    GroupType[GroupType["Vector"] = 13] = "Vector";
    /** The result of an operation, like && */
    GroupType[GroupType["Value"] = 14] = "Value";
    /** Casting expression like (int) - used in CoD1 */
    GroupType[GroupType["CastExpression"] = 15] = "CastExpression";
    GroupType[GroupType["DataTypeKeyword"] = 16] = "DataTypeKeyword";
    /** Variable reference like level.aaa or game["aaa"] or level.aaa["bbb"].ccc */
    GroupType[GroupType["Reference"] = 17] = "Reference";
    /** Name of the variable like level or game or var1 */
    GroupType[GroupType["VariableName"] = 18] = "VariableName";
    /** Field of structure variable like level.aaa  */
    GroupType[GroupType["StructureField"] = 19] = "StructureField";
    /** Statement like a=1 or a+=1 or a++ */
    GroupType[GroupType["Statement"] = 20] = "Statement";
    /** Statement like a=1 or a+=1 or a++ terminated with ; */
    GroupType[GroupType["TerminatedStatement"] = 21] = "TerminatedStatement";
    /** Statement like #include path\name */
    GroupType[GroupType["PreprocessorStatement"] = 22] = "PreprocessorStatement";
    /** Statement like #include path\name terminated with ; */
    GroupType[GroupType["TerminatedPreprocessorStatement"] = 23] = "TerminatedPreprocessorStatement";
    /** Parameters expression of preprocessor #using_animtree */
    GroupType[GroupType["PreprocessorAnimtreeParametersExpression"] = 24] = "PreprocessorAnimtreeParametersExpression";
    /** Single ; */
    GroupType[GroupType["Terminator"] = 25] = "Terminator";
    /** Unneeded ; after terminated statement */
    GroupType[GroupType["ExtraTerminator"] = 26] = "ExtraTerminator";
    /** Function definition funcName(p1, p2) { ... } */
    GroupType[GroupType["FunctionDefinition"] = 27] = "FunctionDefinition";
    /** Function declaration like funcName(p1, p2) */
    GroupType[GroupType["FunctionDeclaration"] = 28] = "FunctionDeclaration";
    /** Like funcName() or maps\script::funcName() */
    GroupType[GroupType["FunctionCall"] = 29] = "FunctionCall";
    /** Like var1 funcName() or var1 maps\script::funcName() */
    GroupType[GroupType["FunctionCallWithObject"] = 30] = "FunctionCallWithObject";
    /** Like thread funcName() or thread maps\script::funcName() */
    GroupType[GroupType["FunctionCallWithThread"] = 31] = "FunctionCallWithThread";
    /** Like var1 thread funcName() or var1 thread maps\script::funcName() */
    GroupType[GroupType["FunctionCallWithObjectAndThread"] = 32] = "FunctionCallWithObjectAndThread";
    /** Like ::funcName */
    GroupType[GroupType["FunctionPointer"] = 33] = "FunctionPointer";
    /** Like maps\script::funcName */
    GroupType[GroupType["FunctionPointerExternal"] = 34] = "FunctionPointerExternal";
    /** [[var]] */
    GroupType[GroupType["FunctionDereference"] = 35] = "FunctionDereference";
    /** Like funcName */
    GroupType[GroupType["FunctionName"] = 36] = "FunctionName";
    /** Like (..., ...) */
    GroupType[GroupType["FunctionParametersExpression"] = 37] = "FunctionParametersExpression";
    /** Like var1 */
    GroupType[GroupType["FunctionParameterName"] = 38] = "FunctionParameterName";
    /** func() {...} */
    GroupType[GroupType["FunctionScope"] = 39] = "FunctionScope";
    /** Keyword "if" and function parameter expression ()  */
    GroupType[GroupType["IfDeclaration"] = 40] = "IfDeclaration";
    /** If scope */
    GroupType[GroupType["IfScope"] = 41] = "IfScope";
    /** waittill (..., ...) */
    GroupType[GroupType["KeywordCall"] = 42] = "KeywordCall";
    /** level waittill (..., ...) */
    GroupType[GroupType["KeywordCallWithObject"] = 43] = "KeywordCallWithObject";
    /** level waittill (..., ...) */
    GroupType[GroupType["KeywordParametersExpression"] = 44] = "KeywordParametersExpression";
    GroupType[GroupType["ForDeclaration"] = 45] = "ForDeclaration";
    GroupType[GroupType["ForExpression"] = 46] = "ForExpression";
    GroupType[GroupType["ForScope"] = 47] = "ForScope";
    GroupType[GroupType["ForStatement"] = 48] = "ForStatement";
    GroupType[GroupType["WhileDeclaration"] = 49] = "WhileDeclaration";
    GroupType[GroupType["WhileScope"] = 50] = "WhileScope";
    GroupType[GroupType["SwitchDeclaration"] = 51] = "SwitchDeclaration";
    GroupType[GroupType["SwitchScope"] = 52] = "SwitchScope";
    GroupType[GroupType["CaseLabel"] = 53] = "CaseLabel";
    GroupType[GroupType["CaseScope"] = 54] = "CaseScope";
})(GroupType || (exports.GroupType = GroupType = {}));
/**
 * First step is to parse file content into array of @see TokenType which represents words, brackets, operators, comments, strings,...
 * These tokens are parsed by function @see tokenize()
 *
 * Then these tokens are processed into data structure tree according to the language syntax rules via function @see group()
 *
 * The tree is then analyzed and @see GscData is returned - it contains data about functions, global variables (level, game), local variables, ...
 */
class GscFileParser {
    static scopeTypes = [
        GroupType.FunctionScope, GroupType.IfScope, GroupType.ForScope, GroupType.WhileScope,
        GroupType.SwitchScope, GroupType.CaseScope, GroupType.Scope, GroupType.DeveloperBlock, GroupType.DeveloperBlockInner
    ];
    static functionCallTypes = [
        GroupType.FunctionCall, GroupType.FunctionCallWithThread, GroupType.FunctionCallWithObjectAndThread, GroupType.FunctionCallWithObject
    ];
    static valueTypes = [
        GroupType.Constant, GroupType.Reference, GroupType.Value,
        GroupType.Expression, GroupType.Vector,
        ...GscFileParser.functionCallTypes,
        GroupType.FunctionPointer, GroupType.FunctionPointerExternal
    ];
    static valueTypesWithIdentifier = [...GscFileParser.valueTypes, GroupType.Identifier];
    /**
     * Parse GSC file
     * @param content File content of GSC file to be parsed
     * @returns Parsed data
     */
    static parse(content) {
        var tokens = this.tokenize(content);
        var rootGroup = this.group(tokens);
        var data = this.analyze(rootGroup, content);
        return data;
    }
    /**
     * Parse file content into array of tokens
     * @param content The file content
     * @returns Array of tokens
     */
    static tokenize(content) {
        var tokens = [];
        var level = Level.Default;
        var levelChangeStart = -1;
        var line = 0; // line number (starting from 0)
        var char = 0; // char number (starting from 0)
        var skip = 0;
        var sLastComment = undefined;
        var lastToken = undefined;
        const len = content.length;
        for (let i = 0; i <= len; i++) {
            const c = i < len ? content[i] : '';
            const c_prev = i > 0 ? content[i - 1] : '';
            const c_next = i < len - 1 ? content[i + 1] : '';
            /* First we need to tokenize the big blocks:
                /* multi-line comments * /
                // single-line comment
                "strings"
                keywords
                0.001           // numbers
                ' '             // other characters
            */
            // Count new lines and char
            // Windows: "\r\n"    Linux:  "\n"
            if (i > 0) {
                if (content[i - 1] === '\n') {
                    line++;
                    char = 0;
                }
                else {
                    char++;
                }
            }
            // This char must be skipped, because is already processed
            if (skip > 0) {
                skip--;
                continue;
            }
            function addToken(type, startOffset, endOffset) {
                var text = content.substring(startOffset, endOffset);
                const token = {
                    index: tokens.length,
                    name: text,
                    offset: startOffset,
                    range: new vscode.Range(line, char - (i - startOffset), line, char - (i - endOffset)),
                    commentBefore: sLastComment,
                    type: type
                };
                tokens.push(token);
                lastToken = token;
                sLastComment = undefined;
            }
            /***************************************************************************************************************************************************************
            * Save content of things like function name, preprocessor name, ...
            ****************************************************************************************************************************************************************/
            switch (level) {
                case Level.SingleLineComment:
                    if (c === '\n' || c === '') {
                        sLastComment = content.substring(levelChangeStart + 2, ((c_prev === '\r') ? i - 1 : i));
                        level = Level.Default;
                    }
                    continue; // go to next char
                case Level.MultiLineComment:
                    if ((c === '*' && c_next === '/') || c === '') {
                        skip += 1;
                        sLastComment = content.substring(levelChangeStart + 2, i);
                        level = Level.Default;
                    }
                    continue; // go to next char
                // Its in preprocessor name and this char is no longer a valid preprocessor name, save the name and move level
                case Level.PreprocessorName:
                    if (!/^[a-zA-Z_0-9]$/.test(c)) {
                        addToken(TokenType.Preprocessor, levelChangeStart, i);
                        level = Level.Default;
                        break;
                    }
                    continue; // go to next char
                // Its in string constant and this char is end of the string, save the string content and move level
                case Level.String:
                case Level.LocalizedString:
                case Level.CvarString: // only COD:BO1
                    if (c === '\\' && c_next === '\\') { // skip escaped \
                        skip += 1;
                    }
                    else if (c === '\\' && c_next === '"') { // skip escaped "
                        skip += 1;
                    }
                    else if (c === '"' || c === '') {
                        const map = new Map([
                            [Level.String, TokenType.String],
                            [Level.LocalizedString, TokenType.LocalizedString],
                            [Level.CvarString, TokenType.CvarString],
                        ]);
                        const tokeType = map.get(level);
                        addToken(tokeType, levelChangeStart, i + 1);
                        level = Level.Default;
                    }
                    continue; // go to next char
                // Number did not start with dot, but dot may appear once additionally
                case Level.Number:
                    if (c === '.') {
                        level = Level.Float;
                    }
                    else if (!/^[0-9]$/.test(c)) {
                        addToken(TokenType.Number, levelChangeStart, i);
                        level = Level.Default;
                        break;
                    }
                    continue; // go to next char
                // Float number - the dot is already processed once, now only digits should appear
                case Level.Float:
                    if (!/^[0-9]$/.test(c)) {
                        addToken(TokenType.Number, levelChangeStart, i);
                        level = Level.Default;
                        break;
                    }
                    continue; // go to next char
                case Level.Keyword:
                    if (!/^[a-zA-Z_0-9]$/.test(c)) {
                        addToken(TokenType.Keyword, levelChangeStart, i);
                        level = Level.Default;
                        break;
                    }
                    continue; // go to next char
            }
            // It was last char, exit
            if (c === '') {
                break;
            }
            /***************************************************************************************************************************************************************
            * Always skip comments, developer blocks and whitespace
            ****************************************************************************************************************************************************************/
            switch (c) {
                case '/':
                    switch (c_next) {
                        case '/':
                            level = Level.SingleLineComment;
                            levelChangeStart = i;
                            skip += 1;
                            continue; // go to next char
                        case '*':
                            level = Level.MultiLineComment;
                            levelChangeStart = i;
                            skip += 1;
                            continue; // go to next char
                        case '#':
                            addToken(TokenType.DeveloperStart, i, i + 2);
                            skip += 1;
                            continue; // go to next char
                        case '=':
                            addToken(TokenType.Assignment2, i, i + 2); // /=
                            skip += 1;
                            continue;
                        default:
                            addToken(TokenType.Operator, i, i + 1); // /
                            continue;
                    }
                    break;
                case '#':
                    if (c_next === '/') {
                        addToken(TokenType.DeveloperEnd, i, i + 2);
                        skip += 1;
                        continue; // go to next char
                    }
                    else if (/^[a-zA-Z_]$/.test(c_next)) {
                        level = Level.PreprocessorName;
                        levelChangeStart = i;
                        continue;
                    }
                    else if (c_next === '"') {
                        level = Level.CvarString;
                        levelChangeStart = i + 1;
                        skip += 1;
                        continue;
                    }
                    else {
                        addToken(TokenType.Hashtag, i, i + 1); // #
                        continue;
                    }
                    break;
                case '"':
                    level = Level.String;
                    levelChangeStart = i;
                    continue; // go to next char
                case ',':
                    addToken(TokenType.ParameterSeparator, i, i + 1);
                    continue; // go to next char
                case '{':
                    addToken(TokenType.ScopeStart, i, i + 1);
                    continue; // go to next char
                case '}':
                    addToken(TokenType.ScopeEnd, i, i + 1);
                    continue; // go to next char
                case '(':
                    addToken(TokenType.ExpressionStart, i, i + 1);
                    continue; // go to next char
                case ')':
                    addToken(TokenType.ExpressionEnd, i, i + 1);
                    continue; // go to next char
                case '[':
                    if (c_next === ']') {
                        addToken(TokenType.Array, i, i + 2);
                        skip += 1;
                    }
                    else {
                        addToken(TokenType.ArrayStart, i, i + 1);
                    }
                    continue; // go to next char
                case ']':
                    addToken(TokenType.ArrayEnd, i, i + 1);
                    continue; // go to next char
                case '.':
                    // Floats starting with dot  .1337
                    if (/^[0-9]$/.test(c_next)) {
                        level = Level.Float;
                        levelChangeStart = i;
                        // Structure variables like level.aaa
                    }
                    else {
                        addToken(TokenType.Structure, i, i + 1);
                    }
                    continue; // go to next char
                case '\\':
                    addToken(TokenType.PathSeparator, i, i + 1);
                    continue; // go to next char
                case ':':
                    if (c_next === ':') {
                        skip += 1;
                        addToken(TokenType.FunctionPointer, i, i + 2);
                    }
                    else {
                        addToken(TokenType.Case, i, i + 1);
                    }
                    continue; // go to next char
                case '+':
                case '-':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Assignment2, i, i + 2);
                            skip = 1;
                            continue; // +=
                        default:
                            if (c === c_next) {
                                addToken(TokenType.Assignment3, i, i + 2);
                                skip = 1; // ++ --
                            }
                            else {
                                addToken(TokenType.Operator, i, i + 1); // + -
                            }
                            continue; // go to next char
                    }
                case '*':
                case '%':
                case '^':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Assignment2, i, i + 2);
                            skip = 1;
                            continue; // *= /= %= ^=
                        default:
                            addToken(TokenType.Operator, i, i + 1);
                            continue; // * / % ^ 
                    }
                case '~':
                    addToken(TokenType.OperatorLeft, i, i + 1);
                    continue; // ~
                case '&':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Assignment2, i, i + 2);
                            skip = 1;
                            continue; // &=
                        case '&':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // &&
                        case '"': // &"
                            level = Level.LocalizedString;
                            levelChangeStart = i + 1;
                            skip += 1;
                            continue;
                        default:
                            addToken(TokenType.Operator, i, i + 1);
                            continue; // &
                    }
                case '|':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Assignment2, i, i + 2);
                            skip = 1;
                            continue; // |=
                        case '|':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // ||
                        default:
                            addToken(TokenType.Operator, i, i + 1);
                            continue; // |
                    }
                case '<':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // <=
                        case '<':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // <<
                        default:
                            addToken(TokenType.Operator, i, i + 1);
                            continue; // <
                    }
                case '>':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // >=
                        case '>':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // >>
                        default:
                            addToken(TokenType.Operator, i, i + 1);
                            continue; // >
                    }
                case '!':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // !=
                        default:
                            addToken(TokenType.OperatorLeft, i, i + 1);
                            continue; // !
                    }
                case '=':
                    switch (c_next) {
                        case '=':
                            addToken(TokenType.Operator, i, i + 2);
                            skip = 1;
                            continue; // ==
                        default:
                            addToken(TokenType.Assignment, i, i + 1);
                            continue; // =
                    }
                case ';':
                    addToken(TokenType.Semicolon, i, i + 1);
                    continue; // go to next char
                // Ignore white spaces
                case ' ':
                case '\t':
                case '\f':
                case '\n':
                case '\r':
                case '\v':
                    continue; // go to next char
                default:
                    // keyword name
                    if (/^[a-zA-Z_]$/.test(c)) {
                        level = Level.Keyword;
                        levelChangeStart = i;
                    }
                    // Number  123  or  0.1  or  1337.1337  (these may contain decimal place later on)
                    else if (/^[0-9]$/.test(c)) {
                        level = Level.Number;
                        levelChangeStart = i;
                    }
                    else {
                        addToken(TokenType.Unknown, i, i + 1);
                    }
                    break;
            }
        }
        return tokens;
    }
    /**
     * Group tokens according to language syntax rules into tree items and return the root item
     * @param tokens Array of parsed tokens of file
     * @returns The root tree of data structure tree
     */
    static group(tokens) {
        /*function walkGroup(currentGroup: GscGroup, action: (currentGroup: GscGroup) => void, callForEmptyGroups: boolean = false) {
            // This object have child items, process them first
            for (var i = 0; i < currentGroup.items.length; i++) {
                var innerGroup = currentGroup.items[i];
                walkGroup(innerGroup, action, callForEmptyGroups);
            }
            if (callForEmptyGroups || currentGroup.items.length > 0) {
                action(currentGroup);
            }
        }*/
        function walkGroup(currentGroup, action, callForEmptyGroups = false) {
            const stack = [{ group: currentGroup, processed: false }];
            while (stack.length > 0) {
                const { group, processed } = stack.pop();
                if (processed) {
                    // Process the current group after its children
                    if (callForEmptyGroups || group.items.length > 0) {
                        action(group);
                    }
                }
                else {
                    // Push the current group back onto the stack to be processed after its children
                    stack.push({ group, processed: true });
                    // Add child items to the stack
                    for (let i = group.items.length - 1; i >= 0; i--) {
                        stack.push({ group: group.items[i], processed: false });
                    }
                }
            }
        }
        function groupItems(parentGroup, startIndex, wrapType, trimGroupStartBy, trimGroupEndBy, groups) {
            if (groups.length === 0) {
                throw new Error("No groups");
            }
            // Don't wrap Value into another Value
            if (startIndex === 0 && parentGroup.items.length === groups.length &&
                wrapType === GroupType.Value &&
                parentGroup.type === GroupType.Value) {
                return parentGroup;
            }
            const newGroup = new GscGroup({
                parent: parentGroup,
                type: wrapType,
                tokenIndexStart: groups[0].tokenIndexStart,
                tokenIndexEnd: groups[groups.length - 1].tokenIndexEnd
            }, tokens);
            groups.forEach(g => {
                g.parent = newGroup;
            });
            const trimIndexStart = (trimGroupStartBy > 0) ? trimGroupStartBy : 0;
            const trimIndexEnd = (trimGroupEndBy > 0) ? (groups.length - trimGroupEndBy - 1) : (groups.length - 1);
            // Stack overflow error for large arrays
            //newGroup.items.push(...groups.slice(trimIndexStart, trimIndexEnd));
            for (var i = trimIndexStart; i <= trimIndexEnd; i++) {
                newGroup.items.push(groups[i]);
            }
            // Value inside Value consider as solved
            if (startIndex === 0 && parentGroup.items.length === groups.length && parentGroup.solved &&
                typeEqualsToOneOf(wrapType, ...GscFileParser.valueTypes) &&
                parentGroup.typeEqualsToOneOf(...GscFileParser.valueTypes)) {
                newGroup.solved = true;
            }
            // Wrap this into variable
            parentGroup.items.splice(startIndex, groups.length, newGroup);
            return newGroup;
        }
        function replaceGroupsWithSingleGroup(parentGroup, startIndex, endIndex, type) {
            var newGroup = new GscGroup({
                parent: parentGroup,
                type: type,
                tokenIndexStart: parentGroup.items[startIndex].tokenIndexStart,
                tokenIndexEnd: parentGroup.items[endIndex].tokenIndexEnd
            }, tokens);
            // Delete items and replace them with one
            parentGroup.items.splice(startIndex, endIndex - startIndex + 1, newGroup);
            return newGroup;
        }
        function groupByBracketPairs(group, tokenTypeStart, tokenTypeEnd, groupType) {
            const startIndexes = [];
            if (group.items.length <= 1) {
                return;
            }
            for (var i = 0; i <= group.items.length; i++) {
                const tokenType = (i >= group.items.length)
                    ? undefined
                    : (group.items[i].getSingleTokenType() ?? TokenType.Unknown); // groups will be unknown
                if (tokenType === tokenTypeStart) {
                    startIndexes.push(i);
                }
                else if (tokenType === tokenTypeEnd) {
                    // Revert to parent group
                    var indexStart = startIndexes.pop();
                    // Update at which token the scope ends (group is the scope) and then go to parent scope
                    if (indexStart !== undefined) {
                        groupItems(group, indexStart, groupType, 1, 1, group.items.slice(indexStart, i + 1));
                        i = indexStart - 1;
                        continue; // go again to the same index
                    }
                }
                else if (tokenType === undefined) {
                    // If there are unclosed open bracket, add them
                    while (true) {
                        var indexStart = startIndexes.pop();
                        if (indexStart === undefined) {
                            break;
                        }
                        if (indexStart === group.items.length - 1) {
                            continue;
                        } // ignore last open bracket
                        groupItems(group, indexStart, groupType, 1, 0, group.items.slice(indexStart, group.items.length));
                    }
                }
            }
        }
        function change_singleUnknownTokens(parentGroup) {
            for (var i = 0; i < parentGroup.items.length; i++) {
                var childGroup = parentGroup.items[i];
                var unknownToken = childGroup.getUnknownToken();
                if (unknownToken === undefined) {
                    continue;
                }
                switch (unknownToken.type) {
                    case TokenType.Number:
                    case TokenType.String:
                    case TokenType.LocalizedString:
                    case TokenType.CvarString:
                    case TokenType.Array:
                        childGroup.type = GroupType.Constant;
                        break;
                    case TokenType.Preprocessor:
                        childGroup.type = GroupType.ReservedKeyword;
                        break;
                    case TokenType.Keyword:
                        const knownKeywords = ["return", "if", "else", "for", "while", "switch", "continue", "break", "case", "default", "thread", "wait", "waittillframeend", "waittill", "waittillmatch", "endon", "notify", "breakpoint"];
                        const knownConstants = ["true", "false", "undefined"];
                        if (knownConstants.includes(unknownToken.name)) {
                            childGroup.type = GroupType.Constant;
                        }
                        else if (knownKeywords.includes(unknownToken.name)) {
                            childGroup.type = GroupType.ReservedKeyword;
                        }
                        else {
                            childGroup.type = GroupType.Identifier;
                        }
                        break;
                    case TokenType.Semicolon:
                        childGroup.type = GroupType.Terminator;
                        break;
                }
            }
        }
        function typeEqualsToOneOf(type, ...groups) {
            if (type === undefined) {
                return false;
            }
            return groups.includes(type);
        }
        function group_path(parentGroup) {
            var iPathStart = -1;
            if (parentGroup.items.length === 0 || parentGroup.type === GroupType.Path) {
                return;
            }
            for (var i = 0; i <= parentGroup.items.length; i++) {
                const childGroup1 = parentGroup.items.at(i);
                if (childGroup1?.solved === true) {
                    continue;
                }
                const childGroup2 = parentGroup.items.at(i + 1);
                if (childGroup2?.solved === true) {
                    continue;
                }
                const typeOfUnknownToken2 = childGroup2?.getTypeOfUnknownToken();
                const isWord = childGroup1?.typeEqualsToOneOf(GroupType.Identifier, GroupType.ReservedKeyword) ?? false;
                // First word must be an identifier, after the first \ it may also contain preserved keywords
                if (((iPathStart === -1 && childGroup1?.type === GroupType.Identifier) ||
                    (iPathStart !== -1 && isWord)) &&
                    (typeOfUnknownToken2 === TokenType.PathSeparator || typeOfUnknownToken2 === TokenType.FunctionPointer)) {
                    if (iPathStart === -1) {
                        iPathStart = i; // This is a path start
                    }
                    if (typeOfUnknownToken2 === TokenType.PathSeparator) {
                        i++;
                    }
                }
                else if (iPathStart > -1) {
                    const iPathEnd = (isWord) ? i : i - 1;
                    replaceGroupsWithSingleGroup(parentGroup, iPathStart, iPathEnd, GroupType.Path);
                    i = iPathStart - 1;
                    iPathStart = -1;
                }
            }
        }
        // (-1 - -1)    (+1 + 1)    (-.1 + +.1)    (-1, +1, -1)
        function group_numberSign(parentGroup) {
            if (parentGroup.items.length === 0 || parentGroup.type === GroupType.Value) {
                return;
            }
            for (var i = -1; i <= parentGroup.items.length - 3; i++) {
                // operator
                const childGroup1 = i === -1 ? undefined : parentGroup.items[i];
                if (childGroup1 !== undefined && !childGroup1.isUnsolvedGroupOfOneOfType(GroupType.ReservedKeyword) &&
                    !childGroup1.isUnsolvedSingleTokenOfOneOfType(TokenType.Operator, TokenType.ParameterSeparator, TokenType.Assignment, TokenType.Assignment2, TokenType.OperatorLeft)) {
                    continue;
                }
                // + - ,
                const childGroup2 = parentGroup.items[i + 1];
                if (!childGroup2.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.Operator)) {
                    continue;
                }
                if (!["+", "-"].includes(childGroup2.getSingleToken()?.name ?? "")) {
                    continue;
                }
                // 0.1
                const childGroup3 = parentGroup.items[i + 2];
                if (!childGroup3.isUnsolvedSingleTokenOfOneOfType(TokenType.Number)) {
                    continue;
                }
                groupItems(parentGroup, i + 1, GroupType.Value, 0, 0, [childGroup2, childGroup3]);
                childGroup2.type = GroupType.Token;
                childGroup2.solved = true;
                childGroup3.solved = true;
                // no need to exist because next index will be this new group
            }
        }
        // [[func]]()
        function group_functionPointerDereference() {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.items.length === 0) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length - 1; i++) {
                    // array
                    const childGroup1 = parentGroup.items[i];
                    if (!childGroup1.isUnsolvedGroupOfOneOfType(GroupType.Array) || childGroup1.items.length !== 1) {
                        continue;
                    }
                    const innerGroup1 = childGroup1.items[0];
                    if (!innerGroup1.isUnsolvedGroupOfOneOfType(GroupType.Array) || innerGroup1.items.length === 0) {
                        continue;
                    }
                    const childGroup2 = parentGroup.items[i + 1];
                    if (!childGroup2.isUnsolvedGroupOfOneOfType(GroupType.Expression)) {
                        continue;
                    }
                    // Everything inside consider as value, will be solved later
                    if (innerGroup1.items.length === 1) {
                        changeGroupToSolvedAndChangeType(innerGroup1, innerGroup1.items[0], GroupType.Value);
                    }
                    else {
                        const newGroup2 = groupItems(innerGroup1, 0, GroupType.Value, 0, 0, innerGroup1.items);
                        newGroup2.solved = true;
                    }
                    const openBrackets = new GscGroup({
                        parent: childGroup1,
                        type: GroupType.ReservedKeyword,
                        tokenIndexStart: childGroup1.tokenIndexStart,
                        tokenIndexEnd: childGroup1.tokenIndexStart + 1
                    }, tokens);
                    openBrackets.solved = true;
                    const closeBrackets = new GscGroup({
                        parent: childGroup1,
                        type: GroupType.ReservedKeyword,
                        tokenIndexStart: childGroup1.tokenIndexEnd - 1,
                        tokenIndexEnd: childGroup1.tokenIndexEnd
                    }, tokens);
                    closeBrackets.solved = true;
                    childGroup1.type = GroupType.FunctionDereference;
                    childGroup1.items.splice(0, 1, openBrackets, ...innerGroup1.items, closeBrackets); // delete the additional array
                    const newGroup = groupItems(parentGroup, i, GroupType.FunctionCall, 0, 0, [childGroup1, childGroup2]);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.FunctionDereference);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.FunctionParametersExpression);
                }
            });
        }
        // Find expression with 3 numbers separated by comma   (0, 0, 0)
        function change_expressionToVector(parentGroup) {
            if (parentGroup.items.length !== 5 || parentGroup.type === GroupType.Vector || parentGroup.type !== GroupType.Expression) {
                return;
            }
            for (var i = 0; i <= parentGroup.items.length - 5; i++) {
                const childGroup1 = parentGroup.items[i];
                if (!childGroup1.isUnsolvedGroupOfOneOfType(...GscFileParser.valueTypesWithIdentifier)) {
                    continue;
                }
                const childGroup2 = parentGroup.items[i + 1];
                if (!childGroup2.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.ParameterSeparator)) {
                    continue;
                }
                const childGroup3 = parentGroup.items[i + 2];
                if (!childGroup3.isUnsolvedGroupOfOneOfType(...GscFileParser.valueTypesWithIdentifier)) {
                    continue;
                }
                const childGroup4 = parentGroup.items[i + 3];
                if (!childGroup4.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.ParameterSeparator)) {
                    continue;
                }
                const childGroup5 = parentGroup.items[i + 4];
                if (!childGroup5.isUnsolvedGroupOfOneOfType(...GscFileParser.valueTypesWithIdentifier)) {
                    continue;
                }
                parentGroup.type = GroupType.Vector;
                changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.Value);
                changeGroupToSolvedAndChangeType(parentGroup, childGroup2, GroupType.Token);
                changeGroupToSolvedAndChangeType(parentGroup, childGroup3, GroupType.Value);
                changeGroupToSolvedAndChangeType(parentGroup, childGroup4, GroupType.Token);
                changeGroupToSolvedAndChangeType(parentGroup, childGroup5, GroupType.Value);
            }
        }
        function changeGroupToSolvedAndChangeType(parentGroup, group, newType) {
            if (newType !== undefined) {
                const i = parentGroup.items.indexOf(group);
                if (i === -1) {
                    throw new Error("group was not found in parent group!");
                }
                // This identifier must be resolved to variable
                if (group.type === GroupType.Identifier && (newType === GroupType.Value || newType === GroupType.Reference)) {
                    const newGroup = groupItems(parentGroup, i, GroupType.Reference, 0, 0, [group]);
                    newGroup.solved = true;
                    group.type = GroupType.VariableName;
                }
                // This type is already considered as value, don't wrap into another value group
                else if (typeEqualsToOneOf(group.type, ...GscFileParser.valueTypes) && group.type !== GroupType.Expression && newType === GroupType.Value) { }
                // Check type directly without making new group
                else if (group.type === GroupType.Unknown || group.type === newType || (group.type === GroupType.Identifier && typeEqualsToOneOf(newType, GroupType.VariableName, GroupType.FunctionName, GroupType.StructureField, GroupType.XAnim)) || (group.type === GroupType.Expression && (typeEqualsToOneOf(newType, GroupType.FunctionParametersExpression, GroupType.KeywordParametersExpression, GroupType.ForExpression, GroupType.CastExpression))) || (group.type === GroupType.FunctionCall && (newType === GroupType.FunctionDeclaration)) || (group.type === GroupType.Scope && (typeEqualsToOneOf(newType, GroupType.FunctionScope, GroupType.IfScope, GroupType.ForScope, GroupType.WhileScope, GroupType.SwitchScope))) || (newType === GroupType.ForStatement && (typeEqualsToOneOf(group.type, GroupType.TerminatedStatement, GroupType.Terminator)))) {
                    group.type = newType;
                }
                else {
                    const newGroup = groupItems(parentGroup, i, newType, 0, 0, [group]);
                    newGroup.solved = true;
                    /*if (group.type === GroupType.Identifier && newType === GroupType.VariableReference) {
                        group.type = GroupType.VariableName; // Identifiers inside VariableReference change to VariableName
                    }*/
                }
            }
            group.solved = true;
        }
        function group_byTokenAndGroup(tokenType, groupTypesRight, finalType, finalGroup1Type, finalGroup2Type) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length - 1; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[i + 1];
                    if (childGroup2.solved) {
                        continue;
                    }
                    var typeOfUnknownToken1 = childGroup1.getTypeOfUnknownToken();
                    if (typeOfUnknownToken1 === tokenType &&
                        typeEqualsToOneOf(childGroup2.type, ...groupTypesRight)) {
                        const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_byGroupAndToken(groupTypesLeft, tokenType, finalType, finalGroup1Type, finalGroup2Type) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length - 1; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[i + 1];
                    if (childGroup2.solved) {
                        continue;
                    }
                    var typeOfUnknownToken2 = childGroup2.getTypeOfUnknownToken();
                    if (typeEqualsToOneOf(childGroup1.type, ...groupTypesLeft) &&
                        typeOfUnknownToken2 === tokenType) {
                        const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_byGroupAndTokenAndGroup(groupTypesLeft, tokenType, groupTypesRight, finalType, finalGroup1Type, finalGroup2Type, finalGroup3Type) {
            walkGroup(rootGroup, (parentGroup) => {
                for (var i = 0; i < parentGroup.items.length - 2; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[i + 1];
                    if (childGroup2.solved) {
                        continue;
                    }
                    var childGroup3 = parentGroup.items[i + 2];
                    if (childGroup3.solved) {
                        continue;
                    }
                    var typeOfUnknownToken2 = childGroup2.getTypeOfUnknownToken();
                    if (typeEqualsToOneOf(childGroup1.type, ...groupTypesLeft) &&
                        typeOfUnknownToken2 === tokenType &&
                        typeEqualsToOneOf(childGroup3.type, ...groupTypesRight)) {
                        const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2, childGroup3]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup3, finalGroup3Type);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_byGroupAndGroup(groupTypesLeft, groupTypesRight, finalType, finalGroup1Type, finalGroup2Type, backward = false) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; true; i++) {
                    var index = i;
                    if (backward) {
                        index = parentGroup.items.length - 2 - i;
                        if (index < 0) {
                            break;
                        }
                    }
                    else {
                        if (index > parentGroup.items.length - 2) {
                            break;
                        }
                    }
                    var childGroup1 = parentGroup.items[index];
                    if (childGroup1.solved) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[index + 1];
                    if (childGroup2.solved) {
                        continue;
                    }
                    if (typeEqualsToOneOf(childGroup1.type, ...groupTypesLeft) &&
                        typeEqualsToOneOf(childGroup2.type, ...groupTypesRight)) {
                        const newGroup = groupItems(parentGroup, index, finalType, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_variables_and_function_call(rootGroup) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.items.length === 0) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length; i++) {
                    // func();
                    //  var func();
                    //  var thread func();
                    //  thread func();
                    // func() func();
                    // func() thread func();
                    // var func() thread func();
                    // [[f]]() thread ttt();
                    // ::getVar thread ttt();
                    // variable or keyword or object reference (func call)
                    const childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    const childGroup2 = parentGroup.items.at(i + 1);
                    if (childGroup2?.solved) {
                        continue;
                    }
                    const childGroup3 = parentGroup.items.at(i + 2);
                    const childGroup4 = parentGroup.items.at(i + 3);
                    const typeOfUnknownToken2 = childGroup2?.getTypeOfUnknownToken();
                    // Allowed types that may appear before function call
                    const allowedTypes = [
                        GroupType.Identifier, GroupType.Reference,
                        ...GscFileParser.functionCallTypes,
                        GroupType.FunctionDereference, GroupType.FunctionPointer, GroupType.FunctionPointerExternal
                    ];
                    var group1_isVarReference = childGroup1.isUnsolvedGroupOfOneOfType(...allowedTypes);
                    // Expressions may hide the inner groups, unwrap
                    if (childGroup1.isUnsolvedGroupOfOneOfType(GroupType.Expression)) {
                        const innerGroup = childGroup1.unwrapType(GroupType.Expression);
                        group1_isVarReference = innerGroup.typeEqualsToOneOf(...allowedTypes);
                    }
                    const group2_isThread = childGroup2?.isReservedKeywordOfName("thread") ?? false;
                    const group3_isFuncCall = childGroup3?.isUnsolvedGroupOfOneOfType(GroupType.FunctionCall) ?? false;
                    // var thread func()
                    if (group1_isVarReference && group2_isThread && group3_isFuncCall) {
                        const newGroup = groupItems(parentGroup, i, GroupType.FunctionCallWithObjectAndThread, 0, 0, [childGroup1, childGroup2, childGroup3]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Reference);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.ReservedKeyword);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup3, GroupType.FunctionCall);
                        i--;
                        continue; // go to same index again
                    }
                    const group2_isCall = childGroup2?.isUnsolvedGroupOfOneOfType(GroupType.FunctionCall, GroupType.KeywordCall) ?? false;
                    // var func();   or    var waittill();
                    if (group1_isVarReference && group2_isCall) {
                        const finalType = childGroup2.type === GroupType.FunctionCall
                            ? GroupType.FunctionCallWithObject
                            : GroupType.KeywordCallWithObject;
                        const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Reference);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, undefined); // keep what it was
                        i--;
                        continue; // go to same index again
                    }
                    const group1_isThread = childGroup1.isReservedKeywordOfName("thread");
                    // thread func();
                    if (group1_isThread && group2_isCall) {
                        const newGroup = groupItems(parentGroup, i, GroupType.FunctionCallWithThread, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.ReservedKeyword);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.FunctionCall);
                        i--;
                        continue; // go to same index again
                    }
                    const group1_isObject = (typeEqualsToOneOf(childGroup1.type, GroupType.Identifier, GroupType.Reference, GroupType.Expression, ...GscFileParser.functionCallTypes) ||
                        childGroup1.type === GroupType.Constant && childGroup1.getSingleTokenType() === TokenType.String);
                    // level.aaa    level.aaa.bbb    (level).aaa     getarray().size   "weapon_".size   
                    if (childGroup2 !== undefined && childGroup3 !== undefined &&
                        group1_isObject &&
                        typeOfUnknownToken2 === TokenType.Structure &&
                        childGroup3.type === GroupType.Identifier) {
                        const newGroup = groupItems(parentGroup, i, GroupType.Reference, 0, 0, [childGroup1, childGroup2, childGroup3]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Reference);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.Token);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup3, GroupType.StructureField);
                        i--;
                        continue; // go again to the same index
                    }
                    // game[]     level.aaa[]   (level.aaa)[]     getarray()[x]   "weapon_"[0]
                    if (childGroup2 !== undefined &&
                        group1_isObject &&
                        childGroup2.type === GroupType.Array &&
                        (childGroup2.items.length !== 1 || childGroup2.items[0].type !== GroupType.Array)) // ignore func dereference [[]]
                     {
                        const newGroup = groupItems(parentGroup, i, GroupType.Reference, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Reference);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.Array);
                        // Everything inside [] consider as value, will be solved later
                        if (childGroup2.items.length === 1) {
                            changeGroupToSolvedAndChangeType(childGroup2, childGroup2.items[0], GroupType.Value);
                        }
                        else {
                            const newGroup2 = groupItems(childGroup2, 0, GroupType.Value, 0, 0, childGroup2.items);
                            newGroup2.solved = true;
                        }
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_casting(rootGroup) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.items.length === 0) {
                    return;
                }
                for (var i = parentGroup.items.length - 2; i >= 0; i--) {
                    // variable or keyword or object reference (func call)
                    const childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    const childGroup2 = parentGroup.items.at(i + 1);
                    if (childGroup2?.solved) {
                        continue;
                    }
                    const child1Inner1 = childGroup1.items.at(0);
                    const types = ["int", "bool", "float", "string"];
                    if (childGroup1.type === GroupType.Expression && childGroup1.items.length === 1 &&
                        child1Inner1?.type === GroupType.Identifier && types.includes(child1Inner1.getTokensAsString()) &&
                        childGroup2?.typeEqualsToOneOf(...GscFileParser.valueTypesWithIdentifier)) {
                        const newGroup = groupItems(parentGroup, i, GroupType.Value, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.CastExpression);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.Value);
                        child1Inner1.type = GroupType.DataTypeKeyword;
                        child1Inner1.solved = true;
                        i++;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_value_operations(rootGroup) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.items.length === 0) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length; i++) {
                    // variable or keyword or object reference (func call)
                    const childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    const childGroup2 = parentGroup.items.at(i + 1);
                    if (childGroup2?.solved) {
                        continue;
                    }
                    const childGroup3 = parentGroup.items.at(i + 2);
                    const childGroup4 = parentGroup.items.at(i + 3);
                    const typeOfUnknownToken1 = childGroup1.getTypeOfUnknownToken();
                    // !var1   !level.aaa   !(...)      ~var1
                    if (typeOfUnknownToken1 === TokenType.OperatorLeft &&
                        childGroup2?.isUnsolvedGroupOfOneOfType(...GscFileParser.valueTypesWithIdentifier)) {
                        const newGroup = groupItems(parentGroup, i, GroupType.Value, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Token);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.Value);
                        i--;
                        continue; // go again to the same index
                    }
                    const typeOfUnknownToken3 = childGroup3?.getTypeOfUnknownToken();
                    const typeOfUnknownToken2 = childGroup2?.getTypeOfUnknownToken();
                    // aaa && bbb     + - * / % < > == 
                    if (childGroup1.typeEqualsToOneOf(...GscFileParser.valueTypesWithIdentifier) &&
                        typeOfUnknownToken2 === TokenType.Operator) {
                        // If next tokens after operator needs to be joined first
                        // aaa && !var1   aaa && !level.aaa   aaa && !(...)
                        if (typeOfUnknownToken3 === TokenType.OperatorLeft &&
                            childGroup4?.isUnsolvedGroupOfOneOfType(...GscFileParser.valueTypesWithIdentifier)) {
                            const newGroup = groupItems(parentGroup, i + 2, GroupType.Value, 0, 0, [childGroup3, childGroup4]);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup3, GroupType.Token);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup4, GroupType.Value);
                            i--;
                            continue; // go again to the same index
                        }
                        // If next tokens after operator needs to be joined first
                        // %anim_file_name
                        if (childGroup3?.getSingleToken()?.name === "%" &&
                            childGroup4?.typeEqualsToOneOf(GroupType.Identifier)) {
                            const newGroup = groupItems(parentGroup, i + 2, GroupType.Constant, 0, 0, [childGroup3, childGroup4]);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup3, GroupType.Token);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup4, GroupType.XAnim);
                            i--;
                            continue; // go again to the same index
                        }
                        if (childGroup3?.typeEqualsToOneOf(...GscFileParser.valueTypesWithIdentifier)) {
                            const newGroup = groupItems(parentGroup, i, GroupType.Value, 0, 0, [childGroup1, childGroup2, childGroup3]);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Value);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.Token);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup3, GroupType.Value);
                            i--;
                            continue; // go again to the same index
                        }
                    }
                    // %anim_file_name
                    else if (childGroup1.getSingleToken()?.name === "%" &&
                        childGroup2?.typeEqualsToOneOf(GroupType.Identifier)) {
                        const newGroup = groupItems(parentGroup, i, GroupType.Constant, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Token);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.XAnim);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_byKeyword(keywordNames, finalType, finalGroup1Type) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    var childTokenName = childGroup1.getSingleToken()?.name; //.toLocaleLowerCase();
                    // return
                    if (childGroup1.type === GroupType.ReservedKeyword && keywordNames.includes(childTokenName ?? "")) {
                        const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_byKeywordNameAndGroup(keywordNames, groupTypesRight, finalType, finalGroup1Type, finalGroup2Type) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length - 1; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (childGroup1.solved) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[i + 1];
                    if (childGroup2.solved) {
                        continue;
                    }
                    var childTokenName = childGroup1.getSingleToken()?.name; //.toLocaleLowerCase();
                    // if ()
                    if (childGroup1.type === GroupType.ReservedKeyword && keywordNames.includes(childTokenName ?? "") &&
                        childGroup2.typeEqualsToOneOf(...groupTypesRight)) {
                        const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                        i--;
                        continue; // go again to the same index
                    }
                }
            });
        }
        function group_byKeywordAndGroupAndToken(keywordNamesLeft, groupTypes, tokenType, finalType, finalGroup1Type, finalGroup2Type, finalGroup3Type) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length - 2; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (!childGroup1.isReservedKeywordOfName(...keywordNamesLeft)) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[i + 1];
                    if (!childGroup2.isUnsolvedGroupOfOneOfType(...groupTypes)) {
                        continue;
                    }
                    var childGroup3 = parentGroup.items[i + 2];
                    if (!childGroup3.isUnknownUnsolvedSingleTokenOfOneOfType(tokenType)) {
                        continue;
                    }
                    const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2, childGroup3]);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup3, finalGroup3Type);
                    i--;
                    continue; // go again to the same index           
                }
            });
        }
        function group_byKeywordAndToken(keywordNamesLeft, tokenType, finalType, finalGroup1Type, finalGroup2Type) {
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === finalType) {
                    return;
                }
                for (var i = 0; i < parentGroup.items.length - 1; i++) {
                    var childGroup1 = parentGroup.items[i];
                    if (!childGroup1.isReservedKeywordOfName(...keywordNamesLeft)) {
                        continue;
                    }
                    var childGroup2 = parentGroup.items[i + 1];
                    if (!childGroup2.isUnknownUnsolvedSingleTokenOfOneOfType(tokenType)) {
                        continue;
                    }
                    const newGroup = groupItems(parentGroup, i, finalType, 0, 0, [childGroup1, childGroup2]);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup1, finalGroup1Type);
                    changeGroupToSolvedAndChangeType(newGroup, childGroup2, finalGroup2Type);
                    i--;
                    continue; // go again to the same index           
                }
            });
        }
        function group_declarations() {
            const map = new Map([
                [GroupType.IfDeclaration, GroupType.IfScope],
                [GroupType.ForDeclaration, GroupType.ForScope],
                [GroupType.WhileDeclaration, GroupType.WhileScope],
                [GroupType.SwitchDeclaration, GroupType.SwitchScope]
            ]);
            walkGroup(rootGroup, (parentGroup) => {
                if (parentGroup.type === GroupType.TerminatedStatement) {
                    return;
                }
                for (var i = parentGroup.items.length - 2; i >= 0; i--) {
                    const childGroup1 = parentGroup.items[i];
                    if (!childGroup1.isUnsolvedGroupOfOneOfType(...map.keys())) {
                        continue;
                    }
                    const childGroup2 = parentGroup.items[i + 1];
                    // Statement may be also in developer block (found in CoD1 raw code)
                    // According test in CoD2 engine, developer block /##/ act the same as {}
                    //   if (1) /# a = 1; b = 1;#/  (both a and b get assigned)
                    if (!childGroup2.isUnsolvedGroupOfOneOfType(GroupType.Scope, GroupType.TerminatedStatement, GroupType.DeveloperBlock)) {
                        continue;
                    }
                    // Developer block /##/ is not valid for switch
                    if (childGroup1.type === GroupType.SwitchDeclaration && childGroup2.type === GroupType.DeveloperBlock) {
                        continue;
                    }
                    const childGroup3 = parentGroup.items.at(i + 2);
                    const childGroup4 = parentGroup.items.at(i + 3);
                    if (childGroup1.type === GroupType.IfDeclaration && childGroup3 !== undefined && childGroup4 !== undefined && childGroup3.isReservedKeywordOfName("else")) {
                        const newGroup = groupItems(parentGroup, i, GroupType.TerminatedStatement, 0, 0, [childGroup1, childGroup2, childGroup3, childGroup4]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.IfDeclaration);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.IfScope);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup3, GroupType.ReservedKeyword);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup4, GroupType.IfScope);
                    }
                    else {
                        const newGroup = groupItems(parentGroup, i, GroupType.TerminatedStatement, 0, 0, [childGroup1, childGroup2]);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup1, undefined);
                        changeGroupToSolvedAndChangeType(newGroup, childGroup2, map.get(childGroup1.type));
                    }
                    i++;
                    continue; // go again to the same index
                }
            });
        }
        function group_the_rest(group, parentGroup = undefined, lastFunctionScope = undefined) {
            if (group.type === GroupType.FunctionScope) {
                lastFunctionScope = group;
            }
            // This object have child items, process them first
            for (var i = 0; i < group.items.length; i++) {
                const innerGroup = group.items[i];
                group_the_rest(innerGroup, group, lastFunctionScope);
            }
            switch (group.type) {
                case GroupType.DeveloperBlock:
                    // Developer block inside function change to DeveloperBlockInner
                    if (lastFunctionScope !== undefined) {
                        group.type = GroupType.DeveloperBlockInner;
                    }
                    break;
                case GroupType.ForExpression:
                    // for (;;) is minimum
                    if (group.items.length < 2) {
                        group.solved = false;
                        return;
                    }
                    // First join second argument Value and TerminatedStatement
                    var paramPos = 0;
                    for (var i = 0; i < group.items.length; i++) {
                        const childGroup1 = group.items[i];
                        childGroup1.solved = false; // reset solve status because TerminatedStatement is already solved
                        // for (;;)                 Terminator          Terminator
                        // for (;; i++)             Terminator          Terminator  TerminatedStatement
                        // for (i = 1;;)            TerminatedStatement Terminator
                        // for (; i < 5;)           TerminatedStatement Value       Terminator
                        // for (; i < 5; i++)       TerminatedStatement Value       Terminator          TerminatedStatement   
                        // for (i = 1; i < 5; i++)  TerminatedStatement Value       Terminator          TerminatedStatement
                        // for (;)                  Terminator                      // excluded by (group.items.length < 2)
                        // for (i = 1;)             TerminatedStatement             // excluded by (group.items.length < 2)
                        // for (; i < 5)            TerminatedStatement Value
                        // for (i = 1; i < 5)       TerminatedStatement Value
                        if (paramPos === 0 && childGroup1.type === GroupType.TerminatedStatement) {
                            changeGroupToSolvedAndChangeType(group, childGroup1, GroupType.ForStatement);
                            childGroup1.solved = true;
                            paramPos++;
                        }
                        else if (paramPos === 0 && childGroup1.type === GroupType.Terminator) {
                            const newGroup = groupItems(group, i, GroupType.ForStatement, 0, 0, [childGroup1]);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Terminator);
                            newGroup.solved = true;
                            paramPos++;
                            // Change Value + TerminatedStatement (1+1)+(;) into single ForStatement
                        }
                        else if (paramPos === 1 && typeEqualsToOneOf(childGroup1.type, ...GscFileParser.valueTypesWithIdentifier)) {
                            const childGroup2 = group.items.at(i + 1);
                            if (childGroup2?.type === GroupType.Terminator) {
                                const newGroup = groupItems(group, i, GroupType.ForStatement, 0, 0, [childGroup1, childGroup2]);
                                childGroup1.solved = true;
                                changeGroupToSolvedAndChangeType(newGroup, childGroup2, GroupType.Terminator);
                                newGroup.solved = true;
                            }
                            paramPos++;
                        }
                        else if (paramPos === 1 && childGroup1.type === GroupType.Terminator) {
                            const newGroup = groupItems(group, i, GroupType.ForStatement, 0, 0, [childGroup1]);
                            changeGroupToSolvedAndChangeType(newGroup, childGroup1, GroupType.Terminator);
                            newGroup.solved = true;
                            paramPos++;
                        }
                        else if (paramPos === 2 && typeEqualsToOneOf(childGroup1.type, GroupType.Statement)) {
                            changeGroupToSolvedAndChangeType(group, childGroup1, GroupType.ForStatement);
                        }
                        else {
                            paramPos++;
                        }
                    }
                    if (paramPos >= 3) {
                        group.solved = false;
                        return;
                    }
                    break;
                case GroupType.SwitchScope:
                    // First join non-CaseLabel groups, so we end up only with CaseLabel and CaseScope groups
                    var lastLabel = -1;
                    for (var i = 0; i <= group.items.length; i++) {
                        const childGroup1 = i === group.items.length ? undefined : group.items[i];
                        if (lastLabel !== -1 && i > lastLabel + 1 && (childGroup1 === undefined || childGroup1.type === GroupType.CaseLabel)) {
                            const groups = group.items.slice(lastLabel + 1, i);
                            const newGroup = groupItems(group, lastLabel + 1, GroupType.CaseScope, 0, 0, groups);
                            i -= groups.length;
                            lastLabel = -1;
                        }
                        if (childGroup1 !== undefined && childGroup1.type === GroupType.CaseLabel) {
                            lastLabel = i;
                        }
                    }
                    // Validate scope always start with CaseLabel which is followed by another CaseLabel or CaseScope
                    for (var i = 0; i < group.items.length; i++) {
                        const childGroup1 = group.items[i];
                        const childGroup2 = group.items.at(i + 1);
                        // Label followed by label or scope is valid
                        if (childGroup1.type === GroupType.CaseLabel && childGroup2?.type === GroupType.CaseLabel) {
                            childGroup1.solved = true;
                            continue;
                            // Label followed by another label is ok
                        }
                        else if (childGroup1.type === GroupType.CaseLabel && childGroup2?.type === GroupType.CaseScope) {
                            childGroup1.solved = true;
                            childGroup2.solved = true;
                            i++;
                            continue;
                            // Label that is last, don't have any scope and is missing break; is also valid
                        }
                        else if (childGroup1.type === GroupType.CaseLabel && childGroup2 === undefined) {
                            childGroup1.solved = true;
                            continue;
                        }
                        else {
                            childGroup1.solved = false;
                        }
                    }
                    break;
                case GroupType.FunctionParametersExpression:
                    for (var i = 0; i < group.items.length; i++) {
                        const childGroup1 = group.items[i];
                        // Parameter
                        if ((i % 2) === 0) {
                            // Function definition
                            if (lastFunctionScope === undefined && childGroup1.type === GroupType.Identifier) {
                                childGroup1.type = GroupType.FunctionParameterName;
                                childGroup1.solved = true;
                                // Function call
                            }
                            else if (typeEqualsToOneOf(childGroup1.type, ...GscFileParser.valueTypesWithIdentifier)) {
                                if (childGroup1.type === GroupType.Identifier) {
                                    changeGroupToSolvedAndChangeType(group, childGroup1, GroupType.Reference);
                                }
                                else {
                                    childGroup1.solved = true;
                                }
                            }
                            // Separator
                        }
                        else if (i + 1 < group.items.length) {
                            if (childGroup1.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.ParameterSeparator) && (i % 2) !== 0) {
                                changeGroupToSolvedAndChangeType(group, childGroup1, GroupType.Token);
                            }
                        }
                    }
                    break;
                case GroupType.KeywordParametersExpression:
                    for (var i = 0; i < group.items.length; i++) {
                        const childGroup1 = group.items[i];
                        // Parameter
                        if ((i % 2) === 0) {
                            if (typeEqualsToOneOf(childGroup1.type, ...GscFileParser.valueTypesWithIdentifier)) {
                                if (childGroup1.type === GroupType.Identifier) {
                                    changeGroupToSolvedAndChangeType(group, childGroup1, GroupType.Reference);
                                }
                                else {
                                    childGroup1.solved = true;
                                }
                            }
                            // Separator
                        }
                        else if (i + 1 < group.items.length) {
                            if (childGroup1.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.ParameterSeparator) && (i % 2) !== 0) {
                                changeGroupToSolvedAndChangeType(group, childGroup1, GroupType.Token);
                            }
                        }
                    }
                    break;
                case GroupType.Expression:
                    // (var1)
                    if (group.items.length === 1 && group.items[0].type === GroupType.Identifier) {
                        changeGroupToSolvedAndChangeType(group, group.items[0], GroupType.Reference);
                    }
                    break;
            }
        }
        function solve_unsolved(group, parentGroup = undefined, previousItem = undefined, lastFunctionScope = undefined, lastDeveloperScope = undefined) {
            for (var i = 0; i < group.items.length; i++) {
                const innerGroup = group.items[i];
                const previousGroup = i === 0 ? undefined : group.items[i - 1];
                solve_unsolved(innerGroup, group, previousGroup, group.type === GroupType.FunctionScope ? group : lastFunctionScope, group.typeEqualsToOneOf(GroupType.DeveloperBlock, GroupType.DeveloperBlockInner) ? group : lastDeveloperScope);
            }
            switch (group.type) {
                case GroupType.Root:
                    //parentGroup.solved = true;
                    break;
                case GroupType.TerminatedPreprocessorStatement:
                case GroupType.FunctionDefinition:
                    if (parentGroup !== undefined && lastFunctionScope === undefined &&
                        parentGroup.typeEqualsToOneOf(GroupType.Root, GroupType.DeveloperBlock)) {
                        group.solved = true;
                    }
                    break;
                case GroupType.DeveloperBlock:
                    // In root
                    group.solved = lastFunctionScope === undefined && lastDeveloperScope === undefined;
                    break;
                case GroupType.DeveloperBlockInner:
                    // In function
                    group.solved = lastFunctionScope !== undefined && lastDeveloperScope === undefined;
                    break;
                case GroupType.Scope:
                case GroupType.TerminatedStatement:
                case GroupType.Terminator:
                    if (parentGroup !== undefined && ((parentGroup.typeEqualsToOneOf(...GscFileParser.scopeTypes) && parentGroup.type !== GroupType.SwitchScope))) {
                        if (group.type === GroupType.Terminator) {
                            if (group.solved === false && (previousItem === undefined || previousItem.solved)) {
                                group.type = GroupType.ExtraTerminator;
                                group.solved = true;
                            }
                        }
                        else {
                            group.solved = true;
                        }
                    }
                    break;
                case GroupType.Expression:
                    // (( ))  Expression -> Expression!
                    // ((0))  Expression -> Expression -> Constant
                    if (group.items.length === 0) {
                        group.solved = false;
                    }
                    else {
                        if (group.items[0].typeEqualsToOneOf(...GscFileParser.valueTypes) && group.items[0].type !== GroupType.Expression) {
                            group.items[0].solved = true;
                        }
                        if (lastFunctionScope !== undefined) {
                            group.solved = true;
                        }
                    }
                    break;
            }
        }
        // Create root tree item
        var rootGroup = new GscGroup({
            parent: undefined,
            type: GroupType.Root,
            tokenIndexStart: tokens.length > 0 ? 0 : -1,
            tokenIndexEnd: tokens.length - 1
        }, tokens);
        // All tokens convert to tree item
        var unsolvedTokens = tokens.map((f, i) => {
            var group = new GscGroup({
                parent: rootGroup,
                type: GroupType.Unknown,
                tokenIndexStart: i,
                tokenIndexEnd: i
            }, tokens);
            return group;
        });
        //rootGroup.items.push(...unsolvedTokens);
        unsolvedTokens.forEach(t => {
            rootGroup.items.push(t);
        });
        // https://en.cppreference.com/w/c/language/operator_precedence
        walkGroup(rootGroup, (group) => {
            groupByBracketPairs(group, TokenType.DeveloperStart, TokenType.DeveloperEnd, GroupType.DeveloperBlock);
        });
        walkGroup(rootGroup, (group) => {
            groupByBracketPairs(group, TokenType.ScopeStart, TokenType.ScopeEnd, GroupType.Scope);
        });
        walkGroup(rootGroup, (group) => {
            groupByBracketPairs(group, TokenType.ExpressionStart, TokenType.ExpressionEnd, GroupType.Expression);
        });
        walkGroup(rootGroup, (group) => {
            groupByBracketPairs(group, TokenType.ArrayStart, TokenType.ArrayEnd, GroupType.Array);
        });
        //console.log(this.debug(tokens, rootGroup, true));
        // Change numbers, strings, true, false etc.. into known types like Identifiers, Constant, ReservedKeywords
        walkGroup(rootGroup, (group) => { change_singleUnknownTokens(group); });
        // Join +1 -1  -.1  into value
        walkGroup(rootGroup, (group) => { group_numberSign(group); });
        // Join path - maps\mp\aaa
        walkGroup(rootGroup, (group) => { group_path(group); });
        // Preprocessors
        group_byKeywordNameAndGroup(["#include"], [GroupType.Path], GroupType.PreprocessorStatement, GroupType.ReservedKeyword, GroupType.Path);
        group_byKeywordNameAndGroup(["#using_animtree"], [GroupType.Expression], GroupType.PreprocessorStatement, GroupType.ReservedKeyword, GroupType.PreprocessorAnimtreeParametersExpression);
        group_byKeyword(["#animtree"], GroupType.Constant, GroupType.ReservedKeyword);
        // Join function pointer dereference, which consists of 2 inner array and expression
        // [[funcPointer]]()
        group_functionPointerDereference();
        // Join function call = function name + expression
        // CountPlayers()
        group_byGroupAndGroup([GroupType.Identifier], [GroupType.Expression], GroupType.FunctionCall, GroupType.FunctionName, GroupType.FunctionParametersExpression);
        // Join function call = path + function call
        // maps\mp\gametypes\_teams::CountPlayers()
        group_byGroupAndTokenAndGroup([GroupType.Path], TokenType.FunctionPointer, [GroupType.FunctionCall], GroupType.FunctionCall, GroupType.Path, GroupType.Token, GroupType.FunctionCall);
        // Join keyword call = keyword + expression
        // waittill ("abc", ...)
        const keywordsWithExpressionAndVar = ["waittill", "waittillmatch", "notify", "endon"];
        group_byKeywordNameAndGroup(keywordsWithExpressionAndVar, [GroupType.Expression], GroupType.KeywordCall, GroupType.ReservedKeyword, GroupType.KeywordParametersExpression);
        // if ()
        group_byKeywordNameAndGroup(["if"], [GroupType.Expression], GroupType.IfDeclaration, GroupType.ReservedKeyword, GroupType.Expression);
        // for ()
        group_byKeywordNameAndGroup(["for"], [GroupType.Expression], GroupType.ForDeclaration, GroupType.ReservedKeyword, GroupType.ForExpression);
        // while ()
        group_byKeywordNameAndGroup(["while"], [GroupType.Expression], GroupType.WhileDeclaration, GroupType.ReservedKeyword, GroupType.Expression);
        // switch ()
        group_byKeywordNameAndGroup(["switch"], [GroupType.Expression], GroupType.SwitchDeclaration, GroupType.ReservedKeyword, GroupType.Expression);
        // case "aaa":
        group_byKeywordAndGroupAndToken(["case"], [GroupType.Constant], TokenType.Case, GroupType.CaseLabel, GroupType.ReservedKeyword, GroupType.Constant, GroupType.Token);
        // default:
        group_byKeywordAndToken(["default"], TokenType.Case, GroupType.CaseLabel, GroupType.ReservedKeyword, GroupType.Token);
        // ::CountPlayers
        group_byTokenAndGroup(TokenType.FunctionPointer, [GroupType.Identifier], GroupType.FunctionPointer, GroupType.Token, GroupType.FunctionName);
        // maps\mp\gametypes\_teams::CountPlayers
        group_byGroupAndGroup([GroupType.Path], [GroupType.FunctionPointer], GroupType.FunctionPointerExternal, GroupType.Path, GroupType.FunctionPointer);
        // Join variables - level.aaa  game["aaa"] 
        // thread {FunctionCall}            ->   thread CountPlayers()
        // var1 {FunctionCall}              ->   var1 CountPlayers()
        // var1 {FunctionCallWithThread}    ->   var1 thread CountPlayers()
        group_variables_and_function_call(rootGroup);
        //console.log(this.debugAsString(tokens, rootGroup, true));
        // Join (int)1   (int)level.name
        group_casting(rootGroup);
        // Join operations
        // !var1   !level.aaa   !(...)   ~var1   aaa && !var1   aaa && !level.aaa   aaa && !(...)  aaa && bbb  %anim_file_name
        group_value_operations(rootGroup);
        // Change expression with 3 parameters to vector -> (0, 0, 0)
        walkGroup(rootGroup, (group) => { change_expressionToVector(group); });
        // Assignment
        // aaa = (...)
        group_byGroupAndTokenAndGroup([GroupType.Identifier, GroupType.Reference], TokenType.Assignment, GscFileParser.valueTypesWithIdentifier, GroupType.Statement, GroupType.Reference, GroupType.Token, GroupType.Value);
        // aaa += (...)
        group_byGroupAndTokenAndGroup([GroupType.Identifier, GroupType.Reference], TokenType.Assignment2, GscFileParser.valueTypesWithIdentifier, GroupType.Statement, GroupType.Reference, GroupType.Token, GroupType.Value);
        // level.aaa++
        group_byGroupAndToken([GroupType.Identifier, GroupType.Reference], TokenType.Assignment3, GroupType.Statement, GroupType.Reference, GroupType.Token);
        // return {Value}
        group_byKeywordNameAndGroup(["return"], GscFileParser.valueTypesWithIdentifier, GroupType.Statement, GroupType.ReservedKeyword, GroupType.Value);
        // wait 0.1
        group_byKeywordNameAndGroup(["wait"], GscFileParser.valueTypesWithIdentifier, GroupType.Statement, GroupType.ReservedKeyword, GroupType.Value);
        // Single keywords
        // return     
        // waittillframeend
        // break
        // waittillframeend
        group_byKeyword(["return", "break", "continue", "waittillframeend", "breakpoint"], GroupType.Statement, GroupType.ReservedKeyword);
        // statement;
        const terminationNeededFor = [GroupType.Statement, ...GscFileParser.functionCallTypes,
            GroupType.KeywordCall, GroupType.KeywordCallWithObject];
        group_byGroupAndGroup(terminationNeededFor, [GroupType.Terminator], GroupType.TerminatedStatement, GroupType.Statement, GroupType.Terminator);
        // preprocessor;
        group_byGroupAndGroup([GroupType.PreprocessorStatement], [GroupType.Terminator], GroupType.TerminatedPreprocessorStatement, GroupType.PreprocessorStatement, GroupType.Terminator);
        // Declaration join
        // if() {} else
        // for (...) {}       
        // for (...) var1=1;
        group_declarations();
        // Function definition
        // {FunctionCall} {Scope}    ->  funcName() { ... }
        group_byGroupAndGroup([GroupType.FunctionCall], [GroupType.Scope], GroupType.FunctionDefinition, GroupType.FunctionDeclaration, GroupType.FunctionScope);
        group_the_rest(rootGroup);
        solve_unsolved(rootGroup);
        //console.log(this.debugGroupAsObject(tokens, rootGroup));
        //console.warn("- finished -");
        return rootGroup;
    }
    /**
     * Analyze the data structure tree and save it. Analyzed stuff:
     *  - function definitions
     *  - variable definitions
     * @param rootGroup The root tree of data structure tree
     * @returns Data containing info about functions, global and local variables, etc...
     */
    static analyze(rootGroup, content) {
        var data = new GscData(rootGroup, content);
        walkGroupItems(rootGroup, rootGroup.items);
        function walkGroupItems(parentGroup, items, lastFunction = undefined) {
            for (var i = 0; i < items.length; i++) {
                var innerGroup = items[i];
                var func = undefined;
                switch (innerGroup.type) {
                    // Save #include path
                    case GroupType.Path:
                        if (parentGroup.type === GroupType.PreprocessorStatement &&
                            parentGroup.getFirstToken().name === "#include") {
                            data.includes.push(innerGroup.getTokensAsString());
                        }
                        break;
                    // Save functions
                    case GroupType.FunctionDefinition:
                        if (innerGroup.items.length === 2 && // declaration and scope
                            innerGroup.items[0].type === GroupType.FunctionDeclaration &&
                            innerGroup.items[0].items.length === 2 && // function name and parameters
                            innerGroup.items[0].items[0].type === GroupType.FunctionName &&
                            innerGroup.items[0].items[1].type === GroupType.FunctionParametersExpression &&
                            innerGroup.items[1].type === GroupType.FunctionScope) {
                            const paramTokens = [];
                            for (let i = 0; i < innerGroup.items[0].items[1].items.length; i += 2) {
                                const element = innerGroup.items[0].items[1].items[i];
                                if (element.type === GroupType.FunctionParameterName) {
                                    paramTokens.push(element.getSingleToken());
                                }
                            }
                            func = {
                                name: innerGroup.items[0].items[0].getSingleToken().name,
                                parameters: paramTokens,
                                localVariableDefinitions: [],
                                range: innerGroup.getRange(),
                                scopeRange: innerGroup.items[1].getRange()
                            };
                            data.functions.push(func);
                        }
                        break;
                    // Save variable definitions
                    case GroupType.Statement:
                        // varName = ...;    varNameStruct.aaa = ...;
                        if (lastFunction !== undefined && innerGroup.items.length >= 2 &&
                            innerGroup.items[0].type === GroupType.Reference &&
                            innerGroup.items[0].items.length >= 1 &&
                            innerGroup.items[1].type === GroupType.Token &&
                            innerGroup.items[1].getFirstToken().type === TokenType.Assignment) // =
                         {
                            const variableReference = innerGroup.items[0];
                            const firstToken = variableReference.getFirstToken();
                            if (firstToken.name === "level") {
                                addDefinition(data.levelVariablesDefinitions, variableReference);
                            }
                            else if (firstToken.name === "game") {
                                addDefinition(data.gameVariablesDefinitions, variableReference);
                            }
                            else {
                                // Arrays does not have to be explicitly defined like 'aaa = [];', 
                                // Expression like 'aaa[0] = 1;' means that aaa is defined as array
                                const otherReferences = [];
                                var currentGroup = variableReference;
                                while (currentGroup.items.at(1)?.type === GroupType.Array) {
                                    otherReferences.unshift(currentGroup.items[0]);
                                    currentGroup = currentGroup.items[0];
                                }
                                otherReferences.forEach(r => addDefinition(lastFunction.localVariableDefinitions, r, GscVariableDefinitionType.Array));
                                addDefinition(lastFunction.localVariableDefinitions, variableReference);
                            }
                            function addDefinition(array, variableReference, type = GscVariableDefinitionType.Unknown) {
                                var variableDefinition = {
                                    variableReference: variableReference,
                                    type: type
                                };
                                array.push(variableDefinition);
                                // If type is not resolved yet, determine it from assigned value
                                if (type === GscVariableDefinitionType.Unknown) {
                                    const valueGroup = innerGroup.items.at(2);
                                    switch (valueGroup?.type) {
                                        case GroupType.Constant:
                                            const token = valueGroup.getFirstToken();
                                            switch (token.type) {
                                                case TokenType.Array:
                                                    variableDefinition.type = GscVariableDefinitionType.Array;
                                                    break;
                                                case TokenType.String:
                                                    variableDefinition.type = GscVariableDefinitionType.String;
                                                    break;
                                                case TokenType.LocalizedString:
                                                    variableDefinition.type = GscVariableDefinitionType.LocalizedString;
                                                    break;
                                                case TokenType.CvarString:
                                                    variableDefinition.type = GscVariableDefinitionType.CvarString;
                                                    break;
                                                case TokenType.Number:
                                                    const isFloat = token.name.includes(".");
                                                    variableDefinition.type = isFloat ? GscVariableDefinitionType.Float : GscVariableDefinitionType.Integer;
                                                    break;
                                                case TokenType.Keyword:
                                                    switch (token.name) {
                                                        case "undefined":
                                                            variableDefinition.type = GscVariableDefinitionType.Undefined;
                                                            break;
                                                        case "true":
                                                        case "false":
                                                            variableDefinition.type = GscVariableDefinitionType.Bool;
                                                            break;
                                                    }
                                                    break;
                                                // #animtree 
                                                case TokenType.Preprocessor:
                                                    if (token.name === "#animtree") {
                                                        variableDefinition.type = GscVariableDefinitionType.XAnim;
                                                    }
                                                    break;
                                                // %anim_file_name
                                                case TokenType.Operator:
                                                    if (valueGroup.items.length === 2 && valueGroup.items[1].type === GroupType.XAnim) {
                                                        variableDefinition.type = GscVariableDefinitionType.XAnim;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case GroupType.FunctionPointer:
                                        case GroupType.FunctionPointerExternal:
                                            variableDefinition.type = GscVariableDefinitionType.Function;
                                            break;
                                        case GroupType.Vector:
                                            variableDefinition.type = GscVariableDefinitionType.Vector;
                                            break;
                                        case GroupType.Value:
                                            variableDefinition.type = GscVariableDefinitionType.UnknownValue;
                                            break;
                                        case GroupType.Reference:
                                            variableDefinition.type = GscVariableDefinitionType.UnknownValueFromVariable;
                                            break;
                                        case GroupType.FunctionCall:
                                            const funcName = valueGroup.items.at(0)?.getFirstToken();
                                            if (funcName !== undefined) {
                                                switch (funcName.name.toLowerCase()) {
                                                    case "spawnstruct":
                                                        variableDefinition.type = GscVariableDefinitionType.Structure;
                                                        break;
                                                    case "spawn":
                                                        variableDefinition.type = GscVariableDefinitionType.Entity;
                                                        break;
                                                    case "getdvar":
                                                        variableDefinition.type = GscVariableDefinitionType.String;
                                                        break;
                                                    default:
                                                        variableDefinition.type = GscVariableDefinitionType.UnknownValueFromFunction;
                                                        break;
                                                }
                                            }
                                            break;
                                    }
                                }
                            }
                        }
                        break;
                }
                walkGroupItems(innerGroup, innerGroup.items, func ?? lastFunction);
            }
        }
        return data;
    }
    static debugGroupAsObject(tokens, currentGroup) {
        var type = "" + GroupType[currentGroup.type];
        if (currentGroup.tokenIndexEnd - currentGroup.tokenIndexStart <= 2) {
            type += "   (" + tokens.slice(currentGroup.tokenIndexStart, currentGroup.tokenIndexEnd + 1).map(f => TokenType[f.type]).join(" ") + ")";
        }
        var tkns = "(" + currentGroup.tokenIndexStart + " - " + currentGroup.tokenIndexEnd + ")  ->  " +
            tokens.slice(currentGroup.tokenIndexStart, currentGroup.tokenIndexEnd + 1).map(f => f.name).join(" ") + "";
        var data = {
            a03_unsolved: (currentGroup.solved) ? undefined : "!!! UNSOLVED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            a04_deadCode: (!currentGroup.deadCode) ? undefined : "!!! DEADCODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            a01_type: type,
            a02_tokens: tkns,
            a06_itemsArray: []
        };
        for (let item of currentGroup.items) {
            const itemDebug = this.debugGroupAsObject(tokens, item);
            data.a06_itemsArray.push(itemDebug);
        }
        return data;
    }
    static debugAsString(tokens, rootGroup, printChilds, startGroup = undefined) {
        var s = [];
        function write(text) {
            s.push(text);
        }
        function writeLine(text) {
            write(text + "\n");
        }
        //writeLine("--------------------------------------------------------------");
        //writeLine("tokens: " + tokens.length + " [" +  tokens.map(f => f.name).join(" ") + "]");
        //writeLine("--------------------------------------------------------------");
        write(this.debugGroupAsString(tokens, undefined, rootGroup, 0, printChilds, startGroup));
        writeLine("--------------------------------------------------------------");
        return s.join("");
    }
    static debugGroupAsString(tokens, parentGroup, currentGroup, level, printChilds, startGroup = undefined) {
        var s = [];
        var startGroupFound = false;
        function write(text) {
            s.push(text);
        }
        function writeLine(text) {
            write(text + "\n");
        }
        //var spaces1 = ".    ".repeat((level+1)/2);
        //var spaces2 = ".    ".repeat((level+1)/2) + ".  ";
        var spaces1 = ".  ".repeat((level + 1) / 2);
        var spaces2 = ".  ".repeat((level + 1) / 2) + ". ";
        if (startGroup !== undefined && startGroupFound === false) {
            writeLine(spaces1 + GroupType[currentGroup.type] + " (" + currentGroup.tokenIndexStart + " - " + currentGroup.tokenIndexEnd + "):");
        }
        if (startGroup !== undefined && currentGroup !== startGroup) {
            for (let item of currentGroup.items) {
                write(this.debugGroupAsString(tokens, currentGroup, item, level + 2, printChilds, startGroup));
            }
            return s.join("");
        }
        else if (currentGroup === startGroup) {
            startGroupFound = true;
        }
        //var spaces2 = new Array((level+1) * 2 + 1).join(' ');
        writeLine(spaces1 + "{");
        // writeLine(spaces2 + "solved: " + currentGroup.solved);
        if (!currentGroup.solved) {
            writeLine(spaces2 + "!!! UNSOLVED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        // writeLine(spaces2 + "deadCode: " + currentGroup.deadCode);
        if (currentGroup.deadCode) {
            writeLine(spaces2 + "!!! DEADCODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        if (currentGroup.parent !== parentGroup) {
            writeLine(spaces2 + "!!! PARENT MISMATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        write(spaces2 + "type: " + GroupType[currentGroup.type]);
        if (currentGroup.tokenIndexEnd - currentGroup.tokenIndexStart <= 3) {
            write("   (" +
                tokens.slice(currentGroup.tokenIndexStart, currentGroup.tokenIndexEnd + 1).map(f => TokenType[f.type]).join(" ") + ")");
        }
        writeLine("");
        writeLine(spaces2 + "tokens: " +
            "(" + currentGroup.tokenIndexStart + " - " + currentGroup.tokenIndexEnd + ")  ->  " +
            tokens.slice(currentGroup.tokenIndexStart, currentGroup.tokenIndexEnd + 1).map(f => f.name).join(" ") + "");
        if (currentGroup.tokenIndexStart >= 0 && currentGroup.tokenIndexEnd >= 0) {
            writeLine(spaces2 + "range: (" +
                "L:" + tokens[currentGroup.tokenIndexStart].range.start.line + " " +
                "C:" + tokens[currentGroup.tokenIndexStart].range.start.character + "" +
                " - " +
                "L:" + tokens[currentGroup.tokenIndexEnd].range.end.line + " " +
                "C:" + tokens[currentGroup.tokenIndexEnd].range.end.character + ")");
        }
        if (currentGroup.items.length > 0) {
            writeLine(spaces2 + "items: (" + currentGroup.items.length + ")");
            if (printChilds) {
                writeLine(spaces2 + "[");
                for (let item of currentGroup.items) {
                    write(this.debugGroupAsString(tokens, currentGroup, item, level + 2, printChilds, startGroup));
                }
                writeLine(spaces2 + "]");
            }
        }
        writeLine(spaces1 + "},");
        return s.join("");
    }
    static generateTestChecks(tokens, rootGroup) {
        var s = [];
        walkGroup(rootGroup, "checkGroup2(rootGroup, rootGroup");
        function walkGroup(currentGroup, prefix) {
            s.push(prefix);
            s.push(", ");
            s.push("GroupType.");
            s.push(GroupType[currentGroup.type]);
            s.push(", ");
            s.push(currentGroup.tokenIndexStart.toString());
            s.push(", ");
            s.push(currentGroup.tokenIndexEnd.toString());
            s.push(", ");
            s.push(currentGroup.solved ? "true" : "false");
            s.push(", ");
            s.push(currentGroup.items.length.toString()); /*
            s.push(", ");
            s.push(currentGroup.deadCode ? "true" : "false");*/
            s.push(");\n");
            for (var i = 0; i < currentGroup.items.length; i++) {
                walkGroup(currentGroup.items[i], prefix + ".items[" + i + "]");
            }
        }
        return s.join("");
    }
}
exports.GscFileParser = GscFileParser;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Unknown"] = 0] = "Unknown";
    TokenType[TokenType["DeveloperStart"] = 1] = "DeveloperStart";
    TokenType[TokenType["DeveloperEnd"] = 2] = "DeveloperEnd";
    TokenType[TokenType["Preprocessor"] = 3] = "Preprocessor";
    /** Char '{' */
    TokenType[TokenType["ScopeStart"] = 4] = "ScopeStart";
    /** Char '}' */
    TokenType[TokenType["ScopeEnd"] = 5] = "ScopeEnd";
    /** Char '(' */
    TokenType[TokenType["ExpressionStart"] = 6] = "ExpressionStart";
    /** Char ')' */
    TokenType[TokenType["ExpressionEnd"] = 7] = "ExpressionEnd";
    /** Char '[' */
    TokenType[TokenType["ArrayStart"] = 8] = "ArrayStart";
    /** Char ']' */
    TokenType[TokenType["ArrayEnd"] = 9] = "ArrayEnd";
    /** Char '.' */
    TokenType[TokenType["Structure"] = 10] = "Structure";
    /** Char '\\' */
    TokenType[TokenType["PathSeparator"] = 11] = "PathSeparator";
    /** Chars '::' */
    TokenType[TokenType["FunctionPointer"] = 12] = "FunctionPointer";
    /** Char ',' */
    TokenType[TokenType["ParameterSeparator"] = 13] = "ParameterSeparator";
    /** Char ':' */
    TokenType[TokenType["Case"] = 14] = "Case";
    /** Char '=' */
    TokenType[TokenType["Assignment"] = 15] = "Assignment";
    /** Char '+=', '-=', '*=', '/=', '%=', '|=', '&=', '^=' */
    TokenType[TokenType["Assignment2"] = 16] = "Assignment2";
    /** Right-sided operators - chars '++', '--' */
    TokenType[TokenType["Assignment3"] = 17] = "Assignment3";
    /** 2-sided operators - chars ('+', '-','*', '/', '%'),   ('|', '&', '^', '<<', '>>')   ('==', '!=', '<', '>', '<=', '>=', '&&', '||')   */
    TokenType[TokenType["Operator"] = 18] = "Operator";
    /** Left-sided operator - char '!', '~' */
    TokenType[TokenType["OperatorLeft"] = 19] = "OperatorLeft";
    /** Char ';' */
    TokenType[TokenType["Semicolon"] = 20] = "Semicolon";
    TokenType[TokenType["String"] = 21] = "String";
    /** Like &"STRING_ABC" */
    TokenType[TokenType["LocalizedString"] = 22] = "LocalizedString";
    /** Like #"sv_running" - only for COD:BO1 */
    TokenType[TokenType["CvarString"] = 23] = "CvarString";
    TokenType[TokenType["Number"] = 24] = "Number";
    /** Char '[]' */
    TokenType[TokenType["Array"] = 25] = "Array";
    TokenType[TokenType["Keyword"] = 26] = "Keyword";
    /* Char # */
    TokenType[TokenType["Hashtag"] = 27] = "Hashtag";
})(TokenType || (exports.TokenType = TokenType = {}));
var Level;
(function (Level) {
    Level[Level["Default"] = 0] = "Default";
    Level[Level["SingleLineComment"] = 1] = "SingleLineComment";
    Level[Level["MultiLineComment"] = 2] = "MultiLineComment";
    Level[Level["PreprocessorName"] = 3] = "PreprocessorName";
    Level[Level["String"] = 4] = "String";
    Level[Level["LocalizedString"] = 5] = "LocalizedString";
    Level[Level["CvarString"] = 6] = "CvarString";
    Level[Level["Number"] = 7] = "Number";
    Level[Level["Float"] = 8] = "Float";
    Level[Level["Keyword"] = 9] = "Keyword";
})(Level || (Level = {}));
class GscGroup {
    //public readonly debug: string;
    parent;
    items = [];
    type;
    tokenIndexStart;
    tokenIndexEnd;
    solved = false;
    deadCode = false;
    tokensAll;
    constructor({ parent, type, tokenIndexStart, tokenIndexEnd }, tokens) {
        this.parent = parent;
        this.type = type;
        this.tokenIndexStart = tokenIndexStart;
        this.tokenIndexEnd = tokenIndexEnd;
        this.tokensAll = tokens;
        //this.debug = this.toString();
    }
    getSingleToken() {
        if (this.tokenIndexStart === this.tokenIndexEnd && this.items.length === 0) {
            return this.tokensAll[this.tokenIndexStart];
        }
        else {
            return undefined;
        }
    }
    getUnknownToken() {
        if (this.tokenIndexStart === this.tokenIndexEnd && this.items.length === 0 && this.type === GroupType.Unknown) {
            return this.tokensAll[this.tokenIndexStart];
        }
        else {
            return undefined;
        }
    }
    getFirstToken() {
        return this.tokensAll[this.tokenIndexStart];
    }
    getTypeOfUnknownToken() {
        return this.getUnknownToken()?.type;
    }
    getSingleTokenType() {
        return this.getSingleToken()?.type;
    }
    isUnknownUnsolvedSingleTokenOfOneOfType(...type) {
        if (this.tokenIndexStart === this.tokenIndexEnd && this.items.length === 0 && this.type === GroupType.Unknown && this.solved === false) {
            return type.includes(this.tokensAll[this.tokenIndexStart].type);
        }
        else {
            return false;
        }
    }
    isUnsolvedSingleTokenOfOneOfType(...type) {
        if (this.tokenIndexStart === this.tokenIndexEnd && this.items.length === 0 && this.solved === false) {
            return type.includes(this.tokensAll[this.tokenIndexStart].type);
        }
        else {
            return false;
        }
    }
    isUnsolvedGroupOfOneOfType(...type) {
        if (this.solved === false) {
            return type.includes(this.type);
        }
        else {
            return false;
        }
    }
    isReservedKeywordOfName(...names) {
        if (this.type === GroupType.ReservedKeyword) {
            const name = this.getSingleToken()?.name;
            if (name === undefined) {
                return false;
            }
            return names.includes(name);
        }
        else {
            return false;
        }
    }
    typeEqualsToOneOf(...groups) {
        if (this.type === undefined) {
            return false;
        }
        return groups.includes(this.type);
    }
    getRange() {
        return new vscode.Range(this.tokensAll[this.tokenIndexStart].range.start, this.tokensAll[this.tokenIndexEnd].range.end);
    }
    getIndex() {
        if (this.parent === undefined) {
            return undefined;
        }
        var index = this.parent.items.indexOf(this);
        if (index === -1) {
            return undefined;
        }
        return index;
    }
    findLastParentInSequenceOfType(type) {
        var group = this;
        while (group.parent?.type === type) {
            group = group.parent;
        }
        if (group.type === type) {
            return group;
        }
        else {
            return undefined;
        }
    }
    findParentOfType(...type) {
        var group = this;
        while (group?.parent !== undefined && !type.includes(group?.parent.type)) {
            group = group.parent;
        }
        if (group?.parent !== undefined && type.includes(group?.parent.type)) {
            return group?.parent;
        }
        else {
            return undefined;
        }
    }
    unwrapType(type) {
        var group = this;
        while (group.type === type && group.items.length === 1) {
            group = group.items[0];
        }
        return group;
    }
    findGroupOnLeftAtPosition(position, lastGroup = undefined, level = 0) {
        // Create an array of ranges and related group
        const items = this.items.map(t => {
            return {
                range: t.getRange(),
                group: t,
                isTrueGroup: true
            };
        });
        // If last child node does not end with with the same token as the parent, add it into array
        // Scopes like {} [] () does not have their tokens defined
        const lastChildGroup = this.items.at(-1);
        if (lastChildGroup !== undefined) {
            for (var i = lastChildGroup.tokenIndexEnd + 1; i <= this.tokenIndexEnd; i++) {
                items.push({
                    range: this.tokensAll[i].range,
                    group: this,
                    isTrueGroup: false
                });
            }
        }
        for (var data of items) {
            const range = data.range;
            if (range.end.isBeforeOrEqual(position) &&
                (lastGroup === undefined || (range.start.isAfterOrEqual(lastGroup.getRange().start)))) {
                lastGroup = data.group;
            }
            //if (range.contains(position)) {
            if (((position.line === range.start.line && position.character > range.start.character) || position.line > range.start.line) &&
                ((position.line === range.end.line && position.character <= range.end.character) || position.line < range.end.line)
                && data.isTrueGroup) {
                lastGroup = data.group;
                lastGroup = data.group.findGroupOnLeftAtPosition(position, lastGroup, level + 1);
                break;
            }
        }
        if (lastGroup !== undefined && level === 0) {
            lastGroup = lastGroup.findGroupOnLeftAtPosition(position, lastGroup, level + 1);
        }
        return lastGroup;
    }
    /**
     * Select variable tokens like 'level.aaa.bbb' from document
     * Needs to find boundaries of variable, for example: (| indicates cursor pos)
     *
     *      ...; abcd|         => abcd
     *      abcd[abcd[0]|]     => abcd[0]
     *
     * @param position
     * @returns
     */
    getVariableStringBeforePosition(position) {
        const groupAtCursor = this;
        const tokens = groupAtCursor.tokensAll;
        // Select variable tokens like 'level.aaa.bbb' from document
        // Needs to find boundaries of variable, for example: (| indicates cursor pos)
        //   ...; abcd|         => abcd
        //   abcd[abcd[0]|]     => abcd[0]
        var variableBeforeCursor = "";
        // Find parent of scope or array
        var scopeOfCursorGroup = groupAtCursor;
        if (!groupAtCursor.typeEqualsToOneOf(...GscFileParser.scopeTypes)) {
            scopeOfCursorGroup = groupAtCursor.findParentOfType(...GscFileParser.scopeTypes, GroupType.Array) ?? groupAtCursor;
        }
        // Loop tokens
        for (var i = groupAtCursor.tokenIndexEnd; i >= 0; i--) {
            const token = tokens[i];
            if (token.range.end.isAfter(position)) {
                continue;
            }
            const variableTokens = [TokenType.Keyword, TokenType.Structure, TokenType.ArrayStart, TokenType.ArrayEnd, TokenType.Array, TokenType.Number,
                TokenType.String, TokenType.LocalizedString, TokenType.CvarString];
            if (!variableTokens.includes(token.type) || i === scopeOfCursorGroup.tokenIndexStart) {
                const startIndex = i + 1;
                // Now go to right until cursor pos is reached
                for (i = startIndex; i <= groupAtCursor.tokenIndexEnd; i++) {
                    const token = tokens[i];
                    var tokenName = "";
                    if (token.range.contains(position)) {
                        const endIndex = token.name.length - (token.range.end.character - position.character);
                        tokenName = token.name.substring(0, endIndex);
                    }
                    else if (token.range.start.isBefore(position)) {
                        tokenName = token.name;
                    }
                    // If token does not start with word character, exit, because its not variable start
                    if (variableBeforeCursor === "" && !/^[a-zA-Z_]/.test(tokenName[0])) {
                        break;
                    }
                    variableBeforeCursor += tokenName;
                }
                break;
            }
        }
        return variableBeforeCursor;
    }
    /**
     * Create array of variable parts where structure fields and array accessors are considered as part.
     * For example:
     *
     *      struct1.field1      => ["struct1", ".field"]
     *      array1[0].field1    => ["array1", "[0]", ".field1"]
     *      array1[1][0]        => ["array1", "[1]", "[0]"]
     *
     * @returns Array of parts
     */
    getVariableParts() {
        const variableParts = [];
        loopVariableReference(this);
        function loopVariableReference(group) {
            for (var i = 0; i < group.items.length; i++) {
                const innerGroup = group.items[i];
                const prevPart = variableParts.at(-1);
                switch (innerGroup.type) {
                    case GroupType.VariableName:
                        variableParts.push({
                            text: innerGroup.getFirstToken().name,
                            implicitType: GscVariableDefinitionType.Unknown,
                            kind: vscode.CompletionItemKind.Variable
                        });
                        break;
                    case GroupType.Array:
                        // Previous part is of array type
                        if (prevPart !== undefined) {
                            prevPart.implicitType = GscVariableDefinitionType.Array;
                        }
                        // Make sure arrays with non-constant values (eg game[1+1]) are ignored
                        if (innerGroup.items.at(0)?.type !== GroupType.Constant) {
                            variableParts.push({
                                text: "[]",
                                implicitType: GscVariableDefinitionType.Unknown,
                                kind: vscode.CompletionItemKind.Variable
                            });
                            continue;
                        }
                        else {
                            variableParts.push({
                                text: "[" + innerGroup.items[0].getFirstToken().name + "]",
                                implicitType: GscVariableDefinitionType.Unknown,
                                kind: vscode.CompletionItemKind.Variable
                            });
                        }
                        break;
                    case GroupType.Token: // .
                        // Previous part is of structure type
                        if (prevPart !== undefined) {
                            prevPart.implicitType = GscVariableDefinitionType.Structure;
                        }
                        const field = group.items.at(i + 1);
                        if (field?.type === GroupType.StructureField) {
                            variableParts.push({
                                text: innerGroup.getFirstToken().name + field.getFirstToken().name,
                                implicitType: GscVariableDefinitionType.Unknown,
                                kind: vscode.CompletionItemKind.Field
                            });
                            i++;
                            continue;
                        }
                        else {
                            variableParts.push({
                                text: innerGroup.getFirstToken().name,
                                implicitType: GscVariableDefinitionType.Unknown,
                                kind: vscode.CompletionItemKind.Field
                            });
                        }
                        break;
                    case GroupType.Reference:
                        const mayContinue = loopVariableReference(innerGroup);
                        if (mayContinue === false) {
                            return false;
                        }
                        break;
                }
            }
            // Continue
            return true;
        }
        return variableParts;
    }
    /**
     * Get path
     * @param position
     * @returns
     */
    getPathStringBeforePosition(position) {
        const groupAtCursor = this;
        if (groupAtCursor.type !== GroupType.Path) {
            return "";
        }
        const tokens = groupAtCursor.tokensAll;
        var stringBeforeCursor = "";
        // Loop tokens
        for (var i = groupAtCursor.tokenIndexStart; i <= groupAtCursor.tokenIndexEnd; i++) {
            const token = tokens[i];
            if (token.range.contains(position)) {
                const endIndex = token.name.length - (token.range.end.character - position.character);
                stringBeforeCursor += token.name.substring(0, endIndex);
            }
            else if (token.range.start.isBefore(position)) {
                stringBeforeCursor += token.name;
            }
            else {
                break;
            }
        }
        return stringBeforeCursor;
    }
    /**
     * Gets function name and path. The group must be of type {@linkcode GroupType.FunctionName}.
     * @example
     *  funcName()                          => {name: "funcName", path: ""}
     *  maps\mp\gametypes\file::funcName()  => {name: "funcName", path: "maps\mp\gametypes\file"}
     * @returns
     */
    getFunctionNameAndPath() {
        const locations = [];
        const group = this;
        if (group.type !== GroupType.FunctionName) {
            return undefined;
        }
        const funcName = group.getFirstToken().name;
        var path = "";
        // Its external function call
        if (((group.parent?.type === GroupType.FunctionCall && group.parent?.parent?.type === GroupType.FunctionCall) ||
            group.parent?.type === GroupType.FunctionPointer && group.parent?.parent?.type === GroupType.FunctionPointerExternal) &&
            group.parent.parent.items[0].type === GroupType.Path) {
            path = group.parent.parent.items[0].getTokensAsString();
        }
        return { name: funcName, path: path };
    }
    getTokensBeforePosition(position) {
        return this.tokensAll.slice(this.tokenIndexStart, this.tokenIndexEnd + 1).filter(f => position.isAfterOrEqual(f.range.end));
    }
    getTokens() {
        return this.tokensAll.slice(this.tokenIndexStart, this.tokenIndexEnd + 1);
    }
    getTokensAsString() {
        return this.tokensAll.slice(this.tokenIndexStart, this.tokenIndexEnd + 1).map(f => f.name).join("");
    }
    printTokens() {
        return this.tokensAll.slice(this.tokenIndexStart, this.tokenIndexEnd + 1).map(f => f.name).join(" ");
    }
    toString = () => {
        return `{type: ${GroupType[this.type]}, tokens: ${this.tokenIndexStart} - ${this.tokenIndexEnd}, ${this.tokensAll.slice(this.tokenIndexStart, this.tokenIndexEnd + 1).map((t) => t.name).join(" ")}}`;
    };
}
exports.GscGroup = GscGroup;
class GscData {
    root;
    functions = [];
    levelVariablesDefinitions = [];
    gameVariablesDefinitions = [];
    includes = [];
    content;
    constructor(structure, content) {
        this.root = structure;
        this.content = content;
    }
}
exports.GscData = GscData;
var KeywordType;
(function (KeywordType) {
    KeywordType[KeywordType["Keyword"] = 0] = "Keyword";
    KeywordType[KeywordType["Variable"] = 1] = "Variable";
    KeywordType[KeywordType["Constant"] = 2] = "Constant";
    KeywordType[KeywordType["Function"] = 3] = "Function";
    KeywordType[KeywordType["Parameter"] = 4] = "Parameter";
    KeywordType[KeywordType["Path"] = 5] = "Path";
})(KeywordType || (exports.KeywordType = KeywordType = {}));
var GscVariableDefinitionType;
(function (GscVariableDefinitionType) {
    GscVariableDefinitionType[GscVariableDefinitionType["Unknown"] = 0] = "Unknown";
    GscVariableDefinitionType[GscVariableDefinitionType["Undefined"] = 1] = "Undefined";
    GscVariableDefinitionType[GscVariableDefinitionType["Object"] = 2] = "Object";
    GscVariableDefinitionType[GscVariableDefinitionType["String"] = 3] = "String";
    GscVariableDefinitionType[GscVariableDefinitionType["LocalizedString"] = 4] = "LocalizedString";
    GscVariableDefinitionType[GscVariableDefinitionType["CvarString"] = 5] = "CvarString";
    GscVariableDefinitionType[GscVariableDefinitionType["Vector"] = 6] = "Vector";
    GscVariableDefinitionType[GscVariableDefinitionType["Integer"] = 7] = "Integer";
    GscVariableDefinitionType[GscVariableDefinitionType["Float"] = 8] = "Float";
    GscVariableDefinitionType[GscVariableDefinitionType["Structure"] = 9] = "Structure";
    GscVariableDefinitionType[GscVariableDefinitionType["Array"] = 10] = "Array";
    GscVariableDefinitionType[GscVariableDefinitionType["Function"] = 11] = "Function";
    GscVariableDefinitionType[GscVariableDefinitionType["Entity"] = 12] = "Entity";
    GscVariableDefinitionType[GscVariableDefinitionType["Bool"] = 13] = "Bool";
    GscVariableDefinitionType[GscVariableDefinitionType["XAnim"] = 14] = "XAnim";
    GscVariableDefinitionType[GscVariableDefinitionType["UnknownValue"] = 15] = "UnknownValue";
    GscVariableDefinitionType[GscVariableDefinitionType["UnknownValueFromVariable"] = 16] = "UnknownValueFromVariable";
    GscVariableDefinitionType[GscVariableDefinitionType["UnknownValueFromFunction"] = 17] = "UnknownValueFromFunction";
})(GscVariableDefinitionType || (exports.GscVariableDefinitionType = GscVariableDefinitionType = {}));
//# sourceMappingURL=GscFileParser.js.map