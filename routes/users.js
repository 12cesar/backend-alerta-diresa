const { Router } = require("express");
const { getUser, postUser, getUsers, putUser, deleteUser } = require("../controllers/user");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id/:active", deleteUser);

module.exports = router;
