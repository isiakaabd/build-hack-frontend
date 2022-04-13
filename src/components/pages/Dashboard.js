import React from "react";
// import Web3Modal from "web3modal";
import useAuth from "components/context/useAuth";
import { shortAccount } from "components/helpers";
const Dashboard = () => {
  const {  auth } = useAuth();
  // const web3Modal = new Web3Modal({
  //   cacheProvider: true,
  //   providerOptions: {},
  // });
//  const web3Modal = new Web3Modal({
//     network: "rinkeby",
//     providerOptions: {},
//     cacheProvider:true,
//     disableInjectedProvider: false,
//   });

  // const logout = async () => {
  //   console.log(web3Modal.clearCachedProvider());
  //    web3Modal.clearCachedProvider();
  //   setAuth({
  //     auth: false,
  //     account: null,
  //   });
  // };

  return (
    <>
      {/* <Button variant="secondary" sx={{ background: "red" }} onClick={logout}>
        Logout
      </Button> */}
      <h1>{shortAccount(auth.account)}</h1>
    </>
  );
};
export default Dashboard;
