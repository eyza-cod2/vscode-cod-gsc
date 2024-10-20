main() {
    unknown_path\script::func();

    // Whole path is ignored
    unknown_path_but_ignored\script::func();
    unknown_path_but_ignored\script2::func();
    unknown_path_but_ignored\script3::func();

    
    unknown_path\ignored_script::func();
}