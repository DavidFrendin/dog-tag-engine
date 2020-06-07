/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import {Engine} from '../core/Engine.js';
import {Camera} from '../entities/Camera.js';
import {RenderingManager} from './core/RenderingManager.js';

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
        this.renderingManager = new RenderingManager(this);
        this.settings = data.settings;
        this.renderingManager.createRenderer({drawingSurface: data.drawingSurface, width: data.width, height: data.height, pixelRatio: data.pixelRatio});
        this.renderingManager.createScene();
        this.renderingManager.initRendering();
    }

    resize(data)
    {
        this.renderingManager.resize(data.width, data.height);
    }

    spawn(entity)
    {
        if (entity.className = 'Camera')
        {
            var c = new Camera().spawn(entity);
            this.renderingManager.setCamera(c.entity);
        }
    }
}

const rw = new RenderingWorker();

self.onmessage = function(e)
{
    rw.exec(e.data.type, e.data);
};