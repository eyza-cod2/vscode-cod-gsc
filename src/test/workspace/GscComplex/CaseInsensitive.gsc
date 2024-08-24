#include caseinsensitivefolder\caseinsensitivefile;

main() {

    // Correct path
    CaseInsensitiveFolder\CaseInsensitiveFile::funcName();

    // Lowercase path
    caseinsensitivefolder\CaseInsensitiveFile::funcName();

    // Lowercase path + file
    caseinsensitivefolder\caseinsensitivefile::funcName();

    // Lowercase path + file + func name
    caseinsensitivefolder\caseinsensitivefile::funcname();

    // Hover sais: defined!
    funcname();

    // Hover sais: defined!
    localFunc();
}

LOCALFUNC() {

}