import React from "react";
import { Tabs, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomTab from "./CustomTab";

const TabsWithRoutes = () => {
  const [value, setValue] = React.useState("Task1");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current path to set the selected tab
  const currentPath = location.pathname;

  // Handler for changing the tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  // return (
  //   <Box sx={{ width: "100%" }}>
  //     <Tabs
  //       value={currentPath}
  //       onChange={handleChange}
  //       aria-label="tabs with custom components"
  //     >
  //       <CustomTab label="Task1" path="/Task1" />
  //       <CustomTab label="Task2" path="/Task2" />
  //       {/* Add more CustomTab components as needed */}
  //     </Tabs>
  //     <Outlet />
  //     {/* Render the component corresponding to the selected tab */}
  //   </Box>
  // );
  return (
    <Box sx={{ marginTop: -5, width: "100%" }}>
      <Tabs
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value="Task1" label="Task1" wrapped />
        <Tab value="Task2" label="Task2" />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default TabsWithRoutes;
