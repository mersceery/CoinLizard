import React, { useEffect, useState } from "react";
import exchangeData from "../data/exchangeData";
import Exchange from "../components/Exchange";
import Header from "../components/Header";
import ShowExchangeGraph from "../components/ShowExchangeGraph";
import useLocalStorage from 'use-local-storage';
import ChatTab from '../components/ChatTab';

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false); // Add dark mode state

  useEffect(() => {
    // Fetch data when the component mounts
    exchangeData()
      .then((data) => {
        // Set the fetched data to state
        setExchanges(data.exchanges);
        console.log(exchanges);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

    // Toggle dark mode function
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
    
  return (
    <>
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
    <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
    <ChatTab />

      <div className="exchange_display">
        {exchanges.map((exchange, index) => (
          <div> 
          <Exchange
            key={index}
            name={exchange.name}
            image={exchange.image}
            btc_24h_value={exchange.trade_volume_24h_btc}
            btc_24h_value_normalized={exchange.trade_volume_24h_btc_normalized}
            trust_score={exchange.trust_score}
            id={exchange.id}
            
          />
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Exchanges;
