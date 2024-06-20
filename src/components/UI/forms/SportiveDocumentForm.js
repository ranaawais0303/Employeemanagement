// src/components/SportiveDocumentForm.jsx

import React, { useState } from "react";
import { Box, Button, DialogActions, TextField } from "@mui/material";
import CustomButton from "../CustomButton";

const SportiveDocumentForm = ({ onSave, initialData = {}, onCancel }) => {
  const [documentName, setDocumentName] = useState(
    initialData.documentName || ""
  );
  const [issueDate, setIssueDate] = useState(initialData.issueDate || "");
  const [documentFile, setDocumentFile] = useState(
    initialData.documentFile || ""
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDocumentFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave({ documentName, issueDate, documentFile });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Document Name"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
      />
      <TextField
        label="Issue Date"
        type="date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <DialogActions>
        <CustomButton onClick={handleSubmit}>Save</CustomButton>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

export default SportiveDocumentForm;
