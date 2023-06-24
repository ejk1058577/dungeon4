import '../css/style.css'
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { GameScene } from './scenes/gameScene'
import { DevTool } from '@excaliburjs/dev-tools'

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        
        this.addScene('gameScene', new GameScene());
        this.goToScene('gameScene');
    }
}

new DevTool(new Game())
