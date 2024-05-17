import React, { createContext, useState, useEffect } from "react";
import { apiUrl } from "../../config/env";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { toast } from "react-toastify";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blog, setblog] = useState([]);
  const { setIsLoading } = useLoading();

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${apiUrl}/blog/all-blogs`);
// console.log(response.data.blogs)
      if (response.status === 200) {
        const blogs = response.data.blogs;
        setblog(blogs);
        // console.log(blogs);
       
      } 
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  // Fetch blogs from the backend endpoint
  useEffect(() => {
    fetchBlog();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleDeleteBlog = async (blogId) => {
    const token = JSON.parse(localStorage.getItem("user"));
    setIsLoading(true);

    try {
      const response = await axios.delete(`${apiUrl}/blog/${blogId}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);

      toast.success("blog deleted successfully!");
      console.log(response);
      fetchBlog();
      //   if (response.message === true) {
      //     toast.success("Category deleted successfully!");
      //   }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  return (
    <BlogContext.Provider
      value={{ blog, handleDeleteBlog, fetchBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
