import * as vscode from 'vscode';
import { GscFileParser, GscToken, TokenType } from './GscFileParser';
import { GscConfig, ConfigFormattingBraceStyle } from './GscConfig';
import { Issues } from './Issues';
import { LoggerOutput } from './LoggerOutput';


/** Reserved words that introduce a body and can appear without braces. */
const CONTROL_KEYWORDS = new Set(["if", "for", "while", "foreach", "else", "do"]);

/**
 * Reserved statement keywords that take a space before `(` (`if (x)`, `return (x)`)
 * — as opposed to function/keyword calls which do not (`foo(x)`, `notify("x")`).
 */
const KEYWORDS_SPACE_BEFORE_PAREN = new Set(["if", "for", "while", "foreach", "switch", "return"]);

/**
 * Reserved words that do NOT produce a value. After these, a `+`/`-` is unary
 * (`return -5`, `wait -1`) rather than a binary operator (`x - 5`).
 */
const NON_VALUE_KEYWORDS = new Set([
    "if", "else", "for", "while", "foreach", "switch", "case", "default",
    "return", "thread", "wait", "do", "in", "breakpoint", "waittill",
    "waittillmatch", "waittillframeend", "endon", "notify",
]);


/**
 * GSC document formatter.
 *
 * Design note: this formatter NEVER rebuilds the whole file from the token
 * stream. GSC's tokenizer keeps only the last comment before each token, so a
 * global rebuild would silently delete stacked `//` comments and commented-out
 * code (common in real GSC). Instead it works line by line:
 *   1. Re-indent every line from real brace / switch-case / braceless-control
 *      depth (its own comment & string aware scanner).
 *   2. Re-space the *code* part of each line to a canonical style, preserving any
 *      trailing comment verbatim and keeping multi-space column alignment.
 * Comments and string contents are never altered, only whitespace between tokens.
 */
export class GscFormatter implements vscode.DocumentFormattingEditProvider, vscode.DocumentRangeFormattingEditProvider {

    static async activate(context: vscode.ExtensionContext) {
        LoggerOutput.log("[GscFormatter] Activating");
        const provider = new GscFormatter();
        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider('gsc', provider),
            vscode.languages.registerDocumentRangeFormattingEditProvider('gsc', provider)
        );
    }

    public async provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        _token: vscode.CancellationToken
    ): Promise<vscode.TextEdit[] | undefined> {
        try {
            LoggerOutput.log("[GscFormatter] Formatting document", vscode.workspace.asRelativePath(document.uri));

            const content = document.getText();
            const braceStyle = GscConfig.getFormattingBraceStyle(document.uri);
            const formatted = GscFormatter.formatContent(content, options, braceStyle);

            if (formatted === content) {
                return [];
            }

            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(content.length)
            );
            return [vscode.TextEdit.replace(fullRange, formatted)];
        } catch (error) {
            Issues.handleError(error);
            return [];
        }
    }

    /**
     * Format Selection (Ctrl+K Ctrl+F). The range is expanded to whole lines; the
     * selected lines are re-formatted seeded with the indentation context of the
     * code that precedes them, so they land at the correct absolute indent.
     */
    public async provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument,
        range: vscode.Range,
        options: vscode.FormattingOptions,
        _token: vscode.CancellationToken
    ): Promise<vscode.TextEdit[] | undefined> {
        try {
            const startLine = range.start.line;
            // A selection that ends at column 0 of a line doesn't include that line.
            let endLine = range.end.line;
            if (endLine > startLine && range.end.character === 0) {
                endLine--;
            }
            LoggerOutput.log(`[GscFormatter] Formatting range ${startLine}-${endLine}`, vscode.workspace.asRelativePath(document.uri));

            const braceStyle = GscConfig.getFormattingBraceStyle(document.uri);
            const formatted = GscFormatter.formatRange(document.getText(), startLine, endLine, options, braceStyle);

            const replaceRange = new vscode.Range(startLine, 0, endLine, document.lineAt(endLine).text.length);
            if (formatted === document.getText(replaceRange)) {
                return [];
            }
            return [vscode.TextEdit.replace(replaceRange, formatted)];
        } catch (error) {
            Issues.handleError(error);
            return [];
        }
    }

    /**
     * Format GSC source. Pure function — directly unit-testable.
     */
    public static formatContent(
        content: string,
        options: vscode.FormattingOptions,
        braceStyle: ConfigFormattingBraceStyle = ConfigFormattingBraceStyle.Allman
    ): string {
        if (content.length === 0) {
            return content;
        }

        const eol = content.includes("\r\n") ? "\r\n" : "\n";
        const indentUnit = options.insertSpaces ? " ".repeat(options.tabSize) : "\t";
        const rawLines = content.split(/\r?\n/);

        // Pipeline: re-space code -> apply brace style -> indent. Indentation is
        // computed LAST, on the final brace layout, so the result is idempotent.
        const respaced = GscFormatter.respaceLines(rawLines);

        let styled = respaced;
        if (braceStyle === ConfigFormattingBraceStyle.Allman) {
            styled = GscFormatter.toAllman(respaced);
        } else if (braceStyle === ConfigFormattingBraceStyle.KnR) {
            styled = GscFormatter.toKnR(respaced);
        }

        const indented = GscFormatter.indentLines(styled, indentUnit);

        // Collapse blank runs to one, drop blank lines at block edges (right after
        // `{` / right before `}`), and trim leading/trailing blank lines. A line
        // ending in `{` or starting with `}` is always a real brace (terminated
        // strings end in `"`, so this never matches a brace inside a string).
        const finalLines: string[] = [];
        let blanks = 0;
        for (let i = 0; i < indented.length; i++) {
            const l = indented[i];
            if (l === "") {
                const prevKept = finalLines[finalLines.length - 1];
                const afterOpen = prevKept !== undefined && prevKept.endsWith("{");
                let j = i + 1;
                while (j < indented.length && indented[j] === "") {
                    j++;
                }
                const next = j < indented.length ? indented[j] : undefined;
                const beforeClose = next !== undefined && next.trimStart().startsWith("}");
                if (afterOpen || beforeClose) {
                    continue; // drop blank line at a block edge
                }
                if (++blanks <= 1) {
                    finalLines.push("");
                }
            } else {
                blanks = 0;
                finalLines.push(l);
            }
        }
        while (finalLines.length > 0 && finalLines[0] === "") {
            finalLines.shift();
        }
        while (finalLines.length > 0 && finalLines[finalLines.length - 1] === "") {
            finalLines.pop();
        }

        return finalLines.join(eol) + eol;
    }

    /**
     * Format only lines [startLine, endLine] (inclusive). The selection is
     * re-spaced, brace-styled and indented exactly like a full-document format,
     * but seeded with the brace/comment/continuation depth produced by the code
     * before it — so the block lands at the correct absolute indentation. Returns
     * the formatted lines joined by EOL (no trailing newline). Blank-line collapse
     * and edge trimming are intentionally skipped so a selection's own blank lines
     * are left alone.
     */
    public static formatRange(
        content: string,
        startLine: number,
        endLine: number,
        options: vscode.FormattingOptions,
        braceStyle: ConfigFormattingBraceStyle = ConfigFormattingBraceStyle.Allman
    ): string {
        const eol = content.includes("\r\n") ? "\r\n" : "\n";
        const indentUnit = options.insertSpaces ? " ".repeat(options.tabSize) : "\t";
        const lines = content.split(/\r?\n/);

        startLine = Math.max(0, startLine);
        endLine = Math.min(lines.length - 1, endLine);
        if (startLine > endLine) {
            return "";
        }

        // Seed depth state by running the indenter over the preceding lines
        // (raw — only their structure matters), discarding their output.
        const state = GscFormatter.newIndentState();
        for (let i = 0; i < startLine; i++) {
            GscFormatter.indentLine(state, lines[i], indentUnit);
        }
        const seedInBlock = state.inBlock;

        const selection = lines.slice(startLine, endLine + 1);
        const respaced = GscFormatter.respaceLines(selection, seedInBlock);

        let styled = respaced;
        if (braceStyle === ConfigFormattingBraceStyle.Allman) {
            styled = GscFormatter.toAllman(respaced, seedInBlock);
        } else if (braceStyle === ConfigFormattingBraceStyle.KnR) {
            styled = GscFormatter.toKnR(respaced, seedInBlock);
        }

        return GscFormatter.indentLines(styled, indentUnit, state).join(eol);
    }

    /**
     * Stage 1 — re-space the code of each line, leaving indentation to stage 3.
     * Blank lines become "", block-comment interiors are kept verbatim.
     */
    private static respaceLines(rawLines: string[], seedInBlock = false): string[] {
        const res: string[] = [];
        let inBlock = seedInBlock;
        for (const rawLine of rawLines) {
            const info = GscFormatter.analyzeLine(rawLine, inBlock, false);
            const startedInBlock = inBlock;
            inBlock = info.endsInBlockComment;

            if (info.isBlank) { res.push(""); continue; }
            if (startedInBlock) { res.push(info.trimmedEnd); continue; }
            if (info.isCommentOnly || !info.respaceable) { res.push(info.trimmed); continue; }

            const codeRaw = info.commentAt >= 0 ? rawLine.slice(0, info.commentAt) : rawLine;
            const code = codeRaw.trim();
            const respaced = GscFormatter.respaceCode(code);
            if (info.commentAt >= 0) {
                const gap = codeRaw.slice(codeRaw.trimEnd().length);
                const comment = rawLine.slice(info.commentAt);
                res.push(respaced + (respaced.length > 0 ? (gap.length > 0 ? gap : " ") : "") + comment);
            } else {
                res.push(respaced);
            }
        }
        return res;
    }

    /**
     * Stage 3 — assign indentation to each (already re-spaced, brace-styled) line
     * from real brace / switch-case / braceless-control depth. The `state` carries
     * depth across lines and can be pre-seeded (used for range formatting, where
     * the selection's depth depends on the code preceding it).
     */
    private static indentLines(lines: string[], indentUnit: string, state: IndentState = GscFormatter.newIndentState()): string[] {
        return lines.map((line) => GscFormatter.indentLine(state, line, indentUnit));
    }

    private static newIndentState(): IndentState {
        return { stack: [], inBlock: false, pendingSwitchBrace: false, parenCarry: 0, prevContinuesExpr: false };
    }

    /** Indent a single line, advancing `state`. Returns the re-indented line. */
    private static indentLine(state: IndentState, line: string, indentUnit: string): string {
        const info = GscFormatter.analyzeLine(line, state.inBlock, state.pendingSwitchBrace);
        const startedInBlock = state.inBlock;
        state.inBlock = info.endsInBlockComment;
        state.pendingSwitchBrace = info.endsExpectingSwitchBrace;

        if (info.isBlank) { return ""; }
        if (startedInBlock) { return info.trimmedEnd; }

        const stack = state.stack;
        if (info.startsWithOpenBrace) {
            const t = stack[stack.length - 1];
            if (t !== undefined && t.virtual) {
                stack.pop();
            }
        }

        const isLabel = info.firstWord === "case" || info.firstWord === "default";
        // A line is a continuation (indented one extra level) when it sits inside
        // an unclosed `(`/`[` (multi-line call / array) or the previous line ended
        // mid-expression (e.g. on a binary operator or comma).
        const continuation = (state.parenCarry > 0 || state.prevContinuesExpr) ? 1 : 0;
        const indentLevel = GscFormatter.indentForLine(stack, info.leadingClosers, isLabel) + continuation;
        const out = indentLevel > 0 ? indentUnit.repeat(indentLevel) + info.trimmed : info.trimmed;
        state.parenCarry = Math.max(0, state.parenCarry + info.openDelta);
        if (!info.isCommentOnly) {
            state.prevContinuesExpr = GscFormatter.endsMidExpression(info.trimmed);
        }

        GscFormatter.applyBraces(stack, info);

        const top = stack[stack.length - 1];
        if (isLabel && top !== undefined && top.isSwitch) {
            top.caseOpen = true;
        }

        if (info.isCommentOnly) {
            // Comments don't open or resolve bodies.
        } else if (info.isBracelessHeader) {
            stack.push({ isSwitch: false, caseOpen: false, virtual: true });
        } else if (!info.startsWithOpenBrace && state.parenCarry === 0 && !state.prevContinuesExpr) {
            // A braceless body's controlled statement is now complete (not still
            // continuing across lines), so close its virtual indent level(s).
            while (stack.length > 0 && stack[stack.length - 1].virtual) {
                stack.pop();
            }
        }
        return out;
    }

    // -------------------------------------------------------------------------
    // Brace style
    // -------------------------------------------------------------------------

    /** Split code/comment of a (formatted) line; comment/string aware. */
    private static splitCodeComment(line: string, inBlock: boolean): {
        indent: string; code: string; comment: string; endsInBlock: boolean; transformable: boolean;
    } {
        const n = line.length;
        let i = 0;
        let blk = inBlock;
        let str = false;
        let sc = "";
        let commentAt = -1;
        let hasInlineBlock = false;

        while (i < n) {
            const c = line[i];
            const c2 = i + 1 < n ? line[i + 1] : "";
            if (blk) {
                if (c === "*" && c2 === "/") { blk = false; i += 2; continue; }
                i++; continue;
            }
            if (str) {
                if (c === "\\") { i += 2; continue; }
                if (c === sc) { str = false; }
                i++; continue;
            }
            if (c === "/" && c2 === "/") { commentAt = i; break; }
            if (c === "/" && c2 === "*") { hasInlineBlock = true; blk = true; i += 2; continue; }
            if (c === '"' || c === "'") { str = true; sc = c; i++; continue; }
            i++;
        }

        const indent = (line.match(/^\s*/) ?? [""])[0];
        const codeRaw = commentAt >= 0 ? line.slice(0, commentAt) : line;
        const code = codeRaw.trim();
        const comment = commentAt >= 0 ? line.slice(commentAt) : "";
        const transformable = !inBlock && !hasInlineBlock && code.length > 0;
        return { indent, code, comment, endsInBlock: blk, transformable };
    }

    /** Convert to Allman: opening brace and `else` on their own lines. */
    private static toAllman(lines: string[], seedInBlock = false): string[] {
        const res: string[] = [];
        let inBlock = seedInBlock;
        for (const line of lines) {
            const s = GscFormatter.splitCodeComment(line, inBlock);
            inBlock = s.endsInBlock;
            if (!s.transformable) { res.push(line); continue; }

            let cur = s.code;
            const pieces: string[] = [];

            // `} else ...`  ->  `}` on its own line.
            if (/^\}\s*else\b/.test(cur)) {
                pieces.push(s.indent + "}");
                cur = cur.replace(/^\}\s*/, "");
            }

            // Trailing `{` with code before it -> brace on its own line.
            if (cur.length > 1 && cur.endsWith("{")) {
                const header = cur.slice(0, -1).replace(/\s+$/, "");
                if (header.length > 0) {
                    pieces.push(s.indent + header);
                    pieces.push(s.indent + "{" + (s.comment ? " " + s.comment : ""));
                } else {
                    pieces.push(s.indent + cur + (s.comment ? " " + s.comment : ""));
                }
            } else {
                pieces.push(s.indent + cur + (s.comment ? " " + s.comment : ""));
            }

            // If nothing actually changed, keep the original line verbatim.
            if (pieces.length === 1 && pieces[0] === s.indent + s.code + (s.comment ? " " + s.comment : "")) {
                res.push(line);
            } else {
                res.push(...pieces);
            }
        }
        return res;
    }

    /** Convert to K&R: opening brace and `else` joined onto the previous line. */
    private static toKnR(lines: string[], seedInBlock = false): string[] {
        const res: string[] = [];
        let inBlock = seedInBlock;
        for (const line of lines) {
            const s = GscFormatter.splitCodeComment(line, inBlock);
            inBlock = s.endsInBlock;
            if (!s.transformable) { res.push(line); continue; }

            // Lone `{` -> append to the previous code line.
            if (s.code === "{" && !s.comment) {
                const idx = GscFormatter.lastNonBlank(res);
                if (idx >= 0) {
                    const prev = GscFormatter.splitCodeComment(res[idx], false);
                    if (!prev.comment && (/\)\s*$/.test(prev.code) || /\b(else|do)$/.test(prev.code))) {
                        res[idx] = res[idx].replace(/\s+$/, "") + " {";
                        continue;
                    }
                }
                res.push(line);
                continue;
            }

            // `else ...` -> join to a previous `}` line.
            if (/^else\b/.test(s.code) && !s.comment) {
                const idx = GscFormatter.lastNonBlank(res);
                if (idx >= 0) {
                    const prev = GscFormatter.splitCodeComment(res[idx], false);
                    if (!prev.comment && prev.code === "}") {
                        res[idx] = res[idx].replace(/\s+$/, "") + " " + s.code;
                        continue;
                    }
                }
                res.push(line);
                continue;
            }

            res.push(line);
        }
        return res;
    }

    private static lastNonBlank(lines: string[]): number {
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].trim().length > 0) {
                return i;
            }
        }
        return -1;
    }

    // -------------------------------------------------------------------------
    // Spacing
    // -------------------------------------------------------------------------

    /**
     * Re-space a single line of code (no trailing comment, no leading indent).
     * Tokenizes the line and rejoins tokens with canonical spacing, preserving
     * runs of 2+ spaces before a token as intentional column alignment.
     */
    public static respaceCode(code: string): string {
        if (code.length === 0) {
            return "";
        }

        let tokens: GscToken[];
        try {
            tokens = GscFileParser.tokenize(code);
        } catch {
            return code; // never risk mangling a line we can't tokenize
        }
        if (tokens.length === 0) {
            return code;
        }

        // Leading text before the first token (e.g. a `&`/`#` prefix the
        // tokenizer leaves out of the token name) is preserved verbatim.
        let result = code.substring(0, tokens[0].offset) + tokens[0].name;
        let ternaryDepth = 0; // open `?` awaiting their `:`

        for (let i = 1; i < tokens.length; i++) {
            const prev = tokens[i - 1];
            const cur = tokens[i];

            if (cur.type === TokenType.QuestionMark) {
                ternaryDepth++;
            }
            let curIsTernaryColon = false;
            if (cur.type === TokenType.Colon && ternaryDepth > 0) {
                curIsTernaryColon = true;
                ternaryDepth--;
            }

            const wantSpace = GscFormatter.wantSpaceBetween(prev, cur, tokens, i, curIsTernaryColon);

            // Split the inter-token gap into its leading whitespace and any
            // non-whitespace prefix that belongs to the current token (`&"..."`,
            // `#"..."`). We only ever normalize the whitespace — every
            // non-whitespace character is preserved, guaranteeing no code change.
            const gap = code.substring(prev.offset + prev.name.length, cur.offset);
            const ws = gap.match(/^\s*/)![0];
            const prefix = gap.slice(ws.length);

            // `%` is ambiguous: modulo (`a % b`) vs xanim ref (`%anim`). Preserve
            // the author's spacing AFTER it rather than guessing.
            let separator: string;
            if (prev.type === TokenType.Operator && prev.name === "%") {
                separator = ws;
            } else {
                // Preserve gaps that are 2+ spaces or contain a tab — these are
                // intentional column alignment. Otherwise normalize to one space.
                const isAlignment = ws.length >= 2 || ws.includes("\t");
                separator = wantSpace ? (isAlignment ? ws : " ") : "";
            }
            result += separator + prefix + cur.name;
        }

        return result;
    }

    /**
     * Does this line's code end mid-expression (so the next line continues it and
     * should be indented)? True when the last code token is a binary operator,
     * assignment, comma or `?`. Token-based, so postfix `i++` (Assignment3) and
     * case-label `:` correctly do NOT count.
     */
    private static endsMidExpression(code: string): boolean {
        let tokens: GscToken[];
        try {
            tokens = GscFileParser.tokenize(code);
        } catch {
            return false;
        }
        if (tokens.length === 0) {
            return false;
        }
        switch (tokens[tokens.length - 1].type) {
            case TokenType.Operator:
            case TokenType.Assignment:
            case TokenType.Assignment2:
            case TokenType.ParameterSeparator:
            case TokenType.QuestionMark:
                return true;
            default:
                return false;
        }
    }

    /** Decide whether a space is wanted between two adjacent tokens. */
    private static wantSpaceBetween(prev: GscToken, cur: GscToken, tokens: GscToken[], i: number, curIsTernaryColon: boolean): boolean {
        const L = prev.type;
        const R = cur.type;

        // --- No space BEFORE these ---
        if (R === TokenType.Semicolon) { return false; }
        if (R === TokenType.ParameterSeparator) { return false; }
        if (R === TokenType.ExpressionEnd || R === TokenType.ArrayEnd) { return false; }
        if (L === TokenType.ScopeStart && R === TokenType.ScopeEnd) { return false; } // empty {}
        if (L === TokenType.ScopeEnd && R === TokenType.ScopeEnd) { return false; }   // }}
        if (R === TokenType.Structure) { return false; }            // .field
        if (R === TokenType.PathSeparator) { return false; }        // maps\mp
        if (R === TokenType.FunctionPointer) {
            // `name::func` attaches with no space; a pointer literal after an
            // operator/comma keeps its leading space: `x = ::func`, `f(a, ::g)`.
            if (L === TokenType.Keyword && !NON_VALUE_KEYWORDS.has(prev.name)) { return false; }
            if (L === TokenType.ExpressionStart || L === TokenType.ExpressionEnd ||
                L === TokenType.ArrayStart || L === TokenType.ArrayEnd) { return false; }
            return true;
        }
        if (R === TokenType.Assignment3) {
            // Postfix `i++` (after a value) → no space before; a prefix `= --R`
            // keeps the space from the preceding operator.
            if ((L === TokenType.Keyword && !NON_VALUE_KEYWORDS.has(prev.name)) ||
                L === TokenType.ExpressionEnd || L === TokenType.ArrayEnd) {
                return false;
            }
        }
        if (R === TokenType.Colon && !curIsTernaryColon) { return false; } // case 1:

        // --- No space AFTER these ---
        if (L === TokenType.ExpressionStart || L === TokenType.ArrayStart) { return false; }
        if (L === TokenType.Structure) { return false; }
        if (L === TokenType.PathSeparator) { return false; }
        if (L === TokenType.FunctionPointer) { return false; }
        if (L === TokenType.OperatorLeft) { return false; }         // !flag, ~x

        // Unary +/- : no space after it. (`%` is handled in respaceCode because it
        // is ambiguous between modulo `a % b` and xanim `%anim` — spacing after it
        // is preserved from the source.)
        if (L === TokenType.Operator && (prev.name === "-" || prev.name === "+") &&
            GscFormatter.isUnary(tokens, i - 1)) {
            return false;
        }
        // Prefix ++/-- (`--R`, `++i`): no space after. Postfix `i++` keeps the
        // space so a following `+` can't merge into `+++`.
        if (L === TokenType.Assignment3 && GscFormatter.isUnary(tokens, i - 1)) {
            return false;
        }

        // --- `(` after a name/keyword ---
        if (R === TokenType.ExpressionStart) {
            if (L === TokenType.Keyword) {
                return KEYWORDS_SPACE_BEFORE_PAREN.has(prev.name); // if ( vs foo(
            }
            if (L === TokenType.ExpressionEnd || L === TokenType.ArrayEnd) {
                return false; // )( or ](
            }
            // else fall through (e.g. after `=`, `,`, operator → space)
        }

        // --- `[` indexing / dereference ---
        if (R === TokenType.ArrayStart) {
            // `arr[i]`, `)[`, `][` attach with no space, but a reserved keyword
            // before `[[` keeps the space: `thread [[f]]()`, `return [[f]]()`.
            if ((L === TokenType.Keyword && !NON_VALUE_KEYWORDS.has(prev.name)) ||
                L === TokenType.ExpressionEnd || L === TokenType.ArrayEnd) {
                return false;
            }
            // else fall through (e.g. `= [` array initializer → space)
        }

        // --- Preprocessor: `#include path`, but `#using_animtree(` ---
        if (L === TokenType.Preprocessor) {
            return R !== TokenType.ExpressionStart;
        }

        // Default: single space (covers binary operators, assignments, keywords,
        // ternary `?`/`:`, commas-after, etc.).
        return true;
    }

    /** Is the operator token at index `idx` a unary +/- (no left operand)? */
    private static isUnary(tokens: GscToken[], idx: number): boolean {
        if (idx === 0) {
            return true;
        }
        const p = tokens[idx - 1];
        switch (p.type) {
            case TokenType.Number:
            case TokenType.String:
            case TokenType.LocalizedString:
            case TokenType.CvarString:
            case TokenType.ExpressionEnd:
            case TokenType.ArrayEnd:
                return false; // a value precedes → binary
            case TokenType.Keyword:
                return NON_VALUE_KEYWORDS.has(p.name); // identifier=binary, keyword=unary
            default:
                return true; // after operators, `(`, `,`, `=`, etc. → unary
        }
    }

    // -------------------------------------------------------------------------
    // Indentation depth model
    // -------------------------------------------------------------------------

    private static applyBraces(stack: Frame[], info: AnalyzedLine): void {
        for (const ev of info.braces) {
            if (ev.open) {
                stack.push({ isSwitch: ev.isSwitch, caseOpen: false, virtual: false });
            } else {
                while (stack.length > 0 && stack[stack.length - 1].virtual) {
                    stack.pop();
                }
                if (stack.length > 0) {
                    stack.pop();
                }
            }
        }
    }

    private static countCaseOpen(frames: Frame[]): number {
        let count = 0;
        for (const f of frames) {
            if (f.isSwitch && f.caseOpen) {
                count++;
            }
        }
        return count;
    }

    private static indentForLine(stack: Frame[], leadingClosers: number, isLabel: boolean): number {
        if (leadingClosers > 0) {
            let realToClose = leadingClosers;
            let idx = stack.length;
            while (idx > 0 && realToClose > 0) {
                idx--;
                if (!stack[idx].virtual) {
                    realToClose--;
                }
            }
            const remaining = stack.slice(0, idx);
            return remaining.length + GscFormatter.countCaseOpen(remaining);
        }

        const top = stack[stack.length - 1];
        let indent = stack.length + GscFormatter.countCaseOpen(stack);
        if (isLabel && top !== undefined && top.isSwitch && top.caseOpen) {
            indent -= 1;
        }
        return Math.max(0, indent);
    }

    // -------------------------------------------------------------------------
    // Line scanner
    // -------------------------------------------------------------------------

    /**
     * Scan one physical line (comment/string aware) and extract everything the
     * indenter and re-spacer need. `inBlockComment` / `pendingSwitchBrace` are
     * carry-in state from previous lines.
     */
    private static analyzeLine(line: string, inBlockComment: boolean, pendingSwitchBrace: boolean): AnalyzedLine {
        const n = line.length;
        let i = 0;

        let inBlock = inBlockComment;
        let inString = false;
        let stringChar = "";

        let firstSig = -1;
        let firstSigChar = "";
        let firstWord = "";
        let codeStarted = false;
        let sawNonCloser = false;
        let leadingClosers = 0;
        let parenDepth = 0;
        let openDelta = 0; // net unclosed ( and [ on this line (for continuation indent)
        let lastCodeChar = "";
        let pendingSwitch = pendingSwitchBrace;
        let commentAt = -1;
        let hasInlineBlockComment = false;

        const braces: BraceEvent[] = [];

        while (i < n) {
            const c = line[i];
            const c2 = i + 1 < n ? line[i + 1] : "";

            if (inBlock) {
                if (c === "*" && c2 === "/") {
                    inBlock = false;
                    i += 2;
                    continue;
                }
                i++;
                continue;
            }

            if (inString) {
                if (c === "\\") {
                    i += 2;
                    continue;
                }
                if (c === stringChar) {
                    inString = false;
                    lastCodeChar = c;
                }
                i++;
                continue;
            }

            if (c === "/" && c2 === "/") {
                if (firstSig < 0) { firstSig = i; firstSigChar = c; }
                commentAt = i;
                break;
            }
            if (c === "/" && c2 === "*") {
                if (firstSig < 0) { firstSig = i; firstSigChar = c; }
                hasInlineBlockComment = true;
                inBlock = true;
                i += 2;
                continue;
            }

            // Developer blocks /# ... #/ behave like braces for indentation.
            if (c === "/" && c2 === "#") {
                if (firstSig < 0) { firstSig = i; firstSigChar = c; }
                braces.push({ open: true, isSwitch: false });
                codeStarted = true; sawNonCloser = true;
                i += 2;
                continue;
            }
            if (c === "#" && c2 === "/") {
                if (firstSig < 0) { firstSig = i; firstSigChar = c; }
                braces.push({ open: false, isSwitch: false });
                if (!sawNonCloser) { leadingClosers++; }
                codeStarted = true;
                i += 2;
                continue;
            }

            if (c === '"' || c === "'") {
                if (firstSig < 0) { firstSig = i; firstSigChar = c; }
                codeStarted = true; sawNonCloser = true;
                inString = true; stringChar = c; lastCodeChar = c;
                i++;
                continue;
            }

            if (c === " " || c === "\t") {
                i++;
                continue;
            }

            if (firstSig < 0) { firstSig = i; firstSigChar = c; }
            lastCodeChar = c;

            if (/[A-Za-z_#]/.test(c)) {
                let j = i;
                while (j < n && /[A-Za-z_0-9#]/.test(line[j])) {
                    j++;
                }
                const word = line.substring(i, j);
                // Capture the first word even past leading `}` (so `} else` is
                // recognized as a braceless-else header for indentation).
                if (firstWord === "" && !sawNonCloser) {
                    firstWord = word;
                }
                if (word === "switch") {
                    pendingSwitch = true;
                }
                codeStarted = true; sawNonCloser = true;
                i = j;
                continue;
            }

            if (c === "(") { parenDepth++; openDelta++; codeStarted = true; sawNonCloser = true; i++; continue; }
            if (c === ")") { parenDepth = Math.max(0, parenDepth - 1); openDelta--; codeStarted = true; sawNonCloser = true; i++; continue; }
            if (c === "[") { openDelta++; codeStarted = true; sawNonCloser = true; i++; continue; }
            if (c === "]") { openDelta--; codeStarted = true; sawNonCloser = true; i++; continue; }

            if (c === "{") {
                braces.push({ open: true, isSwitch: pendingSwitch });
                pendingSwitch = false;
                codeStarted = true; sawNonCloser = true;
                i++;
                continue;
            }
            if (c === "}") {
                braces.push({ open: false, isSwitch: false });
                if (!sawNonCloser) { leadingClosers++; }
                codeStarted = true;
                i++;
                continue;
            }

            codeStarted = true; sawNonCloser = true;
            i++;
        }

        const trimmed = line.trim();
        const isBlank = firstSig < 0 && !inBlockComment;
        const isCommentOnly = !codeStarted && !isBlank && !inBlockComment;
        // A braceless control header may be preceded by a closing `}` (`} else`),
        // but an *opening* brace means the body is braced (not braceless).
        const hasOpenBrace = braces.some((b) => b.open);
        const isBracelessHeader =
            codeStarted &&
            !hasOpenBrace &&
            parenDepth === 0 &&
            lastCodeChar !== ";" &&
            CONTROL_KEYWORDS.has(firstWord);

        return {
            trimmedEnd: line.replace(/\s+$/, ""),
            trimmed,
            isBlank,
            isCommentOnly,
            respaceable: codeStarted && !inBlockComment && !hasInlineBlockComment,
            commentAt,
            startsWithOpenBrace: firstSigChar === "{",
            isBracelessHeader,
            endsInBlockComment: inBlock,
            endsExpectingSwitchBrace: pendingSwitch,
            leadingClosers,
            firstWord,
            braces,
            openDelta,
        };
    }
}

interface Frame {
    isSwitch: boolean;
    caseOpen: boolean;
    /** Virtual frame from a braceless control-flow header. */
    virtual: boolean;
}

/** Mutable depth state for the indenter — seedable for range formatting. */
interface IndentState {
    stack: Frame[];
    inBlock: boolean;
    pendingSwitchBrace: boolean;
    parenCarry: number;
    prevContinuesExpr: boolean;
}

interface BraceEvent {
    open: boolean;
    isSwitch: boolean;
}

interface AnalyzedLine {
    trimmedEnd: string;
    trimmed: string;
    isBlank: boolean;
    isCommentOnly: boolean;
    /** Safe to re-space this line's code (has code, no inline block comment). */
    respaceable: boolean;
    /** Index of the trailing `//` line comment, or -1. */
    commentAt: number;
    startsWithOpenBrace: boolean;
    isBracelessHeader: boolean;
    endsInBlockComment: boolean;
    endsExpectingSwitchBrace: boolean;
    leadingClosers: number;
    firstWord: string;
    braces: BraceEvent[];
    /** Net unclosed `(`/`[` on this line — drives continuation-line indentation. */
    openDelta: number;
}
