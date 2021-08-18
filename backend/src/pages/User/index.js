import { Breadcrumbs } from "../../components";
import React from "react";
import "./index.css";

function User() {
  return (
    <>
      <Breadcrumbs page="users" />
      <div className="user">
        <div className="mainBG">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">1</td>
                <td>
                  <div className="user-avatar-container">
                    <img
                      className="user-avatar"
                      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/527f2c83-b33d-43f4-8aa8-a95372ee139e/dd9wlns-fbeca6e1-8bdb-4e5c-aea1-2e1dd798b258.png/v1/fill/w_1280,h_720,q_80,strp/one_piece_chapter_946_luffy_come_at_me_yonko_haki__by_amanomoon_dd9wlns-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNTI3ZjJjODMtYjMzZC00M2Y0LThhYTgtYTk1MzcyZWUxMzllXC9kZDl3bG5zLWZiZWNhNmUxLThiZGItNGU1Yy1hZWExLTJlMWRkNzk4YjI1OC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.B9M1nOX34L_nwyo5hUCQzfiN5RT1YXg-LwLruyBw7Jo"
                      alt="avatar"
                    />
                  </div>
                </td>
                <td>Dimas</td>
                <td>dimas@gmail.com</td>
              </tr>
              <tr>
                <td scope="row">1</td>
                <td>
                  <div className="user-avatar-container">
                    <img
                      className="user-avatar"
                      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/527f2c83-b33d-43f4-8aa8-a95372ee139e/dd9wlns-fbeca6e1-8bdb-4e5c-aea1-2e1dd798b258.png/v1/fill/w_1280,h_720,q_80,strp/one_piece_chapter_946_luffy_come_at_me_yonko_haki__by_amanomoon_dd9wlns-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNTI3ZjJjODMtYjMzZC00M2Y0LThhYTgtYTk1MzcyZWUxMzllXC9kZDl3bG5zLWZiZWNhNmUxLThiZGItNGU1Yy1hZWExLTJlMWRkNzk4YjI1OC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.B9M1nOX34L_nwyo5hUCQzfiN5RT1YXg-LwLruyBw7Jo"
                      alt="avatar"
                    />
                  </div>
                </td>
                <td>Dimas</td>
                <td>dimas@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
