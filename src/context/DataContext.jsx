// DataContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // const [combos, setCombos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("product/all-product");
        const categoriesResponse = await axios.get("category/all-category");

        // Convert products and categories to arrays if they are not already arrays
        const productsArray = Array.isArray(productsResponse.data.product)
          ? productsResponse.data.product
          : [];
        const categoriesArray = Array.isArray(categoriesResponse.data.category)
          ? categoriesResponse.data.category
          : [];
        // Set the state with the converted arrays
        console.log(categoriesArray)
        setProducts(productsArray);
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ products, categories }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
