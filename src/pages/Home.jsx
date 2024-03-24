import React from "react";
import SiteLayout from "../components/SiteLayout";
import Hero from "../components/Home/Hero";
import Category from "../components/Home/Category";
import Products from "../components/Home/Products";
import Special from "../components/Home/Special-offers";
import Tsp from "../components/Home/Tsp";
import Featured from "../components/Home/Featured";
import Explore from "../components/Home/Explore";
import Reviews from "../components/Home/Reviews";
import About from "../components/Home/About";
import Join from "../components/Home/Join";

export default function Home() {
  return (
    <>
      <SiteLayout>
        
          <Hero />
          {/* <div className="w-[80%] mx-auto"> */}
          {/* <Category /> */}
          <Products />
          <Special />
          <Tsp />
          <Featured />
          {/* <Explore /> */}
          {/* <Reviews /> */}
          <About />
          <Join />
        {/* </div> */}
      </SiteLayout>
    </>
  );
}
