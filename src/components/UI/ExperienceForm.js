// src/components/ExperienceForm.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, DialogActions } from "@mui/material";
import PopupHeader from "./PopupHeader";
import CustomButton from "./CustomButton";
import Input from "./Input";

const ExperienceForm = ({ onSave, initialData, onCancel }) => {
  const [experience, setExperience] = useState(initialData);

  useEffect(() => {
    setExperience(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleSave = () => {
    onSave(experience);
  };

  return (
    <Box sx={{ minWidth: "500px" }}>
      <PopupHeader name="Education" onCancel={onCancel} />
      <hr />
      <Input
        label="Company"
        name="company"
        value={experience.company || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <Input
        label="Designation"
        name="designation"
        value={experience.designation || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <Input
        label="Start Year"
        name="startYear"
        value={experience.startYear || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="number"
      />
      <Input
        label="End Year"
        name="endYear"
        value={experience.endYear || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="number"
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
