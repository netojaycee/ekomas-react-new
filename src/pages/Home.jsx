// import React, { useEffect, useState } from "react";
import Hero from "../components/Home/Hero";
import Category from "../components/Home/Category";
import about_home from "../assets/images/about-home.jpg";
import About from "../components/Home/About";

// import Products from "../components/Home/Products";
// import Special from "../components/Home/Special-offers";
// import Tsp from "../components/Home/Tsp";
// import Featured from "../components/Home/Featured";
// import Explore from "../components/Home/Explore";
// import Reviews from "../components/Home/Reviews";
// import About from "../components/Home/About";
// import Join from "../components/Home/Join";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import { Link, useSearchParams } from "react-router-dom";
// import LimitedStock from "../components/Home/LimitedStock";
// import axiosInstance from "../config/axiosInstance";

// function PaymentComplete({ open, handleOpen, paymentInfo }) {
//   return (
//     <Dialog open={open} handler={handleOpen}>
//       {paymentInfo && (
//         <>
//           <DialogHeader>Payment {paymentInfo.status}</DialogHeader>
//           <DialogBody className="text-center">
//             <p>Your order has been placed successfully!</p>
//             <p>
//               <strong>Amount Paid:</strong> &#8358; {paymentInfo.totalPrice}
//             </p>
//           </DialogBody>
//           <DialogFooter>
//             <Button variant="gradient" color="green" onClick={handleOpen}>
//               <span>Close</span>
//             </Button>
//             <Link className="ml-5 mr-5" to="/user/orders">
//               My Orders{" "}
//             </Link>
//           </DialogFooter>
//         </>
//       )}
//     </Dialog>
//   );
// }

export default function Home() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [paymentCompleteOpen, setPaymentCompleteOpen] = useState(false);
  // const [paymentInfo, setPaymentInfo] = useState(null);

  // useEffect(() => {
  //   if (searchParams.has("reference")) {
  //     const reference = searchParams.get("reference");

  //     async function verifyPayment() {
  //       try {
  //         const response = await axiosInstance.post(
  //           `/payment/verify?reference=${reference}`
  //         );
  //         // console.log(response);
  //         // console.log(response.data.paymentData);
  //         // If payment verification is successful, open the PaymentComplete modal
  //         if (
  //           response &&
  //           response.status === 200 &&
  //           response.statusText === "OK"
  //         ) {
  //           setPaymentCompleteOpen(true);
  //           setPaymentInfo(response.data.paymentData);
  //           setSearchParams({});
  //         }
  //         // Set paymentInfo to the data from the response
  //       } catch (error) {
  //         console.error("Error verifying payment:", error);
  //       }
  //     }

  //     verifyPayment();
  //   }
  // }, [searchParams, setSearchParams]);

  // const handlePaymentCompleteClose = () => {
  //   setPaymentCompleteOpen(false);
  // };

  return (
    <>
      <Hero />
      <div className="w-full">
        <div className="flex items-center p-6 justify-center my-6 rounded-lg">
          <h1 className="text-black text-4xl font-bold font-inter mb-3 text-center leading-tight">
            Shopping Made Simple!
          </h1>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between my-10 p-6 space-y-6 lg:space-y-0 lg:space-x-8 w-full lg:w-[85%] mx-auto">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={about_home} // Replace with actual image path
              alt="Person pushing a cart"
              className="rounded-full shadow-lg w-3/4 lg:w-full bg-gray-600"
            />
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold text-black mb-4">About Us</h2>
            <p className="text-gray-700 leading-relaxed text-[16px] font-inter">
              Welcome to our online store! We aim to make shopping easier, more
              convenient, and enjoyable. Our platform is designed with you in
              mind, offering a wide variety of products at your fingertips. Shop
              with us for the best deals and a seamless experience!
            </p>
          </div>
        </div>

        <Category />
        {/* <LimitedStock />
        <Products />
        <Special />
        <Tsp />
        <Featured />
        <Explore /> */}
      </div>
      {/* <Reviews /> */}
      <About />
      {/* <Join /> */}
      {/* </div> */}
      {/* <PaymentComplete
        open={paymentCompleteOpen}
        handleOpen={handlePaymentCompleteClose}
        paymentInfo={paymentInfo}
      /> */}
    </>
  );
}
