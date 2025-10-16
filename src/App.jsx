import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] =useState(1);
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency, setToCurrency]= useState("LKR");
  const [convertedAmount, setConvertedAmount]= useState(null);
  const [exchangeRate, setExchangeRate] =useState(null);

  useEffect(()=>{
    const getExchangeRate =async()=>{  /*getting extrenal data .so async */
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response= await axios.get(url);
        // console.log(response);
        setExchangeRate(response.data.rates[toCurrency]);
      }catch(error){
        console.log("Error fetching exchange rate API ",error);
      }
    };
    getExchangeRate();
  },[fromCurrency,toCurrency]);

  useEffect(()=>{
    if(exchangeRate !==null){
      setConvertedAmount((amount*exchangeRate).toFixed(2));
    }
  },[amount,exchangeRate]);

  const handleAmountChange= (e)=>{
    const value= parseFloat(e.target.value)
    setAmount(isNaN(value) ? null : value);
  };

  const handleFromCurrencyChange= (e)=>{
    const value= setFromCurrency(e.target.value)
  };

  const handleToCurrencyChange= (e)=>{
    const value= setToCurrency(e.target.value)
  };

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" name="" id="amt" value={amount} onChange={handleAmountChange} />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency" >From Currency:</label>
            <select name="" id="fromCurrency" value={fromCurrency} onChange={handleFromCurrencyChange} >
              <option value="USD" >United States Dollar</option>
              <option value="INR">Indian Rupee</option>
              <option value="LKR">Srilankan Rupees</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="JPY">Japanese Yen</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="toCurrency">To Currency:</label>
            <select  id="toCurrency" value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">United States Dollar</option>
              <option value="INR">Indian Rupee</option>
              <option value="LKR" defaultValue >Srilankan Rupees</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="JPY">Japanese Yen</option>
            </select>
          </div>
          <div className="result">
            <h3>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h3>
          </div>
        </div>
      </div>
      <span>By: Thivision</span>
    </>
  );
}

export default App;
