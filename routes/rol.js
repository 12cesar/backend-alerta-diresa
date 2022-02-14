const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { getRol, postRol, getRols, putRol, deleteRol } = require("../controllers/rol");
const router = Router();

router.get("/", getRols);
router.get("/:id", getRol);
router.post("/", postRol);
router.put("/:id", putRol);
router.delete("/:id/:active", deleteRol);
module.exports = router;