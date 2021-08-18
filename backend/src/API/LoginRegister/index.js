import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const RegisterAPI = (body) => {
  return "registerapi";
};

const LoginAPI = async (form) => {
  const data = await axios
    .post(`${API_URL}/api/login`, form)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const UpdateProfileAPI = async (access_token, form) => {
  const data = await axios
    .put(`${API_URL}/api/account/update`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return data;
};

export { RegisterAPI, LoginAPI, UpdateProfileAPI };
