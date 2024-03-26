// Header.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import '../styles/Header.css'; // Import your CSS file for styling

function Header({ toggleDarkMode, isDarkMode }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="sticky-top">
        <button onClick={() => navigate(-1)} className="btn btn-link header-button">
          <BsArrowLeftCircleFill size={30} />
        </button>
        <Container className='navbar-container'>
          
          <Nav className="me-auto m-auto">
            <Navbar.Brand href="/"> 
              <img
                src='https://cryptologos.cc/logos/osmosis-osmo-logo.png'
                width="30"
                height="30"
                className="d-inline-block align-top header-img"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Nav.Link href="/">Cryptocurrencies</Nav.Link>
            <Nav.Link href='/exchanges'>Exchanges</Nav.Link>
            <Nav.Link href="/rates">Rates</Nav.Link>
            <Nav.Link href="/nft">NFT</Nav.Link>
            <Nav.Link href="/chat">Chat Room</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
          </Nav>
          <input
            type="checkbox"
            className="toggle"
            id="darkModeToggle"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="darkModeToggle" className="toggle-label">
            <div className="slider"></div>
            <span className="mode-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </label>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
