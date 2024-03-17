// TrendingPage.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HomeTabs from '../components/HomeTabs';
import trendingCoinsData from '../data/trendingCoinsData';
import '../styles/TrendingPage.css'; // Import your CSS file for styling
import HeroSlider from '../components/HeroSlider';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import MainPageTable from '../components/MainPageTable';
import MostVisitedTable from '../components/MostVisitedTable';
import FearAndGreenIndex from '../components/FearAndGreedIndex';
import ChatTab from '../components/ChatTab';

function TrendingPage() {
  const [trendings, setTrendings] = useState([]);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false); // Add dark mode state
  const [favorites, setFavorites] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  // Initialize favorites state using value from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);
 
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

    const toggleFavorite = (coinId) => {
      setFavorites(prevFavorites => {
        if (prevFavorites.includes(coinId)) {
          // If already a favorite, remove it
          const updatedFavorites = prevFavorites.filter(id => id !== coinId);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          return updatedFavorites;
        } else {
          // If not a favorite, add it
          const updatedFavorites = [...prevFavorites, coinId];
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          return updatedFavorites;
        }
      });
    };

    const filterCoins = trendings.filter((coin) => {
      return coin.name.toLowerCase().includes(searchWord.toLowerCase());
    });
  return (
    <>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
    <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
    <ChatTab />
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
        <h2>Trending Coins</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {filterCoins.map((coin) => (
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
                <td>
                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className={favorites.includes(coin.id) ? 'favorite' : ''}
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
    </>
  );
}

export default TrendingPage;
