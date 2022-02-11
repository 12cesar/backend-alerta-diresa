const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Area = require("./area");
const User = require("./user");


class Soporte extends Model{}

Soporte.init({
    personal:{
        type: DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    status:{
        type: DataTypes.TINYINT,
        defaultValue:0
    }
},{
    sequelize,
    modelName:'soporte'
});

//Conexion User
User.hasMany(Soporte);
Soporte.belongsTo(User);
// Conexion area
Area.hasMany(Soporte);
Soporte.belongsTo(Soporte);



module.exports = Soporte