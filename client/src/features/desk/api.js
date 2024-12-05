import axios from "axios";

export const getDesk = async (deskId) => {
  const deskData = await axios.get(`/api/desks/${deskId}`);
  return deskData;
};
