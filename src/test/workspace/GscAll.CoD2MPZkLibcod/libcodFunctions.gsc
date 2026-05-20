// =============================================================================
// Every libcod function called with the correct callOn shape and the minimum
// required argument count. Source of truth is src/CodFunctionsDefinitions.ts.
//
// Expected diagnostics: 0.
//
// If this file produces any diagnostic, a libcod entry has regressed (wrong
// callOn flag, wrong required-arg count, or the function got renamed). The
// failing diagnostic message will name the culprit.
// =============================================================================

main()
{

    // ---- Animation (4 functions) ----
    self getTagAngles(1);
    self getTagOrigin(1);
    self playScriptAnimation(1, 1, 1);
    self setAnimation(1);

    // ---- Bots (13 functions) ----
    self fireWeapon(1);
    self meleeWeapon(1);
    self reloadWeapon(1);
    resetTestClientNaming();
    self setAim(1);
    self setBotStance(1);
    self setLean(1);
    setNextTestClientName(1);
    self setWalkDir(1);
    self setWalkValues(1, 1);
    self switchToWeaponId(1);
    self throwGrenade(1);
    self throwSmokeGrenade(1);

    // ---- Damage (1 functions) ----
    self finishPlayerDamage(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

    // ---- Debug (1 functions) ----
    getCallStack();

    // ---- Effects (4 functions) ----
    self playFxForPlayer(1, 1);
    self playFxOnTagForPlayer(1, 1, 1);
    self setCullFogForPlayer(1, 1, 1, 1, 1, 1);
    self setExpFogForPlayer(1, 1, 1, 1, 1);

    // ---- Entity (26 functions) ----
    self addEntityVelocity(1);
    self disablebounce();
    self disableGravity();
    self enableBounce(1, 1);
    self enableGravity(1, 1);
    self getClipmask();
    self getContents();
    self getEntityVelocity();
    self getItemQuantity();
    self getMaxEntityVelocity();
    self getVmax();
    self getVmin();
    self hasTag(1);
    self hideFromPlayer(1);
    self isGravityEnabled();
    self isLinkedTo();
    self notSolidForPlayer(1);
    self setAlive(1);
    self setBounds(1, 1, 1);
    self setClipmask(1);
    self setEntityVelocity(1);
    self setHintString(1);
    self setItemQuantity(1);
    self setLight(1, 1, 1, 1);
    self setMaxEntityVelocity(1);
    self solidForPlayer(1);

    // ---- Exec (4 functions) ----
    execute(1);
    execute_async_checkdone();
    execute_async_create(1);
    execute_async_create_nosave(1);

    // ---- HUD (2 functions) ----
    self getClientHudElemCount();
    obituary(1, 1, 1, 1);

    // ---- Level (8 functions) ----
    getEntityCount(1);
    getMovers();
    getNumberOfStaticModels();
    getSavePersist();
    getStaticModelName(1);
    getStaticModelOrigin(1);
    setNorthYaw(1);
    setSavePersist(1);

    // ---- Math (11 functions) ----
    abs(1);
    atan2(1, 1);
    ceil(1);
    float(1);
    floor(1);
    pow(1, 1);
    round(1);
    roundTo(1, 1);
    sqrt(1);
    sqrtInv(1);
    vectorScale(1, 1);

    // ---- Memory (5 functions) ----
    memory_free(1);
    memory_int_get(1);
    memory_int_set(1, 1);
    memory_malloc(1);
    memory_memset(1, 1, 1);

    // ---- MySQL (21 functions) ----
    mysql_affected_rows(1);
    mysql_async_create_query(1);
    mysql_async_create_query_nosave(1);
    mysql_async_getdone_list();
    mysql_async_getresult_and_free(1);
    mysql_async_initializer(1, 1, 1, 1, 1, 1);
    mysql_close(1);
    mysql_errno(1);
    mysql_error(1);
    mysql_fetch_field(1);
    mysql_fetch_row(1);
    mysql_field_seek(1, 1);
    mysql_free_result(1);
    mysql_init();
    mysql_num_fields(1);
    mysql_num_rows(1);
    mysql_query(1, 1);
    mysql_real_connect(1, 1, 1, 1, 1, 1);
    mysql_real_escape_string(1, 1);
    mysql_reuse_connection();
    mysql_store_result(1);

    // ---- Objective (5 functions) ----
    self objective_player_add(1, 1);
    self objective_player_delete(1);
    self objective_player_icon(1, 1);
    self objective_player_position(1, 1);
    self objective_player_state(1, 1);

    // ---- Player (122 functions) ----
    self addEntToSnapshots(1);
    self addVelocity(1);
    self aimButtonPressed();
    self backButtonPressed();
    self canMantle();
    self clearJumpState();
    self connectionlessPacketToClient(1);
    self connectionlessPacketToServer(1);
    self disableBulletDrop();
    self disableBulletImpacts();
    self disableEarthquakes();
    self disableItemPickup(1);
    self disableTalkerIcon(1);
    self earthquakeForPlayer(1, 1, 1, 1);
    self enableBulletDrop();
    self enableBulletImpacts();
    self enableEarthquakes();
    self enableItemPickup();
    self enableTalkerIcon(1);
    self executeClientCommand(1);
    self forceShot(1);
    self forwardButtonPressed();
    self fragButtonPressed();
    self getAddressType();
    self getBulletMask();
    self getClientConnectState();
    self getCollisionTeam();
    self getCookTime();
    self getCurrentWeaponAmmo();
    self getCurrentWeaponClipAmmo();
    self getCurrentWeaponSlot();
    self getEnterTime();
    self getFps();
    self getGravity();
    self getGroundEntity();
    self getInactivityTime();
    self getIP();
    self getJumpSlowdownTimer();
    self getLastConnectTime();
    self getLastGamestateSize();
    self getLastMsg();
    self getNumberOfEntsInSnapshot();
    self getPing();
    self getPlayerstateFlags();
    self getProtocol();
    self getProtocolString();
    self getServerCommandQueueSize();
    self getSpectatorClient();
    self getSpeed();
    self getStance();
    self getUserinfo(1);
    self getVelocity();
    self getViewOrigin();
    self getWeaponAnimation();
    self holdBreathButtonPressed();
    self isAllowingSpectators();
    self isBot();
    self isChatting();
    self isFiring();
    self isHiddenFromScoreboard();
    self isHiddenFromServerStatus();
    self isHoldingWeaponDown();
    self isMantling();
    self isMeleeing();
    self isOnLadder();
    self isRechambering(1);
    self isReloading();
    self isShellShocked();
    self isThrowingGrenade();
    self isUseTouching();
    self isUsingBinoculars();
    self jumpButtonPressed();
    self leanLeftButtonPressed();
    self leanRightButtonPressed();
    self leftButtonPressed();
    self lookAtKiller(1, 1);
    self noclip(1);
    self overrideContents(1);
    self processClientCommand();
    self processClientUserinfoChange();
    self processSuicide();
    self reloadButtonPressed();
    self removeEntFromSnapshots(1);
    self renameClient(1);
    self resetNextReliableTime();
    self rightButtonPressed();
    self setActivateOnUseButtonRelease(1);
    self setAllowSpectators(1);
    self setBulletDrag(1);
    self setBulletMask(1);
    self setBulletModel(1);
    self setBulletVelocity(1);
    self setCollisionTeam(1);
    self setConfigStringForPlayer(1, 1);
    self setCurrentWeaponAmmo(1);
    self setCurrentWeaponClipAmmo(1);
    self setFireRangeScale(1);
    self setFireThroughWalls(1);
    self setGravity(1);
    self setGuid(1);
    self setHiddenFromScoreboard(1);
    self setHiddenFromServerStatus(1);
    self setHoldingWeaponDown(1);
    self setJumpHeight(1);
    self setJumpSlowdownEnable(1);
    self setMeleeHeightScale(1);
    self setMeleeRangeScale(1);
    self setMeleeWidthScale(1);
    self setNorthYawForPlayer(1);
    self setOriginAndAngles(1, 1);
    self setPing(1);
    self setProneStepSize(1);
    self setRechambering(1);
    self setSpeed(1);
    self setStance(1);
    self setStepSize(1);
    self setTurretSpreadScale(1);
    self setUserinfo(1, 1);
    self setVelocity(1);
    self setWeaponSpreadScale(1);
    self smokeButtonPressed();
    self useEntity(1);

    // ---- Sound (16 functions) ----
    self clientHasClientMuted(1);
    self disableSilent();
    self enableSilent();
    self getRemainingSoundFileDuration();
    getSoundAliasesFromFile(1);
    getSoundDuration(1);
    getSoundFileDuration(1);
    getSoundInfo(1);
    self isPlayingSoundFile();
    loadSoundFile(1, 1);
    loadSpeexFile(1, 1);
    self muteClient(1);
    self playSoundFile(1);
    saveSpeexFile(1, 1);
    self stopSoundFile();
    self unmuteClient(1);

    // ---- System (37 functions) ----
    chr(1);
    error(1);
    executeCommand(1);
    file_exists(1);
    file_link(1, 1);
    file_unlink(1);
    findConfigStringIndex(1, 1, 1);
    findConfigStringIndexOriginal(1, 1, 1, 1);
    fromHex(1);
    getAscii(1);
    getConfigString(1);
    getCvarFlags(1);
    getLastTestClientNumber();
    getLocalTime();
    getMicroseconds();
    getMilliseconds();
    getServerStartTime(1);
    getSurfaceName(1);
    getSystemTime();
    getType(1);
    kick(1);
    loadDir(1, 1);
    logPrintConsole(1);
    makeClientLocalizedString(1);
    makeLocalizedString(1);
    makeString(1);
    ord(1);
    printf(1, 1);
    processRemoteCommand();
    sendCommandToClient(1, 1);
    sendPacket(1, 1);
    setConfigString(1, 1);
    setConsolePrefix(1);
    sprintf(1, 1);
    system(1);
    toHex(1);
    toUpper(1);

    // ---- Trace (3 functions) ----
    bulletTrace(1, 1, 1, 1);
    bulletTracePassed(1, 1, 1, 1);
    sightTracePassed(1, 1, 1, 1);

    // ---- Turret (6 functions) ----
    self canUseTurret(1);
    self getTurretOwner();
    self isTurret();
    self isUsingTurret();
    self stopUseTurret();
    self useTurret(1);

    // ---- Weapons (37 functions) ----
    self addGrenadeFuseTime(1);
    self getGrenadeFuseTime();
    getLoadedWeapons();
    getWeaponClipSize(1);
    getWeaponCookable(1);
    getWeaponDamage(1);
    getWeaponDisplayName(1);
    getWeaponFireTime(1);
    getWeaponFuseTime(1);
    getWeaponHitLocMultiplier(1, 1);
    self getWeaponItemAmmo();
    self getWeaponItemClipAmmo();
    getWeaponMaxAmmo(1);
    getWeaponMeleeDamage(1);
    getWeaponMeleeTime(1);
    getWeaponRaiseTime(1);
    getWeaponReloadEmptyTime(1);
    getWeaponReloadTime(1);
    ignoreWeapon(1);
    isSemiAutoWeapon(1);
    resetIgnoredWeapons();
    setDefaultweapon(1);
    setWeaponClipSize(1, 1);
    setWeaponCookable(1, 1);
    setWeaponDamage(1, 1);
    setWeaponFireTime(1, 1);
    setWeaponFuseTime(1, 1);
    setWeaponHitLocMultiplier(1, 1, 1);
    self setWeaponItemAmmo(1);
    self setWeaponItemClipAmmo(1);
    setWeaponMaxAmmo(1, 1);
    setWeaponMeleeDamage(1, 1);
    setWeaponMeleeTime(1, 1);
    setWeaponRaiseTime(1, 1);
    setWeaponReloadEmptyTime(1, 1);
    setWeaponReloadTime(1, 1);
    self spawnGrenade(1, 1);
}
