import { Item } from "./item";

export class Pocari extends Item {
    constructor(options, player) {
        super(options, player);

        this.name = 'Pocari Sweat';
        this.description = 'Powerful electrolyte softdrink, increases movement speed by 10%.'
    }

    applyEffects() {
        this.player.moveSpeedIncr += 10;
    }
}