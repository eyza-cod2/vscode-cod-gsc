import { CodFunction } from "./CodFunction";
import { defs } from "./CodFunctionsDefinitions";
import { GscGame } from "./GscConfig";


export class CodFunctions {

    /**
     * Check if a function definition matches the given game.
     * CoD2 MP + zk_libcod and CoD2 MP + CoD2x both inherit all CoD2 MP functions.
     */
    private static matchesGame(funcGames: string[], game: GscGame): boolean {
        if (funcGames.includes(game)) {
            return true;
        }
        // CoD2 MP + zk_libcod includes all CoD2 MP functions
        if (game === GscGame.CoD2MPZkLibcod && funcGames.includes(GscGame.CoD2MP)) {
            return true;
        }
        // CoD2 MP + CoD2x includes all CoD2 MP functions
        if (game === GscGame.CoD2MPCod2x && funcGames.includes(GscGame.CoD2MP)) {
            return true;
        }
        return false;
    }

    static getDefinitions(game: GscGame): CodFunction[] {
		if (game === GscGame.UniversalGame) {
			return defs;
		}
        else {
            return defs.filter(d => CodFunctions.matchesGame(d.games, game));
        }
    }

	public static isPredefinedFunction(funcName: string, game: GscGame | undefined) {
		if (game === GscGame.UniversalGame) {
			return false;
		}
		funcName = funcName.toLowerCase();
		return defs.some(d => d.name.toLowerCase() === funcName && (game === undefined || CodFunctions.matchesGame(d.games, game)));
	}

	public static getByName(funcName: string, hasCallOn: boolean | undefined = undefined, game: GscGame | undefined) {

		funcName = funcName.toLowerCase();

		const matchesCallOn = (f: CodFunction): boolean => {
			if (hasCallOn !== undefined) {
				if (hasCallOn && f.callOn === "") { return false; }
				if (!hasCallOn && f.callOn !== "") { return false; }
			}
			return true;
		};

		// For extended variants, prefer exact game match over inherited CoD2 MP match.
		// This ensures variant-specific overrides (e.g. extra optional params) take priority.
		if (game === GscGame.CoD2MPZkLibcod) {
			const exactMatch = defs.find(f =>
				f.name.toLowerCase() === funcName &&
				f.games.includes(GscGame.CoD2MPZkLibcod) &&
				matchesCallOn(f)
			);
			if (exactMatch) { return exactMatch; }
		}
		if (game === GscGame.CoD2MPCod2x) {
			const exactMatch = defs.find(f =>
				f.name.toLowerCase() === funcName &&
				f.games.includes(GscGame.CoD2MPCod2x) &&
				matchesCallOn(f)
			);
			if (exactMatch) { return exactMatch; }
		}

		// Find in predefined functions
		const preDefFunc = defs.find(f => {
			if (f.name.toLowerCase() !== funcName) {
				return false;
			}
			if (game && !CodFunctions.matchesGame(f.games, game)) {
				return false;
			}
			if (!matchesCallOn(f)) {
				return false;
			}
			return true;
		});

		return preDefFunc;
	}
}

