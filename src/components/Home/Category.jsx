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

  function truncateDescription(text, maxWords = 10) {
    const words = text.split(/\s+/); // Split by whitespace (any sequence of spaces)
    const truncatedWords = words.slice(0, maxWords); // Slice the first maxWords words
    return truncatedWords.join(" ") + (words.length > maxWords ? "..." : ""); // Join words and add ellipsis if needed
  }
  
  function truncateTitle(text, maxWords = 3) {
    const words = text.split(/\s+/); // Split by whitespace (any sequence of spaces)
    const truncatedWords = words.slice(0, maxWords); // Slice the first maxWords words
    return truncatedWords.join(" ") + (words.length > maxWords ? "..." : ""); // Join words and add ellipsis if needed
  }

  return (
    <div className="mx-2 overflow-hidden rounded-md mb-5 p-5">
      <div className="flex categorys-center justify-center my-6 rounded-lg w-full lg:w-[85%] mx-auto">
        <h1 className="text-black text-2xl font-bold font-inter mb-3 text-left leading-tight">
          Category
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-categorys-center w-full lg:w-[85%] mx-auto">
        {categoriesData.map((category, index) => (
          // <Link
          //   to={`/products?category=${category._id}`}
          //   key={index}
          //   className="shadow-md shadow-gray-500 cursor-pointer bg-white  hover:shadow-2xl p-2 rounded-md w-full "
          // >
          //   <div className="flex categorys-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
          //     <div className="flex categorys-center gap-1">
          //       <img
          //         src={category.image}
          //         alt={category.name}
          //         className="w-[80px] h-[100px] overflow-hidden rounded-md object-cover object-center transition-transform transform hover:scale-110 aos-init aos-animate"
          //         data-aos="fade-up"
          //         data-aos-delay="300"
          //       />
          //       <h1 className="text-black text-[16px] line-clamp-2 font-semibold transition-colors hover:text-blue-500">
          //         {category.name}
          //       </h1>
          //     </div>
          //     <ArrowRightIcon className="w-6 h-6 transition-transform transform hover:translate-x-1" />
          //   </div>
          // </Link>

          <div
            key={index}
            className="transition-transform transform hover:scale-105 hover:shadow-md hover:shadow-variant rounded-md flex flex-col hover:bg-white pb-2 w-[333px]"
          >
            <div className="w-[333px] h-[300px] overflow-hidden rounded-t-md" data-aos="fade-left" data-aos-delay="300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full  p-0 rounded-2xl shadow-md"
              />
            </div>
            <div className="flex flex-col mt-2 gap-1 px-3">
              {/* <div className="text-sm">{category.date}</div> */}
              <h2 className="text-[#ff3e3e] font-bold text-[20px] line-clamp-1 uppercase">
                {/* {truncateTitle(category.title)} */}
                {category.name}
              </h2>
              <p className="line-clamp-3 text-[14px] h-[70px]" data-aos="fade-up" data-aos-delay="300">
                {category?.description || "a description for category u must like to set otherwise be wise jhjghghggghg"}
              </p>
              <div>
                <Link
                  to={`/products?category=${category._id}`}
                  className="bg-secondary rounded py-1 px-2 text-white"
                >
                  View more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
