import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import Header from "../components/Header";
import Rate from "../components/Rate";
import "../styles/Rate.css";

function Rates() {
  const [rates, setRates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [filteredRates, setFilteredRates] = useState([]);

  const getRates = async () => {
    try {
      const response = await api.get("/api/v1/crypto/rates");
      const filteredRatesData = response.data.data.filter(
        (rate) => rate.type === "fiat"
      );
      setRates(filteredRatesData);
      setFilteredRates(filteredRatesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filtered = rates.filter(
      (rate) =>
        rate.symbol.toLowerCase().includes(e.target.value.toLowerCase()) ||
        rate.id.toLowerCase().includes(e.target.value.toLowerCase()) ||
        (rate.currencySymbol &&
          rate.currencySymbol.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setFilteredRates(filtered);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const convertToUSD = () => {
    const selectedRate = rates.find(
      (rate) => rate.id === selectedCurrency || rate.symbol === selectedCurrency
    );

    if (selectedRate && amount) {
      const rateUsd = parseFloat(selectedRate.rateUsd);
      const converted = parseFloat(amount) * rateUsd;
      setConvertedAmount(converted.toFixed(4));
    }
  };

  const handleRateClick = (currencyId) => {
    setSelectedCurrency(currencyId);
  };

  return (
    <>
      <Header />
      <div className="rate_display">
        <div className="currency-converter-container">
          <select onChange={handleCurrencyChange} value={selectedCurrency}>
            <option value="">Select Currency</option>
            {rates.map((exchange, index) => (
              <option key={index} value={exchange.id}>
                {exchange.id} - {exchange.symbol}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <button onClick={convertToUSD}>Convert to USD</button>
          {convertedAmount && (
            <p>Converted Amount to USD: {convertedAmount}</p>
          )}
        </div>

        <div className="search-container">
          <input
            className='searchBar'
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {Array.isArray(filteredRates) && filteredRates.length > 0 ? (
          filteredRates.map((exchange, index) => (
            <div key={index} onClick={() => handleRateClick(exchange.id)}>
              <Rate
                id={exchange.id}
                symbol={exchange.symbol}
                currencySymbol={exchange.currencySymbol}
                rateUsd={exchange.rateUsd}
              />
            </div>
          ))
        ) : (
          <p>No matching fiat rates found</p>
        )}
      </div>
    </>
  );
}

export default Rates;
