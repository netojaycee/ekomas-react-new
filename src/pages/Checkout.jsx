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
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../components/Context/AuthContext";
import { CartContext } from "../components/Context/CartContext";
import { useLoading } from "../components/Context/LoadingContext";
import axiosInstance from "../config/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";

export default function Checkout() {
  const location = useLocation();
  const fromCart = location.state?.fromCart;
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const { total, cart } = useContext(CartContext);
  const { setIsLoading } = useLoading();

  const [deliveryAddress, setDeliveryAddress] = useState(auth?.user?.address);
  const [phone, setPhone] = useState(auth?.user?.phone);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [isEditableAd, setIsEditableAd] = useState(false);
  const [isEditablePh, setIsEditablePh] = useState(false);
  if (!fromCart) {
    return <Navigate to="/cart" />;
  }
  const deliveryFee = 500;
  const PackagingFee = 700;
  const amount = parseInt((deliveryFee + PackagingFee + total) * 100);
  const customerEmail = auth?.user?.email;
  const customerId = auth?.user?.userId;
  const customerName = auth?.user?.name;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProofOfPayment(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db0zguvf");
    formData.append("folder", "ProofOfPayment");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgz5bgdzc/auto/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

  const handleConfirmOrder = async () => {
    try {
      if (!proofOfPayment || !deliveryAddress || !phone) {
        toast.error("please enter all required fields");
        return;
      }
      setIsLoading(true);

      // Check if a file is uploaded
      let imageUrl = null;
      if (proofOfPayment) {
        imageUrl = await uploadFile(proofOfPayment);
      }

      // Prepare cart items data for metadata
      const cartData = cart.map((item) => ({
        id: item._id,
        name: item.name,
        category: item.categoryId,
        price: item.price,
        image: item.image,
        quantity: item.amount,
      }));

      // Prepare form data for submission (including image)
      const formData = new FormData();
      formData.append("userId", customerId);
      formData.append("name", customerName);
      formData.append("email", customerEmail);
      formData.append("address", deliveryAddress);
      formData.append("phone", phone);
      formData.append("totalPrice", amount / 100);
      formData.append("cart", JSON.stringify(cartData));
      formData.append("proofOfPayment", imageUrl); // Image uploaded by user

      const response = await axiosInstance.post(
        "/order/create-order",
        formData
      );
      // console.log(response);
      setIsLoading(false);
      if (response.status === 201) {
        toast.success(
          "Order placed successfully. Awaiting confirmation upon proof of payment."
        );
        navigate("/user/orders");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setIsLoading(false);
    }
  };

  const handleEditClick = (field) => {
    if (field === "address") {
      setIsEditableAd(!isEditableAd);
    } else if (field === "phone") {
      setIsEditablePh(!isEditablePh);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2 w-[95%] mx-auto font-inter h-screen">
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
                    style={{ color: "#FF3E3E" }}
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
                      required
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
                      style={{ color: "#FF3E3E" }}
                      size="lg"
                    />
                  </button>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#FF3E3E" }}
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
                      required
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
                      style={{ color: "#FF3E3E" }}
                      size="lg"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Details and Payment Proof Card */}
            <div className="flex flex-col w-[90%] mx-auto p-5 mt-5 border border-gray-300 rounded-md shadow-md">
              <h3 className="font-bold text-lg">Payment Instructions</h3>
              <p className="text-sm my-2">
                Please make a bank transfer to the account below and upload the
                proof of payment.
              </p>
              <div className="my-3">
                <p>
                  <strong>Bank Name:</strong> First Bank of Nigeria
                </p>
                <p>
                  <strong>Account Name:</strong> XYZ Delivery Services
                </p>
                <p>
                  <strong>Account Number:</strong> 1234567890
                </p>
              </div>
              <div className="my-3">
                <Input
                  type="file"
                  label="Upload proof of payment"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="md:flex-[30%] md:mx-auto">
            <div className="flex flex-col mx-auto p-3 shadow-lg w-[80%] md:w-[60%] gap-5">
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
                <div className="flex flex-row justify-between text-sm ">
                  <p>Subtotal</p>
                  <p>N {total}</p>
                </div>
              </div>
              <div className="font-bold flex flex-row justify-between">
                <p>Total</p>
                <p>N {deliveryFee + PackagingFee + total}</p>
              </div>
              <button
                // disabled={!proofOfPayment || !deliveryAddress || !phone}
                onClick={handleConfirmOrder}
                className="bg-primary my-2 p-2 rounded-md text-white"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
