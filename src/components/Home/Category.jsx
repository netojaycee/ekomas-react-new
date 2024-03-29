import React, { useContext } from "react";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import image from '../../assets/images/category/category_1.png';
import { ProductContext } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";

const AutoPlay = () => {
  // const { data } = useContext(ProductContext);
  const { categoriesData } = useContext(CategoryContext);

  // const categories = data ? [...new Set(data.map((product) => product.category))] : [];
  // console.log(categoriesData);


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
        {categoriesData.map((category) => (
           <Link  to={`/products?category=${category._id}`} >
          <div key={category._id} className="px-1 md:pr-4 relative rou">
           <img src={category.image} alt="" className="w-full object-cover" />
            <h1 className="absolute bottom-3 left-5 text-white md:text-2xl font-bold">{category.name}</h1>
          </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
