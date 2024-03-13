import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "../../../api/axios";
import { useLoading } from "../../../context/LoadingContext";

export default function AddCategory() {
  const [name, setName] = useState("");
  const { setIsLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        name: name,
      };
      console.log(data);
      const response = await axios.post("", data); // Assuming the backend endpoint for adding a song is '/song'

      console.log("Response from backend:", response.data);

      // Optionally, you can provide feedback to the user about the successful upload
      setIsLoading(false);
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      // Provide feedback to the user about the error, if needed
      alert("Failed to upload category. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Category
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Upload a category with its details.
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
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Upload Category
          </Button>
        </form>
      </Card>
    </div>
  );
}
