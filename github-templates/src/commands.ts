'use strict';

import * as vscode from 'vscode';
import { isUndefined } from 'util';
export function commandTestHello() : void {
    vscode.window.showInformationMessage('Hello!');
    //vscode.window.showQuickPick()
}



interface Template {
    note: string;
}

interface Templates {
    [id: string] : Template;
}

export function commandTestQuickPick() : void {
    let templates : Templates = {'template A' :{'note':'A'} , 'template B': {'note': 'B'} };

    vscode.window.showQuickPick(Object.keys(templates)).then(
        function(value) {
        // fulfillment
        if (isUndefined(value)){

        }
        else {
            //vscode.window.showInformationMessage(value);
            console.log(value);
            vscode.window.showInformationMessage(templates[value].note);
        }
        
      }, function(reason) {
        // rejection
        console.log(reason);
      });
}


export function commandTestCreateFile() : void {
    console.log('command: TestCreateFile');
}


function GithubPath(user: string, repository: string, path: string) : string {
    return `https://raw.githubusercontent.com/${user}/${repository}/master/${path}`;
}

export function commandTestGithub() : void {
    console.log('command: TestGithub');

    let path = GithubPath('wandyezj', 'vscode_extension_github_templates', 'README.md');
    console.log(`Path: ${path}`);

    // now need to download the files text
}