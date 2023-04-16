import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateService = () => {
  const status = ["Pending", "Approved", "Rejected"];
  const [updatedStatus, setUpdatedStatus] = useState();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.post(`/api/v1/service/${id}`, { status: updatedStatus });
    alert.success("Service Updated Sucessfully!");
    navigate("/admin/service");
  };
  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1>Update Service Status</h1>

            <div>
              <AccountTreeIcon />
              <select
                // value={category}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value="">Update Status</option>
                {status.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <Button id="createProductBtn" type="submit">
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
