import React, { useContext, useEffect } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from '../ProductItem';
import { ProductContext } from '../Context/ProductContext'; // Adjust the path accordingly
import { Link } from 'react-router-dom';
import Aos from 'aos';

export default function Special() {
  const { discount } = useContext(ProductContext);

  // Assuming that a product is considered a special offer if it has a discount
  // const specialOffers = discount ? discount.filter(product => product.discount > 0): [];

  // // Display only a subset of special offers
  // const displayedProducts = specialOffers.slice(0, 10);

  useEffect(() => {
    Aos.init();
  }, []);

  console.log(discount);


  return (
    <div className="md:my-20 my-10 w-[90%] md:w-[80%] mx-auto flex-col  flex gap-4">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-gray-700 md:text-2xl">Special Offers</h1>
        </div>
        <div>
          <Link to="/products?specialOffers=true">
            <button className="text-primary rounded py-1 px-2 text-xs border border-primary flex items-center">
              view more<ArrowRightIcon className="ml-1 w-6" />
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x flex-wrap auto gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full rounded-sm" x>
        {discount.map((product) => (
          <ProductItem key={product._id} {...product} discount={`${product.discount}%`} classx={`bg-gray-100 p-2`}  discount-aos="flip-down"/>
        ))}
      </div>
    </div>
  );
};
