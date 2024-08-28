# Change Log

All notable changes to the "gsc" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

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

