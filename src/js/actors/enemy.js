import { Actor, Color, RotationType, Sprite, Vector } from "excalibur";
import { Player } from "./player";
import { Character } from "./character";
import { Resources } from "../resources";

export class Enemy extends Character {
    sprite;
    spawner;
    player;
    walkTarget;
    staggered;
    attackIncr;

    constructor(options, spawner) { //pre-program options like options.x = y
        options.height = 50;
        options.width = 50;
        options.color = Color.Red;
        options.z = 6;

        super(options);

        this.spawner = spawner;
        this.hp = 30;
        this.maxHp = 30;
        this.player = this.spawner.level.scene.player;
        this.walkTarget = this.player.pos;
        this.moveSpeedIncr = this.spawner.level.scene.floorCount > 1 ? 1 + this.spawner.level.scene.floorCount * 0.05 : 1;
        this.attackIncr = this.spawner.level.scene.floorCount > 1 ? 1 + this.spawner.level.scene.floorCount * 0.05 : 1;

        let image = Resources.Enemy;
        let sprite = new Sprite({
            image: image,
            sourceView: {
                width: 16,
                height: 16
            },
            destSize: {
                width: 60,
                height: 60
            }
        });
        this.graphics.use(sprite);
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        let moveSpeed = 100;
        if (this.moveSpeedIncr > 1) moveSpeed = this.moveSpeedIncr*moveSpeed;
        this.walkTarget = this.player.pos;
        let angle = new Vector((this.player.pos.x - this.pos.x), (this.player.pos.y - this.pos.y)).normalize();
        this.vel = new Vector(angle.x * moveSpeed, angle.y * moveSpeed);
        if (this.staggered) {
            this.vel = angle;
        }
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);

        //on collision
        this.on('collisionstart', (e) => {
            if (e.other instanceof Player) {
                e.other.damage(10 * this.attackIncr);
                this.staggered = true;
                _engine.clock.schedule(() => {
                    this.staggered = false;
                }, 500);
            }
        });

        this.on('postkill', () => {
            this.spawner.onEnemyKill(this);
        });
    }
}