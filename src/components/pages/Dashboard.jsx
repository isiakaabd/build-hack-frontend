import React from "react";
import Web3Modal from "web3modal";
import useAuth from "components/context/useAuth";
import { shortAccount } from "components/helpers";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { auth } = useAuth();
  const account = localStorage.getItem("account");
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {},
  });
  //  const web3Modal = new Web3Modal({
  //     network: "rinkeby",
  //     providerOptions: {},
  //     cacheProvider:true,
  //     disableInjectedProvider: false,
  //   });
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location?.state?.from.pathname || "/";
  const logout = async () => {
    web3Modal.clearCachedProvider();
    localStorage.setItem("auth", false);
    localStorage.removeItem("account");
    setTimeout(() => {
      navigate(0);
    }, 5000);
  };

  return (
    <Grid item container>
      {/* <Button variant="secondary" sx={{ background: "red" }} onClick={logout}>
        Logout
      </Button> */}
      <Grid
        item
        container
        sx={{ p: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <h1>
          Welcome {""} {shortAccount(auth.account || account)}
        </h1>
        <Button sx={{ background: "#fff" }} onClick={logout}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
