import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHireRequest } from "../../actions/HiringAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SideBar from "./Sidebar";
import { UPDATE_HIRE_REQUEST_REQUEST } from "../../constants/hiringConstants";
import { useParams } from "react-router-dom";

const UpdateHire = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [updatedStatus, setUpdatedStatus] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", updatedStatus);
    dispatch(updateHireRequest(id, myForm));
    alert.success("Updated Successfully");
    dispatch({ type: UPDATE_HIRE_REQUEST_REQUEST });
  };
  const status = ["Pending", "Processing", "Approved", "Rejected"];
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
            <h1>Update Product</h1>

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

export default UpdateHire;
