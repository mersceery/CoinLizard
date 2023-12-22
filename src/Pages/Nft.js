import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Nft.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, useParams } from 'react-router-dom';

function Nft() {
  const [nftList, setNFTList] = useState([]);
  const [nftDetailsList, setNFTDetailsList] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchDetails = async () => {
          const filteredDetails = await Promise.all(
            nftList.map(async (item) => {
              try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/nfts/${item.id}?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`);
                return response.data;
              } catch (error) {
                console.error(`Error fetching details for ID ${item.id}:`, error);
                return null;
              }
            })
          );
          setNFTDetailsList(filteredDetails);
    };

    fetchDetails();
  }, [id, nftList]); // Re-fetch details when 'id' or 'nftList' changes


  const fetchDetailsForIDs = async (platformId) => {
    let filteredDetails = [];

    if (platformId === 'all') {
      filteredDetails = await Promise.all(
        nftList.map(async (item) => {
          try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/nfts/${item.id}?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`);
            return response.data;
          } catch (error) {
            console.error(`Error fetching details for ID ${item.id}:`, error);
            return null;
          }
        })
      );
    } else {
      filteredDetails = await Promise.all(
        nftList
          .filter((item) => item.asset_platform_id === platformId)
          .map(async (item) => {
            try {
              const response = await axios.get(`https://api.coingecko.com/api/v3/nfts/${item.id}?x_cg_demo_api_key=CG-KhUN8eMndGdbN9nkufuVPt1x`);
              return response.data;
            } catch (error) {
              console.error(`Error fetching details for ID ${item.id}:`, error);
              return null;
            }
          })
      );
    }

    setNFTDetailsList(filteredDetails);
  };

  useEffect(() => {
    if (id) {
      fetchDetailsForIDs(id);
    } else {
      setNFTDetailsList([]);
    }
  }, [id]);

  const handleDropdownSelection = (platformId) => {
    if (platformId === 'all') {
      navigate("/nft");
      fetchDetailsForIDs(platformId);
    } else {
        navigate(`/nft/${platformId}`);
      fetchDetailsForIDs(platformId);
    }
  };


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
        <h1 className="nft-header">NFT</h1>
        <DropdownButton id="dropdown-basic-button" title="All Chains">
          <Dropdown.Item onClick={() => handleDropdownSelection('all')}>All Chains</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDropdownSelection('ethereum')}>Ethereum</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDropdownSelection('optimistic-ethereum')}>Optimism</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDropdownSelection('polygon-pos')}>Polygon</Dropdown.Item>
          {/* Add more Dropdown.Item elements for other chains */}
        </DropdownButton>
        <table>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Name</th>
              <th>Image Small</th>
              <th>Floor Price </th>
              <th>Market Cap (ETH)</th>
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
