import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import graphData from "../data/graphData";
import { useParams } from 'react-router-dom';
import Header from "./Header";
import '../styles/ShowGraph.css'; // Import your CSS file for styling


function ShowGraph() {
  const [chartData, setChartData] = useState([]); // State to hold the fetched data
    const [coinData, setCoinData] = useState([]); // State to hold the fetched data
    const { id } = useParams();
    const [isDarkMode, setIsDarkMode] = useState(false); // Add dark mode state

  useEffect(() => {
    // Fetch data when the component mounts
    graphData(id)
      .then((data) => {
        // Set the fetched data to state
        setChartData(data.data);
        setCoinData(data.dataDetails);
      })
      .catch((error) => {
        console.error('Error fetching graph data:', error);
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
    
    <div className="graph-container">
          <div className="graph-coin-title">
          {coinData && coinData.image && coinData.image.large && ( // Check if coinData.image.large exists
              <img className="graphIcon" src={coinData.image.large} alt={coinData.name} />
            )}
              <header> <h1>{coinData.name} ({coinData.symbol})</h1> </header>
      </div>
        <div className="graph-image">
      {chartData.length > 0 && ( // Render the chart only when data is available
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Price"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      )}
      </div>
      {coinData.market_data && (  
    <div className="graph-coin-details">
        <h1>{coinData.name} Price Statistics</h1>
        <table>
            <tbody>
                <tr>
                    <td>Current Price</td>
                    <td className="bold">{coinData.market_data.current_price.usd}</td>
                </tr>
                <tr>
                    <td>24 Hour High</td>
                    <td className="bold">{coinData.market_data.high_24h.usd}</td>
                </tr>
                <tr>
                    <td>24 Hour Low</td>
                    <td className="bold">{coinData.market_data.low_24h.usd}</td>
                </tr>
                <tr>
                    <td>24 Hour Price Change</td>
                    <td className="bold">{coinData.market_data.price_change_24h.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>1 Year Change</td>
                    <td className="bold">{coinData.market_data.price_change_percentage_1y.toFixed(2)}%</td>
                </tr>
                <tr>
                    <td>Circulating Supply</td>
                    <td className="bold">{coinData.market_data.circulating_supply}</td>
                </tr>
                <tr>
                    <td>Total Supply</td>
                    <td className="bold">{coinData.market_data.total_supply}</td>
                </tr>
                <tr>
                    <td>Market Cap</td>
                    <td className="bold">{coinData.market_data.market_cap.usd}</td>
                </tr>
                <tr>
                    <td>Market Cap Rank</td>
                    <td className="bold">{coinData.market_data.market_cap_rank}</td>
                </tr>
            </tbody>
        </table>
    </div>
)} </div>
    </div>
    </>
  );
}

export default ShowGraph;
