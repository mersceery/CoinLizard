import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Nft.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useParams } from 'react-router-dom';


function Nft() {
  const [nftList, setNFTList] = useState([]);
  const [nftDetailsList, setNFTDetailsList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/nfts/list?per_page=17&page=1&x_cg_demo_api_key=CG-BeafgP5Qfw7rrEdz3HvMKfWY');
        setNFTList(response.data);
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      }
    }

    fetchData();
  }, []);

  // Function to fetch details for each ID
  const fetchDetailsForIDs = async () => {
    const ids = nftList.map((item) => item.id);
    const promises = ids.map(async (id) => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/nfts/${id}?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching details for ID ${id}:`, error);
        return null;
      }
    });

    // Wait for all promises to resolve
    const details = await Promise.all(promises);
    setNFTDetailsList(details);
  };

  // Fetch details for each ID when the nftList changes
  useEffect(() => {
    if (nftList.length > 0) {
      fetchDetailsForIDs();
    }
  }, [nftList]);


  // Function to create a line chart
  const createLineChart = (data, dataKey) => (
    <LineChart width={200} height={100} data={data}>
      <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <>
      <Header />
      <div>
        <h1>NFT Details</h1>
        <DropdownButton id="dropdown-basic-button" title="All Chains">
        <Dropdown.Item href="#/action-0">All Chains</Dropdown.Item>
      <Dropdown.Item href="#/action-1">Ethereum</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Optimism</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Polygon</Dropdown.Item>
    </DropdownButton>
        <table>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Name</th>
              <th>Image Small</th>
              <th>Floor Price</th>
              <th>Market Cap</th>
              <th>24h Volume</th>
              <th>Number of Unique Addresses</th>
              <th>24h Change in Unique Addresses</th>
              <th>Floor Price 24h Percentage Change in USD</th>
              <th>Floor Price within 1 Year Percentage Change in USD</th>
              {/* Add more table headers for other details */}
            </tr>
          </thead>
          <tbody>
            {/* Display the details of each NFT */}
            {nftDetailsList.map((details, index) => (
              <tr key={index}>
                <td>{details?.asset_platform_id}</td>
                <td>{details?.name}</td>
                <td><img src={details?.image?.small} alt={details?.name} /></td>
                <td>{details?.floor_price?.usd}</td>
                <td>{details?.market_cap?.usd}</td>
                <td>{details?.volume_24h?.usd}</td>
                <td>{details?.number_of_unique_addresses}</td>
                <td>{details?.number_of_unique_addresses_24h_percentage_change}</td>
                <td>{details?.floor_price_24h_percentage_change?.usd.toFixed(2)}%</td>
                <td>
                  {/* Add line chart for 'Floor Price 24h Percentage Change in USD' */}
                  {createLineChart([
                    { name: '7 Days', value: details?.floor_price_7d_percentage_change?.usd || 0 },
                    { name: '14 Days', value: details?.floor_price_14d_percentage_change?.usd || 0 },
                    { name: '30 Days', value: details?.floor_price_30d_percentage_change?.usd || 0 },
                    { name: '60 Days', value: details?.floor_price_60d_percentage_change?.usd || 0 },
                    { name: '1 Year', value: details?.floor_price_1y_percentage_change?.usd || 0 },
                  ], 'value')}
                </td>
                {/* Add more table data for other details */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Nft;

