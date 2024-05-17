import React from 'react'

const RefundPolicy = () => {
  return (
    <div className="flex flex-col bg-gray-300 w-full mx-auto justify-center p-10">
      <div className="flex flex-col gap-3 bg-white w-[90%] mx-auto p-5 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Our Refund Policy</h2>
        <p className="text-gray-700 leading-loose">
          This Refund Policy describes the conditions under which you can request
          a refund for a product purchased from our website, [Your Website URL].
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Eligibility for Refunds</h3>

        <p className="text-gray-700 leading-loose">
          Generally, refunds are offered within [Number] days of purchase for
          unused and unopened items. After this period, or if the item has been
          used or opened, we may not be able to offer a full refund.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">How to Request a Refund</h3>

        <p className="text-gray-700 leading-loose">
          To request a refund, please contact us at [Your Email Address]
          within [Number] days of receiving your order. You will need to provide
          your order number and the reason for your return.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Return Shipping</h3>

        <p className="text-gray-700 leading-loose">
          You will be responsible for paying for return shipping costs. We
          recommend using a tracked shipping service when returning an item.
          We are not responsible for lost or damaged packages during return
          shipping.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Processing Refunds</h3>

        <p className="text-gray-700 leading-loose">
          Once we receive your returned item and verify that it meets the
          conditions for a refund, we will process your refund within [Number]
          business days. You will receive a notification email once your refund
          has been issued.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Non-Refundable Items</h3>

        <p className="text-gray-700 leading-loose">
          Some items may not be eligible for refunds, such as digital products,
          custom-made items, or items that have been used or opened. We will
          clearly indicate on the product page if an item is non-refundable.
        </p>

        <p className="text-gray-700 leading-loose mt-6">
          **Please note:** This is a demo content. You should replace the
          bracketed text with your specific information, including your refund
          window, return instructions, who pays for return shipping, refund
          processing time, and any non-refundable items. You may also want to
          include information about exceptions to your policy.
        </p>
      </div>
    </div>
  )
}

export default RefundPolicy
