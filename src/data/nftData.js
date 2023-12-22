import React from 'react'
import axios from 'axios';

async function nftData() {
    try{
        const [nftList] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/nfts/list?per_page=3&page=1&x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x'),
          ]);
        return{
            nftList: nftList,
        }
       
    } catch (error) {
        console.error('Error fetching graph data:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
}

export default nftData