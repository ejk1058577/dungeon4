import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import fbImage from '../images/fb.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Fireball: new ImageSource(fbImage)
}

const arr = Object.values(Resources);
const ResourceLoader = new Loader(arr);

export { Resources, ResourceLoader }