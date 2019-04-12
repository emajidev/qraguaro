var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var temporal = require("temporal");
server.listen(3000);
const {Board , Led} = require('johnny-five');




//rueteo de estaticos 
///llamado de index
 app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

/* app.listen(3000, function(){
    console.log('server Express Ready');
}); */

//////////////////////////// frimework jhonny-five///////////
let myBoard , myLed;
let ledIsOn = false;
myBoard=new Board()
myBoard.on('ready', function(){
    myLed = new Led(13);
 io.on('connection', function (socket) {
    socket.emit('com', 'Comunicando con webclient' );
    socket.on('on', function () {
        myLed.on();
        
    });
    socket.on('off', function () {
        myLed.off();
        console.log('offLed');
    });
    socket.on('OpenDoor', function () {
     myLed.on();
     temporal.delay(1000, function() {
        myLed.off()
      });
    });
  });       

   
});

    
myBoard.on('error', function (err){
    console.log(err);

});


