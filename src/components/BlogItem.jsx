import React from "react";
import exploreImage from "../assets/images/explore/explore.png";


function truncateDescription(text, maxWords = 10) {
    const words = text.split(/\s+/); // Split by whitespace (any sequence of spaces)
    const truncatedWords = words.slice(0, maxWords); // Slice the first maxWords words
    return truncatedWords.join(" ") + (words.length > maxWords ? "..." : ""); // Join words and add ellipsis if needed
  }
  
  function truncateTitle(text, maxWords = 3) {
    const words = text.split(/\s+/); // Split by whitespace (any sequence of spaces)
    const truncatedWords = words.slice(0, maxWords); // Slice the first maxWords words
    return truncatedWords.join(" ") + (words.length > maxWords ? "..." : ""); // Join words and add ellipsis if needed
  }


export default function BlogItem({item}) {
  return (
    <div
      key={item.id}
      className="flex flex-col shadow-md shadow-gray-400 bg-white pb-3 h-[370px] "
    >
      <div className="w-full h-48 overflow-hidden rounded-t-md">
        <img
          src={exploreImage}
          alt={`explore-${item.id}`}
          className="w-full h-full object-cover p-0"
        />
      </div>
      <div className="flex flex-col mt-2 px-3">
        <div className="text-sm">11 June, 2022</div>
        <h2 className="text-[#ff3e3e] font-semibold h-[45px]">
          {truncateTitle(item.title)}
        </h2>
        <p className="h-[75px]">{truncateDescription(item.description)}</p>
        <div>
          <button className="bg-secondary rounded p-2 text-white">
            View more
          </button>
        </div>
      </div>
    </div>
  );
}
