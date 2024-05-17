import React, { useContext, useState, useEffect } from "react";
import Breadcrumb from "../components/Products/Breadcrumb";
import { CategoryContext } from "../components/Context/CategoryContext";
import Pagination from "../components/Pagination";
import ProductItem from "../components/ProductItem";
import Explore from "../components/Home/Explore";
import BlogItem from "../components/BlogItem";
import { Link } from "react-router-dom";

const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

const dummyData = [
  {
    title: "Unveiling the Power of: A Comprehensive Guide",
    description:
      "Dive deep into the features and benefits of. Include high-quality images, customer testimonials (if available), and use cases. Briefly mention complementary products for upselling opportunities.",
    type: "product_spotlight",
    date: today,
  },
  {
    title: "3 Must-Have Gadgets for Tech Enthusiasts",
    description:
      "Create a collection featuring Cards that cater to tech enthusiasts. Highlight the synergy between the products and how they can elevate the user experience.",
    type: "curated_collection",
    date: today,
  },
  {
    title: "Top Tips for Choosing the Perfect [Product Category of Card 3]",
    description:
      "Offer valuable advice related to your products. This could involve a buying guide, troubleshooting tips, or seasonal recommendations for Card 3.",
    type: "educational_content",
    date: today,
  },
  {
    title: "Real People, Real Results: How Our Customers Use Cards 4 & 5",
    description:
      "Feature customer success stories, reviews, or photos using Cards 4 & 5. Ensure you have permission to use customer content. This builds trust and authenticity with potential buyers.",
    type: "user_generated_content",
    date: today,
  },
  {
    title: "Elevate Your Style with Our Latest Collection",
    description:
      "Showcase different ways to style Cards 1, 2, & 3. Include high-quality lifestyle images and provide product links for easy purchase.",
    type: "lookbook",
    date: today,
  },
  {
    title: "Celebrate [Holiday/Event] with These Gift Ideas (Cards 4, 5, & 6)",
    description:
      "Tailor your blog to a specific holiday, event, or seasonal trend. Recommend Cards 4, 5, & 6 and create a sense of urgency with limited-time offers or promotions.",
    type: "trend_and_event",
    date: today,
  },
];

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);

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
                {dummyData.map((blog) => (
                  <div key={blog._id} className="flex flex-col">
                    <BlogItem key={blog._id} item={blog} />
                  </div>
                ))}
              </div>

              {/* Replace Previous and Next buttons with Pagination component */}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(dummyData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
