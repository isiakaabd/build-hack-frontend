import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "components/context";

const PrivateRoute = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
