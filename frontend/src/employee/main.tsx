import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import Home from './Home';

createRoot(document.getElementById('root')!).render( 
  <StrictMode>
    <Home/>
  </StrictMode>,
)
