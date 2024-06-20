import React, { useState, useEffect } from "react";
import { Box, Button, DialogActions } from "@mui/material";
import PopupHeader from "../PopupHeader";
import Input from "../Input";
import CustomButton from "../CustomButton";
import { validateEmail } from "../../../utils";

const PersonalInfoForm = ({ onSave, initialData, onCancel }) => {
  const [personalInfo, setPersonalInfo] = useState(initialData);
  const [error, setError] = useState({});

  useEffect(() => {
    setPersonalInfo(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleError = (input, errorMessage) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validateForm = () => {
    if (!personalInfo.email) {
      handleError("email", "Email is required");
    }
    const validemail = validateEmail(personalInfo.email);
    if (!validemail) {
      handleError("email", "Invalid email format");
    }
    if (!personalInfo.name) {
      handleError("name", "Required name");
    }
    if (!personalInfo.phone) {
      handleError("phone", "Phone number is required");
    }
    if (personalInfo.phone.length < 11) {
      handleError("phone", "Password must be at least 11 characters");
    }
    if (
      personalInfo.name &&
      personalInfo.email &&
      personalInfo.phone &&
      personalInfo.phone.length > 10 &&
      validemail
    ) {
      setError({});
      return true;
    }
    return false;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(personalInfo);
    }
  };

  return (
    <Box>
      <PopupHeader name="Personal Information" onCancel={onCancel} />
      <hr />
      <Input
        label="Name"
        name="name"
        placeholder="enter name"
        value={personalInfo.name || ""}
        required={true}
        error={error.name}
        onFocus={() => handleError("name", null)}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        placeholder="Enter email address"
        value={personalInfo.email || ""}
        error={error.email}
        required={true}
        onFocus={() => handleError("email", null)}
        onChange={handleChange}
        style={{ margin: "0px" }}
      />
      <Input
        label="Phone"
        name="phone"
        placeholder="Enter phone number"
        required={true}
        value={personalInfo.phone || ""}
        error={error.phone}
        onFocus={() => handleError("phone", null)}
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
