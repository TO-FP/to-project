import React from "react";
import { ProfilePhoto, ProfileSummary } from "../component";
import { NavbarAfterLogIn } from "../component";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

function Profile() {
  // console.log(nameProfile);

  const URL = "http://localhost:3000/api";
  const [profile, setProfile] = useState({
    name: "",
    birthdate: "",
    gender: "",
  });
  const nameProfile = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    setProfile({ ...nameProfile });
  }, []);
  const [pict, setPict] = useState();

  // console.log(pict);
  // console.log(pict);
  // const user = localStorage;
  // console.log(user);
  // console.log(profile);
  // console.log(profile.gender);

  // console.log(profile);
  console.log(profile);
  const submitHandler = (e) => {
    e.preventDefault();

    // console.log(profile.gender);

    const data = new FormData();
    data.append("file", pict);
    data.append("name", profile.name);
    data.append("birthdate", profile.birthdate);
    data.append("gender", profile.gender);
    // console.log(data);
    // data.append(profile);
    editProfile(data);
    // editPhoto(data);
  };

  // console.log(profile);

  // console.log(nameProfile);
  const token = localStorage.getItem("access_token");
  // console.log(nameProfile);
  // console.log(token);

  const editProfile = async (data) => {
    try {
      await axios({
        method: "PUT",
        url: `${URL}/account/update`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: token,
        },
      });
      Swal.fire("Post Items", "Items have been submitted", "success");
    } catch (err) {
      // console.log(profile);
      console.log(err);
    }
  };

  const editPhoto = async (data) => {
    try {
      await axios({
        method: "PUT",
        url: `${URL}/account/update`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: token,
        },
      });
      Swal.fire("Post Items", "Items have been submitted", "success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-lg profile">
        <div class="title">
          <h1>Profile</h1>
        </div>
        <div class="container-lg">
          <div class="row">
            <div class="col">
              <div className="container">
                <img
                  className="pp"
                  src={`http://localhost:3000/images/avatars/${nameProfile.avatar}
`}
                  alt=""
                />
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile01"
                    onChange={(e) => setPict(e.target.files[0])}
                  />
                </div>
                {/* <h1>PP</h1> */}
              </div>
            </div>
            {/* <ProfileSummary /> */}

            <div class="col">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Username
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control-plaintext"
                      id="staticEmail"
                      defaultValue={nameProfile.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setProfile({
                            ...profile,
                            name: nameProfile.name,
                          });
                        } else {
                          setProfile({ ...profile, name: e.target.value });
                        }
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control-plaintext"
                      id="staticEmail"
                      readOnly
                      defaultValue={nameProfile.email}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">
                    Password
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="****"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Gender
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      readonly
                      class="form-control-plaintext"
                      id="staticEmail"
                      defaultValue={nameProfile.gender}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setProfile({
                            ...profile,
                            gender: nameProfile.gender,
                          });
                        } else {
                          setProfile({ ...profile, gender: e.target.value });
                        }
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Birthdate
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control-plaintext"
                      id="staticEmail"
                      defaultValue={nameProfile.birthdate}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setProfile({
                            ...profile,
                            birthdate: nameProfile.birthdate,
                          });
                        } else {
                          setProfile({ ...profile, birthdate: e.target.value });
                        }
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            <br />
          </div>
          <hr />
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              class="btn btn-primary me-md-2"
              type="button"
              onClick={(e) => submitHandler(e)}
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
