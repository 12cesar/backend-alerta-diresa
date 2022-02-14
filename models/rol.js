const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Rol extends Model{}

Rol.init({
    role:{
        type:DataTypes.STRING
    },
    active:{
        type: DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    modelName:'rol'
});




module.exports = Rol;