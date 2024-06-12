import React, { useEffect, useState } from "react";
import { Tabs, Box, AppBar } from "@mui/material";
import Tab from "@mui/material/Tab";
import { Outlet, useNavigate } from "react-router-dom";
import { styles } from "../constants/constant";

const TabsWithRoutes = () => {
  const [value, setValue] = useState("Task1");
  const navigate = useNavigate();

  // Extract the current path to set the selected tab

  // Handler for changing the tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    navigate(value);
  }, []);

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
    <Box
      sx={{
        width: "100%",
        borderWidth: "1px",
        border: "5px",
      }}
    >
      <AppBar sx={{ backgroundColor: styles.backgroundColor }} component="nav">
        <Tabs
          sx={{ width: "100%" }}
          value={value}
          onChange={handleChange}
          textColor="secodary"
          textIndicator="secondary"
          aria-label="wrapped label tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "white",
            },
          }}
        >
          <Tab value="Task1" label="Task1" wrapped />
          <Tab value="Task2" label="Task2" />
        </Tabs>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default TabsWithRoutes;
