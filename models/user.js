const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/dbMysql');
const Alerta = require('./alerta');
const Rol = require('./rol');
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
    usuario:{
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
    celular:{
        type: DataTypes.CHAR
    },
    dni:{
        type:DataTypes.CHAR
    },
    inicio:{
        type:DataTypes.CHAR
    },
    fin:{
        type:DataTypes.CHAR
    },
    semana:{
        type:DataTypes.CHAR
    },
    active:{
        type: DataTypes.TINYINT,
        defaultValue:1
    },
    atendiendo:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    tiempo:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    modelName:'users',
    timestamps:false
});
Rol.hasMany(User);
User.belongsTo(Rol);


User.hasMany(Alerta,{
    as:'useralerta',
    foreignKey:'idUsuario'
});
Alerta.belongsTo(User,{
    foreignKey:'idUsuario',
    sourceKey:'id'
})


module.exports = User