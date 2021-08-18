import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AdminAPI = async (access_token) => {
  const data = await axios
    .get(`${API_URL}/admins`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const getAllProducts = async (access_token, name, sort, page) => {
  const data = await axios
    .get(`${API_URL}/admins/products/${name}/${sort}/${page}`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const getMyProducts = async (access_token, name, sort, page) => {
  const data = await axios
    .get(`${API_URL}/admins/my-products/${name}/${sort}/${page}`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const getOneProduct = async (access_token, id) => {
  const data = await axios
    .get(`${API_URL}/admins/products-details/${id}`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data.product;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const addProduct = async (access_token, data) => {
  return await axios
    .post(`${API_URL}/admins/products-add`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const productAuth = async (access_token, id) => {
  return await axios
    .get(`${API_URL}/admins/products-auth/${id}`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const updateProduct = async (access_token, id, data) => {
  return await axios
    .put(`${API_URL}/admins/products/${id}/update`, data, {
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
};

const deleteProduct = async (access_token, id) => {
  return await axios
    .delete(`${API_URL}/admins/products/${id}/delete`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const getOrder = async (access_token, status) => {
  const data = await axios
    .get(`${API_URL}/admins/orders/${status}`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data.order;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const getOrderDetails = async (access_token, name) => {
  const data = await axios
    .get(`${API_URL}/admins/order-details/${name}`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const changeStatusOrder = async (access_token, name, status) => {
  const data = await axios
    .put(`${API_URL}/admins/change-status-order/${name}/${status}`, null, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

export {
  AdminAPI,
  getAllProducts,
  getMyProducts,
  getOneProduct,
  addProduct,
  productAuth,
  updateProduct,
  deleteProduct,
  getOrder,
  getOrderDetails,
  changeStatusOrder,
};
