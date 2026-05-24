/*
	==================================================================
	GSC FORMATTER — SHOWCASE FIXTURE (intentionally messy input)
	------------------------------------------------------------------
	This single file exercises (nearly) every formatter behaviour.
	Compare the three generated outputs side by side:

	    showcase.allman.gsc    gsc.formatting.braceStyle = "Allman"
	    showcase.knr.gsc       gsc.formatting.braceStyle = "K&R"
	    showcase.preserve.gsc  gsc.formatting.braceStyle = "Preserve"

	Each numbered section notes what it demonstrates. The formatter only
	ever changes whitespace — code, comments and strings are untouched.
	==================================================================
*/

#include maps\mp\_utility;
// ------------------------------------------------------------------
// 1) Spacing is normalised and indentation fixed. This function is
//    written K&R: Allman moves the brace down, Preserve keeps it here.
// ------------------------------------------------------------------
init()
{
	level.enabled = getCvarInt("scr_killstreak");
	if (!level.enabled) return;

	// 2) Manually aligned columns (spaces before '=') are PRESERVED.
	level.msg_ready    = &"KS_READY";
	level.msg_used     = &"KS_USED";
	level.icon         = #"ks_hud_icon";

	level.callback = ::onKill;   // 3) function-pointer literal keeps its space
}

// ------------------------------------------------------------------
// 4) Braceless bodies are indented one level; else / else if chains;
//    a switch with nested, stacked and braceless cases.  This function
//    is written Allman: K&R pulls the braces up onto the line above.
// ------------------------------------------------------------------
onKill(attacker)
{
	attacker endon("disconnect");
	attacker.streak++;

	if (attacker.streak < 5)
		return;
	else if (attacker.streak % 5 == 0)
		attacker thread reward();

	for (i = 0; i < level.players.size; i++)
		level.players[i] notify("streak", attacker);

	switch (attacker.streak)
	{
		case 5:
			give(attacker, "uav");
			break;
		case 10:
		case 15:
			if (canAirstrike(attacker))
				give(attacker, "airstrike");
			break;
		default:
			// no reward at this streak
			break;
	}
}

// ------------------------------------------------------------------
// 5) Multi-line statements: continuation lines (inside an unclosed
//    ( or [ , or after a trailing operator) get one extra indent.
//    Also: %xanim ref, a vector, function-pointer argument.
// ------------------------------------------------------------------
reward()
{
	self thread maps\mp\_fx::play(idle,
		self.origin,
		(0, 0, 1));

	valid = isAlive(self) &&
		isDefined(self.team) &&
		self.team != "spectator";

	if (valid)
		thread award(self, ::onAwardDone);
}

// ------------------------------------------------------------------
// 6) Comments are never altered — stacked //, commented-out code and
//    a developer block /# ... #/ (its contents indent like a block).
// ------------------------------------------------------------------
debugDump()
{
	/#
		// these debug lines are kept exactly,
		// even when several are stacked together
		println("streak dump");
		// drawDebugHud();   <- commented-out code survives
	#/
}
