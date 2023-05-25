
import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import config from './constants';
// import abiDecoder from 'abi-decoder';

function App() {

  const [dstTokenAddress, setDstTokendAddress] = useState("0x8a810ea8B121d08342E9e7696f4a9915cBE494B7");
  const [srcTokenAddress, setSrcTokendAddress] = useState("0x70499adEBB11Efd915E3b69E700c331778628707");
  const [pairTokenAddress, setPairTokendAddress] = useState("0xFfd1fD891301D347ECaf4fC76866030387e97ED4");
  const [plsAttackingAmount, setPlsAttackingAmount] = useState("5");
  const [testBuyingPLSAmount, setTestBuyingPLSAmount] = useState("5");
  const [testPLSAttackAmount, setTestPLSAttackAmount] = useState("5");
  const [testResult, setTestResult] = useState("5");
  const [account, setAccount] = useState("");
  const [poolSourceTokenAmount, setPoolSourceTokenAmount] = useState("");
  const [poolDstTokenAmount, setPoolDstTokenAmount] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");
  const [totalEarned, setTotalEarned] = useState("0");
  const [originalBalance, setOriginalBalance] = useState("0");
  const [totalSucceedTransaction, setTotalSucceedTransaction] = useState("0");

  const HTTP_PROVIDER_LINK = "https://rpc.v4.testnet.pulsechain.com";

  const WEBSOCKET_PROVIDER_LINK = "wss://rpc.v4.testnet.pulsechain.com";

  var web3, web3Ws;
  var routerContract, factoryContract;

  const getSettingInfo = async() => {
    const response = await fetch(
      "http://95.217.33.149/getData"
    ).then((response)=>response.json());
    setDstTokendAddress(response.data.dstTokenAddress);
    setPlsAttackingAmount(response.data.attackAmount);
    setAccount(response.data.account);
    setPoolSourceTokenAmount(response.data.poolSourceTokenAmount);
    setPoolDstTokenAmount(response.data.poolDstTokenAmount);
    setOriginalBalance(response.data.originalAmount);
    setTotalSucceedTransaction(response.data.totalTransaction);
  }

  const updateData = async()=>{
    var data = {
      dstTokenAddress: dstTokenAddress,
      plsAttackingAmount: plsAttackingAmount
    }
    const response = await fetch(`http://95.217.33.149/setData?dstTokenAddress=${dstTokenAddress}&plsAttackingAmount=${plsAttackingAmount}`
    ).then((response)=>response.json());

    alert("ok");
  }

  function handleChangeDst(event) {
    const { name, value } = event.target;
    setDstTokendAddress(value);
  }

  function handleChangeAttack(event) {
    const { name, value } = event.target;
    setPlsAttackingAmount(value);
  }

  function handleChangeTestAmount(event){
    const { name, value } = event.target;
    setTestBuyingPLSAmount(value);
  }

  function handleChangeTestAttack(event){
    const { name, value } = event.target;
    setTestPLSAttackAmount(value);
  }

  function parseTx(input) {
    // if (input == "0x") return ["0x", []];
    // let decodedData = routerContract.decodedData()
    // let method = decodedData["name"];
    // let params = decodedData["params"];
  
    // return [method, params];
  }

  function calc_profit_test(){
    var test_input_volume = poolSourceTokenAmount;
    var test_output_volume = poolDstTokenAmount;
    var test_attack_amount = testPLSAttackAmount;
    var test_in_amount = testBuyingPLSAmount;
  
    var cap = test_input_volume * test_output_volume;
    var fee = 0.9971;
  
    // console.log("test_input_volume", test_input_volume);
    // console.log("test_output_volume", test_output_volume);
    // console.log("test_attack_amount", test_attack_amount);
    // console.log("test_in_amount", test_in_amount);
    
    var x1 = test_input_volume + test_attack_amount * fee;
    var y1 = test_output_volume - cap / x1;
    var x = test_input_volume + test_attack_amount * fee + test_in_amount * fee;
    var y = cap / x1 - cap / x;    
    var xf = cap / (test_output_volume - y1 - y + y1 * fee);
    var input_profit = test_input_volume + test_attack_amount * fee + test_in_amount * fee - xf - test_attack_amount;
    
    setTestResult(input_profit);
  }

  function EstimateProfit(transaction){
    // let data = parseTx(transaction["input"]);
    // let method = data[0];
    // let params = data[1];

    // let out_min = params[0].value;
    // let in_amount = transaction["value"];

    // let path = params[1].value;

    // let in_token_addr = path[path.length - 2];
    // let out_token_addr = path[path.length - 1];

    // if (out_token_addr.toString().toLowerCase() != dstTokenAddress.toString().toLowerCase()) {
    //   return false;
    // }

    // if (in_token_addr.toString().toLowerCase() != srcTokenAddress.toString().toLowerCase()) {
    //   return false;
    // }

    // if (method == "swapExactETHForTokens") {
      
      
    // }
  }

  const subscribe = async()=>{
    try{

      // get pending transactions
      var subscription = web3Ws.eth
      .subscribe("pendingTransactions", function (error, result) {
      })
      .on("data", async function (transactionHash) {
        try{
          let transaction = await web3.eth.getTransaction(transactionHash);
          if (
            transaction != null &&
            transaction["to"] && transaction["to"].toString().toLowerCase() == config.PULSEX_ROUTER_ADDRESS.toString().toLowerCase()
          ) {
            EstimateProfit(transaction);
          }
        }catch(err){
          // console.log("Error on pendingTransactions");
        }
      });
    }catch(error){
      console.log("loop : ", error);
    }
  }

  const createWeb3 = async()=>{
    web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER_LINK));
    web3Ws = new Web3(
      new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER_LINK)
    );    

    routerContract = new web3.eth.Contract(
      config.PULSEX_ROUTER_ABI,
      config.PULSEX_ROUTER_ADDRESS
    );

    factoryContract = new web3.eth.Contract(
      config.PULSEX_FACTORY_ABI,
      config.PULSEX_FACTORY_ADDRESS
    );

    // abiDecoder.addABI(PULSEX_ROUTER_ABI);

    subscribe();
  }

  useEffect(()=>{
    getSettingInfo();
    createWeb3();
  },[]);

  const getInfoFromChain = async() =>{
    
    if( account == "" || account == undefined)
      return;

    if( web3 == undefined ){
      createWeb3();
    }
    var balance = await web3.eth.getBalance(account);
    setAccountBalance(web3.utils.fromWei(balance, 'ether'));
    setTotalEarned(accountBalance - web3.utils.fromWei(originalBalance, 'ether'));
  }

  useEffect(() => {    
    getInfoFromChain();
  },[account]);

  useEffect(() => {
    calc_profit_test();
  },[testBuyingPLSAmount, testPLSAttackAmount, poolSourceTokenAmount, poolDstTokenAmount]);

  return (
    <div className="App">
      <div className="transaction">
        <div className="item">
          <p>Balance</p> 
          <p>{accountBalance}</p>
        </div>
        <div className="item">
          <div className="transaction_table">
            <p>Success Transactions</p> 
            <p>{totalSucceedTransaction}</p>
          </div>
          <div className="transaction_table">
            <p>Earned Amount</p>
            <p>{totalEarned}</p>
          </div>
        </div>
      </div>
      <div className="setting">
        <div className="current_setting">
          <p>Current Setting Info</p> 
          <div className="item">
            <p>Dest Token Address</p> 
            <input value={dstTokenAddress} onChange={handleChangeDst}/>
          </div>     
          <div className="item">
            <p>PLS Attacking Amount</p> 
            <input value={plsAttackingAmount} onChange={handleChangeAttack}/>
          </div> 
          <div className="item">
            <button onClick={updateData}>Update</button>
          </div> 
          <div className="item">
            <p>Source Token Address</p> 
            <p>{srcTokenAddress}</p>
          </div>
          <div className="item">
            <p>Pair Token Address</p> 
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>
          <div className="item">
            <p>Account Address</p> 
            <p>{account}</p>
          </div>
           
        </div>
        <div className="calc_profit">
          <p>Estimate Profit</p> 
          <div className="item">
            <p>Buying PLS Amount</p> 
            <input value={testBuyingPLSAmount} onChange={handleChangeTestAmount}/>
          </div>
          <div className="item">
            <p>Test PLS Attacking Amount</p> 
            <input value={testPLSAttackAmount} onChange={handleChangeTestAttack}/>
          </div>  
          <div className="item">
            <p>Pool Source Token Amount</p> 
            <p>{poolSourceTokenAmount}</p>
          </div>
          <div className="item">
            <p>Pool Dst Token Amount</p> 
            <p>{poolDstTokenAmount}</p>
          </div>
          <div className="item">
            <p>Profit</p> 
            <p>{testResult}</p>
          </div>  
        </div>
      </div>

    </div>
  );
}

export default App;
