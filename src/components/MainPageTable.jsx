import React from 'react';
import { Card } from 'flowbite-react';

function MainPageTable() {
  const ImageUrlVuzz = 'https://pbs.twimg.com/profile_images/1728342723076239360/vNS7GKk2_400x400.jpg';
  const ImageUrlTensorflow = 'https://s2.coinmarketcap.com/static/img/coins/200x200/29746.png';

  

  return (
    <>
      <Card className="max-w-sm p-0">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Recently Added</h5>
          <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            More
          </a>
        </div>
        <div className="flow-root">
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full">
                  <img src={ImageUrlVuzz} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Vuzz Mind</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">VUZZ</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$0.01976</div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full">
                  <img src={ImageUrlTensorflow} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TensorSpace</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">TPU</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $0.0618
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
}

export default MainPageTable;
