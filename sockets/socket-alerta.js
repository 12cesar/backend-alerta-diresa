const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const alertaSocket = (cliente= Socket, io= socketIO.Server )=>{
    cliente.on('agregar-alerta', ()=>{
        cliente.broadcast.emit('agregar-alerta');
    });
    cliente.on('actualizar-area',()=>{
        console.log('actualizado');
        cliente.broadcast.emit('actualizar-area');
    });
}

module.exports = {
    alertaSocket
}