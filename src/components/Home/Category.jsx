import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";

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
    <div className="mx-2  overflow-hidden rounded-md">
      <div className="h-10 flex items-center p-4 justify-center">
        <h1 className="text-black md:text-3xl font-semibold font-serif mb-3">
          Category
        </h1>
      </div>

      {isDesktop ? (
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
      )}
    </div>
  );
};

export default Category;
