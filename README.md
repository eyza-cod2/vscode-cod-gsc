# CoD GSC scripts

This extension adds language support for the GSC scripts used in Call of Duty.




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
- Add this extension into Visual Studio Marketplace
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




## Tested with
- CoD2 raw files
- CoD2 zPAM 3.33 mod - https://github.com/eyza-cod2/zpam3
- CoD4 Promod 2.20 mod - https://github.com/promod/promod4
- CoD4 OpenWarfare mod - https://github.com/cod4mw/openwarfare
- CoD:BO1 Redemption mod - https://github.com/roachnacs/redemption-bo1-gsc
- CoD:BO1 Reimagined zombies mod - https://github.com/Jbleezy/BO1-Reimagined



## Install
To install this extension into Visual Studio Code copy this repository folder into the `.vscode/extensions` folder. Depending on your operating system, this folder has a different location:
- Windows: `%USERPROFILE%\.vscode\extensions`
- macOS: `~/.vscode/extensions`
- Linux: `~/.vscode/extensions`

After that restart the Visual Studio Code. 

This extension is not available on Visual Studio Marketplace yet.



## Support
Please test this extension in vscode on your GSC files and report bugs / suggestions on the github page.


[![Donate with PayPal](images/paypal.png)](https://www.paypal.com/donate/?hosted_button_id=R59Y6UN9LJVXQ)

