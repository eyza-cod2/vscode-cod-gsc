import * as vscode from 'vscode';
import { GscConfig } from './GscConfig';
import { GscFiles } from './GscFiles';
import { GscStatusBar } from './GscStatusBar';
import { GscFile } from './GscFile';
import { LoggerOutput } from './LoggerOutput';
import { Issues } from './Issues';

export class Events {

    static activate(context: vscode.ExtensionContext) {


        // An event that is emitted when the configuration changed.
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(async (e) => {
            try {
                LoggerOutput.log("[Events] Configuration changed.");

                await GscConfig.onDidChangeConfiguration(e);

            } catch (error) {
                Issues.handleError(error);
            }
        }));


        // An event that is emitted when a workspace folder is added or removed.
        //**Note:** this event will not fire if the first workspace folder is added, removed or changed,
        // because in that case the currently executing extensions (including the one that listens to this
        // event) will be terminated and restarted so that the (deprecated) `rootPath` property is updated
        // to point to the first workspace folder.
        context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(async e => {
            try {
                LoggerOutput.log("[Events] Workspace folders changed.");

                await GscFiles.onChangeWorkspaceFolders(e);

            } catch (error) {
                Issues.handleError(error);
            }
        }));


        var debouncedTimerOnDidChangeActiveTextEditor: NodeJS.Timeout | undefined = undefined;
        // An event which fires when the window.activeTextEditor active editor has changed. 
        // *Note* that the event also fires when the active editor changes to `undefined`.
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(async (e) => {
            try {
                const uri = e?.document.uri;
                const uriStr = uri ? vscode.workspace.asRelativePath(uri) : "undefined";

                LoggerOutput.log("[Events] Active editor changed to " + uriStr + ", debouncing update...");

                // Debounce the update
                if (debouncedTimerOnDidChangeActiveTextEditor) {
                    clearTimeout(debouncedTimerOnDidChangeActiveTextEditor);
                }
                debouncedTimerOnDidChangeActiveTextEditor = setTimeout(async () => {
                    debouncedTimerOnDidChangeActiveTextEditor = undefined;

                    LoggerOutput.log("[Events] Debounce done (250ms) - Active editor changed to " + e?.document.fileName);

                    await GscStatusBar.updateStatusBar("activeEditorChanged");
                }, 250);

            } catch (error) {
                Issues.handleError(error);
            }
        }));


        // An event that is emitted when a text document is changed. This usually happens
        // when the contents changes but also when other things like the dirty-state changes.
        vscode.workspace.onDidChangeTextDocument(e => {
            try {
                //LoggerOutput.log("[Events] Text document changed.");

                GscFiles.onTextDocumentChange(e);
            } catch (error) {
                Issues.handleError(error);
            }
        }, this, context.subscriptions);



        // An event which fires when the selection in an editor has changed.
        context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(e => {
            try {
                //LoggerOutput.log("[Events] Editor selection changed.");

                GscFiles.onChangeEditorSelection(e);
            } catch (error) {
                Issues.handleError(error);
            }
        }));


        // File rename
        context.subscriptions.push(vscode.workspace.onDidRenameFiles(async e => {
            try {
                LoggerOutput.log("[Events] File has been renamed. " + e.files.map(f => vscode.workspace.asRelativePath(f.oldUri) + " -> " + vscode.workspace.asRelativePath(f.newUri)).join(", "));

            } catch (error) {
                Issues.handleError(error);
            }
        }));

        // File delete
        context.subscriptions.push(vscode.workspace.onDidDeleteFiles(async e => {
            try {
                LoggerOutput.log("[Events] File has been deleted. " + e.files.map(f => vscode.workspace.asRelativePath(f)).join(", "));

            } catch (error) {
                Issues.handleError(error);
            }
        }));

        // File create
        context.subscriptions.push(vscode.workspace.onDidCreateFiles(async e => {
            try {
                LoggerOutput.log("[Events] File has been created. " + e.files.map(f => vscode.workspace.asRelativePath(f)).join(", "));

            } catch (error) {
                Issues.handleError(error);
            }
        }));
    }





    private static readonly onDidGscFileParsedEvent = new vscode.EventEmitter<GscFile>();
    public static readonly onDidGscFileParsed = this.onDidGscFileParsedEvent.event;


    static GscFileParsed(gscFile: GscFile) {
        LoggerOutput.log("[Events] GSC file parsed", vscode.workspace.asRelativePath(gscFile.uri));

        this.onDidGscFileParsedEvent.fire(gscFile);
    }






    private static readonly onDidGscDiagnosticChangeEvent = new vscode.EventEmitter<GscFile>();
    public static readonly onDidGscDiagnosticChange = this.onDidGscDiagnosticChangeEvent.event;

    public static GscDiagnosticsHasChanged(gscFile: GscFile) {
        LoggerOutput.log("[Events] GSC diagnostics changed for file", vscode.workspace.asRelativePath(gscFile.uri));

        this.onDidGscDiagnosticChangeEvent.fire(gscFile);
    }


    static GscFileCacheFileHasChanged(fileUri: vscode.Uri) {
        LoggerOutput.log("[Events] GSC cache changed for file", vscode.workspace.asRelativePath(fileUri));

    }
}