const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const User = require("./user");

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

User.hasOne(Rol);
Rol.belongsTo(User);


module.exports = Rol