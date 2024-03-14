import React, { createContext, useState, useEffect } from "react";
import { apiUrl } from "../../config/env";
import axios from "axios";



const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);


 
  // const fetchCartData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${apiUrl}/v1/products`
  //     );

  //     if (response.status === 200) {
  //       const data = response.data;
  //     console.log(data)
  //     setdata(data.cart);
  //     } else {
  //       console.error('Failed to fetch carts from the backend');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  const fetchCartData = async () => {
    try {
      // Fetch cart data from your external endpoint
      const response = await axios.get(`${apiUrl}/v1/cart`);
      setCart(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      // Send a request to add to the cart on your external server
      await axios.post(`${apiUrl}/v1/cart/add`, { productId });

      // Update the cart state
      fetchCartData();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Send a request to remove from the cart on your external server
      await axios.post(`${apiUrl}/v1/cart/remove`, { productId });

      // Update the cart state
      const newCart = [...cart].filter((item) => item.productId !== productId);
      setCart(newCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // useEffect(() => {
  //   fetchCartData(); // Fetch cart data when the component mounts
  // }, []);

  // useEffect(() => {
  //   const total = cart.reduce((accumulator, currentItem) => {
  //     return accumulator + currentItem.price * currentItem.amount;
  //   }, 0);
  //   setTotal(total);
  // }, [cart]);

  // useEffect(() => {
  //   if (cart) {
  //     const amount = cart.reduce((accumulator, currentItem) => {
  //       return accumulator + currentItem.amount;
  //     }, 0);
  //     setItemAmount(amount);
  //   }
  // }, [cart]);


  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (productId) => {
    const cartItem = cart.find((item) => item.id === parseInt(productId));
    
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === parseInt(id)) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
  
      setCart(newCart);
    }
  };

  const decreaseAmount = (productId) => {
    const cartItem = cart.find((item) => item.id === parseInt(productId));
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === parseInt(id)) {
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
export { CartContext, CartProvider };
