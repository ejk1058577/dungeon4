import { Actor } from "excalibur";

export class Item extends Actor {
    player;
    inventory;
    name;
    description;

    constructor(options, player) {
        super(options);
        this.player = player;
        this.name = '???';
        this.description = 'This impossible item should not exist!';
    }

    //for overrideonly
    applyEffect() {

    }


    //todo: implement this
    display() {

    }
}