import {Actor, Color, Rectangle, Vector} from "excalibur";

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
    }
}

class Tile extends Actor {
    constructor(n, pos) {
        super({
            width: 120,
            height: 120,
            color: n % 2 > 0 ? Color.Gray : Color.DarkGray,
        });
        this.pos = pos;
    }
}