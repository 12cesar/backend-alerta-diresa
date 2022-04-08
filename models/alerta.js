const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Area = require("./area");
const User = require("./user");


class Alerta extends Model{}

Alerta.init({
    personal:{
        type: DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    status:{
        type: DataTypes.TINYINT,
        defaultValue:0
    },
    fecha:{
        type:DataTypes.CHAR
    },
    hora:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    modelName:'alerta'
});

//Conexion User
User.hasMany(Alerta);
Alerta.belongsTo(User);
// Conexion area
Area.hasMany(Alerta);
Alerta.belongsTo(Area);



module.exports = Alerta