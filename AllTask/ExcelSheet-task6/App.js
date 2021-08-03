import React from "react";
import Resizer from "react-image-file-resizer";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      profileImg: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      email: "",
      address: "",
      excelSheet: "",
      dimensions: { height: 0, width: 0 },
      size: "0",
      errors: "",
      actualHeight: "150",
      actualWidth: "150",
      name: "",
      isChecked: true,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    /* this.fileChangedHandler = this.fileChangedHandler.bind(this); */
  }
  onImgLoad({ target: img }) {
    this.setState({
      dimensions: { height: img.naturalHeight, width: img.naturalWidth },
    });
  }
  clear = () => {
    this.setState({
      dimensions: { height: 0, width: 0 },
      profileImg: "",
      size: "0",
      name: "",
    });
  };

  handleValidation = () => {
    const { firstName, lastName, age, gender, email, profileImg, excelSheet } =
      this.state;
    let fields = {
      firstName,
      lastName,
      age,
      gender,
      email,
      profileImg,
      excelSheet,
    };
    let errors = {};
    let formIsValid = true;
    //First_Name Validation

    let letters = /^[A-Za-z]+$/;
    if (fields["firstName"].length === 0) {
      formIsValid = false;
      errors["firstName"] = "Please fill firstname";
    } else if (!fields["firstName"].match(letters)) {
      formIsValid = false;
      errors["firstName"] = "Invalid first name";
    } else if (fields["firstName"].length < 3) {
      formIsValid = false;
      errors["firstName"] = "First name must be more than 3 characters.";
    }
    console.log(errors);
    if (!Object.keys(errors).length >= 1) {
      //Last_name Validation
      let letters = /^[A-Za-z]+$/;
      if (fields["lastName"].length === 0) {
        formIsValid = false;
        errors["lastName"] = "Please fill last name";
      } else if (!fields["lastName"].match(letters)) {
        formIsValid = false;
        errors["lastName"] = "Invalid last name";
      } else if (fields["lastName"].length < 3) {
        formIsValid = false;
        errors["lastName"] = "Last name must be more than 3 characters.";
      }
      if (!Object.keys(errors).length >= 1) {
        //Age Validation
        if (fields["age"].length === 0) {
          formIsValid = false;
          errors["age"] = "Insert your age.";
        } else if (fields["age"] < 18 || fields["age"] > 28) {
          formIsValid = false;
          errors["age"] =
            "Invalid age!, Age should be more than 18 and less than 28";
        }
        if (!Object.keys(errors).length >= 1) {
          //gender validation
          if (fields["gender"].length === 0) {
            formIsValid = false;
            errors["gender"] = "Please select appropriate gender option";
          }
          if (!Object.keys(errors).length >= 1) {
            //email Validation
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
            //Excel sheet upload status checking
            /* if (fields["excelSheet"].length === 0) {
      formIsValid = false;
      errors["excelSheet"] = "Excel sheet is not uploaded.";
    } */
            //Image upload status checking
            if (!Object.keys(errors).length >= 1) {
              if (fields["profileImg"].length === 0) {
                formIsValid = false;
                errors["profileImg"] = "Please upload image.";
              } else if (this.state.size > 50) {
                formIsValid = false;
                errors["profileImg"] = "File size exceeds 50KB";
              } else if (!this.state.name.match(/\.(jpg|jpeg|png)$/)) {
                formIsValid = false;
                errors["profileImg"] = "Image should be either .jpeg or png";
              }
            }
          }
        }
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      alert("form submission successful.");
    } else {
      alert("Form can't be submitted");
    }
  };
  imageLoadCall = (e) => {
    this.onImgLoad(e), this.handleValidation();
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          profileImg: reader.result,
        });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    this.setState({
      size: e.target.files[0].size / 1000,
      name: e.target.files[0].name,
    });
    var fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          this.state.actualHeight,
          this.state.actualWidth,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            this.setState({ profileImg: uri });
          },
          "base64",
          this.state.actualHeight,
          this.state.actualWidth
        );
      } catch (err) {
        console.log(err);
      }
    }
    console.log(this.state.size);
  };

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
    console.log(this.state.isChecked);
  }
  handleAspectRatio = () => {
    if (!this.state.isChecked) {
      this.setState({
        actualWidth: this.state.actualHeight,
        actualHeight: this.state.actualHeight,
      });
    } else {
      this.setState({
        actualHeight: this.state.actualHeight,
        actualWidth: this.state.actualWidth,
      });
    }
  };
  render() {
    const {
      profileImg,
      firstName,
      lastName,
      email,
      age,
      address,
      gender,
      errors,
      status,
      size,
      actualHeight,
      actualWidth,
    } = this.state;
    const { width, height } = this.state.dimensions;
    return (
      <div className="main">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <p className="title">User Infomation</p>
            <label className="tagline">First Name</label>
            <br />
            <input
              type="text"
              onChange={(e) => {
                this.setState(
                  { firstName: e.target.value },
                  this.handleValidation
                );
              }}
              value={firstName}
              placeholder="Enter first name"
            ></input>
            <span className="Notification">{errors["firstName"]}</span>
            <br />
            <label className="tagline">Last Name</label>
            <br />
            <input
              type="text"
              onChange={(e) => {
                this.setState(
                  { lastName: e.target.value },
                  this.handleValidation
                );
              }}
              value={lastName}
              placeholder="Enter last name"
            ></input>
            <span className="Notification">{errors["lastName"]}</span>
            <br />
            <label className="tagline">Age</label>
            <br />
            <input
              type="number"
              onChange={(e) => {
                this.setState({ age: e.target.value }, this.handleValidation);
              }}
              value={age}
              placeholder="Enter age"
            ></input>
            <br />
            <span className="Notification">{errors["age"]}</span>
            <br />
            <label className="tagline">Gender</label>
            <br />
            <input
              type="radio"
              name="gender"
              onClick={() => {
                this.setState({ gender: "male" }, this.handleValidation);
              }}
              value={gender}
            ></input>{" "}
            <span className="tagline" style={{ fontSize: "16px" }}>
              Male
            </span>
            <br />
            <input
              type="radio"
              name="gender"
              onClick={() => {
                this.setState({ gender: "female" }, this.handleValidation);
              }}
              value={gender}
            ></input>{" "}
            <span className="tagline" style={{ fontSize: "16px" }}>
              Female
            </span>
            <br></br>
            <span className="Notification">{errors["gender"]}</span>
            <br />
            <label className="tagline">Email</label>
            <br />
            <input
              type="text"
              onChange={(e) => {
                this.setState({ email: e.target.value }, this.handleValidation);
              }}
              value={email}
              placeholder="Enter email address"
            ></input>
            <span className="Notification">{errors["email"]}</span>
            <br />
            <label className="tagline">Upload Image</label>
            <br />
            <p className="suggest">Note: Image should be (150px*150px) size</p>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={this.imageHandler}
            ></input>
            <div className="profileImgContainer">
              <img
                src={profileImg}
                onLoad={this.imageLoadCall}
                alt=" "
                className="userImage"
                height="150px"
                width="150px"
              />
            </div>
            <p className="dimen">
              Size={size} KB, Width={width}px, Height={height}px{" "}
            </p>
            <br />
            <span className="Notification">{errors["profileImg"]}</span>
            <br />
            <a
              style={{ textDecoration: "none", color: "white" }}
              className="Button"
              onClick={() => {
                this.setState({ status: true });
              }}
            >
              Resize
            </a>
            <a
              style={{ textDecoration: "none", color: "white" }}
              className="Button"
              onClick={this.clear}
            >
              Clear
            </a>
            <br />
            {status ? (
              <div className="hiddenDiv">
                <label className="tagline">Height:</label>
                <input
                  type="number"
                  onChange={(e) => {
                    this.setState(
                      { actualHeight: e.target.value },
                      this.handleAspectRatio
                    );
                  }}
                  style={{
                    marginLeft: "5px",
                    fontFamily: "TimesNewRoman",
                    width: "50%",
                  }}
                  placeholder="Height in pixels"
                  value={actualHeight}
                ></input>
                <br />
                <label className="tagline">Width:</label>
                <input
                  type="number"
                  onChange={(e) => {
                    this.setState(
                      { actualWidth: e.target.value },
                      this.handleAspectRatio
                    );
                  }}
                  style={{
                    marginLeft: "10px",
                    fontFamily: "TimesNewRoman",
                    width: "50%",
                  }}
                  placeholder="Width in pixels"
                  value={actualWidth}
                ></input>
                <br />
                <input
                  type="checkbox"
                  onChange={this.handleChecked}
                ></input>{" "}
                <span className="tagline">Lock the aspect ratio</span>
                <br></br>
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginTop: "16px",
                    display: "block",
                    cursor: "Pointer",
                  }}
                  className="Button"
                  onClick={() => {
                    this.setState({ status: false });
                  }}
                >
                  Upload
                </a>
              </div>
            ) : null}
            <label className="tagline" style={{ marginTop: "30px" }}>
              Upload ExcelSheet
            </label>
            <br />
            <input
              id="fileSelect"
              type="file"
              accept=".csv"
              className="fileUpload"
            ></input>
            <br />
            <span className="Notification">{errors["excelSheet"]}</span>
            <br />
            <label className="tagline">Address</label>
            <br />
            <textarea
              rows="10"
              className="addressField"
              placeholder="---------------Optional----------------"
              onChange={(e) => {
                this.setState({ address: e.target.value });
              }}
              value={address}
            ></textarea>
            <br />
            <input type="submit" className="submitButton"></input>
          </form>
        </div>
      </div>
    );
  }
}
