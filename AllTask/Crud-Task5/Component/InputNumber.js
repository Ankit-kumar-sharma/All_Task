import React from "react";
const InputNumber = (props) => {
  return (
    <div>
      <input
        type="tel"
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
        className={props.className}
        pattern={props.pattern}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};
export default InputNumber;
