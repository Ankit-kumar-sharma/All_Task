import React from "react";
const InputName = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
        refs="name"
      ></input>
    </div>
  );
};
export default InputName;
