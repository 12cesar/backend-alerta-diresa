const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/", async (req, res) => {
  const user = await User.findAll();
  res.json({
    ok: true,
    user
  });
});


module.exports = router;
