import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/HomeTabs.css";


function HomeTabs() {
  return (
    <nav>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" exact to="/">
            Cryptocurrencies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/trending">
            Trending
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/favorited-coins">
            Favorite
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HomeTabs;
