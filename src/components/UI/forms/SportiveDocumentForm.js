// src/components/SportiveDocumentForm.jsx

import React, { useState } from "react";
import { Box, Button, DialogActions, Typography } from "@mui/material";
import CustomButton from "../CustomButton";
import Input from "../Input";

const SportiveDocumentForm = ({ onSave, initialData = {}, onCancel }) => {
  const [documentName, setDocumentName] = useState(
    initialData.documentName || ""
  );
  const [issueDate, setIssueDate] = useState(initialData.issueDate || "");
  const [documentFile, setDocumentFile] = useState(
    initialData.documentFile || ""
  );

  const [error, setError] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDocumentFile(reader.result);
        setDocumentName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleError = (input, errorMessage) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validateForm = () => {
    if (!documentName) {
      handleError("documentName", "documentName is required");
    }
    if (!issueDate) {
      handleError("issueDate", " issueDate is required");
    }
    if (!documentFile) {
      handleError("documentFile", "documentFile Required");
    }

    if (documentName && issueDate && documentFile) {
      setError({});
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ documentName, issueDate, documentFile });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Input
        label="Document Name"
        placeholder="enter document name"
        value={documentName || ""}
        error={error.documentName}
        required={true}
        onFocus={() => handleError("documentName", null)}
        onChange={(e) => setDocumentName(e.target.value)}
      />
      <Input
        label="Issue Date"
        name="issueDate"
        type="date"
        value={issueDate}
        error={error.issueDate}
        onFocus={() => handleError("issueDate", null)}
        required={true}
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
