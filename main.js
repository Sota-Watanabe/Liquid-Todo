var Liquid = require('liquid.js');

var liquid = new Liquid();

module.exports.addTodo = function(text){

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('toggle');
    checkbox.addEventListener('click', toggleDone);
    checkbox.setAttribute('data-handler', 'toggleClick');

    liquid.registerHandler('toggleClick', {'click': toggleDone});

    var destroy = document.createElement('button');
    destroy.classList.add('destroy');
    destroy.addEventListener('click', removeTodo);
    destroy.setAttribute('data-handler', 'destroyClick');
    liquid.registerHandler('destroyClick', {'click': removeTodo});

    var todo = document.createElement('label');
    todo.textContent = text;

    var element = document.createElement('li')
    element.classList.add('list-group-item');
    element.appendChild(checkbox);
    element.appendChild(todo);
    element.appendChild(destroy);

    document.querySelector('.todo-list').appendChild(element);
    document.getElementById('todo-text').value = "";

};

var toggleDone = function(event){
    var element = event.target;
    if ( element.nextSibling.classList.contains('done') ){
        element.nextSibling.classList.remove('done');
    }
    else {
        element.nextSibling.classList.add('done');
    }
};

var removeTodo = function(event){
    var element = event.target.parentNode;
    element.parentNode.removeChild(element);
};

module.exports.removeTodo = removeTodo;

module.exports.transfer = function(){
    liquid.vdom.virtualize()
    liquid.vdom.transfer();
};