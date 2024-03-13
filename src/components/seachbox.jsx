import React from "react";

const Searchbox = ({ placeholder }) => {
  const [search, setSearch] = React.useState("");
  const onChange = (e) => setSearch(e.target.value);
  return (
    <div className="w-[60%] flex gap-4 relative h-9">
      <input
        type="text"
        value={search}
        onChange={onChange}
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
