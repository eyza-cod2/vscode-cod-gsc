main()
{
    // Libcod-modified stock function: bulletTrace accepts an extra optional 5th
    // parameter (content mask) under the libcod variant.
    //
    // This file verifies the exact-match-first lookup in CodFunctions.getByName:
    // the libcod signature (max 5 params) must win over the stock signature
    // (max 4 params) when this variant is active. Without that, the 5-arg call
    // below would error: "expect max 4 parameters, got 5".
    //
    // Expect: 0 diagnostics.

    trace1 = bulletTrace((0,0,0), (100,0,0), true, undefined);              // stock-compatible (4 args)
    trace2 = bulletTrace((0,0,0), (100,0,0), true, undefined, 41953329);    // libcod-only (5 args, content mask)
}
