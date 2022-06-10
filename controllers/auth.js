const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");

const postLogin = async (req = request, res = response) => {
  const { usuario, password } = req.body;
  try {
    //Verficar si el usuario existe
    const user = await User.findOne({
      where: {
        usuario
      },
    });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no existe, hable con el administrador",
      });
    }
    // Verificar si el usuario esta activo
    if (user.active === 0) {
      return res.status(400).json({
        msg: "Usuario bloqueado, converse con el administrador",
      });
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password no valido",
      });
    }
    const token = await generarJWT(user.id);
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const validarTokenUsuario = async (req = request, res = response) => {
  // Generar el JWT
  try {
    const user = req.userToken;
    const token = await generarJWT(user.id);
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  postLogin,
  validarTokenUsuario,
};
