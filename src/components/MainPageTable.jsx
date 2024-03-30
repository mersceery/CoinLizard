import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function MainPageTable() {
  const ImageUrlVuzz = 'https://pbs.twimg.com/profile_images/1728342723076239360/vNS7GKk2_400x400.jpg';
  const ImageUrlTensorflow = 'https://s2.coinmarketcap.com/static/img/coins/200x200/29746.png';

  return (
    <Card style={{ maxHeight: '300px', width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CardContent style={{padding: '20px'}}>
        <Typography variant="h5" component="div">
          Recently Added
        </Typography>
        <ul style={{ listStyle: 'none', padding: 0}}>
          <li style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
            <img src={ImageUrlVuzz} alt="Vuzz Mind" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
              <Typography>Vuzz Mind</Typography>
              <Typography>VUZZ</Typography>
              <Typography>$0.01976</Typography>
            </div>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
            <img src={ImageUrlTensorflow} alt="TensorSpace" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
              <Typography>TensorSpace</Typography>
              <Typography>TPU</Typography>
              <Typography>$0.0618</Typography>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default MainPageTable;
