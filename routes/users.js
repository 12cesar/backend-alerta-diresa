const { Router } = require("express");
const { check } = require("express-validator");
const { getUser, postUser, getUsers, putUser, deleteUser } = require("../controllers/user");
const { esUsuarioValido, esUsuarioDNIValido } = require("../helpers");
const { validarCampos } = require("../middlewares");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/",[
    check('usuario').custom(esUsuarioValido),
    check('dni').custom(esUsuarioDNIValido),
    validarCampos
], postUser);
router.put("/:id", putUser);
router.delete("/:id/:active", deleteUser);

module.exports = router;
