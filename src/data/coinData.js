import axios from 'axios';

async function coinData() {
    try{
        const [trendingResults, priceResults] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x'),
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`)
          ]);
          console.log(trendingResults.data);
          const btcPrice = priceResults.data.bitcoin.usd;
        return{
            trending: trendingResults,
            price: priceResults,
            priceBtc: btcPrice
            
        }
       
    } catch (error) {
        console.error('Error fetching graph data:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
}

export {coinData};