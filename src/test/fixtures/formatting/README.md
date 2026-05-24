# GSC formatter fixtures

A single comprehensive **before / after** example for the GSC document formatter
(`GscFormatter`), rendered in all three brace styles:

| File | What it is |
| --- | --- |
| `showcase.input.gsc` | The **before** — one (intentionally messy) file that exercises nearly every formatter behaviour. Section comments inside it explain what each part demonstrates. |
| `showcase.allman.gsc` | The **after** with `gsc.formatting.braceStyle = "Allman"` (braces on their own line). |
| `showcase.knr.gsc` | The **after** with `"K&R"` (braces on the same line). |
| `showcase.preserve.gsc` | The **after** with `"Preserve"` (your brace placement kept; only indentation + spacing fixed). |

## How to use it

- **Read it:** open `showcase.input.gsc` next to the three outputs and compare. The
  input deliberately mixes brace styles (some K&R, some Allman) and messy spacing so
  the differences between the three outputs are obvious.
- **Test it live:** open `showcase.input.gsc` in VS Code, set `gsc.formatting.braceStyle`,
  and run **Format Document** (`Shift+Alt+F`) — the result matches the corresponding
  output file.
- **Automated:** `src/test/GscFormatter.test.ts` auto-discovers any
  `*.input.gsc` here and asserts that formatting it (in each style with a matching
  `*.<style>.gsc`) reproduces the expected output exactly. Add another `name.input.gsc`
  + `name.<style>.gsc` pair and it's picked up with no code change.

## What the showcase covers

Indentation & brace-style conversion · spacing normalisation (operators, keywords,
calls, commas) · braceless `if`/`for`/`while` bodies · `else` / `else if` · `switch`
with nested, stacked and braceless cases · preserved column alignment · multi-line
call / array / operator continuation · function-pointer literals (`::f`, `= ::f`,
`::f` as an argument) · localized (`&"..."`) and cvar (`#"..."`) strings · vectors ·
`%`xanim refs · modulo & `++`/`--` · developer blocks (`/# ... #/`) · and full
preservation of stacked `//` comments, commented-out code and block comments.

The formatter only ever changes whitespace it doesnt edit code, comments or string
contents.
