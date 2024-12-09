import axios from "axios";

export const getDesks = async () => {
  const desks = await axios.get("/api/desks");
  return desks.data;
};

export const addNewDesk = async ({ deskName, template }) => {
  const newDesk = await axios.post("/api/desks/add-desk", {
    name: deskName,
    template,
  });
  return newDesk.data;
};
