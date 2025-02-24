const express = require("express");
const router = express.Router();
const db = require("../db");
const { templateBoards } = require("../api/consts");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const loggedUser = req.user;
  try {
    // Fetch owned and collaborated desks
    const desks = await db.Desk.findAll({
      include: [
        // Include boards in each desk
        { model: db.Board },
        // Include collaborators (users linked via the many-to-many relationship)
        {
          model: db.User,
          as: "collaboartors",
          where: { id: loggedUser.id }, // Check if the logged-in user is a collaborator
          required: false, // Allow inclusion of owned desks even if no collaborators
        },
      ],
      where: {
        [Op.or]: [
          { owner_id: loggedUser.id }, // Desks where the logged-in user is the owner
          { "$collaboartors.id$": loggedUser.id }, // Desks where the logged-in user is a collaborator
        ],
      },
    });

    res.status(200).json(desks);
  } catch (error) {
    console.error("Error fetching desks:", error);
    res.status(500).json({ error: "Failed to fetch desks" });
  }
});

router.post("/add-desk", async (req, res) => {
  const loggedUser = req.user;
  const { name, template } = req.body;
  console.log({ name, template });

  // Need to get the template and decide what boards to add by template pick.

  const newDesk = await db.Desk.create({
    name,
    status: "public",
    owner_id: loggedUser.id,
  });

  if (template.templateName === "None") return res.status(200).json(newDesk);
  const chosenTemplate = templateBoards[template.templateName];

  //Create the Board.
  for (const board of chosenTemplate.boards) {
    const newBoard = await db.Board.create({
      name: board.name,
      owner_id: loggedUser.id,
      parent_desk: newDesk.id,
      background_image: template.backgroundImage,
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

router.delete("/:deskId", async (req, res) => {
  const deskId = Number(req.params.deskId);
  await db.Desk.destroy({ where: { id: deskId } });
  res.status(200).json({ message: "Desk deleted successfully" });
});

router.get("/:deskId", async (req, res) => {
  const deskId = Number(req.params.deskId);
  // const loggedUser = req.user;
  // TODO: check if Inside where clause i need to add , owner_id: loggedUser.id
  // right now i fetch desks to get boards.
  // I can get the same result through the desks list i have on desks provider.

  const desk = await db.Desk.findOne({
    where: { id: deskId },
    include: { model: db.Board },
  });
  res.status(200).json(desk);
});

router.get("/:deskId/members", async (req, res) => {
  const deskId = Number(req.params.deskId);
  const desk = await db.Desk.findOne({
    where: { id: deskId },
    include: { model: db.User, as: "collaboartors" },
  });

  res.status(200).json(desk.collaboartors);
});

router.post("/add-board", async (req, res) => {
  const loggedUser = req.user;
  const { deskId, name, background_image } = req.body;

  const newBoard = await db.Board.create({
    name,
    owner_id: loggedUser.id,
    parent_desk: deskId,
    background_image,
  });
  res.status(200).json(newBoard);
});

module.exports = router;
