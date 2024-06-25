// src/components/EmployeeGrid.jsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./EmployeeGrid.css";
import CustomButton from "./CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from "./forms/EmployeeForm";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import MenuButtons from "./MenuButtons";
import { addReadOnly, removeEmployee } from "../../reduxStore/employeeSlice";

const EmployeeGrid = () => {
  const [showForm, setShowForm] = useState(false);
  const [dataForEdit, setDataForEdit] = useState();
  const { employeeData } = useSelector((store) => store.employee);
  const [selectedRowData, setSelectedRowData] = useState(null);

  console.log(employeeData, "here is the employee data");
  // const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(data);
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
      cellRenderer: (params) => {
        return (
          <>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, params.data)}
            >
              <MoreVertOutlinedIcon />
            </IconButton>
            {selectedRowData?.id === params.data.id && (
              <MenuButtons
                menuAnchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                data={selectedRowData}
                onEdit={() => handleEdit(selectedRowData)}
                onDelete={() => handleDelete(selectedRowData)}
                onSubmit={() => handleSubmit(selectedRowData)}
              />
            )}
          </>
        );
      },
      cellStyle: { textAlign: "center" },
    },
  ];

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleEdit = (data) => {
    setDataForEdit(data);
    setShowForm(true);
  };
  const handleBack = (data) => {
    setDataForEdit(data);
    setShowForm(false);
  };

  const handleDelete = (data) => {
    const updatedData = rowData.filter((row) => row !== data);

    dispatch(removeEmployee(data));

    setRowData(updatedData);
    handleClose();
  };

  const handleSubmit = (data) => {
    dispatch(addReadOnly(data));
    handleClose();
    // Add your submit for review logic here
  };

  const form = showForm ? (
    <EmployeeForm data={dataForEdit} onBack={() => handleBack()} />
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
