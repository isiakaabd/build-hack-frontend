import { providers } from "ethers";
import { useRef, useState } from "react";

export const shortAccount = (account) => {
    if(account) return account.slice(0, 5) + "..." + account.slice(-5);
};

export const useWeb3 = async () => {
  const [state, setState] = useState();
  const web3ModalRef = useRef();
  console.log(web3ModalRef);
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);
  setState(web3Provider);
  return state;
};
