import {
  faArrowLeft,
  faLocationDot,
  faPencilAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.png";
import { Input } from "@material-tailwind/react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../components/Context/AuthContext";
import { CartContext } from "../components/Context/CartContext";
import { useLoading } from "../components/Context/LoadingContext";
import axios from "axios";
import { apiUrl } from "../config/env";

export default function Checkout() {
  const location = useLocation();
  // Check if the user has come from the cart page
  const fromCart = location.state?.fromCart;
  // console.log(location)

  // If the user has not come from the cart page, redirect back

  // If the user has not come from the cart page, redirect to the home page
  if (!fromCart) {
    return <Navigate to="/cart" />;
  }

  const { auth } = useContext(AuthContext);
  const { total, cart } = useContext(CartContext);
  const { setIsLoading } = useLoading();

  const [deliveryAddress, setDeliveryAddress] = useState(auth?.user?.address);
  const [phone, setPhone] = useState(auth?.user?.phone);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isEditableAd, setIsEditableAd] = useState(false);
  const [isEditablePh, setIsEditablePh] = useState(false);
  const deliveryFee = 500;
  const PackagingFee = 700;
  const amount = parseInt((deliveryFee + PackagingFee + total) * 100);
  const customerEmail = auth?.user?.email;
  const customerId = auth?.user?.userId;
  const customerName = auth?.user?.name;

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);

      // Prepare cart items data for metadata
      const cartData = cart.map((item) => ({
        id: item._id,
        name: item.name,
        category: item.categoryId,
        price: item.price,
        image: item.image,
        quantity: item.amount,
      }));

      // Prepare metadata object
      const metadata = {
        customerId,
        customerName,
        deliveryAddress,
        phone,
        cart: cartData,
        totalPrice: amount / 100,
      };

      // Send payment request to backend
      let token = localStorage.getItem("user");
      token = token.replace(/['"]+/g, "");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${apiUrl}/payment/payment`,
        { amount, email: customerEmail, metadata },
        { headers }
      );

      const { authorization_url } = response.data.data;

      setIsLoading(false);

      // Redirect user to the payment page
      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error processing payment:", error);
      setIsLoading(false);
      // Handle error - display an error message to the user
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEditClick = (field) => {
    if (field === "address") {
      setIsEditableAd(!isEditableAd); // Toggle editable mode for address
    } else if (field === "phone") {
      setIsEditablePh(!isEditablePh); // Toggle editable mode for phone
    }
  };
  return (
    <>
      <section className="flex flex-col gap-2 w-[95%] mx-auto mt-[100px] font-serif h-screen">
        <div className="flex flex-col gap-2 items-start">
          <Link to="/">
            <img
              src={logo}
              className="object-cover w-full cursor-pointer"
              alt="logo"
            />
          </Link>
          <Link to="/">
            <div className="flex flex-row gap-2 items-center justify-start mt-5">
              <FontAwesomeIcon icon={faArrowLeft} className="" />
              <p className="text-sm">Back to Home</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-9 justify-around">
          <div className="flex flex-col gap-2 items-center flex-[40%]">
            <div className="flex flex-col w-[90%] mx-auto">
              <p className="flex flex-row justify-between font-semibold my-5">
                Delivery Details
              </p>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#A9CA4E" }}
                    size="lg"
                  />
                  {isEditableAd ? (
                    <Input
                      variant="standard"
                      label="Delivery address"
                      placeholder=""
                      className="my-2"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  ) : (
                    <p className="my-2">{deliveryAddress}</p>
                  )}
                  <button
                    onClick={() => handleEditClick("address")}
                    className="bg-transparent border-none outline-none"
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      style={{ color: "#A9CA4E" }}
                      size="lg"
                    />
                  </button>
                </div>
                <div className="flex flex-col gap-2 bg-[#f3bcdf] p-2 w-[40%] text-sm">
                  <p className="font-semibold">15-25 min</p>
                  <p>As soon as possible</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#A9CA4E" }}
                    size="lg"
                  />
                  {isEditablePh ? (
                    <Input
                      variant="standard"
                      label="Add your Phone number"
                      placeholder=""
                      className="my-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <p className="my-2">{phone}</p>
                  )}
                  <button
                    onClick={() => handleEditClick("phone")}
                    className="bg-transparent border-none outline-none"
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      style={{ color: "#A9CA4E" }}
                      size="lg"
                    />
                  </button>
                </div>
              </div>
              {/* <p className="flex flex-row justify-between font-semibold my-5">
                Payment Method
              </p>
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  style={{ color: "#A9CA4E" }}
                  size="lg"
                />
                <Select
                  variant="standard"
                  label="Select Payment method"
                  value={paymentMethod}
                  onChange={(val) => setPaymentMethod(val)}
                >
                  <Option
                    value="card"
                    className="flex flex-row items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faMoneyCheck} />
                    <span>Pay with Card</span>
                  </Option>
                  <Option
                    value="cash"
                    className="flex flex-row items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faMoneyBill1} />
                    <span>Pay with Cash</span>
                  </Option>
                </Select>
              </div> */}
            </div>
          </div>
          <div className="md:flex-[30%] md:mx-auto">
            <div className="flex flex-col mx-auto p-3 shadow-lg w-[80%] md:w-[60%] gap-5 ">
              <div className="flex flex-row items-start font-semibold">
                <p>Summary</p>
              </div>
              <hr className="border-[1/2px] border-black w-[90%]" />
              <div>
                <div className="flex flex-row justify-between text-sm ">
                  <p>Delivery fee</p>
                  <p>N {deliveryFee}</p>
                </div>
                <div className="flex flex-row justify-between text-sm ">
                  <p>Packaging</p>
                  <p>N {PackagingFee}</p>
                </div>
                <div className="flex flex-row justify-between text-sm">
                  <p>SubTotal</p>
                  <p>N {parseFloat(total).toFixed(2)}</p>
                </div>
                <div className="flex flex-row justify-between font-semibold my-5">
                  <p>Total</p>
                  <p>N {parseFloat(amount / 100).toFixed(2)}</p>
                </div>
              </div>
              <button
                className="bg-secondary text-black font-semibold p-2 rounded-md"
                onClick={() => handleConfirmOrder()}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <CardDetails handleOpen={handleOpen} open={open} /> */}
    </>
  );
}
