/**
 * PROJECT: Omni School System
 * FILE: main.jsx
 * DESCRIPTION: This is the starting point for React.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Junior tip: Make sure the ./ is there!
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)