import axios from "axios";

export const handleLogin = ({ email, password }, successCallback) => {
  axios
    .post("/api/auth/login", { email, password })
    .then(() => {
      if (successCallback) successCallback();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleRegister = ({ email, password }) => {
  axios
    .post("/api/auth/register", { email, password })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
