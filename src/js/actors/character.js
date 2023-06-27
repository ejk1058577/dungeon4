import { Actor, CollisionType, Color, ScreenElement, Sprite, Vector } from "excalibur";
import { Resources } from "../resources";

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
            pos: new Vector (character.pos.x, character.pos.y - 60),
            z: 20
        });
        this.character = character;
    }

    onInitialize(_engine) {
        this.character.on('prekill', (e) => this.kill());
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.pos = new Vector (this.character.pos.x, this.character.pos.y - 60);
        this.vel = this.character.vel;
        this.updateBar(this.character.hp, this.character.maxHp);
    }

    updateBar(hp, maxhp) {
        let hpsprite = Math.ceil(hp / maxhp * 10);
        let sprite = new Sprite({
            image: Resources.Healthbar,
            sourceView: {
              // Take a small slice of the source image starting at pixel (10, 10) with dimension 20 pixels x 20 pixels
              x: 0,
              y: hpsprite*3 - 2,
              width: 10,
              height: 2,
            },
            destSize: {
              // Optionally specify a different projected size, otherwise use the source
              width: 80,
              height: 16,
            },
          });
        this.graphics.use(sprite);
    }
}