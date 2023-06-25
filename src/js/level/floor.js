import { Vector, randomInRange } from "excalibur";
import { Level } from "./level";
import { Wall } from "./wall";
import { Portal } from "../actors/portal";

export class Floor {
    scene;
    grid;
    bounds;
    levels;
    unassignedLevels;

    //TODO maybe bad to put everything in constructor
    constructor(scene) {
        this.scene = scene;

        this.bounds = {
            xmax: (4 * 50) + (3 * 4 * 140), //4*wall size + 3 * level size,
            xmin: 200, //200 seems right idk why
            ymax: (4 * 50) + (3 * 4 * 140),
            ymin: 200
        }

        this.levels = [];

        this.createGrid();
        this.createWalls();

        this.unassignedLevels = this.levels;

        this.spawnPortal();
        this.spawnChest();
        this.spawnFountain();
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

                let level = new Level(this, this.scene, lvlBounds);
                this.levels.push(level);
                return level
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

                    //assoc walls
                    if (this.assocConditions(i, j, h)) {
                        this.grid[i][j].assocWalls.push(wall);
                        if (i > 0) this.grid[i-1][j].assocWalls.push(wall);
                    }

                    //final row
                    if (i == 2) {
                        let pos = new Vector(l.bounds.xmin + (h+1)*140, l.bounds.ymax + 95);
                        let wall = new Wall({}, pos, 0);
                        this.scene.add(wall);
                    }
                }

                //vertical walls
                for (let h = 0; h < 4; h++) {
                    let pos = new Vector(l.bounds.xmin + 45, l.bounds.ymin + (h+1)*140);
                    let wall = new Wall({}, pos, 1);
                    this.scene.add(wall);

                    //assoc walls 2
                    if (this.assocConditions(j, i, h)) { //i and j are flipped for vt
                        this.grid[i][j].assocWalls.push(wall);
                        if (j > 0) this.grid[i][j-1].assocWalls.push(wall);
                    }

                    //final column
                    if (j == 2) {
                        let pos = new Vector(l.bounds.xmax + 95, l.bounds.ymin + (h+1)*140);
                        let wall = new Wall({}, pos, 1);
                        this.scene.add(wall);
                    }
                }
            });
        });
    }

    spawnPortal() {
        let i = this.randomUnassignedLevel();
        this.levels[i].spawner.spawnPoI(3);
        this.unassignedLevels.splice(i , 1);
    }

    spawnChest() {

    }

    spawnFountain() {

    }

    randomUnassignedLevel() {
        let levels = this.unassignedLevels;
        let max = levels.length - 1;
        let min = 0;
        let i = Math.floor(Math.random() * (max - min + 1)) + min;
        return i;
    }

    assocConditions(i, j, h) { //this gets functions because its A LOT of boolean logic
        //i = vertical poz
        //j = horiz poz
        //h = which wall

        if (i==1 || i==2) { 
            if (h==1 && j==0) return true;
            else if (h==2 && j==2) return true;
            else if (h==2 && j==1 && i==1) return true;
            else if (h==1 && j==1 && i==2) return true;
        }

        return false;
    }
}