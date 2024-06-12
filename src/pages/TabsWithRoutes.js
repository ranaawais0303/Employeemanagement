// import React from "react";
// import { Tabs, Tab, Box } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import Task1 from "./Task1";
// import Task2 from "./Task2";

// const TabsWithRoutes = () => {
//   // const tabData = [
//   //   { path: "/Task1", label: "Task 1", content: <Task1 /> },
//   //   { path: "/Task2", label: "Task 2", content: <Task2 /> },
//   //   // ...
//   // ];
//   const tabPaths = ["/task1", "/task2"];

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleChange = (event, newValue) => {
//     navigate(newValue);
//   };

//   return (
//     <Box>
//       <Tabs
//         value={location.pathname}
//         onChange={handleChange}
//         sx={{ backgroundColor: "green" }}
//       >
//         {tabData.map((tab) => (
//           <Tab key={tab.path} label={tab.label} value={tab.path} />
//         ))}

//         {/* <Tab label="Task 1" value="/Task1" />
//       <Tab label="Task 2" value="/Task2" /> */}
//       </Tabs>
//     </Box>
//   );
// };

// export default TabsWithRoutes;

import React from "react";
import { Tabs, Box } from "@mui/material";
import CustomTab from "./CustomTab";
import Task1 from "./Task1";
import Task2 from "./Task2";

const TabsWithRoutes = () => {
  console.log("my component");
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs aria-label="tabs with custom components">
        <CustomTab label="Task 1" path="/Task1" component={<Task1 />} />
        <CustomTab label="Task 2" path="/Task2" component={<Task2 />} />
        {/* Add more CustomTab components as needed */}
      </Tabs>
    </Box>
  );
};

export default TabsWithRoutes;
