main() {
    scripts\file_all::func_to_be_renamed();
}


f() {
    scripts\file_all::func_to_be_renamed();

    func = scripts\file_all::func_to_be_renamed;

    thread scripts\file_all::func_to_be_renamed();
    self thread scripts\file_all::func_to_be_renamed();
    self scripts\file_all::func_to_be_renamed();
}