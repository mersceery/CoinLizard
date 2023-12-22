import axios from 'axios';

async function graphData(id) {
  try {
    const [graphResults, dataDetails] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=360&x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`)
    ]);

    const data = graphResults.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-US");
      return {
        Date: date,
        Price: p
      };
    });
    console.log(graphResults.data);
    console.log(dataDetails.data);
    return {
        data: data,
        dataDetails: dataDetails.data // Include dataDetails in the returned object
      };
  } catch (error) {
    console.error('Error fetching graph data:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

export default graphData;
