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

function EditCategory({item}) {
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
      const token = JSON.parse(localStorage.getItem("user"));
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

  // Function to handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     // Upload image to Cloudinary if an image is selected
  //     let imageUrl = null;
  //     if (formData.image) {
  //       imageUrl = await uploadFile(formData.image);
  //     }

  //     // Send data to backend endpoint
  //     const token = JSON.parse(localStorage.getItem("user"));

  //     const response = await axios.post(
  //       `${apiUrl}/category/create-category`,
  //       {
  //         name: formData.name,
  //         image: imageUrl, // Send image URL to backend
  //       },
  //       {
  //         headers: {
  //           accept: "*/*",
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(response);
  //     setIsLoading(false);
  //     if (response.status === 200) {
  //       console.log("Category uploaded successfully!");
  //       // Reset form
  //       setFormData({
  //         name: "",
  //         image: null,
  //       });
  //       toast.success("Category uploaded successfully!");
  //     } else {
  //       console.error("Error uploading category:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Failed to upload category!");
  //   }
  // };

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   console.log("ddd");
  // };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        Edit
      </Button>

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

export default function AllCategory() {
  const { categoriesData, handleDeleteCategory } = useContext(CategoryContext);

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {" "}
      <h1 className="text-2xl text-center text-secondary font-semibold mt-3">
        All Categories Page
      </h1>
      <table className="w-[90%] mx-auto min-w-max table-auto text-center bg-white mt-3 overflow-visible">
        <thead>
          <tr className="border-2 border-blue-gray-200">
            {["Name", ""].map((head, index) => (
              <th key={index} className="text-secondary p-4">
                <Typography variant="small" className="font-bold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categoriesData) &&
            categoriesData.map((item, index) => {
              const isLast = index === categoriesData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={item.id}
                  className="border-2 border-blue-gray-200 text-center"
                >
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {item.name}
                    </Typography>
                  </td>
                  {/* <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {item.image}
                    </Typography>
                  </td> */}
                  {/* <td className="m-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[2%] h-[2%]"
                    />
                  </td> */}
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        className="mr-4"
                        onClick={() => handleDeleteCategory(item._id)}
                      >
                        Delete
                      </Button>
                      {/* <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClickEdit(item)}
                      > Edit </Button> */}
                      <EditCategory
                        open={openDialog}
                        handleOpen={setOpenDialog}
                        item={item}
                      />
                    </Typography>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
