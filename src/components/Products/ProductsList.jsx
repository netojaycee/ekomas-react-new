import { React, useState, useContext, useEffect } from "react";
import ProductItem from "../ProductItem";
import Pagination from "../Pagination";
import { useLocation, Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

export const ProductsList = () => {
  const { data, discount, featured, topSelling } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState("Default sorting");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // console.log(data)
  const location = useLocation();

  // Extract the search parameter from the location
  const searchParams = new URLSearchParams(location.search);

  // Check if the "specialOffers" parameter exists in the search
  const isSpecialOffersPage = searchParams.get("specialOffers") === "true";
  const isFeaturedPage = searchParams.get("featured") === "true";
  const categoryParam = searchParams.get("category");
  const isTopSelling = searchParams.get("topSelling") === "true";

  useEffect(() => {
    // Apply filters based on category and special offers
    let filtered = data;

    if (isTopSelling) {
      filtered = topSelling;
    }

    if (isSpecialOffersPage) {
      filtered = discount;
    }
    if (isFeaturedPage) {
      filtered = featured;
    }
    if (categoryParam) {
      // Filter products based on the categoryParam
      filtered = data.filter(product => product.categoryId === categoryParam);
      // console.log(filtered)
    }
    
    setFilteredProducts(filtered);

    setCurrentPage(1); // Reset to the first page when filters change
  }, [data]);

  // const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
    // Call your sorting function based on the selected option
    sortProducts(option);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts]; // Use filteredProducts here

    switch (option) {
      case "Price: Low to High":
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case "Price: High to Low":
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      // Add more cases for other sorting options as needed
      default:
        sortedProducts.sort((a, b) => parseFloat(b.name) - parseFloat(a.name));
        break;
    }

    // Update the state with the sorted products
    setFilteredProducts(sortedProducts); // Update filteredProducts, not products
  };

  return (
    <>
      <div className="pt-[60px]">
        <div className="w-[80%] mx-auto flex-col flex gap-4 rounded-full">
          <div className="flex flex-row justify-between text-gray-700">
            <div>
              Showing {indexOfFirstProduct + 1}-{indexOfLastProduct} of{" "}
              {filteredProducts.length} results
            </div>
            <div>
              {/* Use the select dropdown for sorting options */}
              <select
                value={sortingOption}
                onChange={(e) => handleSortingChange(e.target.value)}
                className="border border-gray-700 rounded px-4 py-2"
              >
                <option value="Default sorting">Default sorting</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="flex  flex-col">
                <ProductItem key={product._id} {...product} />
              </div>
            ))}
          </div>

          {/* Replace Previous and Next buttons with Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};
