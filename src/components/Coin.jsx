import React from 'react';
import { Link } from 'react-router-dom';

function Coin({ link, name, icon, priceInBTC, priceInUSD, symbol }) {
  return (
    <Link to={`/${link}`} className='coin'>
      <div>
        <h1>Name: {name}</h1>
        <img src={icon} alt={name} />
        <h3>Price in BTC: {priceInBTC.toFixed(10)}</h3>
        <h3>Price in USD: {priceInUSD.toFixed(5)}</h3>
        <h3>Symbol: {symbol}</h3>
      </div>
    </Link>
  );
}

export default Coin;
