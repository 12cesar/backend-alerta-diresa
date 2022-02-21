const Area = require("../models/area")
const { mayusPrimeraLetra } = require("./fc-validators")


const areaTituloValido=async(titulo='')=>{
 const area = await Area.findOne({where:{
     title:mayusPrimeraLetra(titulo)
 }});
 if (area) {
    throw new Error(`El titulo: ${titulo} ya está registrado en la BD`);
}
}


module.exports = {
    areaTituloValido
}