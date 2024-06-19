import React, { useContext, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from "../ProductItem";
import { ProductContext } from "../Context/ProductContext"; // Adjust the path accordingly
import { Link } from "react-router-dom";
import Aos from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Special() {
  const { discount } = useContext(ProductContext);

  

  useEffect(() => {
    Aos.init();
  }, []);


  return (
    <div className="md:px-2 px-0 pt-4">
  
  <div className="bg-primary h-10 flex justify-between items-center p-4">
        <div>
          <h1 className="text-white md:text-2xl font-semibold font-serif">
          Special Offers
          </h1>
        </div>
        <div>
        <Link to="/products?specialOffers=true">
        <button className="text-white rounded py-1 px-2 text-sm border-none flex items-center uppercase font-semibold gap-1">
              view more
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-2 min-h-[240px] overflow-hidden rounded-b-md">

      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full rounded-sm">
        {discount.map((product) => (
          <ProductItem
          cartButton={true} 
            key={product._id}
            {...product}
            discount-aos="flip-down"
          />
        ))}
      </div>
      </div>
    </div>
  );
}
