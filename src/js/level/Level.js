import {Actor, Color, Rectangle, Vector} from "excalibur";
import { Enemy } from "../actors/enemy";

export class Level {
    scene;
    grid;

    constructor(scene) {
        this.scene = scene;

        //make grid
        this.grid =
        [
            [1, 2, 1, 2],
            [2, 1, 2, 1],
            [1, 2, 1, 2],
            [2, 1, 2, 1]
        ];

        //make tile for each
        this.grid.forEach((arr, i) => {
            arr = arr.map((v, j) => new Tile(v, new Vector((j+1) * 120 + 50, (i+1) * 120 + 50))); //make each of the numbers into tiles
            arr.forEach(t => this.scene.add(t)); //add tile to scene
        });

        //make a spawner
        this.spawner = new Spawner(this);
        this.spawner.spawnMobs();
    }
}

class Spawner {
    level;
    scene;
    amount;

    constructor(level) {
        this.level = level;
        this.scene = level.scene;
        this.amount = 3; //increase with levels
    }

    spawnMobs() {
        let bounds = { //probably make a floor class to manage this stuff, each floor own spawner? or just spawner func?
            xmax: 50 + 4*120,
            xmin: 100,
            ymax: 50 + 4*120,
            ymin: 100
        }

        for (let i = 0; i < this.amount; i++) {
            let enemy = new Enemy({});
            enemy.pos = this.randomCords(bounds);
            this.scene.add(enemy);
        }

    }

    randomCords(bounds) {
        let x = Math.floor(Math.random() * (bounds.xmax - bounds.xmin) + bounds.xmin);
        let y = Math.floor(Math.random() * (bounds.ymax - bounds.ymin) + bounds.ymin);
        return new Vector(x, y);
    }
}

class Tile extends Actor {
    constructor(n, pos) {
        super({
            width: 120,
            height: 120,
            color: n % 2 > 0 ? Color.Gray : Color.DarkGray,
            z: 1
        });
        this.pos = pos;
    }
}