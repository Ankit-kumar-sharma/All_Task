import React from "react";
const InputText = (props) => {
  return (
    <div>
      <textarea
        rows={props.rows}
        className={props.className}
        placeholder="---------------Optional---------------"
      ></textarea>
    </div>
  );
};
export default InputText;
