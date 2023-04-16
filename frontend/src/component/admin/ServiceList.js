import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";

const ServiceList = () => {
  const navigate = useNavigate();
  const [allServicing, setAllServicing] = useState();
  useEffect(() => {
    const getAllServicingData = async () => {
      const { data } = await axios.get("/api/v1/service");
      setAllServicing(data.allService);
    };
    getAllServicingData();
  }, []);
  const alert = useAlert();

  const deleteServie = async (serviceId) => {
    await axios.delete(`/api/v1/service/${serviceId}`);
    alert.success("Servicing Sucessfully Deleted!");
    navigate("/admin/dashboard");
  };

  const columns = [
    { field: "id", headerName: "Servicing ID", minWidth: 200, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      minWidth: 270,
      flex: 0.3,
    },

    {
      field: "regNum",
      headerName: "Registration Number",
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
          <>
            <Link to={`/admin/service/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => deleteServie(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  allServicing &&
    allServicing.forEach((item) => {
      rows.push({
        id: item._id,
        regNum: item.regNum,
        date: item.date,
        email: item.email,
        status: item.status,
      });
    });

  return (
    <>
      <MetaData title={`ALL SERCIVING - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Servicing</h1>

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
    </>
  );
};

export default ServiceList;
