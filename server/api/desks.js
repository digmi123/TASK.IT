const express = require("express");
const router = express.Router();
const db = require("../db");
const { templateBoards } = require("../api/consts");

router.get("/", async (req, res) => {
  const loggedUser = req.user;
  const desks = await db.Desk.findAll({
    where: { owner_id: loggedUser.id },
    include: { model: db.Board },
  });
  res.status(200).json(desks);
});

router.post("/add-desk", async (req, res) => {
  const loggedUser = req.user;
  const { name, template } = req.body;
  // Need to get the template and decide what boards to add by template pick.

  const newDesk = await db.Desk.create({
    name,
    status: "public",
    owner_id: loggedUser.id,
  });

  if (template === "None") res.status(200).json(newDesk);
  const chosenTemplate = templateBoards[template];

  //Create the Board.
  for (const board of chosenTemplate.boards) {
    const newBoard = await db.Board.create({
      name: board.name,
      owner_id: loggedUser.id,
      parent_desk: newDesk.id,
    });
    for (const column of board.columns) {
      await db.Column.create({
        name: column.name,
        board_id: newBoard.id,
      });
    }
  }
  res.status(200).json(newDesk);
});

router.get("/:deskId", async (req, res) => {
  const deskId = Number(req.params.deskId);
  const loggedUser = req.user;

  const desk = await db.Desk.findOne({
    where: { id: deskId, owner_id: loggedUser.id },
    include: { model: db.Board },
  });
  res.status(200).json(desk);
});

router.get("/:deskId/members", async (req, res) => {
  const deskId = Number(req.params.deskId);
  // const loggedUser = req.user;

  const desk = await db.Desk.findOne({
    where: { id: deskId },
    include: { model: db.User, as: "collaboartors" },
  });

  res.status(200).json(desk.collaboartors);
});

router.post("/add-board", async (req, res) => {
  const loggedUser = req.user;
  const { deskId, name } = req.body;
  console.log({ deskId, name });

  const newBoard = await db.Board.create({
    name,
    owner_id: loggedUser.id,
    parent_desk: deskId,
  });
  res.status(200).json(newBoard);
});

module.exports = router;
