import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishItems = async () => {
      try {
        const response = await axios.get("/api/wishlist"); // Replace with your API endpoint
        setWish(response.data.wishItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wish items:", error);
      }
    };

    fetchWishItems();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const addToWish = async (productId) => {
    try {
      const response = await axios.post("/api/wishlist/add", { productId }); // Replace with your API endpoint
      setWish(response.data.wishItems);
    } catch (error) {
      console.error("Error adding to wish list:", error);
    }
  };

  const removeFromWish = async (productId) => {
    try {
      const response = await axios.post("/api/wishlist/remove", { productId }); // Replace with your API endpoint
      setWish(response.data.wishItems);
    } catch (error) {
      console.error("Error removing from wish list:", error);
    }
  };

  const clearWish = async () => {
    try {
      const response = await axios.post("/api/wishlist/clear"); // Replace with your API endpoint
      setWish(response.data.wishItems);
    } catch (error) {
      console.error("Error clearing wish list:", error);
    }
  };

  return (
    <WishContext.Provider
      value={{
        wish,
        addToWish,
        removeFromWish,
        clearWish,
        loading,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishProvider;
