// src/components/EmployeeGrid.jsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./EmployeeGrid.css";
import EmployeeForm from "./EmployeeForm";
import CustomButton from "./CustomButton";
import AddIcon from "@mui/icons-material/Add";

const EmployeeGrid = () => {
  const [showForm, setShowForm] = useState(false);

  console.log(showForm, "show form");
  const [rowData, setRowData] = useState([
    {
      image: "https://via.placeholder.com/50",
      name: "Rana Awais",
      email: "rana@example.com",
      phone: "123-456-7890",
    },
    {
      image: "https://via.placeholder.com/50",
      name: "awais ",
      email: "awais@example.com",
      phone: "098-765-4321",
    },
  ]);

  const columnDefs = [
    {
      headerName: "Image",
      field: "image",
      cellRenderer: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
      cellStyle: { textAlign: "center" },
    },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone Number", field: "phone" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => {
        console.log(params, "here is the params of actions");
        return (
          <div style={{ width: "200px", height: "30px", borderRadius: "50%" }}>
            <button
              className="action-button"
              onClick={() => handleEdit(params.data)}
            >
              Edit
            </button>
            <button
              className="action-button"
              onClick={() => handleDelete(params.data)}
            >
              Delete
            </button>
            <button
              className="action-button"
              onClick={() => handleSubmit(params.data)}
            >
              Submit for Review
            </button>
          </div>
        );
      },
      cellStyle: { textAlign: "center", justifyContent: "" },
    },
  ];

  const handleAdd = () => {
    setShowForm(true);
    // const newRow = {
    //   image: "https://via.placeholder.com/50",
    //   name: "New User",
    //   email: "newuser@example.com",
    //   phone: "111-222-3333",
    // };
    // setRowData([...rowData, newRow]);
  };

  const handleEdit = (data) => {
    alert(`Edit: ${data.name}`);
    // Add your edit logic here
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
    <EmployeeForm />
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
