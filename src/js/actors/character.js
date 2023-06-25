import { Actor, CollisionType } from "excalibur";

export class Character extends Actor {
    hp;
    hpBar;

    constructor(options) {
        super(options);
        this.body.collisionType = CollisionType.Active;
    }

    damage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.kill();
        }
    }

    updateHpBar() {

    }
}

class hpBar {
    //TODO
}