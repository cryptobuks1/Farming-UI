import { ethers, Contract } from "ethers";
import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Helloabi from "./contracts/Hello.json";
import Web3 from "web3";
import Navbar from "./Navbar";
import Farmabi from "./contracts/Farm01.json";
import swal from "sweetalert";
import { HomePage } from "./FarmingUI/components/HomePage.js";
import lptokenabi from "./contracts/lptoken.json";
// import erc20abi from './contracts/SafeERC20.json';
import tokenabi from "./contracts/token.json";
const App = () => {
  const [refresh, setrefresh] = useState(0);
  const [getNetwork, setNetwork] = useState("");

  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});
  const [SIGNER, SETSIGNER] = useState({});
  const [flag, setflag] = useState(0);
  const [farmcontract, setfarmcontract] = useState({});
  const [farmcontractinfo, setfarmcontractinfo] = useState({
    farmuserinfoamount: 0,
    farmuserinforewarddebt: 0,
    farmpendingrewards: 0,
  });
  const [tokencontract, settokencontract] = useState({});
  const [lptokenaddress, setlptokenaddress] = useState("");
  const [farmcontractaddress, setfarmcontractaddress] = useState("");

  // const provider = await detectEthereumProvider();
  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (typeof window.ethereum == "undefined") {
      return;
    }

    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    SETSIGNER(signer);

    let url = window.location.href;
    console.log(url);

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    if (accounts.length == 0) {
      return;
    }

    setAccount(accounts[0]);

    var networkId;
    await provider.getNetwork().then((result) => {
      networkId = result.chainId;
    });
    if (networkId == 1) {
      // const addressoflptoken = "0xdad3E0De9Cb960EAd5e077FA74B97ED6f79Fc23C";
      // const addressoffarm = "0xA21CDe2f871F8daa75bF8FeB50F0140A85E658f1";
      const addressoflptoken = "0x5e4085B816fdC167410650d805f69d7013C896D8";
      const addressoffarm = "0xF71D9A8D70dF39DaCBd296b98c9b73998Ec8FD8e";
      setlptokenaddress(addressoflptoken);
      setfarmcontractaddress(addressoffarm);
      // set network name here
      setNetwork("Mainnet");
      // defining a smart contract ;
      // signer is defined above no need to define again
      // const smartcontract = new Contract( /* address of smart contract*/  , /*  abi of smart contract */, signer);
      let farmsmartcontract = new Contract(addressoffarm, Farmabi.abi, signer);

      setfarmcontract(farmsmartcontract);

      let erc20smartcontract = new Contract(
        addressoflptoken,
        lptokenabi.abi,
        signer
      );
      settokencontract(erc20smartcontract);

      let name, symbol, tokenbalance, totalsupply;
      // await tokencontract.name().then((result) => {
      //   name = result;
      // });
      // await tokencontract.symbol().then((result) => {
      //   symbol = result;
      // });

      // tokenbalance = await tokencontract.balanceOf(accounts[0]);
      // await tokencontract.totalSupply().then((result) => {
      //   totalsupply = ethers.utils.formatUnits(result, 18);
      // });

      // console.log(name);
      // console.log(symbol);
      // console.log(tokenbalance);
      // console.log(totalsupply);

      // console.log(farmsmartcontract);

      let farmuserinfoamount, farmuserinforewarddebt, farmpendingrewards;

      await farmsmartcontract.userInfo(accounts[0]).then((result) => {
        // console.log(result);
        farmuserinfoamount = ethers.utils.formatUnits(result.amount, 18);
        farmuserinforewarddebt = ethers.utils.formatUnits(
          result.rewardDebt,
          18
        );
      });
      await farmsmartcontract.pendingReward(accounts[0]).then((result) => {
        // console.log(result);
        farmpendingrewards = ethers.utils.formatUnits(result, 18);
      });

      setfarmcontractinfo({
        farmuserinfoamount,
        farmuserinforewarddebt,
        farmpendingrewards,
      });
      console.log("farmuserinfoamount" + farmuserinfoamount);
      console.log("farmuserinforewarddebt" + farmuserinforewarddebt);
      console.log("farmpendingrewards" + farmpendingrewards);

      // if you want to call data from smart contract follow below
      // suppose there is function in smart contract which returns something

      // await smartcontract
      //   .functioninsmartcontract(accounts[0].toString())
      //   .then((result) => {
      //     console.log("vesting schedule data ", result);
      //   });

      // suppose there is a call function only or a public variable
      // await smartcontract.functioninsmartcontract();

      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const getpendingrewards = async () => {
    let farmuserinfoamount, farmuserinforewarddebt, farmpendingrewards;
    await farmcontract.userInfo(account).then((result) => {
      // console.log(result);
      farmuserinfoamount = ethers.utils.formatUnits(result.amount, 18);
      farmuserinforewarddebt = ethers.utils.formatUnits(result.rewardDebt, 18);
    });
    await farmcontract.pendingReward(account).then((result) => {
      // console.log(result);
      farmpendingrewards = ethers.utils.formatUnits(result, 18);
    });
    console.log("farmuserinfoamount" + farmuserinfoamount);
    console.log("farmuserinforewarddebt" + farmuserinforewarddebt);
    console.log("farmpendingrewards" + farmpendingrewards);

    setfarmcontractinfo({
      farmuserinfoamount,
      farmuserinforewarddebt,
      farmpendingrewards,
    });
  };
  if (!loading && account != "") {
    setInterval(getpendingrewards, 2000);
  }

  // const approvelp = (async) => {
  //   try {
  //     const tx = await tokencontract.approve(
  //       lptokenaddress,
  //       ethers.utils.parseEther(a.toString())
  //     );
  //     // swal("wait for one more transaction if it doest fail");
  //     const txsign = await tx.wait();
  //   } catch (e) {
  //     console.log(e);
  //     swal("the trasaction has been failed");
  //   }
  // };

  const deposit = async (a) => {
    try {
      const tx = await tokencontract.approve(
        farmcontractaddress,
        ethers.utils.parseEther(a.toString())
      );
      // swal("wait for one more transaction if it doest fail");
      const txsign = await tx.wait();
    } catch (e) {
      console.log(e);
      swal("the trasaction has been failed");
    }
    // window.alert(a);
    try {
      const tx = await farmcontract.deposit(
        ethers.utils.parseEther(a.toString())
      );
      console.log(tx);
      const txsign = await tx.wait();

      setrefresh(1);
    } catch (e) {
      console.log(e);
      swal("the trasaction has been failed");
    }
  };

  const harvest = async () => {
    try {
      const tx = await farmcontract.deposit("0");
      const txsign = await tx.wait();

      setrefresh(1);
    } catch (e) {
      console.log(e);
      swal("the trasaction has been failed");
    }
  };

  const unstake = async (a) => {
    try {
      const tx = await farmcontract.withdraw(
        ethers.utils.parseEther(a.toString())
      );
      const txsign = await tx.wait();

      setrefresh(1);
    } catch (e) {
      console.log(e);
      swal("the trasaction has been failed");
    }
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div class="container">
        <main role="main" class="container">
          <div class="jumbotron">
            <h1>Project</h1>
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 1</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 2</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 3</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <button className="btn btn-primary">Click on it</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} getNetwork={getNetwork} />

      {account == "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress} style={{ color: "black" }}>
            metamask
          </button>
        </div>
      ) : (
        // content
        <HomePage
          deposit={deposit}
          harvest={harvest}
          unstake={unstake}
          getpendingrewards={getpendingrewards}
          farmcontractinfo={farmcontractinfo}
          // farmcontract = {farmcontract}
        />
      )}
    </div>
  );
};

export default App;
