// src/components/ExperienceForm.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, DialogActions } from "@mui/material";

const ExperienceForm = ({ onSave, initialData }) => {
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
    <Box>
      <TextField
        label="Company"
        name="company"
        value={experience.company || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Designation"
        name="designation"
        value={experience.designation || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Start Year"
        name="startYear"
        value={experience.startYear || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="number"
      />
      <TextField
        label="End Year"
        name="endYear"
        value={experience.endYear || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="number"
      />
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ExperienceForm;
