var express = require('express');

var app = express();

app.use(express.static("public"));
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res, next){
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile("index.html", options)
});

io.on('connection', function(socket){
    console.log("User is connected");
    socket.on('sync', function(SyncObj){
        socket.broadcast.emit("sync", SyncObj);
        console.log("Broadcasted SyncObj:", SyncObj);
    })
});


http.listen(80, function(){
    console.log("Listening port 80");
});