import {Input, Actor, Color, Vector} from 'excalibur';

export class Player extends Actor {
    inventory;

    constructor(options) {
        super(options);
        this.pos = new Vector(200, 200);
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.playerInput(_engine, _delta);
        
    }

    playerInput(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;
        let inputs = 0;

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            inputs++;
            yspeed = -150;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            inputs++;
            xspeed = -150;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            inputs++;
            yspeed = 150;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            inputs++;
            xspeed = 150;
        }   

        if (inputs > 1) {
            xspeed = xspeed/1.414;
            yspeed = yspeed/1.414;
        }
        this.vel = new Vector(xspeed, yspeed);
    }
}

class Inventory {
    player;

    constructor(player) {
        this.player = player;
    }

    addItem() {

    }

    removeItem() {

    }

    calculateEffects() {

    }
}