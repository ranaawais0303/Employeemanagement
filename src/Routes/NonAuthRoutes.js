import NonAuthLayout from "./NonAuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";

const NonAuthRoutes = {
  path: "/",
  element: <NonAuthLayout />,
  children: [
    {
      path: "login",
      element: <LoginForm />,
    },
    {
      path: "signup",
      element: <SignupForm />,
    },

    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />,
    // },
    // {
    //   path: "/validate-token/:queryString",
    //   element: <ValidateToken />,
    // },
  ],
};
export default NonAuthRoutes;
