import React from 'react';
import { Card } from 'flowbite-react';

function FearAndGreenIndex() {
  const ImageUrlFearAndGreed = 'https://pbs.twimg.com/media/GIWssrEaYAAKWZQ.png';

  return (
    <>
      <Card className="">
        
          <img
            src={ImageUrlFearAndGreed}
            alt="Profile"
            className="w-full h-full object-fill"
          />
        
      </Card>
    </>
  );
}

export default FearAndGreenIndex;
