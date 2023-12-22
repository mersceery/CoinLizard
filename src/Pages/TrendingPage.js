import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HomeTabs from '../components/HomeTabs';
import trendingCoinsData from '../data/trendingCoinsData';
import '../styles/TrendingPage.css'; // Import your CSS file for styling
import HeroSlider from '../components/HeroSlider';
import { Link } from 'react-router-dom';

function TrendingPage() {
  const [trendings, setTrendings] = useState([]);

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

  return (
    <>
      <Header />
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
                 <Link to={`/${coin.id}`} className='coin-link'>
                <td>
                  <img
                    src={coin.icon}
                    alt={`${coin.name} Icon`}
                    style={{ width: '30px', height: '30px' }}
                  />{' '}
                  {coin.name}{' '}
                </td></Link>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TrendingPage;
