import React, { useContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/env";
import { toast } from "react-toastify";
import { useLoading } from "../../components/Context/LoadingContext";
import { CategoryContext } from "../../components/Context/CategoryContext";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const { setIsLoading } = useLoading();
  const { fetchData } = useContext(CategoryContext);

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
      const token = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
        `${apiUrl}/category/create-category`,
        {
          name: formData.name,
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
        console.log("Category uploaded successfully!");
        // Reset form
        setFormData({
          name: "",
          image: null,
        });
        toast.success("Category uploaded successfully!");
        fetchData();
      } else {
        console.error("Error uploading category:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload category!");
    }
  };

  return (
    <>
      <div className="">
        <h1 className="text-2xl text-center text-secondary font-semibold mt-3">
          Add New Category
        </h1>
        <div className="flex flex-col gap-3 w-[65%] mx-auto mt-9">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex gap-3 md:flex-row flex-col">
              <div className="flex flex-col flex-1">
                <label htmlFor="name">Category Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter category name"
                  className="p-2 border border-gray-400 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="image">Category Image</label>
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
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
