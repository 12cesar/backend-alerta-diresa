const { Router } = require("express");
const { getArea, postArea } = require("../controllers/area");
const router = Router();

router.get("/", getArea);
router.post("/", postArea);

module.exports = router;
