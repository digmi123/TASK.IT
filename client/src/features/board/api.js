import axios from "axios";

export const getBoards = async (deskId) => {
  const desk = await axios.get(`/api/desks/${deskId}`);
  return desk.data.boards;
};

export const getBoard = async (boardId) => {
  const boardData = await axios.get(`/api/board/${boardId}`);
  return boardData;
};

export const addNewBoard = async (deskId, boardName) => {
  const newBoard = await axios.post("/api/desks/add-board", {
    deskId,
    name: boardName,
  });
  return newBoard;
};
