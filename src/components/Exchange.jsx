import React from 'react'
import ShowExchangeGraph from './ShowExchangeGraph'
function Exchange({name, image, btc_24h_value, btc_24h_value_normalized, trust_score, id}) {

  return (
    <>
    
    <div className='exchange-container'>
        <div className='exchange_header'>      
        <img src={image} alt={name} /> 
        
        <h1>{name}</h1>
         </div>

        <h3>24h volume: {btc_24h_value}</h3>
        <h3>24h volume (normalized): {btc_24h_value_normalized}</h3>
        <h3>Trust score: {trust_score}</h3>
        
        <ShowExchangeGraph id={id} />
    </div>
    </>
  )
}

export default Exchange