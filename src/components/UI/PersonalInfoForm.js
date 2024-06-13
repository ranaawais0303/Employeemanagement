// src/components/PersonalInfoForm.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, DialogActions } from "@mui/material";

const PersonalInfoForm = ({ onSave, initialData }) => {
  const [personalInfo, setPersonalInfo] = useState(initialData);

  useEffect(() => {
    setPersonalInfo(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleSave = () => {
    onSave(personalInfo);
  };

  return (
    <Box>
      <TextField
        label="Name"
        name="name"
        value={personalInfo.name || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Email"
        name="email"
        value={personalInfo.email || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Phone"
        name="phone"
        value={personalInfo.phone || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      {/* Implement image upload if needed */}
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Box>
  );
};

export default PersonalInfoForm;
