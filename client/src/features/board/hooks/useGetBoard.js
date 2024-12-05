import { useEffect, useState } from "react";
import { getBoard } from "../api";

export function useGetBoard({ boardId }) {
  const [loading, setLoading] = useState(true);
  const [boardData, setBoardData] = useState({ columns: [{ tasks: [] }] });

  useEffect(() => {
    const loadBoardData = async () => {
      const { data: boardData } = await getBoard(boardId);

      setLoading(false);
      setBoardData(boardData);
    };

    loadBoardData(boardId);
  }, [boardId]);

  return { loading, boardData, setBoardData };
}
