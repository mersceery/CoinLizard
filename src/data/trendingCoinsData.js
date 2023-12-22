import axios from 'axios';

async function trendingCoinsData() {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x'
    );

    if (res.data && res.data.coins) {
      const trendingCoins = res.data.coins;
      const prices = trendingCoins.map((coin) => ({
        name: coin.item.name,
        icon: coin.item.large,
        id: coin.item.id,
        price: coin.item.data.price,
        symbol: coin.item.symbol,
      }));
      return prices;
    } else {
      throw new Error('No coins data found');
    }
  } catch (error) {
    console.error('Error fetching trending coins data:', error);
    throw error;
  }
}

export default trendingCoinsData;
