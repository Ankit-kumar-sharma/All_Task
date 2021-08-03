import React from "react";
const SubmitBtn = (props) => {
  return (
    <div>
     <button type="submit" className={props.className}>
            Submit
          </button>
    </div>
  );
};
export default SubmitBtn;
