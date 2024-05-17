import React, { useContext } from "react";
import exploreImage from "../../assets/images/explore/explore.png";
import BlogItem from "../BlogItem";
import { BlogContext } from "../Context/BlogContext";






export default function Explore() {
  const { blog } = useContext(BlogContext);
  return (
    <div className="p-[30px] bg-gray-200 mt-5">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-center text-[#bf2b2b] font-bold text-2xl">
            Explore YOA-mat
          </h1>
        </div>
        <div className="md:mt-[30px] mt-3 w-[90%] mx-auto flex flex-col md:flex-row gap-4">
          {blog.map((item) => (
          <BlogItem  item={item} />
        
          ))}
        </div>
      </div>
    </div>
  );
}
