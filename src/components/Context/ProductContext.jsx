import React, { createContext, useState, useEffect } from "react";
import { apiUrl } from "../../config/env";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { toast } from "react-toastify";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const { setIsLoading } = useLoading();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/product/products`);

      if (response.status === 200) {
        const products = response.data.products;
        setData(products);
        // console.log(products);
        // Filter featured products
        const featuredProducts = products.filter(
          (product) => product.featured === "yes"
        );
        setFeatured(featuredProducts);

        // Filter discounted products
        const discountedProducts = products.filter(
          (product) => product.discount > 0
        );
        setDiscount(discountedProducts);

        // Sort products by topSelling in descending order and export only the first 5
        const sortedTopSelling = products
          .sort((a, b) => b.topSell - a.topSell)
          .slice(0, 5);
        setTopSelling(sortedTopSelling);
      } else {
        console.error("Failed to fetch products from the backend");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // Fetch products from the backend endpoint
  useEffect(() => {
    fetchProducts();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleDeleteProduct = async (productId) => {
    const token = JSON.parse(localStorage.getItem("user"));
    setIsLoading(true);

    try {
      const response = await axios.delete(`${apiUrl}/product/${productId}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);

      toast.success("Product deleted successfully!");
      console.log(response);
      fetchProducts();
      //   if (response.message === true) {
      //     toast.success("Category deleted successfully!");
      //   }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <ProductContext.Provider
      value={{ data, discount, featured, topSelling, handleDeleteProduct, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
