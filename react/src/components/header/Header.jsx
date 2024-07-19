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
    <Navbar expand="lg" className="custom-navbar">
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand href="#home">Sistem Prediksi Tumor Otak</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
            <Nav.Link >About Brain Tumor</Nav.Link>
            </LinkContainer>

            
            <Nav.Link href="#contact">Contact</Nav.Link>
            

            
            <Nav.Link href="#link">Link</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header