const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const task = await db.Task.findAll({ where: { id: taskId } });
  res.status(200).json(task);
});

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
  const { title, description, priority, parent_column } = req.body.task;
  const loggedUser = req.user;

  const newTask = {
    owner_id: loggedUser.id,
    title,
    description,
    parent_column,
    priority,
  };

  const { data: addedTask } = await db.Task.create(newTask);
  res.status(200).json(addedTask);
});

router.post("/add-comment", async (req, res) => {
  const { comment, taskId } = req.body;

  const loggedUser = req.user;

  const { data: addedComment } = await db.Comment.create({
    content: comment,
    userId: loggedUser.id,
    taskId,
  });
  res.status(200).json(addedComment);
});

module.exports = router;
