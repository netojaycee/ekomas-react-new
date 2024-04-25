import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography } from "@material-tailwind/react";
import { CategoryContext } from "../../components/Context/CategoryContext";
import { useNavigate } from "react-router-dom";
import EditDialog from "../../components/AdminDashboard/EditCategory";

export default function AllCategory() {
  const { categoriesData } = useContext(CategoryContext);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleEditCategory = (updatedCategoryData) => {
    // Handle the logic to update the category
    console.log("Updated Category Data:", updatedCategoryData);
    // You can trigger an API request to update the category with the new data
  };

  return (
    <>
      {" "}
      <h1 className="text-2xl text-center text-secondary font-semibold mt-3">
        All Categories Page
      </h1>
      <EditDialog
        isOpen={isEditDialogOpen}
        handleClose={() => setIsEditDialogOpen(false)}
        categoryData={categoryToEdit}
        handleEditCategory={handleEditCategory}
      />
      <table className="w-[90%] mx-auto min-w-max table-auto text-center bg-white mt-3 overflow-visible">
        <thead>
          <tr className="border-2 border-blue-gray-200">
            {["Name", "Description", ""].map((head, index) => (
              <th key={index} className="text-secondary p-4">
                <Typography variant="small" className="font-bold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categoriesData.category) &&
            categoriesData.category.map((item, index) => {
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
                  <td className={classes}>
                    <Typography variant="small" className="font-normal">
                      {item.image}
                    </Typography>
                  </td>
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
                        // onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {
                          setCategoryToEdit(item);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>{" "}
    </>
  );
}
