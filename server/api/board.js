const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  // Future Adir: get user id
  const board = await db.Board.findOne({
    where: { id: boardId },
    include: {
      model: db.Column,
      include: { model: db.Task, include: { model: db.Comment } },
    },
  });
  res.status(200).json(board);
});

module.exports = router;
