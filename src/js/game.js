import '../css/style.css'
import { Actor, Color, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { GameScene } from './scenes/gameScene'
import { DevTool } from '@excaliburjs/dev-tools'

const colorCrust = {r: 35, g: 38, b: 52};
const colorSurface = {r: 81, g :87, b: 109};

export class Game extends Engine {
    
    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame());
        this.backgroundColor = colorCrust;
    }

    startGame() {
        console.log("start de game!")
        
        this.addScene('gameScene', new GameScene());
        this.goToScene('gameScene');
    }
}

new DevTool(new Game())
