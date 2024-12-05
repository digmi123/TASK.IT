import axios from "axios";

export const updateTaskParent = async (task) => {
  const { id, new_parent } = task;

  const { data: updatedTask } = await axios.put(`/api/tasks/${id}`, {
    new_parent,
  });
  return updatedTask;
};

export const addTask = async ({ columnId, task }) => {
  const { data: addedTask } = await axios.post("/api/tasks", {
    task,
    columnId,
  });
  return addedTask;
};
