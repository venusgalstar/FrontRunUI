import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [dstTokenAddress, setDstTokendAddress] = useState("0x8a810ea8B121d08342E9e7696f4a9915cBE494B7");
  const [srcTokenAddress, setSrcTokendAddress] = useState("0x70499adEBB11Efd915E3b69E700c331778628707");
  const [pairTokenAddress, setPairTokendAddress] = useState("0xFfd1fD891301D347ECaf4fC76866030387e97ED4");
  const [plsAttackingAmount, setPlsAttackingAmount] = useState("5");
  const [testBuyingPLSAmount, setTestBuyingPLSAmount] = useState("5");
  const [testPLSAttackAmount, setTestPLSAttackAmount] = useState("5");
  const [testResult, setTestResult] = useState("5");

  const getSettingInfo = async() => {
    const response = await fetch(
      "http://95.217.33.149/getData"
    ).then((response)=>response.json());
    setDstTokendAddress(response.data.dstTokenAddress);
    setPlsAttackingAmount(response.data.attackAmount);
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

  function calc_profit_test(){
    var test_input_volume = 118389023832.868490958758251517;
    var test_output_volume = 301145104269;
    var test_attack_amount = testPLSAttackAmount;
    var test_in_amount = testBuyingPLSAmount;
  
    var cap = test_input_volume * test_output_volume;
    var fee = 0.9971;
  
    console.log("test_input_volume", test_input_volume);
    console.log("test_output_volume", test_output_volume);
    console.log("test_attack_amount", test_attack_amount);
    console.log("test_in_amount", test_in_amount);
    
    var x1 = test_input_volume + test_attack_amount * fee;
  
    console.log("x1",x1);
    
    var y1 = test_output_volume - cap / x1;
  
    console.log("y1",y1);
    
    var x = test_input_volume + test_attack_amount * fee + test_in_amount * fee;
  
    console.log("x",x);
    
    var y = cap / x1 - cap / x;
  
    console.log("y",y);
    
    var xf = cap / (test_output_volume - y1 - y + y1 * fee);
  
    console.log("xf",xf);
    
    var input_profit = test_input_volume + test_attack_amount * fee + test_in_amount * fee - xf - test_attack_amount;
    
    setTestResult(input_profit);
  }

  useEffect(()=>{
    getSettingInfo();
  },[]);

  useEffect(() => {
    calc_profit_test();
  },[testBuyingPLSAmount, testPLSAttackAmount]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div className="transaction">

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
            <p>Result</p> 
            <p>{testResult}</p>
          </div>  
        </div>
      </div>

    </div>
  );
}

export default App;
