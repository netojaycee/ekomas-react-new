import React from 'react';
import searchBtn from '../assets/svg/search-normal.svg';

const Searchbox = ({ placeholder }) => {
  return (
    <div className="w-[60%] flex gap-4 relative h-9">
      <input
        type="text"
        className="w-full outline-none px-4 text-black h-full border py-0 font-medium text-sm"
        placeholder={placeholder}
      />
      <button className=" text-white px-4 rounded-none bg-secondary duration-300 transform hover:scale-115 hover:bg-red-500 transition ease-linear">
        Search
      </button>
    </div>
  );
};

export default Searchbox;
