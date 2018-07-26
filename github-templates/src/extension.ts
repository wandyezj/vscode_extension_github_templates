'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// interface Template {
//     note: string;
// }

// interface Templates {
//     [id: string] : Template;
// }

// function commandHi() : void {
//     vscode.window.showInformationMessage('Hi!');

//     /*
//     const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = {
//         commandHello
//     };
//     */

//     let templates : Templates = {'template A' :{'note':'A'} , 'template B': {'note': 'B'} };

//     vscode.window.showQuickPick(Object.keys(templates)).then(
//         function(value) {
//         // fulfillment
//         if (isUndefined(value)){

//         }
//         else {
//             vscode.window.showInformationMessage(value);
//             console.log(value);
//             vscode.window.showInformationMessage(templates[value].note);
//         }
        
//       }, function(reason) {
//         // rejection
//         console.log(reason);
//       });
// }



function commandCreateFile() : void {

}

class RegisterCommand {
    constructor(event: string, command: () => void) {
        this.event = event;
        this.command = command;
    }

    event : string;
    command : () => void;

    Register(context: vscode.ExtensionContext) {
        context.subscriptions.push(vscode.commands.registerCommand(this.event, this.command));
    }
}

import { commandTestHello, commandTestQuickPick } from './commands';
//import { isUndefined } from 'util';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
/*
    context.subscriptions.push(vscode.commands.registerCommand('samples.quickInput', async () => {
		const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = {
			commandHello
		};
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context)
					.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));
*/

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "github-templates" is now active!');

    /*
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });
    */

    let commands: RegisterCommand[] = [
        new RegisterCommand('extension.testHello', commandTestHello),
        new RegisterCommand('extension.testQuickPick', commandTestQuickPick), 
    ];   


    for (let command of commands) {
        command.Register(context);
    }

    /*
    context.subscriptions.push(vscode.commands.registerCommand('extension.testHello', commandTestHello));


    let disposableCommandHi = vscode.commands.registerCommand('extension.testQuickPick', commandTestQuickPick);
    context.subscriptions.push(disposableCommandHi);
    */
}

// this method is called when your extension is deactivated
export function deactivate() {
}



