import React from "react";
import { Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomTab = ({ label, path }) => {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(path);
  };

  return <Tab label={label} value={path} onClick={handleChange} />;
};

export default CustomTab;
