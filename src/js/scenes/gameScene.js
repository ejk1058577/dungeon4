import { Scene, Color } from "excalibur";
import { Player } from "../actors/player";
import { Floor } from "../level/floor.js";

export class GameScene extends Scene {
    player;
    floor;
    floorCount;

    constructor() {
        super();
        this.floorCount = 1; 
    }

    onActivate(_engine) {
        super.onActivate(_engine);
        this.player = new Player({
            height: 50,
            width: 50,
            color: Color.Blue
        });
        this.floor = new Floor(this);
        this.add(this.player);
        this.camera.strategy.lockToActor(this.player);
    }

    nextFloor() {
        this.actors.forEach(a => {
            a.kill();
        });

        this.floor = new Floor(this);
        this.player = new Player({
            height: 50,
            width: 50,
            color: Color.Blue
        })
        this.add(this.player);
        this.camera.strategy.lockToActor(this.player);
        this.floorCount++;
        console.log(this.floorCount);
    }
}