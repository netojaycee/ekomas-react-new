import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import axios from "axios";
// import { useDropzone } from 'react-dropzone';
import { useContext } from "react";
import { CategoryContext } from "../../components/Context/CategoryContext";
import { apiUrl } from "../../config/env";
import { Spinner } from "@material-tailwind/react";

export default function AddProduct() {
  //   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { categoriesData } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    image: null, // For file input
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "category") {
      setSelectedCategory(value);
    }

    if (files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURI = event.target.result;

        setFormData((prevData) => ({
          ...prevData,
          image: imageDataURI,
        }));
      };

      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    setIsLoading(true);
    const requestData = {
      name: formData.name,
      category_id: selectedCategory,
      description: formData.description,
      price: parseInt(formData.price),
      quantity: parseInt(formData.quantity),
      image: formData.image,
    }

    try {
      // You can use the fetch API or another method to send the form data to the backend
      const response = await axios.post(
        `${apiUrl}/v1/products`,
        requestData
      );

      console.log(response.data)
      console.log(response);
      
      setIsLoading(false)
      // Handle the response, e.g., show a success message
      if (response.status === 201) {
        console.log("Product uploaded successfully!");
        alert("Product uploaded successfully!");
        // Reset the form if needed
        setFormData({
          name: "",
          category_id: "",
          description: "",
          price: "",
          quantity: "",
          image: null,
        });

        setIsLoading(false);
        console.log(response.data);
        console.log(response);
      } else {
        console.error("Error uploading product:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminLayout>
        <div>
          <h1 className="text-2xl text-center text-secondary font-semibold mt-3">
            Upload New Product
          </h1>
          <div className="flex flex-col gap-3 w-[65%] mx-auto mt-9">
            {/* upload product form */}
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {/* product name and category */}
              <div className="flex gap-3 md:flex-row flex-col">
                <div className="flex flex-col flex-1">
                  <label htmlFor="name">Product Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
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
                    <option value="" disabled>Select category</option>
                    {Array.isArray(categoriesData) &&
                      categoriesData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* product description */}
              <div className="flex flex-col">
                <label htmlFor="description">Product Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  id="description"
                  placeholder="Enter product description"
                  className="p-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* product price and quantity */}
              <div className="flex gap-3 md:flex-row flex-col">
                <div className="flex flex-col flex-1">
                  <label htmlFor="price">Product Price</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    name="price"
                    id="price"
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
                    placeholder="Enter product quantity"
                    className="p-2 border border-gray-400 rounded-md"
                  />
                </div>
              </div>

              {/* product image */}
              {/* <div className='flex flex-col'>
            <label htmlFor='image'>Product Image</label>
            <div
              {...getRootProps({
                className: 'dropzone p-2 border border-gray-400 rounded-md',
              })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {acceptedFiles.length > 0 && (
              <div>
                <h4>Accepted files</h4>
                <ul>
                  {acceptedFiles.map((file) => (
                    <li key={file.path}>{file.path}</li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

              <div className="flex flex-col">
                <label htmlFor="image">Product Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                  className="p-2 border border-gray-400 rounded-md"
                />
              </div>

              {/* submit button */}
              <div className="flex flex-col">
                {isLoading && (
                  <div className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear">
                    <Spinner className="h-4 w-4" /> updating...
                  </div>
                )}
                {!isLoading && (
                  <button type='submit' className='flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear'>
                    Upload Product
                  </button>
                )}

              </div>
              {/* <div className="flex flex-col">
                <button className="p-2 bg-secondary text-white rounded-md">
                  Upload Product
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
