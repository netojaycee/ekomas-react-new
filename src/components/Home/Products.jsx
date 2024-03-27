// Products.js
import React, { useContext, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from "../ProductItem";
import { ProductContext } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Products = () => {
  const { data } = useContext(ProductContext);

  // Slice the data array to display a maximum of 6 products
  const displayedProducts = data ? data.slice(0, 6) : [];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="md:mt-10 mt-10 w-[90%] h-full mx-auto flex-col flex gap-4">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-black md:text-2xl font-semibold font-serif">Products</h1>
        </div>
        <div>
          <Link to="/products">
            <button className="text-primary rounded py-1 px-2 text-xs border  border-primary flex items-center">
              view more
              <ArrowRightIcon className="ml-1 w-6" />
            </button>
          </Link>
        </div>
      </div>

      <div className="rounded-md py-2">
        <div className="gap-4 grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full rounded-sm">
          {displayedProducts.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
