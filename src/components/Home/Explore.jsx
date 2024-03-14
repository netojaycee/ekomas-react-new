import React from "react";
import exploreImage from "../../assets/images/explore/explore.png";

const dummyData = [
  {
    id: 1,
    title: "Card 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 2,
    title: "Card 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 3,
    title: "Card 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 4,
    title: "Card 4",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 5,
    title: "Card 5",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
  {
    id: 6,
    title: "Card 6",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis quisque nibh nibh urna eu convallis vulputate mollis aenean. Enim quis dolor quis erat. Massa lorem rhoncus nisi aliquet aliquam.",
  },
];

export default function Explore() {
  return (
    <div className="my-5">
      <hr className="border-gray-300 my-8" />
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-center text-[#bf2b2b] font-bold text-2xl">
            Explore YOA-mat
          </h1>
        </div>
        <div className="md:mt-[50px] mt-3 w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {dummyData.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div>
                <img
                  src={exploreImage}
                  alt={`explore-${item.id}`}
                  className="w-full object-cover p-0"
                />
              </div>
              <div className="flex flex-col mt-4 gap-4">
                <div className="text-[#ff3e3e]">{item.title}</div>
                <div> 
                  <p>{item.description}</p> 
                </div>
                <div>
                  <button className="bg-secondary rounded p-2 text-white">
                    View more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
