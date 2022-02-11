const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');

class Area extends Model{}


Area.init({
    area:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName:'area'
});



module.exports = Area