const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generarToken = require("../helpers/generar-jwt");

const postLogin = async (req = request, res = response) => {
      try {
       const usuario = req.body.usuario;
       const password = req.body.password;
        const user = await Usuario.findOne({ usuario });
        if (!user) {
          return res.status(400).json({
            msg: "Usuario no existe, converse con el administrador",
          });
        }
        if (!user.estado) {
          return res.status(400).json({
            msg: "Usuario bloqueado, converse con el administrador",
          });
        }
        validarPassword = bcryptjs.compareSync(password, user.password);
        if (!validarPassword) {
          return res.status(400).json({
            msg: "Contraseña no valida",
          });
        }
        token = await generarToken.generarJWT(user._id);
        res.json({
          ok: true,
          msg: "Login correcto",
          user,
          token,
        });
      } catch (error) {
        res.status(500).json({
          msg: "Hable con el administrador",
        });
      }
  }
const getLogin =async (req=request, res=response)=>{
  const token = await generarToken.generarJWT( req.usuarioToken._id );
  res.json({
      ok: true,
      msg: "Validacion correcta",
      usuario: req.usuarioToken,
      token: token,
  })
}

module.exports = {
  postLogin,
  getLogin
};
