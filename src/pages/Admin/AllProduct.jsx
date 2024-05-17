import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { apiUrl } from "../../config/env";
import { ProductContext } from "../../components/Context/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CategoryContext } from "../../components/Context/CategoryContext";
import { useLoading } from "../../components/Context/LoadingContext";
import { toast } from "react-toastify";
import { Table } from "antd";

function EditProduct({ item }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    categoryId: item.categoryId,
    description: item.description,
    price: item.price,
    quantity: item.quantity,
    featured: item.featured,
    discount: item.discount,
    image: item.image,
    newImage: null,
  });

  const handleOpen = () => setOpen(!open);
  const { setIsLoading } = useLoading();
  const { categoriesData } = useContext(CategoryContext);
  const { fetchProducts } = useContext(ProductContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, newImage: file }); // Track the new image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.image; // Use existing image URL by default

      // If a new image is selected, upload it to Cloudinary
      if (formData.newImage) {
        imageUrl = await uploadFile(formData.newImage);
      }
      const requestData = {
        name: formData.name,
        categoryId: formData.category,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        featured: formData.featured,
        discount: formData.discount,
        image: imageUrl,
      };

      // console.log(requestData)

      // Send data to backend endpoint
      const token = JSON.parse(localStorage.getItem("user"));
      const response = await axios.patch(
        `${apiUrl}/product/${item._id}`, // Assuming the endpoint for editing exists
        {
          name: formData.name,
          categoryId: formData.category,
          description: formData.description,
          price: formData.price,
          quantity: formData.quantity,
          featured: formData.featured,
          discount: formData.discount,
          image: imageUrl,
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      if (response.status === 200) {
        console.log("Product updated successfully!");
        toast.success("Product updated successfully!");
        fetchProducts();
      } else {
        console.error("Error updating product:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);

      console.error("Error:", error);
      toast.error("Failed to update product!");
    }
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

  return (
    <>
      <FontAwesomeIcon
        icon={faPencil}
        className="cursor-pointer"
        onClick={handleOpen}
      />

      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="p-3">
          {/* <div className="flex justify-between items-center">
            <Typography
              variant="h5"
              className="font-semibold font-serif"
              color="blue-gray"
            >
              Order Management
            </Typography>
            <FontAwesomeIcon
              icon={faXmarkCircle}
              size="xl"
              className="cursor-pointer mr-5"
              onClick={handleOpen}
            />
          </div> */}
          <div>
            <h1 className="text-2xl text-center text-secondary font-semibold mt-2">
              Upload New Product
            </h1>
            <div className="flex flex-col gap-2 w-[80%] mx-auto mt-2">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex gap-2 md:flex-row flex-col items-center">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="name">Product Name</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      placeholder="Enter product name"
                      className="p-1 border border-gray-400 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="category">Product Category</label>
                    <select
                      name="category"
                      onChange={handleChange}
                      value={formData.category}
                      id="category"
                      className="p-1 border border-gray-400 rounded-md"
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
                      className="p-1 border border-gray-400 rounded-md"
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
                      className="p-1 border border-gray-400 rounded-md"
                    />
                  </div>
                  {/* <div className="flex flex-col flex-1">
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
                      <option value="10">10%</option>
                      <option value="20">20%</option>
                      <option value="40">40%</option>
                      <option value="50">50%</option>
                      <option value="60">60%</option>
                      <option value="70">70%</option>
                    </select>
                  </div> */}
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
                <div className="flex flex-col i">
                  <button
                    type="submit"
                    className="flex items-center flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear"
                  >
                    Upload Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default function AllProduct() {
  const { data, handleDeleteProduct } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="" className="w-8 h-8" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },
    {
      title: "Status",
      dataIndex: "inStock",
      key: "status",
      render: (text) => (
        <Typography variant="small">
          {text === true ? "In Stock" : "Out of Stock"}
        </Typography>
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (item) => (
        <div className="flex justify-between items-center">
          <EditProduct
            open={openDialog}
            handleOpen={setOpenDialog}
            item={item} // Pass current category data to EditCategory
          />
          <FontAwesomeIcon
            onClick={() => handleDeleteProduct(item._id)}
            icon={faTrash}
            style={{ color: "red"}}
            className="cursor-pointer"
            size="lg"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="">
        <h3 className="font-bold text-xl mb-3">All Products Page</h3>
        <div className="bg-white shadow-md p-3 overflow-auto">
          <Table  size="small" x={true}  columns={columns} dataSource={data} />
        </div>
      </div>

      {/* <table className="w-[90%] mx-auto min-w-max table-auto text-center bg-white mt-3">
        <thead>
          <tr className="border-2 border-blue-gray-200">
            {["Name", "Image", "Price", ""].map((head, index) => (
              <th key={index} className="text-secondary p-4">
                <Typography variant="small" className="font-bold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-2 border-blue-gray-200">
              <td className="p-4">
                <Typography variant="small" className="font-normal">
                  {item.name}
                </Typography>
              </td>

              <td className="p-4">
                <Typography variant="small" className="font-normal">
                  <img
                    src={item.image} // Assuming the first image is the one to display
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" className="font-normal">
                  {item.price}
                </Typography>
              </td>
              <td className="p-4x flex justify-center items-center  gap-2 mt-8 ">
                <Typography variant="small" className="font-normal">
                  <EditProduct
                    open={openDialog}
                    handleOpen={setOpenDialog}
                    item={item}
                  />
                </Typography>
                <Typography variant="small" className="font-normal">
                  <button>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "red" }}
                      onClick={() => handleDeleteProduct(item._id)}
                    />
                  </button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}
