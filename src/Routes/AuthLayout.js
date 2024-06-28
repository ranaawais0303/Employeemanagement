import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { loggedIn } = useSelector((store) => store.auth);
  const auth = loggedIn;

  return <>{auth ? <Outlet /> : <Navigate to="/login" replace={true} />}</>;
};

export default AuthLayout;
