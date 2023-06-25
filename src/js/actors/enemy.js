import { Actor, Color } from "excalibur";
import { Player } from "./player";
import { Character } from "./character";

export class Enemy extends Character {
    sprite;

    constructor(options) { //pre-program options like options.x = y
        options.height = 50;
        options.width = 50;
        options.color = Color.Red;
        options.z = 6;

        super(options);

        this.hp = 30;
    }

    onInitialize(_engine) {
        //on collision
        this.on('collisionstart', (e) => {
            console.log(`${this.id} should coll ${e.other.id}`)

            if (e.other instanceof Player) {
                console.log('type is player')
                e.other.damage(10);
            }
        });
    }
}