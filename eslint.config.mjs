import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        // General JS/TS files (including .js and .ts)
        files: ["**/*.ts"],
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                project: './tsconfig.json',  // Only apply to TypeScript files
                tsconfigRootDir: './',
            },
        },
        rules: {
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
            ],
            "@typescript-eslint/no-floating-promises": "error", // For TypeScript files
            curly: "warn",
            eqeqeq: "warn",
            "no-throw-literal": "warn",
            semi: "warn",
        },
    }
];
