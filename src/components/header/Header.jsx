import React from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import YourSvg from '../../assets/brain-svgrepo-com.svg';

function Header() {
  return (
    <Navbar expand="lg" bg="myColor">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home" className="logo">

            <img src={YourSvg} alt="logo" width="30" height="30" />
            {' '}
            Sistem Prediksi Tumor Otak
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto">

            <LinkContainer to="/">
              <Nav.Link className="navbar-link">Home</Nav.Link>
            </LinkContainer>

            <Nav.Link className="navbar-link" href="https://en.wikipedia.org/wiki/Brain_tumor">About Brain Tumor</Nav.Link>

            <LinkContainer to="/about">
              <Nav.Link className="navbar-link">Blog</Nav.Link>
            </LinkContainer>

            <Nav.Link className="navbar-link" href="https://github.com/Naneve-byte">G</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
