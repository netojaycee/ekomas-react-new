import React, { useContext } from "react";
import Slider from "react-slick";
import image from '../../../assets/images/category/category_1.png';
import { Link } from "react-router-dom";
import data from "../../ProductData";


const AutoPlay = () => {

  const categories = data ? [...new Set(data.map((product) => product.category))] : [];
// const categories = data ? data.category : [];
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="md:mt-7 mt-3 w-[80%] mx-auto">
      <Slider {...settings}>
        {categories.map((category) => (
           <Link  to={`/products?category=${category}`} >
          <div key={category} className="px-1 md:pr-4 relative rou">
           <img src={image} alt="" className="w-full object-cover" />
            <h1 className="absolute bottom-3 left-5 text-white md:text-2xl font-bold">{category}</h1>
          </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
