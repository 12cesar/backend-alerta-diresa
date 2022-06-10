const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const Alerta = require("./alerta");

class Area extends Model{}


Area.init({
    title:{
        type: DataTypes.STRING
    },
    active:{
        type: DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    modelName:'areas',
    timestamps:false
});


Area.hasMany(Alerta,{
    as:'areaalerta',
    foreignKey:'idArea'
});

Alerta.belongsTo(Area,{
    foreignKey:'idArea',
    sourceKey:'id'
});


module.exports = Area