const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const Alerta = require("../models/alerta");
const { getAlertas, postAlerta } = require("../controllers/alerta");
const router = Router();

router.get("/", getAlertas);
router.post("/", postAlerta);
module.exports = router;