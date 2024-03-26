import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/env";
import { useLoading } from "./LoadingContext";
import AuthContext from "./AuthContext";

const storedWish = JSON.parse(localStorage.getItem("wishEkomas")) || [];

export const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [wish, setWish] = useState(storedWish);
  const { setIsLoading } = useLoading(true);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchWishItems = async () => {
      try {
        // Check if the user is logged in
        if (auth?.user) {
          let token = localStorage.getItem("user");
          token = token.replace(/['"]+/g, "");

          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${apiUrl}/product/user-fav`, {
            headers,
          }); // Replace with your API endpoint

          console.log("initial", response.data.favorites);
          localStorage.setItem(
            "wishEkomas",
            JSON.stringify(response.data.favorites)
          ); // Save cart data to local storage

          setWish(response.data.favorites);

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching wish items:", error);
      }
    };

    fetchWishItems();
  }, [auth?.user]); // Include auth.user in the dependency array

  useEffect(() => {
    localStorage.setItem("wishEkomas", JSON.stringify(wish)); // Save cart data to local storage
  }, [wish]);

  const addToWish = (data, _id) => {
    const newItem = { ...data };
    const wishItemIndex = wish.findIndex((item) => item._id === _id);

    if (wishItemIndex !== -1) {
      // If item already exists, remove it
      const newWish = [...wish];
      newWish.splice(wishItemIndex, 1);

      setWish(newWish);
      setIsWish(false);
      setPendingChanges(true);
    } else {
      // If item does not exist, add it

      const updatedWish = [...wish, newItem]; // Add the new item to the wishlist

      setWish(updatedWish);

      setIsWish(true);
      setPendingChanges(true);
    }
  };

  const removeFromWish = (_id) => {
    const newWish = wish.filter((item) => item._id !== _id);

    setWish(newWish);
    setIsWish(false);
    setPendingChanges(true);
  };

  useEffect(() => {
    // Synchronize with backend after a certain delay or on pending changes
    if (auth?.user) {
      const timer = setTimeout(() => {
        if (pendingChanges) {
          syncWithBackend();
          setPendingChanges(false); // Reset pending changes flag after synchronization
        }
      }, 2000); // Example: Synchronize every 2 seconds or adjust as needed

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [auth?.user, wish, pendingChanges]);

  const syncWithBackend = async () => {
    try {
      // Check if wish array is empty
      if (wish.length === 0) {
        // If wish array is empty, send an empty array to the backend
        const token = localStorage.getItem("user").replace(/['"]+/g, "");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
          `${apiUrl}/product/add-to-fav`,
          { favourites: [] },
          { headers }
        );

        setWish(response.data.favorites);
      } else {
        // If wish array is not empty, map the wish array to extract IDs
        const wishIds = wish.map((item) => item._id);

        const token = localStorage.getItem("user").replace(/['"]+/g, "");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
          `${apiUrl}/product/add-to-fav`,
          { favourites: wishIds },
          { headers }
        );

        setWish(response.data.favorites);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error synchronizing wishlist with backend:", error);
      setIsLoading(false);
    }
  };

  const clearWish = () => {
    setWish([]);
  };

  return (
    <WishContext.Provider
      value={{
        wish,
        addToWish,
        removeFromWish,
        clearWish,
        setIsWish,
        isWish,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishProvider;
