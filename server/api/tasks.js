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
  const { title, description, priority } = req.body.task;

  const newTask = {
    title,
    description,
    parent_column: columnId,
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
