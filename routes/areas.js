const { Router } = require("express");
const { check } = require("express-validator");
const { getArea, getAreas, postArea, putArea, deleteArea } = require("../controllers/area");
const { areaTituloValido } = require("../helpers");
const { validarCampos } = require('../middlewares');
const router = Router();

router.get("/", getAreas);
router.get("/:id", getArea);
router.post("/",[
    check('titulo','El titulo es obligatorio').custom(areaTituloValido),
    validarCampos
], postArea);
router.put('/:id',putArea);
router.delete('/:id/:active',deleteArea)

module.exports = router;
