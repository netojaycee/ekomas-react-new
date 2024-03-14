// RelatedProducts.js
import React, { useState, useEffect, useContext } from "react";
import ProductItem from "../ProductItem";
import Pagination from "../Pagination";
import { ProductContext } from "../Context/ProductContext";

export const RelatedProducts = ({ category }) => {
  const { data } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products based on the specified category
    const filtered = data.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when category changes
  }, [category, data]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pt-[60px]">
      <div className="w-[80%] mx-auto flex-col flex gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductItem key={product.id} {...product} />
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
  );
};
