import React, { useContext } from "react";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ProductContext } from "../Context/ProductContext";
import ProductItem from "../ProductItem";

const Tsp = () => {
  const { topSelling } = useContext(ProductContext);
  // const tsP = data ? data.filter((product) => product.topSelling === true): [];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768, // Medium screen size
        settings: {
          slidesToShow: 3, // Display 3 items on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560, // Large screen size
        settings: {
          slidesToShow: 2, // Display 5 items on large screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
   

        <div className="md:px-2 px-0 pt-4">
  
  <div className="bg-primary h-10 flex justify-between items-center p-4">
        <div>
          <h1 className="text-white md:text-2xl font-semibold font-serif">
                Top Selling Products
          </h1>
        </div>
       
      </div>

      <div className="bg-white p-2 min-h-[240px] overflow-hidden rounded-b-md">
        <div className="">
          <Slider {...settings}>
            {topSelling.map((product) => (
              <div key={product._id} className="flex flex-row pr-3">
                {/* <div className="bg-white flex flex-row p-2 pr-0 relative">
                  <div className="mt-4 absolute">
                    <HeartIcon className="w-5 text-secondary" />
                  </div>
                  <div className="my-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col mt-4 justify-between">
                    {product.discount !== 0 && (
                      <div className="bg-badge text-center pl-2 relative right-0">
                        ${product.discount}
                      </div>
                    )}
                    <div className="bg-badge h-5 w-3 rounded-l-md relative ml-[30px]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mb-6">
                  <div className="mt-1 text-[#b32b2b]">{product.name}</div>
                  <div className="text-gray-600">${product.price}</div>
                </div> */}

                <ProductItem cartButton={true} key={product._id} {...product} />

              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Tsp;
