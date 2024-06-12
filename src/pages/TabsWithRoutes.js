import React from "react";
import { Tabs, Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomTab from "./CustomTab";

const TabsWithRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current path to set the selected tab
  const currentPath = location.pathname;

  // Handler for changing the tab
  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={currentPath}
        onChange={handleChange}
        aria-label="tabs with custom components"
      >
        <CustomTab label="Task1" path="/Task1" />
        <CustomTab label="Task2" path="/Task2" />
        {/* Add more CustomTab components as needed */}
      </Tabs>
      <Outlet />
      {/* Render the component corresponding to the selected tab */}
    </Box>
  );
};

export default TabsWithRoutes;
