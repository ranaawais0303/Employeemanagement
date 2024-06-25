// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
} from "@mui/material";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../../reduxStore/employeeSlice";
import SportiveDocumentForm from "./SportiveDocumentForm";

const EmployeeForm = ({ data, onBack }) => {
  console.log(data ? data : "", "data in form");
  const [personalInfo, setPersonalInfo] = useState(
    data ? data?.personalInfo : {}
  );
  const [educationList, setEducationList] = useState(
    data ? data?.educationList : []
  );
  const [experienceList, setExperienceList] = useState(
    data ? data?.experienceList : []
  );
  const [sportiveDocuments, setSportiveDocuments] = useState(
    data ? data?.sportiveDocuments : []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [currentData, setCurrentData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();

  // Load data from localStorage
  useEffect(() => {
    const savedData =
      JSON.parse(localStorage.getItem("employeeFormData")) || {};
    setPersonalInfo(savedData.personalInfo || {});
    setEducationList(savedData.educationList || []);
    setExperienceList(savedData.experienceList || []);
    setSportiveDocuments(savedData.sportiveDocuments || []);

    if (savedData.personalInfo?.image) {
      setImageUrl(savedData.personalInfo.image);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = {
      personalInfo,
      educationList,
      experienceList,
      sportiveDocuments,
    };
    localStorage.setItem("employeeFormData", JSON.stringify(data));
  }, [personalInfo, educationList, experienceList, sportiveDocuments]);

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
    console.log(data, "here is the data for form");
    if (currentSection === "personal") {
      setPersonalInfo(data);
    } else if (currentSection === "education") {
      if (editIndex !== null) {
        setEducationList((prev) =>
          prev?.map((item, index) => (index === editIndex ? data : item))
        );
      } else {
        setEducationList((prev) => [...prev, data]);
      }
    } else if (currentSection === "experience") {
      if (editIndex !== null) {
        setExperienceList((prev) =>
          prev?.map((item, index) => (index === editIndex ? data : item))
        );
      } else {
        setExperienceList((prev) => [...prev, data]);
      }
    } else if (currentSection === "sportive") {
      if (editIndex !== null) {
        setSportiveDocuments((prev) =>
          prev?.map((item, index) => (index === editIndex ? data : item))
        );
      } else {
        setSportiveDocuments((prev) => [...prev, data]);
      }
    }
    handleDialogClose();
  };

  const handleDelete = (section, index) => {
    if (section === "education") {
      setEducationList((prev) => prev.filter((_, i) => i !== index));
    } else if (section === "experience") {
      setExperienceList((prev) => prev.filter((_, i) => i !== index));
    } else if (section === "sportive") {
      setSportiveDocuments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setPersonalInfo((prev) => ({
          ...prev,
          image: base64Image,
        }));
        setImageUrl(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = () => {
    const dataDoc = {
      id: data?.id,
      personalInfo,
      educationList,
      experienceList,
      sportiveDocuments,
    };
    console.log(dataDoc, "data before sending into add employee");
    dispatch(addEmployee(dataDoc));
    onBack();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Employee Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2, borderRight: 1, padding: 2 }}>
            <Typography variant="h6">Personal Info</Typography>
            <Grid container direction="column" alignItems="left">
              <CustomButton
                disabled={data?.readOnly}
                onClick={() => handleDialogOpen("personal", personalInfo)}
              >
                Edit Personal Information
              </CustomButton>
              {personalInfo.name && (
                <Box sx={{ display: "flex", alignItems: "left", marginTop: 1 }}>
                  <img
                    src={imageUrl}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <Typography>{personalInfo.name}</Typography>
                </Box>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "10px" }}
              />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Education</Typography>
            <CustomButton
              disabled={data?.readOnly}
              onClick={() => handleDialogOpen("education")}
            >
              Add Education
            </CustomButton>
            <List>
              {educationList?.map((edu, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={edu.degree}
                    secondary={edu.institute}
                  />
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ marginBottom: 2, padding: 2 }}>
            <Typography variant="h6">Experience</Typography>
            <CustomButton onClick={() => handleDialogOpen("experience")}>
              Add Experience
            </CustomButton>
            <List>
              {experienceList?.map((exp, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={exp.company}
                    secondary={exp.designation}
                  />
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
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Sportive Documents</Typography>
            <CustomButton onClick={() => handleDialogOpen("sportive")}>
              Add Sportive Document
            </CustomButton>
            <List>
              {sportiveDocuments?.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={doc.documentName}
                    secondary={doc.issueDate}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDialogOpen("sportive", doc, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete("sportive", index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent sx={{ minWidth: "500px" }}>
          {currentSection === "personal" && (
            <PersonalInfoForm
              onSave={handleSave}
              initialData={currentData}
              onCancel={handleDialogClose}
            />
          )}
          {currentSection === "education" && (
            <EducationForm
              onSave={handleSave}
              initialData={currentData}
              onCancel={handleDialogClose}
            />
          )}
          {currentSection === "experience" && (
            <ExperienceForm
              onSave={handleSave}
              initialData={currentData}
              onCancel={handleDialogClose}
            />
          )}
          {currentSection === "sportive" && (
            <SportiveDocumentForm
              onSave={handleSave}
              initialData={currentData}
              onCancel={handleDialogClose}
            />
          )}
        </DialogContent>
      </Dialog>

      <CustomButton
        onClick={onSubmitForm}
        sx={{ textAlign: "right", marginTop: 2 }}
      >
        Save Information
      </CustomButton>
    </Box>
  );
};

export default EmployeeForm;
