import { GameObject, GameObjectParams, SpritesheetAnimationSet, SpritesheetAnimation, Transform, Vector2, Input, Keys, Time } from "game-object-engine/dist";
import { SpritesheetAnimationSetParams } from "game-object-engine/dist/SpritesheetAnimationSet";
import { SpritesheetAnimationParams } from "game-object-engine/dist/SpritesheetAnimation";
import { PlatformerGroundPiece } from "./PlatformerGroundPiece";

export class PlatformerPlayer extends GameObject {

    // Medieval Fantasy Character Pack sprite-sheets created by OcO: https://oco.itch.io/medieval-fantasy-character-pack
    // other work from OcO: https://oco.itch.io/

    // images\Knight\KnightAttack_strip.png
    // images\Knight\KnightDeath_strip.png
    // images\Knight\KnightIdle_strip.png
    // images\Knight\KnightJumpAndFall_strip.png
    // images\Knight\KnightRoll_strip.png
    // images\Knight\KnightRun_strip.png
    // images\Knight\KnightShield_strip.png

    private movementSpeed = new Vector2(0.005, 0.0175);
    
    constructor() {
        super();
        this.transform.size = new Vector2(0.75, 1);
        this.setAnimations();

        // see PlatformGroundPiece class for a better example of setting a collider
        this.setDefaultCollider();
    }

    private setAnimations(): void {

        let idleSize = new Vector2(26, 30);
        let idleOffset = new Vector2(70, 14);
        let idleStartX = 39;
        let idleAnimationTransforms = [];
        for (let i=0; i<15; i++) {
            let p = new Vector2(idleStartX + idleOffset.x * i + idleSize.x * i,  idleOffset.y );
            let t = new Transform({ position: p, size: idleSize });
            idleAnimationTransforms.push(t);
        }
        console.log(idleAnimationTransforms);
        this.spritesheetAnimationSet = new SpritesheetAnimationSet(<SpritesheetAnimationSetParams>{
            spritesheetAnimations: {
                'idle': new SpritesheetAnimation(<SpritesheetAnimationParams>{
                    // make sure you register this iamge with the level for proper memory management
                    imageSrc: 'images/Knight/KnightIdle_strip.png',
                    transforms: idleAnimationTransforms,
                    //// Could have done transforms like this, but it was easier in the loop above.
                    //// Small animation sets might be more readable like this:
                    // transforms: [
                    //     new Transform({position: new Vector2(39,  14), size: new Vector2(26, 30)}),
                    //     new Transform({position: new Vector2(135, 14), size: new Vector2(26, 30)}),
                    //     . . .
                    // ],
                    msPerFrame: 100
                }),
                'jumping': new SpritesheetAnimation({
                    imageSrc: 'images/Knight/KnightJumpAndFall_strip.png',
                    transforms: [
                        new Transform({position: new Vector2(948, 0), size: new Vector2(23, 32)}),
                    ],
                    loop: false
                }),
            },
            startAnimationName: 'idle'
        });
        this.spritesheetAnimationSet.currentAnimationName = 'jumping';
    }

    // override
    public update(): void {
        if (Input.keys(Keys.Space)) {
            // for simplicity sake as this is a proof of concept, space gives infinite jump.
            // see the other example projects for more complex movement controls.
            this.transform.position.y -= this.movementSpeed.y * Time.deltaTime;
            this.spritesheetAnimationSet.currentAnimationName = 'jumping';
        }
        if (Input.keys(Keys.ArrowLeft) || Input.keys(Keys.KeyA)) {
            this.transform.position.x -= this.movementSpeed.x * Time.deltaTime;
            if (this.transform.size.x > 0) {
                this.transform.size.x = -this.transform.size.x;
            }
        }
        if (Input.keys(Keys.ArrowRight) || Input.keys(Keys.KeyS)) {
            this.transform.position.x += this.movementSpeed.x * Time.deltaTime;
            if (this.transform.size.x < 0) {
                this.transform.size.x = -this.transform.size.x;
            }
        }
    }

    public onNoPassthroughTouch(other: GameObject, side: string): void {
        // `side` will be "top", "bottom", "left", or "right" to show what side this object touched.
        // "top" means we bumped our head.
        if (other instanceof PlatformerGroundPiece) {
            if (side == 'bottom') {
                if (this.spritesheetAnimationSet.currentAnimationName != 'idle') {
                    this.spritesheetAnimationSet.currentAnimationName = 'idle';
                }
            }
        }
    }
}