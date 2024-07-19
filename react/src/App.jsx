import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import About from "./components/about/About"
import UploadButton from "./components/uploadbutton/ImageUpload"
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ImageUpload from "./components/uploadbutton/ImageUpload"
import './App.css';
function App() {
 

  return (
    <>
      <div className="App">
        <Router>
        <Header/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        </Routes>
        
        </Router>
        
        <hr></hr>
        <div className="footer-copyright text-center py-3 bg-secondary shadow-1-strong" >
        <p> Create By Nanang Dwi Febrianto</p>
        </div>
        
      </div>
    </>
  )
}

export default App
