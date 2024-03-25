import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import axios from "axios";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import EditProductDialog from "../../components/AdminDashboard/EditProduct";
import { apiUrl } from "../../config/env";
// import { gql, useMutation, useQuery } from "@apollo/client";
import { useMutation, useQuery } from "@tanstack/react-query";

//
export default function AllProduct() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [updateProductPublishedStatus] = useMutation(UPDATE_PRODUCT_PUBLISHED_STATUS);

  // const { data: productsData, loading, error } = useQuery(GET_PRODUCTS);

  //  useEffect(() => {
  //    const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${apiUrl}/product/products`
  //       );

  //       if (response.status === 200) {
  //         const productsData = response.data;
  //         setProducts(productsData);
  //       } else {
  //         console.error("Error fetching products:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchAllProducts = async () => {
    const response = await axios.get(`${apiUrl}/product/products`);
    console.log(response.data.products);
    return response.data.products;
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: fetchAllProducts });
  // console.log(data);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handlePublish = async (productId, currentPublishedStatus) => {
    try {
      const newPublishedStatus = !currentPublishedStatus; // Toggle the current published status
      await updateProductPublishedStatus({
        variables: { productId, published: newPublishedStatus },
        // Optimistically update the local state
        optimisticResponse: {
          __typename: "Mutation",
          updateProductPublishedStatus: {
            __typename: "Product",
            id: productId,
            published: newPublishedStatus,
          },
        },
      });
      alert("Product published status updated successfully");
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const handleEditProduct = (updateddata) => {
    // Handle the logic to update the product
    console.log("Updated Product Data:", updateddata);
    // You can trigger an API request to update the product with the new data
  };

  return (
    <>
      <h1 className="text-2xl text-center text-secondary font-semibold mt-3">
        All Products Page
      </h1>

      <EditProductDialog
        isOpen={isEditDialogOpen}
        handleClose={() => setIsEditDialogOpen(false)}
        data={productToEdit}
        handleEditProduct={handleEditProduct}
      />

      <table className="w-[90%] mx-auto min-w-max table-auto text-center bg-white mt-3">
        <thead>
          <tr className="border-2 border-blue-gray-200">
            {["Name", "Description", "Image", "Price", ""].map(
              (head, index) => (
                <th key={index} className="text-secondary p-4">
                  <Typography
                    variant="small"
                    className="font-bold leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="py-4">
                <Spinner color="blue" size="sm" />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="5" className="py-4">
                Error fetching products.
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item.id} className="border-2 border-blue-gray-200">
                <td className="p-4">
                  <Typography variant="small" className="font-normal">
                    {item.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal">
                    {item.description}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].url} // Assuming the first image is the one to display
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" className="font-normal">
                    {item.price}
                  </Typography>
                </td>
                <td className="p-4x flex justify-center items-center  gap-2 mt-8 ">
                  <Typography variant="small" className="font-normal">
                    <button
                      className="rounded py-1 px-4 border border-yellow-700"
                      onClick={() => {
                        setProductToEdit(item);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    <button
                      className={`rounded py-1 px-4 border ${
                        item.published ? "border-green-500" : "border-red-500"
                      }`}
                      onClick={() => handlePublish(item.id, item.published)}
                    >
                      {item.published ? "Published" : "Publish"}
                    </button>
                  </Typography>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
