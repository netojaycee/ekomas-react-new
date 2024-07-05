import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Dialog,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { CategoryContext } from "../../components/Context/CategoryContext";
import { apiUrl } from "../../config/env";
import { toast } from "react-toastify";
import { useLoading } from "../../components/Context/LoadingContext";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import getToken from "../../components/hook/getToken";

function EditCategory({ item }) {
  const [open, setOpen] = React.useState(false);
  const { categoriesData, fetchData } = useContext(CategoryContext);

  const [formData, setFormData] = useState({
    name: item.name,
    image: item.image,
    newImage: null, // Track the new image
  });

  const handleOpen = () => setOpen(!open);
  const { setIsLoading } = useLoading();

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

      // Send data to backend endpoint
      const token = getToken();
      const response = await axios.patch(
        `${apiUrl}/category/${item._id}`, // Assuming the endpoint for editing exists
        {
          name: formData.name,
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
        console.log("Category updated successfully!");
        toast.success("Category updated successfully!");
        fetchData();
      } else {
        console.error("Error updating category:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update category!");
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
        onClick={() => handleOpen}
        icon={faPencilAlt}
        // style={{ color: "red"}}
        className="cursor-pointer"
        size="lg"
      />

      <Dialog open={open} handler={handleOpen}>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit Category
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Edit the category details.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Category Name
            </Typography>
            <input
              label="Name"
              size="lg"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />

            <div className="flex flex-col">
              <label htmlFor="image">Category Image</label>
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
            <button
              onClick={handleSubmit}
              className="bg-secondary w-full text-white px-3 py-2"
            >
              Save Changes
            </button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

function AllCategory() {
  const { categoriesData, handleDeleteCategory } = useContext(CategoryContext);
  const [openDialog, setOpenDialog] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (item) => (
        <div className="flex items-center gap-6">
          <EditCategory
            open={openDialog}
            handleOpen={setOpenDialog}
            item={item} // Pass current category data to EditCategory
          />

          <FontAwesomeIcon
            onClick={() => handleDeleteCategory(item._id)}
            icon={faTrash}
            style={{ color: "red" }}
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
        <h3 className="font-bold text-xl mb-3">All Categories Page</h3>
        <div className="bg-white shadow-md p-3 overflow-auto">
          <Table columns={columns} dataSource={categoriesData} />
        </div>
      </div>
    </>
  );
}

export default AllCategory;
