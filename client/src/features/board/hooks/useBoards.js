import { useEffect, useState } from "react";
import { addNewBoard, getBoards } from "../api";
import { useUser } from "@/shared/providers/UserProvider";

export function useBoards(deskId) {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const { userData } = useUser();

  const addBoard = (boardName) => {
    //Optimistic update
    // const newBoard = {
    //   id: Math.random(),
    //   name: boardName,
    //   owner_id: userData.id,
    // };

    // setBoards((prev) => [...prev, newBoard]);

    addNewBoard(deskId, boardName).then((res) => {
      setBoards((prev) => [...prev, res.data]);
    });
  };

  useEffect(() => {
    const loadBoards = async () => {
      const boardsData = await getBoards(deskId);
      setLoading(false);
      setBoards(boardsData);
    };

    loadBoards();
  }, [deskId]);

  return { loading, boards, setBoards, addBoard };
}
