import { Actor, Color } from "excalibur";
import { PointOfInterest } from "./pointofinterest";
import { Pocari } from "./items/pocari";
import { Player } from "./player";

export class Chest extends PointOfInterest {
    constructor(options, pos) {
        options.width = 50;
        options.height = 50;
        options.color = Color.Orange;
        options.pos = pos;
        super(options);
    }

    onInitialize(_engine) { 
        super.onInitialize();
        this.on('collisionstart', (e) => {
            if (this.activated) {
                if (e.other instanceof Player) {
                    this.dropItem(e.other);
                    this.kill();
                }
            }
        });
    }

    activate() {
        super.activate();
        this.color = Color.Orange.lighten(0.5);
        this.scene.score++;
    }

    dropItem(player) {
        let max = 1; //change this when more item
        let min = 1;
        let i = Math.floor(Math.random() * (max - min + 1)) + min;
        let item;

        switch(i) {
            case 1:
                item = new Pocari({}, player);
        }

        item.pos = this.pos;
        this.scene.add(item);
    }
}