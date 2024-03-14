import React, { createContext, useState, useEffect } from 'react';
import { apiUrl } from '../../config/env';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [data, setdata] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get(`${apiUrl}/v1/products`);

    return response.data.data;

  };

  // const { data, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  // console.log(data);
  // useEffect(() => {
  //   // console.log("Product Data:", data);
  // }, [data]);

  useEffect(() => {
    // Fetch products from the backend endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/products`
        );

        console.log(response.data.data)
        if (response.status === 200) {
          const products = response.data;
          setdata(products.data);
        } else {
          console.error('Failed to fetch products from the backend');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <ProductContext.Provider value={{ data }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
