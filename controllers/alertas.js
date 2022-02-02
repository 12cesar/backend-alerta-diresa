const { request, response } = require("express");
const { Alerta } = require("../models");
const {sendPushToTopic} = require("../helpers");
const getAlertas = async (req = request, res = response) => {
  const { unblock } = req.query;
  const alerta = await Alerta.find({ estado: unblock }).populate(
    "area",
    "nombre"
  );
  res.json({
    ok: true,
    msg: "Alertas mostrado con exito",
    alerta,
  });
};
const getAlerta = async (req = request, res = response) => {
  const { id } = req.params;
  const alerta = await Alerta.findById(id);
  res.json({
    ok: true,
    msg: "Alerta mostrado con exito",
    alerta,
  });
};
const postAlerta = async (req = request, res = response) => {
  try {
    const data = req.body;
    const alerta = new Alerta(data);
    await alerta.save();
    const alert = await Alerta.findById(alerta._id)
                                .populate("area","nombre");    
    res.json({
      ok: true,
      msg: "Alerta creada con exito, un personal se acercara a darle soporte",
      alert,
    });
  } catch (error) {
    console.log(error);
  }
};
const putAlerta = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = req.usuarioToken;
  const data = {
    estado: true,
    atendido: usuario._id,
  };
  const alerta = await Alerta.findByIdAndUpdate(id, data, { new: true });
  res.json({
    ok: true,
    msg: "Alerta atendido con exito",
    alerta,
  });
};
const deleteAlerta = async (req = request, res = response) => {
  const { id } = req.params;
  const alerta = await Alerta.findByIdAndRemove(id);
  res.json({
    ok: true,
    msg: "Alerta eliminado con exito",
    alerta,
  });
};

module.exports = {
  getAlertas,
  getAlerta,
  postAlerta,
  putAlerta,
  deleteAlerta,
};
