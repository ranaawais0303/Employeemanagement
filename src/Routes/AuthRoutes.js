import React from "react";
import AuthLayout from "./AuthLayout"; // Assuming correct path
import Task1 from "../pages/Task1"; // Assuming correct path
import Task2 from "../pages/Task2"; // Assuming correct path
import TabsWithRoutes from "../pages/TabsWithRoutes";

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "/", // Default route within AuthLayout for tabs
      element: <TabsWithRoutes />,
      children: [
        {
          path: "Task1", // Route for Task 1 content
          element: <Task1 />,
        },
        {
          path: "Task2", // Route for Task 2 content
          element: <Task2 />,
        },
      ],
    },
  ],
};

export default AuthRoutes;
