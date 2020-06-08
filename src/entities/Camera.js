/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import {Entity} from '../core/Entity.js';
import * as THREE from '../node_modules/three/build/three.module.js';

class Camera extends Entity
{
    spawn(entity)
    {
        this.entity = new THREE.PerspectiveCamera( 75, 640 / 480, 0.1, 1000 );
        if (entity.position)
        {
            this.entity.position.set(entity.position.x, entity.position.y, entity.position.z);
        }
        return this;
    }

}

export {Camera};