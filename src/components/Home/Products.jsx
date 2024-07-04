import React, { useContext, useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProductItem from "../ProductItem";
import { ProductContext } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const { data } = useContext(ProductContext);

  const displayedProducts = data || [];

  // Slice the array to display a maximum of 10 products

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth <= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth <= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let limitedDisplayedProducts;

  if (isDesktop) {
    limitedDisplayedProducts = displayedProducts.slice(0, 15);
  } else {
    limitedDisplayedProducts = displayedProducts.slice(0, 12);
  }

  return (
    <div className="md:px-2 px-0 pt-4">
      <div className=" flex flex-col gap-2 justify-between items-center p-4">
        <div>
          <h1 className="text-black lg:text-3xl font-semibold font-serif">
            Products
          </h1>
        </div>
        <div>
          <Link to="/products">
            <button className="text-black hover:bg-primary rounded py-1 px-2 text-sm border-none flex items-center font-semibold gap-1">
              view more
              <FontAwesomeIcon icon={faArrowRight} size="lg" />{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-2 min-h-[240px] overflow-hidden rounded-b-md">
        <div className="rounded-md py-2">
          <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 w-full rounded-sm">
            {limitedDisplayedProducts.map((product) => (
              <ProductItem cartButton={true} key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
