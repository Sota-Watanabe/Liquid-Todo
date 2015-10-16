var Liquid = require('liquid.js');

var liquid = new Liquid();

module.exports.addTodo = function(text){

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('toggle');

    var destroy = document.createElement('button');
    destroy.classList.add('destroy');

    var todo = document.createElement('label');
    todo.textContent = text;

    var element = document.createElement('li')
    element.classList.add('list-group-item');
    element.appendChild(checkbox);
    element.appendChild(todo);
    element.appendChild(destroy);



    document.querySelector('.todo-list').appendChild(element);
};


module.exports.transfer = function(){
    liquid.vdom.virtualize()
    liquid.vdom.transfer();
}