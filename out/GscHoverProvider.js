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
exports.GscHoverProvider = void 0;
const vscode = __importStar(require("vscode"));
const GscFile_1 = require("./GscFile");
const GscFileParser_1 = require("./GscFileParser");
class GscHoverProvider {
    static async activate(context) {
        context.subscriptions.push(vscode.languages.registerHoverProvider('gsc', new GscHoverProvider()));
    }
    async provideHover(document, position, token) {
        // Get parsed file
        const gscData = await GscFile_1.GscFile.getFile(document.uri);
        const hover = await this.getHover(gscData, position, document.uri);
        return hover;
    }
    async getHover(gscData, position, uri) {
        let hoverText = new vscode.MarkdownString();
        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor?.type === GscFileParser_1.GroupType.FunctionName) {
            const funcNameAndPath = groupAtCursor.getFunctionNameAndPath();
            if (funcNameAndPath !== undefined) {
                // Get file URI and position where the file is defined
                const definitions = await GscFile_1.GscFile.getFunctionNameDefinitions(funcNameAndPath.name, funcNameAndPath.path, uri);
                definitions.forEach(async (d) => {
                    const gscData = await GscFile_1.GscFile.getFile(d.uri);
                    const functionData = gscData.functions.find(f => f.name === funcNameAndPath.name);
                    if (functionData === undefined) {
                        return;
                    }
                    const parametersText = functionData.parameters.map(p => p.name).join(", ");
                    hoverText.appendText(vscode.workspace.asRelativePath(d.uri));
                    hoverText.appendMarkdown("\n\n"); // Two newlines for a new paragraph, for more space you could use "\n\n---\n\n" for a horizontal rule
                    hoverText.appendMarkdown(`**${funcNameAndPath.name}**(${parametersText})`);
                });
            }
        }
        return new vscode.Hover(hoverText);
    }
}
exports.GscHoverProvider = GscHoverProvider;
//# sourceMappingURL=GscHoverProvider.js.map