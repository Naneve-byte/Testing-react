import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import './index.css';
/* import UploadButton from './components/uploadbutton/ImageUpload';
import ImageUpload from './components/uploadbutton/ImageUpload'; */
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <hr />
      <footer className="text-black text-center fixed-bottom p-3" style={{ backgroundColor: 'rgba(237,237,237,255)' }}>
        <p style={{ fontWeight: 1000 }, { fontSize: 30 }}> Create By Nanang Dwi Febrianto</p>
      </footer>
    </div>
  );
}

export default App;
