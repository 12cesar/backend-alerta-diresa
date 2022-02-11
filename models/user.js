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
            isAlpha:{
                args:true,
                msg:"El nombre solo puede contener letras"
            },
            len:{
                args:[3,255],
                msg:"El nombre tiene que ser entre 3 y 254 caracteres"
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        validate:{
            isEmail:{
                args:true,
                msg:"El campo tiene que ser un correo valido"
            }
        }
    },
    age:{
        type:DataTypes.INTEGER,
        validate:{
            isInt:{
                args:true,
                msg:"La edad tiene que ser un numero"
            },
            min:{
                args:1,
                msg:"La edad tiene que ser mayot o igual a 1"
            },
            max:{
                args:155,
                msg:"La edad tiene que ser real"
            },
            esPar(value){
                if (value%2) {
                    throw new Error("La edad tiene que ser un numero par")
                }
            }
        }
    },
    role:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    modelName:'user'
});



module.exports = User