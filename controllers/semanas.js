const { request, response } = require("express");
const { Semana } = require("../models");



const getSemanas =async(req=request, res=response)=>{

    const semanas = await Semana.findAll();
    res.json({
        ok:true,
        msg:'Semanas mostrado con exito',
        semanas
    })
}



module.exports = {
    getSemanas
}