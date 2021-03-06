'use strict';
import ip = require('ip');

//make the client
const net = require('net'),
    readline = require('readline'),
    client = new net.Socket(),
    io = readline.createInterface(process.stdin, process.stdout);
    

client.on('data', function(data) { //when we get data
    console.log("Received: " + data + '/n'); //output
});

client.on('close', function() { //when connection closed
    console.log('server disconnected');
    console.log('closing client');
    process.exit(0);
});


var HOST = ip.address();
var PORT = 3000;

//connect to the server
client.connect(PORT, HOST, function() {
    console.log('Connencted to: ' + HOST + ":" + PORT);

        // prompt the user
    io.setPrompt('> ');
    io.prompt();

    io.on('line', function(line){
        switch(line.trim()) {
        case 'exit':
            client.end();
            console.log('client disconnected');
            process.exit(0);
            break;
        default:
            client.write(line);
            break;
        }

        io.prompt();
    }).on('close', function() {
        client.end();
        console.log('client disconnected');
        process.exit(0);
    });

});




