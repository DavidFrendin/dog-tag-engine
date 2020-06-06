/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import {Engine} from '../core/Engine.js';

class RenderingWorker
{
    exec(type, data)
    {
        if (!RenderingWorker.prototype.hasOwnProperty(type))
            throw new Error('no handler for type: ' + type);

        this[type](data);
    }

    init(data)
    {
        this.engine = new Engine();
        this.engine.settings = data.settings;
        this.engine.rendering.createRenderer({drawingSurface: data.drawingSurface, width: data.width, height: data.height, pixelRatio: data.pixelRatio});
    }
}

const rw = new RenderingWorker();

self.onmessage = function(e)
{
    rw.exec(e.data.type, e.data);
};