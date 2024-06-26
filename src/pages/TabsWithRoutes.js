import React, { useEffect, useState } from "react";
import { Tabs, Box, AppBar, Toolbar } from "@mui/material";
import Tab from "@mui/material/Tab";
import { Outlet, useNavigate } from "react-router-dom";
import { styles } from "../constants/constant";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch } from "react-redux";
import { logOut } from "../reduxStore/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";

const TabsWithRoutes = () => {
  const [value, setValue] = useState("Task1");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handler for changing the tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    navigate(value);
  }, [value, navigate]);

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar sx={{ backgroundColor: styles.backgroundColor }} component="nav">
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secodary"
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
            sx={{ flexGrow: 1 }}
          >
            <Tab value="Task1" label="Task1" wrapped />
            <Tab value="Task2" label="Task2" />
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <CustomButton
            endIcon={<LogoutIcon />}
            onClick={logoutHandler}
            sx={{ textAlign: "right" }}
          >
            Logout
          </CustomButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingTop: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TabsWithRoutes;
