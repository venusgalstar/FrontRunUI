import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [change, setChange] = useState(true);

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
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>     
          <div className="item">
            <p>Source Token Address</p> 
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>
          <div className="item">
            <p>Pair Token Address</p> 
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>
          <div className="item">
            <p>PLS Attacking Amount</p> 
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>  
        </div>
        <div className="calc_profit">
          <p>Estimate Profit</p> 
          <div className="item">
            <p>Buying Amount</p> 
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>
          <div className="item">
            <p>Test PLS Attacking Amount</p> 
            <p>0x8a810ea8B121d08342E9e7696f4a9915cBE494B7</p>
          </div>  
        </div>
      </div>

    </div>
  );
}

export default App;
