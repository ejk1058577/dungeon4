import {Input, Actor, Color, Vector, CollisionType, Sprite, RotationType} from 'excalibur';
import { Enemy } from './enemy';
import { Character } from './character';
import { Resources } from '../resources';

export class Player extends Character {
    inventory;
    fireballCooldown;
    fireballLifespan;
    cooldownActive;
    inventory;

    //modifiers

    constructor(options) {
        options.z = 5;

        super(options);
        this.pos = new Vector(200, 200);
    
        this.fireballLifespan = 1600;
        this.fireballCooldown = 0;
        this.cooldownActive = false;
        this.hp = 100;
        this.maxHp = 100;
        this.inventory = new Inventory(this);

        //for testing purposes
        //this.body.collisionType = CollisionType.Passive;
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        _engine.input.pointers.on('down', (e) => this.fireball(_engine.input.pointers.primary.lastWorldPos));
        this.on('prekill', (e) => _engine.input.pointers.off('down'));
        this.pos = new Vector(1010, 1835); //hardcoding this omegalul
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.playerInput(_engine, _delta);
        
    }

    playerInput(engine, delta) {
        let moveSpeed = 1000;
        if (this.moveSpeedIncr > 0) moveSpeed = moveSpeed*(this.moveSpeedIncr/100);

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

    removeItem(item) {
        //not needed for now lol
    }

    pickup(item) {
        this.items.push(item);
        item.applyEffects();
    }
}

class Fireball extends Actor {
    direction;
    angle;

    constructor(options, direction, player) {
        super({
            width: 50,
            height: 50,
            color: Color.Yellow,
            z: 7
        });
        this.angle = direction.toAngle(); //maybe necesarry later
        this.actions.rotateTo(direction.toAngle() + 1.570796, 999, RotationType.ShortestPath);
        this.pos = new Vector(player.pos.x + direction.x*64 , player.pos.y + direction.y*64);
        this.vel = new Vector(direction.x * 360, direction.y * 360);
        this.body.collisionType = CollisionType.Active;
        let image = Resources.Fireball;
        let sprite = new Sprite({
            image: image,
            sourceView: {
                width: 16,
                height: 16
            },
            destSize: {
                width: 50,
                height: 50
            }
        });
        this.graphics.use(sprite);
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