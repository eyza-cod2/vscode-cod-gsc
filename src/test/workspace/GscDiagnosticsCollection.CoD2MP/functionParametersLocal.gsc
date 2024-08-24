main() {
        // Ok
        p0();
        p1(1);
        p2(1, 2);

        // Too many params
        p0(1);                  // Function 'p0' does not expect any parameters, got 1
        p0(1, 2);               // Function 'p0' does not expect any parameters, got 2
        p1(1, 2);               // Function 'p1' expect 1 parameter, got 2
        p2(1, 2, 3);            // Function 'p2' expect 2 parameters, got 3
        p2(1, 2, 3, 4, 5);      // Function 'p2' expect 2 parameters, got 5

        // Too few params (check is ignored because its correct syntax, variables will be undefined)
        p1();
        p2(1);
}

p0() {

}

p1(p1) {

}

p2(p1, p2) {

}