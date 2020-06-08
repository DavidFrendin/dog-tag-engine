/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

import * as THREE from '../../node_modules/three/build/three.module.js';

class RenderingManager
{

    cameras = [];
    screen = {width: 0, height: 0};
    entities = [];

    constructor(worker)
    {
        this.worker = worker;
    }

    createRenderer(params)
    {
        const canvas = params.drawingSurface;
        this.renderer = new THREE.WebGLRenderer({canvas: canvas});
        this.screen.width = params.width;
        this.screen.height = params.height;
        var pixelRatio = params.pixelRatio;
        var settings = this.worker.settings;

        this.renderer.powerPreference = 'high-performance';
        this.renderer.precision = settings.graphics.shaderprecision;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.antialias = !settings.graphics.fxaa;
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = settings.graphics.gamma;
        this.renderer.setPixelRatio( pixelRatio );
        
        this.renderer.shadowMap.enabled = true;
        switch (settings.graphics.shadows)
        {
            case 'basic':
                this.renderer.shadowMap.type = THREE.BasicShadowMap;
                break;
            case 'pcf':
                this.renderer.shadowMap.type = THREE.PCFShadowMap;
                break;
            case 'soft':
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                break;
            case 'vsm':
                this.renderer.shadowMap.type = THREE.VSMShadowMap;
                break;
            default:
                this.renderer.shadowMap.type = THREE.BasicShadowMap;
        }
        
        switch (settings.graphics.tonemap)
        {
            case false:
                this.renderer.toneMapping = THREE.NoToneMapping;
                break;
            case 'linear':
                this.renderer.toneMapping = THREE.LinearToneMapping;
                break;
            case 'reinhard':
                this.renderer.toneMapping = THREE.ReinhardToneMapping;
                break;
            case 'uncharted2':
                this.renderer.toneMapping = THREE.Uncharted2ToneMapping;
                break;
            case 'cineon':
                this.renderer.toneMapping = THREE.CineonToneMapping;
                break;
            case 'aces':
                this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
                break;
            default:
                this.renderer.toneMapping = THREE.NoToneMapping;
        }
        this.renderer.toneMappingExposure = settings.graphics.exposure;
        this.renderer.toneMappingWhitePoint = settings.graphics.whitepoint;
        //this.renderer.setSize( width, height, false );
        this.resize(this.screen.width, this.screen.height);
        return this.renderer;

    }

    resize(width, height)
    {
        if (width)
            this.screen.width = width;

        if (height)
            this.screen.height = height;
        
        if (this.renderer)
        {
            this.renderer.setSize( this.screen.width, this.screen.height, false );
        }

        if (this.camera)
        {
            this.camera.aspect = this.screen.width / this.screen.height;
            this.camera.updateProjectionMatrix();    
        }

    }


    createScene()
    {
        this.scene = new THREE.Scene();
    }

    initRendering()
    {
        requestAnimationFrame( this.render.bind(this) );
    }

    render(time)
    {
        time *= 0.001;

        this.renderer.setClearColor( new THREE.Color( 0.5, 0.5, 0.7 ) );
    
        if (!this.camera)
        {
            if (this.cameras.length > 0)
            {
                this.camera = this.cameras[0];
            }
        }

        for (var i = 0; i < this.entities.length; i++)
        {
            if (this.entities[i].update)
            {
                this.entities[i].update();
            }
        }


        if (this.camera)
        {
            this.renderer.render( this.scene, this.camera );
        }
    
        requestAnimationFrame( this.render.bind(this) );
    
    }

    setCamera(camera)
    {
        this.cameras.push(camera);
        this.camera = camera;
        this.resize();
    }




}

export {RenderingManager};