/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import * as THREE from '../node_modules/three/build/three.module.js';

class Rendering
{
    worker = false;
    initialized = false;

    constructor(engine)
    {
        this._engine = engine;
    }

    init()
    {
        if (this.initialized)
            return false;

        var canvas = document.querySelector('canvas');
        if (!canvas)
        {
            var canvasContainer = document.createElement('div');
            canvas = document.createElement('canvas');
            canvasContainer.appendChild(canvas);
            document.body.appendChild(canvasContainer);
        }

        var offscreen = canvas.transferControlToOffscreen();

        var base_href = this._engine.settings.web.base_href;
        this.worker = new Worker(base_href + 'worker/RenderingWorker.js', { type: 'module' });

        this.worker.postMessage(
        {
            type: 'init', drawingSurface: offscreen,
            width: canvas.clientWidth,
            height: canvas.clientHeight,
            pixelRatio: window.devicePixelRatio,
            path: '../../',
            settings: this._engine.settings
        }, [offscreen]);
    }

    resize(params)
    {
        this.worker.postMessage(
        {
            type: 'resize',
            width: params.width,
            height: params.height
        });
    }

    spawn(entity)
    {
        entity.className = entity.__proto__.constructor.name;
        this.worker.postMessage(
        {
            type: 'spawn', entity: entity
        });
    }





    dispose()
    {
        if (!this.initialized)
            return false;
        
        this.worker.terminate();
        
    }
}

export {Rendering};