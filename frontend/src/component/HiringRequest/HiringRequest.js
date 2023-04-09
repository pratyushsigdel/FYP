import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postHiringRequest } from "../../actions/HiringAction";
import { useLocation } from "react-router-dom";

const OrderForm = () => {
  const location = useLocation();
  const productId = location.state.id;
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Pending");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postHiringRequest(startDate, endDate, email, status, productId));
    // Reset form values after submission
    setStartDate("");
    setEndDate("");
    setEmail("");
    setStatus("Pending");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
