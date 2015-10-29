var Liquid = require('liquid.js');

var liquid = new Liquid({
    vdom: {
        transferMethod: 'socket.io',
        path: ''
    }
});

module.exports.addTodo = function(text){

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('toggle');
    checkbox.onclick = toggleDone;

    var destroy = document.createElement('button');
    destroy.classList.add('destroy');
    destroy.onclick = removeTodo;

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