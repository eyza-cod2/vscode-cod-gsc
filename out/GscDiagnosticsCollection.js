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
exports.GscDiagnosticsCollection = void 0;
const vscode = __importStar(require("vscode"));
const GscFile_1 = require("./GscFile");
const GscFileParser_1 = require("./GscFileParser");
class GscDiagnosticsCollection {
    static diagnosticCollection;
    static async activate(context) {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('gsc');
        context.subscriptions.push(this.diagnosticCollection);
        GscFile_1.GscFile.onDidParseDocument(uri => this.updateDiagnostics(uri));
        GscFile_1.GscFile.onDidDeleteDocument(uri => this.deleteDiagnostics(uri));
        // TODO on rename
    }
    /**
     * This function is called when some gsc file is parsed.
     * The parsed gsc file will be analyzed for commons errors like:
     *  - missing ;
     *  - unexpected tokens (bad syntax)
     */
    static async updateDiagnostics(uri) {
        //console.log("[DiagnosticsProvider]", "Document changed, creating diagnostics...");
        const diagnostics = [];
        const gscData = await GscFile_1.GscFile.getFile(uri);
        walkGroupItems(gscData.root, gscData.root.items);
        this.diagnosticCollection.set(uri, diagnostics);
        function walkGroupItems(parentGroup, items) {
            // This object have child items, process them first
            for (var i = 0; i < items.length; i++) {
                const innerGroup = items[i];
                const nextGroup = items.at(i + 1);
                const diagnostic = action(parentGroup, innerGroup);
                if (diagnostic === undefined) {
                    walkGroupItems(innerGroup, innerGroup.items);
                }
                else {
                    diagnostics.push(diagnostic);
                }
                function action(parentGroup, group) {
                    if (group.type === GscFileParser_1.GroupType.Unknown) {
                        return new vscode.Diagnostic(group.getRange(), "Unexpected token", vscode.DiagnosticSeverity.Error);
                    }
                    else if (group.solved === false) {
                        if (group.type === GscFileParser_1.GroupType.Statement && parentGroup.type !== GscFileParser_1.GroupType.TerminatedStatement) {
                            if (nextGroup === undefined || nextGroup.solved) {
                                return new vscode.Diagnostic(group.getRange(), "Missing ;", vscode.DiagnosticSeverity.Error);
                            }
                            else {
                                return undefined; // ignore this error if next group is also not solved
                            }
                        }
                        else if (group.typeEqualsToOneOf(GscFileParser_1.GroupType.Expression, GscFileParser_1.GroupType.ForExpression) && group.items.length === 0) {
                            return new vscode.Diagnostic(group.getRange(), "Empty expression", vscode.DiagnosticSeverity.Error);
                        }
                        else {
                            const firstToken = group.getFirstToken();
                            var token = group.getSingleToken();
                            if (token !== undefined) {
                                return new vscode.Diagnostic(group.getRange(), "Unexpected token " + firstToken.name, vscode.DiagnosticSeverity.Error);
                            }
                            else {
                                const range = group.getRange();
                                return new vscode.Diagnostic(range, "Unexpected tokens - " + group.toString(), vscode.DiagnosticSeverity.Error);
                            }
                        }
                    }
                    else {
                        switch (group.type) {
                            case GscFileParser_1.GroupType.ExtraTerminator:
                                return new vscode.Diagnostic(group.getRange(), "Terminator ; is not needed", vscode.DiagnosticSeverity.Information);
                            /*
                            case GroupType.TerminatedStatement:
                                if (group.items.length <= 1) {
                                    new vscode.Diagnostic(group.getRange(), "Unreachable code", vscode.DiagnosticSeverity.Warning));
                                    return true;
                                }
                                break;*/
                        }
                    }
                    /*
                    if (group.deadCode && parentGroup.deadCode === false) {
                        new vscode.Diagnostic(group.getRange(), "Unreachable code", vscode.DiagnosticSeverity.Warning));
                        return true;
                    }*/
                    return undefined;
                }
            }
        }
        //console.log("[DiagnosticsProvider]", "Diagnostics done");
    }
    static deleteDiagnostics(uri) {
        this.diagnosticCollection.delete(uri);
    }
    static async createDiagnosticsForAll() {
        console.log("[DiagnosticsProvider]", "Creating overall diagnostics...");
        this.diagnosticCollection.clear();
        var files = GscFile_1.GscFile.getCachedFiles();
        for (const [uri, gsc] of files) {
            this.updateDiagnostics(vscode.Uri.parse(uri));
        }
        console.log("[DiagnosticsProvider]", "Creating overall diagnostics done");
    }
}
exports.GscDiagnosticsCollection = GscDiagnosticsCollection;
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
//# sourceMappingURL=GscDiagnosticsCollection.js.map