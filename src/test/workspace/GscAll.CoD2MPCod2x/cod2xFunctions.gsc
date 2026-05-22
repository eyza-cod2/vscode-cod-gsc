// =============================================================================
// Every CoD2x function called with the correct callOn shape and the minimum
// required argument count. Source of truth: src/CodFunctionsDefinitions.ts.
//
// Expected diagnostics: 0.
//
// If this file produces any diagnostic, a cod2x entry has regressed (wrong
// callOn flag, wrong required-arg count, or the function got renamed). The
// failing diagnostic message will name the culprit.
// =============================================================================

main()
{
    // ---- Player methods (10 functions) ----
    self getIp();
    self getHWID();
    self getCDKeyHash();
    self getAuthorizationStatus();
    self getViewOrigin();
    self getStance();
    self isUsingTurret();
    self matchPlayerGetData(1);
    self matchPlayerSetData(1, 1);
    self matchPlayerIsAllowed();

    // ---- Level functions (12 functions) ----
    http_fetch(1, 1, 1, 1, 1, 1, 1);
    websocket_connect(1, 1, 1, 1, 1, 1);
    websocket_sendText(1, 1);
    websocket_close(1);
    matchUploadData();
    matchSetData(1, 1);
    matchGetData(1);
    matchRedownloadData();
    matchClearData();
    matchIsActivated();
    matchCancel();
    matchFinish();
}
