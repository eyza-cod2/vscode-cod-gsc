# CoD GSC extension for VS Code

This extension adds language support for the GSC scripts used in Call of Duty (CoD1, CoD2, CoD3, CoD4, CoD5:WaW, CoD6:MW2, COD7:BO1).

This extension is still under development and is not fully finished. Check the list of the available features in [List of features](#list-of-features).


## Supported games

| Game     | Status  | Tested with    |
|----------|---------|----------------|
| CoD1     | ✅ Tested     | raw files     |
| CoD2     | ✅ Tested         | raw files<br>zPAM 3.33 mod - https://github.com/eyza-cod2/zpam3    |
| CoD3     | ❌ Not tested     | -    |
| CoD4     | ✅ Tested         | raw files<br>Promod 2.20 mod - https://github.com/promod/promod4<br>OpenWarfare mod - https://github.com/cod4mw/openwarfare    |
| CoD5     | ❌ Not tested     | -    |
| CoD6:MW2 | ❌ Not tested     | -    |
| CoD7:BO1 | ✅ Tested         |  Redemption mod - https://github.com/roachnacs/redemption-bo1-gsc<br>Reimagined zombies mod - https://github.com/Jbleezy/BO1-Reimagined   |
| Other    | 🚫 Not supported     |     |

Games released later will not be supported because the GSC syntax changed significantly since then.






## Features

Syntax highlighting

![Syntax highlight](images/vscode-syntax-highlight-1.png)

Completion items

![Completion](images/vscode-completion-2.gif)

Completion items (with recognized variable type)

![Completion](images/vscode-completion-1.png)

Diagnostics

![Completion](images/vscode-diagnostics-1.png)

Function definition

![Function definition](images/vscode-function-definition.gif)

Function hover info

![Function hover](images/vscode-function-hover.gif)




## List of features
- GSC file parser
  - Syntax parser
    - Comments (`/*...*/`, `//...`)
    - Developer blocks (`/# ... #/`)
    - Preprocessor (`#include`, `#using_animtree`, `#animtree`)
    - Keywords (`return`, `if`, `else`, `for`, `while`, `switch`, `continue`, `break`, `case`, `default`, `thread`, `wait`, `waittillframeend`, `waittill`, `waittillmatch`, `endon`, `notify`, `breakpoint`)
    - Operators (`=`, `+=`, `-=`, `*=`, `/=`, `%=`, `|=`, `&=`, `^=`, `++`, `--`, `+`, `-`, `*`, `/`, `%`, `|`, `&`, `^`, `<<`, `>>`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`, `~`)
    - Strings (`"default"`, `&"STRING_LOCALIZED"`, `#"sv_cvar_string"`)
    - Anim string (`%xanim_file_name`)
    - Path (eg. `maps\mp\gametypes\sd`)
  - Detection of explicitly typed types of variables (string, localized string, cvar string, vector, integer, float, structure, array, function, entity, bool, xanim)
- Completion item provider (auto-suggestion)
    - Variables (local to function, global `level` and `game`)
    - Constants
    - Keywords 
    - File path
- Diagnostics (errors and warnings)
  - Syntax error
    - Unexpected tokens
    - Missing semicolons
  - Extra semicolons
- Semantics token provider 
  - Proper colorization of tokens
- Definition provider
  - Local functions (`funcName()`)
  - External functions (`maps\mp\gametypes\file::funcName()`)
  - Included functions (via `#include`)
- Hover provider
  - Function info



## TODO
- Parser for .menu files
- Integrate list of built-in functions
- Make selector to choose between games - each game has different set of functions
- Improve detection of variable types - now it's detected only by explicitly assigned constant value
- Show available function names in completion item provider
- Show available string constants for `notify` `waittill` `waittillmatch` `endon` in completion item provider
- Check for unreachable code
- Check for correct number of arguments for functions and keywords
- Implement "Go to definition" for variables
- Implement some kind of JSDoc comments to improve function and variable description
- Implement rename function / variable functionality
- Detection of undefined variables





## Install
This extension is available through Visual Studio Marketplace.



## Support
Please test this extension in vscode on your GSC files and report bugs / suggestions on the github page or on discord [KILLTUBE #vscode-cod-gsc](https://discord.gg/NJrAZ937)


[![Donate with PayPal](images/paypal.png)](https://www.paypal.com/donate/?hosted_button_id=R59Y6UN9LJVXQ)

