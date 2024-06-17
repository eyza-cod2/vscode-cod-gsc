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
exports.GscDefinitionProvider = void 0;
const vscode = __importStar(require("vscode"));
const GscFile_1 = require("./GscFile");
const GscFileParser_1 = require("./GscFileParser");
class GscDefinitionProvider {
    static async activate(context) {
        context.subscriptions.push(vscode.languages.registerDefinitionProvider('gsc', new GscDefinitionProvider()));
    }
    async provideDefinition(document, position, token) {
        // Get parsed file
        const gscData = await GscFile_1.GscFile.getFile(document.uri);
        const locations = await this.getFunctionDefinitionLocations(gscData, position, document.uri);
        return locations;
    }
    /**
     * This function finds definitions of function names in current file, included files and in external files
     *  @example
     *     function(1, 2);
     *     function_included();
     *     _tests\definition_file::function_file();
     * @returns
     */
    async getFunctionDefinitionLocations(gscData, position, documentUri) {
        const locations = [];
        // Get group before cursor
        var groupAtCursor = gscData.root.findGroupOnLeftAtPosition(position);
        if (groupAtCursor === undefined || groupAtCursor.parent === undefined) {
            return locations;
        }
        if (groupAtCursor.type === GscFileParser_1.GroupType.FunctionName) {
            const funcData = groupAtCursor.getFunctionNameAndPath();
            if (funcData !== undefined) {
                locations.push(...await GscFile_1.GscFile.getFunctionNameDefinitions(funcData.name, funcData.path, documentUri));
            }
        }
        //console.log(groupAtCursor.toString());
        //console.log(locations.map(l => l.uri.path).join("\n"));
        return locations;
    }
}
exports.GscDefinitionProvider = GscDefinitionProvider;
//# sourceMappingURL=GscDefinitionProvider.js.map