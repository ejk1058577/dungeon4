import { Actor, Color } from "excalibur";
import { Player } from "./player";
import { Character } from "./character";

export class Enemy extends Character {
    sprite;
    spawner;

    constructor(options, spawner) { //pre-program options like options.x = y
        options.height = 50;
        options.width = 50;
        options.color = Color.Red;
        options.z = 6;

        super(options);

        this.spawner = spawner;
        this.hp = 30;
        this.maxHp = 30;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        //on collision
        this.on('collisionstart', (e) => {
            if (e.other instanceof Player) {
                e.other.damage(10);
            }
        });

        this.on('postkill', () => {
            this.spawner.onEnemyKill(this);
        });
    }
}