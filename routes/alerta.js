const { Router } = require("express");
const { validarCampos, validarJWT } = require("../middlewares");
const { check } = require("express-validator");
const { getAlertas, postAlerta, getAlerta, putAlerta, getAtencion } = require("../controllers/alerta");
const router = Router();

router.get("/", getAlertas);
router.get('/mostrar/atencion',getAtencion);
router.get("/:id", getAlerta);
router.post("/", postAlerta);
router.put("/:id",[
    validarJWT,
    validarCampos
], putAlerta);
module.exports = router;