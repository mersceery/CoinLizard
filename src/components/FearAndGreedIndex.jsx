import React from 'react';
import { Card, CardMedia } from '@mui/material';

function FearAndGreedIndex() {
  const ImageUrlFearAndGreed = 'https://pbs.twimg.com/media/GIWssrEaYAAKWZQ.png';

  return (
    <Card style={{maxHeight: '300px'}}>
      <CardMedia
        component="img"
        src={ImageUrlFearAndGreed}
        alt="Fear and Greed Index"
      />
    </Card>
  );
}

export default FearAndGreedIndex;
