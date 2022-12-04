import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "abi";
import useAlert from "./useAlert";
const CONTRACT_ADDRESS = "0xEF1ea81Bc1F49fD73F359DBfB59164bF461c622d";

const { ethereum } = window;

export const useEtherum = () => {
  const [contract, setState] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const { displayAlert } = useAlert();
  useEffect(() => {
    const fecthData = async () => {
      try {
        if (ethereum) {
          setLoading(true);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = await provider.getSigner();
          let httpProvider = new ethers.providers.JsonRpcProvider();

          let accounts = await provider.send("eth_requestAccounts", []);
          const account = accounts[0];
          setAccount(account);
          const { chainId } = await provider.getNetwork();
          if (chainId !== 80001) {
            //change it to 4
            displayAlert("error", "Change the network to Mumbai");
            throw new Error("Change network to Mumbai");
          }
          const connectedContract = await new ethers.Contract(
            CONTRACT_ADDRESS,
            abi,
            signer
          );
          setState(connectedContract);
          setLoading(false);
          setError(null);
          return connectedContract;
        } else {
          displayAlert("error", "Ethereum object doesn't exist!");
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };
    fecthData();
  }, []);
  return { loading, error, contract, account };
};
