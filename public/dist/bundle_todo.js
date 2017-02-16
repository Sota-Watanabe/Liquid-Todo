require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"todo":[function(require,module,exports){
//var Liquid = require('@zharktas/liquid.js');

//var liquid = new Liquid();

module.exports.addTodo = function(text){

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('toggle');
    checkbox.addEventListener('click', toggleDone);
    checkbox.setAttribute('data-handler', 'toggleClick');

    //liquid.registerHandler('toggleClick', {'click': toggleDone});

    var destroy = document.createElement('button');
    destroy.classList.add('destroy');
    destroy.addEventListener('click', removeTodo);
    destroy.setAttribute('data-handler', 'destroyClick');
    //liquid.registerHandler('destroyClick', {'click': removeTodo});

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
    //liquid.vdom.virtualize();
    //liquid.vdom.transfer();
};
},{}]},{},[]);
