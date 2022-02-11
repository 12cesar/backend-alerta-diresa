const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('alerta','root','root2022',{
    dialect:'mysql',
    host:'localhost'
});


module.exports = sequelize;