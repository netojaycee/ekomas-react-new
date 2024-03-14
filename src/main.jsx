import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import { CartProvider } from './components/Context/CartContext.jsx'
// import { CategoryProvider } from './components/Context/CategoryContext.jsx'
// import { ProductProvider } from './components/Context/ProductContext.jsx'
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { apiUrl } from './config/env.js'

// const client = new ApolloClient({

//   uri: `${apiUrl}/query`,

//   cache: new InMemoryCache(),

// });
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 30 * 60 * 1000, // 30 minutes
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)