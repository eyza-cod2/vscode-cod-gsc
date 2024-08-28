import * as vscode from 'vscode';
import { GscFile } from './GscFile';
import { GroupType, GscData, GscGroup } from './GscFileParser';
import { CodFunctions } from './CodFunctions';
import { ConfigErrorDiagnostics, GscConfig, GscGame } from './GscConfig';
import { GscFunctions, GscFunctionState } from './GscFunctions';

export class GscDiagnosticsCollection {
    private static diagnosticCollection: vscode.DiagnosticCollection | undefined;
    private static statusBarItem: vscode.StatusBarItem | undefined;

    static async activate(context: vscode.ExtensionContext) {
        
        // Create a status bar item to show background task indicator
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        this.statusBarItem.text = "$(sync~spin) Diagnosing GSC files...";
        this.statusBarItem.tooltip = "Background task in progress";
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground'); // Example of using a theme color for error state     
        context.subscriptions.push(this.statusBarItem);
        
        // Diagnostics collection
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('gsc');
        context.subscriptions.push(this.diagnosticCollection);

        // Refresh command
        context.subscriptions.push(vscode.commands.registerCommand('gsc.refreshDiagnosticsCollection', () => this.refreshDiagnosticsCollection()));   
		
        // Settings changed, handle it...
        vscode.workspace.onDidChangeConfiguration((e) => this.onDidChangeConfiguration(e), null, context.subscriptions);


        GscFile.onDidParseAllDocuments((files) => this.updateDiagnosticsAll(files));
        GscFile.onDidParseDocument(e => this.updateDiagnostics(e.uri, e.data));
        GscFile.onDidDeleteDocument(uri => this.deleteDiagnostics(uri));
    }


    private static currentCancellationTokenSource: vscode.CancellationTokenSource | null = null;

    /**
     * Update diagnostics for all parsed files. Since its computation intensive, its handled in async manner.
     */
    static async updateDiagnosticsAll(files: Map<string, GscData>) {

        console.log("Creating diagnostics for all files...");

        // Cancel the previous operation if it's still running
        if (this.currentCancellationTokenSource) {
            this.currentCancellationTokenSource.cancel();
        }

        // Create a new cancellation token source for the current operation
        this.currentCancellationTokenSource = new vscode.CancellationTokenSource();
        const token = this.currentCancellationTokenSource.token;

        let i = 0;
        let lastUpdateTime = Date.now();
        const updateInterval = 100; // Time in milliseconds to wait before updating the UI

        if (this.statusBarItem) {
            this.statusBarItem.show();
        }

        try {
            this.diagnosticCollection?.clear();

            for (const [uri, data] of files) {
                if (token.isCancellationRequested) {
                    return; // Exit if the operation has been canceled
                }

                if (this.statusBarItem) {
                    this.statusBarItem.text = `$(sync~spin) Diagnosing GSC file ${i + 1}/${files.size}...`;
                    this.statusBarItem.tooltip = uri;
                }

                await this.updateDiagnostics(vscode.Uri.parse(uri), data);

                // Check if it's time to pause for UI update
                const now = Date.now();
                if (i === 0 || now - lastUpdateTime > updateInterval) {
                    lastUpdateTime = now;
                    // Pause execution for a short while to allow the UI to update
                    await new Promise(resolve => setTimeout(resolve, 1));
                }

                i++;
            }
        } finally {

            if (token.isCancellationRequested) {
                return; // Exit if the operation has been canceled
            }

            if (this.statusBarItem) {
                this.statusBarItem.hide();
            }
            // Clear the cancellation token source after the operation completes
            this.currentCancellationTokenSource = null;
        }

    }



    

    /**
     * This function is called when some gsc file is parsed. 
     * The parsed gsc file will be analyzed for commons errors like:
     *  - missing ;
     *  - unexpected tokens (bad syntax)
     */
    static async updateDiagnostics(uri: vscode.Uri, gscData: GscData) {
        //console.log("[DiagnosticsProvider]", "Document changed, creating diagnostics...");

        // Check if the URI is part of the workspace
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        if (!workspaceFolder) {
            return; // Exit if the URI is not part of the workspace
        }

        if (GscConfig.getErrorDiagnostics(uri) === ConfigErrorDiagnostics.Disable) {
            return; // Exit if the error diagnostics are disabled
        }

        const diagnostics: vscode.Diagnostic[] = [];

        // Load ignored function names
        const ignoredFunctionNames: string[] = GscConfig.getIgnoredFunctionNames(uri);
        const ignoredFilePaths = GscConfig.getIgnoredFilePaths(uri);
        const currentGame = GscConfig.getSelectedGame(uri);
        const isUniversalGame = GscConfig.isUniversalGame(currentGame);
    
        const groupFunctionNames: {group: GscGroup, uri: vscode.Uri}[] = [];

        // Process the file
        walkGroupItems(gscData.root, gscData.root.items);


        // Create diagnostic for function names
        for (const d of groupFunctionNames) {
            const diag = await GscDiagnosticsCollection.createDiagnosticsForFunctionName(d.group, d.uri, ignoredFunctionNames, ignoredFilePaths, currentGame);
            if (diag) {
                diagnostics.push(diag);
            }
        }

        // TODO check where this file is referenced to update particular files
        // It will be crusual for #include files

        this.diagnosticCollection?.set(uri, diagnostics);

        // ------------------------------------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------------------------------------------------------------------------------------

        function walkGroupItems(parentGroup: GscGroup, items: GscGroup[]) {
            // This object have child items, process them first
            for (var i = 0; i < items.length; i++) {
                const innerGroup = items[i];
                const nextGroup = items.at(i + 1);

                const diagnostic = action(parentGroup, innerGroup);
                if (diagnostic === undefined) {
                    walkGroupItems(innerGroup, innerGroup.items);
                } else {
                    diagnostics.push(diagnostic);
                }

                function action(parentGroup: GscGroup, group: GscGroup): vscode.Diagnostic | undefined
                {
                    if (group.type === GroupType.Unknown) {
                        return new vscode.Diagnostic(group.getRange(), "Unexpected token", vscode.DiagnosticSeverity.Error);
                    }
                    else if (group.solved === false) {
                        return GscDiagnosticsCollection.createDiagnosticsForUnsolved(group, parentGroup, nextGroup);
 
                    } else {
                        switch (group.type as GroupType) {

                            case GroupType.FunctionName:
                                groupFunctionNames.push({group, uri});
                                break;

                            case GroupType.DataTypeKeyword:
                                if (!isUniversalGame && currentGame !== GscGame.CoD1) {
                                    return new vscode.Diagnostic(group.getRange(), "Casting to data type is not supported for " + currentGame, vscode.DiagnosticSeverity.Error);
                                }
                                break;

                            case GroupType.ExtraTerminator:
                                return new vscode.Diagnostic(group.getRange(), "Terminator ; is not needed", vscode.DiagnosticSeverity.Information);
                        }
                    }
                    return undefined;
                }
            }
        }

        //console.log("[DiagnosticsProvider]", "Diagnostics done");
    }
    

    static deleteDiagnostics(uri: vscode.Uri) {
        this.diagnosticCollection?.delete(uri);
    }


    static createDiagnosticsForUnsolved(group: GscGroup, parentGroup: GscGroup, nextGroup: GscGroup | undefined) {
        if (group.type === GroupType.Statement && parentGroup.type !== GroupType.TerminatedStatement) {
            if (nextGroup === undefined || nextGroup.solved) {
                return new vscode.Diagnostic(group.getRange(), "Missing ;", vscode.DiagnosticSeverity.Error);
            } else {
                return undefined; // ignore this error if next group is also not solved
            }
        }
        else if (group.typeEqualsToOneOf(GroupType.Expression, GroupType.ForExpression) && group.items.length === 0) {
            return new vscode.Diagnostic(group.getRange(), "Empty expression", vscode.DiagnosticSeverity.Error);
        }
        else
        {
            const firstToken = group.getFirstToken();

            var token = group.getSingleToken();
            if (token !== undefined) {
                return new vscode.Diagnostic(group.getRange(), "Unexpected token " + firstToken.name, vscode.DiagnosticSeverity.Error);
            } else {
                const range = group.getRange();
                return new vscode.Diagnostic(range, "Unexpected tokens - " + group.toString(), vscode.DiagnosticSeverity.Error);
            }
        }
    }

    static async createDiagnosticsForFunctionName(group: GscGroup, uri: vscode.Uri, ignoredFunctionNames: string[], ignoredFilePaths: string[], currentGame: GscGame) {

        // Function declaration
        if (group.parent?.type === GroupType.FunctionDeclaration) {
            // TODO check for duplicate

            const funcName = group.getFirstToken().name;

            // This function is overwriting the build-in function
            if (CodFunctions.isPredefinedFunction(funcName, currentGame)) {
                return new vscode.Diagnostic(group.getRange(), `Function '${funcName}' is overwriting build-in function`, vscode.DiagnosticSeverity.Information);
            }
            
            
        // Function call or reference
        } else {

            const funcInfo = group.getFunctionReferenceInfo();
            if (funcInfo !== undefined) {
                
                const res = await GscFunctions.getFunctionReferenceState({name: funcInfo.name, path: funcInfo.path}, uri, ignoredFunctionNames, ignoredFilePaths, currentGame);
    
                switch (res.state as GscFunctionState) {      
                    case GscFunctionState.NameIgnored:
                        return;

                    // Function was found in exactly one place
                    case GscFunctionState.Found:
                        const funcDef = res.definitions[0].func;
                        if (funcInfo.params.length > funcDef.parameters.length) {  
                            if (funcDef.parameters.length === 0) {
                                var r = new vscode.Range(funcInfo.params[funcDef.parameters.length].getRange().start, funcInfo.params[funcInfo.params.length - 1].getRange().end);
                                return new vscode.Diagnostic(r, `Function '${funcDef.name}' does not expect any parameters, got ${funcInfo.params.length}`, vscode.DiagnosticSeverity.Error);
                            } else {
                                var r = new vscode.Range(funcInfo.params[funcDef.parameters.length].getRange().start, funcInfo.params[funcInfo.params.length - 1].getRange().end);
                                return new vscode.Diagnostic(r, `Function '${funcDef.name}' expect ${funcDef.parameters.length} parameter${(funcDef.parameters.length === 1 ? "" : "s")}, got ${funcInfo.params.length}`, vscode.DiagnosticSeverity.Error);
                            }
                        }
                        break;


                    // Function is defined on too many places
                    case GscFunctionState.FoundOnMultiplePlaces:
                        return new vscode.Diagnostic(group.getRange(), `Function '${funcInfo.name}' is defined in ${res.definitions.length} places!`, vscode.DiagnosticSeverity.Error);


                    // This function is predefined function
                    case GscFunctionState.FoundInPredefined:
                        // Find in predefined functions
                        const preDefFunc = CodFunctions.getByName(funcInfo.name, funcInfo.callOn !== undefined, currentGame);

                        // Predefined function was not found because the callon mismatch
                        if (preDefFunc === undefined) {
                            if (funcInfo.callOn) {
                                return new vscode.Diagnostic(funcInfo.callOn.getRange(), `Function '${funcInfo.name}' can not be called on object (does not support callon object)`, vscode.DiagnosticSeverity.Error);
                            } else {
                                return new vscode.Diagnostic(group.getRange(), `Function '${funcInfo.name}' must be called on object (callon object is missing)`, vscode.DiagnosticSeverity.Error);
                            }
                        }

                        const paramsMinMax = preDefFunc.getNumberOfParameters();

                        if (funcInfo.params.length > paramsMinMax.max) {
                            if (paramsMinMax.max === 0) {
                                var r = new vscode.Range(funcInfo.params[paramsMinMax.max].getRange().start, funcInfo.params[funcInfo.params.length - 1].getRange().end);                       
                                return new vscode.Diagnostic(r, `Function '${funcInfo.name}' does not expect any parameters, got ${funcInfo.params.length}`, vscode.DiagnosticSeverity.Error);
                            } else {
                                var r = new vscode.Range(funcInfo.params[paramsMinMax.max].getRange().start, funcInfo.params[funcInfo.params.length - 1].getRange().end); 
                                return new vscode.Diagnostic(r, `Function '${funcInfo.name}' expect max ${paramsMinMax.max} parameter${(paramsMinMax.max === 1 ? "" : "s")}, got ${funcInfo.params.length}`, vscode.DiagnosticSeverity.Error);
                            }
                        } else if (funcInfo.params.length < paramsMinMax.min) {
                            var r = funcInfo.paramsGroup?.getRange() ?? group.getRange();
                            return new vscode.Diagnostic(r, `Function '${funcInfo.name}' expect min ${paramsMinMax.min} parameter${(paramsMinMax.min === 1 ? "" : "s")}, got ${funcInfo.params.length}`, vscode.DiagnosticSeverity.Error);
                        }
                        break;


                    case GscFunctionState.NotFoundFile:
                        // This file path is ignored by configuration
                        for (const ignoredPath of ignoredFilePaths) {
                            if (funcInfo.path.toLowerCase().startsWith(ignoredPath.toLowerCase())) {
                                return;
                            }
                        }
                                        
                        var r = group.getRange();
                        if (funcInfo.pathGroup) {
                            r = funcInfo.pathGroup.getRange();
                        }
                        const workspaceFolder = vscode.Uri.joinPath(vscode.workspace.getWorkspaceFolder(uri)?.uri ?? uri, "../");
                        const gameFolder = GscConfig.getGameRootFolderOfFile(uri)?.toString().replace(workspaceFolder.toString(), "");
                        const d = new vscode.Diagnostic(r, `File '${funcInfo.path}.gsc' was not found in workspace folder '${gameFolder}'`, vscode.DiagnosticSeverity.Error);
                        
                        d.code = "unknown_file_path_" + funcInfo.path;

                        return d;



                    case GscFunctionState.NotFoundFileButIgnored:
                        break;


                    case GscFunctionState.NotFoundFunctionExternal:
                        const d1 = new vscode.Diagnostic(group.getRange(), `Function '${funcInfo.name}' is not defined in '${funcInfo.path}.gsc'!`, vscode.DiagnosticSeverity.Error);               
                        // TODO now it ignores local and external, but it should be probably separated
                        //if (funcInfo.path === "") {
                            d1.code = "unknown_function_" + funcInfo.name; // Special constant to create a CodeAction to add function name into ignored list
                        //}
                        return d1;


                    case GscFunctionState.NotFoundFunctionLocal:
                        if (currentGame !== GscGame.UniversalGame) {
                            const d = new vscode.Diagnostic(group.getRange(), `Function '${funcInfo.name}' is not defined!`, vscode.DiagnosticSeverity.Error);
                            if (funcInfo.path === "") {
                                d.code = "unknown_function_" + funcInfo.name; // Special constant to create a CodeAction to add function name into ignored list
                            }                        
                            return d;
                        }
                        break;
                }


            }
        }
    }


    static async onDidChangeConfiguration(e: vscode.ConfigurationChangeEvent) {
        //vscode.window.showInformationMessage("Config changed, updating diagnostics...");
        const files = GscFile.getCachedFiles();
        await this.updateDiagnosticsAll(files);
    }

    static async refreshDiagnosticsCollection() {
        const files = GscFile.getCachedFiles();
        await this.updateDiagnosticsAll(files);
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