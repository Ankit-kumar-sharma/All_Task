import React, { useState } from "react";

import "./App.css";
import InputName from "./Component/InputName";
import InputEmail from "./Component/InputEmail";
import InputDate from "./Component/InputDate";
import InputGender from "./Component/InputGender";
import InputNumber from "./Component/InputNumber";
import InputCity from "./Component/InputCity";
import InputText from "./Component/InputText";
import SubmitBtn from "./Component/SubmitBtn";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState(true);
  const [id, setId] = useState(1);
  let [i, setI] = useState(0);
  let [n, setN] = useState(0);
  let [details, setDetails] = useState([]);
  let [errors, setErrors] = useState({});
  let localStorageContent = localStorage.getItem("details");
  if (localStorageContent === null) {
    details = [];
  } else {
    details = JSON.parse(localStorageContent);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {
      let localStorageContent = localStorage.getItem("details");

      if (localStorageContent === null) {
        details = [];
      } else {
        details = JSON.parse(localStorageContent);
      }
      setId(id + 1);
      if (i === 0) {
        details.push({
          Id: id,
          Name: name,
          Email: email,
          Number: number,
          DOB: dob,
          Gender: gender,
          City: city,
        });
      } else {
        details[n] = {
          Id: id,
          Name: name,
          Email: email,
          Number: number,
          DOB: dob,
          Gender: gender,
          City: city,
        };
        setI(i - 1);
      }
      localStorage.setItem("details", JSON.stringify(details));
      setStatus(true);
      setName("");
      setEmail("");
      setNumber("");
      setDob("");
      setGender("");
      setCity("");
    }
  }

  function removeItem(index) {
    details.splice(index, 1);
    setDetails(details);
    localStorage.setItem("details", JSON.stringify(details));
  }

  function editItem(name, email, gender, city, number, dob, index) {
    setName(name);
    setEmail(email);
    setGender(gender);
    setCity(city);
    setNumber(number);
    setDob(dob);
    setN(index);
    setI(i + 1);
  }

  function handleValidation() {
    let fields = { name, email, number, dob, gender, city };
    let errors = {};
    let formIsValid = true;
    if (fields["name"].length === 0) {
      formIsValid = false;
      errors["name"] = "Please fill username";
    }
    //Name Validation
    else if (fields["name"].length < 3) {
      formIsValid = false;
      errors["name"] = "Name must be more than 3 characters.";
    }
    //Date of Birth Validation
    if (fields["dob"] === null || fields["dob"] === "") {
      formIsValid = false;
      errors["dob"] = "Please fill Date of Birth";
    } else if (fields["dob"] > "2021-16-07" || fields["dob"] < "1900-01-01") {
      formIsValid = false;
      errors["dob"] = "Please fill date between 1900-01-01 to 2021-07-16 ";
    }
    //Mobile Number Validation
    if (fields["number"].length === 0) {
      formIsValid = false;
      errors["number"] = "Please fill mobile number";
    } else if (fields["number"].length !== 10) {
      formIsValid = false;
      errors["number"] = "Mobile number is incorrect";
    } else if (fields["number"] !== "undefined") {
      if (!fields["number"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["number"] = "Only digits and can't have spaces";
      }
    }
    //Gender Validation
    if (fields["gender"].length === 0) {
      formIsValid = false;
      errors["gender"] = "Please select gender";
    }
    //City Validation
    if (fields["city"].length === 0) {
      formIsValid = false;
      errors["city"] = "Please select city";
    }
    //Email Validation
    let localStorageContent = localStorage.getItem("details");
    if (localStorageContent !== null) {
      if (i === 0) {
        let emailItems = JSON.parse(localStorage.getItem("details"));
        emailItems.map((item) => {
          if (item.Email === fields["email"]) {
            formIsValid = false;
            errors["email"] =
              "This email address is already registered try another one !";
          }
          return false;
        });
      }
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Please fill Email ID";
    } else if (fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    setErrors(errors);
    return formIsValid;
  }
  
  return (
    <div className="App">
      <form name="form1" onSubmit={handleSubmit}>
        <fieldset className="field">
          <legend className="leg">Personal Info</legend>
          <label className="format">Name</label>
          <br />
          <InputName onChange={(value) => setName(value)} value={name} />
          <span
            style={{
              color: "red",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          >
            {errors["name"]}
          </span>
          <br />
          <label className="format">Email ID</label>
          <br />
          <InputEmail
            onChange={(value) => setEmail(value)}
            value={email}
            id="inbdemo"
          />
          <span
            style={{
              color: "red",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          >
            {errors["email"]}
          </span>
          <p
            id="message"
            style={{
              color: "white",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          ></p>
          <br />
          <label className="format">Birth Date</label>
          <br />
          <InputDate onChange={(value) => setDob(value)} value={dob} />
          <span
            style={{
              color: "red",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          >
            {errors["dob"]}
          </span>
          <br />
          <label className="format">Gender</label>
          <br />
          <InputGender onChange={(value) => setGender(value)} value={gender} />
          <span
            style={{
              color: "red",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          >
            {errors["gender"]}
          </span>
          <br />
          <label className="format" style={{ marginTop: "70px" }}>
            Phone Number
          </label>
          <br />
          <InputNumber
            onChange={(value) => setNumber(value)}
            value={number}
            className="mob-number"
            placeholder="Please enter 10-digit number"
          />
          <span
            style={{
              color: "red",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          >
            {errors["number"]}
          </span>
          <br />
          <label className="format">City</label>
          <br />
          <InputCity
            onChange={(value) => setCity(value)}
            value={city}
            className="select"
          />
          <span
            style={{
              color: "red",
              fontFamily: "TimesNewRoman",
              fontSize: "20px",
            }}
          >
            {errors["city"]}
          </span>
          <br />
          <label className="format">Tell us about youself</label>
          <br />
          <InputText className="ta" rows="10" />
          <br />
          <SubmitBtn className="sBtn" />
        </fieldset>
      </form>
      {status ? (
        <div className="table-container">
          <p
            style={{
              color: "gray",
              textAlign: "center",
              fontFamily: "TimesNewRoman",
              fontSize: "25px",
              marginBottom: "20px",
            }}
          >
            Student Information
          </p>
          {details.map((user, index) => (
            <div className="tDiv" key={index}>
              <table style={{ overflowX: "auto" }}>
                <tbody>
                  <tr>
                    <td>{user.Name}</td>
                    <td className="eTd">{user.Email}</td>
                    <td style={{ width: "80px" }}>{user.Gender}</td>
                    <td style={{ width: "100px", height: "35px" }}>
                      <button
                        onClick={() =>
                          editItem(
                            user.Name,
                            user.Email,
                            user.Gender,
                            user.City,
                            user.Number,
                            user.dob,
                            index
                          )
                        }
                        style={{
                          width: "100px",
                          cursor: "pointer",
                          height: "35px",
                          textDecoration: "none",
                          lineHeight: "35px",
                          color: "white",
                          backgroundColor: "forestgreen",
                          border: "1px solid white",
                          borderRadius: "2px",
                          textAlign: "center",
                          display: "inline-block",
                          fontFamily: "TimesNewRoman",
                          fontSize: "16px",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td style={{ width: "100px", height: "35px" }}>
                      <button
                        onClick={() => removeItem(index)}
                        style={{
                          width: "100px",
                          cursor: "pointer",
                          height: "35px",
                          textDecoration: "none",
                          lineHeight: "35px",
                          color: "white",
                          backgroundColor: "forestgreen",
                          border: "1px solid white",
                          borderRadius: "2px",
                          textAlign: "center",
                          display: "inline-block",
                          fontFamily: "TimesNewRoman",
                          fontSize: "16px",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
