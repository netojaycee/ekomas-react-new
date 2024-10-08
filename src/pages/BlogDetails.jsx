import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Products/Breadcrumb";
import { BlogContext } from "../components/Context/BlogContext";

export default function BlogDetails() {
  const { blogId } = useParams();
  const { blog } = useContext(BlogContext);
  const detail = blog && blog.find((p) => p._id === blogId);

  useEffect(() => {
    console.log("test", detail);
  }, [detail]);
  return (
    <>
      {detail && (
        <>
          <Breadcrumb />
          <div className="">
            <div className="pt-[60px] bg-gray-200 ">
              <div className="w-[95%] mx-auto flex md:flex-row justify-between gap-[30px]">
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
                  <div className="flex flex-col gap-2">
                   
                    <div className=" w-full rounded-md">
                      <img
                        src={detail.image}
                        className="w-full object-cover"
                        alt=""
                      />
                    </div>
                    <h2 className="font-bold text-gray-700 text-[20px] mb-2">
                      {detail.title}
                    </h2>
                    <p className="text-gray-700 text-[15px] ">
                      {detail.description}
                    </p>
                    <p className="text-gray-700 text-[15px] mb-2">
                      {detail.date}
                    </p>
                  </div>

                  <div className="flex flex-row gap-4 justify-between">
                    <Link
                      to={"/blogs"}
                      className="cursor-pointer duration-300 transform hover:scale-95 transition ease-linear flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faCircleArrowLeft} />
                      <p className="">Back to blog</p>
                    </Link>
                  </div>

                  {/* comment section            */}

                  <div className="bg-white  shadow-gray-400 shadow-md rounded-lg p-4 mb-5">
                    <div className="flex md:flex-row flex-col gap-[30px]">
                      <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-xl font-bold">Post a comment</h1>
                        <div className="flex md:flex-row flex-col gap-2">
                          <input
                            className="p-2 rounded-md bg-gray-300 w-full"
                            type="text"
                            placeholder="Name"
                          />
                          <input
                            className="p-2 rounded-md bg-gray-300 w-full"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                        <textarea
                          className="p-2 rounded-md bg-gray-300 w-full"
                          placeholder="Comment"
                        />
                        <button className="hover:bg-primary bg-secondary text-white p-2 rounded-md">
                          Post a comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
