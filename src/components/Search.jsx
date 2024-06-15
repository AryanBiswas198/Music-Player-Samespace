import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Make sure to install react-icons

const Search = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex relative justify-between mb-4">
      <input
        type="text"
        placeholder="Search Song, Artist"
        className="py-2 px-4 leading-7 text-lg bg-white bg-opacity-20 rounded-lg w-full text-gray-100"
        onChange={handleSearch}
      />
      <FaSearch className="absolute top-3.5 right-5 cursor-pointer text-gray-500" />
    </div>
  );
};

export default Search;
