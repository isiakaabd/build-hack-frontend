import Web3Modal from "web3modal";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "@lottiefiles/lottie-player";
import { Avatar, Grid, Typography } from "@mui/material";
import useAuth from "components/context/useAuth";
import Navbar from "./Navbar";
import one from "images/one.jpg";
import useAlert from "components/hooks/useAlert";
import { useEtherum } from "components/hooks/useEtherum";

const LandingPage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  // const location = useLocation();
  // const from = location?.state?.from.pathname || "/dashboard";
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const { setAuth, auth } = useAuth();

  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  const useStyles = makeStyles((theme) => ({
    gridContainer: {
      minHeight: "100vh",
      // padding: "2rem",
      overflow: "hidden",
    },
  }));
  const { displayAlert } = useAlert();
  const classes = useStyles();
  const { contract, account } = useEtherum();

  // useEffect(() => {
  //   // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  //   if (!walletConnected) {
  //     // Assign the Web3Modal class to the reference object by setting it's `current` value
  //     // The `current` value is persisted throughout as long as this page is open
  //     web3ModalRef.current = new Web3Modal({
  //       network: "rinkeby",
  //       providerOptions: {},
  //       disableInjectedProvider: false,
  //     });
  //   }
  //   connectWallet();
  // }, []);
  // const getProviderOrSigner = async (needSigner = false) => {
  //   web3ModalRef.current = new Web3Modal({
  //     network: "rinkeby",
  //     providerOptions: {},
  //     disableInjectedProvider: false,
  //   });
  //   const provider = await web3ModalRef.current.connect();
  //   const web3Provider = new providers.Web3Provider(provider);
  //   const { chainId } = await web3Provider.getNetwork();
  //   if (chainId !== 80001) {
  //     //change it to 4
  //     displayAlert("error", "Change the network to Mumbai");
  //     throw new Error("Change network to Mumbai");
  //   }

  //   if (needSigner) {
  //     const signer = web3Provider.getSigner();
  //     return signer;
  //   }
  //   return web3Provider;
  // };

  const connectWallet =
    //useCallback(
    async () => {
      try {
        setWalletConnected(true);
        localStorage.setItem("auth", true);
        // localStorage.setItem("account", accounts[0]);
        // setAuth({
        //   auth: true,
        //   account: accounts[0],
        // });
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          cacheProvider: true,
          disableInjectedProvider: false,
        });
        // displayAlert("success", "Wallet connected successfully");
        // navigate(from, { replace: true });
      } catch (err) {
        displayAlert("error", err);
        localStorage.setItem("auth", false);
        localStorage.removeItem("account");
        console.error(err);
      }
    };

  // const getEmployeeDetails = async () => {
  //   let resgiter = false;
  //   try {
  //     if (contract) {
  //       const data = await contract.getEmployeeDetails(account);

  //       resgiter = data?.registered;
  //     }
  //   } catch (error) {
  //     displayAlert("error", error.message);
  //   }
  //   return resgiter;
  // };
  // useEffect(() => {
  //   // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  //   if (!walletConnected) {
  //     web3ModalRef.current = new Web3Modal({
  //       network: "rinkeby",
  //       providerOptions: {},
  //       cacheProvider: true,
  //       disableInjectedProvider: false,
  //     });
  //     localStorage.setItem("auth", false);
  //     // connectWallet();
  //   }
  // }, [walletConnected, account, setAuth]);

  useEffect(() => {
    if (walletConnected) {
      // setAuth(getEmployeeDetails());
      displayAlert("success", "Wallet successful connected");
      setAuth(true);
    }
    // else {
    //   web3ModalRef.current = new Web3Modal({
    //     network: "rinkeby",
    //     providerOptions: {},
    //     cacheProvider: true,
    //     disableInjectedProvider: false,
    //   });
    //   localStorage.setItem("auth", false);
    //   // connectWallet();
    // }
    //eslint-disable-next-line
  }, [contract, auth, walletConnected]);

  return (
    <Grid
      container
      className={classes.gridContainer}
      justifyContent="center"
      // alignItems="center"
    >
      <Navbar
        handleConnect={connectWallet}
        contract={contract}
        account={account}
      />
      {/* <Cards connectWallet={connectWallet} />; */}
      <Grid
        item
        container
        gap={2}
        flexWrap="nowrap"
        sx={{ height: "calc(100vh - 80px)" }}
      >
        <Grid item xs={6}>
          <Avatar
            src={one}
            variant="square"
            sx={{ br: 0, width: "100%", height: "100%" }}
          />
        </Grid>

        <Grid item xs={6} sx={{ p: 2 }}>
          <Grid container alignItems="center" sx={{ height: "100%" }}>
            <Typography variant="h4" sx={{ color: "#fff" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              ullam nostrum sed explicabo ipsa sequi est deleniti iusto
              reprehenderit quaerat!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LandingPage;
