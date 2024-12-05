import axios from "axios";

export const getDesks = async () => {
  const desks = await axios.get("/api/desks");
  return desks.data;
};

export const addNewDesk = async (deskName) => {
  const newDesk = await axios.post("/api/desks/add-desk", { name: deskName });
  return newDesk.data;
};
