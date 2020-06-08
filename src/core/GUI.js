/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

class GUI
{
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
        this._engine.screenManager.offset.top += menubar.offsetHeight;
        this._engine.screenManager.updateCanvas();

    }
}

export {GUI};