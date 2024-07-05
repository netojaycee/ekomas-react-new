import React, { useContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/env";
import { toast } from "react-toastify";
import { useLoading } from "../../components/Context/LoadingContext";
import { BlogContext } from "../../components/Context/BlogContext";
import getToken from "../../components/hook/getToken";

export default function AddBlogs() {
  const {fetchBlog} = useContext(BlogContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const { setIsLoading } = useLoading();

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file }); // Update image in formData
  };

  // Function to handle other form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to upload file to Cloudinary
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db0zguvf");
    formData.append("folder", "Music Blog");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgz5bgdzc/auto/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Upload image to Cloudinary if an image is selected
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadFile(formData.image);
      }

      // Send data to backend endpoint
const token = getToken();
      const response = await axios.post(
        `${apiUrl}/blog/create`,
        {
          title: formData.title,
          description: formData.description,
          image: imageUrl, // Send image URL to backend
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setIsLoading(false);
      if (response.status === 200) {
        console.log("Blog uploaded successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          image: null,
        });
        toast.success("Blog uploaded successfully!");
        fetchBlog();
      } else {
        console.error("Error uploading blog:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload blog!");
    }
  };

  return (
    <>
      <div className=''>
      <h3 className='font-bold text-xl mb-3'>Create Blog</h3>
      <div className="bg-white shadow-md p-3 overflow-auto">
        <div className="flex flex-col gap-3 w-[65%] mx-auto mt-9">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col flex-1">
              <label htmlFor="name">Blog Title</label>
              <input
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                placeholder="Enter blog title"
                className="p-2 border border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Blog Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={formData.description}
                id="description"
                placeholder="Enter Blog description"
                className="p-2 border border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="image">Blog Image</label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/png"
                onChange={handleImageChange}
                className="p-2 border border-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <button className="p-2 bg-secondary text-white rounded-md">
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div></div>
    </>
  );
}
