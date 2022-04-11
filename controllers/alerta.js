const { request, response } = require("express");
const Alerta = require("../models/alerta");
const Area = require("../models/area");
const User = require("../models/user");
const FCM = require("fcm-node");

const SERVER_KEY ="AAAAnp8WXU4:APA91bGCUSpv2t-luTw56kKjE1aiYLu9xU9c9Y88ChJX5tCDCxou4zCf4PiaFLV06YYToYoA40IHvOg_6DDFlzZZ3MBn06oTeF84okzQSIBHyeqIeEL7R2C_xwp9NJpZg00CcUWygLZc";
const getAlertas = async (req = request, res = response, next) => {
  const { estado } = req.query;
  const alerta = await Alerta.findAll({
    include: [
      {
        model: User,
        attributes: ["name", "lastname", "id"],
      },
      {
        model: Area,
        attributes: ["title", "id"],
      },
    ],
    where: {
      status: Number(estado),
    },
  });

  res.json({
    ok: true,
    alerta
  });
};

const getAlerta = async (req = request, res = response) => {
  const { id } = req.params;
  const alerta = await Alerta.findByPk(id);
  res.json({
    ok: true,
    alerta,
  });
};

const postAlerta = async (req = request, res = response) => {
  const { cliente, descripcion, area } = req.body;
  const date = new Date();
  const output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0')+ '-' + String(date.getDate()).padStart(2, '0');
  const separ = String(date).split(' ');
  const fecha = output;
  const horaPe= separ[4].split(':');
  const horaCon = Number(horaPe[0]);
  let hora;
  if (horaCon>=0 && horaCon<=4) {
    const hour = (24+horaCon)-5;
    hora= `${hour}:${horaPe[1]}:${horaPe[2]}`;
  }else{
    const hour = (horaCon-5);
    hora= `${hour}:${horaPe[1]}:${horaPe[2]}`;
  }
  try {
    const alerta = await Alerta.create({
      personal: cliente,
      descripcion,
      areaId: Number(area),
      fecha,
      hora
    });
    const areas = await Area.findOne({where:{id:Number(area)}});
    const fcm = new FCM(SERVER_KEY);
    const message = {
      to: "/topics/" + "alerta",
      notification: {
        title: areas.title,
        body: alerta.descripcion,
      },
    };
    fcm.send(message, (err, response) => {
      if (err) {
        next(err);
      } else {
        console.log(response);
      }
    });
    res.json({
      ok: true,
      alerta,
      hora:separ[4]
    });
    } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
  
};

const putAlerta = async (req = request, res = response) => {
  const { id } = req.params;
  const user = req.userToken;
  const alerta = await Alerta.update(
    {
      status: 1,
      userId: Number(user.id),
    },
    {
      where: {
        id,
      },
    }
  );
  res.json({
    ok: true,
    alerta,
  });
};

module.exports = {
  getAlertas,
  getAlerta,
  postAlerta,
  putAlerta,
};
