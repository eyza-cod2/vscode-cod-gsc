#include scripts\file; // Duplicate #include file path
#include scripts\file; // Duplicate #include file path
#include scripts\file2; // Function 'func2' is already defined in this file!
#include scripts\file3;
#include scripts\file4; // Function 'func3' is already defined in included file 'GscAll.CoD2MP/scripts/file3.gsc'!
#include scripts\file5; // Function 'func5' is already defined in this file!
#include scripts\file6; // Function 'func5' is already defined in this file!

main() {
    func1();
    func2();
}

func2() {

}

func5() {

}

duplicate() {}
duplicate() {}