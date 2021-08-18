import React from "react";
import { ProfilePhoto, ProfileSummary } from "../component";
import { NavbarAfterLogIn } from "../component";
function Profile() {
  return (
    <>
      <NavbarAfterLogIn />
      <div>
        <h1>Profile</h1>
        <div class="container-lg">
          <div class="row">
            <div class="col">
              <ProfilePhoto />
            </div>
            <ProfileSummary />
            <br />
          </div>
          <hr />
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary me-md-2" type="button">
              Save Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
