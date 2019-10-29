import { GameLauncher, GameOptions } from "game-object-engine/dist";

import { PlatformerLevel } from './levels/PlatformerLevel';

function gameLauncher() {
    new GameLauncher(<GameOptions>{
        backgroundColor: "#330000",
        border: "1px solid red",
        allowToggleDebug: true,
        screenHeight: 800,
        screenWidth: 1000,
        levelClasses: {
            'PlatformerLevel': PlatformerLevel,
        },
        initialLevel: 'PlatformerLevel'
    });
}
window.addEventListener('load', gameLauncher, false);