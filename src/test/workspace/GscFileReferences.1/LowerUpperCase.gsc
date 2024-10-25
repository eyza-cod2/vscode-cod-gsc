#include loweruppercasefolder\functionreferencesfile;

main() {

    // Correct path
    LowerUpperCaseFolder\FunctionReferencesFile::funcName();

    // Lowercase path
    loweruppercasefolder\FunctionReferencesFile::funcName();

    // Lowercase path + file
    loweruppercasefolder\functionreferencesfile::funcName();

    // Lowercase path + file + func name
    loweruppercasefolder\functionreferencesfile::funcname();

    // Hover sais: defined!
    includedFuncName();

    // Hover sais: defined!
    localFunc();
}

LOCALFUNC() {

}