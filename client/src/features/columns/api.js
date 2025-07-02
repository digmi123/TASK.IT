import axios from "axios";

export const addColumn = async ({ boardId, columnName }) => {
  const newColumn = await axios.post("/api/columns/add-column", {
    boardId,
    name: columnName,
  });
  newColumn.data.tasks = [];
  return newColumn.data;
};

export const deleteColumn = async ({ columnId }) => {
  console.log("Deleting column with ID front:", columnId);

  try {
    await axios.delete(`/api/columns/delete-column/${columnId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};
