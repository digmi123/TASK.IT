import { useEffect, useState } from "react";
import { addNewDesk, getDesks } from "../api";

export function useGetDesks() {
  const [loading, setLoading] = useState(true);
  const [desks, setDesks] = useState([]);

  const addDesk = (deskName) => {
    //Optimistic update
    const newDesk = {
      id: Math.random(),
      pending: true,
      name: deskName,
      boards: [],
    };
    setDesks((prev) => [...prev, newDesk]);

    console.log("here on addDesk");

    //Api call
    addNewDesk(deskName).then((res) => {
      console.log("here on api call");
      console.log({ res });

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
