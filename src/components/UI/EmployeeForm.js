// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmployeeGrid from "./EmployeeGrid";

const EmployeeForm = () => {
  console.log("employeeForm is here");
  const [personalInfo, setPersonalInfo] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [currentData, setCurrentData] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedData =
      JSON.parse(localStorage.getItem("employeeFormData")) || {};
    setPersonalInfo(savedData.personalInfo || {});
    setEducationList(savedData.educationList || []);
    setExperienceList(savedData.experienceList || []);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = { personalInfo, educationList, experienceList };
    localStorage.setItem("employeeFormData", JSON.stringify(data));
  }, [personalInfo, educationList, experienceList]);

  const handleDialogOpen = (section, data = {}, index = null) => {
    setCurrentSection(section);
    setCurrentData(data);
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentData({});
    setEditIndex(null);
  };

  const handleSave = (data) => {
    if (currentSection === "personal") {
      setPersonalInfo(data);
    } else if (currentSection === "education") {
      if (editIndex !== null) {
        setEducationList((prev) =>
          prev.map((item, index) => (index === editIndex ? data : item))
        );
      } else {
        setEducationList((prev) => [...prev, data]);
      }
    } else if (currentSection === "experience") {
      if (editIndex !== null) {
        setExperienceList((prev) =>
          prev.map((item, index) => (index === editIndex ? data : item))
        );
      } else {
        setExperienceList((prev) => [...prev, data]);
      }
    }
    handleDialogClose();
  };

  const handleDelete = (section, index) => {
    if (section === "education") {
      setEducationList((prev) => prev.filter((_, i) => i !== index));
    } else if (section === "experience") {
      setExperienceList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Employee Form
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Personal Info</Typography>
        <Button
          variant="outlined"
          onClick={() => handleDialogOpen("personal", personalInfo)}
        >
          Edit
        </Button>
        {personalInfo.name && <Typography>{personalInfo.name}</Typography>}
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Education</Typography>
        <Button
          variant="outlined"
          onClick={() => handleDialogOpen("education")}
        >
          Add Education
        </Button>
        <List>
          {educationList.map((edu, index) => (
            <ListItem key={index}>
              <ListItemText primary={edu.degree} secondary={edu.institute} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDialogOpen("education", edu, index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete("education", index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Experience</Typography>
        <Button
          variant="outlined"
          onClick={() => handleDialogOpen("experience")}
        >
          Add Experience
        </Button>
        <List>
          {experienceList.map((exp, index) => (
            <ListItem key={index}>
              <ListItemText primary={exp.company} secondary={exp.designation} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDialogOpen("experience", exp, index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete("experience", index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          {currentSection === "personal" && (
            <PersonalInfoForm onSave={handleSave} initialData={currentData} />
          )}
          {currentSection === "education" && (
            <EducationForm onSave={handleSave} initialData={currentData} />
          )}
          {currentSection === "experience" && (
            <ExperienceForm onSave={handleSave} initialData={currentData} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeForm;
