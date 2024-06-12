import React from "react";
import { Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const CustomTab = ({ label, path, component }) => {
  console.log("CustomTab - props:", { label, path, component });

  const navigate = useNavigate();
  // const location = useLocation();

  // console.log("CustomTab - location:", location.pathname);

  const handleChange = () => {
    navigate(path);
  };

  return (
    <Tab
      label={label}
      value={path}
      onClick={handleChange}
      // sx={{ display: location.pathname === path ? "block" : "none" }}
    >
      {/* Render the component */}
      {React.cloneElement(component, { key: path })}
    </Tab>
  );
};

export default CustomTab;
