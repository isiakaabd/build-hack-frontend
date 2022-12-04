import { useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import SideMenu from "components/utilities/SideMenu";
import MainRoutes from "components/Routes/Routes";
import { useAuth } from "components/context";
import Web3Modal from "web3modal";
import { useNavigate } from "react-router-dom";
import useAlert from "components/hooks/useAlert";
import Header from "components/dashboard/Header";
import { useEtherum } from "components/hooks/useEtherum";

const Dash = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { auth } = useAuth();
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {},
  });

  //   const register = async () => {
  //     try {
  //       if (checkEtherum()) {
  //         const connectedContract = await checkEtherum();
  //         console.log(connectedContract);
  //       } else {
  //         console.log("Ethereum object doesn't exist!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //  const web3Modal = new Web3Modal({
  //     network: "rinkeby",
  //     providerOptions: {},
  //     cacheProvider:true,
  //     disableInjectedProvider: false,
  //   });
  // const location = useLocation();
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  // const from = location?.state?.from.pathname || "/";
  const logout = async () => {
    web3Modal.clearCachedProvider();
    localStorage.setItem("auth", false);
    localStorage.removeItem("account");
    setTimeout(() => {
      navigate(0);
    }, 5000);
  };

  //   const checkStatus = async () => {
  //     try {
  //       const connectedContract = await checkEtherum();
  //       console.log(connectedContract);
  //       const data = await connectedContract.showMyRegistrationStatus(account);
  //       if (data === "you don't have access to this, contact admin")
  //         setStatus("Declined");
  //     } catch (error) {
  //       displayAlert("error", error);
  //     }
  //     //50 and rate = 50
  //   };
  const [state, setState] = useState(undefined);
  const { contract, loading, account } = useEtherum();
  const ac2 = "0x774B716ee5176f7f4eE429F62F688e0AC2e6d504";
  const getEmployeeDetails = async () => {
    try {
      if (account && account !== ac2) {
        const data = await contract?.getEmployeeDetails(account);
        setState(data);
      }
    } catch (error) {
      console.error(error);
      displayAlert("error", error.message);
    }
  };
  useEffect(() => {
    // checkStatus();
    if (account !== ac2) {
      getEmployeeDetails();
    }
    //eslint-disable-next-line
  }, [auth, contract]);

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const drawerWidth = 200;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  if (loading) return <h2>Loading...</h2>;
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { md: "280px" }, flexShrink: { md: 0 } }}
        aria-label="sidebar_menu"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          elevation={0}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <SideMenu
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          elevation={0}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideMenu drawerWidth={drawerWidth} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          width: { xs: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Header
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          logout={logout}
          state={state}
        />
        <MainRoutes state={state} />
      </Box>
      {/* </ScrollToView> */}
    </Box>
  );
};

export default Dash;
