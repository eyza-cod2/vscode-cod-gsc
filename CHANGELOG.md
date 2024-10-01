# Change Log

All notable changes to the "gsc" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

## [0.2.0] - 2024-10-01
- Added support for global variable definitions (CONST_VAR1 = 1;)
- Added support for array initializers, like "arr = [10, 20, 30]"
- Added support for conditional ternary operators (var = a ? b : c)
- Added support for do {} while ();
- Added list of supported GSC features for each game. Universal game supports everything. For example CoD2 does not support foreach, do-while, array initializer, global variables, ternary, recursive developer blocks, etc. When not supported, error diagnostics is shown.
- Improved missing semicolon error indication - now the red underline is visible only at the end of the statement where the semicolon should be placed
- Improved missing semicolon detection by verifying if variable + structure accessor, object + function call are on single line
- Improved error diagnostics for 'if', 'else', 'for', 'while', 'do' when inline statement is used instead of scope (single-line scope) and there is some error in that inline statement. (for example "if (true) some error here;" would no longer consider "if (true)" as bad syntax)
- Improved exception messages when parsing GSC files.
- Fixed correct update of currently selected game in status bar when manually changed
- Fixed foreach with function call in array parameter -> "foreach(v in getArray())" -> 'in' keyword was recognized as variable name
- Fixed 'for' with function call in condition statement -> "for (i = 1; self isOk(); i++)"
- Fixed double negations -> "var1 = !!true;"
- Fixed no error detected when foreach expression is empty -> foreach() {}
- Fixed error for unclosed scope bracket -> { }


## [0.1.10] - 2024-09-22

- Added support for "foreach"
- Added error diagnostic if a file is included by itself via #include. Now it also does not consider - functions to be duplicated.
- Added error diagnostics if file is included twice or more via #include
- Improved debugging window of parsed files to show parsed data of selected range of text
- Improved tests so a few lines of source code is printed for all files in error stack for tests
- Fixed Github Actions .yml file - manual triggering allowed and if conditions wrapped into ${{ }}


## [0.1.9] - 2024-09-21

- Fixed errors for file references on Linux systems
- Fixed unnecessary file parsing
- Improved exceptions handling
- Improved logging data into 'Output' tab
- Improved internal notifying of GscFiles
- Improved internal storage of diagnostics for files
- Updated README with list of all CoD games and their support status


## [0.1.8] - 2024-09-15

- Fixed file path separator on linux system for GSC file path references
- Added CI for Github Actions (automated integration tests)
- Dependencies updated


## [0.1.7] - 2024-09-15

- Auto-suggestion for variables 'level' and 'game' now take included workspace folder into account
- Improved caching of parsed files
- Changed the order of how files are being searched in workspace when they get referenced - its sorted by how the workspace folder appears in explorer tab, the last folder is searched first
- Added error diagnostic for #include
- Added new debugging window to inspect the files
- Added log window into Output Channels


## [0.1.6] - 2024-08-28

- Fixed missing file ./src/Updates.html in package


## [0.1.5] - 2024-08-28

- Fixed missing package 'semver'


## [0.1.4] - 2024-08-28

- Added ability to include workspace folders for external GSC files references
- Added local and included functions into auto-suggestion
- Added settings to disable error diagnostics
- Improved hover over local functions
- Improved update change log popup window
- Fixed code action "Change game root folder to xxx" - it suggested folders from different workspace folders + it was able to use file instead of folder
- Fixed re-diagnosing files when file is moved to another folder
- Fixed automatic extension activation on startup - now the extension is activated when some GSC file is opened
- Fixed error message appearing when new folder is added into multi-root workspace


## [0.1.3] - 2024-08-24

- Fixed error message appearing when new folder is created in workspace


## [0.1.2] - 2024-08-24

- Added code action "Change game root folder to 'xxx'" - it will automatically detects if files are in deeper folder structure
- Fixed quick fix option "Ignore file xxx (workspace settings)"
- Updated all packages


## [0.1.1] - 2024-08-24

- Fixed images in update notification window


## [0.1.0] - 2024-08-24

- Added settings - game selection, game root folder, ignored file paths, ignored function names
- Added option in status bar to switch the game
- Added support for CoD2 MP + SP
- Added CoD2 MP + SP function definitions for auto-suggestion, hover a parameters error diagnostics
- Added warning message when build-in function is overwritten by local function
- Added code action provider to easily add file path into ignored list
- Added yellow status bar information indicating parsing and diagnosing tasks in background
- Added issue manual reporting
- Fixed case-sensitivity for file paths and function names
- Fixed structure & array auto-suggestion when written after keyword (e.g. 'wait level.xxx')
- Fixed re-diagnosing files when renamed, deleted or workspace folder changed
- Fixed handling GSC files outside of the workspace


## [0.0.7] - 2024-06-23

- Improved hover-over function names (colorization, warnings, case insensitive match)


## [0.0.6] - 2024-06-22

- Fixed hover-over function name case-sensitive error (functions are case insensitive)
- Fixed parsing error when double-quote does not have ending pair (a = "string;)


## [0.0.5] - 2024-06-20

- Improved error reporting of unexpected tokens / missing semicolon
- Added syntax support for casting (used in COD1)
- Fixed stack overflow error while parsing large files (caused by ...spread operator + recursive functions)
- Fixed developer block /##/ which can be used as regular scope


## [0.0.4] - 2024-06-17

- New GSC parser
- New analyzer
- New completion item provider
- New diagnostics provider
- New semantics provider
- New definition provider
- New hover provider


## [0.0.3] - 2024-03-29

- Added "HoverProvider" and "DefinitionProvider" that works with functions-
- Improved gsc syntax highlighting


## [0.0.2] - 2024-03-28

- Changed from "New Language Support" to "New Extension (TypeScript)" in 'yo code' template
- Basic syntax highlights of .gsc files


## [0.0.1] - 2024-03-27

- Initial release

