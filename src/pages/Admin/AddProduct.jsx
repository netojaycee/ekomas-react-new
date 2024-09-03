import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { CategoryContext } from "../../components/Context/CategoryContext";
import { useLoading } from "../../components/Context/LoadingContext";
import { toast } from "react-toastify";
import { ProductContext } from "../../components/Context/ProductContext";
import axiosInstance from "../../config/axiosInstance";

export default function AddProduct() {
  const { categoriesData } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
    featured: "no", // Empty string initially
    discount: "0",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const { setIsLoading } = useLoading();
  const { fetchProducts } = useContext(ProductContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "category") {
      setSelectedCategory(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = null;
    if (formData.image) {
      imageUrl = await uploadFile(formData.image);
    }

    const requestData = {
      name: formData.name,
      categoryId: selectedCategory,
      description: formData.description,
      price: parseInt(formData.price),
      quantity: parseInt(formData.quantity),
      image: imageUrl,
      featured: formData.featured, // Include featured in requestData
      discount: parseInt(formData.discount), // Parse discount to int
    };

    try {
      const response = await axiosInstance.post("/product/create", {
        name: formData.name,
        categoryId: selectedCategory,
        description: formData.description,
        price: parseInt(formData.price),
        quantity: parseInt(formData.quantity),
        image: imageUrl,
        featured: formData.featured, // Include featured in requestData
        discount: parseInt(formData.discount),
      });

      setIsLoading(false);
      // console.log(response);

      if (response.status === 200) {
        toast.success("Product uploaded successfully!");
        fetchProducts();
        setFormData({
          name: "",
          categoryId: "", // Reset category to empty string
          description: "",
          price: "",
          quantity: "",
          image: null,
          featured: "no", // Reset featured to empty string
          discount: "0",
        });
      }
    } catch (error) {
      setIsLoading(false);

      toast.error("Failed to upload product!");
      // console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="">
        <h3 className="font-bold text-xl mb-3">Create product</h3>
        <div className="bg-white shadow-md p-3 overflow-auto">
          <div className="flex flex-col gap-3 w-[65%] mx-auto mt-9">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex gap-3 md:flex-row flex-col">
                <div className="flex flex-col flex-1">
                  <label htmlFor="name">Product Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    placeholder="Enter product name"
                    className="p-2 border border-gray-400 rounded-md"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="category">Product Category</label>
                  <select
                    name="category"
                    onChange={handleChange}
                    value={selectedCategory}
                    id="category"
                    className="p-2 border border-gray-400 rounded-md"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {Array.isArray(categoriesData) &&
                      categoriesData.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description">Product Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  id="description"
                  placeholder="Enter product description"
                  className="p-2 border border-gray-400 rounded-md"
                />
              </div>

              <div className="flex gap-3 md:flex-row flex-col">
                <div className="flex flex-col flex-1">
                  <label htmlFor="price">Product Price</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    placeholder="Enter product price"
                    className="p-2 border border-gray-400 rounded-md"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="quantity">Product Quantity</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    placeholder="Enter product quantity"
                    className="p-2 border border-gray-400 rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="image">Product Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  className="p-2 border border-gray-400 rounded-md"
                />
              </div>
              <div className="flex gap-3 md:flex-row flex-col items-center">
                <div className="flex flex-col flex-1 w-1/2">
                  <label htmlFor="quantity">Discount</label>
                  <select
                    name="discount"
                    id="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="py-2 w-full rounded-md border-gray-400 border px-4"
                  >
                    <option value="" disabled>
                      Select discount
                    </option>
                    <option value="0">No discount</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="image">Featured</label>
                  <select
                    name="featured"
                    id="featured"
                    value={formData.featured}
                    onChange={handleChange}
                    className="py-2 w-full rounded-md border-gray-400 border px-4"
                  >
                    <option value="" disabled>
                      Select featured
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              {/* submit button */}
              <div className="flex flex-col ">
                <button
                  type="submit"
                  className="flex items-center flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear"
                >
                  Upload Product
                </button>
              </div>
              {/* <div className="flex flex-col">
                <button className="p-2 bg-secondary text-white rounded-md">
                  Upload Product
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
