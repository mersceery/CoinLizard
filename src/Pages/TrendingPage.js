// TrendingPage.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HomeTabs from '../components/HomeTabs';
import trendingCoinsData from '../data/trendingCoinsData';
import '../styles/TrendingPage.css'; // Import your CSS file for styling
import HeroSlider from '../components/HeroSlider';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

function TrendingPage() {
  const [trendings, setTrendings] = useState([]);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false); // Add dark mode state

  useEffect(() => {
    // Fetch data when the component mounts
    trendingCoinsData()
      .then((data) => {
        // Set the fetched data to state
        setTrendings(data);
        console.log(data);
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
      <div className='carouselContainer'><HeroSlider></HeroSlider></div>
      <div className='home-tabs-container'><HomeTabs /></div>
      <div className="table-container">
        <h2>Trending Coins</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trendings.map((coin) => (
              <tr key={coin.id}>
                <td className='coin-cell'>
                  <Link to={`/${coin.id}`} className='coin-link'>
                    <img
                      src={coin.icon}
                      alt={`${coin.name} Icon`}
                      className='coin-icon'
                    />
                    <span className='coin-name'>{coin.name}</span>
                  </Link>
                </td>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default TrendingPage;
