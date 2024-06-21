// src/components/EmployeeGrid.jsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./EmployeeGrid.css";
import CustomButton from "./CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import EmployeeForm from "./forms/EmployeeForm";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const EmployeeGrid = () => {
  const [showForm, setShowForm] = useState(false);
  const [dataForEdit, setDataForEdit] = useState();
  const { employeeData } = useSelector((store) => store.employee);
  // const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(showForm, "show form");
  const [rowData, setRowData] = useState(employeeData);

  const columnDefs = [
    {
      headerName: "Image",
      field: "personalInfo.image",
      cellRenderer: (params) => (
        <img
          src={params.value || "https://via.placeholder.com/50"}
          alt="Profile"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
      cellStyle: { textAlign: "center" },
    },
    { headerName: "Name", field: "personalInfo.name" },
    { headerName: "Email", field: "personalInfo.email" },
    { headerName: "Phone Number", field: "personalInfo.phone" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertOutlinedIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
            style={{ top: "90px" }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.09))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem onClick={() => handleEdit(params.data)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(params.data)}>
              Delete
            </MenuItem>
            <MenuItem onClick={() => handleSubmit(params.data)}>
              Submit for Review
            </MenuItem>
          </Menu>
        </>
      ),
      cellStyle: { textAlign: "center" },
    },
  ];

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleEdit = (data) => {
    console.log(data);
    setDataForEdit(data);
    setShowForm(true);
  };

  const handleDelete = (data) => {
    const updatedData = rowData.filter((row) => row !== data);
    setRowData(updatedData);
  };

  const handleSubmit = (data) => {
    alert(`Submit for Review: ${data.name}`);
    // Add your submit for review logic here
  };

  // const autoSizeStrategy = {
  //   type: "fitGridWidth",
  //   defaultMinWidth: 100,
  //   columnLimits: [
  //     {
  //       colId: "country",
  //       minWidth: 900,
  //     },
  //   ],
  // };
  const form = showForm ? (
    <EmployeeForm data={dataForEdit} />
  ) : (
    <>
      <CustomButton
        sx={{ textAlign: "right", marginBottom: "1vh" }}
        onClick={handleAdd}
        endIcon={<AddIcon />}
      >
        Add
      </CustomButton>
      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
        }}
      >
        <AgGridReact
          // autoSizeStrategy={autoSizeStrategy}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1 }}
        />
      </div>
    </>
  );

  return <div className="grid-container">{form}</div>;
};

export default EmployeeGrid;
