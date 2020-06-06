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
            canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
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

    createRenderer(params)
    {
        const canvas = params.drawingSurface;
        this.renderer = new THREE.WebGLRenderer({canvas: canvas});
        var width = params.width;
        var height = params.height;
        var pixelRatio = (params.pixelRatio) ? params.pixelRatio : 1;
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