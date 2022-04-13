import Web3Modal from "web3modal";
import { providers } from "ethers";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "@lottiefiles/lottie-player";
import { Grid } from "@mui/material";
import useAuth from "components/context/useAuth";
import { Cards } from "components/utilities";

const Login = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const location = useLocation();
  const [account, setAccount] = useState();
  const from = location?.state?.from.pathname || "/dashboard";
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
 
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  const useStyles = makeStyles((theme) => ({
    gridContainer: {
      minHeight: "100vh",
      padding: "2rem",
      overflow: "hidden",
    },
  }));

  const classes = useStyles();
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = useCallback(async () => {
    try {
      const x = await getProviderOrSigner();
      const accounts = await x.listAccounts();
      setAccount(accounts[0]);
      setWalletConnected(true);
      setAuth({
        auth: true,
        account: accounts[0],
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  }, [from, navigate, setAuth]);
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        cacheProvider: true,
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected, connectWallet, account, setAuth]);

  return (
    <Grid
      container
      className={classes.gridContainer}
      justifyContent="center"
      alignItems="center"
    >
      <Cards connectWallet={connectWallet} />;
    </Grid>
  );
};
export default Login;
