import React, { createContext, useState, useEffect } from "react";
import { useLoading } from "./LoadingContext";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const { setIsLoading } = useLoading();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/product/products');


      if (response.status === 200) {
        const products = response.data.products;
        // Save products to localStorage
        setData(products);
        setSearchResults("");
        // console.log("ggg", products);
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
    setIsLoading(true);

    try {
      const response = await axiosInstance.delete(`/product/${productId}`);

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

  const searchProducts = (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults(data);
      return;
    }
    const filteredProducts = data.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      //  ||
        // product.categoryId.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredProducts);
    console.log(filteredProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        data,
        discount,
        featured,
        topSelling,
        handleDeleteProduct,
        fetchProducts,
        searchProducts,
        searchResults,
        searchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
