import React, { useContext, useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { CategoryContext } from "../Context/CategoryContext";

export default function EditProductDialog({
  isOpen,
  handleClose,
  data,
  handleEditProduct,
}) {
  const { categoriesData } = useContext(CategoryContext);

  const [formData, setFormData] = useState({
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || "",
    quantity: data?.quantity || "",
    image: data?.image || null, // For file input

    // Add other form fields if needed
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataUri = event.target.result;

        setFormData((prevData) => ({
          ...prevData,
          [name]: `data:${files[0].type};base64,${btoa(dataUri)}`,
        }));
      };

      // Read the contents of the image file as a data URI
      reader.readAsBinaryString(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleEdit = () => {
    // Perform validation if needed

    // Call the parent component's handleEditProduct function with the updated data
    handleEditProduct(formData);
    handleClose();
  };

  return (
    <Dialog
      size="xs"
      open={isOpen}
      handler={handleClose}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit Product
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            Edit the Product details.
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Product Name
          </Typography>
          <Input
            label="Name"
            size="lg"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <Typography className="-mb-2" variant="h6">
            Product Description
          </Typography>
          <Input
            label="Description"
            size="lg"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
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
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
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
        </CardBody>
        <CardFooter className="pt-0">
        <button onClick={handleEdit} className='bg-secondary w-full text-white px-3 py-2'>
            Save Changes
          </button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
