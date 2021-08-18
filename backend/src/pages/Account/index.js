import React, { useState, useEffect } from "react";
import axios from "axios";
import { UpdateProfileAPI } from "../../API";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumbs } from "../../components";

const Account = ({ handleupdatezzz }) => {
  const history = useHistory();

  const BASE_API_URL = process.env.REACT_APP_API_URL;

  const access_token = localStorage.getItem("access_token");
  const [data, setData] = useState({});

  const [isUpdated, setIsUpdated] = useState();

  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState();
  const [displayFiles, setDisplayFiles] = useState();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const URLcreateObject = URL.createObjectURL(file);
    setDisplayFiles(URLcreateObject);
    setFile(file);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const chooseFile = () => {
    document.getElementById("file").click();
  };

  const cb = () => {
    handleupdatezzz();
    handleCancel();
    setIsUpdated(new Date());
  };

  const handleUpdate = async () => {
    var formData = new FormData();
    formData.append("file", file);
    for (var key in form) {
      formData.append(key, form[key]);
    }

    const updatedProfile = await UpdateProfileAPI(access_token, formData);

    if (updatedProfile.status === 200) {
      localStorage.setItem("admin", JSON.stringify(updatedProfile.user));

      Swal.fire({
        icon: "success",
        title: "Profile has been updated!",
        showConfirmButton: false,
        timer: 1300,
      }).then(() => {
        cb();
        history.push(`/accounts`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Field cannot be empty!",
        showConfirmButton: false,
        timer: 1300,
      });
    }
  };

  useEffect(() => {
    const { name, avatar, gender, birthdate } = JSON.parse(
      localStorage.getItem("admin")
    );

    setForm({
      name,
      avatar,
      gender,
      birthdate,
    });

    setData({ ...JSON.parse(localStorage.getItem("admin")) });
  }, [isUpdated]);

  return (
    <>
      <Breadcrumbs page="account" />
      {/* <button
        onClick={() => {
          handleupdatezzz();
        }}
      >
        ssss
      </button> */}
      <div className="mainBG p-3">
        <div className="row">
          <div className="col-2">
            {isEdit ? (
              <div
                style={{
                  width: 150,
                  height: 150,
                  cursor: "pointer",
                }}
                onClick={() => chooseFile()}
              >
                {displayFiles ? (
                  <img
                    src={`${displayFiles}`}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={`${BASE_API_URL}/images/avatars/${data.avatar}`}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            ) : (
              <div style={{ width: 150, height: 150 }}>
                <img
                  src={`${BASE_API_URL}/images/avatars/${data.avatar}`}
                  alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div className="col-8">
            <input
              id="file"
              type="file"
              name="file"
              className="d-none"
              onChange={(e) => handleUpload(e)}
            />

            <div className="row align-items-center mb-1">
              <div className="col-2">
                <label>Name :</label>
              </div>
              <div className="col-10">
                {isEdit ? (
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  <span>{data.name}</span>
                )}
              </div>
            </div>

            <div className="row align-items-center mb-1">
              <div className="col-2">
                <label>Email :</label>
              </div>
              <div className="col-10">
                {isEdit ? (
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={data.email}
                    readOnly
                  />
                ) : (
                  <span
                    style={{
                      backgroundColor: "#dedede",
                      color: "#000",
                      padding: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontSize: 13,
                      borderRadius: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {data.email}
                  </span>
                )}
              </div>
            </div>

            <div className="row align-items-center mb-1">
              <div className="col-2">
                <label>Gender :</label>
              </div>
              <div className="col-10">
                {isEdit ? (
                  <select
                    name="gender"
                    className="form-control"
                    defaultValue={form.gender}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <span>{data.gender}</span>
                )}
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-2">
                <label>Birthdate :</label>
              </div>
              <div className="col-10">
                {isEdit ? (
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.birthdate}
                    onChange={(e) => handleChange(e)}
                  />
                ) : (
                  <span>{data.birthdate}</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-2">
            {!isEdit ? (
              <button className="btn btn-warning" onClick={() => handleEdit()}>
                Edit Profile
              </button>
            ) : (
              <button className="btn btn-danger" onClick={() => handleCancel()}>
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="d-flex mt-3">
          <div>
            <Link to="/">
              <button
                className="btn btn-primary mt-3"
                style={{ marginRight: 5 }}
              >
                Back
              </button>
            </Link>
          </div>
          {isEdit && (
            <div>
              <button
                className="btn btn-success mt-3"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
