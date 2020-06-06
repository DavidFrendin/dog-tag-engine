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
        throw('init works');
    }
}

const rw = new RenderingWorker();

self.onmessage = function(e)
{
    rw.exec(e.data.type, e.data);
};