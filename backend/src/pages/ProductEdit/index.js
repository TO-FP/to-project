import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateProduct, getOneProduct, productAuth } from "../../API/admin";
import { Breadcrumbs } from "../../components";
import "./index.css";

const ProductEdit = () => {
  const params = useParams();
  const history = useHistory();

  const access_token = localStorage.getItem("access_token");
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [fileId, setFileId] = useState();
  const [files, setFiles] = useState({});
  const [localFiles, setLocalFiles] = useState({});

  const [picOrder, setPicOrder] = useState({});

  const [images, setImages] = useState([]);
  const [form, setForm] = useState({});

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    document.getElementById("input-file").value = "";

    if (file) {
      const key = `IMAGE${fileId}`;
      const urlLocalFiles = URL.createObjectURL(file);

      if (files) {
        setFiles({ ...files, [key]: file });
        setLocalFiles({ ...localFiles, [key]: urlLocalFiles });

        setPicOrder({ ...picOrder, [key]: "" });
      } else {
        setFiles({ [key]: file });
        setLocalFiles({ [key]: urlLocalFiles });

        setPicOrder({ [key]: "" });
      }
    }
  };

  const handleClickUpload = (e, id) => {
    setFileId(id);
    document.getElementById("input-file").click();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("file", files.IMAGE0);
    formData.append("file", files.IMAGE1);
    formData.append("file", files.IMAGE2);
    formData.append("file", files.IMAGE3);

    formData.append("IMAGE0", files.IMAGE0 ? true : false);
    formData.append("IMAGE1", files.IMAGE1 ? true : false);
    formData.append("IMAGE2", files.IMAGE2 ? true : false);
    formData.append("IMAGE3", files.IMAGE3 ? true : false);

    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("weight", form.weight);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("condition", form.condition);

    // hardcode nama user
    const productUpdated = await updateProduct(access_token, form.id, formData);
    console.log(productUpdated);

    // const productUpdated = 400;

    if (productUpdated.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Product has been updated!",
        showConfirmButton: false,
        timer: 1300,
      }).then(() => {
        history.push(`/product-details/${params.id}`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const showOneProduct = async () => {
    const id = +params.id;
    const data = await getOneProduct(access_token, id);
    setForm(data);

    const tempImage = [];
    data.Products_images.forEach((image) => {
      tempImage.push(image.fileName);
    });

    setImages(tempImage);
  };

  useEffect(async () => {
    const res = await productAuth(access_token, +params.id);

    console.log(res);
    if (res.status !== 200) {
      Swal.fire({
        icon: "error",
        title: "You haven't permission!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        history.push("/products");
      });
    }
    showOneProduct();
  }, []);

  return (
    <>
      <Breadcrumbs page="products-details-edit" params={{ id: +params.id }} />
      <input
        id="input-file"
        type="file"
        onChange={(e) => handleUploadFile(e)}
        className="d-none"
      />
      <div className="row">
        <div className="col-4 product-add ">
          <div
            className="image-box-primary"
            onClick={(e) => handleClickUpload(e, 0)}
          >
            {localFiles.IMAGE0 || images[0] ? (
              <img
                src={
                  localFiles.IMAGE0
                    ? localFiles.IMAGE0
                    : `${API_BASE_URL}/images/products/${images[0]}`
                }
                className="image"
              />
            ) : (
              <div className="blank d-flex justify-content-center align-items-center">
                <span style={{ fontSize: 20 }}>Choose image</span>
              </div>
            )}
          </div>

          <div>
            <div className="d-flex mt-3">
              {images.map((image, index) => {
                if (index > 0) {
                  const arrIMAGE = `IMAGE${index}`;
                  return (
                    <div
                      className="details-image-secondary"
                      style={
                        index !== images.length && index !== 1
                          ? { marginLeft: 20 }
                          : { marginLeft: 0 }
                      }
                      onClick={(e) => handleClickUpload(e, index)}
                    >
                      <img
                        src={
                          localFiles[arrIMAGE]
                            ? localFiles[arrIMAGE]
                            : `${API_BASE_URL}/images/products/${image}`
                        }
                        className="details-image"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* <div className="d-flex justify-content-between">
            <div className="image-box" onClick={(e) => handleClickUpload(e, 1)}>
              {localFiles.IMAGE1 || images[1] ? (
                <img
                  src={
                    localFiles.IMAGE1
                      ? localFiles.IMAGE1
                      : `${API_BASE_URL}/images/products/${images[1]}`
                  }
                  className="image"
                />
              ) : (
                <div className="blank d-flex justify-content-center align-items-center">
                  <span style={{ fontSize: 10 }}>Choose image</span>
                </div>
              )}
            </div>

            <div className="image-box" onClick={(e) => handleClickUpload(e, 2)}>
              {localFiles.IMAGE2 || images[2] ? (
                <img
                  src={
                    localFiles.IMAGE2
                      ? localFiles.IMAGE2
                      : `${API_BASE_URL}/images/products/${images[2]}`
                  }
                  className="image"
                />
              ) : (
                <div className="blank d-flex justify-content-center align-items-center">
                  <span style={{ fontSize: 10 }}>Choose image</span>
                </div>
              )}
            </div>

            <div className="image-box" onClick={(e) => handleClickUpload(e, 3)}>
              {localFiles.IMAGE3 || images[3] ? (
                <img
                  src={
                    localFiles.IMAGE3
                      ? localFiles.IMAGE3
                      : `${API_BASE_URL}/images/products/${images[3]}`
                  }
                  className="image"
                />
              ) : (
                <div className="blank d-flex justify-content-center align-items-center">
                  <span style={{ fontSize: 10 }}>Choose image</span>
                </div>
              )}
            </div>
          </div> */}
        </div>

        {/* <div className="blank d-flex justify-content-center align-items-center">
                {images[0] ? (
                  <img
                    src={`${API_BASE_URL}/images/products/${images[0]}`}
                    className="image"
                  />
                ) : (
                  <h4>Choose Image 1</h4>
                )}
              </div> */}

        <div className="col-8">
          <div className="row mb-3">
            <div className="col-2">
              <label>Name</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-2">
              <label>Description</label>
            </div>
            <div className="col-10">
              <textarea
                cols="30"
                rows="5"
                className="form-control"
                name="desc"
                placeholder="Enter product description"
                value={form.desc}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-2">
              <label>Price</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="price"
                placeholder="Enter product price"
                value={form.price}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-2">
              <label>Stock</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="stock"
                placeholder="Enter product stock"
                value={form.stock}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          {/* <div className="row mb-3">
            <div className="col-2">
              <label>Expire</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="expire"
                placeholder="Enter product expire"
                value={form.expire}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div> */}

          <div className="row mb-3">
            <div className="col-2">
              <label>Weight</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="weight"
                placeholder="Enter product weight"
                value={form.weight}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-2">
              <label>Category</label>
            </div>
            <div className="col-10">
              <select
                className="form-control"
                name="category"
                defaultValue={form.category}
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  &mdash; Choose Category &mdash;
                </option>
                <option value="Formal">Formal</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Casual">Casual</option>
                <option value="Slip-on">Slip On</option>
                <option value="Boot">Boot</option>
                <option value="Futsal">Futsal</option>
                <option value="Basker">Basket</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-2">
              <label>Brand</label>
            </div>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                name="brand"
                placeholder="Enter brand name"
                value={form.brand}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-2">
              <label>Condition</label>
            </div>
            <div className="col-10">
              <select
                className="form-control"
                name="condition"
                defaultValue={form.brand}
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  &mdash; Choose Condition &mdash;
                </option>
                <option value="New">New</option>
                <option value="Second">Second</option>
                <option value="Refurbish">Refurbish</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <Link to={`/product-details/${form.id}`}>
                <button className="btn btn-primary">Back</button>
              </Link>
            </div>
            <div className="col-10">
              <button
                className="btn btn-success"
                onClick={() => handleSubmit()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;
