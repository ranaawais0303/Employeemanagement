// src/components/DeleteConfirmationDialog.jsx
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SweetAlert = withReactContent(Swal);

const DeleteConfirmationDialog = ({ show, data, onConfirm, onCancel }) => {
  if (show) {
    SweetAlert.fire({
      title: "Are you sure?",
      text: `You are about to delete ${data.personalInfo.name}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(data);
      } else {
        onCancel();
      }
    });
  }

  return null; // This component does not render anything directly
};

export default DeleteConfirmationDialog;
