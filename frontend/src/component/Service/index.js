import React, { useState } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";

import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [regNum, setRegNum] = useState();
  const [date, setDate] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState("/Profile.png");
  const alert = useAlert();
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    if (e.target.name === "images") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("/api/v1/service/", {
      regNum: regNum,
      email: email,
      date: date,
      images: image,
    });
    alert.success("Servicing Submitted! Please wait for it to be approved 🙂");
    navigate("/");
  };
  return (
    <div className="hiring-request">
      <MetaData title="Bike Servicing Registration" />
      <h1 className="hiring-request__heading">Bike Servicing Registration</h1>
      <form onSubmit={submitHandler}>
        <div className="hiring-request__form-control">
          <label htmlFor="regNum">Bike Number</label>
          <input
            type="text"
            id="regNum"
            value={regNum}
            onChange={(e) => setRegNum(e.target.value)}
          />
        </div>
        <div className="hiring-request__form-control">
          <label htmlFor="endDate">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="hiring-request__form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="hiring-request__form-control">
          <label htmlFor="avatar">Bike Image</label>
          <div className="hiring-request__avatar-container">
            <img src={imagePreview} alt="bike-imgage-preview" />;
            <input
              type="file"
              id="avatar"
              name="images"
              onChange={registerDataChange}
            />
          </div>
        </div>
        <button className="hiring-request__submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Service;
