const { Router, request, response } = require("express");
const { postLogin, getLogin } = require("../controllers/auth");
const {validarCampos, validarJWT} = require('../middlewares')
const router = Router();

router.post('/login',[
    validarCampos
], postLogin);
router.get('/',[
    validarJWT,
    validarCampos
],getLogin)


module.exports = router;