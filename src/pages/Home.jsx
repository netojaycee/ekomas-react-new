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
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function PaymentComplete({ open, handleOpen, paymentInfo }) {
  return (
    <Dialog open={open} handler={handleOpen}>
      {paymentInfo && (
        <>
          <DialogHeader>Payment {paymentInfo?.data?.status}</DialogHeader>
          {/* Display payment information */}
          <DialogBody>
            {paymentInfo?.message}
            <ul>
              <li>Transaction ID: {paymentInfo?.data?.id}</li>
              <li>name: {paymentInfo?.data?.metadata?.customerName}</li>

              <li>email: {paymentInfo?.data?.customer?.email}</li>
            </ul>
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Close</span>
            </Button>
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
          const response = await axios.get(
            `/payment/verify?reference=${reference}`
          );
          console.log(response.data);
          // If payment verification is successful, open the PaymentComplete modal
          setPaymentCompleteOpen(true);
          // Set paymentInfo to the data from the response
          setPaymentInfo(response.data);
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
      {/* <Category /> */}
      <Products />
      <Special />
      <Tsp />
      <Featured />
      {/* <Explore /> */}
      {/* <Reviews /> */}
      <About />
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
