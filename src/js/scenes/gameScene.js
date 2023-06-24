import { Scene, Color } from "excalibur";
import { Level } from "../level/Level";
import { Player } from "../actors/player";

export class GameScene extends Scene {
    player;
    level;

    onActivate(_engine) {
        super.onActivate(_engine);
        this.level = new Level(this);
        this.player = new Player({
            height: 50,
            width: 50,
            color: Color.Blue
        })
        this.add(this.player);
        this.camera.strategy.lockToActor(this.player);
    }
}