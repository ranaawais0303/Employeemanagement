import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { loggedIn } = useSelector((store) => store.auth);
  const auth = loggedIn;
  console.log(auth, "logged in");
  const location = useLocation();
  console.log(location, "location");

  //   if ((location.pathname == "/" || location.pathname == "Tabs") && auth) {
  //     return <Navigate to="/Tabs" />;
  //   }

  return <>{auth ? <Outlet /> : <Navigate to="/login" replace={true} />}</>;
};

export default AuthLayout;
