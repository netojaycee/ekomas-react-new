// Products.js
import React, { useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from "../ProductItem";
import { ProductContext } from "../Context/ProductContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Products = () => {

  const { data } = useContext(ProductContext);
  // const products = data ? data.filter(
  //   (product) => product.featured === false && product.discount === 0
  // ) : []; 
  // const displayedProducts = products.slice(0, 6);

  console.log(data)

 
  return (
    <div className="md:mt-20 mt-10 w-[90%] md:w-[80%] h-full mx-auto flex-col flex gap-4" >
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-gray-700 md:text-2xl">Products</h1>
        </div>
        <div>
          {" "}
          <Link to="/products">
            <button className="text-primary rounded py-1 px-2 text-xs border  border-primary flex items-center">
              view more
              <ArrowRightIcon className="ml-1 w-6" />
            </button>
          </Link>
        </div>
      </div>

      <div className="md:bg-white bg-gray-100 rounded-md py-2  px-4">
        <div className="flex overflow-x flex-wrap auto gap-4 grid grid-cols-1   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full rounded-sm">
          {data.map((product) => (
            <ProductItem key={product.id} {...product}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
