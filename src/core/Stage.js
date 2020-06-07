/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import {Camera} from '../entities/Camera.js';
import {PointLight} from '../entities/PointLight.js';

class Stage
{
    cameras = [];
    lightSources = [];
    entities = [];

    constructor(engine)
    {
        this._engine = engine;
    }

    SpawnEntity(entity)
    {
        this.entities.push(entity);
        this._engine.rendering.spawn(entity);
        return entity;
    }

    SpawnCamera()
    {
        var camera = new Camera();
        this.cameras.push(camera);
        return this.SpawnEntity(camera);
    }

    SpawnLight(type, params)
    {
        if (type == 'point')
        {
            var light = new PointLight();
            if (params.color)
            {
                light.color = params.color;
            }
            if (params.intensity)
            {
                light.intensity = params.intensity;
            }
            this.lightSources.push(light);
            return this.SpawnEntity(light);
        }
    }

}

export {Stage};