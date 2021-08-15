import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <>
      <label for="">{name}</label>
      <span> </span>
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked === "open" ? true : false}
        // defaultValue={}
      />
    </>
  );
};

export default Checkbox;
