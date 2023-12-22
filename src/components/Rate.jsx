import React from 'react';

function Rate({ id, symbol, currencySymbol, rateUsd }) {

  return (
    <div className='rate-component-container'>
      <h1 className='rate-header'>
        Currency: {symbol} - {id} - {currencySymbol !== null ? currencySymbol : 'N/A'}
      </h1>
      <h3 className='rate-usd'>Rate in USD: {rateUsd}</h3>
    </div>
  );
}

export default Rate;
