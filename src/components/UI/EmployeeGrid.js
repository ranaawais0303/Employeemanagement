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

const EmployeeGrid = () => {
  const [showForm, setShowForm] = useState(false);
  const [dataForEdit, setDataForEdit] = useState();
  const { employeeData } = useSelector((store) => store.employee);

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
        <div style={{ display: "flex", justifyContent: "space-around" }}>
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
