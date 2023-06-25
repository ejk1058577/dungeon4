import { Actor } from "excalibur";

export class Character extends Actor {
    hp;
    hpBar;

    constructor(options) {
        super(options);
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