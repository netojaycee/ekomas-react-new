import React, { useContext } from "react";
import hero2 from "../../assets/images/hero.png";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Hero() {
  const { categoriesData } = useContext(CategoryContext);

  return (
    <>
      <div className="relative">
        {/* <img src={hero} alt="hero" className="kenburns-top w-full object-cover" /> */}
        <div className="bg-primary p-3 flex flex-row items-center justify-between gap-5">
          <div className="bg-white hidden flex-grow md:block  shadow-md p-2 h-full">
            <div className="p-2 flex flex-col gap-2">
              {categoriesData.map((category) => (
                <div className="flex items-center gap-2 cursor-pointer duration-300 transform hover:scale-95 transition ease-linear">
                  <FontAwesomeIcon icon={faHamburger} className="" />
                  <Link
                    key={category._id}
                    to={`/products?category=${category._id}`}
                    className="list-none text-gray-700 "
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
            
          </div>
          <div className=" bg-white h-[330px] w-[712px] ">
          <Carousel showThumbs={false} autoPlay>
                <div>
                    <img src={hero2} />
                </div>
                <div>
                    <img src={hero2} />
                </div>
                <div>
                    <img src={hero2} />
                </div>
            </Carousel>
          </div>
        </div>

        <Link to="/products">
          <button className="border border-r-0 border-primary absolute bottom-10 right-0 text-primary bg-white md:px-6 px-2 py-2 font-bold md:text-xl">
            Shop Now
          </button>
        </Link>
      </div>
    </>
  );
}
