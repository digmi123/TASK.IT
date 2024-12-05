const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/get_user_info", async (req, res) => {
  const { id } = req.user;
  const user = await db.User.findOne({ where: { id } });
  return res.status(200).json(user);
});

module.exports = router;
