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
        this.worker = new Worker(base_href + 'worker/rendering.js', { type: 'module' });

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

    dispose()
    {
        if (!this.initialized)
            return false;
        
        this.worker.terminate();
        
    }
}

export {Rendering};