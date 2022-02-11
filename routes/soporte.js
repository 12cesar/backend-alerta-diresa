const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const Soporte = require("../models/soporte");
const router = Router();

router.get("/", async (req, res) => {
  const soporte = await Soporte.findAll();
  res.json({
    ok: true,
    soporte
  });
});
module.exports = router;