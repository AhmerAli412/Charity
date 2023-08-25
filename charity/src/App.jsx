import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Buy from "./components/Buy";
// import Memos from "./components/Memos";
// import chai from "./chai.png";
import Buy from "./componenets/Buy";
import Memos from "./componenets/Memos"
import chai from "./chai.png"
import Header from "./componenets/Header"
import Hero from "./componenets/Hero"
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x3FFa4b19b74BcF276582410235FBB1c2FC653c9A";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div className="bg-gradient-to-l from-lime-100 to-orange-200">
    <Header/>
    <Hero/>
 
      {/* <img src={chai} className="img-fluid" alt=".." width="100%" height="10%"/> */}
      <p className="mb-8 mt-8 text-lg text-center font-normal text-black lg:text-xl sm:px-16 xl:px-48 dark:text-black">
       Connected Account - {account}
      </p>
      <div className="ml-60 mr-60 mx-auto">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  

  );
}

export default App;