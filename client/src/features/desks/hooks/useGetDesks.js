import { useEffect, useState } from "react";
import { addNewDesk, getDesks } from "../api";

export function useGetDesks() {
  const [loading, setLoading] = useState(true);
  const [desks, setDesks] = useState([]);

  const addDesk = ({ deskName, template }) => {
    //Optimistic update
    const newDesk = {
      id: Math.random(),
      pending: true,
      name: deskName,
      boards: [],
    };
    setDesks((prev) => [...prev, newDesk]);

    //Api call
    addNewDesk({ deskName, template }).then((res) => {
      setDesks((prev) =>
        prev.map((desk) =>
          desk.id === newDesk.id ? { ...desk, ...res, pending: false } : desk
        )
      );
    });
  };

  useEffect(() => {
    const loadDesks = async () => {
      const desksData = await getDesks();
      setLoading(false);
      setDesks(desksData);
    };

    loadDesks();
  }, []);

  return { loading, desks, addDesk };
}
