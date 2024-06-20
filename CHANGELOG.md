# Change Log

All notable changes to the "gsc" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

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

