const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/add-column", async (req, res) => {
  const { boardId, name } = req.body;
  const newColumn = await db.Column.create({ name, board_id: boardId });
  res.status(200).json(newColumn);
});

module.exports = router;
