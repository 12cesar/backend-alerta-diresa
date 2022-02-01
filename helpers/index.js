const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const notificacion = require("./notificacion");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...notificacion
};
