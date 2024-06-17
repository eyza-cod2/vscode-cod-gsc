"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gsc = void 0;
const GscFile_1 = require("./GscFile");
const GscCompletionItemProvider_1 = require("./GscCompletionItemProvider");
const GscSemanticTokensProvider_1 = require("./GscSemanticTokensProvider");
const GscDiagnosticsCollection_1 = require("./GscDiagnosticsCollection");
const GscDefinitionProvider_1 = require("./GscDefinitionProvider");
const GscHoverProvider_1 = require("./GscHoverProvider");
class Gsc {
    static async activate(context) {
        // Register events
        GscFile_1.GscFile.activate(context);
        GscDiagnosticsCollection_1.GscDiagnosticsCollection.activate(context);
        GscSemanticTokensProvider_1.GscSemanticTokensProvider.activate(context);
        GscCompletionItemProvider_1.GscCompletionItemProvider.activate(context);
        GscDefinitionProvider_1.GscDefinitionProvider.activate(context);
        GscHoverProvider_1.GscHoverProvider.activate(context);
    }
}
exports.Gsc = Gsc;
//# sourceMappingURL=Gsc.js.map