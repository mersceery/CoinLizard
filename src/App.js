import './App.css';
import { useEffect, useState } from 'react';
import Coin from './components/Coin';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSlider from './components/HeroSlider';
import { coinData } from './data/coinData';
import Header from './components/Header';
import HomeTabs from './components/HomeTabs';
import MainPageTable from './components/MainPageTable';
import MostVisitedTable from './components/MostVisitedTable';
import FearAndGreenIndex from './components/FearAndGreedIndex';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import ChatTab from './components/ChatTab';

function App() {
  const [coins, setCoins] = useState([]);
  const [priceUSD, setPriceUSD] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const bitcoin = coins.find(crypto => crypto.id === "bitcoin");
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false); // Add dark mode state
  const [favorites, setFavorites] = useState([]);

  // Initialize favorites state using value from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    coinData()
      .then((coinData) => {
        setCoins(coinData.trending.data);
        setPriceUSD(coinData.priceBtc);
      })
      .catch((error) => {
        console.error('Error setting coin data:', error);
      });

    const interval = setInterval(() => {
      coinData();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Toggle favorite status of a coin
  const toggleFavorite = (coinId) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(coinId) 
        ? prevFavorites.filter(id => id !== coinId) 
        : [...prevFavorites, coinId];
        
      // Save updated favorites to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      return updatedFavorites;
    });
  };

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
            <h2>All Coins</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price in BTC</th>
                  <th>Price in USD</th>
                  <th>Favorite</th> {/* New column for favorite button */}
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
                    <td>{(coin.current_price / bitcoin.current_price).toFixed(12)}</td>
                    <td>${coin.current_price}</td>
                    <td>
                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className={favorites.includes(coin.id) ? 'favorite' : 'favorite-btn'}
                      >
                        {favorites.includes(coin.id) ? 'Remove' : 'Add'}
                      </button>
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

export default App;
