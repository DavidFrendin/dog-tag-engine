/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import {Entity} from '../core/Entity.js';
import * as THREE from '../node_modules/three/build/three.module.js';

class TestEntity extends Entity
{
    spawn(entity)
    {
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        this.entity = new THREE.Mesh( geometry, material );
        this.entity.rotation.x += 0.51;
        this.entity.rotation.y += 0.51;

        return this;
    }

    update()
    {
        this.entity.rotation.x += 0.01;
        this.entity.rotation.y += 0.01;
    }
}

export {TestEntity};