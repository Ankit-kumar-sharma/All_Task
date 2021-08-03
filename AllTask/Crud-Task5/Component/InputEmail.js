import React from "react";
const InputEmail = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="example@gmail.com"
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
        id={props.id}
        refs="name"
      ></input>
    </div>
  );
};
export default InputEmail;
