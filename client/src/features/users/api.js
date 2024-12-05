import axios from "axios";

export const getUserInfo = async () => {
  const user = await axios.get("/api/users/get_user_info");
  return user.data;
};
