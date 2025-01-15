import axios from "axios";

export const getTask = async (taskId) => {
  const task = await axios.get(`/api/tasks/${taskId}`);
  return task.data;
};

export const addComment = async ({ comment, taskId }) => {
  const data = await axios.post("/api/tasks/add-comment", { comment, taskId });
  return data;
};
