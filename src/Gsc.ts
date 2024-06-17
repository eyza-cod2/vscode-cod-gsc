import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GscCompletionItemProvider } from './GscCompletionItemProvider'; 
import { GscSemanticTokensProvider } from './GscSemanticTokensProvider';
import { GscDiagnosticsCollection } from './GscDiagnosticsCollection';
import { GscDefinitionProvider } from './GscDefinitionProvider';
import { GscHoverProvider } from './GscHoverProvider';


export class Gsc {

    static async activate(context: vscode.ExtensionContext) {

        // Register events
        GscFile.activate(context);
        GscDiagnosticsCollection.activate(context);
        GscSemanticTokensProvider.activate(context);
        GscCompletionItemProvider.activate(context);
        GscDefinitionProvider.activate(context);
        GscHoverProvider.activate(context);
    }

}



