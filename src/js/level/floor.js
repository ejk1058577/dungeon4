import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Level } from "./level";

export class Floor {
    scene;
    grid;
    bounds;

    //TODO maybe bad to put everything in constructor
    constructor(scene) {
        this.scene = scene;

        this.bounds = {
            xmax: (4 * 50) + (3 * 4 * 140), //4*wall size + 3 * level size,
            xmin: 200, //200 seems right idk why
            ymax: (4 * 50) + (3 * 4 * 140),
            ymin: 200
        }

        this.createGrid();
        this.createWalls();
    }

    createGrid() {
        this.grid =
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        this.grid.forEach((arr, i) => {
            this.grid[i] = arr.map((v, j) => {
                //in case of editing something about the level based on num, access {v}

                let hz = j+1; //j+1 = hz position
                let vt = i+1 //i+1 = vt position
                let lvlBounds = {
                    xmax: hz * 50 + hz * 4 * 140,
                    xmin: hz * 50 + (hz-1) * 4 * 140,
                    ymax: vt * 50 + vt * 4 * 140,
                    ymin: vt * 50 + (vt-1) * 4 * 140
                }

                return new Level(this.scene, lvlBounds);
            });
        });
    }

    createWalls() {
        this.grid.forEach((arr, i) => {
            arr.forEach((l, j) => {
                //horizontal walls
                for (let h = 0; h < 4; h++) {
                    let pos = new Vector(l.bounds.xmin + (h+1)*140, l.bounds.ymin + 45); //weird 5 offset
                    let wall = new Wall({}, pos, 0);
                    this.scene.add(wall);

                    //final row
                    if (i == 2) {
                        let pos = new Vector(l.bounds.xmin + (h+1)*140, l.bounds.ymax + 100);
                        let wall = new Wall({}, pos, 0);
                        this.scene.add(wall);
                    }
                }

                //vertical walls
                for (let h = 0; h < 4; h++) {
                    let pos = new Vector(l.bounds.xmin + 45, l.bounds.ymin + (h+1)*140);
                    let wall = new Wall({}, pos, 1);
                    this.scene.add(wall);

                    if (j == 2) {
                        let pos = new Vector(l.bounds.xmax + 100, l.bounds.ymin + (h+1)*140);
                        let wall = new Wall({}, pos, 1);
                        this.scene.add(wall);
                    }
                }
            });
        });
    }
}

class Wall extends Actor {
    or; //0 == hz | 1 == vt, stands for orientation

    constructor(options, pos, or) {
        options.width = or == 0 ? 140 : 50;
        options.height = or == 0 ? 50 : 140;
        options.color = Color.Black;
        super(options);
        this.or = or;
        this.pos = pos;
        this.body.collisionType = CollisionType.Fixed;
    }
}