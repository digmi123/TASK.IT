import axios from "axios";

export const updateTaskParent = async (task) => {
  const { id, new_parent } = task;

  const { data: updatedTask } = await axios.put(`/api/tasks/${id}`, {
    new_parent,
  });
  return updatedTask;
};

export const addTask = async ({ task }) => {
  const { data: addedTask } = await axios.post("/api/tasks", { task });
  return addedTask;
};

export const deleteTask = async (task) => {
  const { id: taskId } = task;
  try {
    await axios.delete(`/api/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};
