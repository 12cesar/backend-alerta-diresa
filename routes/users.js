const { Router } = require("express");
const Address = require("../models/address");
const Post = require("../models/post");
const User = require("../models/user");

const router = Router();

router.get("/", async (req, res) => {
  const user = await User.findAll(
  {
    include:[
      {
        model:Address,
        attributes:['street']
      },
      {
        model:Post,
        attributes:['title','body']
      }
    ]
  }
  );
  res.json({
    ok: true,
    user,
  });
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.json({
    ok: true,
    user,
  });
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create(data);
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = await User.update(data, {
    where: {
      id,
    },
  });
  res.json({
    ok: true,
    user,
  });
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.destroy({
    where: {
      id,
    },
  });
  res.json({
    ok: true,
    user,
  });
});

module.exports = router;
