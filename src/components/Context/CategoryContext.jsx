import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiUrl } from "../../config/env";
import { toast } from "react-toastify";
import { useLoading } from "./LoadingContext";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const { setIsLoading } = useLoading();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/category/all-category`);

      if (response.status === 200) {
        const categories = response.data.category;
        localStorage.setItem("categories", JSON.stringify(categories));

        // console.log(categories);
        setCategoriesData(categories);
      } else {
        console.error("Error fetching categories:", response.statusText);
        const storedCategories = localStorage.getItem("categories");
        if (storedCategories) {
          const categories = JSON.parse(storedCategories);
          setCategoriesData(categories);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const storedCategories = localStorage.getItem("categories");
      if (storedCategories) {
        const categories = JSON.parse(storedCategories);
        setCategoriesData(categories);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const handleDeleteCategory = async (categoryId) => {
    const token = JSON.parse(localStorage.getItem("user"));
    setIsLoading(true);

    try {
      const response = await axios.delete(`${apiUrl}/category/${categoryId}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);

      toast.success("Category deleted successfully!");
      // console.log(response);
      fetchData();
      //   if (response.message === true) {
      //     toast.success("Category deleted successfully!");
      //   }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categoriesData, handleDeleteCategory, fetchData }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
