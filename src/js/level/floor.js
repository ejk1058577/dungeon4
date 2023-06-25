import { Actor, Color } from "excalibur";
import { Level } from "./level";

export class Floor {
    scene;
    grid;
    bounds;

    //TODO maybe bad to put everything in constructor
    constructor(scene) {
        this.scene = scene;

        this.bounds = {
            xmax: 4 * 50 + 4 * 140, //4*wall size + 3 * level size,
            xmin: 0, //just make this zero
            ymax: 4 * 50 + 4 * 140,
            ymin: 0
        }

        this.createGrid();

        
    }

    createGrid() {
        this.grid =
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        this.grid.forEach((arr, i) => {
            arr = arr.map((v, j) => {
                //in case of editing something about the level based on num, access {v}

                let hz = j+1; //j+1 = hz position
                let vt = i+1 //i+1 = vt position
                let lvlBounds = {
                    xmax: hz * 50 + hz * 4 * 140,
                    xmin: hz * 50 + (hz-1) * 4 * 140,
                    ymax: vt * 50 + vt * 4 * 140,
                    ymin: vt * 50 + (vt-1) * 4 * 140
                }

                console.log(lvlBounds);

                return new Level(this.scene, lvlBounds);
            });
        });
    }

    createWalls() {

    }
}

class Wall extends Actor {
    or; //0 == hz | 1 == vt, stands for orientation

    constructor(options, pos, or) {
        options.width = this.or == 0 ? 140 : 50;
        options.height = this.or == 0 ? 50 : 140;
        options.Color = Color.Black;

        super(options);
        this.pos = pos;
    }
}