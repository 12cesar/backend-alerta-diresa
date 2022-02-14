const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

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
    modelName:'area'
});



module.exports = Area