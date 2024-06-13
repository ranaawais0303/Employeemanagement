// src/components/ActionCellRenderer.jsx
import React from "react";
import { Button } from "@mui/material";

const ActionCellRenderer = ({ data, onEdit, onDelete }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => onEdit(data)}>
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onDelete(data)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionCellRenderer;
