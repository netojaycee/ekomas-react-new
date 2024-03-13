import React from "react";
import hero from "../../../assets/images/hero.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="relative ">
        <img src={hero} alt="hero" className="w-full object-cover" />
        <Link to="/products">
          <button className="absolute bottom-4 right-0 bg-primary text-white md:px-6 px-2 py-2 font-bold md:text-xl">
            Shop Now
          </button>
        </Link>
      </div>
    </>
  );
}
