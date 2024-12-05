import { useEffect, useState } from "react";
import { getDesk } from "../api";

export function useGetDesk({ id }) {
  const [loading, setLoading] = useState(true);
  const [deskData, setDeskData] = useState({ columns: [{ tasks: [] }] });

  useEffect(() => {
    const loadBoardData = async () => {
      const { data: deskData } = await getDesk(id);
      setLoading(false);
      setDeskData(deskData);
    };

    loadBoardData(id);
  }, [id]);

  return { loading, deskData, setDeskData };
}
