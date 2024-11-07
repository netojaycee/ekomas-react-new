// import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-primary p-[10px] ">
      <div className="w-[80%] mx-auto text-center">
        <h1 className=" text-white font-bold text-xl my-[30px]">About Us</h1>
        <p className="text-white my-2">
          Welcome to our online store! We aim to make shopping easier, more
          convenient, and enjoyable. Our platform is designed with you in mind,
          offering a wide variety of products at your fingertips. Shop with us
          for the best deals and a seamless experience!{" "}
        </p>
        <Link to="/register">
          {" "}
          <button className="border-2 mt-2 border-secondary px-20 py-2 mb-8 text-secondary">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}
