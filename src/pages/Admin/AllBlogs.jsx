import React, { useContext, useState } from "react";
import axios from "axios";
import { CardBody, CardFooter, Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { apiUrl } from "../../config/env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLoading } from "../../components/Context/LoadingContext";
import { toast } from "react-toastify";
import { Card, Table } from "antd";
import { BlogContext } from "../../components/Context/BlogContext";
import getToken from "../../components/hook/getToken";

function EditBlog({ item }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    image: item.image,
    newImage: null,
  });

  const handleOpen = () => setOpen(!open);
  const { setIsLoading } = useLoading();
  const { fetchBlog } = useContext(BlogContext);

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

      const token = getToken();
      const response = await axios.patch(
        `${apiUrl}/blog/${item._id}`, // Assuming the endpoint for editing exists
        {
          title: formData.title,
          description: formData.description,

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
        console.log("Blogs updated successfully!");
        toast.success("Blogs updated successfully!");
        fetchBlog();
      } else {
        console.error("Error updating Blogs:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);

      console.error("Error:", error);
      toast.error("Failed to update Blogs!");
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
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit Blog
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Edit the blog details.
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Blog Title
              </Typography>
              <input
                label="Title"
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
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
        </DialogBody>
      </Dialog>
    </>
  );
}

export default function AllBlogs() {
  const { blog, handleDeleteBlog } = useContext(BlogContext);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (item) => (
        <div className="flex justify-between items-center">
          <EditBlog
            open={openDialog}
            handleOpen={setOpenDialog}
            item={item} // Pass current category data to EditCategory
          />
          <FontAwesomeIcon
            onClick={() => handleDeleteBlog(item._id)}
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
        <h3 className="font-bold text-xl mb-3">All Blogs Page</h3>
        <div className="bg-white shadow-md p-3 overflow-auto">
          <Table size="small" columns={columns} dataSource={blog} />
        </div>
      </div>
    </>
  );
}
