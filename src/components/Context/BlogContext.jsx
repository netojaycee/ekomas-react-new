import React, { createContext, useState, useEffect } from "react";
import { apiUrl } from "../../config/env";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { toast } from "react-toastify";
import getToken from "../hook/getToken";
import { useNavigate } from "react-router-dom";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${apiUrl}/blog/all-blogs`);

      if (response.status === 200) {
        const blogs = response.data.blogs;
        setBlog(blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    const token = getToken(); // Get token from localStorage
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

      if (response.status === 200) {
        toast.success("Blog deleted successfully!");
        fetchBlog();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

 
  return (
    <BlogContext.Provider value={{ blog, handleDeleteBlog, fetchBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
