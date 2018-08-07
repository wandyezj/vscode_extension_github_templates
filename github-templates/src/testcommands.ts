'use strict';

import * as vscode from 'vscode';
import { isUndefined, isNullOrUndefined } from 'util';

import {TemplateManifest, Templates} from './TemplateManifest';

export function commandTestHello() : void {
    vscode.window.showInformationMessage('Hello!');
    //vscode.window.showQuickPick()
}


/*
interface Template {
    note: string;
}

interface Templates {
    [id: string] : Template;
}
*/
export function commandTestQuickPick() : void {
    //let templates : Templates = {'template A' :{'note':'A'} , 'template B': {'note': 'B'} };

    let manifest : TemplateManifest = {'templates':[{'name':'template name A', 'note': 'A' }, {'name':'template name B', 'note': 'B' }]};
    let templates : Templates = new Templates(manifest);
//Object.keys(templates)
    vscode.window.showQuickPick(Object.keys(templates.choices)).then(
        function(value) {
        // fulfillment
        if (isUndefined(value)){

        }
        else {
            //vscode.window.showInformationMessage(value);
            console.log(value);
            //templates.find(x => x.name === value).note
            vscode.window.showInformationMessage(templates.choices[value].note);
        }
        
      }, function(reason) {
        // rejection
        console.log(reason);
      });
}

/*
APIS

workspace.openTextDocument

No workspace if just a file has been opened

*/
function GetCurrentWorkspaceFolder() : string | undefined {
    let currentWorkspaceFolders = vscode.workspace.workspaceFolders;
    let currentWorkspaceFolder = undefined;
    if (!isUndefined(currentWorkspaceFolders)) {
        currentWorkspaceFolder = currentWorkspaceFolders[0].uri.fsPath;
    }

    return currentWorkspaceFolder;
}

export function commandTestCreateFile() : void {
    console.log('command: TestCreateFile');
    
    let currentEditor = vscode.window.activeTextEditor;
    if (!isUndefined(currentEditor)) {
        let currentFileName = currentEditor.document.fileName;
        console.log(`${currentFileName}`);
    }
    
    let currentWorkspaceFolders = vscode.workspace.workspaceFolders;
    let currentWorkspaceFolder = undefined;
    if (!isUndefined(currentWorkspaceFolders)) {
        currentWorkspaceFolder = currentWorkspaceFolders[0];
        
        console.log(`${currentWorkspaceFolder.uri}`);
        console.log(`${currentWorkspaceFolder.uri.fsPath}`);
        console.log(`${currentWorkspaceFolder.name}`);
        console.log(`${currentWorkspaceFolder.index}`);

        /*
        vscode.Uri()
        .fsPath
        Uri.file()
        Uri.parse()
        */
    }

    if (!isUndefined(currentWorkspaceFolder)) {



        ///*
        let path = require('path');
        console.log('require path');
        let filePath = path.join(currentWorkspaceFolder.uri.fsPath, "test.txt");
        console.log(filePath);

        // Ok instead of writing can is just open a new pane that is populated for saving with a given file name?

        console.log(`command: ${filePath}`);
        let fs = require('fs');
        console.log('require fs');
        fs.writeFile(filePath, "Hey there!", function(err : string) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
            

        });
        //*/ 
    }
}

export function commandTestOpenFile() : void {
    console.log('command: TestOpenFile');
    let workspaceFolder = GetCurrentWorkspaceFolder();
    let path = require('path');
    let filePath = path.join(workspaceFolder, "test.txt");
    console.log(`Open: [${filePath}]`);
    // Open the file
    vscode.window.showTextDocument(vscode.Uri.file(filePath));
    //vscode.workspace.openTextDocument(filePath).then();
    console.log(`complete`);
} 


function GithubPath(user: string, repository: string, path: string) : string {
    return `https://raw.githubusercontent.com/${user}/${repository}/master/${path}`;
}

//https://github.com/wandyezj/vscode_extension_github_templates/blob/master/templates.json

//import * as request from 'request';


export function commandTestGithub() : void {
    console.log('command: TestGithub');

    let path = GithubPath('wandyezj', 'vscode_extension_github_templates', 'README.md');
    console.log(`Path: ${path}`);

    let request = require('request');
    request(path, function(error : any, response :any, body :string) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
    // now need to download the files text

    path = GithubPath('wandyezj', 'vscode_extension_github_templates', 'templates.json');
    request(path, function(error : any, response :any, body :string) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        if (!isNullOrUndefined(response) && response.statusCode === 200){
            let manifest : TemplateManifest = JSON.parse(body);

            for (let template of manifest.templates) {
                console.log(template.name);
            }

        }

    });





}
