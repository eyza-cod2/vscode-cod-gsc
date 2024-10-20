#include functionreferencesfolder\functionreferencesfile;

main() {

    // Correct path
    FunctionReferencesFolder\FunctionReferencesFile::funcName();

    // Lowercase path
    functionreferencesfolder\FunctionReferencesFile::funcName();

    // Lowercase path + file
    functionreferencesfolder\functionreferencesfile::funcName();

    // Lowercase path + file + func name
    functionreferencesfolder\functionreferencesfile::funcname();

    // Hover sais: defined!
    includedFuncName();

    // Hover sais: defined!
    localFunc();
}

LOCALFUNC() {

}