import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "components/context";
import { useEtherum } from "components/hooks/useEtherum";
import { useEffect, useState } from "react";
import useAlert from "components/hooks/useAlert";
const PrivateRoute = ({ children }) => {
  let { auth } = useAuth();
  let location = useLocation();
  const { displayAlert } = useAlert();
  const [state, setState] = useState(false);
  const { contract, error, account, loading } = useEtherum();

  console.log(auth);
  const getEmployeeDetails = async () => {
    try {
      if (account) {
        const data = await contract.getEmployeeDetails(account);
        setState(data?.registered);
      }
    } catch (error) {
      displayAlert("error", error);
    }
  };
  useEffect(() => {
    getEmployeeDetails(account);
    //eslint-disable-next-line
  }, [auth]);
  if (auth) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
