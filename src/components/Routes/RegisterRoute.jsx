import { useLocation, Navigate } from "react-router-dom";
import { useEtherum } from "components/hooks/useEtherum";

const RegisterRoute = ({ children }) => {
  let location = useLocation();

  const { contract } = useEtherum();

  if (!contract?.address) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default RegisterRoute;
