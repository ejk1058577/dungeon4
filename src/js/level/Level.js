import {Actor, CollisionType, Color, Rectangle, Vector} from "excalibur";
import { Enemy } from "../actors/enemy";
import { Chest } from "../actors/chest";
import { Portal } from "../actors/portal";
import { Fountain } from "../actors/fountain";

export class Level {
    scene;
    grid;
    bounds;
    spawner;
    floor;
    assocWalls;
    cleared;
    poi;

    constructor(floor, scene, bounds) { 
        this.floor = floor;
        this.scene = scene;
        this.bounds = bounds;
        this.mobs = [];
        this.assocWalls = [];
        this.cleared = false;
        this.tiles = [];
        this.poi = null;

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
            arr = arr.map((v, j) => {
                let tile = new Tile(v, new Vector((j+1) * 140 + bounds.xmin, (i+1) * 140 + bounds.ymin));
                this.tiles.push(tile);
                return tile;
             }); //make each of the numbers into tiles
            arr.forEach(t => this.scene.add(t)); //add tile to scene
        });

        //make a spawner
        this.spawner = new Spawner(this);
        this.spawner.spawnMobs(this.bounds);
    }

    onLevelClear() {
        this.cleared = true;
        //reveal items?
        //enable fountains / portal?
        if (this.poi != null) this.poi.activate();
        this.assocWalls.forEach(wall => wall.open());
    }
}

class Spawner {
    level;
    scene;
    amount;
    mobs;

    constructor(level) {
        this.level = level;
        this.scene = level.scene;
        this.amount = 3; //increase with levels
    }

    spawnMobs(bounds) {
        for (let i = 0; i < this.amount; i++) {
            let enemy = new Enemy({}, this);
            enemy.pos = this.randomCords(bounds);
            this.scene.add(enemy);
        }
    }

    spawnPoI(n) { //point of interest //0= normal, 1=chest, 2=fountain & 3=portal
        let actor;
        let tile = this.randomTile();
        switch(n) {
            case 0:
                return;
            case 1:
                actor = new Chest({});
            case 2:
                actor = new Fountain({});
            case 3:
                actor = new Portal({}, tile.pos);
        }
        this.scene.add(actor);
        this.level.poi = actor;
    }

    onEnemyKill(enemy) {
        this.amount--;
        if (this.amount <= 0) {
            this.level.onLevelClear();
        }
    }

    randomCords(bounds) {
        let x = Math.random() * ((bounds.xmax - 80) - (bounds.xmin + 80)) + (bounds.xmin + 80);
        let y = Math.random() * ((bounds.ymax - 80) - (bounds.ymin + 80)) + (bounds.ymin + 80);
        return new Vector(x, y);
    }

    randomTile() {
        let tiles = this.level.tiles;
        let max = tiles.length - 1;
        let min = 0;
        let i = Math.floor(Math.random() * (max - min + 1)) + min;
        return tiles[i];
    }
}

class Tile extends Actor {
    constructor(n, pos) {
        super({
            width: 140,
            height: 140,
            color: n % 2 > 0 ? Color.Gray : Color.DarkGray,
            z: 1
        });
        this.pos = pos;
    }
}