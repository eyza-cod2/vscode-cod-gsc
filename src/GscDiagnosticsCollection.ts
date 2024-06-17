import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscGroup, TokenType } from './GscFileParser';

export class GscDiagnosticsCollection {
    private static diagnosticCollection: vscode.DiagnosticCollection;

    static async activate(context: vscode.ExtensionContext) {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('gsc');
        context.subscriptions.push(this.diagnosticCollection);

        GscFile.onDidParseDocument(uri => this.updateDiagnostics(uri));
        GscFile.onDidDeleteDocument(uri => this.deleteDiagnostics(uri));

        // TODO on rename
    }


    /**
     * This function is called when some gsc file is parsed. 
     * The parsed gsc file will be analyzed for commons errors like:
     *  - missing ;
     *  - unexpected tokens (bad syntax)
     */
    static async updateDiagnostics(uri: vscode.Uri) {
        //console.log("[DiagnosticsProvider]", "Document changed, creating diagnostics...");

        var diagnostics: vscode.Diagnostic[] = [];

        var gsc2 = await GscFile.getFile(uri);

        function walkGroupItems(parentGroup: GscGroup, items: GscGroup[], action: (parentGroup: GscGroup, group: GscGroup) => boolean) {
            // This object have child items, process them first
            for (var i = 0; i < items.length; i++) {
                var innerGroup = items[i];
                const fullRangeErrorSet = action(parentGroup, innerGroup);
                if (fullRangeErrorSet === false) {
                    walkGroupItems(innerGroup, innerGroup.items, action);
                }
            }
        }


        walkGroupItems(gsc2.root, gsc2.root.items, (parentGroup, group) => {

            const terminationNeededFor = [GroupType.Statement,
                GroupType.FunctionCall, GroupType.FunctionCallWithThread, GroupType.FunctionCallWithObject, GroupType.FunctionCallWithObjectAndThread,
                GroupType.KeywordCall, GroupType.KeywordCallWithObject];

            if (group.type === GroupType.Unknown) {
                diagnostics.push(new vscode.Diagnostic(group.getRange(), "Unexpected token", vscode.DiagnosticSeverity.Error));
                return true;
            }
            else if (group.solved === false) {

                if (group.type === GroupType.Statement && parentGroup.type !== GroupType.TerminatedStatement) {
                    diagnostics.push(new vscode.Diagnostic(group.getRange(), "Missing ;", vscode.DiagnosticSeverity.Error));
                    return true;
                }
                else if (group.typeEqualsToOneOf(GroupType.Expression, GroupType.ForExpression) && group.items.length === 0) {
                    diagnostics.push(new vscode.Diagnostic(group.getRange(), "Empty expression", vscode.DiagnosticSeverity.Error));
                    return true;
                }
                else
                {
                    const firstToken = group.getFirstToken();
    
                    var token = group.getSingleToken();
                    if (token !== undefined) {
                        diagnostics.push(new vscode.Diagnostic(group.getRange(), "Unexpected token " + firstToken.name, vscode.DiagnosticSeverity.Error));
                        return true;
                    } else {
                        const range = group.getRange();
                        diagnostics.push(new vscode.Diagnostic(range, "Unexpected tokens - " + group.toString(), vscode.DiagnosticSeverity.Error));
                        return true;
                        //diagnostics.push(new vscode.Diagnostic(new vscode.Range(range.start.line, range.start.character, range.start.line, range.start.character+1), "Unsolved tokens - start", vscode.DiagnosticSeverity.Error));
                    }
                }

            } else {
                switch (group.type as GroupType) {
 
                    case GroupType.ExtraTerminator:
                        diagnostics.push(new vscode.Diagnostic(group.getRange(), "Terminator ; is not needed", vscode.DiagnosticSeverity.Information));
                        return true;
/*
                    case GroupType.TerminatedStatement:
                        if (group.items.length <= 1) {
                            diagnostics.push(new vscode.Diagnostic(group.getRange(), "Unreachable code", vscode.DiagnosticSeverity.Warning));
                            return true;
                        }
                        break;*/
                }
            }


/*
            if (group.deadCode && parentGroup.deadCode === false) {
                diagnostics.push(new vscode.Diagnostic(group.getRange(), "Unreachable code", vscode.DiagnosticSeverity.Warning));
                return true;
            }*/

            return false;
        });


        this.diagnosticCollection.set(uri, diagnostics);

        //console.log("[DiagnosticsProvider]", "Diagnostics done");
    }

    static deleteDiagnostics(uri: vscode.Uri) {
        this.diagnosticCollection.delete(uri);
    }

    static async createDiagnosticsForAll() {
        console.log("[DiagnosticsProvider]", "Creating overall diagnostics...");

        this.diagnosticCollection.clear();

        var files = GscFile.getCachedFiles();

        for(const [uri, gsc] of files) {
            this.updateDiagnostics(vscode.Uri.parse(uri));
        }

        console.log("[DiagnosticsProvider]", "Creating overall diagnostics done");
    }
}

/*

        // Define a simple object to hold the boolean value
        type SolverData = {
            scopeEnded: boolean;
        };

        function solve_unsolved(
            parentGroup: GscGroup,
            lastFunctionScope: GscGroup | undefined = undefined, 
            lastIfScope: GscGroup | undefined = undefined, 
            lastForScope: GscGroup | undefined = undefined, 
            lastWhileScope: GscGroup | undefined = undefined, 
            lastSwitchScope: GscGroup | undefined = undefined,  
            lastCaseScope: GscGroup | undefined = undefined, 
            lastScope: GscGroup | undefined = undefined, 
            scopeEnded: boolean = false
        ): SolverData
        {
            const data: SolverData = {
                scopeEnded: false
            };
            
            switch (parentGroup.type as GroupType) {   
                case GroupType.FunctionScope:
                    lastFunctionScope = parentGroup;
                    break;  
                case GroupType.IfScope:
                    lastIfScope = parentGroup;
                    break;          
                case GroupType.ForScope:
                    lastForScope = parentGroup;
                    break;          
                case GroupType.WhileScope:
                    lastWhileScope = parentGroup;
                    break;         
                case GroupType.SwitchScope:
                    lastSwitchScope = parentGroup;
                    break;         
                case GroupType.CaseScope:
                    lastCaseScope = parentGroup;
                    break;      
                case GroupType.Scope:
                    lastScope = parentGroup;
                    break;
            }

            const inAnyOfScope = 
                lastFunctionScope !== undefined || lastIfScope !== undefined || lastForScope !== undefined || 
                lastWhileScope !== undefined || lastSwitchScope !== undefined || lastCaseScope !== undefined || lastScope !== undefined;

            if (scopeEnded) {
                parentGroup.deadCode = true;
                data.scopeEnded = true;
            }

            // This object have child items, process them first
            for (var i = 0; i < parentGroup.items.length; i++) {
                const innerGroup = parentGroup.items[i];
                const innerData = solve_unsolved(innerGroup, lastFunctionScope, lastIfScope, lastForScope, lastWhileScope, lastSwitchScope, lastCaseScope, lastScope, scopeEnded);        
                scopeEnded = innerData.scopeEnded;
            }

            
            switch (parentGroup.type as GroupType) {

                case GroupType.Root:
                    break;

                case GroupType.DeveloperBlock:
                    parentGroup.solved = true; 
                    break;

                case GroupType.FunctionDefinition:
                    if (lastFunctionScope === undefined) { // root
                        parentGroup.solved = true; 
                    } 
                    break;

                
                case GroupType.FunctionScope:
                case GroupType.IfScope:
                case GroupType.ForScope:
                //case GroupType.WhileScope:
                case GroupType.CaseScope:
                case GroupType.Scope:
                    // Scope inside known scopes are valid
                    for (var i = 0; i < parentGroup.items.length; i++) {
                        const childGroup1 = parentGroup.items[i];
                        const childGroup2 = parentGroup.items.at(i + 1);
                        if (childGroup1.type === GroupType.Scope) {
                            childGroup1.solved = true;
                        }
                        if (childGroup1.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.Semicolon)) {
                            changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.Token);
                            const newGroup = groupItems(parentGroup, i, GroupType.TerminatedStatement, 0, 0, childGroup1);
                            newGroup.solved = true;
                        }
                    } 
                    break;

                case GroupType.SwitchScope:

                    break;

                case GroupType.TerminatedStatement:

                    if (inAnyOfScope) {

                        if (lastSwitchScope === undefined || lastCaseScope !== undefined) { // switch scope can contain only CaseLabel
                            parentGroup.solved = true;
                        }

                        if (parentGroup.items.length === 2 && 
                            parentGroup.items[0].type === GroupType.Statement && parentGroup.items[0].items.length === 1 &&
                            parentGroup.items[0].items[0].type === GroupType.ReservedKeyword)
                        {
                            const name = parentGroup.items[0].items[0].getSingleToken()?.name;
                            if (name === undefined) { break; }
                            switch (name) {
                                case "break": // for, while, case
                                    if (lastForScope !== undefined || lastWhileScope !== undefined || lastCaseScope !== undefined) {
                                        data.scopeEnded = true;   // everything in this scope is dead code
                                    } else {
                                        parentGroup.solved = false;
                                    }
                                    break;
        
                                case "continue": // for, while
                                    if (lastForScope !== undefined || lastWhileScope !== undefined) {
                                        data.scopeEnded = true; // everything in this scope is dead code
                                    } else {
                                        parentGroup.solved = false;
                                    }
                                    break;
        
                                case "return": // function
                                    if (lastFunctionScope !== undefined) {
                                        data.scopeEnded = true; // everything in this scope is dead code
                                    } else {
                                        parentGroup.solved = false;
                                    }
                                    break;
                            }
                        }
                    }
                    break;

                case GroupType.TerminatedPreprocessorStatement:
                    break;

                case GroupType.VariableReference:
                    for (var i = 0; i < parentGroup.items.length; i++) {
                        const childGroup1 = parentGroup.items[i];
        
                        // Make inside of array solved
                        // game[] or level.aaa[]
                        if (childGroup1.type === GroupType.Array && childGroup1.solved) 
                        {
                            const innerGroup = childGroup1.items.at(0);
                            if (innerGroup !== undefined && typeEqualsToOneOf(innerGroup.type, ...valueTypesWithIdentifier)) {
                                changeGroupToSolvedAndChangeType(childGroup1, innerGroup, GroupType.Value);
                            }
                        }
                    } 
                    break;

                case GroupType.Expression:
                    if (parentGroup.items.length === 1 && parentGroup.items[0].type === GroupType.Identifier) {
                        changeGroupToSolvedAndChangeType(parentGroup, parentGroup.items[0], GroupType.VariableReference);
                    }
                    else if (parentGroup.items.length === 1 && typeEqualsToOneOf(parentGroup.items[0].type, ...valueTypes)) {
                        parentGroup.items[0].solved = true;
                    } else {
                        parentGroup.solved = false; // empty expressions like ->  1 + ()
                    }
                    break;

                case GroupType.FunctionParametersExpression:
                    for (var i = 0; i < parentGroup.items.length; i++) {
                        const childGroup1 = parentGroup.items[i];

                        // Parameter
                        if ((i % 2) === 0) {
                            
                            // Function definition
                            if (inAnyOfScope === false && childGroup1.type === GroupType.Identifier) {                          
                                if (inAnyOfScope === false) {
                                    childGroup1.type = GroupType.FunctionParameterName;
                                    childGroup1.solved = true;
                                }                        
                            // Function call
                            } else if (inAnyOfScope && typeEqualsToOneOf(childGroup1.type, ...valueTypesWithIdentifier)) {
                                if (childGroup1.type === GroupType.Identifier) {
                                    changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.VariableReference);
                                } else {
                                    childGroup1.solved = true;
                                }
                            }

                        // Separator
                        } else if (i + 1 < parentGroup.items.length) {
                            if (childGroup1.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.ParameterSeparator) && (i % 2) !== 0) {
                                changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.Token);
                            }
                        }
        
                    } 
                    break;

                case GroupType.KeywordParametersExpression:
                    for (var i = 0; i < parentGroup.items.length; i++) {
                        const childGroup1 = parentGroup.items[i];

                        // Parameter
                        if ((i % 2) === 0) {                           
                            if (typeEqualsToOneOf(childGroup1.type, ...valueTypesWithIdentifier)) {
                                if (childGroup1.type === GroupType.Identifier) {
                                    changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.VariableReference);
                                } else {
                                    childGroup1.solved = true;
                                }
                            }
                        // Separator
                        } else if (i + 1 < parentGroup.items.length) {
                            if (childGroup1.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.ParameterSeparator) && (i % 2) !== 0) {
                                changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.Token);
                            }
                        }
        
                    } 
                    break;

                case GroupType.ForExpression:
                    // for (;;) is minimum
                    if (parentGroup.items.length < 2) {
                        parentGroup.solved = false;
                        break;
                    }
                    var paramPos = 0;
                    for (var i = 0; i < parentGroup.items.length; i++) {
                        const childGroup1 = parentGroup.items[i];

                        // for (;;)
                        // for (; i < 5;)
                        // for (i = 1; i < 5; i++)
                        // - first (i = 1;) will be already solved as TerminatedToken
                        if (paramPos === 0 && typeEqualsToOneOf(childGroup1.type, GroupType.TerminatedStatement)) {
                            changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.TerminatedStatement);
                            paramPos++;
                        }
                        else if (childGroup1.isUnknownUnsolvedSingleTokenOfOneOfType(TokenType.Semicolon)) {
                            paramPos++;
                            changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.Token);

                        } else if (paramPos === 1 && typeEqualsToOneOf(childGroup1.type, ...valueTypesWithIdentifier)) {
                            changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.Value);

                        } else if (paramPos === 2 && typeEqualsToOneOf(childGroup1.type, GroupType.Statement)) {
                            changeGroupToSolvedAndChangeType(parentGroup, childGroup1, GroupType.TerminatedStatement);

                        } else {
                            paramPos++;
                        }
                    }
                    if (paramPos >= 3) {
                        parentGroup.solved = false;
                        break;
                    }
                    break;

                case GroupType.ReservedKeyword:

                    break;
            }

            return data;
        }

        */