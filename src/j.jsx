import React, { useEffect, useState, useCallback, Fragment } from "react";
import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import { abi } from "./utils/MyEpicNFT.jsx";
import { ethers } from "ethers";
import moment from "moment";
import { Card } from "./Card.jsx";
import { Card2 } from "./Card2.jsx";
import { BallTriangle } from "react-loader-spinner";
// Constants
const TWITTER_HANDLE = "isiakaabd";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x231851c19101376f922BBaFe224C3a7518dEb883";

const App = () => {
  const [number, setNumber] = useState(0);
  const [x, setX] = useState({});
  console.log(x);
  const [currentAccount, setCurrentAccount] = useState("");
  const [miningState, setMiningState] = useState(false);
  const [num, setNum] = useState(0);
  const [current, setCurrent] = useState(0);
  const [disable, setDisable] = useState(false);
  const [all, setAll] = useState([]);
  const [text, setText] = useState("");
  const { ethereum } = window;

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const checkEtherum = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const connectedContract = await new ethers.Contract(
          CONTRACT_ADDRESS,
          abi,
          signer
        );

        return connectedContract;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContracts = useCallback(async () => {
    try {
      if (checkEtherum()) {
        const connectedContract = await checkEtherum();
        const contracts = await connectedContract.getMints();
        return contracts;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getMinteds = useCallback(async () => {
    try {
      setDisable(true);
      const values = await getAllContracts();
      setAll(values);
      setDisable(false);
    } catch (error) {
      console.error(error);
    }
  }, [getAllContracts]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connected to chain " + chainId);

        // String, hex code of the chainId of the Rinkebey test network
        const rinkebyChainId = "0x4";
        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
        }
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();
        setMiningState(true);

        console.log("Mining...please wait.");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );

        setMiningState(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (checkEtherum()) {
        const connectedContract = await checkEtherum();
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(tokenId);
          alert(
            `Hey there! We've minted your NFT. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: <https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}>`
          );
          setX(tokenId);
          setText(tokenId.toNumber());
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (checkEtherum()) {
        const contracts = await checkEtherum();
        const x = await contracts.getNumberMinted();
        const z = await contracts.maxAccountTobeMinted();
        setNum(z.toNumber());
        setCurrent(x.toNumber());
      }
    })();
  }, [getMinteds, askContractToMintNft]);

  return (
    <div className="App">
      <div className="container">
        {miningState && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: 50, margin: "1.5rem", height: 50 }}>
              <BallTriangle color="#0ead69" name="Mining" />
            </div>
          </div>
        )}
        <div className="header-container">
          <p className="header gradient-text">REMLAD's Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount && (
            <h2 style={{ color: "white" }}>
              {" "}
              {current} /{num} NFTs minted so far
            </h2>
          )}
          {!currentAccount ? (
            <button
              onClick={connectWallet}
              className="cta-button 
                          connect-wallet-button"
            >
              Connect to Wallet
            </button>
          ) : (
            <button
              onClick={askContractToMintNft}
              className="cta-button connect-wallet-button"
            >
              Mint NFT
            </button>
          )}
          {currentAccount && (
            <button
              onClick={getMinteds}
              disabled={disable}
              className="cta-button connect-wallet-button mint-button"
            >
              Get Minted NFTs
            </button>
          )}
          {text && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card2 id={x} />
            </div>
          )}
        </div>

        <div className="container-card">
          <ul className="card-wrapper">
            {all &&
              all.map((i, index) => {
                const date = new Date(i.timestamp._hex * 1000);

                const dateObj = new Date(date);
                const momentObjs = moment(dateObj);
                const momentString = momentObjs.format("LLL");
                return (
                  <Card
                    key={index}
                    headline="ddd"
                    sub={momentString}
                    link="cssssss"
                    linkText={i.sender}
                    id={i.tokenId}
                  />
                );
              })}
          </ul>
        </div>
        <div className="footer-container">
          <Fragment>
            <img
              alt="Twitter Logo"
              className="twitter-logo"
              src={twitterLogo}
            />
            <a
              className="footer-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`built on @${TWITTER_HANDLE}`}</a>
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default App;
