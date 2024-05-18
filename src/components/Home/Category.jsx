import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import baking from "../../assets/images/category/baking.png";

const Category = () => {
  const { categoriesData } = useContext(CategoryContext);

  return (
    <div className="bg-white p-2 md:mx-2 mx-0 max-h-[240px] overflow-hidden rounded-md">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 justify-items-center">
        {categoriesData.slice(0, 10).map((category, index) => (
          <Link
            to={`/products?category=${category._id}`}
            key={index}
            className="cursor-pointer flex flex-col items-center gap-1 hover:shadow-md p-1 rounded-md shadow-gray-400 max-w-[190px] max-h-[110px] "
          >
            <img
              src={category.image}
              alt=""
              className="w-[184px] h-[102px] overflow-hidden rounded-md object-cover object-center"
            />
            <h1 className="text-black text-sm ">{category.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
