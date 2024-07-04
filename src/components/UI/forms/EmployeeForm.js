// src/components/EmployeeForm.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  isProcessed,
  isRejected,
} from "../../../reduxStore/employeeSlice";
import SportiveDocumentForm from "./SportiveDocumentForm";
import { styles } from "../../../constants/constant";
import OutlinedCard from "../OutlinedCard";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

const titleStyle = {
  color: styles.textColor,
  fontFamily: styles.fontFamily,
};

const EmployeeForm = ({ data, onBack }) => {
  //states
  const [personalInfo, setPersonalInfo] = useState(
    data ? data?.personalInfo : {}
  );
  const [imageName, setImageName] = useState(
    data ? data?.personalInfo.imageName : "No image selected"
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
  const [imageUrl, setImageUrl] = useState(data?.personalInfo?.image);
  const { isAdmin } = useSelector((store) => store.auth);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setPersonalInfo(data ? data?.personalInfo : {});
      setEducationList(data ? data?.educationList : []);
      setExperienceList(data ? data?.experienceList : []);
      setSportiveDocuments(data ? data?.sportiveDocuments : []);
      setImageUrl(data ? data?.personalInfo?.image : "");
      setImageName(data ? data?.personalInfo?.imageName : "");
    }
  }, [data]);

  //it opens the dialog and set the current section according to data
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

  //it add the data to the form according to the selected section
  const handleSave = (data) => {
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

  // delete according to the section data
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
          imageName: file.name,
        }));
        setImageUrl(base64Image);
      };

      setImageName(file.name);
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
    dispatch(addEmployee(dataDoc));
    onBack();
  };

  const onAccept = () => {
    dispatch(isProcessed(data?.id));
    onBack();
  };

  const onReject = () => {
    dispatch(isRejected(data?.id));
    onBack();
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <OutlinedCard>
      <Box>
        <Grid container direction="row">
          <ArrowBackIcon
            onClick={onBack}
            sx={{ color: "#006400", marginTop: "5px" }}
          />
          <Typography
            variant="h5"
            sx={{ color: "#006400", fontWeight: "bold" }}
            gutterBottom
          >
            Employee Form
          </Typography>
        </Grid>
        <hr style={{ color: "#006400", backgroundColor: "#006400" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <OutlinedCard>
              <Box sx={{ marginBottom: 2, padding: 2 }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" sx={titleStyle}>
                    Personal Info
                  </Typography>
                  <CustomButton
                    endIcon={<EditIcon />}
                    disabled={data?.readOnly}
                    onClick={() => handleDialogOpen("personal", personalInfo)}
                  >
                    Edit Personal Information
                  </CustomButton>
                </Grid>
                <Grid container direction="column" alignItems="left">
                  {personalInfo.name && (
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid>
                        <Typography>{personalInfo.name}</Typography>
                        <Typography>{personalInfo.email}</Typography>
                        <Typography>{personalInfo.phone}</Typography>
                      </Grid>
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
                    </Box>
                  )}
                  <Stack
                    direction="row"
                    sx={{ textAlign: "right", justifyContent: "right" }}
                  >
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={inputRef}
                    />
                    <label
                      style={{
                        margin: "1vh",
                        marginTop: "3vh",
                        color: styles.textGreen,
                        fontFamily: styles.fontFamily,
                      }}
                    >
                      {imageName}
                    </label>
                    <CustomButton
                      disabled={data?.readOnly}
                      endIcon={<UploadIcon />}
                      sx={{ margin: 0, marginTop: "2vh" }}
                      onClick={handleClick}
                    >
                      Upload image
                    </CustomButton>
                  </Stack>
                </Grid>
              </Box>
            </OutlinedCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <OutlinedCard>
              <Box sx={{ marginBottom: 2 }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" sx={titleStyle}>
                    Education
                  </Typography>
                  <CustomButton
                    endIcon={<AddIcon />}
                    sx={{ textAlign: "right" }}
                    disabled={data?.readOnly}
                    onClick={() => handleDialogOpen("education")}
                  >
                    Add Education
                  </CustomButton>
                </Grid>
                <List>
                  {educationList?.map((edu, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={edu.degree}
                        secondary={edu.institute}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          disabled={data?.readOnly}
                          edge="end"
                          onClick={() =>
                            handleDialogOpen("education", edu, index)
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          disabled={data?.readOnly}
                          edge="end"
                          onClick={() => handleDelete("education", index)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </OutlinedCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <OutlinedCard>
              <Box sx={{ marginBottom: 2, padding: 2 }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" sx={titleStyle}>
                    Experience
                  </Typography>
                  <CustomButton
                    endIcon={<AddIcon />}
                    disabled={data?.readOnly}
                    sx={{ textAlign: "right" }}
                    onClick={() => handleDialogOpen("experience")}
                  >
                    Add Experience
                  </CustomButton>
                </Grid>
                <List>
                  {experienceList?.map((exp, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={exp.company}
                        secondary={exp.designation}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          disabled={data?.readOnly}
                          edge="end"
                          onClick={() =>
                            handleDialogOpen("experience", exp, index)
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          disabled={data?.readOnly}
                          onClick={() => handleDelete("experience", index)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </OutlinedCard>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <OutlinedCard>
              <Box sx={{ marginBottom: 2 }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" sx={titleStyle}>
                    Sportive Documents
                  </Typography>
                  <CustomButton
                    endIcon={<AddIcon />}
                    disabled={data?.readOnly}
                    sx={{ textAlign: "right" }}
                    onClick={() => handleDialogOpen("sportive")}
                  >
                    Add Sportive Document
                  </CustomButton>
                </Grid>
                <List>
                  {sportiveDocuments?.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={doc.documentName}
                        secondary={doc.issueDate}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          disabled={data?.readOnly}
                          edge="end"
                          onClick={() =>
                            handleDialogOpen("sportive", doc, index)
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          disabled={data?.readOnly}
                          edge="end"
                          onClick={() => handleDelete("sportive", index)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </OutlinedCard>
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
          endIcon={<SaveIcon />}
          onClick={onSubmitForm}
          disabled={
            Object.keys(personalInfo).length === 0 ||
            educationList.length < 1 ||
            experienceList.length < 1 ||
            sportiveDocuments.length < 1 ||
            data?.readOnly ||
            !imageUrl
          }
          sx={{ textAlign: "right", margin: "1vh" }}
        >
          Save Information
        </CustomButton>
        {isAdmin && data?.readOnly && data?.status !== "Is Processed" && (
          <Grid display="flex" justifyContent="right">
            <CustomButton
              endIcon={<NotInterestedIcon />}
              onClick={onReject}
              sx={{ textAlign: "right", margin: "1vh" }}
            >
              Reject
            </CustomButton>
            <CustomButton
              endIcon={<CheckCircleIcon />}
              onClick={onAccept}
              sx={{ textAlign: "right", margin: "1vh" }}
            >
              Accept
            </CustomButton>
          </Grid>
        )}
      </Box>
    </OutlinedCard>
  );
};

export default EmployeeForm;
