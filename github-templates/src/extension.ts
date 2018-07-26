'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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

import { commandTestHello, commandTestQuickPick, commandTestCreateFile, commandTestGithub} from './commands';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "github-templates" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let commands: RegisterCommand[] = [
        new RegisterCommand('extension.testHello', commandTestHello),
        new RegisterCommand('extension.testQuickPick', commandTestQuickPick),
        new RegisterCommand('extension.testCreateFile', commandTestCreateFile),
        new RegisterCommand('extension.testGithub', commandTestGithub),
    ];   


    for (let command of commands) {
        command.Register(context);
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}



