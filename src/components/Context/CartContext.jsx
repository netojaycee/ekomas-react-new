import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const storedCart = JSON.parse(localStorage.getItem("cartEkomas")) || [];

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(storedCart);
  const [itemAmount, setItemAmount] = useState(storedCart.reduce((acc, item) => acc + item.amount, 0));
  const [total, setTotal] = useState(storedCart.reduce((acc, item) => acc + item.price * item.amount, 0));

  useEffect(() => {
    setItemAmount(cart.reduce((acc, item) => acc + item.amount, 0));
    setTotal(cart.reduce((acc, item) => acc + item.price * item.amount, 0));
    localStorage.setItem("cartEkomas", JSON.stringify(cart)); // Save cart data to local storage
  }, [cart]);

  
  const addToCart = (data, _id, quantityToAdd = 1) => {
    const cartItem = cart.find((item) => item._id === _id);
    const availableQuantity = data.quantity; // Assuming your product data has a 'quantity' property
  
    if (cartItem) {
      // If the item is already in the cart, increase the amount if it's less than available stock
      if (cartItem.amount + quantityToAdd <= availableQuantity) {
        increaseAmount(_id);
        toast.success(`${data.name} quantity increased in the cart!`); // Success toast for existing item
      } else {
        toast.error(`Cannot add more than ${availableQuantity} items of this product.`);
      }
    } else {
      // If the item is not in the cart, check if adding this amount exceeds available stock
      if (quantityToAdd <= availableQuantity) {
        const newItem = { ...data, amount: quantityToAdd };
        setCart([...cart, newItem]);
        toast.success(`${data.name} added to cart!`); // Success toast for new item
      } else {
        toast.error(`Cannot add more than ${availableQuantity} items of this product.`);
      }
    }
  };
  

  const removeFromCart = (_id) => {
    const newCart = cart.filter((item) => item._id !== _id);
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
    const cartItem = cart.find((item) => item._id === _id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        const newCart = cart.map((item) => {
          if (item._id === _id) {
            return { ...item, amount: cartItem.amount - 1 };
          }
          return item;
        });
        setCart(newCart);
      } else {
        removeFromCart(_id);
      }
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
