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
            name: "player",
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
            name: "player",
            desc: "",
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
            name: "player",
            desc: "",
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
            name: "player",
            desc: "",
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
            name: "player",
            desc: "",
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
            name: "player",
            desc: "",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "entity",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "entity",
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
            name: "entity",
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
            name: "hud",
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
            name: "hud",
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
            name: "hud",
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
            name: "hud",
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
            name: "player",
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
            name: "player",
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
            name: "player",
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
            name: "player",
            desc: "Player",
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
            name: "entity",
            desc: "",
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
            name: "player",
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
            name: "entity",
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
            name: "player",
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
            name: "player",
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
            name: "entity",
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
            name: "player",
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
            name: "player",
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



// =================================================================================
// zk_libcod additions — generated from /zk_libcod/doc/script_reference/libcod/
// Source: https://github.com/ibuddieat/zk_libcod
// 326 functions across 19 modules
// =================================================================================

// ---- Animation (4 functions) ----

defs.push(new CodFunction({
    name: "getTagAngles",
    desc: "Gets the angles of a particular tag on this model\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/animation/gettagangles.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/animation/gettagangles.htm)",
    example: "headang = self getTagAngles(\"j_head\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "tagname",
            desc: "The name of the tag",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTagOrigin",
    desc: "Gets the origin of a particular tag on this model\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/animation/gettagorigin.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/animation/gettagorigin.htm)",
    example: "headorg = self getTagOrigin(\"j_head\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "tagname",
            desc: "The name of the tag",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playScriptAnimation",
    desc: "Plays an animation on the player, based on the current player state. Returns the animation time or -1 if invalid. The animation is interrupted by other animations (e.g., when the player moves).\n\n*libcod note:* libcod renamed `runScriptAnimation()` → `playScriptAnimation()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/animation/playscriptanimation.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/animation/playscriptanimation.htm)",
    example: "deathAnimDuration = self playScriptAnimation(1, 0, 1); self [[level.callbackPlayerKilled]](eInflictor, eAttacker, iDamage, sMeansOfDeath, sWeapon, vDir, sHitLoc, psOffsetTime, deathAnimDuration);",
    callOn: "<player> The player",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "eventId",
            desc: "The event id to use for the animation (e.g., 1 for death animations)",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "isContinue",
            desc: "The isContinue flag",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "force",
            desc: "The force flag",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAnimation",
    desc: "Forces a 3rd-person (world model) animation to be played on the player. Valid animation names can be found in mp\\playeranim.script and animtrees\\multiplayer.atr (see iw_07.iwd). Use 'none' to reset.\n\n*libcod note:* libcod renamed `play_anim()` → `setAnimation()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/animation/setanimation.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/animation/setanimation.htm)",
    example: "player setAnimation(\"pb_crouch_run_forward\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Animation",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "animation",
            desc: "The animation to play",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Bots (13 functions) ----

defs.push(new CodFunction({
    name: "fireWeapon",
    desc: "Order the bot to shoot.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/fireweapon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/fireweapon.htm)",
    example: "bot fireWeapon(true);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "Is bot shooting. True or false",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "meleeWeapon",
    desc: "Order the bot to melee.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/meleeweapon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/meleeweapon.htm)",
    example: "bot meleeWeapon(true);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "Is bot meleeing. True or false",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "reloadWeapon",
    desc: "Order the bot to reload the weapon.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/reloadweapon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/reloadweapon.htm)",
    example: "bot reloadWeapon(true);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "Is bot reloading. True or false",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "resetTestClientNaming",
    desc: "Reenables the stock test client naming scheme after the use of setNextTestClientName().\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/resettestclientnaming.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/resettestclientnaming.htm)",
    example: "setNextTestClientName(\"Unknown Soldier\"); ent = addTestClient(); resetTestClientNaming();",
    callOn: "",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "setAim",
    desc: "Order the bot to simulate a right mouse-click. Keep it set to true until the bot should zoom out again.\n\n*libcod note:* libcod renamed `adsAim()` → `setAim()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/setaim.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/setaim.htm)",
    example: "bot setAim(true);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "Is bot aiming. True or false",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBotStance",
    desc: "Set the bot's stance.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/setbotstance.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/setbotstance.htm)",
    example: "bot setBotStance(\"stand\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "stance",
            desc: "Bot's stance. Can be: 'stand', 'crouch', 'prone', 'jump'",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLean",
    desc: "Order the bot to lean in the specified direction.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/setlean.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/setlean.htm)",
    example: "bot setLean(\"left\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "direction",
            desc: "Where the bot should lean. Can be: 'left', 'right', 'none'",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setNextTestClientName",
    desc: "Defines the name of the next test client. Must be called before calling addTestClient() to take effect. Use resetTestClientNaming() to revert to the stock naming scheme.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/setnexttestclientname.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/setnexttestclientname.htm)",
    example: "setNextTestClientName(\"Unknown Soldier\"); ent = addTestClient();",
    callOn: "",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "name",
            desc: "The name the next test client will have",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWalkDir",
    desc: "Order the bot to move in the specified direction.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/setwalkdir.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/setwalkdir.htm)",
    example: "bot setWalkDir(\"forward\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "direction",
            desc: "Where the bot should move. Can be: 'forward', 'left', 'right', 'back', 'none'",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWalkValues",
    desc: "Order the bot to move in the specified direction.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/setwalkvalues.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/setwalkvalues.htm)",
    example: "bot setWalkValues(127, 127);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "forward_count",
            desc: "Forward direction of where the bot should move. Valid values: -128 - 127",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "right_count",
            desc: "Right direction of where the bot should move. Valid values: -128 - 127",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "switchToWeaponId",
    desc: "Order the bot to switch its weapon to the weapon with the specified ID.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/switchtoweaponid.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/switchtoweaponid.htm)",
    example: "bot switchToWeaponId(0);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "id",
            desc: "ID of weapon to switch to. Get the weapon ID with getLoadedWeapons",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "throwGrenade",
    desc: "Order the bot to throw a grenade. Requires the bot to have a grenade available in its inventory.\n\n*libcod note:* libcod renamed `throwNade()` → `throwGrenade()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/throwgrenade.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/throwgrenade.htm)",
    example: "bot throwGrenade(true);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "Is bot throwing grenade. True or false",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "throwSmokeGrenade",
    desc: "Order the bot to throw a smoke grenade. Requires the bot to have a smoke grenade available in its inventory.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/bots/throwsmokegrenade.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/bots/throwsmokegrenade.htm)",
    example: "bot throwSmokeGrenade(true);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Bots",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "Is bot throwing smoke grenade. True or false",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Damage (1 functions) ----

defs.push(new CodFunction({
    name: "finishPlayerDamage",
    desc: "Does damage to a player - usually as part of the damage callback. In comparison to the stock method, the last (optional) parameter is new.\n\n*libcod note:* got one more parameter to toggle bullet impact events\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/damage/finishplayerdamage.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/damage/finishplayerdamage.htm)",
    example: "self finishPlayerDamage(eInflictor, eAttacker, iDamage, iDFlags, sMeansOfDeath, sWeapon, vPoint, vDir, sHitLoc, psOffsetTime, bulletImpacts);",
    callOn: "<entity> A client",
    returnType: "",
    module: "Damage",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "A client",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "Inflictor",
            desc: "The entity that causes the damage (e.g., a turret)",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "Attacker",
            desc: "The entity that is attacking",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "Damage",
            desc: "Integer specifying the amount of damage done",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "DamageFlags",
            desc: "Integer specifying flags that are to be applied to the damage",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "MeansOfDeath",
            desc: "String specifying the method of death",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "Weapon",
            desc: "String specifying the weapon used to inflict the damage",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "Point",
            desc: "Vector specifying the position of the damage",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "Direction",
            desc: "Vector specifying the direction of the damage",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "HitLoc",
            desc: "String specifying the location (body part) of the hit",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "OffsetTime",
            desc: "Integer specifying the time offset for the damage",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "BulletImpacts",
            desc: "Boolean specifying whether to emit a bullet impact event",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Debug (1 functions) ----

defs.push(new CodFunction({
    name: "getCallStack",
    desc: "Returns the current call stack, which is an array consisting of filename and line number pairs. The first two elements describe the call to getCallStack() itself.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/debug/getcallstack.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/debug/getcallstack.htm)",
    example: "stack = getCallStack(); logPrintConsole(\"Call stack:\\n\"); for(i = 0; i Line \" + stack[i + 1] + \" in \" + stack[i] + \"\\n\");",
    callOn: "",
    returnType: "",
    module: "Debug",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

// ---- Effects (4 functions) ----

defs.push(new CodFunction({
    name: "playFxForPlayer",
    desc: "Play this effect, visible for this player only. Returns the (temporary) effect entity.\n\n*libcod note:* now returns the (temporary) effect entity\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/effects/playfxforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/effects/playfxforplayer.htm)",
    example: "self playFxForPlayer(game[\"fire\"], origin);",
    callOn: "<player> The player",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "effectId",
            desc: "The effect id returned by loadfx",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "positionOfEffect",
            desc: "The world position of the effect",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "forwardVector",
            desc: "The forward vector of the effect",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "upVector",
            desc: "The up vector of the effect",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playFxOnTagForPlayer",
    desc: "Play this effect on the entity and tag, visible for this player only.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/effects/playfxontagforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/effects/playfxontagforplayer.htm)",
    example: "self playFxOnTagForPlayer(game[\"fire\"], ent, tag);",
    callOn: "<player> The player",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "effectId",
            desc: "The effect id returned by loadfx",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "entity",
            desc: "The entity to attach the effect to",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "tagName",
            desc: "Tag name to attach the effect to",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCullFogForPlayer",
    desc: "Sets the amount of fog in the distance, for the given player only. The fog will increase linearly. Please note that visibility traces through fog only take the global fog settings (see SetCullFog) into account.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/effects/setcullfogforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/effects/setcullfogforplayer.htm)",
    example: "self setCullFogForPlayer(0, 16500, 0.7, 0.85, 1.0, 0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "nearDistance",
            desc: "Distance from the camera that the fog will start",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "farDistance",
            desc: "Distance from the camera that full occlusion will occur",
            type: "int",
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
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setExpFogForPlayer",
    desc: "Creates an exponential fog, for the given player only. Density must be greater than 0 and less than 1, and typically less than .001. For example, .0002 means the fog gets .02% more dense for every 1 unit of distance (about 1% thicker every 50 units of distance). Please note that visibility traces through fog only take the global fog settings (see SetExpFog) into account.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/effects/setexpfogforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/effects/setexpfogforplayer.htm)",
    example: "self setExpFogForPlayer(0.0001144, 131/255, 116/255, 71/255, 0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Effects",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "density",
            desc: "The density increase for each world unit of distance",
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
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Entity (26 functions) ----

defs.push(new CodFunction({
    name: "addEntityVelocity",
    desc: "Add velocity to the entity's velocity. Requires the use of enableGravity prior to the use of this method. Returns true on success, false if gravity is not enabled and undefined if the entity is not a script_model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/addentityvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/addentityvelocity.htm)",
    example: "e addEntityVelocity((0, 0, 100));",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "velocity",
            desc: "Velocity (vector) to add to the entity's velocity",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "disablebounce",
    desc: "Disables bouncing for a gravity-enabled entity. Requires the use of enableGravity prior to the use of this method. Returns true on success, else false (gravity not enabled) or undefined if the entity is not a script_model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/disablebounce.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/disablebounce.htm)",
    example: "e disablebounce();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableGravity",
    desc: "Disables gravity for a gravity-enabled script_model (see enableGravity). Sets the entity clip mask to zero. Returns true on success, false if gravity is not enabled and undefined if the entity is not a script_model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/disablegravity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/disablegravity.htm)",
    example: "e disableGravity();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableBounce",
    desc: "Enables gravity bouncing like grenades. Requires the use of enableGravity prior to the use of this method. A script notify with string 'bounce' is emit for the entity when bouncing, with the surface type as first and the ground entity as second parameter. Returns true on success, else false (gravity not enabled) or undefined if the entity is not a script_model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/enablebounce.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/enablebounce.htm)",
    example: "// If self is a player: e = spawn(\"script_model\", self.origin + (0, 0, 256)); e setModel(\"xmodel/prop_bear_detail_sitting\"); // Needs to be precached e enableGravity(); e enableBounce();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "parallelBounce",
            desc: "",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "perpendicularBounce",
            desc: "",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "parallelBounce",
            desc: "Parallel bounce factor (float). Default: 0.5",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "perpendicularBounce",
            desc: "Perpendicular bounce factor (float). Default: 0.25",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableGravity",
    desc: "Enables gravity similar to MoveGravity, but continuously and with collision. The initial maximum entity velocity is 8192 units per second (see setMaxEntityVelocity). A script notify with string 'land' is emit for the entity when landing, with the surface type as first and the ground entity as second parameter. Returns true on success or undefined if the entity is not a script_model. The following script methods will disable gravity (see disableGravity) automatically if called on the entity:\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/enablegravity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/enablegravity.htm)",
    example: "// If self is a player: e = spawn(\"script_model\", self.origin + (0, 0, 256)); e setModel(\"xmodel/prop_bear_detail_sitting\"); // Needs to be precached e enableGravity();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "collideModels",
            desc: "",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "withRotation",
            desc: "",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "collideModels",
            desc: "Flag stating whether to also collide with other script_models. Default: True",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "withRotation",
            desc: "Flag stating whether to also apply rotation to the target entity's angles. Default: True",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClipmask",
    desc: "Returns the entity's clip mask (integer).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getclipmask.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getclipmask.htm)",
    example: "clipmask = self getClipmask();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getContents",
    desc: "Returns the contents mask (integer) of an entity. If present, returns overriden player contents mask set via overrideContents.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getcontents.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getcontents.htm)",
    example: "contents = self getContents();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEntityVelocity",
    desc: "Gets the entity's velocity (vector). Requires the use of enableGravity prior to the use of this method, else, or if the entity is not a script_model, returns undefined.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getentityvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getentityvelocity.htm)",
    example: "vel = e getEntityVelocity();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getItemQuantity",
    desc: "Returns the quantity of an ammo or health entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getitemquantity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getitemquantity.htm)",
    example: "ent = spawn(\"item_health_small\", origin); // Precached item quantity = ent getItemQuantity();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getMaxEntityVelocity",
    desc: "Gets the entity's maximum velocity in units per second. Requires the use of enableGravity prior to the use of this method, else, or if the entity is not a script_model, returns undefined.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getmaxentityvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getmaxentityvelocity.htm)",
    example: "vel = e getMaxEntityVelocity();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getVmax",
    desc: "Returns the maximum boundary coordinates (vector) of an entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getvmax.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getvmax.htm)",
    example: "maxs = ent getVmax();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getVmin",
    desc: "Returns the minimum boundary coordinates (vector) of an entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/getvmin.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/getvmin.htm)",
    example: "mins = ent getVmin();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "hasTag",
    desc: "Returns whether the entity has the specified tag or not. Also returns zero if the entity has an invalid or no model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/hastag.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/hastag.htm)",
    example: "tag = \"tag_flash\"; if(ent hasTag(tag)) playFxOnTag(game[\"muzzleflash\"], ent, tag);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "tagname",
            desc: "The name of the tag",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "hideFromPlayer",
    desc: "Hide the entity from a given client.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/hidefromplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/hidefromplayer.htm)",
    example: "",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "The player to hide the entity from.",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isGravityEnabled",
    desc: "Returns whether the given entity is a gravity-enabled script_model (see enableGravity).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/isgravityenabled.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/isgravityenabled.htm)",
    example: "with_gravity = e isGravityEnabled();",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isLinkedTo",
    desc: "Returns the parent entity to which self is linked. Returns undefined if self is not linked.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/islinkedto.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/islinkedto.htm)",
    example: "if(isDefined(self isLinkedTo())) self iprintLnBold(\"Already linked!\");",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "notSolidForPlayer",
    desc: "Unsets the solid flag so that this object is no longer collidable, for the specified player. Requires the brush model collision tweak system to be enabled using the g_brushModelCollisionTweaks dvar. Resets on map load or a fast_restart.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/notsolidforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/notsolidforplayer.htm)",
    example: "platform = getEnt(\"platform\", \"targetname\"); platform notSolidForPlayer(player);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "The player for which the object should no longer be solid for",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAlive",
    desc: "Enables damage feedback for non-player entities.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setalive.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setalive.htm)",
    example: "self setAlive(1); self waittill(\"damage\", dmg, attacker);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "alive",
            desc: "Integer 1 for alive or 0 for dead",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBounds",
    desc: "Sets the collision bounds of a model. Each of the three parameters extends into both positive and negative offset on the respective axis, with the model's origin in the middle.\n\n*libcod note:* now requires three parameters, instead of two\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setbounds.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setbounds.htm)",
    example: "model setBounds(16, 16, 16);",
    callOn: "<entity> An entity (script_model)",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity (script_model)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "length",
            desc: "Length of the bounds",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "width",
            desc: "Width of the bounds",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "height",
            desc: "Height of the bounds",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setClipmask",
    desc: "Sets the entity's clip mask.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setclipmask.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setclipmask.htm)",
    example: "e setClipmask(1); // Solid only",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "clipMask",
            desc: "Brushes/entities with this content mask value (integer) will be collided against",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setEntityVelocity",
    desc: "Set the entity's velocity. Requires the use of enableGravity prior to the use of this method. Returns true on success, false if gravity is not enabled and undefined if the entity is not a script_model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setentityvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setentityvelocity.htm)",
    example: "e setEntityVelocity((-400, 0, 100));",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "velocity",
            desc: "The entity's velocity (vector)",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setHintString",
    desc: "Sets the hint string for a usable entity. Calling this on a trigger_radius entity will transform it to a trigger_use_touch entity that also triggers on touch only.\n\n*libcod note:* now also supports trigger_radius entities\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/sethintstring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/sethintstring.htm)",
    example: "fuel_lever setHintString( &\"ROCKET_FUEL_LEVER\" );",
    callOn: "<trigger> A trigger",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "trigger",
            desc: "A trigger",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "string",
            desc: "The string to use for a hint near a usable entity",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setItemQuantity",
    desc: "Sets the quantity for an ammo or health entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setitemquantity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setitemquantity.htm)",
    example: "quantity = 10; ent = spawn(\"item_health_small\", origin); // Precached item ent setItemQuantity(quantity);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "quantity",
            desc: "New quantity to set",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setLight",
    desc: "Sets the dynamic light value for entities of type script_model. Visible in DirectX 9 mode only and with dynamic lights enabled (see the r_rendererInUse, r_rendererPreference and r_dlightLimit client dvars).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setlight.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setlight.htm)",
    example: "// If self is a player: e = spawn(\"script_model\", self.origin); e linkTo(self); e setLight(255, 0, 0, 255); // Red light",
    callOn: "<entity> An entity (script_model)",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity (script_model)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "red",
            desc: "Amount of red color (0-255)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "green",
            desc: "Amount of green color (0-255)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "blue",
            desc: "Amount of blue color (0-255)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "intensity",
            desc: "Light intensity (0-255)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setMaxEntityVelocity",
    desc: "Set the entity's maximum velocity in units per second. Requires the use of enableGravity prior to the use of this method. Returns true on success, false if gravity is not enabled and undefined if the entity is not a script_model.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/setmaxentityvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/setmaxentityvelocity.htm)",
    example: "e setMaxEntityVelocity(200);",
    callOn: "<entity> script_model",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "script_model",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "velocity",
            desc: "The entity's maximum velocity (float) in units per second",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "solidForPlayer",
    desc: "Sets the solid flag so that this object is collidable again, for the specified player. This method is meant to be used in conjunction with notSolidForPlayer and not to enable collision for a brush model that is not collidable in the first place (e.g., brush models with zero contents).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/entity/solidforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/entity/solidforplayer.htm)",
    example: "platform = getEnt(\"platform\", \"targetname\"); platform solidForPlayer(player);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Entity",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "The player for which the object should be solid for",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Exec (4 functions) ----

defs.push(new CodFunction({
    name: "execute",
    desc: "Executes a shell command (via popen using /bin/sh as shell) and returns the result of it. If the call to popen fails, an error is printed to console and undefined is returned.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/exec/execute.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/exec/execute.htm)",
    example: "result = execute(\"ls\");",
    callOn: "",
    returnType: "",
    module: "Exec",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "command",
            desc: "Command to execute",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "execute_async_checkdone",
    desc: "Should be used once every server frame if you use execute_async_create or execute_async_create_nosave.\n\n*libcod note:* libcod renamed `exec_async_checkdone()` → `execute_async_checkdone()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/exec/execute_async_checkdone.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/exec/execute_async_checkdone.htm)",
    example: "execute_async_checkdone();",
    callOn: "",
    returnType: "",
    module: "Exec",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "execute_async_create",
    desc: "Executes a shell command (via popen using /bin/sh as shell) in another thread and returns the result of it. Requires to use execute_async_checkdone once every server frame to poll the result. If the call to popen fails, an error is printed to console and the script callback function (if defined) is not called.\n\n*libcod note:* libcod renamed `exec_async_create()` → `execute_async_create()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/exec/execute_async_create.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/exec/execute_async_create.htm)",
    example: "execLoop() { while(true) { execute_async_checkdone(); wait 0.05; } } execRun() { execute_async_create(\"ls\", ::execCallback, 123); } execCallback(output, parameter) { if(isDefined(output)) // Type ARRAY logPrintConsole(\"Exec async thread returned with parameter \" + parameter + \" and output\\n\"); else logPrintConsole(\"Exec async thread returned with parameter \" + parameter + \"\\n\"); }",
    callOn: "",
    returnType: "",
    module: "Exec",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "command",
            desc: "Command to execute",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "callbackFunction",
            desc: "Script callback function to call on completion, with result array as first argument",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "parameter",
            desc: "Optional parameter passed to the script callback function as second argument",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "execute_async_create_nosave",
    desc: "Executes a shell command (via popen using /bin/sh as shell) in another thread. The command's output is not saved. Requires to use execute_async_checkdone once every server frame to poll the result. If the call to popen fails, an error is printed to console and the script callback function (if defined) is not called.\n\n*libcod note:* libcod renamed `exec_async_create_nosave()` → `execute_async_create_nosave()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/exec/execute_async_create_nosave.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/exec/execute_async_create_nosave.htm)",
    example: "execLoop() { while(true) { execute_async_checkdone(); wait 0.05; } } execRun() { execute_async_create_nosave(\"ls\", ::execCallback, 123); } execCallback(parameter) { logPrintConsole(\"Exec async thread returned with parameter \" + parameter + \"\\n\"); }",
    callOn: "",
    returnType: "",
    module: "Exec",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "command",
            desc: "Command to execute",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "callbackFunction",
            desc: "Script callback function to call on completion",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "parameter",
            desc: "Optional parameter passed to the script callback function as first argument",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- HUD (2 functions) ----

defs.push(new CodFunction({
    name: "getClientHudElemCount",
    desc: "Returns the number of hud elements the player currently has.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/hud/getclienthudelemcount.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/hud/getclienthudelemcount.htm)",
    example: "num = self getClientHudElemCount();",
    callOn: "<player> The player",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "obituary",
    desc: "Create an obituary for a character. Returns the (temporary) obituary entity. The optional parameters allow the obituary hud to be shown for a specific set of teams only, and/or to players that are in a certain range of a defined position only. Valid teams are:\n\n*libcod note:* now returns the (temporary) obituary entity\n\n*libcod note:* got three more parameters\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/hud/obituary.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/hud/obituary.htm)",
    example: "obituary(self, attacker, sWeapon, sMeansOfDeath, \"allies\", self.origin, 512);",
    callOn: "",
    returnType: "",
    module: "HUD",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "victim",
            desc: "The victim entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "attacker",
            desc: "The attacker entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weapon",
            desc: "The weapon name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "meansOfDeath",
            desc: "The means of death as a string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "team",
            desc: "The team to show the hud to",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The position to use for max. distance comparison (requires the 3rd optional parameter)",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "maxDistance",
            desc: "The maximum 3D distance players have to be located within to be able to see the hud",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Level (8 functions) ----

defs.push(new CodFunction({
    name: "getEntityCount",
    desc: "Get the number of currently present entities, including temporary entities. This does not include entities that are rendered/handled on the client side only (e.g., entities spawned for effects). The returned number may not change on each call of spawn(), as the server may use pre-allocated entities before creating new ones. To return the number of entities in use, set the first parameter to true.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/getentitycount.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/getentitycount.htm)",
    example: "if(getEntityCount(true) >= 1000) iprintLnBold(\"Warning: Server is close to entity limit!\"); ent = spawn(\"script_model\", origin);",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "inUse",
            desc: "",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "inUse",
            desc: "Only count entities that are actually in use",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getMovers",
    desc: "Returns an array containing all script mover entities (e.g., script_brushmodel entities used for custom doors or elevators).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/getmovers.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/getmovers.htm)",
    example: "ents = getMovers();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getNumberOfStaticModels",
    desc: "Get the number of static models in the map.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/getnumberofstaticmodels.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/getnumberofstaticmodels.htm)",
    example: "models = getNumberOfStaticModels();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getSavePersist",
    desc: "Returns whether player info (player.pers script variable contents, excluding object references) will be retained when the current level is exited. This is commonly defined via the respective parameter provided to the stock map and map_restart script functions, or via setSavePersist.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/getsavepersist.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/getsavepersist.htm)",
    example: "save = getSavePersist();",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getStaticModelName",
    desc: "Gets the static model name from the model list.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/getstaticmodelname.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/getstaticmodelname.htm)",
    example: "modelName = getStaticModelName(i)",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "i",
            desc: "The model index (0 getNumberOfStaticModels())",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getStaticModelOrigin",
    desc: "Gets the static model origin from the model list.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/getstaticmodelorigin.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/getstaticmodelorigin.htm)",
    example: "modelOrigin = getStaticModelOrigin(i)",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "i",
            desc: "The model index (0 getNumberOfStaticModels())",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setNorthYaw",
    desc: "Sets the yaw value of north.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/setnorthyaw.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/setnorthyaw.htm)",
    example: "setNorthYaw(90.0); // Compass north becomes east wait 1; setNorthYaw(0); // Compass north is reset to actual north",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "yaw",
            desc: "The angular offset of type float",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSavePersist",
    desc: "Defines whether player info (player.pers script variable contents, excluding object references) should be retained when the current level is exited. This is overriden (always set to false) if the g_gametype or sv_maxclients dvars change. Also, it is overriden by the respective parameter provided to the stock map and map_restart script functions. Also, player info is also dropped for clients that disconnect due to file downloads.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/level/setsavepersist.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/level/setsavepersist.htm)",
    example: "setSavePersist(true);",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "savePersistent",
            desc: "If true then, player info is retained",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Math (11 functions) ----

defs.push(new CodFunction({
    name: "abs",
    desc: "Returns the absolute (positive) value of the input value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/abs.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/abs.htm)",
    example: "num = abs(-42);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "The input value of type float",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "atan2",
    desc: "Returns the arcus (inverse) tangent of y / x using the signs of the arguments to determine the correct quadrant.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/atan2.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/atan2.htm)",
    example: "num = atan2(-45, 45);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "y",
            desc: "The y value of type float",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "x",
            desc: "The x value of type float",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "ceil",
    desc: "Returns the least integer value not less than the given value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/ceil.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/ceil.htm)",
    example: "num = ceil(3.1415);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "The input value of type float",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "float",
    desc: "Attempts to convert a variable to one of type float (decimal). Can take a variable of type float, integer, or string as argument.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/float.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/float.htm)",
    example: "num = float(\"3.14159265359\");",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "Value to convert to a float",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "floor",
    desc: "Returns the largest integer value not greater than the given value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/floor.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/floor.htm)",
    example: "num = floor(3.1415);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "The input value of type float",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "pow",
    desc: "Returns the result of the first argument (basis) raised to the power of the second argument (exponent).\n\n*libcod note:* libcod renamed `exponent()` → `pow()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/pow.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/pow.htm)",
    example: "num = pow(5, 3);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "basis",
            desc: "The base value",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "exponent",
            desc: "Exponent of the base value",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "round",
    desc: "Returns the nearest integer value to the given value (in floating-point format), rounding halfway cases away from zero.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/round.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/round.htm)",
    example: "num = round(3.1415);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "The value to round",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "roundTo",
    desc: "Returns the nearest integer value to the given value (in floating-point format), rounding halfway cases away from zero, and with the given precision.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/roundto.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/roundto.htm)",
    example: "num = roundTo(3.1415, 2.0);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "The value to round",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "precision",
            desc: "The precision to apply",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sqrt",
    desc: "Returns the square root of the given value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/sqrt.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/sqrt.htm)",
    example: "root = sqrt(16);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "Value whose square root is computed",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sqrtInv",
    desc: "Returns the square root inverse of the given value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/sqrtInv.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/sqrtInv.htm)",
    example: "inv = sqrtInv(16);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "value",
            desc: "Value whose square root inverse is computed",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "vectorScale",
    desc: "Scales the given vector by the given factor (2nd parameter).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/math/vectorscale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/math/vectorscale.htm)",
    example: "v = vectorScale((1, 2, 3), 2.0);",
    callOn: "",
    returnType: "",
    module: "Math",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "vector",
            desc: "The input vector",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "scale",
            desc: "The scale factor to apply on the vector",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Memory (5 functions) ----

defs.push(new CodFunction({
    name: "memory_free",
    desc: "Deallocates a memory block.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/memory/memory_free.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/memory/memory_free.htm)",
    example: "memory_free( address );",
    callOn: "",
    returnType: "",
    module: "Memory",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "memory",
            desc: "Address of a memory block",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "memory_int_get",
    desc: "Gets the value of a memory block.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/memory/memory_int_get.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/memory/memory_int_get.htm)",
    example: "value = memory_int_get( address );",
    callOn: "",
    returnType: "",
    module: "Memory",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "memory",
            desc: "Address of a memory block",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "memory_int_set",
    desc: "Sets the value of a memory block.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/memory/memory_int_set.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/memory/memory_int_set.htm)",
    example: "memory_int_set( address, 4 );",
    callOn: "",
    returnType: "",
    module: "Memory",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "memory",
            desc: "Address of a memory block",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "Value to be set",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "memory_malloc",
    desc: "Allocates a block of size bytes of memory and returns a pointer to the beginning of the block.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/memory/memory_malloc.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/memory/memory_malloc.htm)",
    example: "memory = memory_malloc( 16 );",
    callOn: "",
    returnType: "",
    module: "Memory",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "bytes",
            desc: "Number of bytes to allocate",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "memory_memset",
    desc: "Sets the first num bytes of the block of memory pointed to the specified value. It's expecting an integer, so you need at least 4 bytes to be memset'd.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/memory/memory_memset.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/memory/memory_memset.htm)",
    example: "memory_memset( address, 4, 4 );",
    callOn: "",
    returnType: "",
    module: "Memory",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "memory",
            desc: "Address of a memory block",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "Value to be set",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "num",
            desc: "Number of bytes to be set to the value",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- MySQL (21 functions) ----

defs.push(new CodFunction({
    name: "mysql_affected_rows",
    desc: "Returns the number of rows changed, deleted, or inserted by the last statement if it was an UPDATE, DELETE, or INSERT.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_affected_rows.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_affected_rows.htm)",
    example: "rows = mysql_affected_rows(mysql_handler);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_async_create_query",
    desc: "Adds a MySQL query to the async query handler queue. The result will be stored. Returns a referencing ID (32-bit signed integer), or undefined if not called correctly. Should be used with the wrapper functions for async MySQL. [source]\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_async_create_query.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_async_create_query.htm)",
    example: "async_id = mysql_async_create_query(\"SELECT column1 FROM table\");",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "query",
            desc: "SQL statement",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_async_create_query_nosave",
    desc: "Adds a MySQL query to the async query handler queue. The result will not be stored. Returns a referencing ID (32-bit signed integer), or undefined if not called correctly. Should be used with the wrapper functions for async MySQL. [source]\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_async_create_query_nosave.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_async_create_query_nosave.htm)",
    example: "async_id = mysql_async_create_query(\"INSERT value INTO table\");",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "query",
            desc: "SQL statement",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_async_getdone_list",
    desc: "Returns a list of completed query-IDs (see the unique ID in mysql_async_create_query() and mysql_async_create_query()). Should be combined with a call to mysql_async_getresult_and_free() for each ID returned. Returns an array of integers. Should be used with the wrapper functions for async MySQL.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_async_getdone_list.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_async_getdone_list.htm)",
    example: "mysql_async_getdone_list();",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "mysql_async_getresult_and_free",
    desc: "Returns the result of an async query and frees the internal pointer so the same ID will not be put on the mysql_async_getdone_list(). Returns 0 for nosave queries (mysql_async_create_query_nosave), and the mysql_store_result(connection) for save queries (mysql_async_create_query).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_async_getresult_and_free.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_async_getresult_and_free.htm)",
    example: "async_id = mysql_async_create_query(\"SELECT column1 FROM table\"); mysql_async_getresult_and_free(async_id);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "async_id",
            desc: "Referencing ID",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_async_initializer",
    desc: "Sets up the asynchronous MySQL module. Only needs to be called once per server-start, will not do anything if called subsequently. Returns a list of MySQL handles. Invalid handles (e.g., due to invalid credentials) have the value 0. Advise: Use a relatively low connectioncount (e.g., 4) for normal usage, go up to 10 if the server is busy (30+ players or a lot of queries) or if the game server is located far (in terms of ping) from the MySQL server.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_async_initializer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_async_initializer.htm)",
    example: "mysql_async_initializer(hostname, username, password, database, port_is_int, connectioncount);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "hostname",
            desc: "Host where the database runs on (e.g., localhost)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "username",
            desc: "Username of the database",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "password",
            desc: "The password of the username",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "database",
            desc: "Database name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "port",
            desc: "Database port (default: 3306)",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "connectionCount",
            desc: "Connection count",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_close",
    desc: "Closes a previously opened MySQL connection.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_close.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_close.htm)",
    example: "mysql_close(mysql_handler);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_errno",
    desc: "Returns the error code for the most recently invoked API function that can succeed or fail.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_errno.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_errno.htm)",
    example: "error = mysql_errno(mysql_handler);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_error",
    desc: "Returns a string containing the error message for the most recently invoked API function that failed.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_error.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_error.htm)",
    example: "error = mysql_error(mysql_handler);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_fetch_field",
    desc: "Returns the definition of one column of a result set as string.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_fetch_field.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_fetch_field.htm)",
    example: "field = mysql_fetch_field(result);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "result",
            desc: "Result set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_fetch_row",
    desc: "Retrieves the next row of a result set.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_fetch_row.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_fetch_row.htm)",
    example: "row = mysql_fetch_row(result);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "result",
            desc: "Result set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_field_seek",
    desc: "Sets the field cursor to the given offset and returns the previous value of the field cursor.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_field_seek.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_field_seek.htm)",
    example: "prevoffset = mysql_field_seek(result, offset);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "result",
            desc: "Result set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "offset",
            desc: "Field cursor offset",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_free_result",
    desc: "Frees the memory allocated for a result set by mysql_store_result().\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_free_result.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_free_result.htm)",
    example: "mysql_free_result(result);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "result",
            desc: "Result set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_init",
    desc: "Allocates and initializes a MySQL object suitable for mysql_real_connect(). Returns an initialized MySQL handle or 0 if there was insufficient memory to allocate a new object.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_init.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_init.htm)",
    example: "mysql_handler = mysql_init();",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "mysql_num_fields",
    desc: "Returns the number of columns in a result set.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_num_fields.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_num_fields.htm)",
    example: "fields = mysql_num_fields(result);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "result",
            desc: "Result set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_num_rows",
    desc: "Returns the number of rows in the result set.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_num_rows.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_num_rows.htm)",
    example: "rows = mysql_num_rows(result);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "result",
            desc: "Result set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_query",
    desc: "Executes the SQL statement. Returns 0 for success or an error code.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_query.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_query.htm)",
    example: "query = mysql_query(mysql_handler, \"SELECT * FROM table\");",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "statement",
            desc: "SQL statement",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_real_connect",
    desc: "Attempts to establish a connection to a MySQL database engine. Returns a connection handle if the connection was successful, otherwise 0. Remember to call mysql_close once the connection is no longer required, or before a map (re)load to avoid leaking TCP sockets. Furthermore, mysql_reuse_connection can be used instead of closing and reopening a connection on each new map.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_real_connect.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_real_connect.htm)",
    example: "connection_handler = mysql_real_connect( mysql_handler, \"localhost\", \"username\", \"password\", \"database\", 3306);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "Initialized MySQL handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "host",
            desc: "Host where the database runs on (e.g., localhost)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "user",
            desc: "Username of the database",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "pass",
            desc: "The password of the username",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "db",
            desc: "Database name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "port",
            desc: "Database port (default: 3306)",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_real_escape_string",
    desc: "Escapes special characters in a string for use in an SQL statement.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_real_escape_string.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_real_escape_string.htm)",
    example: "escapedtext = mysql_real_escape_string(mysql, self.name);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler (a valid, open connection)",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "text",
            desc: "String to escape",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "mysql_reuse_connection",
    desc: "When calling mysql_real_connect for the first time, this connection will be stored in a global (libcod) variable. This function retrieves said variable, or undefined if no connection has been set up yet. Useful when trying to keep the number of MySQL connections to a minimum.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_reuse_connection.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_reuse_connection.htm)",
    example: "level.mysql = mysql_reuse_connection();",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "mysql_store_result",
    desc: "Produces a result set after invoking mysql_query().\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/mysql/mysql_store_result.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/mysql/mysql_store_result.htm)",
    example: "result = mysql_store_result(mysql_handler);",
    callOn: "",
    returnType: "",
    module: "MySQL",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "mysql",
            desc: "MySQL connection handler",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Objective (5 functions) ----

defs.push(new CodFunction({
    name: "objective_player_add",
    desc: "Adds a new objective, visible for the player only. Overrides global objectives that use the same objective_number.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/objective/objective_player_add.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/objective/objective_player_add.htm)",
    example: "self objective_player_add(objective_number, \"current\", origin);",
    callOn: "<player> The player",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "objective_number",
            desc: "The number of the objective to add",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "state",
            desc: "A string value representing the state of the objective. Valid states are 'empty', 'invisible' and 'current'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the objective",
            type: "vector",
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
    name: "objective_player_delete",
    desc: "Removes an objective that was created via objective_player_add.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/objective/objective_player_delete.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/objective/objective_player_delete.htm)",
    example: "self objective_player_delete(1);",
    callOn: "<player> The player",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "objective_number",
            desc: "The number of the objective to remove",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_player_icon",
    desc: "Set the compass icon for an objective that was created via objective_player_add.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/objective/objective_player_icon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/objective/objective_player_icon.htm)",
    example: "self objective_player_icon(0, game[\"radio_none\"]);",
    callOn: "<player> The player",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "int",
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
    name: "objective_player_position",
    desc: "Set the position of an objective that was created via objective_player_add.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/objective/objective_player_position.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/objective/objective_player_position.htm)",
    example: "self objective_player_position(4, get_objective_position(\"plant_boilerbomb_trigger\"));",
    callOn: "<player> The player",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "objective_number",
            desc: "The ID of the objective to alter",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "position",
            desc: "The position of the objective",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "objective_player_state",
    desc: "Sets the state of an objective that was created via objective_player_add.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/objective/objective_player_state.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/objective/objective_player_state.htm)",
    example: "self objective_player_state(8, \"done\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Objective",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "objective_number",
            desc: "The number of the objective to alter",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "state",
            desc: "A string value representing the state of the objective. Valid states are 'empty', 'invisible' and 'current'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Player (122 functions) ----

defs.push(new CodFunction({
    name: "addEntToSnapshots",
    desc: "Adds the specified entity to the list of entities to send to the client. Effective only if the sv_autoAddSnapshotEntities dvar is set to 0 and if archived server snapshots are disabled (see SetArchive). Entities missing in this list are not rendered on the client side, including players.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/addenttosnapshots.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/addenttosnapshots.htm)",
    example: "player addEntToSnapshots(grenade);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "entity",
            desc: "The entity to include in server snapshots",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "addVelocity",
    desc: "Add velocity to the player's velocity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/addvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/addvelocity.htm)",
    example: "player addVelocity((0, 0, 100));",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "velocity",
            desc: "Velocity (vector) to add to the player's velocity",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "aimButtonPressed",
    desc: "Returns whether the player presses the aim button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/aimbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/aimbuttonpressed.htm)",
    example: "if(player aimButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "backButtonPressed",
    desc: "Returns whether the player presses the backward movement button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/backbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/backbuttonpressed.htm)",
    example: "if(player backButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "canMantle",
    desc: "Returns whether the player can mantle (i.e., when the hint string appears).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/canmantle.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/canmantle.htm)",
    example: "climb = player canMantle();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "clearJumpState",
    desc: "Resets the player's jump (slowdown) and slide state, as if the player did not jump. Note: By default, when jumping repeatedly, only the first jump yields the max. height, and subsequent jumps are slowed down.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/clearjumpstate.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/clearjumpstate.htm)",
    example: "player clearJumpState();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "connectionlessPacketToClient",
    desc: "Sends a packet containing commands (e.g., print, error, disconnect) to the client.\n\n*libcod note:* libcod renamed `printOutOfBand()` → `connectionlessPacketToClient()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/connectionlesspackettoclient.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/connectionlesspackettoclient.htm)",
    example: "player connectionlessPacketToClient(\"print\\nHello player console\\n\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "command",
            desc: "The command sent to the client",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "connectionlessPacketToServer",
    desc: "Creates a packet that is processed as if it would come from the client to the server. However, the client does not actually see the command or send a packet.\n\n*libcod note:* libcod renamed `connectionlesspacket()` → `connectionlessPacketToServer()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/connectionlesspackettoserver.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/connectionlesspackettoserver.htm)",
    example: "player connectionlessPacketToServer(\"rcon \" + getCvar(\"rcon_password\") + \" status\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "command",
            desc: "The command seemingly coming from the client",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableBulletDrop",
    desc: "Disables gravity for bullets (see enableBulletDrop), thus returning to stock behavior.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/disablebulletdrop.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/disablebulletdrop.htm)",
    example: "player disableBulletDrop();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableBulletImpacts",
    desc: "Disables bullet impact events (sound + effect) caused by the player's shots. Note that player body hits are not covered by this, as these are controlled via finishPlayerDamage and the g_corpseHit dvar.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/disablebulletimpacts.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/disablebulletimpacts.htm)",
    example: "player disableBulletImpacts();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableEarthquakes",
    desc: "Enables a player's immunity against earthquakes.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/disableearthquakes.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/disableearthquakes.htm)",
    example: "player disableEarthquakes();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableItemPickup",
    desc: "Disables item pickup, including weapons. Allows to toggle display of item hint strings.\n\n*libcod note:* now also supports to hide hint strings\n\n*libcod note:* and `<player> enableItemPickup()` were merged into `<player> itemPickup(<enabled>)`\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/disableitempickup.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/disableitempickup.htm)",
    example: "player disableItemPickup(true);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "hideHintStrings",
            desc: "",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hideHintStrings",
            desc: "If set to true, item hint strings are disabled (not shown) too. Default: False",
            type: "string",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableTalkerIcon",
    desc: "Disables the talker icon for the specified player if previously enabled via enableTalkerIcon.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/disabletalkericon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/disabletalkericon.htm)",
    example: "player1 disableTalkerIcon(player2);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "earthquakeForPlayer",
    desc: "Create an earthquake at the given point, for the given player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/earthquakeforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/earthquakeforplayer.htm)",
    example: "player earthquakeForPlayer(0.3, 3, player.origin, 850);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "The scale of the earthquake",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "duration",
            desc: "Duration in seconds",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "source",
            desc: "The earthquake origin",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "radius",
            desc: "The earthquake radius of effect",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableBulletDrop",
    desc: "Enables gravity for bullets, making them fall over time. Requires the bullet drop system to be enabled using the g_bulletDrop dvar. Gravity is fixed to 9.81 meters per square seconds. The default initial bullet velocity is about 800 meters per second (see setBulletVelocity). The default bullet drag is one percent of velocity per server frame (see setBulletDrag).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/enablebulletdrop.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/enablebulletdrop.htm)",
    example: "player enableBulletDrop();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableBulletImpacts",
    desc: "Enables bullet impact events (sound + effect) caused by the player's shots. They are enabled by default. Note that player body hits are not covered by this, as these are controlled via finishPlayerDamage and the g_corpseHit dvar.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/enablebulletimpacts.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/enablebulletimpacts.htm)",
    example: "player enableBulletImpacts();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableEarthquakes",
    desc: "Disables a player's immunity against earthquakes.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/enableearthquakes.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/enableearthquakes.htm)",
    example: "player enableEarthquakes();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableItemPickup",
    desc: "Enables item pickup, including weapons.\n\n*libcod note:* and `disableItemPickup()` into `itemPickup()`\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/enableitempickup.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/enableitempickup.htm)",
    example: "player enableItemPickup();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableTalkerIcon",
    desc: "Enables the talker icon for the specified player on the scoreboard and UI (as defined in ui_mp/hud.menu). Also works if the sv_voice dvar is set to \"0\". Does not interfere with sound streamed via playSoundFile.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/enabletalkericon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/enabletalkericon.htm)",
    example: "player1 enableTalkerIcon(player2);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "executeClientCommand",
    desc: "Executes a text command on the client like via console input. However, there is some side effects for the player:\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/executeclientcommand.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/executeclientcommand.htm)",
    example: "player executeClientCommand(\"screenshotJPEG\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "command",
            desc: "Text command to execute on the client",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "forceShot",
    desc: "Forces the player to shoot, even during reloading or when out of ammo. Ignores fire delays. Does not reduce ammo. Works for weapons of type bullet and projectile.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/forceshot.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/forceshot.htm)",
    example: "player forceShot();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "includeClient",
            desc: "",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "includeClient",
            desc: "If set to false, client-sided events (firing animations, sounds and effects) are omitted",
            type: "entity",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "forwardButtonPressed",
    desc: "Returns whether the player presses the forward movement button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/forwardbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/forwardbuttonpressed.htm)",
    example: "if(player forwardButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "fragButtonPressed",
    desc: "Returns whether the player presses the frag grenade button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/fragbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/fragbuttonpressed.htm)",
    example: "if(player fragButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAddressType",
    desc: "Gets the address type of a player as integer (0 = bot, 1 = bad, 2 = loopback, 3 = broadcast, 4 = IP).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getaddresstype.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getaddresstype.htm)",
    example: "addresstype = player getAddressType();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getBulletMask",
    desc: "Returns the player's current bullet mask. By default, that is MASK_SHOT, unless overriden by setFireThroughWalls or setBulletMask. Note: Valid bullet mask values can be found in declarations.hpp, starting with CONTENTS_SOLID.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getbulletmask.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getbulletmask.htm)",
    example: "player getBulletMask();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getClientConnectState",
    desc: "Gets the player's client connect state as integer (2 = connected, 3 = primed, 4 = active).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getclientconnectstate.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getclientconnectstate.htm)",
    example: "state = player getClientConnectState();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCollisionTeam",
    desc: "Returns the team(s) which the player has character collision with. Possible return values are 'axis', 'allies', 'none' or 'axis_allies'. Default is 'axis_allies'.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getcollisionteam.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getcollisionteam.htm)",
    example: "team = player getCollisionTeam();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCookTime",
    desc: "Gets the time left until the player's grenade explodes.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getcooktime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getcooktime.htm)",
    example: "cookTime = player getCookTime();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCurrentWeaponAmmo",
    desc: "Returns the player's ammo count of the currently held weapon, or zero if no weapon is held (this includes situations like when climbing ladders).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getcurrentweaponammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getcurrentweaponammo.htm)",
    example: "ammo = player getCurrentWeaponAmmo();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCurrentWeaponClipAmmo",
    desc: "Returns the player's clip ammo count of the currently held weapon, or zero if no weapon is held (this includes situations like when climbing ladders).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getcurrentweaponclipammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getcurrentweaponclipammo.htm)",
    example: "clipAmmo = player getCurrentWeaponClipAmmo();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCurrentWeaponSlot",
    desc: "Returns the name of the currently used weapon slot (\"none\", \"primary\", or \"primaryb\").\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getcurrentweaponslot.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getcurrentweaponslot.htm)",
    example: "slot = player getCurrentWeaponSlot();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getEnterTime",
    desc: "Returns the player's enter time.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getentertime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getentertime.htm)",
    example: "time = player getEnterTime();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getFps",
    desc: "Returns the player's frames per second.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getfps.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getfps.htm)",
    example: "ping = player getFPS();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getGravity",
    desc: "Returns the player's individual gravity (integer). Returns zero if the player uses the game's base gravity (see g_gravity dvar).\n\n*libcod note:* libcod renamed `getg_gravity()` → `getGravity()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getgravity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getgravity.htm)",
    example: "player getGravity();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getGroundEntity",
    desc: "Returns the entity the player is standing on, or undefined if there is none.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getgroundentity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getgroundentity.htm)",
    example: "ent = player getGroundEntity();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getInactivityTime",
    desc: "Returns the time when the player was active the last time. Requires the g_inactivity dvar to have a non-zero value. Further notes:\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getinactivitytime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getinactivitytime.htm)",
    example: "time = player getInactivityTime();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getIP",
    desc: "Gets the IP address of a player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getip.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getip.htm)",
    example: "ip = player getIP();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getJumpSlowdownTimer",
    desc: "Returns the player's jump slowdown time in ms. The default is 1800 ms. Note: By default, when jumping repeatedly, only the first jump yields the max. height, and subsequent jumps are slowed down.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getjumpslowdowntimer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getjumpslowdowntimer.htm)",
    example: "time = player getJumpSlowdownTimer();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getLastConnectTime",
    desc: "Gets the last connect time of a player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getlastconnecttime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getlastconnecttime.htm)",
    example: "connecttime = player getLastConnectTime();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getLastGamestateSize",
    desc: "Gets the player's last gamestate size in bytes (integer).\n\n*libcod note:* libcod renamed `getLastGamestate()` → `getLastGamestateSize()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getlastgamestatesize.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getlastgamestatesize.htm)",
    example: "gamestateSize = player getLastGamestateSize();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getLastMsg",
    desc: "Gets the last message time of a player, as shown via rcon status.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getlastmsg.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getlastmsg.htm)",
    example: "lastmsg = player getLastMsg();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getNumberOfEntsInSnapshot",
    desc: "Returns the number of entities in the list of entities to send to the client (see addEntToSnapshots and removeEntFromSnapshots).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getnumberofentsinsnapshot.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getnumberofentsinsnapshot.htm)",
    example: "num = player getNumberOfEntsInSnapshot();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getPing",
    desc: "Gets the ping of a player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getping.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getping.htm)",
    example: "ping = player getPing();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getPlayerstateFlags",
    desc: "Returns the player's playerState pm_flags.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getplayerstateflags.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getplayerstateflags.htm)",
    example: "flags = player getPlayerstateFlags();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getProtocol",
    desc: "Returns the player's game protocol version of type integer (115 for version 1.0, 117 for version 1.2, 118 for version 1.3, 119 for version 1.3 via Game Pass).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getprotocol.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getprotocol.htm)",
    example: "protocolVersion = player getProtocol();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getProtocolString",
    desc: "Returns the player's game protocol version as string (\"1.0\", \"1.2\", or \"1.3\").\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getprotocolstring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getprotocolstring.htm)",
    example: "version = player getProtocolString();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getServerCommandQueueSize",
    desc: "Returns the number of the player's not yet acknowledged server commands. If a player has more than 128 such commands pending (e.g., due to lag), the player will be disconnected with a server command overflow error (EXE_SERVERCOMMANDOVERFLOW).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getservercommandqueuesize.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getservercommandqueuesize.htm)",
    example: "numPendingCommands = player getServerCommandQueueSize();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSpectatorClient",
    desc: "Returns the player being following as spectator.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getspectatorclient.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getspectatorclient.htm)",
    example: "following = player getSpectatorClient();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSpeed",
    desc: "Returns the player's individual speed (integer). Returns zero if the player uses the game's base speed (see g_speed dvar).\n\n*libcod note:* libcod renamed `getg_speed()` → `getSpeed()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getspeed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getspeed.htm)",
    example: "player getSpeed();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getStance",
    desc: "Gets the stance of the player. Possible return values are \"stand\", \"crouch\", and \"prone\".\n\n*libcod note:* with those expected by `setStance()`\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getstance.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getstance.htm)",
    example: "if(player getStance() == \"crouch\") ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getUserinfo",
    desc: "Gets the value (string) in the player's userinfo string for the given key.\n\n*libcod note:* libcod renamed `get_userinfo()` → `getUserinfo()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getuserinfo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getuserinfo.htm)",
    example: "player getUserinfo(\"name\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "key",
            desc: "The key",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getVelocity",
    desc: "Gets the player's velocity (vector).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getvelocity.htm)",
    example: "vel = player getVelocity();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getViewOrigin",
    desc: "Gets the position of the player's point of view (eye) in first-person mode, returning more precise results than getEye due to the inclusion of internal stance and lean offsets.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getvieworigin.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getvieworigin.htm)",
    example: "eyePos = player getViewOrigin();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponAnimation",
    desc: "Gets the currently played first-person weapon animation (type integer, see weapAnimNumber_t).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/getweaponanimation.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/getweaponanimation.htm)",
    example: "anim = player getWeaponAnimation();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "holdBreathButtonPressed",
    desc: "Returns whether the player presses the hold breath button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/holdbreathbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/holdbreathbuttonpressed.htm)",
    example: "if(player holdBreathButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isAllowingSpectators",
    desc: "Returns whether the player can be spectated in first-person mode.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isallowingspectators.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isallowingspectators.htm)",
    example: "canBeSpectated = player isAllowingSpectators();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isBot",
    desc: "Returns true if the player is a bot.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isbot.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isbot.htm)",
    example: "if(player isBot()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isChatting",
    desc: "Returns true if the player is typing into global or team chat. Also returns true, if the player has a menu open that takes ingame inputs.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/ischatting.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/ischatting.htm)",
    example: "if(player isChatting()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isFiring",
    desc: "Returns true if the player is currently using a weapon.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isfiring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isfiring.htm)",
    example: "player isFiring();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isHiddenFromScoreboard",
    desc: "Returns whether the player is being listed in the scoreboard or not (hidden).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/ishiddenfromscroreboard.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/ishiddenfromscroreboard.htm)",
    example: "notVisible = player isHiddenFromScoreboard();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isHiddenFromServerStatus",
    desc: "Returns whether the player is excluded from server status responses or not.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/ishiddenfromserverstatus.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/ishiddenfromserverstatus.htm)",
    example: "notVisible = player isHiddenFromServerStatus();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isHoldingWeaponDown",
    desc: "Returns true if the player is currently holding a weapon down, no matter if triggered by the player or through setHoldingWeaponDown.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isholdingweapondown.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isholdingweapondown.htm)",
    example: "player isHoldingWeaponDown();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isMantling",
    desc: "Returns true if the player is currently mantling (on/over).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/ismantling.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/ismantling.htm)",
    example: "if(player isMantling()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isMeleeing",
    desc: "Returns true if the player is currently meleeing.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/ismeleeing.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/ismeleeing.htm)",
    example: "player isMeleeing();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isOnLadder",
    desc: "Returns true if the player is on a ladder.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isonladder.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isonladder.htm)",
    example: "if(player isOnLadder()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isRechambering",
    desc: "Returns true if the player is currently rechambering a weapon. The weapon slot parameter is optional, by default the currently used weapon slot is checked. Returns false if the current weapon slot is \"none\" or if the specified weapon has boltAction disabled.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isrechambering.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isrechambering.htm)",
    example: "if(player isRechambering()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weaponSlot",
            desc: "",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weaponSlot",
            desc: "Valid weapon slots are \"primary\" and \"primaryb\". Default is the currently used weapon slot",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isReloading",
    desc: "Returns true if the player is currently reloading a weapon.\n\n*libcod note:* no longer includes rechambering, see `isRechambering()` for that\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isreloading.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isreloading.htm)",
    example: "if(player isReloading()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isShellShocked",
    desc: "Returns true if the player is currently affected by shell shock.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isshellshocked.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isshellshocked.htm)",
    example: "if(player isShellShocked()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isThrowingGrenade",
    desc: "Returns true if the player is currently in the process of throwing a grenade.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isthrowinggrenade.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isthrowinggrenade.htm)",
    example: "if(player isThrowingGrenade()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isUseTouching",
    desc: "Returns true if the player is located close to an activatable entity (e.g., triggers, turrets, dropped weapons).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isusetouching.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isusetouching.htm)",
    example: "if(player isUseTouching()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isUsingBinoculars",
    desc: "Returns true if the player is currently using binoculars.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/isusingbinoculars.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/isusingbinoculars.htm)",
    example: "if(player isUsingBinoculars()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "jumpButtonPressed",
    desc: "Returns whether the player presses the jump button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/jumpbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/jumpbuttonpressed.htm)",
    example: "if(player jumpButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "leanLeftButtonPressed",
    desc: "Returns whether the player presses the lean left button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/leanleftbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/leanleftbuttonpressed.htm)",
    example: "if(player leanLeftButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "leanRightButtonPressed",
    desc: "Returns whether the player presses the lean right button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/leanrightbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/leanrightbuttonpressed.htm)",
    example: "if(player leanRightButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "leftButtonPressed",
    desc: "Returns whether the player presses the left movement button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/leftbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/leftbuttonpressed.htm)",
    example: "if(player leftButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "lookAtKiller",
    desc: "An experimental attempt to make a Team Fortress 2 alike killer camera.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/lookatkiller.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/lookatkiller.htm)",
    example: "player lookAtKiller(inflictor, attacker);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "inflictor",
            desc: "The damage-inflicting entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "attacker",
            desc: "The attacker entity",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "noclip",
    desc: "Sets the player's no-clipping mode.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/noclip.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/noclip.htm)",
    example: "player noclip(\"on\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "mode",
            desc: "The mode to switch to: 'on', 'off', 'toggle'",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "overrideContents",
    desc: "Forces the contents mask of a player to the provided value, applied automatically on every server frame. Overrides values set via setContents. Unset the overriden contents mask by setting the first argument to undefined. Returns the previously set contents mask, or undefined on error.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/overridecontents.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/overridecontents.htm)",
    example: "player overrideContents(fromHex(\"0x1\")); // Player contents mask forced to CONTENTS_SOLID",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "contents",
            desc: "An integer describing the new contents mask of this player",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "processClientCommand",
    desc: "Processes the client command (e.g., a chat message) that is passed to CodeCallback_PlayerCommand(args), if present in maps\\mp\\gametypes\\_callbacksetup.gsc. Omitting this call causes the client command to be ignored.\n\n*libcod note:* libcod renamed `clientCommand()` → `processClientCommand()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/processclientcommand.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/processclientcommand.htm)",
    example: "player processClientCommand();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "processClientUserinfoChange",
    desc: "Processes the client's userinfo string update that is passed to CodeCallback_UserInfoChanged(), if present in maps\\mp\\gametypes\\_callbacksetup.gsc. Omitting this call causes the userinfo update to be ignored.\n\n*libcod note:* libcod renamed `clientUserinfoChanged()` → `processClientUserinfoChange()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/processclientuserinfochange.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/processclientuserinfochange.htm)",
    example: "player processClientUserinfoChange();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "processSuicide",
    desc: "Kills the player immediately as a suicide, without going through the CodeCallback_Suicide() callback.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/processsuicide.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/processsuicide.htm)",
    example: "player processSuicide();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "reloadButtonPressed",
    desc: "Returns whether the player presses the reload button\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/reloadbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/reloadbuttonpressed.htm)",
    example: "if(player reloadButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "removeEntFromSnapshots",
    desc: "Removes the specified entity from the list of entities to send to the client. Effective only if the sv_autoAddSnapshotEntities dvar is set to 0 and if archived server snapshots are disabled (see SetArchive). Entities missing in this list are not rendered on the client side, including players.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/removeentfromsnapshots.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/removeentfromsnapshots.htm)",
    example: "player removeEntFromSnapshots(ent);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "entity",
            desc: "The entity to exclude from server snapshots",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "renameClient",
    desc: "Renames a client.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/renameclient.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/renameclient.htm)",
    example: "player renameClient(\"Wellknown Soldier\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "newName",
            desc: "The player's new name",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "resetNextReliableTime",
    desc: "Resets the player's flood protection timer. Allows the next client command to be processed without any delay.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/resetnextreliabletime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/resetnextreliabletime.htm)",
    example: "player resetNextReliableTime();",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "rightButtonPressed",
    desc: "Returns whether the player presses the right movement button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/rightbuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/rightbuttonpressed.htm)",
    example: "if(player rightButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "setActivateOnUseButtonRelease",
    desc: "Enables/disables whether the activation of entities (e.g., triggers, turrets, dropped weapons) is done on release of the use button, or otherwise already when it is pressed.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setactivateonusebuttonrelease.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setactivateonusebuttonrelease.htm)",
    example: "player setActivateOnUseButtonRelease(true);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enabled",
            desc: "Flag stating whether the activation of entities is done on release or press of the use button",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setAllowSpectators",
    desc: "Enables/disables whether the player can be spectated in first-person mode. If set to false, all other players that currently spectate the player switch to free spectate (third-person) mode.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setallowspectators.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setallowspectators.htm)",
    example: "player setAllowSpectators(false);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "allowed",
            desc: "Flag stating whether the player can be spectated in first-person mode",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBulletDrag",
    desc: "Sets the player's bullet slowdown (see enableBulletDrop). The default value is 0.01 (one percent per server frame). Returns the previous drag value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setbulletdrag.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setbulletdrag.htm)",
    example: "player setBulletDrag(0.01);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "value",
            desc: "Number of type float defining the bullet slowdown in percent per server frame",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBulletMask",
    desc: "Allows to give a player a custom bullet mask for fine-grained definition which surface types bullets should collide with. Does not affect activation of damage triggers. Overrides enabled setFireThroughWalls. Returns the previous bullet mask on success, else undefined. Note: Valid bullet mask values can be found in declarations.hpp, starting with CONTENTS_SOLID.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setbulletmask.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setbulletmask.htm)",
    example: "player setBulletMask(fromHex(\"0x2000000\")); // Hits player bodies only",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "mask",
            desc: "Bullet mask value",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBulletModel",
    desc: "Enables visual representation of dropping bullets (see enableBulletDrop) by attaching a model to each bullet. Requires the model to be precached. The optional time parameter defines how long that model remains visible after hitting something (default: 1000 milliseconds). Returns true on success, else undefined.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setbulletmodel.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setbulletmodel.htm)",
    example: "player setBulletModel(\"xmodel/weapon_temp_panzershreck_rocket\", 1000); // Needs to be precached",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "model",
            desc: "Path to precached xmodel",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "time",
            desc: "Time in milliseconds the model remains visible after hitting something",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setBulletVelocity",
    desc: "Sets the player's initial bullet velocity (see enableBulletDrop). The default value is 31500 units per second (about 800 meters per second). Returns the previous velocity value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setbulletvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setbulletvelocity.htm)",
    example: "player setBulletVelocity(31500);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "value",
            desc: "Number of type float defining the initial bullet velocity in units per second",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCollisionTeam",
    desc: "Set the team(s) which the player should have character collision with. No collision has precedence in case two players with different settings would collide with each other. Crosshair names (see cg_drawCrosshairNames client dvar) disappear for players that have a different setting than 'axis_allies'.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setcollisionteam.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setcollisionteam.htm)",
    example: "player setCollisionTeam(\"axis\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "team",
            desc: "A string description of the team. Valid teams are 'axis', 'allies', 'none' or 'axis_allies'",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setConfigStringForPlayer",
    desc: "Sets a configstring, but only for the specified player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setconfigstringforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setconfigstringforplayer.htm)",
    example: "player setConfigStringForPlayer(index, \"New Text\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "index",
            desc: "Index of the precached string that should be replaced/updated (see /configstrings in client console)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "string",
            desc: "The new value to replace the precached string with",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCurrentWeaponAmmo",
    desc: "Sets the player's ammo count of the currently held weapon. Returns true on success, or false when no weapon is held (this includes situations like when climbing ladders) or the player is not in an active session state, or undefined on parameter misuse.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setcurrentweaponammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setcurrentweaponammo.htm)",
    example: "player setCurrentWeaponAmmo(42);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "value",
            desc: "The ammo count to set for the current weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setCurrentWeaponClipAmmo",
    desc: "Sets the player's clip ammo count of the currently held weapon. Returns true on success, or false when no weapon is held (this includes situations like when climbing ladders) or the player is not in an active session state, or undefined on parameter misuse.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setcurrentweaponclipammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setcurrentweaponclipammo.htm)",
    example: "player setCurrentWeaponClipAmmo(42);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "value",
            desc: "The clip ammo count to set for the current weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFireRangeScale",
    desc: "Scales the player's fire range. Applies to weapons with weaponType bullet only. Base value is the minDamageRange value for weapons with weaponClass spread, and 8192 for other weapons. The default scale value is 1.0. Returns the previous scale value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setfirerangescale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setfirerangescale.htm)",
    example: "player setFireRangeScale(2.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "Float factor that defines how much to scale the player's fire range",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setFireThroughWalls",
    desc: "Enables/disables firing through walls (including other surface types except player bodies), without range limitations. Does not affect activation of damage triggers. Is overriden by setBulletMask. Returns the previous setting.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setfirethroughwalls.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setfirethroughwalls.htm)",
    example: "player setFireThroughWalls(true);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enabled",
            desc: "Flag stating whether bullets should pass through walls",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGravity",
    desc: "Set the player's individual gravity.\n\n*libcod note:* libcod renamed `setg_gravity()` → `setGravity()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setgravity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setgravity.htm)",
    example: "player setGravity(400);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerGravity",
            desc: "The player's new gravity (0 = default gravity) of type integer",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setGuid",
    desc: "Sets the player's guid.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setguid.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setguid.htm)",
    example: "player setGuid(123456);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "guid",
            desc: "New user's guid (integer)",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setHiddenFromScoreboard",
    desc: "Enables/disables whether the player should be listed in the scoreboard. If the hidden player is the only player on the server, team scores in the scoreboard are invisible too.\n\n*libcod note:* no longer affects player visibility in server status responses, added `setHiddenFromServerStatus()` for that\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/sethiddenfromscroreboard.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/sethiddenfromscroreboard.htm)",
    example: "player setHiddenFromScoreboard(true);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enabled",
            desc: "Flag stating whether the player should be listed in the scoreboard",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setHiddenFromServerStatus",
    desc: "Enables/disables whether the player should be excluded from server status responses.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/sethiddenfromserverstatus.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/sethiddenfromserverstatus.htm)",
    example: "player setHiddenFromServerStatus(true);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enabled",
            desc: "Flag stating whether the player should be excluded from server status responses",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setHoldingWeaponDown",
    desc: "Enables/disables the weapon put away state (visually holding the current weapon down) for the player. Sets the weapon put away animation and blocks other weapon actions (e.g., shooting, switching weapons) until the state is disabled or the player dies. Turrets can be entered, the state is reinstated after leaving the turret. Prevents the player from picking up a weapon (ammo is still picked up). Returns true on success, otherwise (i.e., if the put away state is already enabled or if the player currently holds no weapon) false.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setholdingweapondown.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setholdingweapondown.htm)",
    example: "player setHoldingWeaponDown(true);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enabled",
            desc: "Flag stating whether the weapon put away state should be enabled",
            type: "bool",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setJumpHeight",
    desc: "Sets the player's max. jump height. A negative height parameter value will reset it to the default value of 39.0 units, as defined via the jump_height cheat dvar. Note: By default, when jumping repeatedly, only the first jump yields the max. height, and subsequent jumps are slowed down.\n\n*libcod note:* libcod renamed `setjump_height()` → `setJumpHeight()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setjumpheight.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setjumpheight.htm)",
    example: "player setJumpHeight(39.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "height",
            desc: "Jump height value of type float",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setJumpSlowdownEnable",
    desc: "Toggles the jump slowdown mechanism for the player. An enable parameter value of -1 will reset it to the default mode, as defined via the jump_slowdownEnable cheat dvar. Note: By default, when jumping repeatedly, only the first jump yields the max. height, and subsequent jumps are slowed down.\n\n*libcod note:* libcod renamed `setjump_slowdownenable()` → `setJumpSlowdownEnable()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setjumpslowdownenable.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setjumpslowdownenable.htm)",
    example: "player setJumpSlowdownEnable(0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "enable",
            desc: "Integer value to toggle the jump slowdown mechanism",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setMeleeHeightScale",
    desc: "Scales the player's melee height. Base value is the value of the player_meleeHeight dvar. The default scale value is 1.0. Returns the previous scale value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setmeleeheightscale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setmeleeheightscale.htm)",
    example: "player setMeleeHeightScale(2.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "Float factor that defines how much to scale the player's melee height",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setMeleeRangeScale",
    desc: "Scales the player's melee range. Base value is the value of the player_meleeRange dvar. The default scale value is 1.0. Returns the previous scale value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setmeleerangescale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setmeleerangescale.htm)",
    example: "player setMeleeRangeScale(2.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "Float factor that defines how much to scale the player's melee range",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setMeleeWidthScale",
    desc: "Scales the player's melee width. Base value is the value of the player_meleeWidth dvar. The default scale value is 1.0. Returns the previous scale value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setmeleewidthscale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setmeleewidthscale.htm)",
    example: "player setMeleeWidthScale(2.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "Float factor that defines how much to scale the player's melee width",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setNorthYawForPlayer",
    desc: "Sets the yaw value of north, but only for the specified player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setnorthyawforplayer.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setnorthyawforplayer.htm)",
    example: "player setNorthYawForPlayer(90.0); // Compass north becomes east wait 1; player setNorthYawForPlayer(0); // Compass north is reset to actual north",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "yaw",
            desc: "The angular offset of type float",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setOriginAndAngles",
    desc: "Sets the player's origin and angles to the specified values, in a smooth way without delay, as opposed to SetOrigin.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setoriginandangles.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setoriginandangles.htm)",
    example: "player setOriginAndAngles(self.origin + (0, 0, 64), (0, 90, 0));",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "origin",
            desc: "The player's new origin (a point)",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "angles",
            desc: "The player's new angles in degrees",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setPing",
    desc: "Sets player's ping. Using undefined as value reenables the player's real ping. When using only one parameter, both values (the one shown on the ingame scoreboard and the other one that is returned within server status messages) are affected.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setping.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setping.htm)",
    example: "player setPing(42);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "ingameValue",
            desc: "New user's ping (integer, or undefined to reset) that is shown on the ingame scoreboard",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "statusValue",
            desc: "New user's ping (integer, or undefined to reset) that is returned in server status messages",
            type: "string",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setProneStepSize",
    desc: "Sets the player's max. step size during prone stance (default: 10.0). Does not affect jump height. Revert this by setting the first argument to undefined. Returns true on success, or undefined on error.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setpronestepsize.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setpronestepsize.htm)",
    example: "player setProneStepSize(20.0); // Double of default",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "size",
            desc: "A float value defining the player's prone step size",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setRechambering",
    desc: "Sets the rechambering state for the specified weapon slot. Does not alter the boltAction setting of the affected weapon. The weapon slot parameter is optional, by default the currently used weapon slot is affected. Returns false if the specified weapon slot is \"none\" or if the specified weapon has boltAction disabled.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setrechambering.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setrechambering.htm)",
    example: "player setRechambering(true, \"primary\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "bool",
            desc: "True or false to enforce the desired rechambering state",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "weaponSlot",
            desc: "Valid weapon slots are \"primary\" and \"primaryb\". Default is the currently used weapon slot",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setSpeed",
    desc: "Set the player's individual speed.\n\n*libcod note:* libcod renamed `setg_speed()` → `setSpeed()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setspeed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setspeed.htm)",
    example: "player setSpeed(220);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerSpeed",
            desc: "The player's new speed (0 = default speed) of type integer",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setStance",
    desc: "Set the player's stance.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setstance.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setstance.htm)",
    example: "player setStance(\"stand\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "stance",
            desc: "One of 'stand', 'crouch', or 'prone'",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setStepSize",
    desc: "Sets the player's max. step size during stand and crouch stance (default: 18.0). Does not affect jump height. Revert this by setting the first argument to undefined. Returns true on success, or undefined on error.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setstepsize.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setstepsize.htm)",
    example: "player setStepSize(36.0); // Double of default",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "size",
            desc: "A float value defining the player's step size",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setTurretSpreadScale",
    desc: "Scales the player's bullet spread when firing a turret. Base value is the spread as defined in the weapon file. The default scale value is 1.0. Returns the previous scale value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setturretspreadscale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setturretspreadscale.htm)",
    example: "player setTurretSpreadScale(2.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "Float factor that defines how much to scale the player's turret bullet spread",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setUserinfo",
    desc: "Sets the key and value in the player's userinfo string.\n\n*libcod note:* libcod renamed `set_userinfo()` → `setUserinfo()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setuserinfo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setuserinfo.htm)",
    example: "player setUserinfo(\"name\", \"KILLTUBE\");",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "key",
            desc: "The key",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "New value of type string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setVelocity",
    desc: "Set the player's velocity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setvelocity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setvelocity.htm)",
    example: "player setVelocity((-400, 0, 100));",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerVelocity",
            desc: "The player's velocity (vector)",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponSpreadScale",
    desc: "Scales the player's bullet/rocket spread, for all weapons except turrets (see setTurretSpreadScale). Base value is the spread as defined in each weapon file. The default scale value is 1.0. Returns the previous scale value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/setweaponspreadscale.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/setweaponspreadscale.htm)",
    example: "player setWeaponSpreadScale(2.0);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "scale",
            desc: "Float factor that defines how much to scale the player's weapon bullet/rocket spread",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "smokeButtonPressed",
    desc: "Returns whether the player presses the smoke grenade button.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/smokebuttonpressed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/smokebuttonpressed.htm)",
    example: "if(player smokeButtonPressed()) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "useEntity",
    desc: "Makes the player use/activate the specified entity (items, triggers, etc.).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/player/useentity.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/player/useentity.htm)",
    example: "player useEntity(ent);",
    callOn: "<player> The player",
    returnType: "",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "entity",
            desc: "The entity to use",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Sound (16 functions) ----

defs.push(new CodFunction({
    name: "clientHasClientMuted",
    desc: "Returns true if the specified player has been muted.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/clienthasclientmuted.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/clienthasclientmuted.htm)",
    example: "if(self clientHasClientMuted(player)) ...",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "player",
            desc: "",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "disableSilent",
    desc: "Reenables some sounds that a player emits during gameplay. This restores footstep, landing, jumping, and foliage sounds for the player so that other players can hear them.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/disablesilent.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/disablesilent.htm)",
    example: "self disableSilent();",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "enableSilent",
    desc: "Disables some sounds that a player emits during gameplay. Further notes:\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/enablesilent.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/enablesilent.htm)",
    example: "self enableSilent();",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getRemainingSoundFileDuration",
    desc: "Returns the currently playing sound's (if played via playSoundFile) remaining duration in seconds (float). Returns 0.0 if no such sound is playing.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/getremainingsoundfileduration.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/getremainingsoundfileduration.htm)",
    example: "playbackTimeLeft = self getRemainingSoundFileDuration();",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSoundAliasesFromFile",
    desc: "Returns the sound alias names (array of strings) for the given file, as they were parsed on map load. The file name is expected to be provided without path (\"soundaliases/\") and suffix (\".csv\") information. If the file does not exist or does not contain applicable content (see note below), an empty array is returned. Note: Similar to soundExists, sound aliases with a loadspec that does not include the current map are not returned.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/getsoundaliasesfromfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/getsoundaliasesfromfile.htm)",
    example: "aliases = getSoundAliasesFromFile(\"iw_sound2\"); if(isDefined(aliases)) logPrintConsole(aliases.size + \" aliases found\\n\"); else logPrintConsole(\"<undefined>\\n\");",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "filename",
            desc: "The sound alias filename in soundaliases/ folder, without .csv suffix",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSoundDuration",
    desc: "Returns the sound's duration in seconds (float), if the sound alias exists. Note: This function can cause lags if used during gameplay. Therefore, it is recommended to call it right on map load to collect all required information. Note: Similar to soundExists, this function returns undefined if the current map is not defined in the sound alias' loadspec.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/getsoundduration.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/getsoundduration.htm)",
    example: "duration = getSoundDuration(\"ctf_touchown\");",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "aliasname",
            desc: "The sound alias to get the duration of",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSoundFileDuration",
    desc: "Returns the sound's duration in seconds (float) if played via playSoundFile. The input file path is built relative to the fs_homepath dvar. The input file is expected to be a raw (header-less) WAV file in signed 16-bit PCM mode (Little Endian), with a single channel (mono) and a sampling rate of 8192 Hz. The sound duration is capped to MAX_CUSTOMSOUNDDURATION minutes, unless the override limit parameter is set to true.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/getsoundfileduration.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/getsoundfileduration.htm)",
    example: "duration = getSoundFileDuration(\"/tmp/test.wav.raw\", true);",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "filePath",
            desc: "The input file path on the server.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "overrideLimit",
            desc: "Return the duration of the sound as if there were no MAX_CUSTOMSOUNDDURATION limit",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSoundInfo",
    desc: "Returns the sound's title and artist strings from its MP3 ID3 tags, if the sound alias exists and the file is an MP3 file. Note: This function can cause lags if used during gameplay. Therefore, it is recommended to call it right on map load to collect all required information. Note: Similar to soundExists, this function returns undefined if the current map is not defined in the sound alias' loadspec.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/getsoundinfo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/getsoundinfo.htm)",
    example: "info = getSoundInfo(\"music123\"); title = info[\"title\"]; artist = info[\"artist\"];",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "aliasname",
            desc: "The sound alias to get the information of",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isPlayingSoundFile",
    desc: "Returns which sound (slot index) initiated via playSoundFile is being played, or zero if none.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/isplayingsoundfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/isplayingsoundfile.htm)",
    example: "playback = self isPlayingSoundFile();",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "loadSoundFile",
    desc: "Loads and encodes a sound file for use with playSoundFile. The input file path is built relative to the fs_homepath dvar. The input file is expected to be a raw (header-less) WAV file in signed 16-bit PCM mode (Little Endian), with a single channel (mono) and a sampling rate of 8192 Hz. On completion of the (threaded) encoding procedure, the callback function is called unless the map has been changed or reloaded (not a fast_restart) in the meantime. The sound duration is capped to MAX_CUSTOMSOUNDDURATION minutes. The number of available sound slots is capped to MAX_CUSTOMSOUNDS. Slots can be reused (to replace sound data) via the sound slot index parameter. playSoundFile can be used already before encoding finishes. Avoid running two encoding jobs on the same sound slot at the same time. Sound data is retained across map switches. Changing the sv_voiceQuality dvar has no effect on already encoded data, so it should be set accordingly before encoding data. The function itself returns the destination sound slot index on success, else undefined. Note: Due to engine limitations, the sound quality is rather low and also depends on the connection quality (packet loss) of the receiving player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/loadsoundfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/loadsoundfile.htm)",
    example: "loadSound() { index = loadSoundFile(\"/tmp/test.wav.raw\", ::encoderDone); if(!isDefined(index)) iprintLn(\"Error at passing sound to encoder, check console for details\"); } encoderDone(index, result) { switch(result) { case 0: iprintLn(\"Sound with index \" + index + \" finished encoding successfully\"); break; case 1: iprintLn(\"Sound with index \" + index + \" is too long and will end playback at max. sound duration\"); break; case 2: iprintLn(\"Sound with index \" + index + \" ran into a file not found error\"); break; case 3: iprintLn(\"Sound with index \" + index + \" ran into an issue while trying to read from the specified file\"); break; default: break; } }",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "filePath",
            desc: "The input file path on the server.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "callbackFunction",
            desc: "Function to call when encoding is done. First parameter is the sound index, second parameter is the encoder's return value (integer, 0 = ok, 1 = song too long and therefore truncated, 2 = file not found, 3 = file read error).",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "volume",
            desc: "A factor ranging from 0.0 to 1.0 (default) where 1.0 is the original volume",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "soundIndex",
            desc: "The sound slot index to fill with data (default: automatically incremented integer). Can be used to reallocate song data for a specific slot",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "loadSpeexFile",
    desc: "Loads a speex-encoded sound file into the specified sound slot. The input file path is built relative to the fs_homepath dvar. The input file is expected to contain a sequence of voice packets of type VoicePacket_t, as saved by saveSpeexFile. The number of available sound slots is capped to MAX_CUSTOMSOUNDS. Returns true on success, else false.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/loadspeexfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/loadspeexfile.htm)",
    example: "loadSpeex() { if(!loadSpeexFile(\"/tmp/test.spx\", 1)) iprintLn(\"Error at loading sound data, check console for details\"); }",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "filePath",
            desc: "The input file path on the server",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "soundIndex",
            desc: "The sound slot index to fill with data",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "muteClient",
    desc: "Mutes player B for player A.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/muteclient.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/muteclient.htm)",
    example: "player_a muteClient(player_b getEntityNumber());",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerId",
            desc: "The entity number of the player to mute for player A",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "playSoundFile",
    desc: "Plays a song via voice chat, based on a sound slot index returned from loadSoundFile or loadSpeexFile. Only one sound can be played at a time. Requires sv_fps to be set to 20 (default), otherwise sound may playback distorted. A script notify with string \"sound_file_done\" is emit for the player as soon as the last voice packet has been queued for sending. Real voice chat coming from the source player will temporarily pause the custom audio stream and resumes automatically (you might use getRemainingSoundFileDuration to see if that is or was the case). This function also works with sv_voice set to \"0\". Playback stops if the source player disconnects. Playback does not stop if mutePlayer is issued in the player's console. Playback stops if cl_voice is set to \"0\" on the player or if the source player is muted manually via uiScript. Returns true on success, else false. Note: Due to engine limitations, the sound quality is rather low and also depends on the connection quality (packet loss) of the receiving player.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/playsoundfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/playsoundfile.htm)",
    example: "self playSoundFile(index, 0, self getEntityNumber());",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "soundIndex",
            desc: "A sound slot index returned from loadSoundFile or loadSpeexFile.",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "offset",
            desc: "Duration in seconds (float) defining how much time to skip on playback (default: 0.0)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "source",
            desc: "The entity number of the emitting player (default: self)",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "saveSpeexFile",
    desc: "Saves sound data from the specified sound slot to the specified file on disk. The output file path is built relative to the fs_homepath dvar. Requires sound data to be loaded into the specified slot first. Returns true on success, else false.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/savespeexfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/savespeexfile.htm)",
    example: "saveSpeex(index) { if(!saveSpeexFile(index, \"/tmp/test.spx\")) iprintLn(\"Error at saving sound data, check console for details\"); }",
    callOn: "",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "soundIndex",
            desc: "The sound slot index to use as source",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "filePath",
            desc: "The output file path on the server",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopSoundFile",
    desc: "Stops sound playback that was initiated via playSoundFile. Returns whether a sound was playing. A script notify with string \"sound_file_stop\" is emit if a sound was playing.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/stopsoundfile.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/stopsoundfile.htm)",
    example: "self stopSoundFile();",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "unmuteClient",
    desc: "Unmutes player B for player A.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/sound/unmuteclient.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/sound/unmuteclient.htm)",
    example: "player_a unmuteClient(player_b getEntityNumber());",
    callOn: "<player> The player",
    returnType: "",
    module: "Sound",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "playerId",
            desc: "The entity number of the player to unmute for player A",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- System (37 functions) ----

defs.push(new CodFunction({
    name: "chr",
    desc: "Returns the string representing a character at the given code point (e.g., an \"A\" character for 65 as input).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/chr.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/chr.htm)",
    example: "c = chr(99);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "number",
            desc: "8-bit number to convert to a string character",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "error",
    desc: "The function will throw a script error. If the server loaded the current map in developer mode or the optional terminal parameter is set to true, the server will halt.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/error.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/error.htm)",
    example: "error(\"unexpected value in function x\", false);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "message",
            desc: "Error message",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "terminal",
            desc: "Flag stating whether the error is terminal (halt server if true). Default: False",
            type: "",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "executeCommand",
    desc: "Executes a text command on the server like via rcon or console input. Note: The execution of map commands (map, devmap, fast_restart, map_restart, map_rotate) is not supported and can result in a server crash.\n\n*libcod note:* libcod renamed `cmd_executestring()` → `executeCommand()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/executecommand.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/executecommand.htm)",
    example: "executeCommand(\"say Welcome to our server!\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "text",
            desc: "Text command to execute",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "file_exists",
    desc: "Checks if a file exists.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/file_exists.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/file_exists.htm)",
    example: "exists = file_exists(\"/home/server/main/server.cfg\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "file",
            desc: "Path to the file",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "file_link",
    desc: "Creates a new link to an existing file. Returns 0 on success or -1 as error.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/file_link.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/file_link.htm)",
    example: "linked = file_link(\"/home/server/files/mp_map.iwd\", \"/home/server/mod/mp_map.iwd\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "source",
            desc: "The old file path",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "dest",
            desc: "The new file path",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "file_unlink",
    desc: "Deletes a file from the file system. Returns 0 on success or -1 as error.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/file_unlink.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/file_unlink.htm)",
    example: "unlinked = file_unlink(\"/home/server/mod/mp_map.iwd\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "file",
            desc: "The path to the file",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "findConfigStringIndex",
    desc: "If found, returns the index of a given configstring that is searched within the given index range. Returns true if the configstring could not be found, or at the first empty configstring within the given index range.\n\n*libcod note:* libcod renamed `g_findConfigStringIndex()` → `findConfigStringIndex()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/findConfigStringIndex.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/findConfigStringIndex.htm)",
    example: "index = findConfigStringIndex(\"Text\", 1310, 1566);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "The string to search",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "minIndex",
            desc: "Start index of configstrings to compare against",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "maxIndex",
            desc: "End index of configstrings to compare against",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "findConfigStringIndexOriginal",
    desc: "If found, returns the index of a given configstring that is searched within the given index range. Raises a script runtime error if the configstring could not be found and the create parameter is set to false. Halts the server if the given configstring should be created, but no configstrings are free in the given index range.\n\n*libcod note:* libcod renamed `g_findConfigStringIndexOriginal()` → `findConfigStringIndexOriginal()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/findConfigStringIndexOriginal.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/findConfigStringIndexOriginal.htm)",
    example: "index = findConfigStringIndexOriginal(\"New Text\", 1310, 1566, false);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "The string to search or set",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "minIndex",
            desc: "Start index of configstrings to compare against",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "maxIndex",
            desc: "End index of configstrings to compare against",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "create",
            desc: "Boolean flag defining whether a free configstring should be set to the value of the search string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "fromHex",
    desc: "Returns the signed integer value of a hexadecimal-formatted string (e.g., \"0x1AB2\" or \"1AB2\").\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/fromhex.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/fromhex.htm)",
    example: "num = fromHex(\"0xDEADBEEF\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "String to convert to a number",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAscii",
    desc: "Returns the signed ASCII number of the first character. Extended ASCII characters therefore return a negative value.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getascii.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getascii.htm)",
    example: "ascii = getAscii(\"a\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "character",
            desc: "String with atleast one character",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getConfigString",
    desc: "Returns the configstring at the given index, or undefined if the configstring is empty. The index ranges for the respecive resources are allocated as follows:\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getconfigstring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getconfigstring.htm)",
    example: "s = getConfigString(1310);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "index",
            desc: "Index of the configstring to return",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCvarFlags",
    desc: "Gets the flags of a cvar (e.g., 0x80 is set for cheat-protected cvars). Returns an error (undefined) if the cvar does not exist.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getcvarflags.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getcvarflags.htm)",
    example: "// MakeCvarServerInfo check if ( getCvarFlags(\"ui_menutext\") & 0x100 ) ...",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "cvar",
            desc: "The cvar name",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getLastTestClientNumber",
    desc: "Returns last test client number.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getlasttestclientnumber.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getlasttestclientnumber.htm)",
    example: "lastTestClientNumber = getLastTestClientNumber();",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getLocalTime",
    desc: "Returns the local time in the format 'Www Mmm dd hh:mm:ss yyyy'.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getlocaltime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getlocaltime.htm)",
    example: "localTime = getLocalTime();",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getMicroseconds",
    desc: "Returns the server's start time (integer) in microseconds. Always returns a positive number. The value overflows (i.e., starts again from zero) every ~35 minutes of server uptime. Due to this high precision and therefore low interval time, this function may fit well for benchmarking/debugging tasks, but not for monitoring long-running procedures. However, keep in mind that this function will introduce some overhead on its own.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getmicroseconds.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getmicroseconds.htm)",
    example: "time = getMicroseconds(); for(i = 0; i < 1000; i++) bulletTrace((0, 0, 0), (0, 0, 8192), true, undefined); logPrintConsole(\"Delta: \" + (getMicroseconds() - time) + \"us\\n\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getMilliseconds",
    desc: "Returns the server's start time (integer) in milliseconds. Always returns a positive number. The value overflows (i.e., starts again from zero) every ~24 days of server uptime.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getmilliseconds.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getmilliseconds.htm)",
    example: "startStartTimeInMs = getMilliseconds();",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getServerStartTime",
    desc: "Returns server start time in the number of seconds since 00:00 hours, Jan 1, 1970 UTC.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getserverstarttime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getserverstarttime.htm)",
    example: "serverStartTime = getServerStartTime();",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "character",
            desc: "String with atleast one character",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSurfaceName",
    desc: "Returns the surface name (string) for a given surface type index.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getsurfacename.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getsurfacename.htm)",
    example: "surface = getSurfaceName(0); // \"default\"",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "index",
            desc: "The surface type index",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getSystemTime",
    desc: "Returns system time (integer) in number of seconds since 00:00 hours, Jan 1, 1970 UTC.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/getsystemtime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/getsystemtime.htm)",
    example: "systemTime = getSystemTime();",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getType",
    desc: "Returns the type of the parameter. A list of possible types can be found here: [link].\n\n*libcod note:* now correctly resolves object types (e.g., struct, array, entity)\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/gettype.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/gettype.htm)",
    example: "type = getType(\"parameter\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "param",
            desc: "Parameter to get the type of",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "kick",
    desc: "Kicks the specified player, optionally with a message that is shown to the client after being disconnected.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/kick.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/kick.htm)",
    example: "kick(self getEntityNumber(), \"Kicked from server\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "clientnum",
            desc: "The client number of the player to kick",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "reason",
            desc: "The message string shown to the player",
            type: "string",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "loadDir",
    desc: "Loads a file system directory.\n\n*libcod note:* libcod renamed `fs_loaddir()` → `loadDir()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/loaddir.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/loaddir.htm)",
    example: "loaded = loadDir(\"/home/server/\", \"mod\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "path",
            desc: "Path to the directory",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "dir",
            desc: "Name of directory",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "logPrintConsole",
    desc: "Prints to the server log file and console. The newline character is not added by default.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/logprintconsole.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/logprintconsole.htm)",
    example: "",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "The string to write to the log file and console",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeClientLocalizedString",
    desc: "Converts a regular string to a localized string (for use on the client side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/makeclientlocalizedstring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/makeclientlocalizedstring.htm)",
    example: "// If self is a player: sendCommandToClient(self getEntityNumber(), \"h \\\"(\" + makeClientLocalizedString(\"GAME_DEAD\") + \")^7\" + self.name + \"^7: I just died.\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "The string to convert",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeLocalizedString",
    desc: "Converts a regular string to a localized string (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/makelocalizedstring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/makelocalizedstring.htm)",
    example: "// If self is a player, level.hud_text a hud element, and text a valid config string: text = \"Welcome \" + self.name; level.hud_text setText(makeLocalizedString(text));",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "The string to convert",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "makeString",
    desc: "Converts a localized string to a regular string (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/makestring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/makestring.htm)",
    example: "// Returns \"QUICKMESSAGE_GRENADE\" text = makeString(&\"QUICKMESSAGE_GRENADE\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "localizedString",
            desc: "The localized string to convert",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "ord",
    desc: "Returns the integer code point value for a given string character (e.g., 65 for an \"A\" character as input).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/ord.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/ord.htm)",
    example: "i = ord(\"A\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "String character to convert to an 8-bit number",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "printf",
    desc: "Prints a message in the server console. Use % to replace it with argument.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/printf.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/printf.htm)",
    example: "printf(\"server % message\\n\", \"console\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "message",
            desc: "Message to print",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "arguments",
            desc: "Message to print",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "processRemoteCommand",
    desc: "libcod function processRemoteCommand.\n\n*libcod note:* no longer requires any parameters to be passed in\n\n*libcod note:* libcod renamed `remoteCommand()` → `processRemoteCommand()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/processremotecommand.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/processremotecommand.htm)",
    example: "CodeCallback_RemoteCommand(from, args) { processRemoteCommand(); }",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "sendCommandToClient",
    desc: "Sends a game server command to the client. Example commands and their use:\n\n*libcod note:* libcod renamed `sendGameServerCommand()` → `sendCommandToClient()`.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/sendcommandtoclient.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/sendcommandtoclient.htm)",
    example: "sendCommandToClient(player getentitynumber(), \"h \\\"console: \" + message + \"\\\"\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "clientnum",
            desc: "The client number of the player",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "command",
            desc: "The game server message",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sendPacket",
    desc: "Sends a UDP datagram to the specified address, containing the provided message (prefixed with 0xFFFFFFFF).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/sendpacket.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/sendpacket.htm)",
    example: "sendPacket(\"192.168.1.1:28960\", \"rcon test map mp_toujane\\n\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "address",
            desc: "The remote address",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "message",
            desc: "The message to send",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setConfigString",
    desc: "Sets a configstring using the specified index, no matter if the configstring was empty or not. The index ranges for the respecive resources are allocated as follows:\n\n*libcod note:* to `<player> setConfigStringForPlayer(<index>, <string>)` and flipped its parameter positions\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/setconfigstring.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/setconfigstring.htm)",
    example: "player setConfigString(index, \"New Text\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "index",
            desc: "Index of the precached string that should be replaced/updated (see /configstrings in client console)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "string",
            desc: "The new value to replace the precached string with",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setConsolePrefix",
    desc: "Sets the prefix of the game console in chat (default: \"console: \"). The setting is persisted across map changes. Returns the new setting of type string.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/setconsoleprefix.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/setconsoleprefix.htm)",
    example: "setConsolePrefix(\"console: \");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "prefix",
            desc: "The console's prefix in chat, limited to MAX_CONSOLE_PREFIX_LENGTH - 1 characters",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sprintf",
    desc: "Returns a composed string with arguments. Use % to replace it with an argument.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/sprintf.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/sprintf.htm)",
    example: "text = sprintf(\"Hello, %!\", \"Killtube\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "format",
            desc: "String that contains a format string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "arguments",
            desc: "Depending on the format string, the function may expect a sequence of additional arguments, each containing a value to be used to replace % in the format string. There should be at least as many of these arguments as the number of values specified in the format specifiers. Additional arguments are ignored by the function",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "system",
    desc: "Executes a shell command and returns the status of the command. In case of an error it will return -1.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/system.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/system.htm)",
    example: "status = system(\"ls\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "command",
            desc: "Command to execute",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "toHex",
    desc: "Returns the hexadecimal-formatted string (e.g., \"0x1AB2\") for a given signed integer.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/tohex.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/tohex.htm)",
    example: "hex = toHex(-559038737);",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "number",
            desc: "Number to convert to a hex-string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "toUpper",
    desc: "Converts the given string to an uppercase string and returns it.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/system/toupper.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/system/toupper.htm)",
    example: "s = toUpper(\"aBcD\");",
    callOn: "",
    returnType: "",
    module: "System",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "string",
            desc: "The string to convert to an uppercase string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Trace (3 functions) ----

defs.push(new CodFunction({
    name: "bulletTrace",
    desc: "Allows script to do a point trace with MASK_SHOT content mask (by default). Returns distance fraction, hit position, hit entity, hit surface normal vector, hit surface type, hit surface flags, hit surface contents, and the hit surface material. Allows to use a custom content mask. If doing so, the hit characters parameter setting is overriden.\n\n*libcod note:* now also returns surface contents and material\n\n*libcod note:* got one more parameter for custom content masks and now also returns surface flags\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/trace/bullettrace.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/trace/bullettrace.htm)",
    example: "trace = bulletTrace(start, end, true, undefined, 41953329 /* 0x2802831 */); /* trace[\"fraction\"] // float between including 0.0 and 1.0, stating how much of the trace distance was passed trace[\"position\"] // hit position; equals to end, if no hit trace[\"entity\"] // hit entity; undefined, if no hit trace[\"normal\"] // normalized bullet direction trace[\"surfacetype\"] // hit surface type; \"none\", if no hit trace[\"flags\"] // hit surface flags; 0, if no hit trace[\"contents\"] // hit surface contents; 0, if no hit trace[\"material\"] // hit surface material; undefined, if no hit or if the surface has no material */",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
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
            desc: "When set to true, this will trace for character hits. Overriden by optional content mask parameter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreEntity",
            desc: "An entity to ignore",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "contentMask",
            desc: "A custom content mask to use instead of MASK_SHOT",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "bulletTracePassed",
    desc: "Allows script to do a point trace with MASK_SHOT. Returns true if trace complete, else returns false. Allows to use a custom content mask. If doing so, the hit characters parameter setting is overriden.\n\n*libcod note:* got one more parameter for custom content masks\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/trace/bullettracepassed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/trace/bullettracepassed.htm)",
    example: "success = bulletTracePassed( magicBulletOrigin.origin, eyePos, true, undefined, 41953329 /* 0x2802831 */ );",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
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
            desc: "When set to true, this will trace for character hits. Overriden by optional content mask parameter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreEntity",
            desc: "An entity to ignore",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "contentMask",
            desc: "A custom content mask to use instead of MASK_SHOT",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "sightTracePassed",
    desc: "Allows script to do a point trace with MASK_OPAQUE_AI (by default). Returns true if trace complete, else returns false. Allows to use a custom content mask. If doing so, the hit characters parameter setting is overriden.\n\n*libcod note:* got one more parameter for custom content masks\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/trace/sighttracepassed.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/trace/sighttracepassed.htm)",
    example: "success = sightTracePassed( magicBulletOrigin.origin, eyePos, true, undefined, 41953329 /* 0x2802831 */ );",
    callOn: "",
    returnType: "",
    module: "Trace",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
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
            desc: "When set to true, this will trace for character hits. Overriden by optional content mask parameter",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "ignoreEntity",
            desc: "An entity to ignore",
            type: "entity",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "contentMask",
            desc: "A custom content mask to use instead of MASK_OPAQUE_AI",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Turret (6 functions) ----

defs.push(new CodFunction({
    name: "canUseTurret",
    desc: "Returns whether the player can use the specified turret. This would not be the case if the turret is already active, or if the player is not located behind the turret, or if the player is holding a grenade, or if the player is not on the ground.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/turret/canuseturret.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/turret/canuseturret.htm)",
    example: "ready = self canUseTurret(turret);",
    callOn: "<player> The player",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "turret",
            desc: "The turret entity to probe for usage",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getTurretOwner",
    desc: "Gets the \"owner\" of this turret\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/turret/getturretowner.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/turret/getturretowner.htm)",
    example: "player = turret getTurretOwner();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isTurret",
    desc: "Returns whether the calling entity is a turret.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/turret/isturret.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/turret/isturret.htm)",
    example: "test = entity isTurret();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isUsingTurret",
    desc: "Returns whether the player is currently using a turret.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/turret/isusingturret.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/turret/isusingturret.htm)",
    example: "use = self isUsingTurret();",
    callOn: "<player> The player",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "stopUseTurret",
    desc: "Makes the player leave its current turret. Returns whether the player was in a turret.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/turret/stopuseturret.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/turret/stopuseturret.htm)",
    example: "self stopUseTurret();",
    callOn: "<player> The player",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "useTurret",
    desc: "Makes the player use/activate the specified turret, unless canUseTurret returns false or undefined. Returns true on success, otherwise false, or undefined on error.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/turret/useturret.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/turret/useturret.htm)",
    example: "self useTurret(turret);",
    callOn: "<player> The player",
    returnType: "",
    module: "Turret",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "player",
            desc: "The player",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "turret",
            desc: "The turret entity to use",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

// ---- Weapons (37 functions) ----

defs.push(new CodFunction({
    name: "addGrenadeFuseTime",
    desc: "Allows modification (positive and negative) of the remaining fuse time of an already spawned grenade entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/addgrenadefusetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/addgrenadefusetime.htm)",
    example: "grenade addGrenadeFuseTime(3);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "time",
            desc: "Time (seconds) to add to the remaining fuse time (float)",
            type: "float",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getGrenadeFuseTime",
    desc: "Returns the remaining fuse time (in seconds) of an already spawned grenade entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getgrenadefusetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getgrenadefusetime.htm)",
    example: "time = grenade getGrenadeFuseTime();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getLoadedWeapons",
    desc: "Returns an array of loaded weapon names. The first element is \"none\". Indexes from this array can be used with switchToWeaponId, for example.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getloadedweapons.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getloadedweapons.htm)",
    example: "loadedweapons = getLoadedWeapons();",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponClipSize",
    desc: "Returns the weapon's ammo clip size.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponclipsize.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponclipsize.htm)",
    example: "clip = getWeaponClipSize(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponCookable",
    desc: "Returns if the weapon is cookable.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponcookable.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponcookable.htm)",
    example: "cookable = getWeaponCookable(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponDamage",
    desc: "Returns the weapon's damage.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweapondamage.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweapondamage.htm)",
    example: "dmg = getWeaponDamage(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponMeleeDamage",
    desc: "Returns the weapon's melee damage.\n\n*Note:* the libcod doc page labels this `getWeaponDamageMelee`, but the engine registers it as `getWeaponMeleeDamage` — this is the name to call.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweapondamagemelee.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweapondamagemelee.htm)",
    example: "dmg = getWeaponMeleeDamage(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponDisplayName",
    desc: "Returns the weapon's display name as a localized string.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweapondisplayname.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweapondisplayname.htm)",
    example: "name = getWeaponDisplayName(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponFireTime",
    desc: "Returns the weapon's fire time in ms.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponfiretime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponfiretime.htm)",
    example: "firetime = getWeaponFireTime(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponFuseTime",
    desc: "Returns the weapon's fuse time in ms.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponfusetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponfusetime.htm)",
    example: "fusetime = getWeaponFuseTime(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponHitLocMultiplier",
    desc: "Returns the weapon's multiplier for the specified hit location.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponhitlocmultiplier.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponhitlocmultiplier.htm)",
    example: "hitloc = \"torso_upper\" dmg = getWeaponHitLocMultiplier(weaponName, hitloc);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hitloc",
            desc: ": (string) The hit location e.g. head, helmet or neck",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponItemAmmo",
    desc: "Returns the ammo count of a weapon entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponitemammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponitemammo.htm)",
    example: "ent = spawn(\"weapon_kar98k_mp\", origin); ammo = ent getWeaponItemAmmo();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponItemClipAmmo",
    desc: "Returns the clip ammo count of a weapon entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponitemclipammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponitemclipammo.htm)",
    example: "ent = spawn(\"weapon_kar98k_mp\", origin); clip = ent getWeaponItemClipAmmo();",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponMaxAmmo",
    desc: "Returns the weapon's max. ammo count.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponmaxammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponmaxammo.htm)",
    example: "max = getWeaponMaxAmmo(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponMeleeTime",
    desc: "Returns the weapon's melee time in ms.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponmeleetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponmeleetime.htm)",
    example: "meleeTime = getWeaponMeleeTime(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponRaiseTime",
    desc: "Returns the weapon's raise time in ms.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponraisetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponraisetime.htm)",
    example: "raiseTime = getWeaponRaiseTime(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponReloadEmptyTime",
    desc: "Returns the weapon's reload empty time in ms.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponreloademptytime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponreloademptytime.htm)",
    example: "reloadEmptyTime = getWeaponDamage(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "getWeaponReloadTime",
    desc: "Returns the weapon's reload time in ms.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/getweaponreloadtime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/getweaponreloadtime.htm)",
    example: "reloadTime = getWeaponReloadTime(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "ignoreWeapon",
    desc: "Adds the specified weapon to the weapon ignore list so that it will not be loaded. Instead, defaultweapon_mp is loaded, unless overriden by setDefaultweapon. At most MAX_WEAPON_IGNORE_SIZE weapons can be added to the ignore list. The ignore list can be cleared with resetIgnoredWeapons. The list remains in memory until cleared or until the server is shut down. Returns true on success, otherwise undefined.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/ignoreweapon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/ignoreweapon.htm)",
    example: "success = ignoreWeapon(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "isSemiAutoWeapon",
    desc: "Returns whether the weapon is a semi-automatic weapon.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/issemiautoweapon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/issemiautoweapon.htm)",
    example: "semi = isSemiAutoWeapon(weaponName);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "resetIgnoredWeapons",
    desc: "Clears the weapon ignore list populated by ignoreWeapon. Always returns undefined.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/resetignoredweapons.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/resetignoredweapons.htm)",
    example: "resetIgnoredWeapons();",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
    ]
}));

defs.push(new CodFunction({
    name: "setDefaultweapon",
    desc: "Replaces defaultweapon_mp (the first weapon loaded after \"none\") with the specified weapon. This has two effects: First, the newly set weapon can be used without allocating an otherwise free weapon slot, it does not need to be precached separately. Second, weapons defined in the ignore list (see ignoreWeapon) will be replaced by the weapon specified here. However, it does not fully replace defaultweapon_mp as a fallback weapon in case a weapon is missing (e.g., a weapon item defined in a map file although the weapon's files are missing), as that weapon name is hard-coded on the client side. The new setting takes effect after a map change or restart, but not after only a fast restart. The new setting, unless overwritten by calling this function again, remains in memory until the server is shut down. Returns 1 on success, 2 if the requested weapon is already set, otherwise undefined.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setdefaultweapon.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setdefaultweapon.htm)",
    example: "setDefaultweapon(\"shotgun_mp\");",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name of the new default weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponClipSize",
    desc: "Set new clip size for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponclipsize.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponclipsize.htm)",
    example: "clipSize = 20; setWeaponClipSize(weaponName, clipSize);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "clipSize",
            desc: "New clip size to set",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponCookable",
    desc: "Set new cookable state for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponcookable.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponcookable.htm)",
    example: "setWeaponCookable(weaponName, cookable);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "cookable",
            desc: "New cookable state to set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponDamage",
    desc: "Set new damage for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweapondamage.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweapondamage.htm)",
    example: "setWeaponDamage(weaponName, dmg);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "dmg",
            desc: "New damage to set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponMeleeDamage",
    desc: "Set new melee damage for the given weapon (on the server side).\n\n*Note:* the libcod doc page labels this `setWeaponDamageMelee`, but the engine registers it as `setWeaponMeleeDamage` — this is the name to call.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweapondamagemelee.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweapondamagemelee.htm)",
    example: "setWeaponMeleeDamage(weaponName, dmg);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "dmg",
            desc: "New melee damage to set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponFireTime",
    desc: "Set new fire time for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponfiretime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponfiretime.htm)",
    example: "fireTime = 100; setWeaponFireTime(weaponName, fireTime);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fireTime",
            desc: "New fire time to set in ms",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponFuseTime",
    desc: "Set new fuse time for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponfusetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponfusetime.htm)",
    example: "fuseTime = 100; setWeaponFuseTime(weaponName, fuseTime);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fuseTime",
            desc: "New fuse time to set in ms",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponHitLocMultiplier",
    desc: "Set new multiplier for the specified hit location for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponhitlocmultiplier.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponhitlocmultiplier.htm)",
    example: "multiplier = 3; hitloc = \"head\"; setWeaponHitLocMultiplier(weaponName, hitloc, multiplier);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "hitloc",
            desc: ": (string) The hit location, e.g., head, helmet or neck",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "multiplier",
            desc: "New multiplier to set",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponItemAmmo",
    desc: "Sets the ammo count for a weapon entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponitemammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponitemammo.htm)",
    example: "ammo = 10; ent = spawn(\"weapon_kar98k_mp\", origin); // Precached weapon ent setWeaponItemAmmo(ammo);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "ammoCount",
            desc: "New ammo count to set",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponItemClipAmmo",
    desc: "Sets the clip ammo count for a weapon entity.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponitemclipammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponitemclipammo.htm)",
    example: "clip = 5; ent = spawn(\"weapon_kar98k_mp\", origin); // Precached weapon ent setWeaponItemClipAmmo(clip);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "clipAmmoCount",
            desc: "New clip ammo count to set",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponMaxAmmo",
    desc: "Set new maximum ammo for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponmaxammo.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponmaxammo.htm)",
    example: "maxammo = 999; setWeaponMaxAmmo(weaponName, maxammo);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "maxAmmo",
            desc: "New max ammo to set",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponMeleeTime",
    desc: "Set new melee time for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponmeleetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponmeleetime.htm)",
    example: "meleeTime = 100; setWeaponMeleeTime(weaponName, meleeTime);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "meleeTime",
            desc: "New melee time to set in ms",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponRaiseTime",
    desc: "Set new raise time for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponraisetime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponraisetime.htm)",
    example: "raiseTime = 100; setWeaponRaiseTime(weaponName, raiseTime);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "raiseTime",
            desc: "New raise time to set in ms",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponReloadEmptyTime",
    desc: "Set empty reload time for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponreloademptytime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponreloademptytime.htm)",
    example: "emptyReloadTime = 50; setWeaponReloadEmptyTime(weaponName, emptyReloadTime);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "emptyReloadTime",
            desc: "New empty reload time in ms",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "setWeaponReloadTime",
    desc: "Set new reload time for the given weapon (on the server side).\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/setweaponreloadtime.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/setweaponreloadtime.htm)",
    example: "reloadTime = 100; setWeaponReloadTime(weaponName, reloadTime);",
    callOn: "",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "weaponName",
            desc: ": (string) The weapon name for this weapon",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "reloadTime",
            desc: "New reload time to set in ms",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "spawnGrenade",
    desc: "Spawns a new grenade and returns a reference to the grenade.\n\n[📖 libcod doc](https://github.com/ibuddieat/zk_libcod/blob/master/doc/script_reference/libcod/weapons/spawngrenade.htm) · [🌐 ibuddie.at](https://www.ibuddie.at/libcod/libcod/weapons/spawngrenade.htm)",
    example: "//attacker = spawn(\"script_origin\", (0, 0, 0)); // world as attacker attacker = self; origin = self getTagOrigin(\"tag_weapon_right\"); dir = anglesToForward(self getPlayerAngles()); velocity = maps\\mp\\_utility::vectorScale(dir, 512); fuseTime = 3; grenade = attacker spawnGrenade(\"frag_grenade_german_mp\", origin, dir, velocity, fuseTime);",
    callOn: "<entity> An entity",
    returnType: "",
    module: "Weapons",
    supportedAt: "",
    games: ['CoD2 MP + zk_libcod'],
    parameters: [
        {
            name: "entity",
            desc: "An entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "weapon",
            desc: "The name of the weapon item to spawn (constant string)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "origin",
            desc: "The position where the grenade is to be spawned (vector)",
            type: "vector",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "direction",
            desc: "The orientation in which the grenade is to be spawned (vector)",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "velocity",
            desc: "The grenade's velocity on spawn (vector)",
            type: "vector",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "fuseTime",
            desc: "The remaining fuse time of the grenade in seconds (float)",
            type: "float",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));



// =============================================================================
// CoD2 MP + CoD2x functions
// Source: https://github.com/callofduty2x/CoD2x (v1.4.6.8, 2026-04-07)
// Docs:   https://cod2x.me/scripting/
// =============================================================================

// ---- Player methods (callOn = yes) ----

defs.push(new CodFunction({
    name: "getIp",
    desc: "Returns the player's IP address as a dotted-decimal string (e.g. \"192.168.1.1\"). Useful for logging, banning, or streaming-overlay integrations.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#getIp)",
    example: "ip = self getIp();\nlogPrint(self.name + \" connected from \" + ip);",
    callOn: "<player> A player entity",
    returnType: "string",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getHWID",
    desc: "Returns the 32-character HWID2 hardware identifier of the player. Used for persistent player identification (e.g. ban systems, streaming overlays). Returns an empty string for bots.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#getHWID)",
    example: "hwid = self getHWID();\nif (isInBanList(hwid)) { kick(self.clientid); }",
    callOn: "<player> A player entity",
    returnType: "string",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getCDKeyHash",
    desc: "Returns the MD5 hash of the player's CD key as sent during connection. This is a client-supplied value and can be spoofed — always use getAuthorizationStatus() to verify whether the key is actually valid. Use as a fallback identifier when HWID is unavailable.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#getCDKeyHash)",
    example: "userId = self getCDKeyHash();",
    callOn: "<player> A player entity",
    returnType: "string",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getAuthorizationStatus",
    desc: "Returns the CD key authorization status string reported by the auth server during connection.\n\nPossible return values:\n- `\"KEY_IS_GOOD\"` — CD key is valid\n- `\"INVALID_CDKEY\"` — key is invalid or already in use by another player\n- `\"CLIENT_UNKNOWN_TO_AUTH\"` — client could not reach the auth server\n- `\"BANNED_CDKEY\"` — CD key is banned\n- `\"\"` (empty) — LAN, listen server, or sv_cracked 1\n\n[📖 cod2x doc](https://cod2x.me/scripting/#getAuthorizationStatus)",
    example: "if (self getAuthorizationStatus() != \"KEY_IS_GOOD\") {\n    kick(self.clientid);\n}",
    callOn: "<player> A player entity",
    returnType: "string",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getViewOrigin",
    desc: "Returns the player's eye/view position as a 3D vector. Unlike getOrigin(), this accounts for stance height and lean offsets — use it for line-of-sight checks, distance-to-point calculations, and anything that needs the actual camera position.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#getViewOrigin)",
    example: "dist = distance(attacker getViewOrigin(), target.origin);",
    callOn: "<player> A player entity",
    returnType: "vector",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "getStance",
    desc: "Returns the player's current stance as a string. Possible values: `\"stand\"`, `\"crouch\"`, `\"prone\"`.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#getStance)",
    example: "stance = self getStance();\nif (stance == \"prone\") { ... }",
    callOn: "<player> A player entity",
    returnType: "string",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "isUsingTurret",
    desc: "Returns true if the player is currently operating a mounted MG turret, false otherwise. Useful to differentiate turret kills from regular bullet kills and to handle turret-related gameplay rules.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#isUsingTurret)",
    example: "if (self isUsingTurret()) {\n    // player is on a turret\n}",
    callOn: "<player> A player entity",
    returnType: "bool",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchPlayerGetData",
    desc: "Returns a value from the match system's per-player data store for this player. Returns an empty string if the key does not exist.\n\nBuilt-in keys automatically populated by the match system: `\"key\"`, `\"uuid\"`, `\"name\"`, `\"team\"` (e.g. `\"team1\"`), `\"team_name\"`, `\"first_time\"` (ISO 8601 timestamp of first data save). Custom keys can be set via matchPlayerSetData().\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchPlayerGetData)",
    example: "uuid = self matchPlayerGetData(\"uuid\");\nteamName = self matchPlayerGetData(\"team_name\");",
    callOn: "<player> A player entity",
    returnType: "string",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "key",
            desc: "The data key to retrieve",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchPlayerSetData",
    desc: "Stores key-value pairs in the match system's per-player data store for this player. Pass an even number of alternating key, value string arguments (minimum 2). Values can be retrieved with matchPlayerGetData().\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchPlayerSetData)",
    example: "self matchPlayerSetData(\"kills\", \"\" + self.kills, \"deaths\", \"\" + self.deaths);",
    callOn: "<player> A player entity",
    returnType: "bool",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        },
        {
            name: "key",
            desc: "First key string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "Value for the first key, followed by additional key-value pairs (must be an even total count)",
            type: "string",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchPlayerIsAllowed",
    desc: "Returns true if the player has logged in with a valid match UUID (`/match login <uuid>`) that appears in the match's player whitelist, false otherwise. Returns false if the match system is not activated.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchPlayerIsAllowed)",
    example: "if (matchIsActivated() && !self matchPlayerIsAllowed()) {\n    kick(self.clientid);\n}",
    callOn: "<player> A player entity",
    returnType: "bool",
    module: "Player",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "player",
            desc: "A player entity",
            type: "",
            isOptional: false,
            isVariableLength: false,
            isCallOn: true
        }
    ]
}));

// ---- Level / global functions (callOn = none) ----

defs.push(new CodFunction({
    name: "http_fetch",
    desc: "Sends an asynchronous HTTP request. The game continues running while the request is in progress. On success, onDoneCallback is called with `(status:int, body:string, headers:array)`; on failure, onErrorCallback is called with `(error:string)`.\n\nHeaders string uses `\\r\\n` as separator (e.g. `\"Content-Type: application/json\\r\\nAccept: application/json\"`).\n\n[📖 cod2x doc](https://cod2x.me/scripting/#http_fetch)",
    example: "http_fetch(\"https://api.example.com/score\", \"POST\", \"{\\\"kills\\\":5}\", \"Content-Type: application/json\", 5000, ::onDone, ::onError);\nonDone(status, body, headers) { if (status == 200) { ... } }\nonError(err) { logPrint(\"HTTP error: \" + err); }",
    callOn: "",
    returnType: "",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "url",
            desc: "The URL to request",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "method",
            desc: "HTTP method: \"GET\", \"POST\", \"PUT\", \"DELETE\", etc.",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "data",
            desc: "Request body (use empty string \"\" for GET requests)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "headers",
            desc: "Additional HTTP headers separated by \\r\\n (use empty string \"\" for none)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "timeout",
            desc: "Request timeout in milliseconds",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onDoneCallback",
            desc: "Function called on success with (status:int, body:string, headers:array)",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onErrorCallback",
            desc: "Function called on failure with (error:string)",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "websocket_connect",
    desc: "Opens a WebSocket connection to the given URL. Returns a connection index (0–15) on success, or -1 if all slots are in use or an error occurs. Up to 16 simultaneous connections are supported.\n\nCallback signatures:\n- `onConnectCallback()` — called when the connection is established\n- `onMessageCallback(message:string)` — called for each incoming text frame\n- `onCloseCallback(isClosedByRemote:bool, isFullyDisconnected:bool)` — called when the connection closes\n- `onErrorCallback(error:string)` — called on connection errors\n\nConnections are automatically closed on map change. The connection index must be stored to use websocket_sendText() and websocket_close().\n\n[📖 cod2x doc](https://cod2x.me/scripting/#websocket_connect)",
    example: "id = websocket_connect(\"wss://api.example.com/ws\", \"\", ::onConnect, ::onMsg, ::onClose, ::onError);\nonMsg(msg) { logPrint(\"WS received: \" + msg); }",
    callOn: "",
    returnType: "int",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "url",
            desc: "WebSocket URL to connect to (ws:// or wss://)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "headers",
            desc: "Optional extra HTTP headers for the handshake, separated by \\r\\n (use empty string \"\" for none)",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onConnectCallback",
            desc: "Called when connection opens (no parameters)",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onMessageCallback",
            desc: "Called when a text message is received (message:string)",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onCloseCallback",
            desc: "Called when connection closes (isClosedByRemote:bool, isFullyDisconnected:bool)",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onErrorCallback",
            desc: "Called on error (error:string)",
            type: "function",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "reconnectDelayMs",
            desc: "Milliseconds to wait before reconnecting after a disconnect (default: 2000)",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "pingIntervalMs",
            desc: "Milliseconds between keep-alive pings (default: 15000; set to 0 to disable)",
            type: "int",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "websocket_sendText",
    desc: "Sends a UTF-8 text frame over the WebSocket connection identified by connectionId. Returns true if the message was queued for sending, false if the connection slot is invalid or not connected.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#websocket_sendText)",
    example: "if (!websocket_sendText(id, \"ping\")) {\n    logPrint(\"WS send failed\");\n}",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "connectionId",
            desc: "Connection index returned by websocket_connect",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "message",
            desc: "UTF-8 text message to send",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "websocket_close",
    desc: "Requests a graceful close of the WebSocket connection at the given index. Returns true if the close was requested successfully, false if the index is invalid or the connection is already gone.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#websocket_close)",
    example: "websocket_close(id);",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "connectionId",
            desc: "Connection index returned by websocket_connect",
            type: "int",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchUploadData",
    desc: "Uploads the current match progress data (global + per-player) to the match server. Returns true if the upload request was sent, false if the match system is not activated.\n\nThe optional callbacks are invoked asynchronously: onDoneCallback is called with no arguments on success; onErrorCallback is called with (error:string) on failure.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchUploadData)",
    example: "matchUploadData(::onUploadDone, ::onUploadError);\nonUploadDone() { logPrint(\"Match data uploaded.\"); }\nonUploadError(err) { logPrint(\"Upload failed: \" + err); }",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "onDoneCallback",
            desc: "Optional function called with no parameters on success",
            type: "function",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "onErrorCallback",
            desc: "Optional function called with (error:string) on failure",
            type: "function",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchSetData",
    desc: "Stores key-value pairs in the match system's global data store. Pass an even number of alternating key, value string arguments (minimum 2). Values can be retrieved with matchGetData().\n\nNote: built-in keys such as `\"match_id\"`, `\"team1_id\"`, `\"team2_id\"`, `\"team1_name\"`, `\"team2_name\"` are auto-populated from the match data and will be overwritten on the next read cycle.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchSetData)",
    example: "matchSetData(\"team1_score\", \"\" + level.team1Score, \"team2_score\", \"\" + level.team2Score);",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "key",
            desc: "First key string",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        },
        {
            name: "value",
            desc: "Value for the first key, followed by additional key-value pairs (must be an even total count)",
            type: "string",
            isOptional: false,
            isVariableLength: true,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchGetData",
    desc: "Returns the global match data value for the given key. Returns an empty string if the key does not exist.\n\nBuilt-in keys auto-populated from match configuration: `\"match_id\"`, `\"team1_id\"`, `\"team2_id\"`, `\"team1_name\"`, `\"team2_name\"`.\n\nDynamic array keys (return arrays): `\"team1_player_uuids\"`, `\"team2_player_uuids\"`, `\"team1_player_names\"`, `\"team2_player_names\"`, `\"maps\"`.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchGetData)",
    example: "format = matchGetData(\"format\");\nmaps = matchGetData(\"maps\");\nteam1UUIDs = matchGetData(\"team1_player_uuids\");",
    callOn: "",
    returnType: "string",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "key",
            desc: "The data key to retrieve",
            type: "string",
            isOptional: false,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchRedownloadData",
    desc: "Triggers a fresh download of match configuration data from the match server, updating all match fields (teams, players, maps, etc.). Returns true if the request was sent successfully, false on failure.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchRedownloadData)",
    example: "matchRedownloadData();",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "matchClearData",
    desc: "Clears all data in both the global match data store and all per-player data stores. Always returns true. Call at the start of a new round to reset tracked statistics.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchClearData)",
    example: "matchClearData();",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "matchIsActivated",
    desc: "Returns true if the CoD2x match system is currently active (i.e. a match has been configured and loaded from the match server), false otherwise. Use this to guard all match-system calls so they don't run on regular public servers.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchIsActivated)",
    example: "if (matchIsActivated()) {\n    teamName = self matchPlayerGetData(\"team_name\");\n}",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: []
}));

defs.push(new CodFunction({
    name: "matchCancel",
    desc: "Cancels the ongoing match and triggers a fast_restart. If a reason string is provided it is sent to the match server as an error message. Returns true if the match system is activated and the cancel was processed, false otherwise.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchCancel)",
    example: "maps = matchGetData(\"maps\");\nif (!maps.size) {\n    matchCancel(\"No maps configured for this match.\");\n}",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: [
        {
            name: "reason",
            desc: "Optional cancellation reason sent to the match server as an error message",
            type: "string",
            isOptional: true,
            isVariableLength: false,
            isCallOn: false
        }
    ]
}));

defs.push(new CodFunction({
    name: "matchFinish",
    desc: "Ends the match cleanly: kicks all players, cancels the match on the match server, then performs a fast_restart. Returns true if the match system is activated, false otherwise.\n\n[📖 cod2x doc](https://cod2x.me/scripting/#matchFinish)",
    example: "if (level.winnerTeam != \"\") {\n    matchFinish();\n}",
    callOn: "",
    returnType: "bool",
    module: "Level",
    supportedAt: "",
    games: ['CoD2 MP + CoD2x'],
    parameters: []
}));
