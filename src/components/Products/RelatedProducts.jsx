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
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="p-4">
      <div className="w-[90%] mx-auto flex-col flex gap-2">
          <div className="slider-container p-2">
            <Slider {...settings}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ProductItem key={product.id} {...product} />
                </div>
              ))}
            </Slider>
          </div>
       
      </div>
    </div>
  );
};
