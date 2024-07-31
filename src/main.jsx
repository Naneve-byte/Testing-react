import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/Testing-react">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
