/**
 * TrueCar Itemizer
 * Created by dean on 9/29/15.
 */
(function () {

    // Set Itemizer object
    var Itemizer = function () {
        return this
    };

    // Init empty list array
    Itemizer.list = [];

    Itemizer.el = function (selector) {
        return document.getElementById(selector);
    }

    // Consume and process list items and then set elements when event is fired
    Itemizer.digest = function () {
        Itemizer.el('listField').value = JSON.stringify(Itemizer.list);
        Itemizer.el('itemsList').innerHTML = '';

        // Loop through our list of items and create individual elements
        var itemsList = Itemizer.list.map(function(item, index){
            var i = index + 1;
            var itemElement =
                '<div class="index">'+i+'&nbsp;.</div><div class="title">'+item+'</div><div class="delete" onClick="Itemizer.removeItem(this, '+index+')">delete</div>';

            var item = document.createElement('div');
            item.innerHTML = itemElement;
            item.className = 'item';
            Itemizer.el('itemsList').appendChild(item);
        });

        Itemizer.el('listField').style.height = 0;
        Itemizer.el('listField').style.height = Itemizer.el('listField').scrollHeight + 'px';
    }

    Itemizer.addItem = function () {
        var item = Itemizer.el('itemField').value;
        Itemizer.list.push(item);
        Itemizer.digest();
    }

    Itemizer.removeItem = function (el, index) {
        el.parentNode.parentNode.removeChild(el.parentNode);
        Itemizer.list.splice(index, 1);
        Itemizer.digest();
    }

    Itemizer.addCollection = function () {
        var listField = Itemizer.el('listField').value;
        try {
            Itemizer.list = JSON.parse(listField);
            Itemizer.digest();
        } catch (error) {
            // Normally, you would want to sanitize and validate, but for the sake of simplicity...
            console.log('Load valid JSON only!', error);
        }
    }

    Itemizer.el('addItemBtn').addEventListener("click", Itemizer.addItem, false);
    Itemizer.el('addJSONBtn').addEventListener("click", Itemizer.addCollection, false);


    if(!document.Itemizer) {
        document.Itemizer = Itemizer;
    }

})();