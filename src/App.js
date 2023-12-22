import './App.css';
import { useEffect, useState } from 'react';
import Coin from './components/Coin';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSlider from './components/HeroSlider';
import { coinData } from './data/coinData';
import Header from './components/Header';
import HomeTabs from './components/HomeTabs';


function App() {
  
  const [coins, setCoins] = useState([]);
  const [priceUSD, setPriceUSD] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const bitcoin = coins.find(crypto => crypto.id === "bitcoin");


  useEffect(() => {
       coinData()
      .then((coinData) => {
        setCoins(coinData.trending.data);
        setPriceUSD(coinData.priceBtc);
      })
      .catch((error) => {
        console.error('Error setting coin data:', error);
      });
    // Set up an interval to fetch data every 10 minutes (600000 milliseconds)
    const interval = setInterval(() => {
      coinData();
    }, 600000); // 600000 milliseconds = 10 minutes

    // Clean up the interval to prevent memory leaks when the component unmounts
    return () => clearInterval(interval);
  }, []);


    const filterCoins = coins.filter((coin) =>{
      return coin.name.toLowerCase().includes(searchWord.toLowerCase())
    })

  return (
    <>
    <Header></Header>
    <div className="App">
      <div className='carouselContainer'><HeroSlider></HeroSlider></div>
      {/* <ShowGraph> </ShowGraph> */}
      <div className='home-tabs-container'><HomeTabs /></div>
      <div className='cryptoHeader'>
        <input className='searchBar' type='text' placeholder='Search...' onChange={(event)=>{
          setSearchWord(event.target.value)
        }}></input>
      </div>
      <div className='cryptoDisplay'>{filterCoins.map((coin=>{
        return <Coin link={coin.id} name={coin.name} icon={coin.image} priceInBTC={coin.current_price/bitcoin.current_price} priceInUSD={coin.current_price} symbol={coin.symbol}
        ></Coin>
      }))}</div>
    </div>
    </>
  );
}

export default App;
