import axios from "axios";

export const addComment = async ({ comment, taskId }) => {
  const data = await axios.post("/api/tasks/add-comment", { comment, taskId });
  return data;
};
