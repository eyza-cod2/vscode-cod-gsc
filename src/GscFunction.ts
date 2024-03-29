import * as vscode from 'vscode';

interface GscFunctionReference {
    name: string;
    path?: string;
    isPointer: boolean;
    locations: vscode.Location[];
}
interface GscFunctionDefinition {
    name: string;
    parameters: string;
    file: vscode.Uri;
    offset: number;
    line: number;
    character: number;
}

export class GscFunctionClass {

    /**
     * This function gets the keyword under the user cursor, checks if its valid function name, and return an array of locations where the function is defined
     * @param document 
     * @param position 
     * @returns Array of locations (files and position) of functions
     */
    public async getLocationsOfFunctionUnderCursor(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.Location[]>
    {
        // Get the function data under the cursor
        const func = await this.getDataAboutFunctionUnderCursor(document, position);
        if (!func) {
            return [];
        }
        return func.locations;
    }

    /**
     * This function gets the keyword under the user cursor, checks if its valid function name, and returns data about function definition
     * @param document 
     * @param position 
     * @returns Data about function definition
     */
    public async getFunctionDefinitionOfFunctionUnderCursor(document: vscode.TextDocument, position: vscode.Position): Promise<GscFunctionDefinition | undefined>
    {
        // Get the function data under the cursor
        const func = await this.getDataAboutFunctionUnderCursor(document, position);
        if (!func) {
            return;
        }
        // Defined on too many places, ignore
        if (func.locations.length !== 1) {
            return;
        }
        // Get data of function definition
        const data = this.getFunctionDefinitionInFile(func.locations[0].uri, func.name);

        return data;
    }
    
    /**
     * This function gets the keyword under the user cursor, checks if its valid function name, and returns data about function reference
     * @param document 
     * @param position 
     * @returns Data about function reference
     */
    private async getDataAboutFunctionUnderCursor(document: vscode.TextDocument, position: vscode.Position): Promise<GscFunctionReference | undefined>
    {
        // Get the word the user is hovering over
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return; // No word under the cursor
        }  
        const word = document.getText(wordRange);

        const line = document.lineAt(position.line).text; // "    scripts\path::func(param1, param2, "string");"

        const left = line.substring(0, wordRange.end.character);
        const right = line.substring(wordRange.start.character, line.length - 1);

        // [1]="scripts\path", [2]="::", [3]="func"
        const leftRegex = left.match("(\\b[A-Za-z_][A-Za-z_0-9]*(?:\\\\[A-Za-z_][A-Za-z_0-9]*)*)?\\s*(::)\\s*([A-Za-z_][A-Za-z_0-9]*)$");
        const rightRegex = right.match("^[A-Za-z_][A-Za-z_0-9]*\\s*\\(");

        // Its not a function call neither function pointer
        if (!rightRegex && !leftRegex) {
            return;
        }

        const path = leftRegex?.[1];

        const locations: vscode.Location[] = [];

        if (path) // "scripts\path" or undefined
        {
            var locations2 = await this.getLocationsOfFunctionDefinitionBySubpath(path + ".gsc", word);
            locations.push(...locations2);
        }
        // If file is not set, its function in this file, or included, or global
        else {

            // Try to find the function in this file
            const loc = await this.getLocationOfFunctionDefinitionInFile(vscode.Uri.file(document.fileName), word);               
            if (loc !== undefined){
                locations.push(loc);
            }

            // Then check all files via #include declaration
            const includedFiles = this.getIncludedFiles(document);
            for(let includedFile of includedFiles) {
                var locations2 = await this.getLocationsOfFunctionDefinitionBySubpath(includedFile, word);             
                locations.push(...locations2);
            }
        }

        const data: GscFunctionReference = {
            name: word,
            path: leftRegex?.[1],
            isPointer: (leftRegex !== null && rightRegex === null),
            locations: locations
        };

        return data;
    }

    /**
     * Find all files that match the referenced path that contains function definition
     * @param subpath The path referenced in script
     * @param functionName Name of function
     * @returns Array of locations (files and position) of functions
     */
    private async getLocationsOfFunctionDefinitionBySubpath(subpath: string, functionName: string): Promise<vscode.Location[]> {
        const pattern = `**/${subpath}`;
        const files = await vscode.workspace.findFiles(pattern);
        const locations: vscode.Location[] = [];

        for (const file of files) {
            const location = await this.getLocationOfFunctionDefinitionInFile(file, functionName);     
            if (location !== undefined){
                locations.push(location);
            }
        }
        return locations;
    }

    /**
     * Gets position of function definition in file
     * @param file Uri file path
     * @param functionName Name of function to locate
     * @returns Location (file and position) of function in specified name
     */
    private async getLocationOfFunctionDefinitionInFile(file: vscode.Uri, functionName: string): Promise<vscode.Location | undefined> {
        
        const def = await this.getFunctionDefinitionInFile(file, functionName);
        if (!def) {
            return;
        }
        return new vscode.Location(def.file, new vscode.Position(def.line, def.character));
    }


    /**
     * Get function definition data from file
     * @param file Uri file path
     * @param functionName Name of function to locate
     * @returns Data about function
     */
    private async getFunctionDefinitionInFile(file: vscode.Uri, functionName: string): Promise<GscFunctionDefinition | undefined> {
        
        // Check if the file is opened in any editor
        const openedTextDocument = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === file.toString());
        
        var content: string;
        if (openedTextDocument) {
            // File is open in an editor, return its content
            content = openedTextDocument.getText();
        } else {
            // File is not open, read its content from the file system
            const fileContent = await vscode.workspace.fs.readFile(file);
            // Convert the Uint8Array content to a string
            content =  Buffer.from(fileContent).toString('utf8');
        }

        // [1] = function name, [2] = all params, [3] = comments between funcname() and {
        const functionRegex = new RegExp(
            "\\b(" + functionName + ")\\s*\\(((?:\\/\\*[^\\*\\/]*?\\*\\/|\\/\\/[^\\n]*?\\n|\\s|\\w|,)*?)\\)((?:\\/\\*[^\\*\\/]*?\\*\\/|\\/\\/[^\\n]*?\\n|\\s)*?){", 'gm'
        );

        // Use matchAll to find all matches and their positions
        const matches = content.matchAll(functionRegex);
        for (const match of matches) {
            if (match.index !== undefined) {
                const startPosition = match.index;
                const contentUpToMatch = content.substring(0, startPosition);
                const lines = contentUpToMatch.split(/\r?\n/);
                const line = lines.length - 1;
                const char = startPosition - (contentUpToMatch.lastIndexOf('\n') + 1);

                const data: GscFunctionDefinition = {
                    name: functionName,
                    parameters: match[2],
                    file: file,
                    offset: startPosition,
                    line: line,
                    character: char
                };

                return data;
            }
        }
    }

    /**
     * Gets list of paths referenced via #include statement in provided document
     * @param document 
     * @returns Array of paths referenced via #include statement
     */
    private getIncludedFiles(document: vscode.TextDocument): string[] {

        // [1] = path
        const functionRegex = new RegExp(
            "#include\\s*([A-Za-z_][A-Za-z_0-9]*(?:\\\\[A-Za-z_][A-Za-z_0-9]*)*)\\s*;", 'gm'
        );

        const paths: string[] = [];
        const content = document.getText();

        // Use matchAll to find all matches and their positions
        const matches = content.matchAll(functionRegex);
        for (const match of matches) {
            if (match.index !== undefined) {
                const path = match[1] + ".gsc";
                paths.push(path);
            }
        }

        return paths;
    }
}