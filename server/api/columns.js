const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/add-column", async (req, res) => {
  const { boardId, name } = req.body;
  const newColumn = await db.Column.create({ name, board_id: boardId });
  res.status(200).json(newColumn);
});

router.delete("/delete-column/:columnId", async (req, res) => {
  const columnId = Number(req.params.columnId);
  console.log("Deleting column with ID:", columnId);

  await db.Column.destroy({ where: { id: columnId } });
  res.status(200).json({ message: "Column deleted successfully" });
});

module.exports = router;
