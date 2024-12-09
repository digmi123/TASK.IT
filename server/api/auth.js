const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!bcrypt.compareSync(password, user.password))
    return res.status(403).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ token });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log({ password });
  const newPass = bcrypt.hashSync(password, 10);
  console.log({ newPass });

  const user = await db.User.create({ email, password: newPass });
  res.status(200).json(user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth-token");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
