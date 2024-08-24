import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import assert from 'assert';
import { GscFile } from '../GscFile';
import { GscHoverProvider } from '../GscHoverProvider';
import { GscDefinitionProvider } from '../GscDefinitionProvider';



function checkDiagnosticItem(diagnosticItems: vscode.Diagnostic[], index: number, errorText: string, severity: vscode.DiagnosticSeverity) {

    function message(message: string, current: string, expected: string) {
        var debugText = diagnosticItems.map((diagnostic, i) => "  " + i + ": " + diagnostic.message + "   [" + vscode.DiagnosticSeverity[diagnostic.severity] + "]").join('\n');
        return "diagnostics[" + index + "] = '" + current + "'. Expected: '" + expected + "'. Message: " + message + ")\n\nErrors:\n" + debugText;
    }

    var item = diagnosticItems.at(index);
    assert.ok(item !== undefined, message("Undefined", typeof item, "undefined"));
    
    assert.ok(item.message === errorText, message("Unexpected error message", item.message, errorText));
    assert.ok(item.severity === severity, message("Unexpected severity", vscode.DiagnosticSeverity[item.severity], vscode.DiagnosticSeverity[severity]));
   
}

function checkHover(hover: vscode.Hover, expected: string) {
    assert.ok(hover !== undefined);
    assert.ok(hover.contents.length === 1);
    assert.ok(hover.contents[0] instanceof vscode.MarkdownString);
    assert.ok(hover.contents[0].value === expected, "Not equal:\n\n'" + hover.contents[0].value + "'\n\n'" + expected + "'");
}

function checkDefinition(locations: vscode.Location[], expectedFileEnd: string) {
    assert.ok(locations !== undefined, "Locations are undefined");
    assert.ok(locations.length === 1, "Locations does not contain exactly one item");
    assert.ok(locations[0].uri.path.endsWith(expectedFileEnd), "Expected file end: " + expectedFileEnd + ". Actual: " + locations[0].uri.path);
}



function waitForDiagnosticsUpdate(uri: vscode.Uri): Promise<vscode.Diagnostic[]> {
    return new Promise((resolve, reject) => {
        const disposable = vscode.languages.onDidChangeDiagnostics((e) => {
            console.log("onDidChangeDiagnostics event fired");
            if (e.uris.some(changedUri => changedUri.toString() === uri.toString())) {
                const diagnostics = vscode.languages.getDiagnostics(uri);
                disposable.dispose();  // Clean up the event listener
                resolve(diagnostics);
            }
        });

        // Optionally, add a timeout in case diagnostics don't update within a reasonable time
        setTimeout(() => {
            disposable.dispose();
            reject(new Error('Timeout waiting for diagnostics update'));
        }, 5000);  // Adjust the timeout as needed
    });
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testWorkspaceDir = path.join(os.tmpdir(), 'vscode-test-workspace');


/*
These tests depends on pre-created files in ./src/test/workspace
These files are copied into temp folder (configured in .vscode-test.mjs)
*/

suite('GscComplex', () => {

    test('GscComplex.CaseInsensitive -> error + hover + definition', async () => {
        const filePath = path.join(testWorkspaceDir, 'GscComplex', 'CaseInsensitive.gsc');
        const fileUri = vscode.Uri.file(filePath);

        // Get the parsed file - this will also trigger diagnostics for all files
        var gsc = await GscFile.parseAndCacheFile(fileUri);
        const diagnostics = await waitForDiagnosticsUpdate(fileUri);
        
        // There should be no error - everything is case insensitive
        assert.ok(diagnostics.length === 0);

        // Correct path
        // CaseInsensitiveFolder\CaseInsensitiveFile::funcName();
        const hover1 = await GscHoverProvider.getHover(gsc, new vscode.Position(5, 51), fileUri);
        checkHover(hover1, "\n```\nfuncName()\n```\nFile: ```GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc```");
        const locations1 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(5, 51), fileUri);
        checkDefinition(locations1, "GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc");

        // Lowercase path
        //caseinsensitivefolder\CaseInsensitiveFile::funcName();
        const hover2 = await GscHoverProvider.getHover(gsc, new vscode.Position(8, 51), fileUri);
        checkHover(hover2, "\n```\nfuncName()\n```\nFile: ```GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc```");
        const locations2 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(8, 51), fileUri);
        checkDefinition(locations2, "GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc");

        // Lowercase path + file
        // caseinsensitivefolder\caseinsensitivefile::funcName();
        const hover3 = await GscHoverProvider.getHover(gsc, new vscode.Position(11, 51), fileUri);
        checkHover(hover3, "\n```\nfuncName()\n```\nFile: ```GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc```");
        const locations3 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(11, 51), fileUri);
        checkDefinition(locations3, "GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc");

        // Lowercase path + file + func name
        //caseinsensitivefolder\caseinsensitivefile::funcname();
        const hover4 = await GscHoverProvider.getHover(gsc, new vscode.Position(14, 51), fileUri);
        checkHover(hover4, "\n```\nfuncName()\n```\nFile: ```GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc```");
        const locations4 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(14, 51), fileUri);
        checkDefinition(locations4, "GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc");

        // Hover over "funcname();" - its case insensitive, external file should be found
        const hover5 = await GscHoverProvider.getHover(gsc, new vscode.Position(17, 8), fileUri);
        checkHover(hover5, "\n```\nfuncName()\n```\nFile: ```GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc```");
        const locations5 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(17, 8), fileUri);
        checkDefinition(locations5, "GscComplex/CaseInsensitiveFolder/CaseInsensitiveFile.gsc");

        // Hover over "localFunc();" - its case insensitive, local func should be found
        const hover6 = await GscHoverProvider.getHover(gsc, new vscode.Position(20, 8), fileUri);
        checkHover(hover6, "\n```\nLOCALFUNC()\n```\nFile: ```GscComplex/CaseInsensitive.gsc```");
        const locations6 = await GscDefinitionProvider.getFunctionDefinitionLocations(gsc, new vscode.Position(20, 8), fileUri);
        checkDefinition(locations6, "GscComplex/CaseInsensitive.gsc");



    
    });

});
