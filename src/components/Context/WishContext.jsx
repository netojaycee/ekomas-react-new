import React, { createContext, useEffect, useState } from "react";

export const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToWish = (data, id) => {
    const newItem = { ...data };
    const wishItemIndex = wish.findIndex((item) => item.id === id);

    if (wishItemIndex !== -1) {
      // If item already exists, remove it
      const newWish = [...wish];
      newWish.splice(wishItemIndex, 1);
      setWish(newWish);
      setIsFavorite(false);
    } else {
      // If item does not exist, add it
      setWish([...wish, newItem]);
      setIsFavorite(true);
    }
  };

  const removeFromWish = (id) => {
    const newWish = wish.filter((item) => item.id !== id);
    setWish(newWish);
    setIsFavorite(false);
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
        isFavorite,
        setIsFavorite,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishProvider;
