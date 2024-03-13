import React from "react";
import Hero from "../PageComponents/Home/Hero";
import Category from "../PageComponents/Home/Category";
import About from "../PageComponents/Home/About";
import Join from "../PageComponents/Home/Join";
import Products from "../PageComponents/Home/Products";
import Special from "../PageComponents/Home/Special-offers";
import Tsp from "../PageComponents/Home/Tsp";
import Featured from "../PageComponents/Home/Featured";

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Products />
      <Special />
      <Tsp />
      <Featured />

      <About />
      <Join />
      
    </>
  );
}
