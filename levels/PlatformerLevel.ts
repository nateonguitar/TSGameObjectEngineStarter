import { Level, LevelParams, GameObject, Vector2, GameObjectParams, Time, GameManager, Debug } from "game-object-engine/dist";

import { PlatformerPlayer } from '../game_objects/PlatformerPlayer';
import { PlatformerGroundPiece } from "../game_objects/PlatformerGroundPiece";

export class PlatformerLevel extends Level {
    constructor() {
        super(<LevelParams>{
            managingGameObjectClass: PlatformerLevelController,
            imageSrcs: [
                // All images used in this level need to be registered here
                // for proper memory management.
                'images/ground.png',
                'images/Knight/KnightIdle_strip.png',
                'images/Knight/KnightJumpAndFall_strip.png'
            ],
            unitSize: 75
        });
    }
}

export class PlatformerLevelController extends GameObject {

    private player: PlatformerPlayer = null;
    private groundPieces: PlatformerGroundPiece[] = [];
    private gravity: number = 0.0075;

    private playerInitialPosition: Vector2 = null;

    constructor() {
        super();

        this.player = new PlatformerPlayer();
        this.player.transform.position.y = 0;

        // clone so the player's position doesn't update this value
        this.playerInitialPosition = this.player.transform.position.clone();

        // You can attach the camera to any game object to make it follow.
        GameManager.camera.follow(this.player);
        // You can also detach it by:
        // GameManager.camera.follow(null);

        // when you show the debug options, you'll see player information
        // turn debug options on by pressing ctrl + alt + shift + z
        Debug.trackGameObject(this.player);


        // build the ground a few forward
        for (let i=0; i<10; i++) {
            let groundPiece = new PlatformerGroundPiece();
            // shift to the right
            groundPiece.transform.position = new Vector2(groundPiece.transform.size.x * i + i, 1);
            this.groundPieces.push(groundPiece);
        }

        let groundPiece = new PlatformerGroundPiece();
        groundPiece.transform.position = new Vector2(-5, 1);
        this.groundPieces.push(groundPiece);
        
        groundPiece = new PlatformerGroundPiece();
        groundPiece.transform.position = new Vector2(4, -1);
        this.groundPieces.push(groundPiece);
        
        groundPiece = new PlatformerGroundPiece();
        groundPiece.transform.position = new Vector2(6, -2);
        this.groundPieces.push(groundPiece);
        
        groundPiece = new PlatformerGroundPiece();
        groundPiece.transform.position = new Vector2(10, 0);
        this.groundPieces.push(groundPiece);
    }

    // override
    public update(): void {
        this.applyGravity();

        if (this.player.transform.position.y > 3) {
            // clone so we don't mess with the initial position
            this.player.transform.position = this.playerInitialPosition.clone();
        }
    }

    private applyGravity(): void {
        // use Time.deltaTime to keep physics style logic feeling normal
        // even if framerate drops for any reason.
        this.player.transform.position.y += (this.gravity * Time.deltaTime);
    }
}