const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/dbMysql');
class User extends Model{}

User.init({
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"El campo no puede ser nulo"
            },
            len:{
                args:[3,255],
                msg:"El nombre tiene que ser entre 3 y 254 caracteres"
            }
        }
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"El campo no puede ser nulo"
            },
            len:{
                args:[3,255],
                msg:"El nombre tiene que ser entre 3 y 254 caracteres"
            }
        }
    },
    alias:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"El campo no puede ser nulo"
            },
            len:{
                args:[3,255],
                msg:"El nombre tiene que ser entre 3 y 254 caracteres"
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"El campo no puede ser nulo"
            },
            len:{
                args:[3,255],
                msg:"El nombre tiene que ser entre 3 y 254 caracteres"
            }
        }
    },
    active:{
        type: DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    modelName:'user'
});



module.exports = User