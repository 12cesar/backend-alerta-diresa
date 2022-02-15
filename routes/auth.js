const { Router } = require("express");
const { postLogin, validarTokenUsuario } = require("../controllers/auth");
const { validarCampos, validarJWT } =require('../middlewares')

const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
],validarTokenUsuario)
router.post('/', postLogin)




module.exports = router