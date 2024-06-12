import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import NonAuthRoutes from "./NonAuthRoutes";

const Routing = () => {
  const route = useRoutes([AuthRoutes, NonAuthRoutes]);

  return <>{route}</>;
};

export default Routing;
