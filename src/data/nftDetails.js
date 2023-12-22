import React from 'react'
import axios from 'axios';
async function nftDetails(id) {
    try{
        const [nftDetails] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/nfts/${id}?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`),
          ]);
        return{
            nftDetails: nftDetails,
        }
       
    } catch (error) {
        console.error('Error fetching graph data:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
}

export default nftDetails