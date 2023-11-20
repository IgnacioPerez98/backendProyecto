const e = require("express");
const {text} = require("express");
let ws;
let WebSocket = {
    getWS : function (){
        return ws;
    },
    setWS : function (wss){
        ws = wss;
    },
    wsCreateCon : function (){
        this.getWS().on('connection', (ws) => {
            console.log('WebSocket connected');

            ws.on('message', (message) => {
                console.log(`Received message: ${message}`);
                // Handle the received message
            });
            ws.on('close', () => {
                console.log('WebSocket disconnected');
            });
        });
    },
    Notify: function (texto){
        try {
            ws.clients.forEach((client) => {
                client.send(texto);
            });
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = WebSocket;