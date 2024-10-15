// RelatedProducts.js
import React, { useState, useEffect, useContext } from "react";
import ProductItem from "../ProductItem";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { ProductContext } from "../Context/ProductContext";

export const RelatedProducts = ({ category }) => {
  const { data } = useContext(ProductContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = data.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  }, [category, data]);



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
    <div className="my-3">
          <div className="slider-container lg:p-2 p-5 mx-2 lg:mx-0">
            <Slider {...settings}>
              {filteredProducts.map((product) => (
                // <div key={product.id} className="flex flex-col">
                  <ProductItem key={product.id} item={product} />
                // {/* </div> */}
              ))}
            </Slider>
       
      </div>
    </div>
  );
};
