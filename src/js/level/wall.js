import { Actor, CollisionType, Color, Vector } from "excalibur";

export class Wall extends Actor {
    or; //0 == hz | 1 == vt, stands for orientation

    constructor(options, pos, or) {
        options.width = or == 0 ? 140 : 50;
        options.height = or == 0 ? 50 : 140;
        options.color = Color.Black;
        super(options);
        this.or = or;
        this.pos = pos;
        this.body.collisionType = CollisionType.Fixed;
    }

    open() {
        this.body.collisionType = CollisionType.Passive;
        this.color = Color.Azure;
    }
}