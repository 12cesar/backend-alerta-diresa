const { Router } = require("express");
const { getArea, getAreas, postArea, putArea, deleteArea } = require("../controllers/area");
const router = Router();

router.get("/", getAreas);
router.get("/:id", getArea);
router.post("/", postArea);
router.put('/:id',putArea);
router.delete('/:id/:active',deleteArea)

module.exports = router;
