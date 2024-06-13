// src/components/EducationForm.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, DialogActions } from "@mui/material";

const EducationForm = ({ onSave, initialData }) => {
  const [education, setEducation] = useState(initialData);

  useEffect(() => {
    setEducation(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  const handleSave = () => {
    onSave(education);
  };

  return (
    <Box>
      <TextField
        label="Degree"
        name="degree"
        value={education.degree || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Institute"
        name="institute"
        value={education.institute || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Start Date"
        name="startDate"
        value={education.startDate || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        name="endDate"
        value={education.endDate || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Box>
  );
};

export default EducationForm;
