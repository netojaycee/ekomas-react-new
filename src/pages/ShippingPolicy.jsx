import React from 'react'

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col bg-gray-300 w-full mx-auto justify-center p-10">
      <div className="flex flex-col gap-3 bg-white  w-[90%] mx-auto p-5 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Our Shipping Policy</h2>
        <p className="text-gray-700 leading-loose">
          This Shipping Policy describes the terms and conditions that apply to
          the shipping of products purchased from our website, [Your Website
          URL].
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Processing Time</h3>

        <p className="text-gray-700 leading-loose">
          We aim to process all orders within [Number] business days after they
          are placed. You will receive a confirmation email with tracking
          information once your order has shipped.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Shipping Rates</h3>

        <p className="text-gray-700 leading-loose">
          We offer several shipping options, with rates depending on the weight
          and destination of your order. You can see the estimated shipping
          costs during checkout.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Delivery Times</h3>

        <p className="text-gray-700 leading-loose">
          Estimated delivery times are based on the shipping method you choose
          and your location. You can find more information about estimated
          delivery times on our shipping information page or during checkout.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">International Shipping</h3>

        <p className="text-gray-700 leading-loose">
          We currently ship to a limited number of countries. You can see if
          your country is included during checkout. International shipping rates
          and delivery times may vary. Please note that you may be responsible
          for any customs duties or import taxes charged by your country.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Tracking Your Order</h3>

        <p className="text-gray-700 leading-loose">
          You will receive a confirmation email with tracking information once
          your order has shipped. You can track your order by clicking on the
          tracking link in the email or visiting our website.
        </p>

        <p className="text-gray-700 leading-loose mt-6">
          **Please note:** This is a demo content. You should replace the
          bracketed text with your specific information, including processing
          times, shipping rates, delivery times, international shipping
          availability, and any other relevant details for your business.
        </p>
      </div>
    </div>
  )
}

export default ShippingPolicy
