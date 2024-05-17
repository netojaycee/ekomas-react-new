import React, { useContext, useState, useEffect } from "react";
import Breadcrumb from "../components/Products/Breadcrumb";
import Pagination from "../components/Pagination";

import BlogItem from "../components/BlogItem";
import { Link } from "react-router-dom";
import { BlogContext } from "../components/Context/BlogContext";


export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { blog } = useContext(BlogContext);

  const itemsPerPage = 5;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Breadcrumb />
      <div className="">
        <div className="pt-[60px] bg-gray-200 ">
          <div className="w-[95%] mx-auto flex md:flex-row justify-between gap-3">
            <div className="flex-col items-center md:block hidden w-1/3">
              <div className="bg-white p-2 rounded-md shadow-md mb-3">
                <h2 className="font-semibold text-gray-700 text-[20px] mb-2">
                  Shop by categories
                </h2>
                <div className="p-2 flex flex-col gap-2">
                  <Link
                    to="/"
                    className="list-none text-gray-700 mb-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/products"}
                    className="list-none text-gray-700 mb-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
                  >
                    Our Store
                  </Link>
                  <Link
                    to={"/blogs"}
                    className="list-none text-gray-700 mb-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
                  >
                    Blog
                  </Link>
                  <Link
                    to={"/contact"}
                    className="list-none text-gray-700 mb-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 w-full flex-col flex gap-4 rounded-full mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 w-full gap-4">
                {blog.map((blog) => (
                  <div key={blog._id} className="flex flex-col">
                    <BlogItem key={blog._id} item={blog} />
                  </div>
                ))}
              </div>

              {/* Replace Previous and Next buttons with Pagination component */}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(blog.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
