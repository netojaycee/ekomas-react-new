import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import baking from "../../assets/images/category/baking.png";

const AutoPlay = () => {
  const { categoriesData } = useContext(CategoryContext);

  return (
    <div className="bg-white p-2 md:mx-2 mx-0">
      <div className="grid grid-cols-6 gap-2 ">
        {categoriesData.slice(0, 12).map((category, index) => (
          <div key={index} className="flex flex-col items-center gap-1 hover:shadow-md p-1 rounded-md shadow-gray-400 max-w-[190px] max-h-[110px] ">
            <img src={category.image} alt="" className="w-[184px] h-[102px] overflow-hidden rounded-md object-cover object-center" />
            <h1 className="text-black text-sm ">{category.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoPlay;
