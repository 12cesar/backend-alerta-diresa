const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const notificacion = require("./notificacion");
const fcValidators =require('./fc-validators');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...notificacion,
  ...fcValidators
};
