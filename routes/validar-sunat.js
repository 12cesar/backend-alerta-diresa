const { Router } = require("express");
const { postValidarSunat } = require("../controllers/validar-sunat");


const router = Router();


router.get('/:tipo/:documento',postValidarSunat);



module.exports = router;