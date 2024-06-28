// src/components/SportiveDocumentForm.jsx

import React, { useRef, useState } from "react";
import { Box, Button, DialogActions, Stack, Typography } from "@mui/material";
import CustomButton from "../CustomButton";
import Input from "../Input";
import { styles } from "../../../constants/constant";

const SportiveDocumentForm = ({ onSave, initialData = {}, onCancel }) => {
  const [documentName, setDocumentName] = useState(
    initialData.documentName || ""
  );
  const [issueDate, setIssueDate] = useState(initialData.issueDate || "");
  const [documentFile, setDocumentFile] = useState(
    initialData.documentFile || ""
  );

  const inputRef = useRef(null);

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

  const handleClick = () => {
    inputRef.current.click();
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
      <Stack direction="row">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx"
          style={{ display: "none" }}
          ref={inputRef}
        />
        <CustomButton sx={{ margin: 0 }} onClick={handleClick}>
          Upload File
        </CustomButton>
        <label
          style={{
            margin: "1vh",
            color: styles.textGreen,
            fontFamily: styles.fontFamily,
          }}
        >
          {documentName}
        </label>
      </Stack>

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
