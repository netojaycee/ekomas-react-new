import React from 'react'

const TermsConditions = () => {
  return (
    <div className="flex flex-col bg-gray-300 w-full mx-auto justify-center p-10">
      <div className="flex flex-col gap-3 bg-white  w-[90%] mx-auto p-5 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Terms and Conditions</h2>
        <p className="text-gray-700 leading-loose">
          These Terms and Conditions ("Terms", "Terms and Conditions",
          "Agreement") govern your access to and use of [Your Website Name]
          ("Website"), operated by [Your Company Name] ("we", "us", or "our").
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Acceptance of Terms</h3>

        <p className="text-gray-700 leading-loose">
          By accessing or using the Website, you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Website.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Changes to Terms</h3>

        <p className="text-gray-700 leading-loose">
          We reserve the right to update or change our Terms and Conditions at
          any time. We will notify you of any significant changes by posting a
          notice on the Website. You are advised to review these Terms and
          Conditions periodically for any changes.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Your Account</h3>

        <p className="text-gray-700 leading-loose">
          If you create an account on the Website, you are responsible for
          maintaining the security of your account and password and for
          restricting access to your computer. You agree to accept
          responsibility for all activities that occur under your account or
          password. We reserve the right to refuse service, terminate accounts,
          and remove content at our sole discretion.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Intellectual Property</h3>

        <p className="text-gray-700 leading-loose">
          The Website and its entire contents, features, and functionality
          (including but not limited to all text, graphics, logos, images, and
          software), are owned by [Your Company Name] or its licensors and
          protected by all applicable copyright, trademark, and other
          intellectual property laws.
        </p>

        <p className="text-gray-700 leading-loose mt-6">
          **Please note:** This is a demo content. You should replace the
          bracketed text with your specific information and add additional
          sections as needed. Some additional sections you may want to
          consider including are:
          * Use of the Website
          * User Generated Content
          * Disclaimers
          * Limitation of Liability
          * Termination
          * Governing Law
          * Dispute Resolution
          * Entire Agreement
        </p>
      </div>
    </div>
  )
}

export default TermsConditions
