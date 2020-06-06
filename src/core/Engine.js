import {Settings} from './Settings.js';
import {Rendering} from './Rendering.js';

class Engine
{
    settings = new Settings();
    rendering = new Rendering(this);

}

export {Engine};