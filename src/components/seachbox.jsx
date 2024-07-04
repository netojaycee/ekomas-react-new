import React, { useContext, useState } from "react";
import { ProductContext } from "./Context/ProductContext";
import { useNavigate } from "react-router-dom";

const Searchbox = ({ placeholder }) => {
  const { searchProducts, searchResults } = useContext(ProductContext);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchNavigate = () => {
    searchProducts(query);
    navigate(`/products?search=${query}`);
    setQuery("");
  };

  return (
    <div className="w-full lg:w-[60%] flex gap-3 items-center relative h-6 ">
      <input
        type="text"
        className="w-full outline-none px-4 text-black h-full border border-gray-400 py-4 rounded-lg font-medium text-sm"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          e.target.value.length > 2 && searchProducts(e.target.value);

          setQuery(e.target.value);
        }}
      />
      <button
        onClick={handleSearchNavigate}
        className="text-white px-4 bg-secondary py-1.5 rounded-md duration-300 transform hover:scale-115 hover:bg-red-500 transition ease-linear"
      >
        Search
      </button>
      {query && searchResults.length > 0 && (
        <div className="absolute top-10 w-[83%] bg-white border border-gray-400 rounded-lg mt-1">
          {searchResults.map((product) => (
            <div
              onClick={handleSearchNavigate}
              key={product._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbox;
