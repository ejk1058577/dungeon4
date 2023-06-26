import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import fbImage from '../images/fb.png'
import playerImage from '../images/player.png';
import enemyImage from '../images/enemy.png';

const Resources = {
    Fish: new ImageSource(fishImage),
    Fireball: new ImageSource(fbImage),
    Player: new ImageSource(playerImage),
    Enemy: new ImageSource(enemyImage)
}

const arr = Object.values(Resources);
const ResourceLoader = new Loader(arr);

export { Resources, ResourceLoader }