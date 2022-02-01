const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname:{
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'SOPORTE_ROLE',
        enum: ['ADMIN_ROLE', 'SOPORTE_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, ...usuario}= this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);