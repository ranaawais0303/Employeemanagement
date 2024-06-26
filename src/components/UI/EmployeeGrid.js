import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./EmployeeGrid.css";
import CustomButton from "./CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from "./forms/EmployeeForm";
import { removeEmployee } from "../../reduxStore/employeeSlice";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import PopupMenu from "../PopupMenu";

const EmployeeGrid = () => {
  const [showForm, setShowForm] = useState(false);
  const [dataForEdit, setDataForEdit] = useState();
  const [deleteData, setDeleteData] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { employeeData } = useSelector((store) => store.employee);
  const [rowData, setRowData] = useState(employeeData);

  const dispatch = useDispatch();

  useEffect(() => {
    setRowData(employeeData);
  }, [employeeData]);

  const handleBack = () => {
    setDataForEdit(null);
    setShowForm(false);
  };

  //For open the add/Edit Form
  const handleAdd = () => {
    setDataForEdit(null);
    setShowForm(true);
  };

  const confirmDelete = (data) => {
    const updatedData = rowData.filter((row) => row !== data);
    setRowData(updatedData);
    dispatch(removeEmployee(data));
    setDeleteData(null);
    setShowDeleteDialog(false);
  };

  const cancelDelete = () => {
    setDeleteData(null);
    setShowDeleteDialog(false);
  };

  // Columns for Grid
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
    },
    { headerName: "Name", field: "personalInfo.name" },
    { headerName: "Email", field: "personalInfo.email" },
    { headerName: "Phone Number", field: "personalInfo.phone" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => {
        return (
          <PopupMenu
            data={params.data}
            setDataForEdit={setDataForEdit}
            setDeleteData={setDeleteData}
            setShowDeleteDialog={setShowDeleteDialog}
            setShowForm={setShowForm}
          />
        );
      },
      cellStyle: { textAlign: "center" },
    },
  ];

  const form = showForm ? (
    <EmployeeForm data={dataForEdit} onBack={handleBack} />
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
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1 }}
        />
      </div>
    </>
  );

  return (
    <div className="grid-container">
      {form}
      {deleteData && (
        <DeleteConfirmationDialog
          show={showDeleteDialog}
          data={deleteData}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EmployeeGrid;
