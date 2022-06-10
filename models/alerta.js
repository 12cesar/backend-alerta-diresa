const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/dbMysql");
const Soporte = require("./soporte");

class Alerta extends Model {}

Alerta.init(
  {
    personal: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    fecha: {
      type: DataTypes.CHAR,
    },
    hora: {
      type: DataTypes.CHAR,
    },
    idUsuario:{
      type: DataTypes.INTEGER
    },
    idArea:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: "alerta",
    timestamps:false
  }
);


Alerta.hasMany(Soporte,{
  as:'alertasoporte',
  foreignKey:'idAlerta'
});

Soporte.belongsTo(Alerta,{
  foreignKey:'idAlerta',
  sourceKey:'id'
})


module.exports = Alerta;
