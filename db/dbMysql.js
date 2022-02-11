const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prueba','root','root2022',{
    dialect:'mysql',
    host:'localhost'
});


module.exports = sequelize;