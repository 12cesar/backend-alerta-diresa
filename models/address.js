const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const User = require("./user");

class Address extends Model{}
Address.init({
    street: DataTypes.STRING
},{
    sequelize,
    modelName:'address'
});

User.hasOne(Address);
Address.belongsTo(User);

module.exports = Address