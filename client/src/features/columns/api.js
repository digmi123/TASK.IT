import axios from "axios";

export const addColumn = async ({ boardId, columnName }) => {
  const newColumn = await axios.post("/api/columns/add-column", {
    boardId,
    name: columnName,
  });
  newColumn.data.tasks = [];
  return newColumn.data;
};
