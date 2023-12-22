import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs'; // Import the arrow icon

function Header() {

  
  const navigate = useNavigate(); // React Router's history object


  return (
    <>
     <Navbar bg="dark" data-bs-theme="dark" className="sticky-top">
        <button onClick={() => navigate(-1)} className="btn btn-link header-button">
            <BsArrowLeftCircleFill size={30} />
          </button>
        <Container className='navbar-container '>
         
          <Nav className="me-auto m-auto">
          <Navbar.Brand href="/"> 
          <img
              src='https://cryptologos.cc/logos/osmosis-osmo-logo.png'
              width="30"
              height="30"
              className="d-inline-block align-top header-img"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
            <Nav.Link href="/">Cryptocurrencies</Nav.Link>
            <Nav.Link href='/exchanges'>Exchanges</Nav.Link>
            <Nav.Link href="/rates">Rates</Nav.Link>
            <Nav.Link href="/nft">NFT</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  )
}

export default Header