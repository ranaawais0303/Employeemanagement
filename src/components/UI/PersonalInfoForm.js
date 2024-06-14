import React, { useState, useEffect } from "react";
import { Box, Button, TextField, DialogActions } from "@mui/material";
import PopupHeader from "./PopupHeader";
import Input from "./Input";
import CustomButton from "./CustomButton";

const PersonalInfoForm = ({ onSave, initialData, onCancel }) => {
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
      <PopupHeader name="Personal Information" onCancel={onCancel} />
      <hr />
      <Input
        label="Name"
        name="name"
        value={personalInfo.name || ""}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        value={personalInfo.email || ""}
        onChange={handleChange}
        style={{ margin: "0px" }}
      />
      <Input
        label="Phone"
        name="phone"
        value={personalInfo.phone || ""}
        onChange={handleChange}
      />
      {/* Implement image upload if needed */}
      <DialogActions>
        <CustomButton onClick={handleSave}>Save</CustomButton>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

export default PersonalInfoForm;
