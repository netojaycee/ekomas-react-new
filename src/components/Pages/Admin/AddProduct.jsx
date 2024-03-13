import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "../../../api/axios";
import { useLoading } from "../../../context/LoadingContext";
// import DataContext from "../../Context/DataContext";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const { setIsLoading } = useLoading();
  // const { categories } = React.useContext(DataContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db0zguvf");
    formData.append("folder", "Music Blog"); // Optional: Specify a folder in Cloudinary for the uploaded files

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgz5bgdzc/auto/upload",

        formData
      );
      console.log(response.data.secure_url);

      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Cloudinary");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrl = image ? await uploadFile(image) : null;

      const data = {
        name: name,
        category: category,
        price: price,
        description: description,
        image: imageUrl,
      };
      console.log(data);
      const response = await axios.post("/product/create-product", data); // Assuming the backend endpoint for adding a song is '/song'

      console.log("Response from backend:", response.data);

      // Optionally, you can provide feedback to the user about the successful upload
      setIsLoading(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      // Provide feedback to the user about the error, if needed
      alert("Failed to upload product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Product
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Upload a product with its details.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter song name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product price
            </Typography>
            <Input
              size="lg"
              placeholder="Enter song name"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product description
            </Typography>
            <Input
              size="lg"
              placeholder="Enter song name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product category
            </Typography>
            <select
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/png"
              onChange={handleImageChange}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Upload Product
          </Button>
        </form>
      </Card>
    </div>
  );
}
