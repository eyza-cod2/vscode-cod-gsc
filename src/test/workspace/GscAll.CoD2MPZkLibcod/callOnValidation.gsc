main()
{
    // callOn validation on libcod functions.

    // earthquakeForPlayer is a player method (in scriptMethods[])
    self earthquakeForPlayer(0.3, 3, self.origin, 850);     // OK
    earthquakeForPlayer(0.3, 3, (0,0,0), 850);              // Function 'earthquakeForPlayer' must be called on object (callon object is missing)

    // setClipmask is an entity method (in scriptMethods[])
    ent = spawn("script_model", (0,0,0));
    ent setClipmask(1);                                      // OK
    setClipmask(1);                                          // Function 'setClipmask' must be called on object (callon object is missing)

    // getSystemTime is a plain function (in scriptFunctions[]) — has NO callOn
    t1 = getSystemTime();                                    // OK
    t2 = self getSystemTime();                               // ERROR: can not be called on object
}
