import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteHireRequest,
  getAdminHireRequests,
} from "../../actions/HiringAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_HIRE_REQUEST_REQUEST } from "../../constants/hiringConstants";
const HireList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { error, hiringRequests } = useSelector((state) => state.hiring);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.hiring
  );

  // console.log(useSelector((state) => state.hiring.hiringRequests));

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Hiring Request Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_HIRE_REQUEST_REQUEST });
    }
    dispatch(getAdminHireRequests());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteHireRequest(id));
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "username",
      headerName: "Username",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      minWidth: 270,
      flex: 0.3,
    },

    {
      field: "endDate",
      headerName: "End Date",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/hires/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  hiringRequests &&
    hiringRequests.forEach((item) => {
      rows.push({
        id: item._id,
        username: item.username,
        productId: item.productId,
        startDate: item.startDate,
        endDate: item.endDate,
        email: item.email,
        images: item.images,
        status: item.status,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL HIRES - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL HIRES</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HireList;
