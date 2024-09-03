import React, { createContext, useState, useEffect } from "react";
import { useLoading } from "./LoadingContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const response = await axiosInstance.get("/blog/all-blogs");

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
    setIsLoading(true);

    try {
      const response = await axiosInstance.delete(`/blog/${blogId}`);

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
