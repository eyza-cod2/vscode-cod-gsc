func_to_be_renamed() {

}

f() {
    func_to_be_renamed();

    func = ::func_to_be_renamed;

    thread func_to_be_renamed();
    self thread func_to_be_renamed();
    self func_to_be_renamed();
}