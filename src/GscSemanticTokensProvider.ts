import * as vscode from 'vscode';
import { GscFiles } from './GscFiles';
import { GroupType, GscGroup} from './GscFileParser';
import { error } from 'console';
import { Issues } from './Issues';


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

        const builder = new vscode.SemanticTokensBuilder(GscSemanticTokensProvider.legend);

        // Get the parsed file
        var gscFile = await GscFiles.getFileData(document.uri, true);
        

        function walkGroupItems(parentGroup: GscGroup, items: GscGroup[], action: (parentGroup: GscGroup, group: GscGroup) => void) {
            // This object have child items, process them first
            for (var i = 0; i < items.length; i++) {
                var innerGroup = items[i];
                walkGroupItems(innerGroup, innerGroup.items, action);
                action(parentGroup, innerGroup);
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
                    group.getRange(),
                    'namespace',
                    ['declaration']
                );
            }
            else if (group.type === GroupType.FunctionName) {
                builder.push(
                    group.getRange(),
                    'function',
                    ['declaration']
                );
            }
            else if (group.type === GroupType.VariableName) {
                var token = group.getSingleToken();
                if (token !== undefined && (token.name === "level" || token.name === "game" || token.name === "self")) {
                    builder.push(
                        group.getRange(),
                        'variable',
                        ['readonly']
                    );
                } else {
                    builder.push(
                        group.getRange(),
                        'variable',
                        ['declaration']
                    );
                }
            }

            else if (group.type === GroupType.StructureField) {
                builder.push(
                    group.getRange(),
                    'variable',
                    ['declaration']
                );            
            }
            else if (group.type === GroupType.ReservedKeyword) {
                builder.push(
                    group.getRange(),
                    'keyword',
                    ['declaration']
                );
            }
        });

        //vscode.window.showInformationMessage("SemanticTokensBuilder done");
        	
		return builder.build();
	}
};