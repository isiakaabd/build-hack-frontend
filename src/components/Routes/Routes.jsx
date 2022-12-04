import { Home, Withdraw } from "components/dashboard";

import { Routes, Route } from "react-router-dom";
import AddInvoice from "components/dashboard/AddInvoice";
import Deposit from "components/dashboard/Deposit";
import Employees from "components/dashboard/Employees";

const MainRoutes = (props) => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home props={props} />} />
      <Route path="/add" element={<AddInvoice props={props} />} />
      <Route path="/withdraw" element={<Withdraw props={props} />} />
      <Route path="/deposit" element={<Deposit props={props} />} />
      <Route path="/employees" element={<Employees props={props} />} />
    </Routes>
    // </BrowserRouter>
    // <Switch>
    //   {/*  =====  DASHBORD ROUTES STARTS HERE ===== */}
    //   <DashboardRoute path={"/dashboard/home"} exact component={Home} />
    // </Switch>
  );
  // }
};

export default MainRoutes;
