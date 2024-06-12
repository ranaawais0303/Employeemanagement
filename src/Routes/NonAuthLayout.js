import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const NonAuthLayout = () => {
  const { loggedin } = useSelector((store) => store.auth);
  console.log(loggedin, "here is the logged in user");

  return (
    <>{loggedin ? <Navigate to={"/Task1"} replace={true} /> : <Outlet />}</>
  );
};

export default NonAuthLayout;
