import React, { useState } from "react";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import axios from "axios";
import { apiUrl } from "../../config/env";
// import { useDropzone } from 'react-dropzone';

export default function AddCategory() {
  //   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    
    image: null, // For file input
  });


const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const sessionToken = localStorage.getItem('sessionToken');
    // console.log(sessionToken);

    try {
        const response = await axios.post(
          `${apiUrl}/v1/categories`,
          {
            name: formData.name,
            description: formData.description,
            image: formData.image,
          },
          {
            headers: {
              'accept': '*/*',
              'Authorization': `Bearer ${sessionToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      
        // Handle the response, e.g., show a success message
        if (response.status === 201) {
          console.log('Category uploaded successfully!');
          // Reset the form if needed
          setFormData({
            name: '',
            description: '',
            image: null,
          });
        } else {
          console.error('Error uploading category:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
      

  return (
    <>
    <AdminLayout>
        <div>
      <h1 className="text-2xl text-center text-secondary font-semibold mt-3">
       Add New Category
      </h1>
      <div className="flex flex-col gap-3 w-[65%] mx-auto mt-9">
        {/* upload product form */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* product name and category */}
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
            <label htmlFor="description">Category Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              id="description"
              placeholder="Enter category description"
              className="p-2 border border-gray-400 rounded-md"
            />
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
            <label htmlFor="image">Category Image</label>
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
            <button className="p-2 bg-secondary text-white rounded-md">
              Add Category
            </button>
          </div>
        </form>
      </div>
      </div>
      </AdminLayout>

    </>
  );
}
