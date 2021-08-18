import axios from "axios";
import { Breadcrumbs } from "../../components";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { addProduct } from "../../API/admin";
import "./index.css";
import Swal from "sweetalert2";

const ProductAdd = () => {
  const history = useHistory();
  const access_token = localStorage.getItem("access_token");

  const [files, setFiles] = useState({});
  const [displayFiles, setDisplayFiles] = useState({});
  const [fileId, setFileId] = useState();
  const [fileStatus, setFileStatus] = useState();

  const [form, setForm] = useState({});

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    document.getElementById("input-file").value = "";

    if (file) {
      file.id = fileId;
      file.status = fileStatus;

      const imageId = `image${fileId}`;
      const URLcreateObject = URL.createObjectURL(file);

      if (files) {
        setFiles({
          ...files,
          [imageId]: file,
        });

        setDisplayFiles({
          ...displayFiles,
          [imageId]: URLcreateObject,
        });
      } else {
        setFiles({ [imageId]: file });
        setDisplayFiles({ [imageId]: URLcreateObject });
      }
    }
  };

  const handleClickUpload = (e, id) => {
    setFileId(id);
    if (id === 1) {
      setFileStatus(true);
    } else {
      setFileStatus(false);
    }

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
    // console.log(files.image1);
    // return false;

    var formData = new FormData();
    formData.append("file", files.image1);
    formData.append("file", files.image2);
    formData.append("file", files.image3);
    formData.append("file", files.image4);
    for (var key in form) {
      formData.append(key, form[key]);
    }
    // hardcode nama user

    const productAdded = await addProduct(access_token, formData);

    console.log(productAdded);

    if (productAdded.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Product has been added!",
        showConfirmButton: false,
        timer: 1300,
      }).then(() => {
        history.push(`/product-details/${productAdded.product.id}`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `Validation Error!`,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Breadcrumbs page="products-add" />
      <input
        id="input-file"
        type="file"
        onChange={(e) => handleUploadFile(e)}
        className="d-none"
      />
      <div className="row">
        <div className="col-4 product-add ">
          <div>
            <div
              className={`image-box-primary`}
              onClick={(e) => handleClickUpload(e, 1)}
            >
              {displayFiles.image1 ? (
                <img src={displayFiles.image1} className="image" />
              ) : (
                <div className="blank d-flex justify-content-center align-items-center">
                  <h4>Choose Image 1</h4>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="col-4 image-box"
                onClick={(e) => handleClickUpload(e, 2)}
              >
                {displayFiles.image2 ? (
                  <img src={displayFiles.image2} className="image" />
                ) : (
                  <div className="blank d-flex justify-content-center align-items-center">
                    <p style={{ fontSize: 10 }}>Choose Image 2</p>
                  </div>
                )}
              </div>
              <div
                className="col-4 image-box"
                onClick={(e) => handleClickUpload(e, 3)}
              >
                {displayFiles.image3 ? (
                  <img src={displayFiles.image3} className="image" />
                ) : (
                  <div className="blank d-flex justify-content-center align-items-center">
                    <p style={{ fontSize: 10 }}>Choose Image 3</p>
                  </div>
                )}
              </div>
              <div
                className="col-4 image-box"
                onClick={(e) => handleClickUpload(e, 4)}
              >
                {displayFiles.image4 ? (
                  <img src={displayFiles.image4} className="image" />
                ) : (
                  <div className="blank d-flex justify-content-center align-items-center">
                    <p style={{ fontSize: 10 }}>Choose Image 4</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
                defaultValue=""
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
                <option value="Basket">Basket</option>
                <option value="Others">Others</option>
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
                defaultValue=""
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
              <Link to="/my-products">
                <button className="btn btn-primary">Back</button>
              </Link>
            </div>
            <div className="col-10">
              <button
                className="btn btn-success"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
