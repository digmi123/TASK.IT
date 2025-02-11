const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  const board = await db.Board.findOne({
    where: { id: boardId },
    include: {
      model: db.Column,
      include: {
        model: db.Task,
        include: [
          { model: db.Comment, include: { model: db.User } },
          { model: db.User },
        ],
      },
    },
  });
  res.status(200).json(board);
});

module.exports = router;
