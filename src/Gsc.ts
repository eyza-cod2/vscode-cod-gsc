import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GscCompletionItemProvider } from './GscCompletionItemProvider'; 
import { GscSemanticTokensProvider } from './GscSemanticTokensProvider';
import { GscDiagnosticsCollection } from './GscDiagnosticsCollection';
import { GscDefinitionProvider } from './GscDefinitionProvider';
import { GscHoverProvider } from './GscHoverProvider';
import { GscStatusBar } from './GscStatusBar';
import { GscConfig } from './GscConfig';
import { GscCodeActionProvider } from './GscCodeActionProvider';


export class Gsc {

    static async activate(context: vscode.ExtensionContext) {

        console.log("------------------------------------------------------------");
        console.log("- GSC extension activated -");
        console.log("------------------------------------------------------------");

        // Register events
        await GscConfig.activate(context);
        await GscStatusBar.activate(context);
        await GscFile.activate(context);
        await GscDiagnosticsCollection.activate(context);
        await GscCodeActionProvider.activate(context);
        await GscSemanticTokensProvider.activate(context);
        await GscCompletionItemProvider.activate(context);
        await GscDefinitionProvider.activate(context);
        await GscHoverProvider.activate(context);
    }

}



