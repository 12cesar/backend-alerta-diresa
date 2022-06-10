const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { semanaArray } = require("../helpers");
const Rol = require("../models/rol");
const User = require("../models/user");


const getUsers =async (req=request, res=response) => {
    const {active} = req.query
    const user = await User.findAll({
      include:{
        model:Rol,
        attributes:['role','id']
      },
      where:{
        active:Number(active)
      }
    });
    res.json({
      ok: true,
      user
    });
}

const getUser = async (req=request, res=response) => {
  const {id} = req.params
  const user = await User.findAll({
    include:{
      model:Rol,
      attributes:['role','id']
    },
    where:{
      id
    }
  });
  res.json({
    ok: true,
    user
  });
}

const postUser =async (req=request, res=response) => {
try {
  const {nombre, apellido, password, semana,rol, ...data} = req.body;

  data.name = nombre.toUpperCase();
  data.lastname = apellido.toUpperCase();
  const sem = semanaArray(semana);
  data.semana = sem;
  data.rolId=rol;
  data.inicio="08:00:00";
  data.fin="16:00:00";
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  const hasPassword = bcryptjs.hashSync(password,salt);
  data.password = hasPassword;
  const user = await User.create(data);

  //const dia = new Date('2022-06-04T15:02:05').getDay();
  res.json({
    ok: true,
    msg:'Usuario Creado con exito',
    data
  });
} catch (error) {
  res.status(400).json({
    ok:false,
    msg:`Error: ${error}`
  })
}
}

const putUser= async (req=request, res=response) => {
  const {id} = req.params;
  const {nombre, apellido, usuario, password, rol} = req.body;
  const data = {
    name:nombre,
    lastname:apellido,
    alias:usuario,
    rolId:Number(rol)
  }
  if (password) {
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password,salt);
  }
  const user = await User.update(data,{
    where:{
      id
    }
  });
  res.json({
    ok: true,
    user
  });
}
const deleteUser= async (req=request, res=response) => {
  const {id,active} = req.params;
  const user = await User.update({active},{where:{
    id
  }})
  res.json({
    ok: true,
    user
  });
} 
module.exports = {
    getUsers,
    postUser,
    getUser,
    putUser,
    deleteUser
}