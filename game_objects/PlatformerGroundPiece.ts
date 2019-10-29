import { GameObject, GameObjectParams, Vector2, RectCollider } from "game-object-engine/dist";

export class PlatformerGroundPiece extends GameObject {
    constructor() {
        super(<GameObjectParams>{
            imageSrc: 'images/ground.png'
        });
        this.transform.size = new Vector2(5, 1);
        
        // gives this object a RectCollider
        this.setDefaultCollider();
        this.collider.allowPassThroughWhitelist = []

        // could have also
        // allowPassThroughWhiteList:
	    // * Defines what class names do we allow to pass through.
	    // * `whitelist = null` means we allow everything to pass through.
        // * `whitelist = []` means we allow nothing to pass through.
        // * `whitelist = [ScaryMonster]` means we allow the `ScaryMonster` class to pass through
        
        // Above code using setDeafultCollider() is the same as:
        // this.collider = new RectCollider({
        //     position: new Vector2(1, 1),
        //     size: new Vector2(1, 1),
        //     allowPassThroughWhitelist: []
        // });
    }
}