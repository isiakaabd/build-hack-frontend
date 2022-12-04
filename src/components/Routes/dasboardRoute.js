import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "components/context";
import { useState, useEffect } from "react";
import { useEtherum } from "components/hooks/useEtherum";
const DashboardRoute = ({ children }) => {
  const { contract, account } = useEtherum();
  const [state, setState] = useState(false);
  const { auth } = useAuth();
  const getEmployeeDetails = async () => {
    try {
      const data = await contract.getEmployeeDetails(account);

      if (data) {
        setState(data?.registered);
      } else {
        localStorage.setItem("auth", false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getEmployeeDetails();
    //eslint-disable-next-line
  }, [auth, state]);

  let location = useLocation();
  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default DashboardRoute;
