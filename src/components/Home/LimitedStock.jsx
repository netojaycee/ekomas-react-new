import React from "react";
import hero2 from "../../assets/images/hero.png";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import ProductItem from "../ProductItem";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LimitedStock() {
  const { data } = useContext(ProductContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
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

  // Slice the data array to display a maximum of 6 products
  const displayedProducts = data ? data.slice(0, 10) : [];
  return (
    <div className="md:px-2 px-0 pt-4">
      <div className=" flex flex-col gap-2 justify-between items-center p-4">
        <div>
          <h1 className="text-black lg:text-3xl font-semibold font-serif">
            Limited Stock Products
          </h1>
        </div>
        <div>
          <Link to="/products">
            <button className="text-black hover:bg-primary rounded py-1 px-2 text-sm border-none flex items-center font-semibold gap-1">
              view more
              <FontAwesomeIcon icon={faArrowRight} size="lg" />{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-2 min-h-[240px] overflow-hidden rounded-b-md">
        <div className="slider-container p-5">
          <Slider {...settings}>
            {displayedProducts.map((product) => (
              <ProductItem cartButton={false} key={product._id} {...product} />
            ))}{" "}
          </Slider>
        </div>
      </div>
    </div>
  );
}
