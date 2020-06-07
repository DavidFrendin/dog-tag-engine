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
    cameras = [];

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

    rendererResize(width, height)
    {
        if (this.renderer)
        {
            width = width;
            height = height;
            this.renderer.setSize( width, height, false );
        }
    }

    spawn(entity)
    {
        entity.className = entity.__proto__.constructor.name;
        this.worker.postMessage(
        {
            type: 'spawn', entity: entity
        });
    }

    initRendering()
    {
        requestAnimationFrame( this.render.bind(this) );
    }

    setCamera(camera)
    {
        this.cameras.push(camera);
        this.camera = camera;

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        cube.rotation.x += 0.51;
        cube.rotation.y += 0.51;
        
        camera.position.z = 5;
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

        if (this.camera)
        {
            this.renderer.render( this.scene, this.camera );
        }
    
        requestAnimationFrame( this.render.bind(this) );
    
    }

    createScene()
    {
        this.scene = new THREE.Scene();
    }

    createRenderer(params)
    {
        const canvas = params.drawingSurface;
        this.renderer = new THREE.WebGLRenderer({canvas: canvas});
        var width = params.width;
        var height = params.height;
        var pixelRatio = params.pixelRatio;
        var settings = this._engine.settings;

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
        this.renderer.setSize( width, height, false );
        return this.renderer;

    }

    dispose()
    {
        if (!this.initialized)
            return false;
        
        this.worker.terminate();
        
    }
}

export {Rendering};