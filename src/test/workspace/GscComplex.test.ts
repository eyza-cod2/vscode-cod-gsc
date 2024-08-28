import * as vscode from 'vscode';
import assert from 'assert';
import { GscHoverProvider } from '../../GscHoverProvider';
import { GscDefinitionProvider } from '../../GscDefinitionProvider';
import { before } from 'mocha';
import * as tests from '../Tests.test';
import { GscFunction } from '../../GscFunctions';


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscComplex', () => {

    before(async () => {
        await tests.activateExtension();
    });
    
    test('GscComplex.FunctionReferences -> error + hover + definition', async () => {
        const [gsc, diagnostics, fileUri] = await tests.loadGscFile(['GscComplex', 'FunctionReferences.gsc']);
        
        // There should be no error - everything is case insensitive
        assert.ok(diagnostics.length === 0);

        // Correct path
        // FunctionReferencesFolder\FunctionReferencesFile::funcName();
        const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 58), fileUri);
        tests.checkHover(hover1, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
        //checkHover(hover1, "\n```\nfuncName()\n```\nFile: ```GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc```");
        const locations1 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(5, 58), fileUri);
        tests.checkDefinition(locations1, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

        // Lowercase path
        // functionreferencesfolder\FunctionReferencesFile::funcName();
        const hover2 = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 58), fileUri);
        tests.checkHover(hover2, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
        const locations2 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(8, 58), fileUri);
        tests.checkDefinition(locations2, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

        // Lowercase path + file
        // functionreferencesfolder\functionreferencesfile::funcName();
        const hover3 = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 58), fileUri);
        tests.checkHover(hover3, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
        const locations3 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(11, 58), fileUri);
        tests.checkDefinition(locations3, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

        // Lowercase path + file + func name
        // functionreferencesfolder\functionreferencesfile::funcname();
        const hover4 = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 58), fileUri);
        tests.checkHover(hover4, GscFunction.generateMarkdownDescription({name: "funcName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString()).value);
        const locations4 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(14, 58), fileUri);
        tests.checkDefinition(locations4, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

        // Hover over "includedFuncName();" - its case insensitive, external file should be found
        const hover5 = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 8), fileUri);
        tests.checkHover(hover5, GscFunction.generateMarkdownDescription({name: "includedFuncName", parameters: []}, false, tests.filePathToUri("GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc").toString(), "Included via '#include'").value);
        const locations5 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(17, 8), fileUri);
        tests.checkDefinition(locations5, "GscComplex/FunctionReferencesFolder/FunctionReferencesFile.gsc");

        // Hover over "localFunc();" - its case insensitive, local func should be found
        const hover6 = await GscHoverProvider.getHover(gsc, new vscode.Position(20, 8), fileUri);
        tests.checkHover(hover6, GscFunction.generateMarkdownDescription({name: "LOCALFUNC", parameters: []}, true, undefined, undefined).value);
        const locations6 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(20, 8), fileUri);
        tests.checkDefinition(locations6, "GscComplex/FunctionReferences.gsc");



    
    });

});
