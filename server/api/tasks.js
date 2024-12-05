const express = require("express");
const router = express.Router();

const db = require("../db");

router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { new_parent } = req.body;

  const updatedTask = await db.Task.update(
    { parent_column: new_parent },
    { where: { id: taskId } }
  );
  res.status(200).json(updatedTask);
});

router.post("/", async (req, res) => {
  const { columnId } = req.body;
  const { title, description } = req.body.task;

  const newTask = {
    title,
    description,
    parent_column: columnId,
  };

  const { data: addedTask } = await db.Task.create(newTask);
  res.status(200).json(addedTask);
});

module.exports = router;
