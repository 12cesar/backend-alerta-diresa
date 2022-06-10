const { Router } = require("express");
const { getSemanas } = require("../controllers/semanas");

const router = Router();


router.get('/',getSemanas);



module.exports = router;