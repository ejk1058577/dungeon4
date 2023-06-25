import {Input, Actor, Color, Vector} from 'excalibur';
import { Enemy } from './enemy';
import { Character } from './character';

export class Player extends Character {
    inventory;
    fireballCooldown;
    fireballLifespan;
    cooldownActive;
    hp;

    constructor(options) {
        options.z = 5;

        super(options);
        this.pos = new Vector(200, 200);
    
        this.fireballLifespan = 1600;
        this.fireballCooldown = 1500;
        this.cooldownActive = false;
        this.hp = 100;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        _engine.input.pointers.on('down', (e) => {
            this.fireball(_engine.input.pointers.primary.lastWorldPos);
        });
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

    fireball(target) {
        if (this.cooldownActive) return;
        this.cooldownActive = true;

        let tarDir = new Vector(target.x - this.pos.x, target.y - this.pos.y).normalize();
        let fb = new Fireball({}, tarDir, this);
        this.scene.add(fb);

        //cooldown
        this.scene.engine.clock.schedule(() => {
            this.cooldownActive = false;
        }, this.fireballCooldown);

        //lifespan
        this.scene.engine.clock.schedule(() => {
            fb.kill();
        }, this.fireballLifespan);
    }

    damage(amount) {
        super.damage(amount);
        console.log(this.hp);
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

class Fireball extends Actor {
    direction;
    angle;

    constructor(options, direction, player) {
        super({
            width: 30,
            height: 30,
            color: Color.Yellow,
            z: 7
        });
        this.angle = direction.toAngle(); //maybe necesarry later
        this.pos = new Vector(player.pos.x + direction.x*64 , player.pos.y + direction.y*64);
        this.vel = new Vector(direction.x * 360, direction.y * 360);
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.on('collisionstart', (e) => {
            if (e.other instanceof Enemy) {
                e.other.damage(10);
                this.kill();
            }
        });
    }
}