import React from "react";
const InputGender = (props) => {
  return (
    <div>
      <select
        className="select"
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
        selected={props.selected}
        placeholder="Select"
      >
        <option defaultValue="" >--Select--</option>
        <option defaultValue="Male">Male</option>
        <option defaultValue="Female">Female</option>
      </select>
    </div>
  );
};
export default InputGender;
