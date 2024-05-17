import React from "react";
import Breadcrumb from "../components/Products/Breadcrumb";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faInfo,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <>
      <Breadcrumb />
      <div className="bg-gray-200 flex items-center justify-center p-10">
        <div className="bg-white w-[90%] mx-auto shadow-gray-400 shadow-md rounded-lg p-4">
          <div className="flex md:flex-row flex-col gap-[30px]">
            <div className="flex flex-col gap-4 md:w-1/2 w-full">
              <h1 className="text-xl font-bold">Contact Us</h1>
              <input
                className="p-2 rounded-md bg-gray-300 w-full"
                type="text"
                placeholder="Name"
              />
              <input
                className="p-2 rounded-md bg-gray-300 w-full"
                type="email"
                placeholder="Email"
              />
              <input
                className="p-2 rounded-md bg-gray-300 w-full"
                type="text"
                placeholder="Phone Number"
              />
              <textarea className="p-2 rounded-md bg-gray-300 w-full" placeholder="Message" />
              <button className="hover:bg-primary bg-secondary text-white p-2 rounded-md">
                Send Message
              </button>
            </div>
            <div className="md:w-1/2 w-full flex flex-col  gap-4">
            <h2 className="text-xl font-bold">Get In Touch With Us</h2>
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faHome} />{" "}
              <p className="">Addreessssssssssss</p>
            </span>
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faPhone} />{" "}
              <a href="tel:+234 90866566" className="text-blue-600">+234 90866566</a>
            </span>
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="mailto:info@email.com" className="text-blue-600">info@email.com</a>
            </span>
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faInfo} />{" "}
              <p className="">Monday - Friday 10AM - 6PM</p>
            </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
