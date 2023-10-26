import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// prendo il riferimento al div vuoto in public/index.html e creo a partire da esso un elemento "radice" di react
const root = ReactDOM.createRoot(document.getElementById('root'))

// su questo elemento radice, monto il PRIMO componente dell'"albero" di react, ovvero App
root.render(<App />)
