import React from 'react';
import searchBtn from '../assets/svg/search-normal.svg';

const Searchbox = ({ placeholder }) => {
  return (
    <div className="w-[60%] flex gap-4 items-center relative h-9 ">
      <input
        type="text"
        className="w-full outline-none px-4 text-black h-full border border-gray-400  py-4 rounded-lg font-medium text-sm"
        placeholder={placeholder}
      />
      <button className=" text-white px-4 bg-secondary py-1.5 rounded-md duration-300 transform hover:scale-115 hover:bg-red-500 transition ease-linear">
        Search
      </button>
    </div>
  );
};

export default Searchbox;
