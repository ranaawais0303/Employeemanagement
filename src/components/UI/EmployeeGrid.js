// src/components/EmployeeGrid.jsx
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./EmployeeGrid.css";
import EmployeeForm from "./EmployeeForm";

const EmployeeGrid = () => {
  const [showForm, setShowForm] = useState(false);

  console.log(showForm, "show form");
  const [rowData, setRowData] = useState([
    {
      image: "https://via.placeholder.com/50",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    {
      image: "https://via.placeholder.com/50",
      name: "Jane Smith",
      email: "jane@example.com",
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
      cellRendererFramework: (params) => {
        console.log(params, "here is the params of actions");
        return (
          <div>
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
      cellStyle: { textAlign: "center" },
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
  const form = showForm ? (
    <EmployeeForm />
  ) : (
    <>
      <button className="add-button" onClick={handleAdd}>
        Add
      </button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, minWidth: 150 }}
        />
      </div>
    </>
  );

  return <div className="grid-container">{form}</div>;
};

export default EmployeeGrid;
