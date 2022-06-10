const Area = require("../models/area");
const User = require("../models/user");
const { mayusPrimeraLetra } = require("./fc-validators")


const areaTituloValido=async(titulo='')=>{
 const area = await Area.findOne({where:{
     title:mayusPrimeraLetra(titulo)
 }});
 if (area) {
    throw new Error(`El titulo: ${titulo} ya está registrado en la BD`);
}
}
const esUsuarioValido=async(usuario='')=>{
    const user = await User.findOne({
        where:{
         usuario
        }
    });
    if (user) {
        throw new Error(`El usuario: ${usuario} ya está registrado en la BD`);
    }
}
const esUsuarioDNIValido=async(dni='')=>{
    const user = await User.findOne({
        where:{
         dni
        }
    });
    if (user) {
        throw new Error(`El dni: ${dni} ya está registrado en la BD`);
    }
}


module.exports = {
    areaTituloValido,
    esUsuarioValido,
    esUsuarioDNIValido
}