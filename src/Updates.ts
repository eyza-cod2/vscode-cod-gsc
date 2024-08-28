import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as semver from 'semver';
import { DISCORD_URL, EMAIL, EXTENSION_ID, GITHUB_URL } from './extension';

export class Updates {

    static currentVersion: string | undefined;
    static previousVersion: string | undefined;

    static async activate(context: vscode.ExtensionContext) {
        Updates.currentVersion = vscode.extensions.getExtension(EXTENSION_ID)?.packageJSON.version;
        Updates.previousVersion = context.globalState.get<string>('extensionVersion');
    
        if (Updates.previousVersion !== Updates.currentVersion) {
            
            // Show the webview if there's a new version
            const panel = vscode.window.createWebviewPanel(
                'updateNotification', // Identifies the type of the webview
                'Extension Updated', // Title of the panel displayed to the user
                vscode.ViewColumn.One, // Editor column to show the new webview panel in
                {
                    enableScripts: true, // Allow scripts in the webview
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'images'))] // Allow access to local files in 'media' folder
                }
            );  
            panel.webview.html = this.getWebviewContent(panel.webview, context.extensionPath);
            

            // Update the stored version to the current version
            await context.globalState.update('extensionVersion', Updates.currentVersion);
        }

        // Testing
        //await context.globalState.update('extensionVersion', undefined);
        //await context.globalState.update('extensionVersion', "0.0.1");
    }


    private static getWebviewContent(webview: vscode.Webview, extensionPath: string): string {
        // Path to the media directory
        const mediaPath = path.join(extensionPath, 'images');

        function getImageUri(imageName: string) {
            return webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, imageName)));
        }

        const htmlPath = path.join(extensionPath, 'src', 'Updates.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
        // Regex to find all occurrences of ${getImageUri('...')} and ${CONSTANT}
        const regex = /\$\{([a-zA-Z_0-9.]+)\}|<img\s+src=["']\.\.\/images\/([^"']+)["']/g;


        // Replace each match with the correct value or URI
        htmlContent = htmlContent.replace(regex, (match, constantName, imageName) => {
            if (imageName) {
                // Handle <img src="../images/...">
                const imageUri = getImageUri(imageName);
                return match.replace(`../images/${imageName}`, imageUri.toString());
            } else if (constantName && typeof constantName === 'string') {
                // Handle ${CONSTANT}
                switch (constantName) {
                    case 'GITHUB_URL':
                        return GITHUB_URL;
                    case 'DISCORD_URL':
                        return DISCORD_URL;
                    case 'EMAIL':
                        return EMAIL;
                    case 'fromVersionToVersion':
                        if (Updates.previousVersion && Updates.previousVersion !== Updates.currentVersion) {
                            return 'updated from ' + Updates.previousVersion + ' to ' + Updates.currentVersion;
                        } else {
                            return Updates.currentVersion ?? "";
                        }
                    default:
                        if (constantName.startsWith('VERSION_')) {
                            const version = constantName.substring('VERSION_'.length);

                            // Check if the current version is greater than the version in the constant
                            if (Updates.previousVersion && semver.gt(version, Updates.previousVersion)) {
                                return 'class = "new-version"';
                            } else {
                                return 'class = "old-version"';
                            }
                        }
                        return match; // If the constant isn't found, return the original match
                }
            }
            return match; // Default to returning the match if nothing is found
        });

        return htmlContent;
    }
}