main() {
    // Should be found, because its included by settings
    file1::func1();

    // Should be found, because its included by settings + game root folder is set to "subfolder"
    file2::func2();

    // Should be found, because its included by settings
    file3::func3();

    // This file is in all 3 workspace folders, it should use the 3. folder, because its defined as last folder in workspace
    fileReplaced::funcReplaced();

    // Local func, should be found
    dummy::main();
}