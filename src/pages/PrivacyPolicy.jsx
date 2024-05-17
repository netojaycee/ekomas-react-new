import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col bg-gray-300 w-full mx-auto justify-center p-10">
      <div className="flex flex-col gap-3 bg-white  w-[90%] mx-auto p-5 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Our Privacy Policy</h2>
        <p className="text-gray-700 leading-loose">
          This Privacy Policy describes how [Your Company Name] ("we", "us", or
          "our") collects, uses, and discloses your personal information when
          you use our website ([Your Website URL]) (the "Website") or our
          services (collectively, the "Services"). It also describes the choices
          you have associated with your data and how you can contact us about
          your privacy practices.
        </p>

        <h3 className="text-xl font-medium text-gray-800 mt-6">Information We Collect</h3>

        <p className="text-gray-700 leading-loose">
          We collect several different types of information for various purposes
          to improve our Services to you.
        </p>

        <ul className="list-disc ml-5 mt-3 text-gray-700">
          <li>Personal Information:</li>
          <ul className="list-disc ml-2">
            <li>Name (optional)</li>
            <li>Email address</li>
          </ul>
          <li>Usage Data:</li>
          <ul className="list-disc ml-2">
            <li>Information about your browsing activity on the Website.</li>
            <li>Information about your device and internet connection.</li>
          </ul>
        </ul>

        <h3 className="text-xl font-medium text-gray-800 mt-6">How We Use Your Information</h3>

        <p className="text-gray-700 leading-loose">
          We use the information we collect in a variety of ways, including:
        </p>

        <ul className="list-disc ml-5 mt-3 text-gray-700">
          <li>To provide and operate the Services</li>
          <li>To improve our platform</li>
          <li>To personalize your experience</li>
          <li>To send you marketing and promotional communications</li>
          <li>To respond to your inquiries and requests</li>
        </ul>

        <p className="text-gray-700 leading-loose mt-6">
          **Please note:** This is a demo content. You should replace the bracketed
          text with your specific information and add additional details about
          the data you collect, how you use it, and your users' rights. You may
          also want to include sections on data retention, security, and
          children's privacy. It's important to consult with a lawyer to ensure
          your privacy policy complies with all applicable laws and regulations.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
