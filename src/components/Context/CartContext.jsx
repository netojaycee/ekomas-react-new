import React, { createContext, useEffect, useState } from "react";

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];


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
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart data to local storage
    }
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.amount;
    }, 0);
    setTotal(total);
  }, [cart]);



  const addToCart = (data, id) => {
    const newItem = { ...data, amount: 1 };
    // check if item already exists
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    // if cart item exists
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
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
  console.log(cart);

  const removeFromCart = (id) => {
    const newCart = [...cart].filter((item) => item.id !== id);
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
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
