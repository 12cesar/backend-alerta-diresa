const { request, response } = require("express");
const Alerta = require("../models/alerta");


const getAlertas =async (req=request, res=response) => {
    const alerta = await Alerta.findAll();
    res.json({
      ok: true,
      alerta
    });
}

const postAlerta =async (req=request, res=response) => {
    const {personal, descripcion, status} = req.body;
    const alerta = await Alerta.create({
        personal,
        descripcion
    });
    res.json({
      ok: true,
      alerta
    });
}


module.exports = {
    getAlertas,
    postAlerta,

}