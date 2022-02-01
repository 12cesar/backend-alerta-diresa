const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const alertaSocket = (cliente= Socket, io= socketIO.Server )=>{
    cliente.on('agregar-alerta', ()=>{
        cliente.broadcast.emit('agregar-alerta');
    })
}

module.exports = {
    alertaSocket
}