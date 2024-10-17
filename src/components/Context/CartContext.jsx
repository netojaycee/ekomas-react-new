import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const storedCart = JSON.parse(localStorage.getItem("cartEkomas")) || [];

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(storedCart);
  const [itemAmount, setItemAmount] = useState(
    storedCart.reduce((acc, item) => acc + item.amount, 0)
  );
  const [total, setTotal] = useState(
    storedCart.reduce((acc, item) => acc + item.price * item.amount, 0)
  );

  useEffect(() => {
    setItemAmount(cart.reduce((acc, item) => acc + item.amount, 0));
    setTotal(cart.reduce((acc, item) => acc + item.price * item.amount, 0));
    localStorage.setItem("cartEkomas", JSON.stringify(cart)); // Save cart data to local storage
  }, [cart]);

  const increaseAmount = (_id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === _id
          ? { ...item, amount: item.amount + 1 } // Increase amount here
          : item
      );

      // Find the item to display in the toast
      const updatedItem = updatedCart.find((item) => item._id === _id);
      if (updatedItem) {
        toast.success(`${updatedItem.name} quantity increased in the cart!`); // Add toast here if needed
      }
      return updatedCart;
    });
  };

  // Inside addToCart
  const addToCart = (data, _id, quantityToAdd = 1) => {
    const cartItem = cart.find((item) => item._id === _id);
    const availableQuantity = data.quantity;

    if (cartItem) {
      // Check if we can increase the quantity of an existing item
      if (cartItem.amount + quantityToAdd <= availableQuantity) {
        increaseAmount(_id); // Call to increase amount
        // You can choose to remove this toast from here if you are adding it in increaseAmount
      } else {
        toast.error(
          `Cannot add more than ${availableQuantity} items of this product.`
        );
      }
    } else {
      // Check if we can add a new item
      if (quantityToAdd <= availableQuantity) {
        const newItem = { ...data, amount: quantityToAdd };
        setCart((prevCart) => [...prevCart, newItem]);
        toast.success(`${data.name} added to cart!`);
      } else {
        toast.error(
          `Cannot add more than ${availableQuantity} items of this product.`
        );
      }
    }
  };

  const removeFromCart = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    const newCart = cart.filter((item) => item._id !== _id);
    setCart(newCart);
    toast.success(`${cartItem.name} removed from cart!`); // Notification
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cartEkomas");
    toast.success("Cart cleared!"); // Notification
  };

  const decreaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === _id ? { ...item, amount: item.amount - 1 } : item
          )
        );
        toast.success(`Decreased quantity of ${cartItem.name}!`); // Notification
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
