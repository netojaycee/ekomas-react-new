import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Aos from "aos";
import "aos/dist/aos.css";

const Category = () => {
  const { categoriesData } = useContext(CategoryContext);
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, [categoriesData]);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-2 overflow-hidden rounded-md mb-5 p-5">
      <div className="flex items-center justify-start my-6 rounded-lg w-full lg:w-[85%] mx-auto">
        <h1 className="text-black text-2xl font-bold font-inter mb-3 text-center leading-tight">
          Category
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-items-center w-full lg:w-[85%] mx-auto">
        {categoriesData.map((category, index) => (
          <Link
            to={`/products?category=${category._id}`}
            key={index}
            className="shadow-md shadow-gray-500 cursor-pointer bg-white  hover:shadow-2xl p-2 rounded-md w-full "
          >
            <div className="flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
              <div className="flex items-center gap-1">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-[80px] h-[100px] overflow-hidden rounded-md object-cover object-center transition-transform transform hover:scale-110 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="300"
                />
                <h1 className="text-black text-[16px] line-clamp-2 font-semibold transition-colors hover:text-blue-500">
                  {category.name}
                </h1>
              </div>
              <ArrowRightIcon className="w-6 h-6 transition-transform transform hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
