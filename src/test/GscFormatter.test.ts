import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { GscFormatter } from '../GscFormatter';
import { GscFileParser, TokenType } from '../GscFileParser';
import { ConfigFormattingBraceStyle } from '../GscConfig';

const TAB: vscode.FormattingOptions = { insertSpaces: false, tabSize: 4 };

function fmt(src: string, style = ConfigFormattingBraceStyle.Allman): string {
    return GscFormatter.formatContent(src, TAB, style);
}

/** Format a single statement placed inside a function body (Allman). */
function fmtStmt(stmt: string): string {
    return fmt(`f()\n{\n${stmt}\n}`);
}

/** Concatenation of all non-whitespace characters — must be invariant. */
function bare(s: string): string {
    return s.replace(/\s/g, '');
}

/** Token name/type stream — must be invariant (no token merged or split). */
function tokenStream(s: string): string {
    return GscFileParser.tokenize(s).map(t => TokenType[t.type] + ':' + t.name).join('|');
}


// =============================================================================
suite('GscFormatter: indentation', () => {
// =============================================================================

    test('fixes messy indentation', () => {
        assert.strictEqual(fmt(`main()\n{\nfoo();\n\t\tbar();\n}`),
            `main()\n{\n\tfoo();\n\tbar();\n}\n`);
    });

    test('nested braces', () => {
        assert.strictEqual(fmt(`f()\n{\nif (a)\n{\ng();\n}\n}`),
            `f()\n{\n\tif (a)\n\t{\n\t\tg();\n\t}\n}\n`);
    });

    test('braceless single-statement body is indented one level', () => {
        assert.strictEqual(fmt(`f()\n{\nif (a)\nb();\n}`),
            `f()\n{\n\tif (a)\n\t\tb();\n}\n`);
    });

    test('else-if chain', () => {
        assert.strictEqual(fmt(`f()\n{\nif (a)\nb();\nelse if (c)\nd();\n}`),
            `f()\n{\n\tif (a)\n\t\tb();\n\telse if (c)\n\t\td();\n}\n`);
    });

    test('switch / case (incl. nested brace in a case body)', () => {
        assert.strictEqual(
            fmt(`f()\n{\nswitch (x)\n{\ncase 1:\na();\nbreak;\ndefault:\nb();\n}\n}`),
            `f()\n{\n\tswitch (x)\n\t{\n\t\tcase 1:\n\t\t\ta();\n\t\t\tbreak;\n\t\tdefault:\n\t\t\tb();\n\t}\n}\n`);
    });

    test('already-formatted code is left unchanged (no-op)', () => {
        const clean = `main()\n{\n\tif (a)\n\t{\n\t\tfoo();\n\t}\n}\n`;
        assert.strictEqual(fmt(clean), clean);
    });

    test('continuation lines of a multi-line call are indented one extra level', () => {
        assert.strictEqual(fmt(`f()\n{\naddHUD(a,\nb,\nc);\n}`),
            `f()\n{\n\taddHUD(a,\n\t\tb,\n\t\tc);\n}\n`);
    });

    test('developer block /# #/ indents its contents', () => {
        assert.strictEqual(fmt(`f()\n{\n/#\nprintln("dbg");\n#/\nreal();\n}`),
            `f()\n{\n\t/#\n\t\tprintln("dbg");\n\t#/\n\treal();\n}\n`);
    });

    test('indents operator-continuation lines (expression split across lines)', () => {
        assert.strictEqual(fmt(`f()\n{\nx = a +\nb +\nc;\nnext();\n}`),
            `f()\n{\n\tx = a +\n\t\tb +\n\t\tc;\n\tnext();\n}\n`);
    });

    test('preserves tab-based column alignment', () => {
        assert.strictEqual(fmt(`f()\n{\na\t\t= 1;\nbb\t= 2;\n}`),
            `f()\n{\n\ta\t\t= 1;\n\tbb\t= 2;\n}\n`);
    });

    test('braceless body that is a multi-line statement indents its continuation', () => {
        assert.strictEqual(fmt(`f()\n{\nif (a)\nfoo(x,\ny);\nbar();\n}`),
            `f()\n{\n\tif (a)\n\t\tfoo(x,\n\t\t\ty);\n\tbar();\n}\n`);
    });
});


// =============================================================================
suite('GscFormatter: spacing', () => {
// =============================================================================

    const cases: Array<[string, string]> = [
        // input statement                 expected (one body line, 1 tab)
        ['x=a+b;',                          'x = a + b;'],
        ['if(a==1)b();',                    'if (a == 1) b();'],
        ['foo (a,b);',                      'foo(a, b);'],
        ['v=(1,2,3);',                      'v = (1, 2, 3);'],
        ['a . b = c [ i ];',               'a.b = c[i];'],
        ['z=a?b:c;',                        'z = a ? b : c;'],
        ['x=-5;',                           'x = -5;'],
        ['y=a - -b;',                       'y = a - -b;'],   // unary stays separate
        ['i++;',                            'i++;'],
        ['x=!flag;',                        'x = !flag;'],
        ['p=maps\\mp\\x::func();',          'p = maps\\mp\\x::func();'],
        ['level.cb=::local;',               'level.cb = ::local;'], // pointer literal
        ['self thread foo();',              'self thread foo();'],
        ['anim=%idle;',                     'anim = %idle;'],       // xanim ref, no space
        ['return(a,b);',                    'return (a, b);'],      // return is not a call
        ['self thread [[level.cb]](a,b);',  'self thread [[level.cb]](a, b);'], // func deref
        ['x=a % 2;',                        'x = a % 2;'],          // modulo keeps spaces
        ['x=--R;',                          'x = --R;'],            // prefix decrement
        ['i--;',                            'i--;'],                // postfix decrement
    ];

    for (const [input, expected] of cases) {
        test(`${input}  ->  ${expected}`, () => {
            assert.strictEqual(fmtStmt(input), `f()\n{\n\t${expected}\n}\n`);
        });
    }

    test('for-loop spacing', () => {
        assert.strictEqual(fmtStmt(`for(i=0;i<10;i++)\nx();`),
            `f()\n{\n\tfor (i = 0; i < 10; i++)\n\t\tx();\n}\n`);
    });

    test('preprocessor include keeps path intact', () => {
        assert.strictEqual(fmt(`#include maps\\mp\\_utility;\nmain()\n{\nx();\n}`),
            `#include maps\\mp\\_utility;\nmain()\n{\n\tx();\n}\n`);
    });
});


// =============================================================================
suite('GscFormatter: brace styles', () => {
// =============================================================================

    test('Allman: opening brace on its own line', () => {
        assert.strictEqual(fmt(`f() {\nif (a) {\nb();\n}\n}`, ConfigFormattingBraceStyle.Allman),
            `f()\n{\n\tif (a)\n\t{\n\t\tb();\n\t}\n}\n`);
    });

    test('K&R: opening brace and else on the same line', () => {
        assert.strictEqual(
            fmt(`f()\n{\nif (a)\n{\nb();\n}\nelse\n{\nc();\n}\n}`, ConfigFormattingBraceStyle.KnR),
            `f() {\n\tif (a) {\n\t\tb();\n\t} else {\n\t\tc();\n\t}\n}\n`);
    });

    test('Preserve: brace placement untouched (only indent/spacing fixed)', () => {
        assert.strictEqual(fmt(`f() {\nfoo();\n}`, ConfigFormattingBraceStyle.Preserve),
            `f() {\n\tfoo();\n}\n`);
    });

    test('do-while', () => {
        assert.strictEqual(fmt(`f()\n{\ndo\n{\nx();\n}\nwhile (a);\n}`, ConfigFormattingBraceStyle.Allman),
            `f()\n{\n\tdo\n\t{\n\t\tx();\n\t}\n\twhile (a);\n}\n`);
    });
});


// =============================================================================
suite('GscFormatter: comments, strings & alignment (never altered)', () => {
// =============================================================================

    test('stacked // comments are all preserved', () => {
        const out = fmt(`f()\n{\n// one\n// two\n// three\nfoo();\n}`);
        assert.strictEqual(out, `f()\n{\n\t// one\n\t// two\n\t// three\n\tfoo();\n}\n`);
    });

    test('localized string &"..." prefix preserved', () => {
        assert.strictEqual(fmtStmt(`precacheString(&"RE_X");`),
            `f()\n{\n\tprecacheString(&"RE_X");\n}\n`);
    });

    test('manual column alignment (2+ spaces) preserved', () => {
        assert.strictEqual(fmt(`f()\n{\nlevel.a   = 1;\nlevel.bb  = 2;\n}`),
            `f()\n{\n\tlevel.a   = 1;\n\tlevel.bb  = 2;\n}\n`);
    });

    test('block comment interior kept verbatim', () => {
        const src = `f()\n{\n/* line a\n   line b */\nfoo();\n}`;
        const out = fmt(src);
        assert.ok(out.includes('/* line a'), out);
        assert.ok(out.includes('   line b */'), out);
        assert.strictEqual(bare(out), bare(src));
    });
});


// =============================================================================
suite('GscFormatter: options & edge cases', () => {
// =============================================================================

    test('respects insertSpaces / tabSize', () => {
        const out = GscFormatter.formatContent(`f()\n{\nif (a)\nb();\n}`,
            { insertSpaces: true, tabSize: 2 }, ConfigFormattingBraceStyle.Allman);
        assert.strictEqual(out, `f()\n{\n  if (a)\n    b();\n}\n`);
    });

    test('preserves CRLF line endings', () => {
        assert.strictEqual(fmt(`f()\r\n{\r\nx();\r\n}`), `f()\r\n{\r\n\tx();\r\n}\r\n`);
    });

    test('removes blank lines at block edges (after { and before })', () => {
        assert.strictEqual(fmt(`f()\n{\n\n\n\nx();\n\n\n}`), `f()\n{\n\tx();\n}\n`);
    });

    test('collapses blank runs between statements to one', () => {
        assert.strictEqual(fmt(`f()\n{\nx();\n\n\n\ny();\n}`), `f()\n{\n\tx();\n\n\ty();\n}\n`);
    });

    test('preserves a blank line between functions', () => {
        assert.strictEqual(fmt(`f()\n{\nx();\n}\n\n\ng()\n{\ny();\n}`),
            `f()\n{\n\tx();\n}\n\ng()\n{\n\ty();\n}\n`);
    });

    test('empty input is unchanged', () => {
        assert.strictEqual(fmt(''), '');
    });

    test('empty block has no inner space', () => {
        assert.strictEqual(fmt(`g(){}`), `g() {}\n`);
    });
});


// =============================================================================
suite('GscFormatter: safety invariants', () => {
// =============================================================================

    const SAMPLE = [
        '#include maps\\mp\\_utility;',
        '',
        '// stacked comment 1',
        '// stacked comment 2',
        'main()',
        '{',
        '\tlevel.a   = 1;',
        '\tlevel.msg = &"LOC";  // trailing comment',
        '\tif(health>0){',
        '\tfoo(a,b);',
        '\tfor(i=0;i<10;i++)',
        '\tdoThing(i);',
        '\t}else{',
        '\tbar();',
        '\t}',
        '\tswitch(mode){',
        '\tcase 1:',
        '\tx();',
        '\tbreak;',
        '\tdefault:',
        '\ty();',
        '\t}',
        '\t/* block',
        '\t   comment */',
        '\tcb = ::callback;',
        '}',
    ].join('\n');

    const styles = [
        ConfigFormattingBraceStyle.Allman,
        ConfigFormattingBraceStyle.KnR,
        ConfigFormattingBraceStyle.Preserve,
    ];

    for (const style of styles) {
        test(`[${style}] only whitespace changes (no code/comment loss)`, () => {
            assert.strictEqual(bare(fmt(SAMPLE, style)), bare(SAMPLE));
        });

        test(`[${style}] token stream is unchanged (no merges/splits)`, () => {
            assert.strictEqual(tokenStream(fmt(SAMPLE, style)), tokenStream(SAMPLE));
        });

        test(`[${style}] is idempotent`, () => {
            const once = fmt(SAMPLE, style);
            assert.strictEqual(fmt(once, style), once);
        });
    }
});


// =============================================================================
suite('GscFormatter: range formatting (Format Selection)', () => {
// =============================================================================

    const DOC = `main()\n{\nif(x){\nfoo();\nbar();\n}\n}`;

    function range(src: string, a: number, b: number, style = ConfigFormattingBraceStyle.Allman): string {
        return GscFormatter.formatRange(src, a, b, TAB, style);
    }

    test('formats a selected block at the correct absolute indent', () => {
        assert.strictEqual(range(DOC, 2, 5),
            `\tif (x)\n\t{\n\t\tfoo();\n\t\tbar();\n\t}`);
    });

    test('seeds depth from preceding code (inner statements only)', () => {
        assert.strictEqual(range(DOC, 3, 4), `\t\tfoo();\n\t\tbar();`);
    });

    test('a selected case body is indented from the enclosing switch', () => {
        const sw = `f()\n{\nswitch (x)\n{\ncase 1:\na();\nbreak;\n}\n}`;
        assert.strictEqual(range(sw, 5, 6), `\t\t\ta();\n\t\t\tbreak;`);
    });

    test('brace style does not cross the selection boundary', () => {
        // The lone `{` (line 1) must not be pulled up onto foo() outside the range.
        assert.strictEqual(range(`foo()\n{\nx();\n}`, 1, 1, ConfigFormattingBraceStyle.KnR), `{`);
    });

    test('only whitespace changes within the selection', () => {
        assert.strictEqual(range(DOC, 2, 5).replace(/\s/g, ''),
            DOC.split('\n').slice(2, 6).join('\n').replace(/\s/g, ''));
    });
});


// =============================================================================
// Fixture-driven tests: real .gsc before/after files under
// src/test/fixtures/formatting/. Each `<name>.input.gsc` is formatted and
// compared against any sibling `<name>.<style>.gsc` (allman | knr | preserve).
// To add a case: drop in an input file and its expected output(s) — they are
// auto-discovered, no code change needed. You can also open the input files in
// VS Code and run Format Document to see the behaviour interactively.
// =============================================================================
suite('GscFormatter: .gsc fixtures', () => {

    // __dirname at runtime is out/test → fixtures live in the source tree.
    const fixturesDir = path.join(__dirname, '..', '..', 'src', 'test', 'fixtures', 'formatting');
    const styleBySuffix: Record<string, ConfigFormattingBraceStyle> = {
        allman: ConfigFormattingBraceStyle.Allman,
        knr: ConfigFormattingBraceStyle.KnR,
        preserve: ConfigFormattingBraceStyle.Preserve,
    };

    const inputs = fs.existsSync(fixturesDir)
        ? fs.readdirSync(fixturesDir).filter(f => f.endsWith('.input.gsc')).sort()
        : [];

    test('fixtures folder is present and non-empty', () => {
        assert.ok(inputs.length > 0, `No fixtures found in ${fixturesDir}`);
    });

    for (const inputFile of inputs) {
        const base = inputFile.replace(/\.input\.gsc$/, '');
        for (const [suffix, style] of Object.entries(styleBySuffix)) {
            const expectedFile = `${base}.${suffix}.gsc`;
            if (!fs.existsSync(path.join(fixturesDir, expectedFile))) {
                continue;
            }
            test(`${inputFile} → ${expectedFile}`, () => {
                const input = fs.readFileSync(path.join(fixturesDir, inputFile), 'utf8');
                const expected = fs.readFileSync(path.join(fixturesDir, expectedFile), 'utf8');
                assert.strictEqual(fmt(input, style), expected);
            });
        }
    }
});
