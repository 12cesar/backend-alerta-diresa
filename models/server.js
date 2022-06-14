const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/database');
const http = require('http');
const socketIO = require('socket.io');
const { conectarCliente } = require('../sockets/usuario-socket');
const { alertaSocket } = require('../sockets/socket-alerta');
const sequelize = require('../db/dbMysql');
const { request, response } = require('express');
class Server{
    static _intance=Server;
    io=socketIO.Server;
    constructor(){
        this.app = express();
        this.app.use((req=request, res=response, next) => {
            res.header('Access-Control-Allow-Origin', 'http://192.168.100.95:5000');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.port = process.env.PORT;
        this.paths = {
            user:'/api/user',
            rol:'/api/rol',
            alerta:'/api/alerta',
            area:'/api/area',
            auth:'/api/auth',
            validarsunat:'/api/validsunat',
            semanas:'/api/semanas',
            soporte:'/api/soporte'
        }
        //Connect to socket
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors:{
                origin:true,
                credentials:true
            }
        })
        this.mysqlDB();
        //this.connectDB();
        //  listen Sockets
        this.listenSockets();
        // Middlewares
        this.middlewares();
        // Routes application
        this.routes();
    }
    static get instance(){
        return this._intance || (this._intance=new this());
    }
    async mysqlDB(){
        try {
            await sequelize.authenticate();
            console.log('conectado mysql');
        } catch (error) {
            console.log(error);
        }
    }
    /* async connectDB(){
        await dbConnection();
    } */
    listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente=>{
            console.log('Cliente conectado');
            conectarCliente(cliente, this.io);
            alertaSocket(cliente,this.io);
        })
    }
    middlewares(){
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        
    }
    routes(){
        this.app.use(this.paths.user, require('../routes/users'));
        this.app.use(this.paths.area, require('../routes/areas'));
        this.app.use(this.paths.rol, require('../routes/rol'));
        this.app.use(this.paths.alerta, require('../routes/alerta'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.validarsunat, require('../routes/validar-sunat'));
        this.app.use(this.paths.semanas, require('../routes/semanas'));
        this.app.use(this.paths.soporte, require('../routes/soporte'));
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;