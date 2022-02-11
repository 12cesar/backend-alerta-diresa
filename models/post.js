const { Model, DataTypes } = require("sequelize");
const sequelize = require('../db/dbMysql');
const User = require("./user");

class Post extends Model {}


Post.init({
    title:{
        type: DataTypes.STRING
    },
    body:{
        type: DataTypes.TEXT
    }
},{
    sequelize,
    modelName:'post',
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;