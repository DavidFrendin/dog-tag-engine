/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

class ScreenManager
{

    offsetList = {};

    constructor(engine)
    {
        this._engine = engine;

        this.offset = {left: 0, right: 0, top: 0, bottom: 0};
    }

    upsertOffset(id, value)
    {
        console.log('upsertOffset for ' + id);
        console.log(value);
        this.offsetList[id] = value;
        this.recalculateOffsets();
    }

    recalculateOffsets()
    {
        this.offset = {left: 0, right: 0, top: 0, bottom: 0};
        console.log(this.offsetList.length);
        for (var key in this.offsetList) {
            this.offset.left += this.offsetList[key].left;
            this.offset.right += this.offsetList[key].right;
            this.offset.top += this.offsetList[key].top;
            this.offset.bottom += this.offsetList[key].bottom;
        }
        console.log('new offsets');
        console.log(this.offset);
        this.updateCanvas();

    }

	updateCanvas()
	{
		var canvas = document.querySelector('canvas');

		var width = window.innerWidth - (this.offset.left + this.offset.right);
		var height = window.innerHeight - (this.offset.top + this.offset.bottom);
        
		this._engine.rendering.resize({width: width, height: height});

        canvas.style.position = 'relative';
        canvas.style.left = '' + this.offset.left + 'px';
        canvas.style.top = '' + this.offset.top + 'px';
        canvas.style.width = '' + width + 'px';
        canvas.style.height = '' + height + 'px';
    }
    
    monitorResizeEvents()
    {
        window.addEventListener( 'resize', this.updateCanvas.bind(this), false );
    }


}

export {ScreenManager};