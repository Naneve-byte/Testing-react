import React from 'react'
import "./header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'



const Header = () => {
  return (
    <div>
    <Navbar expand="lg" className="custom-navbar " >
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand  href="#home"><img src='/brain-svgrepo-com.svg' alt='logo' width="30" height="30"/>{' '}Sistem Prediksi Tumor Otak</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " >
          <Nav className="ms-auto justify-content-between">
            <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            
            <Nav.Link href='https://en.wikipedia.org/wiki/Brain_tumor'>About Brain Tumor</Nav.Link>
            

            <LinkContainer to="/about">
            <Nav.Link >Blog</Nav.Link>
            </LinkContainer>
            
  
            <Nav.Link href='https://github.com/Naneve-byte'>G</Nav.Link>
    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header