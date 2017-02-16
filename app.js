var express = require('express');

var app = express();

app.use(express.static("public"));
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.set('port', (process.env.PORT || 8080));

app.get('/todo', function(req, res, next){
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile("todo.html", options)
});

app.get('/vdom', function(req, res, next){
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile("vdom.html", options)
});

app.get('/', function(req, res, next){
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile("functions.html", options)
});

io.on('connection', function(socket){
    socket.on('sync', function(SyncObj){
        socket.broadcast.emit("sync", SyncObj);
        console.log("Broadcasted SyncObj:", SyncObj);
    });

    socket.on('getList', function(){
        console.log("getting list for: ", socket.id);
        var clientList = Object.keys(io.engine.clients);
        var index = clientList.indexOf(socket.id);
        clientList.splice(index, 1);
        io.to(socket.id).emit("list", clientList);
    });

    socket.on('syncToClient', function(clientObj){
        console.log("Syncin to: ", clientObj)
        socket.to(clientObj.client).emit("sync", clientObj.sync);
    })
});


http.listen(app.get("port"), function(){
    console.log("Listening port " + app.get("port"));
});