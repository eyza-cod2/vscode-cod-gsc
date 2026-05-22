main()
{
    // Stock CoD2 MP functions must remain available under the libcod variant
    // (verifies the inheritance in CodFunctions.matchesGame).
    // Expect: 0 diagnostics.

    ent = spawn("script_model", (0,0,0));
    self iPrintLn("hello");
    self iPrintLnBold("hello");
    array = getEntArray("classname", "name");
}
