import React from 'react';
import { Card } from 'flowbite-react';

function MostVisitedTable() {
  const ImageUrlCatgirl = 'https://s2.coinmarketcap.com/static/img/coins/200x200/10275.png';
  const ImageUrlArtrade = 'https://s2.coinmarketcap.com/static/img/coins/200x200/19131.png';

  

  return (
    <>
      <Card className="max-w-sm p-0">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">👁️‍🗨️ Most Visited</h5>
          <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            More
          </a>
        </div>
        <div className="flow-root">
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-4">
              <div className="flex items-center space-x-10">
                <div className="shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full">
                  <img src={ImageUrlCatgirl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Catgirl</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CATGIRL</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-red-500 dark:text-white">📉 10.32%</div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-10">
                <div className="shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full">
                  <img src={ImageUrlArtrade} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Artrade</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ATR</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">
                📈 41.49%
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
}

export default MostVisitedTable;
