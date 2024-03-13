import React, { useContext, useEffect } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from '../../ProductItem';
// import { ProductContext } from '../Context/ProductContext'; // Adjust the path accordingly
import { Link } from 'react-router-dom';
import Aos from 'aos';
import data from "../../ProductData";


export default function Special() {
  // const { data } = useContext(ProductContext);

  // Assuming that a product is considered a special offer if it has a discount
  const specialOffers = data ? data.filter(product => product.discount > 0): [];

  // Display only a subset of special offers
  const displayedProducts = specialOffers.slice(0, 10);

  useEffect(() => {
    Aos.init();
  }, []);


  return (
    <div className="md:my-20 my-10 w-[90%] md:w-[80%] mx-auto flex-col  flex gap-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-gray-700 md:text-2xl">Special Offers</h1>
        </div>
        <div>
          <Link to="/all-product?specialOffers=true">
            <button className="text-primary rounded py-1 px-2 text-xs border px-1 border-primary flex items-center">
              view more<ArrowRightIcon className="ml-1 w-6" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex  overflow-x flex-wrap auto gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full rounded-sm" x>
        {displayedProducts.map((product) => (
          <ProductItem key={product.id} {...product} discount={`${product.discount}%`} classx={`bg-gray-100 p-2`}  data-aos="flip-down"/>
        ))}
      </div>
    </div>
  );
};
