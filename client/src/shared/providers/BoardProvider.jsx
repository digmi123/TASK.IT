import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";

const BoardContext = createContext();

export default function BoardProvider({ boardId }) {
  return (
    <BoardContext.Provider
    // value={{ boardData, setBoardData, loading, handleAddColumn }}
    >
      <Outlet />
    </BoardContext.Provider>
  );
}
export const useBoard = () => {
  const board = useContext(BoardContext);
  if (!board) throw new Error("useBoard must be used within a BoardProvider");
  return board;
};
