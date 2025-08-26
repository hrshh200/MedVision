import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


import App from './App.jsx'
import './index.css'

export const baseURL = 'https://medvision-szb6.onrender.com/api';
// export const baseURL = 'http://localhost:5001/api';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
  </BrowserRouter>
)
