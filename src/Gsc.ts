import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GscCompletionItemProvider } from './GscCompletionItemProvider';
import { GscSemanticTokensProvider } from './GscSemanticTokensProvider';
import { GscDiagnosticsCollection } from './GscDiagnosticsCollection';
import { GscReferenceProvider } from './GscReferenceProvider';
import { GscDefinitionProvider } from './GscDefinitionProvider';
import { GscHoverProvider } from './GscHoverProvider';
import { GscStatusBar } from './GscStatusBar';
import { GscConfig } from './GscConfig';
import { GscCodeActionProvider } from './GscCodeActionProvider';
import { Issues } from './Issues';
import { GscSidePanel } from './GscSidePanel';
import { GscRenameProvider } from './GscRenameProvider';
import { LoggerOutput } from './LoggerOutput';
import { Events } from './Events';


export class Gsc {

    static async activate(context: vscode.ExtensionContext) {

        console.log("##### GSC extension activated #####");
        LoggerOutput.log("[Gsc] Extension activated");

        // Register events
        try {
            await GscSidePanel.activate(context);
            await GscConfig.activate(context);
            await GscDiagnosticsCollection.activate(context);
            await GscFiles.activate(context);
            await GscCodeActionProvider.activate(context);
            await GscSemanticTokensProvider.activate(context);
            await GscCompletionItemProvider.activate(context);
            await GscReferenceProvider.activate(context);
            await GscDefinitionProvider.activate(context);
            await GscHoverProvider.activate(context);
            await GscRenameProvider.activate(context);
            await GscStatusBar.activate(context);

            Events.GscActivated();
        } catch (error) {
            Issues.handleError(error);
        }
    }

    static deactivate() {
        console.log("##### GSC extension deactivated #####");
        LoggerOutput.log("[Gsc] Extension deactivating");

        GscFiles.deactivate();
    }

}



