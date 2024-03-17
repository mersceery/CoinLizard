import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowGraph from './components/ShowGraph';
import Exchanges from './Pages/Exchanges';
import Rates from './Pages/Rates';
import TrendingPage from './Pages/TrendingPage';
import Nft from './Pages/Nft';
import ChatRoom from './Pages/ChatRoom';
import FavoritedCoins from './Pages/FavoritedCoins';
import News from './Pages/News';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route  index element={<App></App>} />
    <Route path='/:id' element={<ShowGraph></ShowGraph>} />
    <Route  path='/exchanges' element={<Exchanges></Exchanges>} />
    <Route  path='/rates' element={<Rates></Rates>} />
    <Route  path='/trending' element={<TrendingPage></TrendingPage>} />
    <Route  path='/nft' element={<Nft></Nft>} />
    <Route  path='/nft/:id' element={<Nft></Nft>} />
    <Route  path='/chat' element={<ChatRoom></ChatRoom>} />
    <Route  path='/favorited-coins' element={<FavoritedCoins></FavoritedCoins>} />
    <Route  path='/news' element={<News></News>} />

  </Routes>
  </BrowserRouter>
);

reportWebVitals();
