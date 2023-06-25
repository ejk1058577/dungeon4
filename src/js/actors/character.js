import { Actor, CollisionType, Color, ScreenElement, Vector } from "excalibur";

export class Character extends Actor {
    hp;
    maxHp;
    hpBar;
    moveSpeedIncr; //needed for harder monsters

    constructor(options) {
        super(options);
        this.body.collisionType = CollisionType.Active;
        this.hpBar = new HPBar(this);
        this.hp = 0;
        this.maxHp = 0;
        this.moveSpeedIncr = 0;
    }

    onInitialize(_engine) {
        this.scene.add(this.hpBar);
    }

    damage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.kill();
        }
    }
}

class HPBar extends Actor {
    character;

    constructor(character) {
        super({
            width: 80,
            height: 16,
            color: Color.Black,
            pos: new Vector (character.pos.x, character.pos.y - 40),
            z: 20
        });
        this.character = character;
    }

    onInitialize(_engine) {
        this.character.on('prekill', (e) => this.kill());
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.pos = new Vector (this.character.pos.x, this.character.pos.y - 40);
        this.vel = this.character.vel;
    }
}