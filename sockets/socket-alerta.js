const { Socket } = require("socket.io");
const  socketIO  = require("socket.io");



const alertaSocket = (cliente= Socket, io= socketIO.Server )=>{
    cliente.on('agregar-alerta', (alerta={})=>{
        console.log(alerta);
        cliente.broadcast.emit('agregar-alerta',alerta);
    })
}

module.exports = {
    alertaSocket
}