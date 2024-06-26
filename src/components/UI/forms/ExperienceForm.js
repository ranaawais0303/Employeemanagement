// src/components/ExperienceForm.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, DialogActions } from "@mui/material";
import PopupHeader from "../PopupHeader";
import CustomButton from "../CustomButton";
import Input from "../Input";

const ExperienceForm = ({ onSave, initialData, onCancel }) => {
  const [experience, setExperience] = useState(initialData);
  const [error, setError] = useState({});

  useEffect(() => {
    setExperience(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleError = (input, errorMessage) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validateForm = () => {
    if (!experience.company) {
      handleError("company", "Company is required");
    }
    if (!experience.designation) {
      handleError("designation", " Designation is required");
    }
    if (!experience.startYear) {
      handleError("startYear", "Start Date is Required");
    }

    if (!experience.endYear) {
      handleError("endYear", "End Date is required");
    }

    if (
      experience.company &&
      experience.designation &&
      experience.startYear &&
      experience.endYear
    ) {
      setError({});
      return true;
    }
    return false;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(experience);
    }
  };

  return (
    <Box sx={{ minWidth: "500px" }}>
      <PopupHeader name="experience" onCancel={onCancel} />
      <hr />
      <Input
        label="Company"
        name="company"
        placeholder="enter company name"
        value={experience.company || ""}
        error={error.company}
        required={true}
        onFocus={() => handleError("company", null)}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <Input
        label="Designation"
        name="designation"
        value={experience.designation || ""}
        error={error.designation}
        required={true}
        onFocus={() => handleError("designation", null)}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <Input
        label="Start Date"
        name="startYear"
        value={experience.startYear || ""}
        error={error.startYear}
        required={true}
        onFocus={() => handleError("startYear", null)}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
      />
      <Input
        label="End Date"
        name="endYear"
        value={experience.endYear || ""}
        error={error.endYear}
        required={true}
        onFocus={() => handleError("endYear", null)}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
      />
      <DialogActions>
        <CustomButton onClick={handleSave}>Save</CustomButton>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ExperienceForm;
