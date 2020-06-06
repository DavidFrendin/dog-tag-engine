/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import {Camera} from '../entities/Camera.js';

class Stage
{
    cameras = [];
    lightSources = [];
    entities = [];

    SpawnEntity(entity)
    {
        this.entities.push(entity);
        return entity;
    }

    SpawnCamera()
    {
        var camera = new Camera();
        this.cameras.push(camera);
        this.entities.push(camera);
        return camera;
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
            this.entities.push(light);
            return light;
        }
    }

}

export {Stage};