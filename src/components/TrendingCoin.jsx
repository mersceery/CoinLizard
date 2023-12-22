import React from 'react'
import { Link } from 'react-router-dom';
function TrendingCoin({link, name, icon, priceInUSD, symbol}) {

  return (
    <>
    <Link to={`/${link}`} className='coin'>
     <div>
        <img src={icon} alt={name} />
        <h1>Name: {name}</h1>
        <h3>Price in USD: {priceInUSD.toFixed(5)}</h3>
        <h3>Symbol: {symbol}</h3>
      </div>
       </Link>
    </>
  )
}

export default TrendingCoin