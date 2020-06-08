/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import * as THREE from '../node_modules/three/build/three.module.js';
import {Engine} from '../core/Engine.js';
import {Camera} from '../entities/Camera.js';
import {TestEntity} from '../entities/TestEntity.js';
import {PointLight} from '../entities/PointLight.js';
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

    spawn(data)
    {
        var entity = data.entity;
        if (entity.className == 'Camera')
        {
            var ent = new Camera().spawn(entity);
            this.renderingManager.entities.push(ent);
            this.renderingManager.setCamera(ent.entity);
        }
        else if (entity.className == 'TestEntity')
        {
            var ent = new TestEntity().spawn(entity);
            this.renderingManager.entities.push(ent);
            this.renderingManager.scene.add(ent.entity);
        }
        else if (entity.className == 'PointLight')
        {
            var ent = new PointLight().spawn(entity);
            this.renderingManager.entities.push(ent);
            this.renderingManager.scene.add(ent.entity);
        }
        else
        {
            throw('unknown entity ' + entity.className);
        }
    }
}

const rw = new RenderingWorker();

self.onmessage = function(e)
{
    rw.exec(e.data.type, e.data);
};