/**
 * Created by ParikanshAndAtikant on 16/07/2017.
 */
var roomname = prompt("Enter Room Name ");
$(function () {

    var socket = io();
    socket.emit('subscribe',roomname);
    var audio = document.getElementById('myaudio');
    $('#load').click(function () {
       audio.load();
       $('#load').html('Loading...');
    });
    function loaded() {
        $('#load').html('Loaded.');
    }
    audio.addEventListener('canplay',loaded,false);

    $('#song0').click(function () {
       $('#myaudio').html('<source src="despacito.mp3" class="audio-source">');
       $('#load').click();
       $('#pause').click();
       socket.emit('song0',roomname);
    });
    $('#song1').click(function () {
        $('#myaudio').html('<source src="cute.mp3" class="audio-source">');
        $('#load').click();
        $('#pause').click();
        socket.emit('song1',roomname);
    });
    $('#play').click(function () {
        console.log("play");
        $('#play').removeClass('show');
        $('#play').addClass('hide');
        $('#pause').removeClass('hide');
        $('#pause').addClass('show');
        socket.emit("play", {times: audio.currentTime, room : roomname});
    });
    $('#pause').click(function () {
        console.log("pause");
        $('#pause').removeClass('show');
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        $('#play').addClass('show');
        socket.emit("pause", {times: audio.currentTime, room : roomname});
    });
    socket.on("first", function (data) {
        audio.ontimeupdate = function () {
            socket.emit("where", {times: audio.currentTime, room : roomname});
        };
        /*$('#play').click(function () {
            console.log("play");
            $('#play').removeClass('show');
            $('#play').addClass('hide');
            $('#pause').removeClass('hide');
            $('#pause').addClass('show');
            socket.emit("play", audio.currentTime);
        });
        $('#pause').click(function () {
            console.log("pause");
            $('#pause').removeClass('show');
            $('#pause').addClass('hide');
            $('#play').removeClass('hide');
            $('#play').addClass('show');
            socket.emit("pause", audio.currentTime);
        });*/
    });
    socket.on('song0',function (data) {
       console.log(data);
        $('#myaudio').html('<source src="despacito.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on('song1',function (data) {
        console.log(data);
        $('#myaudio').html('<source src="cute.mp3" class="audio-source">');
        $('#load').click();
    });
    socket.on("current", function (data) {
        var diff = audio.currentTime - data;
        if (diff < 0 || diff > 2) {
            audio.currentTime = data;
        }
    });
    socket.on("playsong", function (data) {
        audio.currentTime = data;
        audio.play();
        $('#play').removeClass('show');
        $('#play').addClass('hide');
        $('#pause').removeClass('hide');
        $('#pause').addClass('show');
    });
    socket.on("pausesong", function (data) {
        audio.currentTime = data;
        audio.pause();
        $('#pause').removeClass('show');
        $('#pause').addClass('hide');
        $('#play').removeClass('hide');
        $('#play').addClass('show');
    });
});