import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/env";
import { useLoading } from "./LoadingContext";

export const WishContext = createContext();

const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);
 const { setIsLoading } = useLoading(true);
  useEffect(() => {
    const fetchWishItems = async () => {
      try {
        let token = localStorage.getItem("user");
        token = token.replace(/['"]+/g, "");
        // console.log(token)

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${apiUrl}/product/user-fav`, {
          headers,
        }); // Replace with your API endpoint

        console.log(response.data.favorites);
        localStorage.setItem(
          "wishlist",
          JSON.stringify(response.data.favorites)
        );
        const wishlist = localStorage.getItem("wishlist");
        setWish(JSON.parse(wishlist));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching wish items:", error);
      }
    };

    fetchWishItems();
  }, []); // Empty dependency array ensures thifect runs only once on component mount

  const addToWish = async (productId) => {
    try {
      setIsLoading(true)
      let token = localStorage.getItem("user");
      token = token.replace(/['"]+/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${apiUrl}/product/add-to-fav`,
        { favourite: productId },
        { headers }
      );

      localStorage.setItem("wishlist", JSON.stringify(response.data.favorites));
      const wishlist = localStorage.getItem("wishlist");
      setWish(JSON.parse(wishlist));
      setIsLoading(false)
    } catch (error) {
      console.error("Error adding to wish list:", error);
    }
  };

  const removeFromWish = async (productId) => {
    try {
      setIsLoading(true)
      let token = localStorage.getItem("user");
      token = token.replace(/['"]+/g, "");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${apiUrl}/product/remove-from-fav`,
        { productId },
        { headers }
      );
      // Replace with your API endpoint
      localStorage.setItem("wishlist", JSON.stringify(response.data.favorites));
      const wishlist = localStorage.getItem("wishlist");
      setWish(JSON.parse(wishlist));
      setIsLoading(false)
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
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishProvider;

// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../config/env";

// export const WishContext = createContext();

// const WishProvider = ({ children }) => {
//   const [wish, setWish] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWishItems = async () => {
//       try {
//         let token = localStorage.getItem("user");
//         token = token.replace(/['"]+/g, "");

//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         };

//         const response = await axios.get(`${apiUrl}/product/user-fav`, {
//           headers,
//         });
//         localStorage.setItem(
//           JSON.stringify(("wishlist", response.data.response))
//         );
//         const wishlist = localStorage.getItem(JSON.parse("wishlist"));
//         setWish(wishlist);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching wish items:", error);
//       }
//     };

//     fetchWishItems();
//   }, []); // Empty dependency array ensures this effect runs only once on component mount

//   const handleToggleFavorite = async (productId) => {
//     try {
//       let token = localStorage.getItem("user");
//       token = token.replace(/['"]+/g, "");
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.post(
//         `${apiUrl}/product/fav`,
//         { productId },
//         { headers }
//       );

//       localStorage.setItem(
//         JSON.stringify(("wishlist", response.data.response))
//       );
//       const wishlist = localStorage.getItem(JSON.parse("wishlist"));
//       setWish(wishlist);
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//     }
//   };

//   return (
//     <WishContext.Provider
//       value={{
//         wish,
//         handleToggleFavorite,
//         loading,
//       }}
//     >
//       {children}
//     </WishContext.Provider>
//   );
// };

// export default WishProvider;
