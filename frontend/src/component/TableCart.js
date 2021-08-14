import React from "react";

function TableCart() {
  return (
    <tbody className="body-table">
      {/* {dilooping di sini} */}

      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td className="update-number">
          <form className="update-qty" action="">
            <div class="d-inline p-1">
              <input type="text" />
            </div>
            <div class="d-inline p-1">
              <button type="button" class="btn btn-primary btn-sm">
                Update
              </button>
            </div>
            <div class="d-inline p-1">
              <button type="button" class="btn btn-primary btn-sm">
                X
              </button>
            </div>
          </form>
        </td>
        <td>@mdo</td>
        <td>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked"></label>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default TableCart;
