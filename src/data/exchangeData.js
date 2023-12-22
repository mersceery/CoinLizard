
import axios from 'axios';
async function exchangeData() {
    try{
        const [exchangeResults] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/exchanges?per_page=100?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x')
          ]);
          console.log(exchangeResults.data);
        return{
            exchanges: exchangeResults.data
            
        }
       
    } catch (error) {
        console.error('Error fetching graph data:', error);
        throw error; // Rethrow the error for handling in the calling code
      }
}

export default exchangeData