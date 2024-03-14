import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../config/env';


const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/gories`
        );


        if (response.status === 200) {
          const categories = response.data.data;
          console.log(categories);
          setCategoriesData(categories);
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <CategoryContext.Provider value={{ categoriesData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
