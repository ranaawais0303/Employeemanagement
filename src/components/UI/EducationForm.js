// src/components/EducationForm.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, DialogActions } from "@mui/material";
import PopupHeader from "./PopupHeader";
import CustomButton from "./CustomButton";
import Input from "./Input";

const EducationForm = ({ onSave, initialData, onCancel }) => {
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
      <PopupHeader name="Education" onCancel={onCancel} />
      <hr />
      <Input
        label="Degree"
        name="degree"
        value={education.degree || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        required={true}
      />

      <Input
        label="Institute"
        name="institute"
        value={education.institute || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        required={true}
      />
      <Input
        label="Start Date"
        name="startDate"
        value={education.startDate || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
        required={true}
        InputLabelProps={{ shrink: true }}
      />

      <Input
        label="End Date"
        name="endDate"
        value={education.endDate || ""}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
        required={true}
        InputLabelProps={{ shrink: true }}
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

export default EducationForm;
