const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { getAlertas, postAlerta, getAlerta, putAlerta } = require("../controllers/alerta");
const router = Router();

router.get("/", getAlertas);
router.get("/:id", getAlerta);
router.post("/", postAlerta);
router.put("/:id", putAlerta);
module.exports = router;