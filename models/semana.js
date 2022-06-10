const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/dbMysql");
const Area = require("./area");
const User = require("./user");

class Semana extends Model {}



Semana.init({
    nombre:{
        type:DataTypes.STRING
    },
    codigo:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'semana',
    timestamps:false
});

module.exports = Semana



