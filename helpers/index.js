const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const fcValidators =require('./fc-validators');
const fcSemana = require('./fc-semana');
const fcFecha = require('./fc-fecha');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...fcValidators,
  ...fcSemana,
  ...fcFecha
};
