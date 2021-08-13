import React from "react";

function Button({ text }) {
  return (
    <button type="button" class="btn btn-primary btn-dark">
      {text}
    </button>
  );
}

export default Button;
