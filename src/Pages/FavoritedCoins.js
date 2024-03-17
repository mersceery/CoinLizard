import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HomeTabs from '../components/HomeTabs';
import useLocalStorage from 'use-local-storage';
import '../styles/TrendingPage.css';
import '../App.css';
import Coin from '../components/Coin';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSlider from '../components/HeroSlider';
import { coinData } from '../data/coinData';
import MainPageTable from '../components/MainPageTable';
import MostVisitedTable from '../components/MostVisitedTable';
import FearAndGreenIndex from '../components/FearAndGreedIndex';
import { Link } from 'react-router-dom';
import ChatTab from '../components/ChatTab';

function CombinedPage() {
  const [storedFavorites, setStoredFavorites] = useState([]);
  const [coins, setCoins] = useState([]);
  const [priceUSD, setPriceUSD] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [bitcoinPrice, setBitcoinPrice] = useState(0); // New state variable for bitcoin price
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setStoredFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    coinData()
      .then((coinData) => {
        const filteredCoins = coinData.trending.data.filter(coin => storedFavorites.includes(coin.id));
        setCoins(filteredCoins);
        setPriceUSD(coinData.priceBtc);
        const bitcoinData = filteredCoins.find(crypto => crypto.id === "bitcoin"); // Find bitcoin data from filteredCoins
        if (bitcoinData) {
          setBitcoinPrice(bitcoinData.current_price); // Set bitcoin price
        }
      })
      .catch((error) => {
        console.error('Error setting coin data:', error);
      });
  
    const interval = setInterval(() => {
      coinData();
    }, 600000);
  
    return () => clearInterval(interval);
  }, [storedFavorites]);
  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  const removeFromFavorites = (coinId) => {
    setStoredFavorites(prevFavorites => prevFavorites.filter(id => id !== coinId));
    setCoins(prevCoins => prevCoins.filter(coin => coin.id !== coinId));
    localStorage.setItem('favorites', JSON.stringify(storedFavorites.filter(id => id !== coinId)));
  };

  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <ChatTab />
        <div className="App">
          <div className='carouselContainer'><HeroSlider></HeroSlider></div>
          <div className='big-whole-table-container'>
            <div className='whole-table-container'>
              <MainPageTable className='MainPageTable'></MainPageTable>
            </div>
            <div className='whole-table-container'>
              <MostVisitedTable className='MainPageTable'></MostVisitedTable>
            </div>
            <div className='whole-table-container'>
              <FearAndGreenIndex className='MainPageTable'></FearAndGreenIndex>
            </div>
          </div>
          <div className='home-tabs-container'><HomeTabs /></div>
          <div className='cryptoHeader'>
            <input
              className='searchBar'
              type='text'
              placeholder='Search...'
              onChange={(event) => {
                setSearchWord(event.target.value);
              }}
            ></input>
          </div>
          <div className="table-container">
            <h2>Favorite Coins</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price in BTC</th>
                  <th>Price in USD</th>
                  <th>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {filterCoins.map((coin) => (
                  <tr key={coin.id}>
                    <td className='coin-cell'>
                      <Link to={`/${coin.id}`} className='coin-link'>
                        <img
                          src={coin.image}
                          alt={`${coin.name} Icon`}
                          className='coin-icon'
                        />
                        <span className='coin-name'>{coin.name}</span>
                      </Link>
                    </td>
                    <td>{coin.symbol.toUpperCase()}</td>
                    <td>{bitcoinPrice ? (coin.current_price / bitcoinPrice).toFixed(12) : ''}</td>
                    <td>${coin.current_price}</td>
                    <td>
                      <button onClick={() => removeFromFavorites(coin.id)}>Remove from Favorites</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CombinedPage;
