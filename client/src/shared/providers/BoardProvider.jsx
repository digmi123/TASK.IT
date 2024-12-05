import { useGetBoard } from "@/features/board/hooks/useGetBoard";
import { addColumn } from "@/features/columns/api";
import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";

const BoardContext = createContext();

export default function BoardProvider({ boardId }) {
  const { boardData, setBoardData, loading } = useGetBoard({ boardId });

  if (loading) return <div>Loading...</div>;

  const handleAddColumn = (columName) => {
    // Optimistic update
    const newColumn = {
      id: Math.random(),
      name: columName,
      tasks: [],
    };

    setBoardData((board) => {
      const updatedBoardData = {
        ...board,
        columns: [...board.columns, newColumn],
      };

      return updatedBoardData;
    });

    // API call
    addColumn({ boardId, columnName: columName });
  };

  return (
    <BoardContext.Provider
      value={{ boardData, setBoardData, loading, handleAddColumn }}
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
