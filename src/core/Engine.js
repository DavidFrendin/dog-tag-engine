/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/
import {Settings} from './Settings.js';
import {Rendering} from './Rendering.js';
import {ScreenManager} from './ScreenManager.js';

class Engine
{
    settings = new Settings();
    rendering = new Rendering(this);
    screenManager = new ScreenManager(this);

}

export {Engine};