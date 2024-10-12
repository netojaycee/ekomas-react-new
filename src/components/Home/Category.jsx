import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Category = () => {
  const { categoriesData } = useContext(CategoryContext);

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
     <div className="flex items-center p-6 justify-center my-6 bg-green-100 rounded-lg shadow-md">
  <h1 className="text-black text-4xl font-bold font-serif mb-3 text-center leading-tight">
    Your Grocery Shopping Made Simple!
  </h1>
  {/* <p className="text-gray-600 text-lg md:text-xl text-center mt-2">
    Discover a world of fresh produce, essentials, and local favorites delivered right to your door.
  </p> */}
</div>


      {/* {isDesktop ? (
        <div className="grid grid-cols-5 gap-2 justify-items-center">
          {categoriesData.slice(0, 10).map((category, index) => (
            <Link
              to={`/products?category=${category._id}`}
              key={index}
              className="cursor-pointer flex flex-col items-center gap-1 hover:shadow-md p-1 rounded-md shadow-gray-400 max-w-[190px] max-h-[110px]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-[184px] h-[102px] overflow-hidden rounded-md object-cover object-center"
              />
              <h1 className="text-black text-sm">{category.name}</h1>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 justify-items-center">
          {categoriesData.slice(0, 6).map((category, index) => (
            <Link
              to={`/products?category=${category._id}`}
              key={index}
              className="cursor-pointer flex flex-col items-center gap-1 hover:shadow-md p-1 rounded-md shadow-gray-400 max-w-[190px] max-h-[110px]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-[184px] h-[102px] overflow-hidden rounded-md object-cover object-center"
              />
              <h1 className="text-black text-sm">{category.name}</h1>
            </Link>
          ))}
        </div>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-items-center w-full lg:w-[85%] mx-auto">
        {categoriesData.map((category, index) => (
          <Link
            to={`/products?category=${category._id}`}
            key={index}
            className="shadow-md shadow-gray-500 cursor-pointer bg-white  hover:shadow-2xl p-2 rounded-md w-full "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-[80px] h-[100px] overflow-hidden rounded-md object-cover object-center"
                />
                <h1 className="text-black text-sm line-clamp-2 font-semibold">
                  {category.name}
                </h1>
              </div>
              <ArrowRightIcon className="w-6 h-6" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
