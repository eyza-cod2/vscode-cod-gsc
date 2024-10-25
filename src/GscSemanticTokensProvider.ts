import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GroupType, GscGroup} from './GscFileParser';
import { Issues } from './Issues';
import { LoggerOutput } from './LoggerOutput';
import { Events } from './Events';
import { GscFile } from './GscFile';


export class GscSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
	
    //https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#standard-token-types-and-modifiers
    public static tokenTypes = [
        'namespace',    // (blue-green) For identifiers that declare or reference a namespace, module, or package.
        'class',        // (blue-green) For identifiers that declare or reference a class type.
        'keyword',      // (purple) For tokens that represent a language keyword.
        'function',     // (yellow) For identifiers that declare a function.
        'parameter',    // (light-blue) For identifiers that declare or reference a function or method parameters.
        'variable',     // (light-blue) For identifiers that declare or reference a local or global variable.
        'property',     // (light-blue) For identifiers that declare or reference a member property, member field, or member variable.
        'enumMember',   // (dark blue) For identifiers that declare or reference an enumeration property, constant, or member.
        'event',        // (light-blue)
        'method',       // (yellow)
        'macro',        // (dark dark blue)
        'label',        // (white)
        'string'        // (orange) For tokens that represent a string literal.
    ];  
    public static tokenModifiers = [
        'declaration',      // For declarations of symbols.
        'static',           // For class members (static members).
        'readonly',         // For readonly variables and member fields (constants).
        'modification',	    // For variable references where the variable is assigned to.
        'defaultLibrary'    // For symbols that are part of the standard library.
    ];
    
    public static legend = new vscode.SemanticTokensLegend(this.tokenTypes, this.tokenModifiers);
    

    static async activate(context: vscode.ExtensionContext) {
        LoggerOutput.log("[GscSemanticTokensProvider] Activating");
        
        context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'gsc' }, new GscSemanticTokensProvider(), GscSemanticTokensProvider.legend));
    }



    async provideDocumentSemanticTokens(
	  document: vscode.TextDocument
	): Promise<vscode.SemanticTokens | undefined> {
        try {
            return await this.getDocumentSemanticTokens(document);
        } catch (error) {
            Issues.handleError(error);
        }
    }

    async getDocumentSemanticTokens(
        document: vscode.TextDocument
      ): Promise<vscode.SemanticTokens | undefined> {
        // This function is called when 
        //  - when the document's content has changed, or 
        //  - when the document is first opened, or 
        //  - when the language id of the document has changed.

		//vscode.window.showWarningMessage("SemanticTokensBuilder: " + document.uri.toString());
        LoggerOutput.log("[GscSemanticTokensProvider] Providing semantics...", vscode.workspace.asRelativePath(document.uri) + ", version: " + document.version);

        const builder = new vscode.SemanticTokensBuilder(GscSemanticTokensProvider.legend);

        // Get the parsed file
        var gscFile = GscFiles.getCachedFile(document.uri);

        // If the cached file is not found, or cached version is not the latest, wait till the file is parsed
        if (gscFile === undefined || (gscFile.version > -1 && gscFile.version !== document.version)) {

            if (gscFile === undefined) {
                LoggerOutput.log("[GscSemanticTokensProvider] File not found in cache. Waiting for file to be parsed...", vscode.workspace.asRelativePath(document.uri));
            } else {
                LoggerOutput.log("[GscSemanticTokensProvider] File version mismatch. parsed: " + gscFile.version + ". document: " + document.version + "  waiting for file to be parsed...", vscode.workspace.asRelativePath(document.uri));
            }
            
            // Wait for file to be parsed
            // If not parsed till specified time, parse the file by force
            gscFile = await new Promise<GscFile>((resolve, reject) => {
                const disposable = Events.onDidGscFileParsed((gscFileNew) => {
                    if (gscFileNew.uri.toString() === document.uri.toString()) {
                        disposable.dispose();  // Clean up the event listener
                        clearTimeout(timeoutId);  // Cancel the timeout
                        LoggerOutput.log("[GscSemanticTokensProvider] File has been parsed: " + gscFileNew.version + ". document: " + document.version);
                        resolve(gscFileNew);
                    }
                });
                const timeoutId = setTimeout(async () => {
                    disposable.dispose();
                    LoggerOutput.log("[GscSemanticTokensProvider] Parsing file by force...");
                    const gscFile = await GscFiles.getFileData(document.uri, true, "provide semantic tokens");
                    resolve(gscFile);
                }, 1000);
            });    
        }

        function walkGroupItems(parentGroup: GscGroup, items: GscGroup[], action: (parentGroup: GscGroup, group: GscGroup) => void) {
            // This object have child items, process them first
            for (var i = 0; i < items.length; i++) {
                var innerGroup = items[i];
                walkGroupItems(innerGroup, innerGroup.items, action);
                action(parentGroup, innerGroup);
            }
        }

        function getSingleLineRange(group: GscGroup): vscode.Range {
            let range = group.getRange();

            if (range.isSingleLine === false) {
                Issues.handleError(new Error(group.toString() + " spread across multiple lines - it must be single line!. Line start: " + range.start.line + ". Line end: " + range.end.line));
                // Transform the range to be single line
                range = new vscode.Range(range.start, range.start.translate(0, 1));
            }
            return range;
        }


        // Check if file is replaced via game path
        
        if (GscFiles.isFileReplacedByAnotherFile(gscFile)) {
            // Get text editor out of the document
            const editor = vscode.window.visibleTextEditors.find(e => e.document.uri.toString() === document.uri.toString());
            if (editor !== undefined) {
                // Get full range of the document
                const documentRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
                editor?.setDecorations(vscode.window.createTextEditorDecorationType({opacity: '0.5'}), [documentRange]);
            }
        }


        walkGroupItems(gscFile.data.root, gscFile.data.root.items, (parentGroup, group) => {

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

            if (group.type === GroupType.Path) {
                builder.push(
                    getSingleLineRange(group),
                    'namespace',
                    ['declaration']
                );
            }
            else if (group.type === GroupType.FunctionName) {
                builder.push(
                    getSingleLineRange(group),
                    'function',
                    ['declaration']
                );
            }
            else if (group.type === GroupType.VariableName) {
                var token = group.getSingleToken();
                if (token !== undefined && (token.name === "level" || token.name === "game" || token.name === "self")) {
                    builder.push(
                        getSingleLineRange(group),
                        'variable',
                        ['readonly']
                    );
                } else {
                    builder.push(
                        getSingleLineRange(group),
                        'variable',
                        ['declaration']
                    );
                }
            }

            else if (group.type === GroupType.StructureField) {
                builder.push(
                    getSingleLineRange(group),
                    'variable',
                    ['declaration']
                );            
            }
            else if (group.type === GroupType.ReservedKeyword) {
                builder.push(
                    getSingleLineRange(group),
                    'keyword',
                    ['declaration']
                );
            }
        });

        //vscode.window.showInformationMessage("SemanticTokensBuilder done");
        LoggerOutput.log("[GscSemanticTokensProvider] Done", vscode.workspace.asRelativePath(document.uri) + ", version: " + document.version);

		return builder.build();
	}
};