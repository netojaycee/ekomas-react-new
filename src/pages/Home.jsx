import React, { useEffect, useState } from "react";
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
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link, useSearchParams } from "react-router-dom";
import LimitedStock from "../components/Home/LimitedStock";
import axiosInstance from "../config/axiosInstance";

function PaymentComplete({ open, handleOpen, paymentInfo }) {
  return (
    <Dialog open={open} handler={handleOpen}>
      {paymentInfo && (
        <>
          <DialogHeader>Payment {paymentInfo.status}</DialogHeader>
          <DialogBody className="text-center">
            <p>Your order has been placed successfully!</p>
            <p>
              <strong>Amount Paid:</strong> &#8358; {paymentInfo.totalPrice}
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Close</span>
            </Button>
            <Link className="ml-5 mr-5" to="/user/orders">My Orders </Link>
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentCompleteOpen, setPaymentCompleteOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (searchParams.has("reference")) {
      const reference = searchParams.get("reference");

      async function verifyPayment() {
        try {
          const response = await axiosInstance.post(
            `/payment/verify?reference=${reference}`
          );
          // console.log(response);
          // console.log(response.data.paymentData);
          // If payment verification is successful, open the PaymentComplete modal
          if (
            response &&
            response.status === 200 &&
            response.statusText === "OK"
          ) {
            setPaymentCompleteOpen(true);
            setPaymentInfo(response.data.paymentData);
            setSearchParams({});
          }
          // Set paymentInfo to the data from the response
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      }

      verifyPayment();
    }
  }, [searchParams]);

  const handlePaymentCompleteClose = () => {
    setPaymentCompleteOpen(false);
  };

  return (
    <>
      <Hero />
      <div className="w-full lg:w-[60%] mx-auto">
        <Category />
        <LimitedStock />
        <Products />
        <Special />
        <Tsp />
        <Featured />
        <Explore />
      </div>
      {/* <Reviews /> */}
      {/* <About /> */}
      {/* <Join /> */}
      {/* </div> */}
      <PaymentComplete
        open={paymentCompleteOpen}
        handleOpen={handlePaymentCompleteClose}
        paymentInfo={paymentInfo}
      />
    </>
  );
}
