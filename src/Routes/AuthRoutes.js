import React from "react";
import AuthLayout from "./AuthLayout";
import Task1 from "../pages/Task1";
import Task2 from "../pages/Task2";
import TabsWithRoutes from "../pages/TabsWithRoutes";

const AuthRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "/",
      element: <TabsWithRoutes />,
      children: [
        {
          path: "Task1",
          element: <Task1 />,
        },
        {
          path: "Task2",
          element: <Task2 />,
        },
      ],
    },
  ],
};

export default AuthRoutes;
