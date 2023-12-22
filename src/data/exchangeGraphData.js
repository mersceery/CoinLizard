import React from 'react'
import axios from 'axios'
async function exchangeGraphData(id) {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=7&x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`);
      console.log(res.data); // Do something with the data, such as setting it to state

      const data = res.data.map((price) => {
        const [timestamp, p] = price;
        const date = new Date(timestamp).toLocaleDateString("en-US");
        return {
          Date: date,
          Price: p
        };
      });
      return{
        exchangeData: data
      }
    } catch (error) {
      console.error('Error fetching exchange graph data:', error);
    }

}

export default exchangeGraphData
