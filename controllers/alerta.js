const { request, response } = require("express");
const Alerta = require("../models/alerta");
const Area = require("../models/area");
const User = require("../models/user");
const FCM = require("fcm-node");
const { funDate } = require("../helpers");
const sequelize = require("../db/dbMysql");

const SERVER_KEY =
  "AAAAnp8WXU4:APA91bGCUSpv2t-luTw56kKjE1aiYLu9xU9c9Y88ChJX5tCDCxou4zCf4PiaFLV06YYToYoA40IHvOg_6DDFlzZZ3MBn06oTeF84okzQSIBHyeqIeEL7R2C_xwp9NJpZg00CcUWygLZc";

const getAtencion = async (req = request, res = response, next) => {
  try {
    const { fecha, hora, dia } = funDate();
    const alerta = await Alerta.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "lastname", "id","celular","dni"],
        },
        {
          model: Area,
          attributes: ["title", "id"],
        },
      ],
      where: {
        fecha,
      },
      order:[
        ['status','ASC']
      ]
    });
    res.json({
      ok: true,
      msg: "Alerta mostrado con exito",
      alerta,
    });
  } catch (error) {
    res.status(400).json({
      ok: true,
      msg: "Alerta mostrado con exito",
      alerta,
    });
  }
};

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
    alerta,
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
  try {
    const { fecha, hora, dia } = funDate();
    console.log(hora);
    const { cliente, area, descripcion } = req.body;
    const sql = `select * from users where inicio<='${hora}' and fin>='${hora}' and active=1 and atendiendo=0 and semana like '%${dia}%' order by tiempo asc limit 1`;
    const user = await sequelize.query(sql);
    let data = {};
    if (user[0].length === 0) {
      data.personal = cliente;
      data.descripcion = descripcion;
      data.fecha = fecha;
      data.hora = hora;
      data.idArea = area;
      const alerta = await Alerta.create(data);

      return res.json({
        ok: true,
        msg: "Alerta creada con exito",
        alerta,
      });
    }
    if (user[0].length !== 0) {
      data.personal = cliente;
      data.descripcion = descripcion;
      data.fecha = fecha;
      data.hora = hora;
      data.idUsuario = user[0][0].id;
      data.idArea = area;
      console.log(data);
      const alerta = await Alerta.create(data);
      const tiempo = Number(user[0][0].tiempo) + 1;
      const users = await User.update(
        {
          tiempo,
          atendiendo: 1,
        },
        {
          where: {
            id: data.idUsuario,
          },
        }
      );

      return res.json({
        ok: true,
        msg: "Alerta Creado con exito",
        alerta,
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: `Error: ${error}`,
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
  getAtencion,
};

/* const areas = await Area.findOne({where:{id:Number(area)}});
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
    }); */
