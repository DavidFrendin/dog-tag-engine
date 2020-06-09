/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

class GUI
{
    portlets = {left: [], right: [], top: [], bottom: []};

    constructor(engine)
    {
        this._engine = engine;

    }

    createMenubar(menu)
    {
        var menubar = document.getElementById('dte-menubar');
        if (menubar)
        {
            return; //menubar allready exists
        }

        menubar = document.createElement('div');
        var menubarId = document.createAttribute('id');
        menubarId.value = 'dte-menubar';
        menubar.setAttributeNode(menubarId);

        var ul = document.createElement('ul');
        for (var i = 0; i < menu.length; i++)
        {
            var name = menu[i].name;
            var li = document.createElement('li');
            var label = document.createElement('label')
            label.appendChild(document.createTextNode(name));
            li.appendChild(label);

            var liTabindex = document.createAttribute('tabindex');
            liTabindex.value = '0';
            li.setAttributeNode(liTabindex);

            //children
            if (menu[i].children)
            {
                var childUl = document.createElement('ul');
                for (var j = 0; j < menu[i].children.length; j++)
                {
                    var childName = menu[i].children[j].name;
                    var childLi = document.createElement('li');
                    var childLabel = document.createElement('label')
                    childLabel.appendChild(document.createTextNode(childName));
                    childLi.appendChild(childLabel);
        
                    var childLiTabindex = document.createAttribute('tabindex');
                    childLiTabindex.value = '0';
                    childLi.setAttributeNode(childLiTabindex);

                    if (menu[i].children[j].click)
                    {
                        childLi.onclick = menu[i].children[j].click;
                    }
        
                    childUl.appendChild(childLi);
                }
                li.appendChild(childUl);
            }

            ul.appendChild(li);
        }
        menubar.appendChild(ul);


        document.body.appendChild(menubar);
        
        this._engine.screenManager.upsertOffset('menubar', {top: menubar.offsetHeight, bottom: 0, left: 0, right: 0});

        //this._engine.screenManager.offset.top += menubar.offsetHeight;
        //this._engine.screenManager.updateCanvas();

    }

    createPortlet(location, type)
    {
        return new Portlet(this._engine);
    }



}

class Portlet
{
    portletContainers = [];

    constructor(engine)
    {
        this._engine = engine;
        this.htmlElement = document.createElement('div');
        this.htmlElement.className = 'dte-portlet dte-portlet-left dte-portlet-icon-navigation';
        var top = engine.screenManager.offset.top;
        this.htmlElement.style = 'left: 0px; top: ' + top + 'px; bottom: 0px;';

        //icon container
        this.iconContainerElement = document.createElement('ul');
        this.htmlElement.appendChild(this.iconContainerElement);

        document.body.appendChild(this.htmlElement);
        
        window.setTimeout(function(){
            this._engine.screenManager.upsertOffset('portlet-left', {top: 0, bottom: 0, left: this.htmlElement.offsetWidth, right: 0});
        }.bind(this), 200);

    }

    addContainer(params)
    {
        var container = {};
        container.name = params.name;
        container.uuid = this.uuidv4();

        var portletItem = document.createElement('li');
        var portletItemIcon = document.createElement('img');
        portletItemIcon.src = params.icon;
        portletItem.appendChild(portletItemIcon);
        portletItem.title = params.name;
        portletItem.setAttribute('dte-target', container.uuid);
        portletItem.setAttribute('anim', 'ripple');
        this.iconContainerElement.appendChild(portletItem);

        container.icon = portletItem;
        container.icon.addEventListener('click', e => {

            var el = container.icon;
            e = e.touches ? e.touches[0] : e;
            const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
            el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop; 
            el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
    
            
            for (var i = 0; i < event.path.length; i++)
            {
                var dteTarget = event.path[i].getAttribute('dte-target');
                if (dteTarget)
                {
                    this.setContainer(dteTarget);
                    return;
                }
            }

        });


/*        container.icon.onclick = function (event)
        {
        }.bind(this);*/

        this.bladeElement = document.createElement('div');
        this.bladeElement.className = 'dte-blade';
        this.bladeElement.setAttribute('dte-id', container.uuid);
        this.bladeElement.style = 'display: none;'
        var bladeCaption = document.createElement('div');
        bladeCaption.className = 'caption';
        bladeCaption.appendChild(window.document.createTextNode(params.name));
        this.bladeElement.appendChild(bladeCaption);
        container.bladeElement = this.bladeElement;

        this.htmlElement.appendChild(this.bladeElement);


        window.setTimeout(function(){
            this._engine.screenManager.upsertOffset('portlet-left', {top: 0, bottom: 0, left: this.htmlElement.offsetWidth, right: 0});
        }.bind(this), 200);

        this.portletContainers.push(container);
    }

    setContainer(uuid)
    {
        for (var i = 0; i < this.portletContainers.length; i++)
        {
            if (this.portletContainers[i].uuid == uuid)
            {
                console.log('found uuid');
                this.portletContainers[i].icon.classList.add('selected');
                this.portletContainers[i].bladeElement.style = '';

            }
            else
            {
                this.portletContainers[i].icon.classList.remove('selected');
                this.portletContainers[i].bladeElement.style = 'display: none';
            }
        }

        window.setTimeout(function(){
            this._engine.screenManager.upsertOffset('portlet-left', {top: 0, bottom: 0, left: this.htmlElement.offsetWidth, right: 0});
        }.bind(this), 200);

    }

    uuidv4()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}

export {GUI};