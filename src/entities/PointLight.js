/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import { Entity } from '../core/Entity.js';

import * as THREE from '../node_modules/three/build/three.module.js';

class PointLight extends Entity
{

    spawn(entity)
    {
        this.entity = new THREE.AmbientLight( 0x404040 );

        /*this.entity = new THREE.PointLight( 0xffffff, 1, 1500 );
        if (entity.position)
        {
            this.entity.position.set(entity.position.x, entity.position.y, entity.position.z);
        }

        this.entity.position.set(0, 2, 2);

        var pointLightHelper = new THREE.PointLightHelper( this.entity, 1 );
        this.entity.add(pointLightHelper);*/

        return this;
    }

}

export {PointLight};