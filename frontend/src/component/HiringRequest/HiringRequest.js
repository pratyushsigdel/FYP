// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   ALL_HIRE_REQUEST,
//   getAllHireRequests,
//   posthiringrequest,
// } from "../../actions/HiringAction";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
// import "./HiringRequest.css";
// const HiringRequest = () => {
//   const location = useLocation();
//   const { id } = location.state;
//   const alert = useAlert();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [avatar, setAvatar] = useState();
//   const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

//   const registerDataChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar(reader.result);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       // setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const myForm = new FormData();

//     myForm.set("email", email);
//     myForm.set("startDate", startDate);
//     myForm.set("endDate", endDate);
//     myForm.set("status ", status);
//     myForm.set("avatar", avatar);
//     console.log(myForm);
//     dispatch(posthiringrequest(id, startDate, endDate, avatar, status, email));
//     // Reset form values after submission
//     setStartDate("");
//     setEndDate("");
//     setEmail("");
//     setStatus("Pending");
//     alert.show("Form submitted successfully");
//     navigate(-2);
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <h1>Hire Bike Module Registration</h1>
//       <div>
//         <label htmlFor="startDate">Start Date</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="endDate">End Date</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <label htmlFor="NationalID"> NationalID</label>
//       <div id="registerImage">
//         <img src={avatarPreview} alt="Avatar Preview" />
//         <input
//           type="file"
//           name="avatar"
//           accept="image/*"
//           onChange={registerDataChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default HiringRequest;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { posthiringrequest } from "../../actions/HiringAction";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import "./HiringRequest.css";

const HiringRequest = () => {
  const location = useLocation();
  const { id } = location.state;
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Pending");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("startDate", startDate);
    myForm.set("endDate", endDate);
    myForm.set("status ", status);
    myForm.set("avatar", avatar);

    try {
      await dispatch(
        posthiringrequest(id, startDate, endDate, avatar, status, email)
      );
      // Reset form values after submission
      setStartDate("");
      setEndDate("");
      setEmail("");
      setStatus("Pending");
      alert.show("Form submitted successfully");
      navigate(-2);
    } catch (err) {
      setError(err.response.data.message);
    }

    setLoading(false);
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [alert, error]);

  return (
    <div className="hiring-request">
      <MetaData title="Hire Bike Module Registration" />
      <h1 className="hiring-request__heading">Hire Bike Module Registration</h1>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={submitHandler}>
          <div className="hiring-request__form-control">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="hiring-request__form-control">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              {/* <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option> */}
            </select>
          </div>
          <div className="hiring-request__form-control">
            <label htmlFor="avatar">National ID</label>
            <div className="hiring-request__avatar-container">
              <img src={avatarPreview} alt="avatar-preview" />
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={registerDataChange}
              />
            </div>
          </div>
          <button className="hiring-request__submit-btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default HiringRequest;
