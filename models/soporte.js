const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/dbMysql");

class Soporte extends Model {}

Soporte.init({
    evaluacion:{
        type:DataTypes.TEXT
    },
    accion:{
        type:DataTypes.TEXT
    },
    idAlerta:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'soporte',
    timestamps:false
});




module.exports = Soporte;


