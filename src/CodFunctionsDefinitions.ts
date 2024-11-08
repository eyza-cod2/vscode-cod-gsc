import { CodFunction } from "./CodFunction";

export let defs: Array<CodFunction> = new Array<CodFunction>();

defs.push(new CodFunction({
    name: "aimAtPos",
    desc: "Sets the actor to aim at the given point. Returns the blend time of the aim",
    example: "aimTime = self AimAtPos (targetPoint);",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "aimAtPoint",
            desc: "The point to aim at.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowedStances",
    desc: "Sets the list of the actor's allowed stances.",
    example: "self AllowedStances( \"crouch\", \"prone\" );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "stance",
            desc: "A stance, can be 'prone', 'crouch', 'stand'. Any number of stances may be added.",
            type: "string",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "animCustom",
    desc: "Sets the anim script for this actor.",
    example: "self AnimCustom( animscripts\\scripted\\stalingrad_cover_crouch::main );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animscript",
            desc: "The script name to run.",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "animMode",
    desc: "Set the way that animation deltas are interpreted by the game engine",
    example: "self AnimMode( \"gravity\" );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "mode",
            desc: "which animmode to use.  Must be 'gravity', 'nogravity', 'angle_deltas', 'zonly_physics', 'nophysics', 'none'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "beginPrediction",
    desc: "Begin actor physics prediction.",
    example: "self BeginPrediction();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "canAttackEnemyNode",
    desc: "Checks if this actor can attack its enemies node.",
    example: "self CanAttackEnemyNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "canSee",
    desc: "Check to see if the actor can see the given entity.",
    example: "if( self CanSee( player ) )",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "target",
            desc: "The entity to check.",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "canShoot",
    desc: "Check to see if the actor can shoot the given position.",
    example: "canShoot = self CanShoot( eye, offset );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "shootAtPosition",
            desc: "The position to shoot at.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "offsetFromGun",
            desc: "The offset from the gun muzzle from which to calculate collision.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "canUseTurret",
    desc: "Check whether this actor can use this turret",
    example: "self CanUseTurret();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "turret",
            desc: "A turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "checkGrenadeThrow",
    desc: "Checks whether the actor can throw a grenade at his target. If he can't then result will be undefined, otherwise the result is the resultant velocity vector",
    example: "throwvel = self CheckGrenadeThrow( armOffset, \"min energy\", 0 );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "handOffset",
            desc: "the estimated offset of the hand for the throw",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "method",
            desc: "The grenade toss method. Can be 'min energy', 'min time', and 'max tune'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "checkGrenadeThrowPos",
    desc: "Checks whether the actor can throw a grenade at a given position. If he can't then result will be undefined, otherwise the result is the resultant velocity vector",
    example: "throwvel = self CheckGrenadeThrowPos( armOffset, \"min energy\", targetPos );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "handOffset",
            desc: "the estimated offset of the hand for the throw",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "method",
            desc: "The grenade toss method. Can be 'min energy', 'min time', and 'max tune'",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "targetpos",
            desc: "The target position, should be at ground level of potential target",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "checkProne",
    desc: "Returns true when a character can go prone at the specified position. Specifically setup for use by AI characters.",
    example: "canFitProne = self CheckProne( origin, yaw, alreadyProne );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "position",
            desc: "The position of the prone character.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "yaw",
            desc: "The world yaw in degrees.",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "isProne",
            desc: "Flag if the character is already prone.",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearEnemy",
    desc: "Clear the actor's current enemy entity.",
    example: "self ClearEnemy()",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearPotentialThreat",
    desc: "Clear the potential threat direction.  See SetPotentialThreat for more info on potential threats",
    example: "self ClearPotentialThreat();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "connectPaths",
    desc: "Connects the paths that intersect with the entity. If the entity is a script_brushmodel then it must have DYNAMICPATH set to connect paths.",
    example: "vehicle ConnectPaths();",
    callOn: "<entity> A dynamic blocking entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "A dynamic blocking entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disconnectPaths",
    desc: "Disconnects the paths that intersect with the entity. If the entity is a script_brushmodel then it must have DYNAMICPATH set to disconnect paths.",
    example: "level.ArmoredCar DisconnectPaths();",
    callOn: "<entity> A dynamic blocking entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "A dynamic blocking entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "dropWeapon",
    desc: "Drop the actor's weapon",
    example: "self DropWeapon( self.weapon, self.anim_gunHand, throwVel );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The name of the weapon.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hand",
            desc: "The weapon hand. Can be either \"left\" or \"right\".",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "throwSpeed",
            desc: "The speed that the weapon is thrown at.",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "dumpHistory",
    desc: "Dumps the actor's history to a bug report.",
    example: "self DumpHistory();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "endPrediction",
    desc: "End actor physics prediction.",
    example: "self EndPrediction();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enterProne",
    desc: "Set the actor to enter the prone position.",
    example: "self EnterProne(1.0);",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "interpolationTime",
            desc: "Time to go prone in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "exitProne",
    desc: "Set the actor to exit the prone position.",
    example: "self ExitProne( 1.0 );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "interpolationTime",
            desc: "Time to exit prone in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "findBestCoverNode",
    desc: "Find the best cover node for a given NPC given his state.",
    example: "self FindBestCoverNode();",
    callOn: "<actor>",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "nodemeaning",
            desc: "whether to ignore or prefer the next parameter. 'ignore' or 'prefer' are valid values",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "node",
            desc: "a node to consider based on previous parameter",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "findCoverNode",
    desc: "Finds a valid cover node for the character.",
    example: "guy FindCoverNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "findReacquireDirectPath",
    desc: "Finds a path directly to the enemy. Call ReacquireMove to use the path.",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "findReacquireNode",
    desc: "Finds a reacquire node when exposed.",
    example: "guy FindReacquireNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "findReacquireProximatePath",
    desc: "Finds a path to a point that can see the enemy without leaving goal. Call ReacquireMove to use the path.",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "flagEnemyUnattackable",
    desc: "Set this actor not to attack its current enemy.",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCoverNode",
    desc: "Gets this actor's cover node.",
    example: "guy GetCoverNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getGoalVolume",
    desc: "Get this actor's goal volume.",
    example: "goalVolume = self GetGoalVolume();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getGroundEntType",
    desc: "Get the entity type of the 'ground' that the actor is on.",
    example: "self GetGroundEntType();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getHitEntType",
    desc: "Get the type of entity that the actor has hit. Can be 'hit', 'obstacle' or 'world'.",
    example: "self GetHitEntType();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getHitYaw",
    desc: "Get the direction in degrees that the player has hit an obstacle at. Returns an error if nothing was hit.",
    example: "self GetHitYaw();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getMotionAngle",
    desc: "Get the motion angle in degrees for this actor.",
    example: "self GetMotionAngle();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNegotiationEndNode",
    desc: "Gets the end negotiation node for this actor",
    example: "self GetNegotiationEndNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNegotiationStartNode",
    desc: "Gets the next negotiation node for this actor",
    example: "self GetNegotiationStartNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getReacquireNode",
    desc: "Gets the reacquire node of this actor.",
    example: "guy GetReacquireNode();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTurret",
    desc: "Get the turret that this actor is using.",
    example: "turret = self GetTurret();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isDeflected",
    desc: "Check if the actor has been deflected.",
    example: "self IsDeflected();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isInGoal",
    desc: "Determine whether a given point is in the actor's current goal area",
    example: "if ( ai IsInGoal( node ) )",
    callOn: "<actor> The actor whose goal you would like to check.",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "The actor whose goal you would like to check.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "point",
            desc: "which node to check.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isNodeOccupied",
    desc: "See if anyone has claimed a particular node.",
    example: "if ( IsNodeOccupied( node ) )",
    callOn: "",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "node",
            desc: "which node to check.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isPathDirect",
    desc: "Check whether the actor's current path is direct",
    example: "self IsPathDirect();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isStanceAllowed",
    desc: "Checks whether this actor can go to the given stance.",
    example: "if ( self IsStanceAllowed( \"stand\" ) )...",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "stance",
            desc: "A stance, can be 'prone', 'crouch', 'stand'.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isSuppressed",
    desc: "Checks whether this actor is in a suppressed state ( under fire ).",
    example: "while ( self IsSuppressed() )...",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isTurretActive",
    desc: "Determine whether a given turret is being used by anybody including players and NPCs.",
    example: "if ( IsTurretActive( turret ) )",
    callOn: "",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "which turret to check.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "lerpPosition",
    desc: "Interpolate an actor's position, and angles.",
    example: "self LerpPosition( entry['origin'], entry['angles'] );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "origin",
            desc: "the position to interpolate to.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angles",
            desc: "the angles to interpolate to.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeFakeAI",
    desc: "Create a drone from script model, that can be moved around with simple commands",
    example: "guy MakeFakeAI();",
    callOn: "<entity> (entity) A script_model entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "A script_model entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "mayMoveToPoint",
    desc: "Check whether the actor can move to a given point.",
    example: "if ( !self MayMoveToPoint( endPoint ) )...",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "position",
            desc: "The position that the actor may be able to move to.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "melee",
    desc: "Makes this actor melee attack. Returns the entity hit, if any.",
    example: "guy Melee();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "nearNode",
    desc: "Determine whether this actor is near to a given path node.",
    example: "if ( ai NearNode( node ) )...",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "node",
            desc: "The path node to check.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "orientMode",
    desc: "Set the orient mode of this actor.",
    example: "randAlly OrientMode( \"face direction\", level.player.origin-randAlly.origin );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "orientMode",
            desc: "OrientMode must be 'face angle', 'face current', 'face direction', 'face enemy', 'face enemy or motion', 'face goal', 'face motion', 'face point', or 'face default'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "data",
            desc: "The yaw angle to face if orient mode is 'face angle'. The direction vector to face if orient mode is 'face direction'. The point to face if orient mode is 'face point'.",
            type: "float | vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "pickUpGrenade",
    desc: "Pick up a grenade",
    example: "self PickUpGrenade();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "predictAnim",
    desc: "Enable or disable animation prediction",
    example: "bPredictMore = self PredictAnim(true);",
    callOn: "An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enable",
            desc: "Enable or disable.",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "predictOriginAndAngles",
    desc: "Use physics to predict the actor's origin and angles",
    example: "self PredictOriginAndAngles();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "pushPlayer",
    desc: "Set whether this character can push the player",
    example: "level.elder PushPlayer( true );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "canPushPlayer",
            desc: "True if this character can push the player.",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "reacquireMove",
    desc: "Start the reaquire move",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "reacquireStep",
    desc: "Do side step move to safe place left or right while facing enemy.",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "dist",
            desc: "amount to side step left or right",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAimAnims",
    desc: "Sets the aim animations for this actor",
    example: "self SetAimAnims( anims[\"aim_down\"], anims[\"aim_straight\"], anims[\"aim_up\"], anims[\"shoot_down\"], anims[\"shoot_straight\"], anims[\"shoot_up\"] );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "aimLow",
            desc: "The animation to play for the actor aiming low",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "aimLevel",
            desc: "The animation to play for the actor aiming straight",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "aimHigh",
            desc: "The animation to play for the actor aiming high",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "shootLow",
            desc: "The animation to play for the actor shooting low",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "shootLevel",
            desc: "The animation to play for the actor shooting straight",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "shootHigh",
            desc: "The animation to play for the actor shooting high",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFriendlyChain",
    desc: "Sets the friendly chain for the player.",
    example: "level.player setfriendlychain (getnode (\"trench_chain\",\"targetname\"));",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "node",
            desc: "a node on a friendly chain",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGoalEntity",
    desc: "Set this actor's goal entity.",
    example: "spawned SetGoalEntity( level.player );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "goalEntity",
            desc: "The goal entity.",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGoalNode",
    desc: "Set this actor's goal node.",
    example: "self SetGoalNode( node );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "goalNode",
            desc: "The goal node.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGoalPos",
    desc: "Set this actor's goal position.",
    example: "self SetGoalPos( thisMg42.org );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "position",
            desc: "The goal position.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGoalVolume",
    desc: "Set this actor's goal volume.  This cannot be set if a goal entity is set.",
    example: "self SetGoalVolume( goal );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "volumeEntity",
            desc: "The goal volume entity.",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLookAt",
    desc: "Set the actor to exit the prone position.",
    example: "self SetLookAt( lookTargetPos, self.anim_lookTargetSpeed );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "position",
            desc: "The point for this actor to look at",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "turnAcceleration",
            desc: "The acceleration to turn the actor's head at.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLookAtAnimNodes",
    desc: "Set the animation nodes for this actor for looking at things to the left and right.",
    example: "self SetLookAtAnimNodes( %look_straight, %look_left, %look_right );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "lookStraightAnimation",
            desc: "The look straight animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "lookLeftAnimation",
            desc: "The look left animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "lookRightAnimation",
            desc: "The look rigth animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLookAtYawLimits",
    desc: "Set the limits of what this actor can look at.",
    example: "self SetLookAtYawLimits( lookAnimYawMax, lookYawLimit, blendtime );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "lookAnimYawMax",
            desc: "The maximim yaw for the animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "lookYawLimit",
            desc: "The maximim limit for the actual look at.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "blendtime",
            desc: "The blend time for looking in seconds.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setNodePriority",
    desc: "Enable or disable the priority for this node.",
    example: "",
    callOn: "",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "node",
            desc: "A priority allowed node.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "enable",
            desc: "True if this node is enabled.",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setPotentialThreat",
    desc: "Set the potential threat direction.  Potential threat direction is used in evaluating cover nodes. \nIn non-combat situations.  This is mostly useful for friendlies.",
    example: "self SetPotentialThreat( 90 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "dir",
            desc: "direction of the threat.  This is the angle from which the NPC should expect danger",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setProneAnimNodes",
    desc: "Set the prone animation nodes, as well as highest and lowest possible aim angles for this character.",
    example: "self SetProneAnimNodes( -45, 45, %prone_legsdown, %prone_legsstraight, %prone_legsup );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "downAngle",
            desc: "The lowest allowable pitch in degrees for aiming. Must be less than 0",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "upAngle",
            desc: "The highest allowable pitch in degrees for aiming. Must be greater than 0",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "lowProneAnimation",
            desc: "The low prone animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "straightProneAnimation",
            desc: "The straight prone animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "highProneAnimation",
            desc: "The high prone animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretAnim",
    desc: "Set the turret animation for this actor.",
    example: "self SetTurretAnim( %prone30calgunner_fire );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "turretAnimation",
            desc: "The turret animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretNode",
    desc: "Set this turretnode to use this turret.",
    example: "SetTurretNode( node, mg42 );",
    callOn: "",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "node",
            desc: "The turret node to connect to the turret",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "turret",
            desc: "The turret to connect to the node",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "shoot",
    desc: "Makes this actor shoot.",
    example: "guy shoot();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "accuracyModifier",
            desc: "Accuracy modifier",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "shootOverrideVector",
            desc: "The shoot vector",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "startScriptedAnim",
    desc: "Runs an animscript on an actor.",
    example: "driver startscriptedanim( \"germantruck_driver_closedoor\", org , angles, driver.closedooranim );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notify",
            desc: "The notify to send",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The starting position of the anim script",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angles",
            desc: "The starting angle of the anim script",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "mode",
            desc: "Valid modes are \"normal\" and \"deathplant\"",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "root",
            desc: "The root animation",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopLookAt",
    desc: "Make this actor stop looking at its current look at target.",
    example: "self StopLookAt( 1000 );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "turnAcceleration",
            desc: "The turn acceleration",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopUseTurret",
    desc: "Stop using the actor's current turret",
    example: "self StopUseTurret();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "teleport",
    desc: "Teleport the actor to a new position with the given origin and angles.",
    example: "self Teleport( org, angles );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "position",
            desc: "The actor's new position.",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angles",
            desc: "The actor's new angles.",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "throwGrenade",
    desc: "Throw a grenade.  CheckGrenadeThrowPos() or CheckGrenadeThrow() must be called first.",
    example: "self ThrowGrenade();",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "trackScriptState",
    desc: "Change the script state of the actor, with a reason for the state change. The reason will be added to the history of the AI",
    example: "self TrackScriptState( entryState , \"CoverRightStandStill returned\" );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "newStateName",
            desc: "The new state name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "reason",
            desc: "The reason for the transition",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "traverseMode",
    desc: "Set the traverse mode of this actor.",
    example: "self TraverseMode( \"nogravity\" );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "traverseMode",
            desc: "Possible traverse modes are 'gravity', 'nogravity', or 'noclip'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "trimPathtoAttack",
    desc: "Trims the path to attack.",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "unSetTurretNode",
    desc: "Unset the turret from this node.",
    example: "UnSetTurretNode( node, mg42 );",
    callOn: "",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "node",
            desc: "The turret node to disconnect",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "updateProne",
    desc: "Set the actor to exit the prone position.",
    example: "self UpdateProne( %prone_shootfeet_straight45up, %prone_shootfeet_straight45down, 1, 0.05, 1 );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animationA",
            desc: "The first animation to lerp between.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animationB",
            desc: "The second animation to lerp between.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "goalWeight",
            desc: "The blend amount between the two animations.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "goalTime",
            desc: "The time to lerp to the new blend.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "The animation play rate.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "useCoverNode",
    desc: "Tells this actor to use the given cover node. This is invalid if the actor's keepclaimednode flag is set. Returns true or false depending on whether the actor can claim the node.",
    example: "guy UseCoverNode( covernode );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "pathNode",
            desc: "The path node to use as cover",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "useReacquireNode",
    desc: "Use the given reacquire node.",
    example: "",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "node",
            desc: "The path node to use.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "useTurret",
    desc: "Use this turret",
    example: "self UseTurret( mg42Ent );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "turret",
            desc: "A turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "withinApproxPathDist",
    desc: "Check whether the actor is within an approximate distance to his path",
    example: "self WithinApproxPathDist( distance );",
    callOn: "<actor> An actor",
    returnType: "",
    module: "AI",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "distance",
            desc: "The distance to test against.",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "animHasNotetrack",
    desc: "queries the given animation for a note track",
    example: "if ( IsDefined( facialanim ) && AnimHasNotetrack( facialanim, \"dialogue\" ) ) ...",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "animation",
            desc: "an animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "noteTrack",
            desc: "a constant string with the name of the note track",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "animScripted",
    desc: "Runs an animscript on an entity.",
    example: "driver AnimScripted( \"germantruck_driver_closedoor\", org , angles, driver.closedooranim );",
    callOn: "<entity> The entity to run the animscript on",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "The entity to run the animscript on",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notify",
            desc: "The notify to send",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The starting position of the anim script",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angles",
            desc: "The starting angle of the anim script",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "mode",
            desc: "Valid modes are \"normal\" and \"deathplant\"",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "root",
            desc: "The root animation",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearAnim",
    desc: "Sets an animation's goal weight (and the goal weights of all of its descendents) to zero over the specified time.",
    example: "self ClearAnim( %root, 0);",
    callOn: "<entity> The entity to clear the animation on.",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "The entity to clear the animation on.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation or animtree node to clear",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The blending time for the clear",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "dumpAnims",
    desc: "Writes the anim tree out to the console",
    example: "self DumpAnims();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAngleDelta",
    desc: "Returns the rotation difference in the given animation",
    example: "",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "anim",
            desc: "An animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "startTime",
            desc: "The start time as a fraction of the total animation time, from 0 to 1",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "endTime",
            desc: "The end time as a fraction of the total animation time, from 0 to 1",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAnimLength",
    desc: "Gets the length of an animation",
    example: "cycleTime = GetAnimLength( climbAnim );",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "animation",
            desc: "a primitive animation: calling this function on a non-primitive animation will fail",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAnimTime",
    desc: "Get the animation time for the given animation.",
    example: "if ( (self GetAnimTime( %walk_and_run_loops ) ) < 0.5 )",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "animation to manipulate",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCycleOriginOffset",
    desc: "For the given animation cycle and angle set, calculate the final offset of the animation",
    example: "",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "angles",
            desc: "A set of world angles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation to calculate the offset of.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getMoveDelta",
    desc: "Returns the movement vector difference in the given animation",
    example: "",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "anim",
            desc: "An animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "startTime",
            desc: "The start time as a fraction of the total animation time, from 0 to 1",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "endTime",
            desc: "The end time as a fraction of the total animation time, from 0 to 1",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNumParts",
    desc: "Gets the number of bones in the xmodel.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "xmodelName",
            desc: "The model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getPartName",
    desc: "Gets the name of a part of a model.",
    example: "partName = GetPartName( self.hatModel, 0 )",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "xmodelName",
            desc: "The name of the model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "index",
            desc: "The part index. Must be less than the number of bones in the model.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getStartAngles",
    desc: "Get the starting angles for an animation, in world coordinates, given its current position, and angles",
    example: "org1 = GetStartAngles( climborg, climbang, buddyanim1 );",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "origin",
            desc: "The current origin of the animation in world coordinates",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angle",
            desc: "The current angle set of the animation in world coordinates",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The currently running animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getStartOrigin",
    desc: "Get the starting origin for an animation, in world coordinates, given its current position, and angles",
    example: "org1 = GetStartOrigin( climborg, climbang, buddyanim1 );",
    callOn: "",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "origin",
            desc: "The current origin of the animation in world coordinates",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angle",
            desc: "The current angle set of the animation in world coordinates",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The currently running animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTagAngles",
    desc: "Gets the angles of a particular tag on this model",
    example: "leftorg = self GetTagAngles( \"tag_wheel_back_left\" );",
    callOn: "<entity> An entity with a model",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity with a model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "tagname",
            desc: "The name of the tag",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTagOrigin",
    desc: "Gets the origin of a particular tag on this model",
    example: "leftorg = self GetTagOrigin( \"tag_wheel_back_left\" );",
    callOn: "<entity> An entity with a model",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity with a model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "tagname",
            desc: "The name of the tag",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnim",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"All\": Works only with \"Knob.\" Not available with both \"Limited\" and \"Flagged\" at the same time. These functions take an additional argument <root> (after the animation argument). <root> must be an ancestor of <animation> in the tree. This has the additional effect that \"Knob\" has on all nodes from the animation up to (but not including) <root>, so that this animation is the only one in its area of the tree which is playing.\n\"Limited\": These functions do not change the goal weight of the ancestors of <animation> (If \"KnobAll\" is used, this means the ancestors of <root>). This means that the animation might not be visible if any of its ancestors currently have a weight of 0. However, when its ancestors' weight is changed, it will become visible.\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetAnim( %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnimKnob",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)",
    example: "self SetAnimKnob( %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnimKnobAll",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"All\": Works only with \"Knob.\" Not available with both \"Limited\" and \"Flagged\" at the same time. These functions take an additional argument <root> (after the animation argument). <root> must be an ancestor of <animation> in the tree. This has the additional effect that \"Knob\" has on all nodes from the animation up to (but not including) <root>, so that this animation is the only one in its area of the tree which is playing.",
    example: "self SetAnimKnobAll( %precombatrun1, %body, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "root",
            desc: "An ancestor of the animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnimKnobAllRestart",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"All\": Works only with \"Knob.\" Not available with both \"Limited\" and \"Flagged\" at the same time. These functions take an additional argument <root> (after the animation argument). <root> must be an ancestor of <animation> in the tree. This has the additional effect that \"Knob\" has on all nodes from the animation up to (but not including) <root>, so that this animation is the only one in its area of the tree which is playing.\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetAnimKnobAllRestart( %precombatrun1, %body, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "root",
            desc: "An ancestor of the animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnimKnobRestart",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetAnimKnobRestart( %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnimRestart",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetAnimRestart( %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "weight of this animation in a blend, defaults to 1.0",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "time to transition to this state in seconds, defaults to 0.2f",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "playback rate of the animation, defaults to 1.0",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFlaggedAnim",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.",
    example: "self SetFlaggedAnim( \"runanim\", %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notifyname",
            desc: "The string to notify notetracks with.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFlaggedAnimKnob",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)",
    example: "self SetFlaggedAnimKnob( \"runanim\", %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notifyname",
            desc: "The string to notify notetracks with.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFlaggedAnimKnobAll",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"All\": Works only with \"Knob.\" Not available with both \"Limited\" and \"Flagged\" at the same time. These functions take an additional argument <root> (after the animation argument). <root> must be an ancestor of <animation> in the tree. This has the additional effect that \"Knob\" has on all nodes from the animation up to (but not including) <root>, so that this animation is the only one in its area of the tree which is playing.",
    example: "self SetFlaggedAnimKnobAll( \"runanim\", %precombatrun1, %body, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notifyname",
            desc: "The string to notify notetracks with.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "root",
            desc: "An ancestor of the animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFlaggedAnimKnobAllRestart",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"All\": Works only with \"Knob.\" Not available with both \"Limited\" and \"Flagged\" at the same time. These functions take an additional argument <root> (after the animation argument). <root> must be an ancestor of <animation> in the tree. This has the additional effect that \"Knob\" has on all nodes from the animation up to (but not including) <root>, so that this animation is the only one in its area of the tree which is playing.\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetFlaggedAnimKnobAllRestart( \"runanim\", %precombatrun1, %body, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notifyname",
            desc: "The string to notify notetracks with.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "root",
            desc: "An ancestor of the animation.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFlaggedAnimKnobRestart",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.\n\"Knob\": These functions turn the weight of any siblings of the animation to zero as the animation's weight is turned up. The effect is that after the given time, the animation is the only one out of its siblings that is playing. Note that the descendents of the siblings of the animation will not be turned off directly. (For this, use ClearAnim.)\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetFlaggedAnimKnobRestart( \"runanim\", %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notifyname",
            desc: "The string to notify notetracks with.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFlaggedAnimRestart",
    desc: "SetAnim and all of its variants set the weight of an animation (or a node in the animtree) to a given value over a given time. They also set the speed at which the animation plays. All of the ancestors of the animation will also have their weight set to 1 over the given time so that the animation is visible. Each variant of this function has different behavior depending on the words in the function name:\n\"Flagged\": These functions take an additional argument <notifyname> (first in the argument list) which is a string that is notified for every notetrack in the animation. For instance, if the string \"runanim\" is used, it would be typical to waittill(\"runanim\", \"end\") to wait for the end of the animation. <animation> must be an actual animation and not a non-leaf node of the animtree.\n\"Restart\": These functions cause the animation to restart. If they had been previously playing, without this they would continue from their current time.",
    example: "self SetFlaggedAnimRestart( \"runanim\", %precombatrun1, 1, 0.1, 1 );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "notifyname",
            desc: "The string to notify notetracks with.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "animation",
            desc: "The animation or animtree node to change.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weight",
            desc: "Goal weight of this animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time to transition to this weight in seconds. Defaults to 0.2.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rate",
            desc: "Playback rate of the animation. Defaults to 1.0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopAnimScripted",
    desc: "Halts animscript on this entity.",
    example: "self StopAnimScripted()",
    callOn: "<entity> The entity to stop animscripts on",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "The entity to stop animscripts on",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopUseAnimTree",
    desc: "Stop using the current anim tree",
    example: "self StopUseAnimTree();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "useAnimTree",
    desc: "Set the animation tree of an entity",
    example: "self UseAnimTree( #animtree );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animTree",
            desc: "The new anim tree",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "badPlace_Arc",
    desc: "Creates a bad place arc. AI will flee this position if they can, and will not go into it if they can avoid it.",
    example: "BadPlace_Arc( \"halftrack_bp\", -1, mg42.origin, 1500, 400, (1.00, 0.00, 0.00), 20, 0, \"allies\" );",
    callOn: "",
    returnType: "",
    module: "BadPlaces",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "name",
            desc: "The name of the bad place. If name is not \"\", the bad place can be moved or deleted by using the unique name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "duration",
            desc: "If duration > 0, the bad place will automatically delete itself after this time.  If duration <= 0, the bad place must have a name and will last until manually deleted.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The base position of the bad place.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "radius",
            desc: "The radius of the bad place.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "The height of the bad place.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "direction",
            desc: "The direction vector is used to give a reference frame for the left and right angles.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rightAngle",
            desc: "The left angle and right angle are both positive angles (eg, \"45, 45\" will give a 90 degree arc).",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "leftAngle",
            desc: "The left angle and right angle are both positive angles (eg, \"45, 45\" will give a 90 degree arc).",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "team",
            desc: "You must specify at least one team for which this place is bad, but can give several.  The allowed teams are 'axis', 'allies', and 'neutral'.",
            type: "",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "badPlace_Cylinder",
    desc: "Creates a bad place cylinder. AI will flee this position if they can, and will not go into it if they can avoid it.",
    example: "BadPlace_Cylinder( \"moody\", -1, level.moodyfall_origin, 75, 300, \"neutral\" );",
    callOn: "",
    returnType: "",
    module: "BadPlaces",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "name",
            desc: "The name of the bad place. If name is not \"\", the bad place can be moved or deleted by using the unique name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "duration",
            desc: "If duration > 0, the bad place will automatically delete itself after this time. If duration <= 0, the bad place must have a name and will last until manually deleted.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The base position of the bad place.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "radius",
            desc: "The radius of the bad place.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "The height of the bad place.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "team",
            desc: "You must specify at least one team for which this place is bad, but can give several.  The allowed teams are 'axis', 'allies', and 'neutral'.",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "badPlace_Delete",
    desc: "Deletes a bad place. It is okay to delete a bad place name that doesn't exist. It is not okay to delete the special name \"\".",
    example: "BadPlace_Delete( \"bpFlak1\" );",
    callOn: "",
    returnType: "",
    module: "BadPlaces",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "badPlaceIdentifier",
            desc: "The bad place to delete",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClanDescription",
    desc: "Return the player's clan description",
    example: "player GetClanDescription();",
    callOn: "Entity",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClanID",
    desc: "Return the id of the clan",
    example: "player GetClanID();",
    callOn: "Entity",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClanMotto",
    desc: "Return motto of the clan",
    example: "player GetClanMotto();",
    callOn: "Entity",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClanName",
    desc: "Return the name for the player's clan",
    example: "player GetClanName();",
    callOn: "Entity",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClanURL",
    desc: "Return URL link of the clan",
    example: "player GetClanURL();",
    callOn: "Entity",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "sendRanks",
    desc: "Send rank",
    example: "sendRanks();",
    callOn: "",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "setPlayerTeamRank",
    desc: "Sets player team rank",
    example: "SetPlayerTeamRank(player, 0, rank);",
    callOn: "",
    returnType: "",
    module: "Clans",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "teamId",
            desc: "Team ID",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "rank",
            desc: "Rank",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allClientsPrint",
    desc: "Cause all clients to print the localized version of this string.",
    example: "AllClientsPrint( \"Game Complete\" );",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "the string to print",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowSpectateTeam",
    desc: "Set whether the player can spectate the given team.",
    example: "self AllowSpectateTeam( \"axis\", true );",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "team",
            desc: "A string description of the team. Valid teams are 'axis', 'allies', 'none' or 'freelook'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "spectate",
            desc: "A boolean value describing whether this player can spectate on this team.",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "announcement",
    desc: "Sends an announcement to all clients.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The announcement.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "ban",
    desc: "Bans the specified player.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "clientnum",
            desc: "The client number of the player to ban.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clientAnnouncement",
    desc: "Sends an announcement to a single client.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "clientnum",
            desc: "The client number that the announcement is sent to.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "string",
            desc: "The announcement.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clientPrint",
    desc: "Print a localized version of this string for a given client",
    example: "",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "client",
            desc: "A client entity.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "string",
            desc: "A message to print.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clonePlayer",
    desc: "clone the player's model for death animations.",
    example: "body = self ClonePlayer(deathAnimDuration);",
    callOn: "A Client",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Client",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "deathAnimationDuration",
            desc: "the duration of the death animation",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableWeapon",
    desc: "Disable the player's weapon",
    example: "level.player DisableWeapon();",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "dropItem",
    desc: "Drop an item with the given item name",
    example: "self DropItem( current );",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "itemName",
            desc: "the name of the item to drop",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableWeapon",
    desc: "Enable the player's weapon",
    example: "level.player EnableWeapon();",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getViewModel",
    desc: "Get the viewmodel name for the given player",
    example: "info[\"viewmodel\"] = self GetViewModel();",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "iPrintLn",
    desc: "Write line to the screen",
    example: "IPrintLn( \"Where have all the cowboys gone?\" );",
    callOn: "<player> The player to write the line to",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player to write the line to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "text",
            desc: "text to be written",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "iPrintLnBold",
    desc: "write bold line to the screen",
    example: "player iPrintLnBold( \"Mitchell!\" );",
    callOn: "<player> The player to write the line to",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player to write the line to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "text",
            desc: "text to be written",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isPlayerNumber",
    desc: "Returns true if the passed in int is a valid client number",
    example: "",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "entityNumber",
            desc: "Number to check",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isTalking",
    desc: "Returns true if the player is talking via voice chat",
    example: "",
    callOn: "A player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "kick",
    desc: "Kicks the specified player.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "clientnum",
            desc: "The client number of the player to kick.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeCvarServerInfo",
    desc: "Flags a cvar with the DVAR_CODINFO flag",
    example: "MakeCvarServerInfo( \"ui_ctf_timelimit\", \"30\" );",
    callOn: "",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "cvarName",
            desc: "The name of the cvar to change",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "cvarValue",
            desc: "The new value of the cvar",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sayAll",
    desc: "Write a client chat message from this client to everybody",
    example: "self SayAll( saytext );",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "message",
            desc: "A localizable message to send to all players",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sayTeam",
    desc: "Write a client chat message from this client to everybody on their team",
    example: "self SayTeam( sayText );",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "message",
            desc: "A localizable message to send to all players on the player's team.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSpawnWeapon",
    desc: "Set the weapon that this player will spawn with",
    example: "self SetSpawnWeapon( \"ak47\" );",
    callOn: "A player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The name of the weapon to spawn with",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTeamForTrigger",
    desc: "Set the team that this trigger will react to",
    example: "self SetTeamForTrigger( game[\"attackers\"] );",
    callOn: "A trigger",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A trigger",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "teamName",
            desc: "The name of the team that the trigger will respond to. Must be either 'axis', 'allies' or 'none'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "showScoreBoard",
    desc: "Updates the scoreboard data on a given client if they are looking at it.",
    example: "",
    callOn: "A Player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "spawn",
    desc: "Spawns a player at specific location",
    example: "self spawn(origin, angles);",
    callOn: "<player> The player to be spawned",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player to be spawned",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "origin",
            desc: "Position",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angle",
            desc: "Angles",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "suicide",
    desc: "Kills the player immediately as a suicide",
    example: "self suicide();",
    callOn: "A player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "updateScores",
    desc: "Updates the client's knowledge of team scores",
    example: "player UpdateScores()",
    callOn: "A player",
    returnType: "",
    module: "Client",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCommandFromKey",
    desc: "Gets the command bound to the key. Applicable values are: \"Z\",\"BUTTON_LSTICK\",\"BUTTON_START\",\"Space",
    example: "command = GetCommandFromKey( \"BUTTON_LSTICK\" );",
    callOn: "",
    returnType: "",
    module: "Control",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "key",
            desc: "key name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getKeyBinding",
    desc: "Gets a key binding. Applicable values are: \"+scores\",\"+speed\",\"+forward\",\"+back\", \"+moveleft\",\"+moveright\", \"+moveup\", \"+movedown\", \"+left\", \"+right\", \"+strafe\", \"+lookup\", \"+lookdown\", \"+mlook\", \"centerview\", \"toggleads\",\"+melee\", \"+prone\", \"lowerstance\", \"raisestance\", \"togglecrouch\", \"toggleprone\", \"goprone\", \"gocrouch\", \"+gostand\", \"weaponslot primary\", \"weaponslot primaryb\", \"+attack\", \"weapprev\", \"weapnext\", \"+activate\", \"+reload\", \"+leanleft\", \"+leanright\", \"screenshot\", \"screenshotJPEG\",",
    example: "firekey = GetKeyBinding( \"+attack\" );",
    callOn: "",
    returnType: "",
    module: "Control",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "keyBinding",
            desc: "a key binding name as a string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "finishPlayerDamage",
    desc: "Does damage to a player - usually as part of the damage callback",
    example: "self FinishPlayerDamage( eInflictor, eAttacker, iDamage, iDFlags, sMeansOfDeath, sWeapon, vPoint, vDir, sHitLoc, psOffsetTime );",
    callOn: "A client",
    returnType: "",
    module: "Damage",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A client",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "inflictor",
            desc: "The entity that causes the damage.(e.g. a turret)",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "attacker",
            desc: "The entity that is attacking.",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "damage",
            desc: "Integer specifying the amount of damage done",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "damageFlags",
            desc: "Integer specifying flags that are to be applied to the damage",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "meansOfDeath",
            desc: "String specifying the method of death (e.g. \"MOD_SUICIDE\")",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weapon",
            desc: "The weapon name used to inflict the damage",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "point",
            desc: "The hit position",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "direction",
            desc: "The direction of the damage",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hitLoc",
            desc: "The location of the hit. (e.g. \"head\", \"torso_upper\", ...)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "offsetTime",
            desc: "The time offset for the damage",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "radiusDamage",
    desc: "Does damage to all damageable objects within a given radius. The amount of damage is linear according to how close the object is to the radius. See also Entity/radiusdamage to specify an entity the damage is coming from.",
    example: "RadiusDamage( level.player.origin, 500, max, min, attacker );",
    callOn: "",
    returnType: "",
    module: "Damage",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "origin",
            desc: "The centre of the damage.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "range",
            desc: "The radius of the damage done.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "maxDamage",
            desc: "The maximum damage done. This will be done to objects close to the origin",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "minDamage",
            desc: "The minimum damage done. This will be done to objects at the edge of the damage sphere.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCanDamage",
    desc: "Set the candamage flag for this entity - this means that it can respond to notifies from bullets and grenade hits",
    example: "self SetCanDamage( true );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Damage",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "canDamage",
            desc: "The can damage flag",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setPlayerIgnoreRadiusDamage",
    desc: "Sets the player to ignore radius damage",
    example: "SetPlayerIgnoreRadiusDamage( true );",
    callOn: "",
    returnType: "",
    module: "Damage",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "playerIgnoreRadiusDamage",
            desc: "Flag indicating whether the player is to ignore radius damage.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "addTestClient",
    desc: "Adds a test client to the map and returns a reference to that client.",
    example: "ent[i] = AddTestClient();",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "assert",
    desc: "Assert that the given statement is correct.  The function will throw a script error if this is false.",
    example: "Assert ( enemyInSight == true );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "value",
            desc: "statement that is asserted to be correct",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "assertEx",
    desc: "Assert that the given statement is correct.  The function will throw a script error if this is false, with the given message.",
    example: "AssertEx( enemyInSight == true, \"Script expected enemy to be in sight.\" );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "value",
            desc: "statement that is asserted to be correct",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "message",
            desc: "error message",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "assertMsg",
    desc: "Throws a script error with the given message.",
    example: "AssertMsg( \"Unhandled enemy type.\" );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "message",
            desc: "error message",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getDebugEye",
    desc: "Gets the debug position of the eye for an AI or Player",
    example: "eyePos = level.player GetDebugEye();",
    callOn: "<entity> (entity) A player or actor",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "A player or actor",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "iPrintLn",
    desc: "Write line to the screen",
    example: "IPrintLn( \"Where have all the cowboys gone?\" );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "text",
            desc: "text to be written",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "iPrintLnBold",
    desc: "write bold line to the screen",
    example: "IPrintLnBold( \"Mitchell!\" );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "text",
            desc: "text to be written",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "line",
    desc: "Draw a debug line on screen. Not supported on server side.",
    example: "Line( self.origin, self.origin + forwardFar, (0.9, 0.7, 0.6), false );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "start",
            desc: "start vector position of the line",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "end vector position of the line",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "color",
            desc: "RGB color of the line in a vector, defaults to white",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "depthTest",
            desc: "whether to only draw the line when it is in front of objects, defaults to false.  Depth test is only supported on pc.",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "bool",
            desc: "Unknown.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "print",
    desc: "Development only - write to the console",
    example: "Print( \"Stuff and things!\" );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "text",
            desc: "text to be written",
            type: "",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "print3d",
    desc: "Draw 3d text on screen. Not supported on server side.",
    example: "Print3d( start, \"START\", (1.0, 0.8, 0.5), 1, 3 );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "origin",
            desc: "3d position of text to be drawn",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "text",
            desc: "The text to draw on the screen",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "color",
            desc: "RGB color of the line in a vector, defaults to white",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "alpha",
            desc: "alpha value of the text (how transparent), defaults to 1",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "scale",
            desc: "size scale of the text, defaults to 1",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "printLn",
    desc: "Development only - write line to the console",
    example: "PrintLn( \"I could be doing better!\" );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "text",
            desc: "text to be written",
            type: "",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setDebugAngles",
    desc: "Set the debugging angles for a debug camera.",
    example: "SetDebugAngles( camera.angles );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "angles",
            desc: "The debug player angles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setDebugOrigin",
    desc: "Set the debugging origin for a debug camera.",
    example: "SetDebugOrigin( camera.origin + (0,0,-60) );",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "origin",
            desc: "The debug player position",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCvar",
    desc: "Gets the value of a cvar, as a string.",
    example: "if( GetCvar( \"debug_skipintro\" ) == \"on\" ) ...",
    callOn: "",
    returnType: "string",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCvarFloat",
    desc: "Gets the value of a cvar, as a floating point number.",
    example: "oldDelay = GetCvarFloat( \"effect_delay\" );",
    callOn: "",
    returnType: "float",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCvarInt",
    desc: "Gets the value of a cvar, as an integer.",
    example: "level.fogtype = GetCvarInt( \"scr_fog_type\" );",
    callOn: "",
    returnType: "integer",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getDebugCvar",
    desc: "Gets the value of a debug cvar, as a string.",
    example: "if( GetDebugCvar( \"debug_skipintro\" ) == \"on\" ) ...",
    callOn: "",
    returnType: "string",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getDebugCvarFloat",
    desc: "Gets the value of a debug cvar, as a floating point number.",
    example: "oldDelay = GetDebugCvarFloat( \"effect_delay\" );",
    callOn: "",
    returnType: "float",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getDebugCvarInt",
    desc: "Gets the value of a debug cvar, as an integer.",
    example: "level.fogtype = GetDebugCvarInt( \"scr_fog_type\" );",
    callOn: "",
    returnType: "integer",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCvar",
    desc: "Sets the value of a script cvar.  Can not set code cvars.  Script cvars are not preserved in savegames.",
    example: "SetCvar( \"r_eyesAdjust\", \"1\" );",
    callOn: "",
    returnType: "",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name as a string.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "The cvar value.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSavedCvar",
    desc: "Sets the value of a dvar. Saved dvars are saved in the save game, and are reset to default on level change. Only works on dvars that have the 'SAVED' parameter set",
    example: "SetSavedCvar( \"r_eyesAdjust\", \"1\" );",
    callOn: "",
    returnType: "",
    module: "Dvars",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name as a string.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "The cvar value.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getFXVisibility",
    desc: "Returns the amount of visibilty (0.0 - 1.0) between the start and end points",
    example: "vis = GetFXVisibility( start, end );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "start",
            desc: "Starting point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "Ending point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "loadFX",
    desc: "Load the given effect",
    example: "fx = LoadFX( \"explosions/large_vehicle_explosion\" );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "filename",
            desc: "The filename of the effect to be loaded, without \"fx/\" or \".efx\"",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playFX",
    desc: "Play this effect.",
    example: "fx = PlayFX( enginesmoke, engine.origin );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "effectId",
            desc: "The effect id returned by loadfx",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "positionOfEffect",
            desc: "The world position of the effect",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "forwardVector",
            desc: "The forward vector of the effect",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "upVector",
            desc: "The up vector of the effect",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playFXOnTag",
    desc: "Play this effect on the entity and tag.",
    example: "fx = PlayFXOnTag( id, ent, tag );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "effectId",
            desc: "The effect id returned by loadfx",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "entity",
            desc: "The entity to attach the effect to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tagName",
            desc: "Tag name to attach the effect to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playLoopedFX",
    desc: "Play this effect in a loop.",
    example: "fx = PlayLoopedFX( id, ent, tag );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "effectId",
            desc: "The effect id returned by loadfx.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "repeatDelay",
            desc: "The delay between each loop.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the effect.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "cullDistance",
            desc: "The culling distance of the effect. 0 means that the effect won't be culled",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "forward",
            desc: "The forward vector for the effect",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "up",
            desc: "The up vector for the effect",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBlur",
    desc: "Blur the screen over a period of time.",
    example: "SetBlur( 10.3, 3.0 );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "target_blur",
            desc: "The final blur. The value is pixels for Gaussian blur at 640x480. Must be a floating point value greater than 0.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCullFog",
    desc: "Sets the amount of fog in the distance. The fog will increase linearly",
    example: "SetCullFog(0, 16500, 0.7, 0.85, 1.0, 0);",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "nearDistance",
            desc: "Distance from the camera that the fog will start",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "farDistance",
            desc: "Distance from the camera that full occlusion will occur.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "red",
            desc: "The red component of the fog as a value between 0.0 and 1.0",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "green",
            desc: "The red component of the fog as a value between 0.0 and 1.0",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "blue",
            desc: "The red component of the fog as a value between 0.0 and 1.0",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "transitionTime",
            desc: "Transition time in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setExpFog",
    desc: "Creates an exponential fog.",
    example: "SetExpFog( 0.0001144, 131/255, 116/255, 71/255, 0 );",
    callOn: "",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "density",
            desc: "Density must be greater than 0 and less than 1, and typically less than .001",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "red",
            desc: "The red component of the fog as a value between 0.0 and 1.0",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "green",
            desc: "The red component of the fog as a value between 0.0 and 1.0",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "blue",
            desc: "The red component of the fog as a value between 0.0 and 1.0",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "transitionTime",
            desc: "transition time in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "attach",
    desc: "Attach a model to an entity.",
    example: "self Attach( \"panzerflak_ammo\", \"tag_weapon_left\" );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "modelname",
            desc: "The model name to attach.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tagname",
            desc: "The tag to attach the model to.",
            type: "string",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreCollision",
            desc: "flag to ignore collision. Defaults to false.",
            type: "integer",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "delete",
    desc: "Removes an entity from the game in the same manner as a trigger_kill\"",
    example: "thing Delete();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "detach",
    desc: "Detaches an attached model from an entity.",
    example: "self detach(\"xmodel/explosivepack\", \"tag_weapon_right\");",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "modelname",
            desc: "The model name to detach",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tagname",
            desc: "The tag to detach the model from",
            type: "string",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "detachAll",
    desc: "detaches all attached models from an entity",
    example: "self DetachAll();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableAimAssist",
    desc: "Disables aim assist on an entity.  The entity must have a brush model",
    example: "self DisableAimAssist();",
    callOn: "An entity with a brushmodel",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "An entity with a brushmodel",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "doDamage",
    desc: "Does damage to this entity",
    example: "tank DoDamage( tank.health + 200, (0,0,0) );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "health",
            desc: "The amount of damage to do",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "sourcePosition",
            desc: "The position that the damage comes from",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "dontInterpolate",
    desc: "pop the entity's position instantaneously to where it moves this time step, rather than smoothly moving there from the previous position",
    example: "entity DontInterpolate();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableAimAssist",
    desc: "Enables aim assist on an entity.  The entity must have a brush model",
    example: "self EnableAimAssist();",
    callOn: "An entity with a brushmodel",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "An entity with a brushmodel",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableLinkTo",
    desc: "enables linkto for an entity",
    example: "self.bombtrigger EnableLinkTo();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAttachIgnoreCollision",
    desc: "Returns the ignore collision flag of the attached model at the given attachment slot",
    example: "self GetAttachIgnoreCollision( index );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "modelindex",
            desc: "The index of the model attached to the entity, starting at 0, so for instance 3 will get the fourth model attached.",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAttachModelName",
    desc: "Returns the name of the attached model at the given attachment slot",
    example: "self GetAttachModelName( index );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "modelindex",
            desc: "The index of the model attached to the entity, starting at 0, so for instance 3 will get the fourth model attached.",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAttachSize",
    desc: "Returns the number of attached models for this entity.",
    example: "self GetAttachSize();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAttachTagName",
    desc: "Returns the tagname of the attached model at the given attachment slot",
    example: "self GetAttachTagName( index );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "modelindex",
            desc: "The index of the model attached to the entity, starting at 0, so for instance 3 will get the fourth model attached.",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEnt",
    desc: "Looks up entities by key and name",
    example: "spawner = GetEnt( \"doorguy1\", \"targetname\" );",
    callOn: "",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "name",
            desc: "name to search for",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "key",
            desc: "key that name goes with",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEntArray",
    desc: "Gets an array of entities that have the given key, name pair. If name and key are not used, it will return all entities.",
    example: "aeExplosions = GetEntArray( strExplosion, \"targetname\" );",
    callOn: "",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "name",
            desc: "Name to search for.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "key",
            desc: "The key to search for.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEntByNum",
    desc: "Gets an entity from its entity number",
    example: "entity = GetEntByNum( entnum );",
    callOn: "",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entityNumber",
            desc: "The number of the entity to get",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEntityNumber",
    desc: "Get the entity number of this entity",
    example: "selfnum = self GetEntityNumber();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEntNum",
    desc: "Get the entity number for this entity",
    example: "self GetEntNum();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNormalHealth",
    desc: "Gets the normal health of this entity",
    example: "health = entity GetNormalHealth();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getOrigin",
    desc: "Gets the origin of an entity",
    example: "origin = self GetOrigin();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "hide",
    desc: "Hides a visible entity",
    example: "brokenwindow Hide();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isTouching",
    desc: "",
    example: "if ( level.player IsTouching( self ) )...",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "touchedEntity",
            desc: "The entity that is to be tested against",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "launch",
    desc: "Launch an object that interacts with the world, using an initial velocity. From this point on this object will no longer block either missiles or bullets.",
    example: "self Launch( (x, y, z) );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "initialVelocity",
            desc: "The initial velocity of the launch.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "linkTo",
    desc: "Attaches one entity to another",
    example: "self.rightturret LinkTo( self, \"tag_gunRight\", (0,0,0), (0,0,0) );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "linktoEntity",
            desc: "The entity to attach this thing to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tag",
            desc: "The tag to attach the entity to",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "originOffset",
            desc: "The positional offset from the base position",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "anglesOffset",
            desc: "The angular offset from the base angles",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "localToWorldCoords",
    desc: "Transform the given local coordinate point to a world coordinate point",
    example: "ramboPoint = self LocalToWorldCoords( delta );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "localCoordinate",
            desc: "The point in local coordinates",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "lockLightVis",
    desc: "Locks the lights that are visible by this entity to reduce the calculations for fast entities",
    example: "spawn LockLightVis();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "setContents",
    desc: "Sets the contents of an entity. Returns the old contents.",
    example: "",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "contents",
            desc: "an integer describing the contents of this entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCursorHint",
    desc: "Sets a visible cursor near to an objective",
    example: "",
    callOn: "<entity> An entity that is associated with the cursor hint",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity that is associated with the cursor hint",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "hint",
            desc: "one of the following strings: \"HINT_NOICON\", \"HINT_ACTIVATE\", \"HINT_HEALTH\", \"HINT_FRIENDLY\"",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setHintString",
    desc: "Sets the hint string for a usable entity",
    example: "fuel_lever SetHintString( &\"ROCKET_FUEL_LEVER\" );",
    callOn: "<entity> Either a trigger_use entity or an actor",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "Either a trigger_use entity or an actor",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "string",
            desc: "The string to use for a hint near a usable entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLookAtText",
    desc: "Set look at text for entity.",
    example: "",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "lookatTextLine1",
            desc: "The unlocalized look at text for this entity. Line is green and usually a name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "lookatTextLine2",
            desc: "The localized look at text for this entity. Line is white and usually a type",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setModel",
    desc: "Sets the model of the entity to the given model name",
    example: "splinter SetModel( \"wood_plank2\" );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "modelName",
            desc: "The name of the model to set this entity to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setNormalHealth",
    desc: "Sets the normal health of this entity",
    example: "self SetNormalHealth( (self.maxhealth - self.damageTaken) / self.maxHealth );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "health",
            desc: "The new normal health",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setShadowHint",
    desc: "Sets the shadow hint for the entity",
    example: "tankgun SetShadowHint( \"normal\" );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "priority",
            desc: "\"normal\", \"never\", \"high_priority\", \"low_priority\", \"always\", or \"receiver\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setStableMissile",
    desc: "This entity will shoot missiles that do not destabilize. Only applicable to vehicles, players and AI",
    example: "",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "stablemissileflag",
            desc: "True if the entity shoots stable missiles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "show",
    desc: "Shows a hidden entity",
    example: "brokenwindow Show();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "showToPlayer",
    desc: "Show the entity to a given client",
    example: "",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "The player to show the entity to.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "unlink",
    desc: "Unlinks a linked entity from another entity",
    example: "guy Unlink();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "unlockLightVis",
    desc: "Unlocks the lights that are visible by this entity",
    example: "spawn UnlockLightVis();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "useBy",
    desc: "Uses the entity with the passed in entity as the activator",
    example: "level.ArmoredCar.turret UseBy( level.player );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "usingEntity",
            desc: "The entity that is using the other entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "closeFile",
    desc: "Close a script-controlled file. Returns 1 if successful and -1 if unsuccessful.",
    example: "",
    callOn: "",
    returnType: "",
    module: "File",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "filenum",
            desc: "The number of the script file.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "fGetArg",
    desc: "Get a specific argument number from the current line",
    example: "",
    callOn: "",
    returnType: "",
    module: "File",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "filenum",
            desc: "The file number returned by openfile",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "arg",
            desc: "the argument number",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "fPrintLn",
    desc: "Write text out to a script-controlled file",
    example: "",
    callOn: "",
    returnType: "",
    module: "File",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "filenum",
            desc: "The number of the script file.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "output",
            desc: "The string to be output",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "fReadLn",
    desc: "Read the next line of comma separated value text from a script-controlled file. Returns the number of comma separated values in the line.",
    example: "",
    callOn: "",
    returnType: "",
    module: "File",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "fileNum",
            desc: "The number of the script file.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "openFile",
    desc: "Open a file for reading, writing, or appending. If successful returns a file number, otherwise returns -1",
    example: "filenum = OpenFile( \"info.txt\", \"read\" );",
    callOn: "",
    returnType: "",
    module: "File",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "filename",
            desc: "The name of the file to open.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "mode",
            desc: "The file mode. Valid arguments are 'read', 'write' and 'append'.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearTargetEnt",
    desc: "Clear this waypoint from targetting an entity.",
    example: "waypoint ClearTargetEnt();",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "destroy",
    desc: "Remove this Hud element altogether.",
    example: "self.bombstopwatch Destroy();",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "fadeOverTime",
    desc: "Set a hud element to transition in color (or alpha) over time.  Normally setting the color (or alpha) of an element causes an immediate visual change. However, if the color (or alpha) gets set within <time> after calling fadeOverTime, then the hud element will transition to the new color over the remaining <time>.",
    example: "level.introstring1 FadeOverTime( 1.2 );  level.introstring1.alpha = 0.3;  // This will transition the alpha from whatever it was before to the new value of 0.3 over 1.2 seconds.",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The time to fade the element in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "moveOverTime",
    desc: "Set a hud element to move over time.",
    example: "newStr MoveOverTime( timer );",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The time to move the element in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "newClientHudElem",
    desc: "Create a new hud element for a particular client",
    example: "self.kc_topbar = NewClientHudElem(self);",
    callOn: "",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "client",
            desc: "The client for whom the hud element is created.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "newHudElem",
    desc: "Create a new hud element",
    example: "overlay = NewHudElem();",
    callOn: "",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "newTeamHudElem",
    desc: "Create a new hud element for a particular team",
    example: "level.progressbar_allies_neutralize = NewTeamHudElem( \"axis\" );",
    callOn: "",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "team",
            desc: "The team for whom the hud element is created. Must be 'axis', 'allies' or 'spectator'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "obituary",
    desc: "Create an obituary for a character",
    example: "Obituary( self, attacker, sWeapon, sMeansOfDeath );",
    callOn: "",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "victim",
            desc: "The victim entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "attacker",
            desc: "The attacker entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weapon",
            desc: "The weapon name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "meansOfDeath",
            desc: "The means of death as a string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "reset",
    desc: "Reset a HUD element to its default state.",
    example: "element Reset();",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "scaleOverTime",
    desc: "Set a hud element to scale over time.",
    example: "other.progressbar ScaleOverTime( level.planttime, level.barsize, 8 );",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The time to scale the element in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "width",
            desc: "The new width of the material.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "The new height of the material.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setClock",
    desc: "Set a clock HUD element to count down over a time period.",
    example: "level.bombstopwatch SetClock( 5, 60, \"hudStopwatch\", 64, 64 );",
    callOn: "<HUD Clock> (HUD Clock Element) An HUD clock element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDClock",
            desc: "An HUD clock element",
            type: "HUD Clock Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The new timer time in seconds to count down",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fullTime",
            desc: "The time in seconds represented by a full cycle of the hand, for instance a stopwatch would be 60s.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "material",
            desc: "The material for the hud clock",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "width",
            desc: "The width of the material.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "The height of the material.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setClockUp",
    desc: "Set a clock HUD element to count up over a time period.",
    example: "level.bombstopwatch SetClockUp( 5, 60, \"hudStopwatch\", 64, 64 );",
    callOn: "<HUD Clock> (HUD Clock Element) An HUD clock element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDClock",
            desc: "An HUD clock element",
            type: "HUD Clock Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The new timer time in seconds to count up",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fullTime",
            desc: "The time in seconds represented by a full cycle of the hand, for instance a stopwatch would be 60s.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "material",
            desc: "The material for the hud clock",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "width",
            desc: "The width of the material.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "The height of the material.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGameTypeString",
    desc: "Set the game type string for the game",
    example: "",
    callOn: "A Hud Element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Hud Element",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "gameType",
            desc: "A string containing the game type",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setMapNameString",
    desc: "Set the map name string",
    example: "",
    callOn: "A HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A HUD element",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "mapName",
            desc: "A string containing the map name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setPlayerNameString",
    desc: "Set the player name string for a HUD element",
    example: "",
    callOn: "A HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A HUD element",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setShader",
    desc: "Set the material for this Hud Element",
    example: "waypoint SetShader( \"playbook_objective_stop\", 15, 15 );",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "materialname",
            desc: "A the name of the material to set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "width",
            desc: "The width of the material.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "The height of the material.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTargetEnt",
    desc: "Set the entity that this waypoint should target.  In MP, entity should already be a broadcasting entity, as with Objective_OnEntity().",
    example: "waypoint SetTargetEnt( level.axis.bombcarrier );",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "entity",
            desc: "Entity to Target",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTenthsTimer",
    desc: "Set a timer HUD element to count down in tenths of a second",
    example: "self.kc_timer SetTenthsTimer( self.archivetime - delay );",
    callOn: "<HUD Timer> (HUD Timer Element) An HUD timer element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDTimer",
            desc: "An HUD timer element",
            type: "HUD Timer Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The new timer time",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTenthsTimerUp",
    desc: "Set a timer HUD element to count up in tenths of a second",
    example: "self.kc_timer SetTenthsTimerUp( self.archivetime - delay );",
    callOn: "<HUD Timer> (HUD Timer Element) An HUD timer element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDTimer",
            desc: "An HUD timer element",
            type: "HUD Timer Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The new timer time",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setText",
    desc: "Set HUD text for this element.",
    example: "level.introstring1 SetText(string1);",
    callOn: "<HUD> (HUD Element) An HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUD",
            desc: "An HUD element",
            type: "HUD Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "text",
            desc: "A localized text reference",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTimer",
    desc: "Set a timer HUD element to count down",
    example: "level.reinforcement_hud SetTimer( level.counter )",
    callOn: "<HUD Timer> (HUD Timer Element) An HUD timer element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDTimer",
            desc: "An HUD timer element",
            type: "HUD Timer Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The new timer time",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTimerUp",
    desc: "Set a timer HUD element to count up",
    example: "level.reinforcement_hud SetTimerUp( level.counter )",
    callOn: "<HUD Timer> (HUD Timer Element) An HUD timer element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDTimer",
            desc: "An HUD timer element",
            type: "HUD Timer Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The new timer time",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setValue",
    desc: "Set a value HUD element to a given value.",
    example: "level.reinforcement_hud SetValue( 0 );",
    callOn: "<HUD Value> (HUD Value Element) An HUD value element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "HUDValue",
            desc: "An HUD value element",
            type: "HUD Value Element",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "value",
            desc: "The value to set the element to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWayPoint",
    desc: "Sets a hud element to be a waypoint.",
    example: "newdeathicon SetWayPoint( true );",
    callOn: "A HUD element",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A HUD element",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "constantSize",
            desc: "A boolean describing whether the hud element remains the same size",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "offscreenMaterialName",
            desc: "Material to draw when waypoint is offscreen.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "changeLevel",
    desc: "Changes to the new level",
    example: "ChangeLevel( \"burnville\", false );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "mapname",
            desc: "The name of the map to change to.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "persistent",
            desc: "Flag allowing player to keep their inventory through the transition.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "exitTime",
            desc: "Time in seconds of the exit fade.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "cinematic",
    desc: "Play the given cinematic",
    example: "Cinematic( \"cod_end\" );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "cinematicName",
            desc: "The cinematic name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "exitTime",
            desc: "Time in seconds of the exit fade.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "drawCompassFriendlies",
    desc: "Set whether friendlies are shown on the compass",
    example: "DrawCompassFriendlies( true );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "drawcompassfriendlies",
            desc: "A boolean setting whether friendly troops are shown on the compass.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "earthquake",
    desc: "Create an earthquake at the given point",
    example: "Earthquake( 0.3, 3, self.origin, 850 );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "scale",
            desc: "The scale of the quake.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "duration",
            desc: "Duration in seconds.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "source",
            desc: "The earthquake origin.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "radius",
            desc: "The earthquake radius of effect.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "exitLevel",
    desc: "exits the current level",
    example: "ExitLevel( false );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "savePersistent",
            desc: "if true then player info is retained",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAllNodes",
    desc: "Gets all of the nodes in a level",
    example: "nodes = GetAllNodes();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getAllVehicleNodes",
    desc: "Gets all of the vehicle nodes in a level",
    example: "nodes = GetAllVehicleNodes();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getArrayKeys",
    desc: "Returns an array consisting of the keys of the input array.",
    example: "result = GetArrayKeys( array );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "array",
            desc: "Input array",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getBrushModelCenter",
    desc: "deprecated - Use GetOrigin",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNode",
    desc: "Gets a node with the given name, key pair",
    example: "node = GetNode( self.target, \"targetname\" );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "name",
            desc: "name to search for",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "key",
            desc: "key that name goes with",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNodeArray",
    desc: "Gets an array of nodes that have the given name, key pair",
    example: "node = GetNodeArray( self.target, \"targetname\" );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "name",
            desc: "name to search for",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "key",
            desc: "key that name goes with",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNorthYaw",
    desc: "Returns the yaw value of North",
    example: "northYaw = GetNorthYaw();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getNumVehicles",
    desc: "Gets the number of vehicles entities in the level",
    example: "vehicleCount = GetNumVehicles();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getStartTime",
    desc: "Returns the start time for the current round.",
    example: "GetStartTime();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getTime",
    desc: "Gets the level time in Milliseconds from the start of the level.",
    example: "nextNodeTime = GetTime() + 500;",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getVehicleNode",
    desc: "Gets a vehicle node with the given name, key pair",
    example: "node = GetVehicleNode( self.target, \"targetname\" );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "name",
            desc: "The name to search for",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "key",
            desc: "The key that name goes with",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getVehicleNodeArray",
    desc: "Gets an array of vehicle nodes that have the given name, key pair",
    example: "nodes = GetVehicleNodeArray( self.target, \"targetname\" );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "name",
            desc: "The name to search for",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "key",
            desc: "The key that name goes with",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isSplitScreen",
    desc: "Returns true if the game is a splitscreen game",
    example: "level.splitscreen = IsSplitScreen()",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "isValidGametype",
    desc: "Returns true if the string is a valid game type",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "gameType",
            desc: "a string to check",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "map",
    desc: "Loads a new map",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "mapName",
            desc: "The map to load",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "savePersistent",
            desc: "if true then player info is retained",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mapExists",
    desc: "Returns true if the map with the given name exists on the server",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "mapName",
            desc: "The map to check.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "map_Restart",
    desc: "Restarts the map",
    example: "Map_Restart( true );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "savePersistent",
            desc: "if true then player info is retained",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "missionFailed",
    desc: "Does the same thing as the player being killed",
    example: "MissionFailed();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "missionSuccess",
    desc: "Transitions to a new level via a mission success page",
    example: "MissionSuccess( \"tankdrivetown\", false );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "mapname",
            desc: "The name of the map to change to.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "persistent",
            desc: "Flag allowing player to keep their inventory through the transition.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setClientNameMode",
    desc: "alters the way that the player name is updated, to prevent cheating by spectators altering their name to communicate with active players.",
    example: "SetClientNameMode( \"auto_change\" );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "nameMode",
            desc: "either 'auto_change' or 'manual_change'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCullDist",
    desc: "Set the cull distance for a level",
    example: "SetCullDist( 7200 );",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "cullDistance",
            desc: "The cull distance",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVoteNoCount",
    desc: "Sets the number of No votes",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "noCount",
            desc: "Number of 'no' votes",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVoteString",
    desc: "Sets the string for a vote",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The vote string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVoteTime",
    desc: "Sets the start time for a vote",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "time",
            desc: "The vote time in ms",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVoteYesCount",
    desc: "Sets the number of Yes votes",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "noCount",
            desc: "Number of 'yes' votes",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWinningPlayer",
    desc: "Sets a player to be the winner",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player to set as the winning player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWinningTeam",
    desc: "Sets a team to be the winner",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "team",
            desc: "The team name of the winning team. Must be 'axis', 'allies' or 'none'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "updateClientNames",
    desc: "Update all of the client names: only works in 'manual_change' mode",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "worldEntNumber",
    desc: "Returns the entity number for the world",
    example: "",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "aCos",
    desc: "Returns an angle corresponding to a particular cosine value",
    example: "upAngle = ACos( distanceratio );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "cosValue",
            desc: "A cosine value",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "aSin",
    desc: "Returns an angle corresponding to a particular sin value",
    example: "upAngle = ASin( upAmount );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "sinValue",
            desc: "A sin value",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "aTan",
    desc: "Returns an angle corresponding to a particular tangential value",
    example: "upAngle = ATan( height/distance );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "tanValue",
            desc: "A tangential value",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "cos",
    desc: "Returns the cos of an angle",
    example: "frac = Cos( degrees );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "angle",
            desc: "An angle in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "int",
    desc: "Casts a floating point number or a string to an integer",
    example: "x = Int( self.HUDHealthHeight );",
    callOn: "",
    returnType: "int",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "value",
            desc: "A string or floating point number to cast to an integer",
            type: "string | float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "randomFloat",
    desc: "Returns a random floating point number r, where 0 <= r < max",
    example: "if ( RandomFloat( 100 ) > 50 ) ...",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "max",
            desc: "The maximum floating point size",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "randomFloatRange",
    desc: "Returns a random floating point number r, where min <= r < max",
    example: "rand = RandomFloatRange( 3.0, 5.0 );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "min",
            desc: "The minimum result",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "max",
            desc: "The maximum result",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "randomInt",
    desc: "Returns a random integer between 0 and max-1 inclusive",
    example: "if ( RandomInt( 100 ) > 50 ) ...",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "max",
            desc: "The maximum integer size",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "randomIntRange",
    desc: "Returns a random integer r, where min <= r < max",
    example: "rand = RandomIntRange( 3, 5 );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "min",
            desc: "The minimum result",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "max",
            desc: "The maximum result + 1",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sin",
    desc: "Returns the sin of an angle",
    example: "frac = Sin( degrees );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "angle",
            desc: "An angle in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "tan",
    desc: "Returns the tan of an angle",
    example: "frac = Tan( degrees );",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "angle",
            desc: "An angle in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "closeInGameMenu",
    desc: "close the in game menu for this client.",
    example: "player CloseInGameMenu();",
    callOn: "A Client",
    returnType: "",
    module: "Menus",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Client",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "closeMenu",
    desc: "Close the current player menu",
    example: "player CloseMenu();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "openMenu",
    desc: "Open a menu for this player",
    example: "self OpenMenu( game[\"menu_weapon_allies_only\"] );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "menu",
            desc: ": A string. The name of the menu to open",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "openMenuNoMouse",
    desc: "Open a menu for this player, with no mouse control.",
    example: "self OpenMenuNoMouse( game[\"menu_weapon_allies_only\"] );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "menu",
            desc: ": A string. The name of the menu to open",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "moveGravity",
    desc: "Fling this entity.",
    example: "self MoveGravity( break_vector, time );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "initialVelocity",
            desc: "The initial velocity to fling this entity at",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to move the entity in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "moveTo",
    desc: "Move this entity to the given point.",
    example: "dummy MoveTo( dest_org, .5, .05, .05 );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "point",
            desc: "The point to move the entity to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to move the entity in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "moveX",
    desc: "Move this entity to the given world x value",
    example: "train MoveX( -4400, 60, 15, 20 );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "xvalue",
            desc: "The x value to move the entity to, as a floating point number",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to move the entity in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "moveY",
    desc: "move this entity to the given world y value",
    example: "hangardoor MoveY( 320, 10 );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "yvalue",
            desc: "The y value to move the entity to, as a floating point number",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to move the entity in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "moveZ",
    desc: "Move this entity to the given world z value",
    example: "",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "zvalue",
            desc: "The z value to move the entity to, as a floating point number",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to move the entity in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "notSolid",
    desc: "Unsets the solid flag, so that this object is no longer collidable.",
    example: "self NotSolid();",
    callOn: "<entity> (entity) script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "rotatePitch",
    desc: "Rotate this entity to the given pitch",
    example: "treeorg RotatePitch( -5, 0.26, 0.15, 0.1 );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "pitchAngle",
            desc: "The new pitch angle in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to rotate in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "rotateRoll",
    desc: "Rotate this entity to the given roll angle",
    example: "self RotateRoll( (2 * 1500 + 3 * Randomfloat( 2500 )) * -1, 5, 0, 0 );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "rollAngle",
            desc: "The new roll angle in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to rotate in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "rotateTo",
    desc: "Rotate this entity to the given world rotation value",
    example: "shutter RotateTo( (shutter.angles[0], newYaw, shutter.angles[2]), newTime );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "angles",
            desc: "The new world angle to rotate to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to rotate in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "rotateVelocity",
    desc: "Rotate this entity at a particular velocity for a given time",
    example: "self RotateVelocity( (x,y,z), 12 );",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "rotateVelocity",
            desc: "The rotational velocity to rotate",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to rotate in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "rotateYaw",
    desc: "Rotate this entity to the given yaw",
    example: "",
    callOn: "<entity> (entity) script_model, script_origin or script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_model, script_origin or script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "yawAngle",
            desc: "The new yaw angle in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The time to rotate in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "accelerationTime",
            desc: "The time spent accelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "decelerationTime",
            desc: "The time spent decelerating in seconds",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "solid",
    desc: "Set the solid flag, so that this object is collidable.",
    example: "self Solid();",
    callOn: "<entity> (entity) script_brushmodel",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "script_brushmodel",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "vibrate",
    desc: "Causes a script entity to vibrate, rotating around its origin, along a given vector dir",
    example: "self Vibrate( directionVir, 0.3, 0.4, 1.0 );",
    callOn: "<entity> The script entity",
    returnType: "",
    module: "Motion",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "The script entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "directionVector",
            desc: "The direction of the vibration",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "amplitude",
            desc: "The amount of the vibration in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "period",
            desc: "The period of the vibration in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "The length of time of the vibration in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Add",
    desc: "Adds a new objective",
    example: "Objective_Add( objective_number, \"active\", objective_text, (closest.bomb.origin) );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The number of the objective to add",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "state",
            desc: "A string value representing the state of the objective. Valid states are \"empty\", \"active\", \"invisible\", \"done\", \"current\" and \"failed\"",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "text",
            desc: "The text to use for the objective. This should be a valid localized text reference",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the objective",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "iconshader",
            desc: "The objective icon to embed",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_AdditionalCurrent",
    desc: "Add additional objective(s) to the set of objectives currently being done. If none specified, there's no effect.Current objectives that are not specified are not affected by this call. Meant to be used when there are already current objective(s), but one or more additional objectives need to be made current in addition to the previously current objectives.",
    example: "Objective_AdditionalCurrent( level.flakObjectiveID );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "objective_index",
            desc: "The ID of the objective to set current. Multiple <objective_index> may be added.",
            type: "",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_AdditionalPosition",
    desc: "Set an additional position for objectives with multiple positions",
    example: "Objective_AdditionalPosition( level.mortarObjNumber, ent.index, nMortarCarrier.origin );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "objective_index",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position_index",
            desc: "The position of the objective",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the objective",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Current",
    desc: "Set which objective(s) are currently being done. If none specified, there's no current objective. Current objectives that are not specified to still be current, are set to active.",
    example: "Objective_Current( aHardpointObjectives[0].obj, aHardpointObjectives[1].obj, aHardpointObjectives[2].obj );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "objective_index",
            desc: "The ID of the objective to set current. Multiple <objective_index> may be added.",
            type: "",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Delete",
    desc: "Removes an objective",
    example: "Objective_Delete( 1 );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The number of the objective to remove",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Icon",
    desc: "Set the compass icon for an objective",
    example: "Objective_Icon( 0, game[\"radio_none\"] );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "icon",
            desc: "A compass icon",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_OnEntity",
    desc: "Sets the objective to get its position from an entity.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "entity",
            desc: "The entity to set the objective to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Position",
    desc: "Set the position of an objective, assumed to be the zeroth position, must use objective_additionalposition to set a different position index",
    example: "Objective_Position( 4, get_objective_position( \"plant_boilerbomb_trigger\" ) );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the objective",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Ring",
    desc: "Triggers a ring on the objective.",
    example: "Objective_Ring( level.mortarObjNumber );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "objective_index",
            desc: "The ID of the ring.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_State",
    desc: "Sets the state of an objective",
    example: "Objective_State( 8, \"done\" );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The number of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "state",
            desc: "A string value representing the state of the objective. Valid states are \"empty\", \"active\", \"invisible\", \"done\", \"current\" and \"failed\"",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_String",
    desc: "Set the description string for an objective",
    example: "Objective_String( index, &\"SCRIPT_OBJ_DESTROYFLAKPANZERS\", level.flaks_remaining );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "string",
            desc: "Localised objective strings",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_String_NoMessage",
    desc: "Set the description string for an objective, without posting an \"objectives updated\" message",
    example: "Objective_String_NoMessage( index, &\"SCRIPT_OBJ_DESTROYFLAKPANZERS\", level.flaks_remaining );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "string",
            desc: "Localised objective strings",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_Team",
    desc: "Sets the team that the objective is for. Allows having different objectives for each team",
    example: "Objective_Team( 0, \"allies\" );",
    callOn: "",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "team",
            desc: "The team that the objective is for. Valid entries are 'allies', 'axis', or 'none'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "pingPlayer",
    desc: "Flashes a player on their teammate's compasses",
    example: "self PingPlayer();",
    callOn: "A player",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowCrouch",
    desc: "Sets whether the player can crouch",
    example: "level.player allowCrouch(false);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerCrouch",
            desc: ": (bool) true if the player can crouch, and false otherwise.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowLeanLeft",
    desc: "Sets whether the player can lean left",
    example: "level.player allowLeanLeft(false);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerLeanLeft",
            desc: ": (bool) true if the player can lean left, and false otherwise.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowLeanRight",
    desc: "Sets whether the player can lean right",
    example: "level.player allowLeanRight(false);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerLeanRight",
            desc: ": (bool) true if the player can lean right, and false otherwise.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowProne",
    desc: "Sets whether the player can prone",
    example: "level.player allowProne(false);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerProne",
            desc: ": (bool) true if the player can prone, and false otherwise.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "allowStand",
    desc: "Sets whether the player can stand up",
    example: "level.player allowStand(false);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerStand",
            desc: ": (bool) true if the player can stand, and false otherwise.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "attackButtonPressed",
    desc: "Check if the player is pressing the fire button",
    example: "if ( self AttackButtonPressed() ) ...",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "buttonPressed",
    desc: "Check if the host is pressing the button/key",
    example: "while( self ButtonPressed( \"BUTTON_A\" ) ) ...",
    callOn: "The player (it will only check the host player's buttons though)",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "",
            desc: "The player (it will only check the host player's buttons though)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "buttonName",
            desc: "Button name, for example \"BUTTON_A\", \"BUTTON_B\", \"K\", ...",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "deactivateChannelVolumes",
    desc: "deactivate the channel volumes for the player on the given priority level",
    example: "level.player DeactivateChannelVolumes( \"snd_enveffectsprio_level\", 3 );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "priority",
            desc: ": Valid priorities are \"snd_channelvolprio_holdbreath\", \"snd_channelvolprio_pain\", or \"snd_channelvolprio_shellshock\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fadeTime",
            desc: ": the time spent fading to the next lowest active channelvol priority level in seconds.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "deactivateReverb",
    desc: "deactivate the sound reverberation for the player on the given priority level",
    example: "level.player DeactivateReverb( \"snd_enveffectsprio_level\", 3 );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "priority",
            desc: ": Valid priorities are \"snd_enveffectsprio_level\" or \"snd_enveffectsprio_shellshock\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fadeTime",
            desc: ": the time spent fading to the next lowest active reverb priority level in seconds.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableHealthShield",
    desc: "Sets whether the player's health shield is active",
    example: "level.player EnableHealthShield( false );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enable",
            desc: ": A boolean. true to enable the health shield, and false otherwise",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "freezeControls",
    desc: "Blocks or unblocks control input from this player",
    example: "level.player freezeControls( true );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "freezeState",
            desc: ": true if the player's controls are frozen, false otherwise.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCurrentOffhand",
    desc: "Gets the player's current off-hand weapon( usually a grenade).",
    example: "currentweapon = level.player GetCurrentOffhand();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCurrentWeapon",
    desc: "Gets the players current weapon.",
    example: "currentweapon = level.player GetCurrentWeapon();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getFractionMaxAmmo",
    desc: "Return the player's current ammunition amount as a fraction of the weapon's maximum ammunition",
    example: "self GetFractionMaxAmmo( \"m4_grenadier\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getFractionStartAmmo",
    desc: "Return the player's current ammunition amount as a fraction of the weapon's starting ammunition",
    example: "self GetFractionStartAmmo( \"mosin_nagant\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getGuid",
    desc: "Gets the player's guid.",
    example: "if ( level.player GetGuid() == 123456 ) ...",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNormalizedMovement",
    desc: "Get the player's normalized movement vector.  Returns [-1,1] for X(forward) and Y(right) based on player's input.",
    example: "movement = self GetNormalizedMovement();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getPlayerAngles",
    desc: "Get the player's angles",
    example: "angles = level.player GetPlayerAngles();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getStance",
    desc: "Gets the stance of the player. It only works for the player. Possible return values are 'crouch', 'prone' and 'stand'",
    example: "if ( level.player GetStance() == \"crouch\") )...",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getVelocity",
    desc: "Gets the player's velocity",
    example: "vel = level.player GetVelocity();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponSlotAmmo",
    desc: "Gets the ammo count for the weapon in the given slot.",
    example: "ammo = level.player getweaponslotammo(\"primary\");",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "Valid weaponslots are \"primary\" and \"primaryb\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponSlotClipAmmo",
    desc: "Gets the ammunition in the clip for the weapon in the given weapon slot.",
    example: "ammo = level.player getweaponslotclipammo(\"primary\");",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "Valid weaponslots are \"primary\" and \"primaryb\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponSlotWeapon",
    desc: "Gets the name of the weapon in the given weapon slot.",
    example: "playerWeapon[0] = level.player getweaponslotweapon(\"primary\");",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "Valid weaponslots are \"primary\" and \"primaryb\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "giveMaxAmmo",
    desc: "Set the player's ammunition to the weapon's maximum ammunition",
    example: "self GiveMaxAmmo( self.pers[\"weapon\"] );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "giveStartAmmo",
    desc: "Set the player's ammunition to the weapon's default starting ammunition",
    example: "",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "giveWeapon",
    desc: "Give the player a weapon.",
    example: "level.player giveWeapon(\"m1garand\");",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name to give to the player.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "hasWeapon",
    desc: "Checks whether the player has the given weapon.",
    example: "if( level.player HasWeapon( \"Panzerfaust\" ) ) [...]",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isFiring",
    desc: "Returns true if the player is currently using a weapon",
    example: "level.player IsFiring()",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isLookingAt",
    desc: "Returns true if the entity is the same as the player's lookat entity.",
    example: "level.player islookingat( trigger );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "entity",
            desc: ": An entity.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isMeleeing",
    desc: "Returns true if the player is currently meleeing",
    example: "level.player IsMeleeing();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isOnGround",
    desc: "Returns true if the player is on the ground.",
    example: "if( player IsOnGround() );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isThrowingGrenade",
    desc: "Returns true if the player is currently throwing a grenade",
    example: "level.player IsThrowingGrenade();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "meleeButtonPressed",
    desc: "Check if the player is pressing the melee button",
    example: "if ( self MeleeButtonPressed() ) ...",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "playerAds",
    desc: "Return the player's weapon position fraction.",
    example: "while( self PlayerAds() > 0.3 )...",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "playerLinkToAbsolute",
    desc: "Attaches the player to an entity.  No view movement is allowed.    The player's eye position will remain fixed relative to the parent entity/tag.  Thus, pitching and rolling will cause the player's eye position to move. (But the player entity always remains vertical)",
    example: "level.player PlayerLinkToAbsolute( vehicle, \"tag_player\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "locktoEntity",
            desc: "The entity to attach the player to",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tag",
            desc: "The tag to attach the player to",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playerLinkToDelta",
    desc: "Attaches the player to an entity.  Any entity rotation is added to the player's view, allow the player to look around.  The player's eye position will remain fixed relative to the parent entity/tag.  Thus, pitching and rolling will cause the player's eye position to move. (But the player entity always remains vertical)",
    example: "level.player PlayerLinkToDelta( vehicle, \"tag_player\", 0.5 );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "linktoEntity",
            desc: "The entity to attach the player to.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tag",
            desc: "The tag to attach the player to.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "viewFraction",
            desc: "How much the change in the tag's rotation effects the players view.  Defaults to 0.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playLocalSound",
    desc: "Plays a sound locally to the player",
    example: "players[i] PlayLocalSound( \"MP_announcer_round_draw\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "soundName",
            desc: ": The name of the sound to play.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAutoPickup",
    desc: "Sets whether the player will automatically pick up pickups.",
    example: "level.player SetAutoPickup( true );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "autoPickup",
            desc: ": (bool) true if the player will automatically pickup pickups.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setChannelVolumes",
    desc: "Set the channel volumes for the player (a way of fading volumes by type)",
    example: "level.player SetChannelVolumes( \"snd_channelvolprio_pain\", \"pain\", 1, .7, 3 );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "priority",
            desc: ": Valid priorities are \"snd_channelvolprio_holdbreath\", \"snd_channelvolprio_pain\", or \"snd_channelvolprio_shellshock\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "shockName",
            desc: ": string describing the name of the .shock file w/ the channel volumes values to use.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fadeTime",
            desc: ": in seconds.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setClientCvar",
    desc: "Set the cvar value for the specified name.",
    example: "self SetClientCvar( \"cg_drawhud\", \"0\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "cvarName",
            desc: ": The name of a cvar on client side",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: ": (string | localized string) The value to which the cvar will be set.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "&&",
            desc: "Values of parameters in localized string, starting with \"&&1\"",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setClientDvar",
    desc: "Set the dvar value for the specified name.",
    example: "self SetClientCvar( \"cg_drawhud\", \"0\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "dvarName",
            desc: ": The name of a dvar.  Valid dvar names: \"cg_drawhud\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: ": The the value to which the cvar will be set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setEnterTime",
    desc: "Set the player's enter time.",
    example: "level.player SetEnterTime( time );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "The player's enter time.",
            type: "integer",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setOrigin",
    desc: "Set the player's origin",
    example: "level.player SetOrigin( pltruck.origin );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerOrigin",
            desc: "The player's origin",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setPlayerAngles",
    desc: "Set the player's angles",
    example: "level.player SetPlayerAngles( (0, 240, 0) );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerAngles",
            desc: "The player's angles in degrees.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setReverb",
    desc: "Set the sound reverberation for the player",
    example: "level.player SetReverb( \"snd_enveffectsprio_level\", \"stoneroom\", 1, .7, 3 );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "priority",
            desc: ": Valid priorities are \"snd_enveffectsprio_level\", or \"snd_enveffectsprio_shellshock\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "roomType",
            desc: ": string describing the type of reverb.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "dryLevel",
            desc: ": a float from 0 (no source sound) to 1 (full source sound)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "wetLevel",
            desc: ": a float from 0 (no effect) to 1 (full effect)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fadeTime",
            desc: ": in seconds and modifies drylevel and wetlevel.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setStance",
    desc: "Sets the stance of the player. It only works for the player. Possible values are 'crouch', 'prone' and 'stand'",
    example: "level.player SetStance( \"stand\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVelocity",
    desc: "Set the player's velocity",
    example: "level.player SetVelocity( (-400, 0, 100) );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerVelocity",
            desc: "The player's velocity",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setViewModel",
    desc: "Set the player's current view model.",
    example: "self SetViewModel( \"viewmodel_hands_russian_vetrn\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "viewmodelName",
            desc: "A viewmodel",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponClipAmmo",
    desc: "Set the weapon clip ammunition for the given weapon.",
    example: "level.player setweaponclipammo(1);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: ": (sting) The weapon name for this weapon.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ammunition",
            desc: ": (integer) The amount of ammunition in the clip.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponSlotAmmo",
    desc: "Sets the ammunition for the weapon in the given weapon slot.",
    example: "level.player setweaponslotammo(\"primary\", 125);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "Valid weaponslots are \"primary\" and \"primaryb\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ammoCount",
            desc: "The amount of ammunition.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponSlotClipAmmo",
    desc: "Sets the clip ammunition for the weapon in the given weapon slot.",
    example: "level.player setweaponslotclipammo(\"primary\", 125);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "Valid weaponslots are \"primary\" and \"primaryb\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ammoCount",
            desc: "The amount of ammunition.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponSlotWeapon",
    desc: "Sets the weapon name for the given weapon slot.",
    example: "level.player setweaponslotweapon(\"primary\", weapon);",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "Valid weaponslots are \"primary\" and \"primaryb\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weaponName",
            desc: "The name of the weapon to use in this slot.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "shellShock",
    desc: "Start a shell shock sequence for the player. The shell shock must be precached, otherwise calling this script will cause a script error.",
    example: "self ShellShock( \"death\", 5 );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "shellshockname",
            desc: "name of shellshock.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "duration",
            desc: "duration in seconds. The duration must be between 0 and 60 seconds.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopLocalSound",
    desc: "Stops all instances of a local soundalias running on a player.",
    example: "level.player StopLocalSound( \"annoying_siren\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "soundName",
            desc: ": The name of the sound to stop.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopShellShock",
    desc: "Stop a shell shock sequence for the player",
    example: "self StopShellShock();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "switchToOffhand",
    desc: "Switch the player's offhand weapon",
    example: "",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "switchToWeapon",
    desc: "Switch to a different weapon",
    example: "level.player SwitchToWeapon( \"mosin_nagant\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "takeAllWeapons",
    desc: "Remove all the weapons from the player.",
    example: "level.player TakeAllWeapons();",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "takeWeapon",
    desc: "Take a weapon from the player.",
    example: "level.player TakeWeapon( \"m16_grenadier\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name to take from the player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "useButtonPressed",
    desc: "Check if the player is pressing the use button",
    example: "if ( self UseButtonPressed() ) ...",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "viewKick",
    desc: "Damage the player, and throw the screen around",
    example: "level.player ViewKick( 127, level.player.origin );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "force",
            desc: "The force of the kick, from 0 to 127",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "source",
            desc: "the source of the kick",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheHeadIcon",
    desc: "precache a head icon.",
    example: "PreCacheHeadIcon( game[\"headicon_allies\"] );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "headIconName",
            desc: "The name of the head icon",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheItem",
    desc: "Precaches the given item. It must be called before any wait statements in the level script.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "itemName",
            desc: "The name of the item to precache.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "precacheMenu",
    desc: "precache this menu",
    example: "PrecacheMenu( game[\"menu_serverinfo\"] );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "menu",
            desc: "The menu to load",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheModel",
    desc: "Precaches the given model. It must be called before any wait statements in the level script.",
    example: "PreCacheModel( \"prop_panzerfaust_lid\" );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "model",
            desc: "The name of the model to precache.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheRumble",
    desc: "Precaches the given rumble. It must be called before any wait statements in the level script.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "rumble",
            desc: "The name of the rumble to precache.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheShader",
    desc: "Precaches the given shader. It must be called before any wait statements in the level script.",
    example: "PreCacheShader( \"artillery_firing\" );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "shaderName",
            desc: "The name of the shader to precache.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheShellShock",
    desc: "Precaches the shellshock effect. It must be called before any wait statements in the level script.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "shellshockEffectName",
            desc: "The name of the shellshock effect to precache.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheStatusIcon",
    desc: "precache a status icon.",
    example: "PreCacheStatusIcon( \"hud_status_dead\" );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "statusIconName",
            desc: "the name of the status icon",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheString",
    desc: "Precaches the given string. It must be called before any wait statements in the level script.",
    example: "",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The name of the string to precache.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "preCacheTurret",
    desc: "Precaches the weapon info structure for the turret. Must be called before any wait statements in the level script",
    example: "PreCacheTurret( \"mg42_tank_tiger\" );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "turretInfo",
            desc: "The turret info name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "precacheVehicle",
    desc: "Precaches the weapon info structure for the turret on the vehicle. Must be called before any wait statements in the level script",
    example: "node = PrecacheVehicle( \"mg42_tank_tiger\" );",
    callOn: "",
    returnType: "",
    module: "Precache",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicleInfo",
            desc: "The vehicle info name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playLoopRumble",
    desc: "Plays a looping controller rumble on the given player.",
    example: "self PlayLoopRumble( \"tank_rumble\" );",
    callOn: "Entity",
    returnType: "",
    module: "Rumble",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "rumbleName",
            desc: "The name of the rumble to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playLoopRumbleOnPos",
    desc: "Plays a looping rumble at a given position.",
    example: "PlayLoopRumbleOnPos( \"artillery_quake\", level.player.origin );",
    callOn: "",
    returnType: "",
    module: "Rumble",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "rumbleName",
            desc: "The name of the rumble to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the rumble",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playRumble",
    desc: "Plays a rumble on the given entity.",
    example: "self PlayRumble( \"damage_heavy\" );",
    callOn: "Entity",
    returnType: "",
    module: "Rumble",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "Entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "rumbleName",
            desc: "The name of the rumble to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playRumbleOnPos",
    desc: "Plays a rumble at a given position.",
    example: "PlayRumbleOnPos( \"artillery_quake\", level.player.origin );",
    callOn: "",
    returnType: "",
    module: "Rumble",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "rumbleName",
            desc: "The name of the rumble to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the rumble",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopAllRumbles",
    desc: "Stops all of the current rumbles.",
    example: "StopAllRumbles();",
    callOn: "",
    returnType: "",
    module: "Rumble",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "stopRumble",
    desc: "Quits the playing of a particular rumble on a player.",
    example: "self StopRumble( \"tank_rumble\" );",
    callOn: "A player",
    returnType: "",
    module: "Rumble",
    supportedAt: "Xbox 360 Only",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "rumbleName",
            desc: "The name of the rumble to stop",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "commitSave",
    desc: "commits the current save in the save buffer.",
    example: "CommitSave(id);",
    callOn: "",
    returnType: "",
    module: "Save",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "saveId",
            desc: "The id of the save to commit.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isSaveRecentlyLoaded",
    desc: "checks if the current savegame has recently been loaded.",
    example: "IsSaveRecentlyLoaded();",
    callOn: "",
    returnType: "",
    module: "Save",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "isSaveSuccessful",
    desc: "checks if the last saved game was successfully saved.",
    example: "IsSaveSuccessful();",
    callOn: "",
    returnType: "",
    module: "Save",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "saveGame",
    desc: "Save the current game.",
    example: "SaveGame( (\"Chateau\" + nodenum), \"Documents Obtained\" );",
    callOn: "",
    returnType: "",
    module: "Save",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "filename",
            desc: "The name of the file. If not used then the file will be automatically named. Will throw a script error if multiple saves are attempted in the same frame.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "description",
            desc: "A description of the savegame.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "screenshot",
            desc: "The name of the screenshot file. If not used then the file will be automatically named.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "saveGameNoCommit",
    desc: "Save the current game to a memory buffer. Returns an ID for the save. Will throw a script error if multiple saves are attempted in the same frame.",
    example: "id = SaveGameNoCommit( (\"Chateau\" + nodenum), \"Documents Obtained\" );",
    callOn: "",
    returnType: "",
    module: "Save",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "filename",
            desc: "The name of the file. If not used then the file will be automatically named.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "description",
            desc: "A description of the savegame.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "screenshot",
            desc: "The name of the screenshot file. If not used then the file will be automatically named.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAIArray",
    desc: "Returns an array of the human AI",
    example: "aiarray = GetAIArray( \"axis\", \"neutral\" );",
    callOn: "",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "team",
            desc: "A team name, either 'axis', 'allies', or 'neutral'. Any number of additional team names may be added",
            type: "",
            isOptional: true,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClosestEnemySqDist",
    desc: "Get the distance to the nearest enemy",
    example: "dist = self GetClosestEnemySqDist();",
    callOn: "<sentient> (entity) An entity that is either the AI or a Player",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "sentient",
            desc: "An entity that is either the AI or a Player",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEnemySqDist",
    desc: "This function is deprecated. use GetClosestEnemySqDist",
    example: "",
    callOn: "<sentient> (entity) An entity that is either the AI or a Player",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "sentient",
            desc: "An entity that is either the AI or a Player",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEye",
    desc: "Gets the position of the eye for an AI or Player",
    example: "eyePos = level.player GetEye();",
    callOn: "<sentient> (entity) An entity that is either the AI or a Player",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "sentient",
            desc: "An entity that is either the AI or a Player",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isAI",
    desc: "Checks whether this entity is an ai character",
    example: "if ( IsAI( gun_owner ) ) ...",
    callOn: "",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity object that may be an ai character",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isAlive",
    desc: "Checks whether this entity is alive",
    example: "if ( IsAlive( gun_owner ) ) ...",
    callOn: "",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity object that might be alive or dead",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isPlayer",
    desc: "Checks whether this entity is the player",
    example: "if ( IsPlayer( gun_owner ) ) ...",
    callOn: "",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity object that may be the player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isSentient",
    desc: "Checks whether this entity is a sentient, that is either an ai character or the player",
    example: "if ( IsSentient( vehicle.riders[j] ) ) ...",
    callOn: "",
    returnType: "",
    module: "Sentient",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity object that may be a sentient character",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "ambientPlay",
    desc: "Play the given piece of ambient sound.",
    example: "AmbientPlay( \"redsquare_dark\" );",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "ambient",
            desc: "Sound alias name. Must be a valid sound alias",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fadetime",
            desc: "Fade in time in seconds. If not used then the track will start immediately",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "ambientStop",
    desc: "Stops all ambient sounds (excluding the music track).",
    example: "AmbientStop( 2 );",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "fadetime",
            desc: "Fade out time in seconds. If not used then the sounds will stop immediately",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isWaitingOnSound",
    desc: "Checks if this entity is waiting on a sound notify",
    example: "if ( car IsWaitingOnSound() ) ...",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "musicPlay",
    desc: "Play the given piece of music.",
    example: "MusicPlay( \"redsquare_dark\", false );",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "music",
            desc: "The piece to play. Must be a valid sound alias",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "musicStop",
    desc: "Stop playing music.",
    example: "MusicStop( 3 );",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "time",
            desc: "The time over which the music will fade in seconds. If this option is not present then the music will stop immediately.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playLoopSound",
    desc: "Play a sound as a loop",
    example: "car PlayLoopSound( \"peugeot_idle_low\" );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "aliasname",
            desc: "The sound alias to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playSound",
    desc: "Play the sound alias as if coming from the entity",
    example: "self PlaySound(\"Dirt_skid\",\"skidsound\",true);",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "aliasname",
            desc: "The sound alias to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "notificationString",
            desc: "If present, the sound will notify this string on this entity when done. (Single player only)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "stoppableFlag",
            desc: "If present and true, then this sound can be interrupted by another playsound command with notification string.  It is a script error for a playsound that does not have this flag set to get interrupted by another playsound with notify, or for a playsound with notify that does not have this flag set to interrupt another playsound with notify. (Single player only)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playSoundAsMaster",
    desc: "Play the sound alias as if coming from the entity, as a master sound",
    example: "self PlaySoundAsMaster( \"Dirt_skid\", \"skidsound\", true );",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "aliasname",
            desc: "The sound alias to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "notificationString",
            desc: "If present, the sound will notify this string on this entity when done. (Single player only)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "stoppableFlag",
            desc: "If present and true, then this sound can be interrupted by another playsound command with notification string.  It is a script error for a playsound that does not have this flag set to get interrupted by another playsound with notify, or for a playsound with notify that does not have this flag set to interrupt another playsound with notify. (Single player only)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSoundBlend",
    desc: "Set the sound blend on a blend entity",
    example: "blend SetSoundBlend( \"Stalingrad_artillery_rumble_null\", \"Stalingrad_artillery_rumble\", 0.4 );",
    callOn: "<sound blend entity>",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "soundBlendEntity",
            desc: "",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "sound1",
            desc: "The first sound",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "sound2",
            desc: "The second sound",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "mix",
            desc: "The mix between the two sounds, a floating point number between 0 and 1",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "soundExists",
    desc: "Returns true if the sound alias exists",
    example: "if ( SoundExists( \"Dirt_skid\", \"skidsound\", true ) ) { ... }",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "aliasname",
            desc: "The sound alias to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "soundFade",
    desc: "Fades the sound out.",
    example: "SoundFade( 3 );",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "time",
            desc: "The time over which the sound will fade in seconds. If this option is not present then the music will stop immediately.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopLoopSound",
    desc: "Stop a looping sound",
    example: "car StopLoopSound();",
    callOn: "<entity> (entity) An entity",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "sound",
            desc: "Sound name.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "doSpawn",
    desc: "Spawns an actor from an actor spawner, if possible (the spawner won't spawn if the player is looking at the spawn point, or if spawning would cause a telefrag)",
    example: "spawned = driver DoSpawn( name );",
    callOn: "<actor> (entity) An actor spawner",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor spawner",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "targetname",
            desc: "sets the targetname of the spawned entity",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSpawnerArray",
    desc: "Returns an array of all of the spawners in a level.",
    example: "spawners = GetSpawnerArray();",
    callOn: "",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "getSpawnerTeamArray",
    desc: "Returns an array of all of the spawners in a level",
    example: "enemies = GetSpawnerTeamArray( \"axis\", \"neutral\" );",
    callOn: "",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "team",
            desc: "A team name, either 'axis', 'allies', or 'neutral'. Any number of additional team names may be added",
            type: "",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "placeSpawnPoint",
    desc: "Raises the spawn point up to make sure it's not in the ground, then drops it back down into the ground.",
    example: "spawnpoints[i] PlaceSpawnPoint();",
    callOn: "A spawn point",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A spawn point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "positionWouldTelefrag",
    desc: "Returns true if the passed in origin would telefrag a player if another player was spawned there.",
    example: "if ( PositionWouldTelefrag( spawnpoints[i].origin ) ) ...",
    callOn: "",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "position",
            desc: "The position of the potential spawn point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSpawnerTeam",
    desc: "Set the team for this spawner",
    example: "self SetSpawnerTeam( \"axis\" );",
    callOn: "<ai> (entity) An ai spawner",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "ai",
            desc: "An ai spawner",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "team",
            desc: "The team for this spawner. Either axis, allies or neutral",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "spawn",
    desc: "Spawns a new entity and returns a reference to the entity",
    example: "org = Spawn( \"script_origin\",self getorigin() );",
    callOn: "",
    returnType: "entity",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "classname",
            desc: "The name of the class to spawn",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The position where the entity is to be spawned",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "flags",
            desc: "spawn flags",
            type: "integer",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "radius",
            desc: "If the entity is a 'trigger_radius' entity then this is the radius of the trigger. Otherwise this parameter is invalid.",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "If the entity is a 'trigger_radius' entity then this is the height of the trigger. Otherwise this parameter is invalid.",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "spawnStruct",
    desc: "Allocates a structure",
    example: "ent = SpawnStruct();",
    callOn: "",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "spawnTurret",
    desc: "Spawns a new turret, eg MG42 or flak gun and returns a reference to it",
    example: "",
    callOn: "",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "classname",
            desc: "The classname of the entity",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The position of the vehicle",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weaponinfoname",
            desc: "The name of the weapon info to use for this turret",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "spawnVehicle",
    desc: "Spawns a new vehicle and returns a reference to it",
    example: "",
    callOn: "",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "modelname",
            desc: "The name of the model to spawn",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "targetname",
            desc: "vehicle target name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "vehicletype",
            desc: "vehicle type",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The position of the vehicle",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angles",
            desc: "The angle to spawn the vehicle at vector",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stalingradSpawn",
    desc: "Force spawns an actor from an actor spawner, reguardless of whether the spawn point is in sight or if the spawn will cause a telefrag",
    example: "spawned = driver StalingradSpawn( name );",
    callOn: "<actor> (entity) An actor spawner",
    returnType: "",
    module: "Spawn",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "actor",
            desc: "An actor spawner",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "targetname",
            desc: "sets the targetname of the spawned entity",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSubStr",
    desc: "Returns the substring of characters >= <start index> and < <end index>. <end index> is optional.",
    example: "",
    callOn: "",
    returnType: "",
    module: "String",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The input string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "startIndex",
            desc: "The start index of the substring",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "endIndex",
            desc: "The end index of the substring",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isSubStr",
    desc: "Returns true/false if <substring> is a substring of <string>. Case sensitive.",
    example: "",
    callOn: "",
    returnType: "",
    module: "String",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The input string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "substring",
            desc: "The substring",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "strTok",
    desc: "Tokenizes <string> by the delimiters <delim>. Returns the array of string tokens.",
    example: "",
    callOn: "",
    returnType: "",
    module: "String",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The input string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "delim",
            desc: "The delimiter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "toLower",
    desc: "Converts <string> to a lower case string which is returned.",
    example: "",
    callOn: "",
    returnType: "",
    module: "String",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The input string to be converted",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "logPrint",
    desc: "Prints to the server log file.",
    example: "",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "string",
            desc: "The string to write to the log file.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "resetTimeout",
    desc: "Resets the infinite loop check timer, to prevent an incorrect infinite loop error when a lot of script must be run",
    example: "ResetTimeout();",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "setArchive",
    desc: "Enables or disables archived snapshot on server (required for killcam).",
    example: "setArchive(1);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "integer",
            desc: "The integer either 1 or 0.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTeamPlayersAlive",
    desc: "Returns the number of players still alive on a given team",
    example: "",
    callOn: "",
    returnType: "",
    module: "Teams",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "team",
            desc: "A string value, either 'axis' or 'allies'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTeamScore",
    desc: "Get a team's score",
    example: "if ( GetTeamScore( \"allies\" ) > getTeamScore(\"axis\") ) ...",
    callOn: "",
    returnType: "",
    module: "Teams",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "team",
            desc: "The name of a team. Must be either 'axis' or 'allies'.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTeamScore",
    desc: "Set a team's score",
    example: "SetTeamScore( \"allies\", 100 )",
    callOn: "",
    returnType: "",
    module: "Teams",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "team",
            desc: "The name of a team. Must be either 'axis' or 'allies'.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "score",
            desc: "The new team score",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "bulletTrace",
    desc: "Allows script to do a point trace with MASK_SHOT. Returns hit position, hit entity, hit surface normal.",
    example: "trace = BulletTrace( magicBulletOrigin.origin, eyePos, true, undefined );",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "start",
            desc: "The bullet start point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "The bullet end point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hitCharacters",
            desc: "When set to true, this will trace for character hits",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreEntity",
            desc: "An entity to ignore",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "bulletTracePassed",
    desc: "Allows script to do a point trace with MASK_SHOT. Returns true if trace complete, else returns false.",
    example: "success = BulletTracePassed( magicBulletOrigin.origin, eyePos, true, undefined);",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "start",
            desc: "The bullet start point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "The bullet end point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hitCharacters",
            desc: "When set to true, this will trace for character hits",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreEntity",
            desc: "An entity to ignore",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "physicsTrace",
    desc: "Physics trace, ignoring characters. Returns the endpos vector.",
    example: "endpos = PhysicsTrace( start, end );",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "start",
            desc: "The start point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "The end point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sightTracePassed",
    desc: "Allows script to do a point trace with MASK_OPAQUE_AI. Returns true if trace complete, else returns false.",
    example: "success = SightTracePassed( magicBulletOrigin.origin, eyePos, true, undefined );",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "start",
            desc: "The sight start point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "The sight end point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hitCharacters",
            desc: "When set to true, this will trace for character hits",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreEntity",
            desc: "An entity to ignore",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clientClaimTrigger",
    desc: "Claim a single user trigger.",
    example: "other ClientClaimTrigger( self );",
    callOn: "A Client",
    returnType: "",
    module: "Triggers",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Client",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "trigger",
            desc: "A trigger entity.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clientReleaseTrigger",
    desc: "Release a single user trigger.",
    example: "other ClientReleaseTrigger( self );",
    callOn: "A Client",
    returnType: "",
    module: "Triggers",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Client",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "trigger",
            desc: "A trigger entity.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "releaseClaimedTrigger",
    desc: "Release a currently claimed trigger",
    example: "",
    callOn: "A Trigger",
    returnType: "",
    module: "Triggers",
    supportedAt: "",
    games: ['CoD2 MP'],
    parameters: [
        {
            name: "",
            desc: "A Trigger",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearTargetEntity",
    desc: "Clears the current target for this turret.",
    example: "roof_mg42 ClearTargetEntity();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTurretOwner",
    desc: "Gets the \"owner\" of this turret",
    example: "mg42user = roof_mg42 GetTurretOwner();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTurretTarget",
    desc: "Gets the current target of this turret",
    example: "target = roof_mg42 GetTurretTarget();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isFiringTurret",
    desc: "Checks whether this turret is firing. The entity must be a turret",
    example: "mg42 IsFiringTurret();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeTurretUnusable",
    desc: "Sets a turret to be unable to be used",
    example: "roof_mg42 MakeTurretUnusable();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeTurretUsable",
    desc: "Sets a turret able to be used",
    example: "roof_mg42 MakeTurretUsable();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "restoreDefaultDropPitch",
    desc: "Restores the pitch of the turret when it drops to the ground.\nRecalculates based on current collision environment.\nUse this if you move a turret and need to reconfigure.",
    example: "turret RestoreDefaultDropPitch();",
    callOn: "<turret> the turret which you wish to set the drop pitch on.",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "the turret which you wish to set the drop pitch on.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAISpread",
    desc: "Sets the spread of this turret when used by an AI",
    example: "roof_mg42 SetAISpread( 0.2 );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "spread",
            desc: "The spread of the turret in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBottomArc",
    desc: "Set the amount that the turret can pivot down",
    example: "mg42 SetBottomArc( 45 );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "angle",
            desc: "The bottom arc in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setConvergenceTime",
    desc: "Sets the time that a turret takes to converge to its target, on either the pitch or yay planes.",
    example: "roof_mg42 SetConvergenceTime( 2.0, \"yaw\" );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "convergenceTime",
            desc: "The time that the turret takes to converge in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "type",
            desc: "the type of convergence. Can be either 'pitch' or 'yaw'. If not set then the default is 'yaw'",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setDefaultDropPitch",
    desc: "Set the default drop pitch that the turret attempts to return to when it is not in use.",
    example: "turret SetDefaultDropPitch( -90 );",
    callOn: "<turret> the turret which you wish to set the drop pitch on.",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "the turret which you wish to set the drop pitch on.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "pitch",
            desc: "yaw of the turret (side to side) in degrees.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLeftArc",
    desc: "Set the amount that the turret can move to the left",
    example: "mg42 SetLeftArc( 45 );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "angle",
            desc: "The left arc in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setMode",
    desc: "Set the mode of a turret.",
    example: "mg42 SetMode( \"auto_ai\" );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "mode",
            desc: "The turret mode. Possible modes are \"auto_ai\", \"manual\", \"manual_ai\" and \"auto_nonai",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setPlayerSpread",
    desc: "Sets the spread of this turret when used by the player",
    example: "roof_mg42 SetPlayerSpread( 0.2 );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "spread",
            desc: "The spread of the turret in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setRightArc",
    desc: "Set the amount that the turret can move to the right",
    example: "mg42 SetRightArc( 4 5);",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "angle",
            desc: "The right arc in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSuppressionTime",
    desc: "Sets the time that a turret uses supressing fire after losing sight of an enemy",
    example: "roof_mg42 SetSuppressionTime( 1.0 );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "supressionTime",
            desc: "The time that the turret will supress an unseen enemy in seconds",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTargetEntity",
    desc: "Sets the target of this turret",
    example: "roof_mg42 SetTargetEntity( target );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "target",
            desc: "the turret target",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTopArc",
    desc: "Set the amount that the turret can pivot up",
    example: "mg42 SetTopArc( 45 );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "angle",
            desc: "The top arc in degrees",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretIgnoreGoals",
    desc: "Sets the ignoreGoals flag for the turret.",
    example: "roof_mg42 SetTurretIgnoreGoals( true );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "ignoreGoals",
            desc: "If this is true then any actor on this turret will ignore his goals, and continue to use the turret. This is useful for vehicle based turrets.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretTeam",
    desc: "Sets the team of a turret",
    example: "roof_mg42 SetTurretTeam( \"axis\" );",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "team",
            desc: "The turret's \"team\" (string) either \"axis\" or \"allies\"",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "shootTurret",
    desc: "Shoots a turret",
    example: "roof_mg42 ShootTurret();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "startFiring",
    desc: "Starts a turret firing",
    example: "mg42 StartFiring();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopFiring",
    desc: "Stops a turret firing",
    example: "mg42 StopFiring();",
    callOn: "<turret> (entity) The turret entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "turret",
            desc: "The turret entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isDefined",
    desc: "Checks whether this entity/variable is defined",
    example: "if ( IsDefined( gun_owner ) ) ...",
    callOn: "",
    returnType: "",
    module: "Variables",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "object",
            desc: "object that may or may not be defined",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isString",
    desc: "Checks whether this entity/variable is a string",
    example: "if ( IsString( gun_owner ) ) ...",
    callOn: "",
    returnType: "",
    module: "Variables",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "variable",
            desc: "variable that may or may not be a string",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "anglesToForward",
    desc: "Returns the forward vector corresponding to a set of angles.",
    example: "forward = AnglesToForward( forward );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "angles",
            desc: "A set of angles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "anglesToRight",
    desc: "Returns the right vector corresponding to a set of angles.",
    example: "right = AnglesToRight( angles );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "angles",
            desc: "A set of angles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "anglesToUp",
    desc: "Returns the up vector corresponding to a set of angles.",
    example: "up = AnglesToUp( angles );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "angles",
            desc: "A set of angles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "closer",
    desc: "Tests which of two points is the closest. Returns true if point a is closer to the reference than point b",
    example: "if( Closer( center, models[j].origin , models[i].origin ) ) ...",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "reference",
            desc: "The base position",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "pointA",
            desc: "The first point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "pointB",
            desc: "The second point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "distance",
    desc: "Returns the distance between two points",
    example: "dist = Distance( org, ai[i].origin );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "point1",
            desc: "The first point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "point2",
            desc: "The second point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "distanceSquared",
    desc: "Returns the squared distance between two points - this is cheaper than the actual distance as it doesn't involve a square root",
    example: "dist2 = DistanceSquared( models[j].origin, center );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "point1",
            desc: "The first point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "point2",
            desc: "The second point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "length",
    desc: "Returns the length of the given vector",
    example: "dist = Length( models[j].origin - center );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vector",
            desc: "A vector",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "lengthSquared",
    desc: "Returns the squared vector length for the given vector - this is cheaper than the actual vector length as it doesn't involve a square root",
    example: "dist2 = LengthSquared( models[j].origin - center );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vector",
            desc: "A vector",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "vectorDot",
    desc: "Returns the dot product of two vectors",
    example: "",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vectorA",
            desc: "The first vector",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "vectorB",
            desc: "The second vector",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "vectorNormalize",
    desc: "Returns a normalized copy of this vector",
    example: "difference = VectorNormalize( end - start );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vector",
            desc: "The vector to normalize",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "vectorToAngles",
    desc: "Returns a set of angles corresponding to the given vector.",
    example: "angles = VectorToAngles( end - start );",
    callOn: "",
    returnType: "",
    module: "Vector",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vector",
            desc: "The vector to convert to angles",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "addVehicleToCompass",
    desc: "Add this vehicle to the compass.",
    example: "self AddVehicleToCompass();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "attachPath",
    desc: "Attaches this vehicle to the given path.",
    example: "bomber AttachPath( aBomberPaths[i] );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "nodeIndex",
            desc: "A node on the path to attach.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearTurretTarget",
    desc: "Clear the target for the vehicle turret.",
    example: "eTank ClearTurretTarget();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "fireTurret",
    desc: "Fire the vehicle's turret",
    example: "self FireTurret();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "freeVehicle",
    desc: "Frees this vehicle instance.",
    example: "self FreeVehicle();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSpeed",
    desc: "Gets the current speed in inches per second.",
    example: "self GetSpeed();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSpeedMPH",
    desc: "Gets the current speed in miles per hour.",
    example: "self GetSpeedMPH();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getVehicleOwner",
    desc: "Returns the owner of this particular vehicle.",
    example: "eFlak88user = eFlak88 GetVehicleOwner();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWheelSurface",
    desc: "Returns the surface type of the given wheel as a string.",
    example: "surface = self GetWheelSurface( side );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "wheel",
            desc: "The wheel position, can be 'front_left', 'front_right', 'back_left', 'back_right', 'middle_left', 'middle_right'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isTurretReady",
    desc: "Query whether this vehicle's turret is ready for firing",
    example: "while ( level.playertank IsTurretReady() != true ) ...",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "joltBody",
    desc: "Jolts the vehicle.",
    example: "self JoltBody( (self.origin + (0,0,64)), 0.5 );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "joltPosition",
            desc: "The position of the jolt",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "intensity",
            desc: "The intensity of the jolt",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "speedFrac",
            desc: "A speed fraction to apply to the jolt. Most be betweeon 0 and 1.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "deceleration",
            desc: "The deceleration to apply to this vehicle in miles per hour per second.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeVehicleUnusable",
    desc: "Sets this vehicle to be not usable by the player",
    example: "car MakeVehicleUnusable();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeVehicleUsable",
    desc: "Sets this vehicle to be usable by the player",
    example: "nFlak MakeVehicleUsable();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeVehicleUsable",
    desc: "Sets this vehicle to be usable by the player",
    example: "nFlak MakeVehicleUsable();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "resumeSpeed",
    desc: "Sets the vehicle to resume its path speed.",
    example: "level.tank ResumeSpeed( 3 );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "acceleration",
            desc: "The acceleration to apply to this vehicle in miles per hour per second.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSpeed",
    desc: "Sets the speed and acceleration for this vehicle.",
    example: "self SetSpeed( 60, 15, 5 );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "speed",
            desc: "The speed of the vehicle in miles per hour",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "acceleration",
            desc: "The acceleration of the vehicle in miles per hour per second",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "message",
            desc: "Message",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSwitchNode",
    desc: "Sets a switch node for this vehicle.",
    example: "tank2 SetSwitchNode( tank2snode1, tank2snode2 );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "sourceNode",
            desc: "The switch source node",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "destNode",
            desc: "The switch destination node.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretTargetEnt",
    desc: "Set the target entity for this vehicle turret.",
    example: "eFlak88 SetTurretTargetEnt( eFlaktarget, eFlaktarget.origin );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "targetEntity",
            desc: "The target.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "targetOffset",
            desc: "The target offset.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretTargetVec",
    desc: "Set the target position for this vehicle turret.",
    example: "level.flak1 SetTurretTargetVec( vec1 );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "targetPosition",
            desc: "The position of the target",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVehicleLookAtText",
    desc: "Set look at text for vehicle.",
    example: "",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "lookatTextLine1",
            desc: "The unlocalized look at text for this vehicle. Line is green and usually a name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "lookatTextLine2",
            desc: "The localized look at text for this vehicle. Line is white and usually a type",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVehicleTeam",
    desc: "Set which team a vehicle is on.",
    example: "",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "team",
            desc: "The team name. Must be either \"allies\", \"axis\", or \"none\".",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWaitNode",
    desc: "Sets a wait node for this vehicle.",
    example: "self SetWaitNode( pathspot );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "waitNode",
            desc: "The node for the vehicle to wait at",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWaitSpeed",
    desc: "Sets a the wait speed for for this vehicle in miles per hour.",
    example: "self SetWaitSpeed( 5 );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "waitSpeed",
            desc: "The wait speed for the vehicle.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "startEngineSound",
    desc: "Start the engine sound for this vehicle.",
    example: "truck StartEngineSound();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "startPath",
    desc: "Starts the vehicle following this path.",
    example: "bomber StartPath( aBomberPaths[i] );",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "nodeIndex",
            desc: "A node on the path to attach.",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopEngineSound",
    desc: "Start the engine sound for this vehicle.",
    example: "truck StopEngineSound();",
    callOn: "<vehicle> (entity) The vehicle entity",
    returnType: "",
    module: "Vehicles",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "vehicle",
            desc: "The vehicle entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "bulletSpread",
    desc: "uses spread to return a new end position",
    example: "endpos = BulletSpread( self.origin, target.origin, 1.0 )",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "start",
            desc: "The bullet starting point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "The bullet ending point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "spread",
            desc: "Amount of spread",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "bulletTracer",
    desc: "creates a bullet tracer from the start to end point",
    example: "BulletTracer( self.origin, target.origin )",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "start",
            desc: "The starting point bullet tracer",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "end",
            desc: "The end point bullet tracer",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableGrenadeBounce",
    desc: "Disallow grenades bouncing off of this entity",
    example: "self DisableGrenadeBounce();",
    callOn: "<entity> (entity) A damage trigger entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "A damage trigger entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableGrenadeTouchDamage",
    desc: "Disable grenade damage for damage triggers",
    example: "self DisableGrenadeTouchDamage();",
    callOn: "<entity> (entity) A damage trigger entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "A damage trigger entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableGrenadeBounce",
    desc: "Allow grenades to bounce off of this entity",
    example: "self EnableGrenadeBounce();",
    callOn: "<entity> (entity) A damage trigger entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "A damage trigger entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableGrenadeTouchDamage",
    desc: "enable grenade damage for damage triggers",
    example: "self EnableGrenadeTouchDamage();",
    callOn: "<entity> (entity) A damage trigger entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "entity",
            desc: "A damage trigger entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAmmoCount",
    desc: "Get the remaining ammo",
    example: "GetAmmoCount( \"mosin_nagant_sniper\" );",
    callOn: "<player> (entity) The player entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "player",
            desc: "The player entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponName",
            desc: "The weapon name.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponModel",
    desc: "Returns the name of the weapon model used for the given weapon.",
    example: "sniper_model = GetWeaponModel(\"mosin_nagant_sniper\", 0);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP', 'CoD2 MP'],
    parameters: [
        {
            name: "weaponName",
            desc: "The name of the weapon.",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "magicBullet",
    desc: "Fire a 'magic bullet', from the source location towards the destination point.",
    example: "MagicBullet( \"mosin_nagant_sniper\", self.origin, target.origin )",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "weaponName",
            desc: "The name of the weapon",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "sourceLoc",
            desc: "The bullet tracer starting point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "destLoc",
            desc: "The end point",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "magicGrenade",
    desc: "Magic grenade",
    example: "guy magicGrenade(start, end, timer);",
    callOn: "Player",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "",
            desc: "Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "origin",
            desc: "Origin",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "targetPosition",
            desc: "Target position",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "timeToBlow",
            desc: "Time to blow",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "magicGrenadeManual",
    desc: "Magic grenade",
    example: "spawn magicGrenadeManual(org, velocity, 3.5);",
    callOn: "Player",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 SP'],
    parameters: [
        {
            name: "",
            desc: "Player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "origin",
            desc: "Origin",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "velocity",
            desc: "Velocity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "timeToBlow",
            desc: "Time to blow",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

