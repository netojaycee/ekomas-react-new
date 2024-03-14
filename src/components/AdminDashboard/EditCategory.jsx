import React, { useState } from 'react';
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

export default function EditDialog({
  isOpen,
  handleClose,
  categoryData,
  handleEditCategory,
}) {
  const [formData, setFormData] = useState({
    name: categoryData?.name || '',
    description: categoryData?.description || '',
    image: categoryData?.image || null, // For file input
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

  const handleEdit = () => {
    // Perform validation if needed

    // Call the parent component's handleEditCategory function with the updated data
    handleEditCategory(formData);
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
            Edit Category
          </Typography>
          <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
            Edit the category details.
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Category Name
          </Typography>
          <Input
            label="Name"
            size="lg"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <Typography className="-mb-2" variant="h6">
            Category Description
          </Typography>
          <Input
            label="Description"
            size="lg"
            value={formData.description}
            onChange={handleChange}
            name="description"
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
          <button onClick={handleEdit} className='bg-secondary w-full text-white px-3 py-2'>
            Save Changes
          </button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
