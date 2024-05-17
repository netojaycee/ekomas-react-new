import React from "react";
import exploreImage from "../../assets/images/explore/explore.png";
import BlogItem from "../BlogItem";



const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

const dummyData = [
  {
    title: "Unveiling the Power of: A Comprehensive Guide",
    description:
      "Dive deep into the features and benefits of. Include high-quality images, customer testimonials (if available), and use cases. Briefly mention complementary products for upselling opportunities.",
    type: "product_spotlight",
    date: today,
  },
  {
    title: "3 Must-Have Gadgets for Tech Enthusiasts",
    description:
      "Create a collection featuring Cards that cater to tech enthusiasts. Highlight the synergy between the products and how they can elevate the user experience.",
    type: "curated_collection",
    date: today,
  },
  {
    title: "Top Tips for Choosing the Perfect [Product Category of Card 3]",
    description:
      "Offer valuable advice related to your products. This could involve a buying guide, troubleshooting tips, or seasonal recommendations for Card 3.",
    type: "educational_content",
    date: today,
  },
  {
    title: "Real People, Real Results: How Our Customers Use Cards 4 & 5",
    description:
      "Feature customer success stories, reviews, or photos using Cards 4 & 5. Ensure you have permission to use customer content. This builds trust and authenticity with potential buyers.",
    type: "user_generated_content",
    date: today,
  },
  {
    title: "Elevate Your Style with Our Latest Collection",
    description:
      "Showcase different ways to style Cards 1, 2, & 3. Include high-quality lifestyle images and provide product links for easy purchase.",
    type: "lookbook",
    date: today,
  },
  {
    title: "Celebrate [Holiday/Event] with These Gift Ideas (Cards 4, 5, & 6)",
    description:
      "Tailor your blog to a specific holiday, event, or seasonal trend. Recommend Cards 4, 5, & 6 and create a sense of urgency with limited-time offers or promotions.",
    type: "trend_and_event",
    date: today,
  },
];

export default function Explore() {
  return (
    <div className="p-[30px] bg-gray-200 mt-5">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-center text-[#bf2b2b] font-bold text-2xl">
            Explore YOA-mat
          </h1>
        </div>
        <div className="md:mt-[30px] mt-3 w-[90%] mx-auto flex flex-col md:flex-row gap-4">
          {dummyData.slice(0, 4).map((item) => (
          <BlogItem  item={item} />
        
          ))}
        </div>
      </div>
    </div>
  );
}
