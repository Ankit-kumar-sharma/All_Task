import React from "react";
const InputCity = (props) => {
  return (
    <div>
      <select
        className={props.className}
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
      >
        <option defaultValue="">--Select--</option>
        <option defaultValue="Aligarh">Aligarh</option>
        <option defaultValue="Agra">Agra</option>
        <option defaultValue="Greater Noida">Greater Noida</option>
        <option defaultValue="Gurugoan">Gurugoan</option>
        <option defaultValue="Mumbai">Mumbai</option>
        <option defaultValue="Kolkata">Kolkata</option>
        <option defaultValue="Chandigarh">Chandigarh</option>
        <option defaultValue="Jaipur">Jaipur</option>
      </select>
    </div>
  );
};
export default InputCity;
