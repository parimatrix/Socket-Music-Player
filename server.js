/**
 * Created by ParikanshAndAtikant on 16/07/2017.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 5000;
var ctr=0;


/*app.get('/',function (req,res) {
   res.send("Hello world!");
});*/
app.use('/',express.static('public_static'));

app.get('/changesong',function (req,res) {

});
io.on('connection',function (socket) {
    console.log("connnected client");
    if (ctr == 0) {
        console.log("FirstPerson");
        socket.emit("first", "first");
    }
    ctr++;
    socket.on("disconnect", function () {
        console.log("Client Disconnected");
        ctr--;
    });
    socket.on('song0',function (data) {
        console.log('changing to ' + data);
        io.emit('song0',data);
    });
    socket.on('song1',function (data) {
        console.log('changing to ' + data);
        io.emit('song1',data);
    });
    socket.on("play",function (data) {
       io.emit('playsong',data);
    });
    socket.on("pause",function (data) {
        io.emit('pausesong',data);
    });
    socket.on("where",function (data) {
        //console.log(data);
        io.emit("current",data);
    });
});
http.listen(PORT,function () {
    console.log("server running on " + PORT);
});