import React, { useState, useContext, useEffect } from "react";
import ProductItem from "../ProductItem";
import Pagination from "../Pagination";
import { useLocation, Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { CategoryContext } from "../Context/CategoryContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  IconButton,
  Button,
  Drawer,
} from "@material-tailwind/react";

function Sidebar({
  open,
  closeDrawer,
  categoriesData,
  handleInStock,
  handlePriceRangeChange,
}) {
  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-end">
          {/* <Typography variant="h5" color="blue-gray">
            l
          </Typography> */}
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="bg-white p-2 rounded-md shadow-md mb-3">
          <h2 className="font-semibold text-gray-700 text-[20px] mb-2">
            Shop by categories
          </h2>
          <div className="p-2 flex flex-col gap-2">
            {categoriesData.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className="list-none text-gray-700 mb-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        {/* <div className="bg-white p-4 rounded-md shadow-md mb-3 flex flex-col">
          <h2 className="font-semibold text-gray-700 text-xl mb-4">
            Filter By
          </h2>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="in-stock"
                name="stock"
                value="in-stock"
                className="mr-2"
                onChange={handleInStock}
              />
              <label htmlFor="in-stock" className="text-gray-700">
                In Stock (10)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="out-of-stock"
                name="stock"
                value="out-of-stock"
                className="mr-2"
                onChange={handleInStock}
              />
              <label htmlFor="out-of-stock" className="text-gray-700">
                Out of Stock (5)
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="price-range" className="text-gray-700 mb-2 block">
              Price Range
            </label>
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="0-10000"
                  onChange={handlePriceRangeChange}
                  className="mr-2"
                />
                0 - 10,000
              </label>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="10000-20000"
                  onChange={handlePriceRangeChange}
                  className="mr-2"
                />
                10,000 - 20,000
              </label>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="20000-30000"
                  onChange={handlePriceRangeChange}
                  className="mr-2"
                />
                20,000 - 30,000
              </label>
            </div>
          </div>
        </div> */}
      </Drawer>
    </React.Fragment>
  );
}

export default function ProductsList() {
  const { data, discount, featured, topSelling, searchResults } =
    useContext(ProductContext);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { categoriesData } = useContext(CategoryContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState("Default sorting");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({});

  const [itemsPerPage] = useState(20);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const isSpecialOffersPage = searchParams.get("specialOffers") === "true";
  const isFeaturedPage = searchParams.get("featured") === "true";
  const categoryParam = searchParams.get("category");
  const isTopSelling = searchParams.get("topSelling") === "true";
  const isSearch = searchParams.get("search");

  useEffect(() => {
    let filtered = data; // Start with all products

    if (isTopSelling) {
      filtered = topSelling;
    } else if (isSpecialOffersPage) {
      filtered = discount;
    } else if (isFeaturedPage) {
      filtered = featured;
    } else if (isSearch) {
      filtered = searchResults;
    }

    if (categoryParam) {
      filtered = data.filter((product) => product.categoryId === categoryParam);
      const categoryName = categoriesData.find(
        (category) => category._id === categoryParam
      )?.name;
      setPageTitle(categoryName);
    }

    // Apply in-stock filter if selected
    if (selectedFilters.stock) {
      filtered = filtered.filter((product) => {
        if (selectedFilters.stock === "all") {
          return true; // Keep all products if "all" is selected
        } else
          return product.inStock === (selectedFilters.stock === "in-stock");
      });
    }

    // Apply price range filter if selected
    if (selectedFilters.priceRange) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price);
        const range = selectedFilters.priceRange.split("-");
        return (
          !range || // No range selected, or
          (price >= parseFloat(range[0]) && price <= parseFloat(range[1]))
        );
      });
    }

    // Set the filtered products based on all applied filters
    setFilteredProducts(filtered);
  }, [
    data,
    categoryParam,
    isSpecialOffersPage,
    isFeaturedPage,
    isTopSelling,
    selectedFilters,
    searchResults, // Include selectedFilters in dependency array
  ]);

  // ... rest of the component logic for category filter, price filter, etc.

  // Improved handleInStock function to consider selected category:
  const handleInStock = (e) => {
    const { name, value } = e.target;
    setSelectedFilters({ ...selectedFilters, stock: value }); // Update stock filter

    const filtered = data.filter((product) => {
      if (categoryParam) {
        // If a category is selected
        return (
          product.categoryId === categoryParam && // Match category
          (value === "all" || product.inStock === (value === "in-stock")) // Apply in-stock filter
        );
      } else {
        // If no category is selected, apply in-stock filter globally
        return value === "all" || product.inStock === (value === "in-stock");
      }
    });

    setFilteredProducts(filtered);
  };

  // category filter start

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setSelectedCategory(value);
      setSelectedFilters({ ...selectedFilters, [name]: value });

      const filtered = data.filter((product) => {
        // Apply category filter based on selectedFilters.category
        return value === "all" // If "all" is selected, return all products
          ? true
          : product.categoryId === value; // Otherwise, filter by category
      });
      setFilteredProducts(filtered);
    }
  };

  // category filter end

  // price filter start
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters({ ...selectedFilters, [name]: value });

    const filtered = data.filter((product) => {
      const price = parseFloat(product.price);
      // Apply price range filter based on selectedFilters.priceRange
      return (
        !selectedFilters.priceRange || // No price range selected, or
        (price >= parseFloat(selectedFilters.priceRange.split("-")[0]) &&
          price <= parseFloat(selectedFilters.priceRange.split("-")[1]))
        // Apply other selected filters here using similar logic
      );
    });
    setFilteredProducts(filtered);
  };

  // price filter end
  const isAnyFilterAll = (filters) => {
    for (const value in filters) {
      if (filters[value] === "all") {
        return true;
      }
    }
    return false;
  };

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
      case "Alphabetical: A to Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical: Z to A":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedProducts.sort((a, b) => parseFloat(b.name) - parseFloat(a.name));
        break;
    }

    // Update the state with the sorted products
    setFilteredProducts(sortedProducts); // Update filteredProducts, not products
  };
  let paginationRange;
  if (filteredProducts.length > 20) {
    paginationRange = `${Math.min(
      indexOfFirstProduct + 1,
      indexOfLastProduct
    )}-${Math.min(indexOfLastProduct, filteredProducts.length)} of ${
      filteredProducts.length
    } results`;
  } else {
    paginationRange = `${Math.min(
      indexOfFirstProduct + 1,
      indexOfLastProduct
    )}-${filteredProducts.length} of ${filteredProducts.length} results`;
  }

  return (
    <>
      <div className="pt-[60px]">
        {/* Main content */}
        <div className="w-[95%] lg:w-[55%] mx-auto flex md:flex-row justify-between gap-3">
          {/* Sidebar toggle button (only visible on small devices) */}
          <div className="flex-col items-center md:block hidden w-1/3">
            <div className="bg-white p-2 rounded-md shadow-md mb-3">
              <h2 className="font-semibold text-gray-700 text-[20px] mb-2">
                Shop by categories
              </h2>
              <div className="p-2 flex flex-col gap-2">
                {categoriesData.map((category) => (
                  <Link
                    key={category._id}
                    to={`/products?category=${category._id}`}
                    className="list-none text-gray-700 mb-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Main product list and sorting */}
          <div className="md:w-2/3 w-full flex-col flex gap-4 rounded-full mx-auto">
            <div className="flex flex-col bg-white p-2 rounded-md shadow-md">
              <div className="flex flex-row justify-between text-gray-700 ">
                <div className="font-semibold">
                  {pageTitle ? pageTitle : "All Products"}
                </div>
                <div className="flex items-center ">
                  <p className="font-semibold text-sm">Sort By:</p>
                  {/* Use the select dropdown for sorting options */}
                  <select
                    value={sortingOption}
                    onChange={(e) => handleSortingChange(e.target.value)}
                    className=" "
                  >
                    <option value="Default sorting">Default sorting</option>
                    <option value="Price: Low to High">
                      Price: Low to High
                    </option>
                    <option value="Price: High to Low">
                      Price: High to Low
                    </option>
                    <option value="Alphabetical: A to Z">
                      Alphabetical: A to Z
                    </option>
                    <option value="Alphabetical: Z to A">
                      Alphabetical: Z to A
                    </option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="flex flex-row justify-between p-1">
                <div className="font-normal text-gray-600 text-sm">
                  {filteredProducts.length} products found
                </div>
                <div className="flex items-center gap-2 font-normal md:hidden">
                  <button
                    className="flex items-center gap-2"
                    onClick={openDrawer}
                  >
                    Filters <ChevronDownIcon className="text-black w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  w-full gap-3">
              {filteredProducts.map((product) => (
                <div key={product._id} className="flex flex-col">
                  <ProductItem key={product._id} {...product} />
                </div>
              ))}
            </div>
{filteredProducts.length > 10 && (
              
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />)}
          </div>
        </div>
      </div>
      <Sidebar openDrawer={openDrawer} closeDrawer={closeDrawer} open={open} categoriesData={categoriesData} handleInStock={handleInStock} handlePriceRangeChange={handlePriceRangeChange} />
    </>
  );
}
