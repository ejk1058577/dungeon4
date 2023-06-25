import { Actor, CollisionType } from "excalibur";

export class PointOfInterest extends Actor {
    activated;

    constructor(options) {
        options.z = 4;
        super(options);
        this.activated = false;
        this.body.collisionType = CollisionType.Fixed;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
    }

    activate() {
        this.activated = true;
    }
}