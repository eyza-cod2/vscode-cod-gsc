import { CodFunction } from "./CodFunction";
import { defs } from "./CodFunctionsDefinitions";
import { GscGame } from "./GscConfig";


export class CodFunctions {

    static getDefinitions(game: GscGame): CodFunction[] {
		if (game === GscGame.UniversalGame) {
			return defs;
		}
        else {
            return defs.filter(d => d.games.includes(game));
        }
    }

	public static isPredefinedFunction(funcName: string, game: GscGame | undefined) {		
		if (game === GscGame.UniversalGame) {
			return false;
		}
		funcName = funcName.toLowerCase();
		return defs.some(d => d.name.toLowerCase() === funcName && (game === undefined || d.games.includes(game)));
	}

	public static getByName(funcName: string, hasCallOn: boolean | undefined = undefined, game: GscGame | undefined) {
		
		funcName = funcName.toLowerCase();

		// Find in predefined functions
		const preDefFunc = defs.find(f => {
			if (f.name.toLowerCase() !== funcName) {
				return false;
			}
			if (game && !f.games.includes(game)) {
				return false;
			}
			if (hasCallOn !== undefined) {
				// Referenced function have callon object, but this function definition does not have it
				if (hasCallOn && f.callOn === "") {
					return false;
				}
				// Referenced function does not have callon object, but this function definition does
				if (!hasCallOn && f.callOn !== "") {
					return false;
				}
			}
			return true;
		});

		return preDefFunc;
	}
}

