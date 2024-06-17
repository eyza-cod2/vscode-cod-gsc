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
exports.GscSemanticTokensProvider = void 0;
const vscode = __importStar(require("vscode"));
const GscFile_1 = require("./GscFile");
const GscFileParser_1 = require("./GscFileParser");
class GscSemanticTokensProvider {
    //https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#standard-token-types-and-modifiers
    static tokenTypes = [
        'namespace', // (blue-green) For identifiers that declare or reference a namespace, module, or package.
        'class', // (blue-green) For identifiers that declare or reference a class type.
        'keyword', // (purple) For tokens that represent a language keyword.
        'function', // (yellow) For identifiers that declare a function.
        'parameter', // (light-blue) For identifiers that declare or reference a function or method parameters.
        'variable', // (light-blue) For identifiers that declare or reference a local or global variable.
        'property', // (light-blue) For identifiers that declare or reference a member property, member field, or member variable.
        'enumMember', // (dark blue) For identifiers that declare or reference an enumeration property, constant, or member.
        'event', // (light-blue)
        'method', // (yellow)
        'macro', // (dark dark blue)
        'label', // (white)
        'string' // (orange) For tokens that represent a string literal.
    ];
    static tokenModifiers = [
        'declaration', // For declarations of symbols.
        'static', // For class members (static members).
        'readonly', // For readonly variables and member fields (constants).
        'modification', // For variable references where the variable is assigned to.
        'defaultLibrary' // For symbols that are part of the standard library.
    ];
    static legend = new vscode.SemanticTokensLegend(this.tokenTypes, this.tokenModifiers);
    static async activate(context) {
        context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'gsc' }, new GscSemanticTokensProvider(), GscSemanticTokensProvider.legend));
    }
    async provideDocumentSemanticTokens(document) {
        // analyze the document and return semantic tokens
        const builder = new vscode.SemanticTokensBuilder(GscSemanticTokensProvider.legend);
        //vscode.window.showWarningMessage("SemanticTokensBuilder");
        var gsc = await GscFile_1.GscFile.parseAndCacheFile(document.uri);
        function walkGroupItems(parentGroup, items, action) {
            // This object have child items, process them first
            for (var i = 0; i < items.length; i++) {
                var innerGroup = items[i];
                walkGroupItems(innerGroup, innerGroup.items, action);
                action(parentGroup, innerGroup);
            }
        }
        walkGroupItems(gsc.root, gsc.root.items, (parentGroup, group) => {
            /*
                'class',        // (blue-green) For identifiers that declare or reference a class type.
                'keyword',      // (purple) For tokens that represent a language keyword.
                'function',     // (yellow) For identifiers that declare a function.
                'parameter',    // (light-blue) For identifiers that declare or reference a function or method parameters.
                'variable',     // (light-blue, dark-blue with readonly) For identifiers that declare or reference a local or global variable.
                'property',     // (light-blue, dark-blue with readonly) For identifiers that declare or reference a member property, member field, or member variable.
                'enumMember',   // (dark blue) For identifiers that declare or reference an enumeration property, constant, or member.
                'event',        // (light-blue)
                'method',       // (yellow)
                'macro',        // (dark dark blue)
                'label',        // (white)
                'string'        // (orange) For tokens that represent a string literal.
            */
            if (group.type === GscFileParser_1.GroupType.Path) {
                builder.push(group.getRange(), 'namespace', ['declaration']);
            }
            else if (group.type === GscFileParser_1.GroupType.FunctionName) {
                builder.push(group.getRange(), 'function', ['declaration']);
            }
            else if (group.type === GscFileParser_1.GroupType.VariableName) {
                var token = group.getSingleToken();
                if (token !== undefined && (token.name === "level" || token.name === "game" || token.name === "self")) {
                    builder.push(group.getRange(), 'variable', ['readonly']);
                }
                else {
                    builder.push(group.getRange(), 'variable', ['declaration']);
                }
            }
            else if (group.type === GscFileParser_1.GroupType.StructureField) {
                builder.push(group.getRange(), 'variable', ['declaration']);
            }
            else if (group.type === GscFileParser_1.GroupType.ReservedKeyword) {
                builder.push(group.getRange(), 'keyword', ['declaration']);
            }
        });
        //vscode.window.showInformationMessage("SemanticTokensBuilder done");
        return builder.build();
    }
}
exports.GscSemanticTokensProvider = GscSemanticTokensProvider;
;
//# sourceMappingURL=GscSemanticTokensProvider.js.map