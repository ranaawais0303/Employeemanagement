import React, { useState, useEffect } from "react";
import { Box, Button, DialogActions } from "@mui/material";
import PopupHeader from "../PopupHeader";
import CustomButton from "../CustomButton";
import Input from "../Input";

const EducationForm = ({ onSave, initialData, onCancel }) => {
  const [education, setEducation] = useState(initialData);
  const [error, setError] = useState({});

  useEffect(() => {
    setEducation(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  const handleError = (input, errorMessage) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validateForm = () => {
    if (!education.degree) {
      handleError("degree", "degree is required");
    }
    if (!education.institute) {
      handleError("institute", " Insitute is required");
    }
    if (!education.startDate) {
      handleError("startDate", "start date Required");
    }
    if (!education.endDate) {
      handleError("endDate", "End Data is required");
    }

    if (
      education.degree &&
      education.institute &&
      education.startDate &&
      education.endDate
    ) {
      setError({});
      return true;
    }
    return false;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(education);
    }
  };

  return (
    <Box>
      <PopupHeader name="Education" onCancel={onCancel} />
      <hr />
      <Input
        label="Degree"
        name="degree"
        placeholder="enter degree"
        value={education.degree || ""}
        error={error.degree}
        required={true}
        onFocus={() => handleError("degree", null)}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />

      <Input
        label="Institute"
        name="institute"
        value={education.institute || ""}
        error={error.institute}
        onFocus={() => handleError("institute", null)}
        onChange={handleChange}
        fullWidth
        margin="dense"
        required={true}
      />

      <Input
        label="Start Date"
        name="startDate"
        value={education.startDate || ""}
        error={error.startDate}
        onFocus={() => handleError("startDate", null)}
        required={true}
        onChange={handleChange}
        fullWidth
        margin="dense"
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      <Input
        label="End Date"
        name="endDate"
        value={education.endDate || ""}
        onChange={handleChange}
        error={error.endDate}
        onFocus={() => handleError("endDate", null)}
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
