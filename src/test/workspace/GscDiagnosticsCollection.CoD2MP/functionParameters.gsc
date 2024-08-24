main()
{
    spawn();                            // Function 'spawn' expect min 2 parameters, got 0
    self spawn();                       // Function 'spawn' expect min 2 parameters, got 0

    thread spawn();                     // Function 'spawn' expect min 2 parameters, got 0
    self thread spawn();                // Function 'spawn' expect min 2 parameters, got 0


    self aCos();                        // Error: Function 'aCos' can not be called on object (does not support callon object)

    getAmmoCount("aaa");                // Error: Function 'getAmmoCount' must be called on object (callon object is missing)


    spawn();                            // Function 'spawn' expect min 2 parameters, got 0
    spawn(0);                           // Function 'spawn' expect min 2 parameters, got 1
    spawn(0, 1);
    spawn(0, 1, 2);
    spawn(0, 1, 2, 3);
    spawn(0, 1, 2, 3, 4);
    spawn(0, 1, 2, 3, 4, 5);            // Function 'spawn' expect max 5 parameters, got 6
    spawn(0, 1, 2, 3, 4, 5, 6);         // Function 'spawn' expect max 5 parameters, got 7
    spawn(0, 1, 2, 3, 4, 5, 6, 7);      // Function 'spawn' expect max 5 parameters, got 8
}