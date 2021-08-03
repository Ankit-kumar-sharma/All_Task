import React from "react";
const InputDate = (props) => {
  return (
    <div>
      <input
        type="date"
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
        max={props.max}
      ></input>
    </div>
  );
};
export default InputDate;
