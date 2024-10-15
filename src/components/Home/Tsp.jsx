import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductContext } from "../Context/ProductContext";
import ProductItem from "../ProductItem";

const Tsp = () => {
  const { topSelling } = useContext(ProductContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="md:px-2 px-0 pt-4">
      <div className="flex flex-col gap-2 justify-between items-center p-4">
        <div>
          <h1 className="text-black lg:text-3xl font-semibold font-inter">
            Top Selling Products
          </h1>
        </div>
      </div>
      <div className="bg-white p-2 min-h-[240px] overflow-hidden rounded-b-md">
        <div className="slider-container p-5">
          <Slider {...settings}>
            {topSelling.map((product) => (
              <div key={product._id} className="flex flex-row pr-3">
                <ProductItem cartButton={true} {...product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Tsp;
