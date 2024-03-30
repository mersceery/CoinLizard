import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function MostVisitedTable() {
  const ImageUrlCatgirl = 'https://s2.coinmarketcap.com/static/img/coins/200x200/10275.png';
  const ImageUrlArtrade = 'https://s2.coinmarketcap.com/static/img/coins/200x200/19131.png';

  return (
    <Card style={{ maxHeight: '300px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CardContent style={{padding: 40}}>
        <Typography variant="h5" component="div">
          👁️‍🗨️ Most Visited
        </Typography>
        <ul style={{ listStyle: 'none', padding: 0}}>
          <li style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
            <img src={ImageUrlCatgirl} alt="Catgirl" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
              <Typography>Catgirl</Typography>
              <Typography>CATGIRL</Typography>
              <Typography>📉 10.32%</Typography>
            </div>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
            <img src={ImageUrlArtrade} alt="Artrade" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
              <Typography>Artrade</Typography>
              <Typography>ATR</Typography>
              <Typography>📈 41.49%</Typography>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default MostVisitedTable;
