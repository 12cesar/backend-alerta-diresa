const { Router } = require("express");
const { getSoportes, postSoporte } = require("../controllers/soporte");
const { validarCampos, validarJWT } = require("../middlewares");



const router = Router();

router.get('/',getSoportes);
router.post('/',[
    validarJWT,
    validarCampos
],postSoporte);


module.exports = router;