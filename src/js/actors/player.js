import {Input, Actor, Color, Vector, CollisionType} from 'excalibur';
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
        this.fireballCooldown = 0;
        this.cooldownActive = false;
        this.hp = 100;
        this.maxHp = 100;

        //for testing purposes
        //this.body.collisionType = CollisionType.Passive;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        _engine.input.pointers.on('down', (e) => this.fireball(_engine.input.pointers.primary.lastWorldPos));
        this.on('prekill', (e) => _engine.input.pointers.off('down'));
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.playerInput(_engine, _delta);
        
    }

    playerInput(engine, delta) {
        let moveSpeed = 1000;
        let xspeed = 0;
        let yspeed = 0;
        let inputs = 0;

        if (engine.input.keyboard.isHeld(Input.Keys.W)) {
            inputs++;
            yspeed = -moveSpeed;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            inputs++;
            xspeed = -moveSpeed;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            inputs++;
            yspeed = moveSpeed;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            inputs++;
            xspeed = moveSpeed;
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
    items;

    constructor(player) {
        this.player = player;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
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
        this.body.collisionType = CollisionType.Active;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        this.on('collisionstart', (e) => {
            if (e.other instanceof Enemy) {
                e.other.damage(900);
                this.kill();
            }
        });
    }
}