import React, { createContext, useEffect, useState } from "react";

const storedCart = JSON.parse(localStorage.getItem("cartEkomas")) || [];

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(storedCart);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
      setItemAmount(amount);
      localStorage.setItem("cartEkomas", JSON.stringify(cart)); // Save cart data to local storage
    }
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // const addToCart = (data, _id, quantityToAdd = 1) => {
  //   const newItem = { ...data, amount: quantityToAdd };

  //   // Check if item already exists in the cart
  //   const existingItemIndex = cart.findIndex((item) => item._id === _id);

  //   if (existingItemIndex !== -1) {
  //     // If item exists, update the quantity
  //     const newCart = [...cart];
  //     newCart[existingItemIndex].amount += quantityToAdd;
  //     setCart(newCart);
  //   } else {
  //     // If item doesn't exist, add it to the cart
  //     setCart([...cart, newItem]);
  //   }
  // };

  const addToCart = (data, _id, quantityToAdd = 1) => {
    const newItem = { ...data, amount: quantityToAdd };
    // check if item already exists
    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    // if cart item exists
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount + quantityToAdd };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
    // console.log(cartItem);
  };
  // console.log(cart);

  const removeFromCart = (_id) => {
    const newCart = [...cart].filter((item) => item._id !== _id);
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cartEkomas");
  };

  const increaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    addToCart(cartItem, _id, 1);
  };

  const decreaseAmount = (_id) => {
    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(_id);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
