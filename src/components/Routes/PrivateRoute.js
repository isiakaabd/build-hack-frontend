import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "components/context";
const PrivateRoute = ({ children }) => {
  let { auth } = useAuth();
  let location = useLocation();
  // const { displayAlert } = useAlert();

  // const { contract, account,  } = useEtherum();

  // const getEmployeeDetails = async () => {
  //   try {
  //     if (account) {
  //       const data = await contract.getEmployeeDetails(account);
  //     }
  //   } catch (error) {
  //     displayAlert("error", error);
  //   }
  // };
  // useEffect(() => {
  //   getEmployeeDetails(account);
  //   //eslint-disable-next-line
  // }, [auth]);
  if (auth) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
