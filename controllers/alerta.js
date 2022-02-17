const { request, response } = require("express");
const Alerta = require("../models/alerta");
const Area = require("../models/area");
const User = require("../models/user");
const GenerateToken = require("../helpers/generar-googleJwt")
const Notification = require("../helpers/notificacion")

const getAlertas =async (req=request, res=response) => {
    const {estado} = req.query;
    const alerta = await Alerta.findAll({
      include:[
        {
          model: User,
          attributes:['name','lastname','id']
        },
        {
          model:Area,
          attributes:['title','id']
        }
      ],
      where:{
        status:Number(estado)
      }
    });
    const data = {
      topic:"alerta",
      titulo: "Re:codigo",
      mensaje: "Message from Nodejs to Topic test"
    }
    Notification.sendPushToTopic(data); 
    res.json({
      ok: true,
      alerta
    });
}

const getAlerta = async (req=request, res=response) => {
  const {id} = req.params;
  const alerta = await Alerta.findByPk(id);
  res.json({
    ok: true,
    alerta
  });
}

const postAlerta =async (req=request, res=response) => {
    const {cliente, descripcion, area} = req.body;
    const alerta = await Alerta.create({
        personal: cliente,
        descripcion,
        areaId: Number(area)
    });
    res.json({
      ok: true,
      alerta
    });
}

const putAlerta = async (req=request, res=response) => {
  const {id} = req.params;
  const user = req.userToken;
  const alerta = await Alerta.update({
    status:1,
    userId: Number(user.id)
  },{
    where:{
      id
    }
  });
  res.json({
    ok: true,
    alerta
  });
}



module.exports = {
    getAlertas,
    getAlerta,
    postAlerta,
    putAlerta

}