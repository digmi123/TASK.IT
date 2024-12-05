import axios from "axios";

export const addColumn = async ({ boardId, columnName }) => {
  const newColumn = await axios.post("/api/columns/add-column", {
    boardId,
    name: columnName,
  });
  return newColumn;
};
