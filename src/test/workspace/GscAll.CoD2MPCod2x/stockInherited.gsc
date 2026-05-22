// Stock CoD2 MP functions must remain resolvable under the CoD2x variant.
// Expected diagnostics: 0.

main()
{
    ent = spawn("script_model", (0, 0, 0));
    self iPrintLn("hello");
    self setModel("xmodel/player_usa_ranger_assault");
    wait 1;
}
