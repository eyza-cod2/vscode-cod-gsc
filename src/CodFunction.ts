import * as vscode from 'vscode';

export type CodFunctionParameter = {
	name: string;
	desc: string;
	type: string;
	isOptional: boolean;
	isVariableLength: boolean;
	isCallOn: boolean;
};

export type CodFunctionBase = {
	name: string;
	parameters: CodFunctionParameter[];
	callOn: string;
	desc: string;
	example: string;
	returnType: string;
	module: string;
	supportedAt: string;
	games: string[];
};

export class CodFunction {
	name!: string;
	parameters!: CodFunctionParameter[];
	callOn!: string;
	desc!: string;
	example!: string;
	returnType!: string;
	module!: string;
	supportedAt!: string;
	games!: string[];

	constructor(init: CodFunctionBase) {
		Object.assign(this, init);
	}

	getNumberOfParameters(): {max: number, min: number} {
		var data = {max: 0, min: 0};

		for (const p of this.parameters) {
			if (p.isCallOn) {
				continue;
			}
			data.max++;
			if (!p.isOptional) {
				data.min++;
			}
			// If last parameter is variable length, set max number of parameters
			if (p.isVariableLength) {
				data.max = 256;
			}
		}

		return data;
	}

	generateMarkdownDescription(showSupportedGames: boolean = false): vscode.MarkdownString {
		const md = new vscode.MarkdownString();
		md.isTrusted = true;

		const func = this;

		var text = "";

		if (func.parameters.length >= 1 && func.parameters[0].isCallOn) {
			text += func.parameters[0].name + " ";
		}
		text += func.name + "(";
		text += func.parameters.filter(p => !p.isCallOn).map(p => p.name + (p.isVariableLength ? ", ..." : "")).join(", ");
		text += ")";
		
		if (showSupportedGames) {
			text += "  // [" + func.games.join(", ") + "] ";
		}
		if (func.supportedAt !== "") {
			if (!showSupportedGames) {
				text += "  // ";
			}
			text += "" + func.supportedAt + " ";
		}
		md.appendCodeblock(text);


		md.appendMarkdown("" + func.desc + "\n\n");


		func.parameters.forEach(p => {
			if (p.isCallOn) {
				text = "@callon ";
			} else {
				text = "@param ";
			}
			text += "```" + p.name + "``` — ";
			if (p.type !== "") {
					text += "(" + p.type + ") ";
			}
			if (p.isOptional) {
					text += " [*OPTIONAL*] ";
			}
			/*if (p.isVariableLength) {
					text += " ***...*** ";
			}*/
			text += p.desc + "  \n";

			md.appendMarkdown(text);
		});

		if (func.returnType !== "") {
			md.appendMarkdown("@returns — " + func.returnType + "  \n");
		}

		md.appendMarkdown("  \n\n&nbsp; \n\n");

		if (func.example !== "") {
			md.appendMarkdown("Example:");
			md.appendCodeblock(func.example);
		}

		/*if (func.callOn !== "") {
			md.appendMarkdown("Call on: ```" + func.callOn + "```\n\n");
		}*/

		if (func.module !== "") {
			md.appendMarkdown("Module: ```" + func.module + "```\n\n");
		}

		return md;
	}	

}


