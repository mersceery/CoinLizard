import React, { useEffect, useState } from "react";
import exchangeData from "../data/exchangeData";
import Exchange from "../components/Exchange";
import Header from "../components/Header";
import ShowExchangeGraph from "../components/ShowExchangeGraph";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);

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

  return (
    <>
    <Header></Header>
    
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
    </>
  );
}

export default Exchanges;
