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
        <div className="main-content ">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <hr />
      <footer className="fixed-bottom" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <p className="text-light fs-4">© 2024 Create By : Nanang Dwi Febrianto</p>
        </div>

      </footer>

    </div>
  );
}

export default App;
