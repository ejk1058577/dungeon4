import { Actor, Color } from "excalibur";
import { Player } from "./player";
import { PointOfInterest } from "./pointofinterest";

export class Portal extends PointOfInterest {
constructor(options, pos) {
        options.width = 50;
        options.height = 50;
        options.color = Color.Magenta;
        options.pos = pos;
        super(options);
    }

    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.on('collisionstart', (e) => {
            if (this.activated) {
                if (e.other instanceof Player) {
                    this.scene.nextFloor();
                }
            }
        });

    }

    activate() {
        super.activate();
        this.color = Color.Magenta.lighten(0.5);
    }
}