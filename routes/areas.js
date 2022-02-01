const { Router } = require("express");
const { getAreas, postArea, getArea, putArea, deleteArea } = require("../controllers/areas");
const {validarCampos} = require("../middlewares")
const { check } = require('express-validator');
const { esAreaValidoId, esNombreAreaValido } = require("../helpers");
const router = Router();

router.get('/', getAreas);
router.get('/:id',[
    check('id','No es id valido').isMongoId(),
    check('id').custom(esAreaValidoId),
    validarCampos
], getArea);
router.post('/',[
    check('nombre').custom(esNombreAreaValido),
    validarCampos
], postArea);
router.put('/:id',[
    check('id','No es id valido').isMongoId(),
    check('id').custom(esAreaValidoId),
    validarCampos
], putArea);
router.delete('/:id',[
    check('id','No es id valido').isMongoId(),
    check('id').custom(esAreaValidoId),
    validarCampos
], deleteArea);
module.exports = router;