import React from 'react';
import MyCard from './MyCard';

const SearchRide = () => {
  return (
    <>
      <MyCard>
        <h1 className="text-2xl font-bold">Search for a ride</h1>
        <form className="flex flex-col mt-5">
          <label className="text-sm font-semibold">From</label>
          <input
            type="text"
            placeholder="Enter your location"
            className="border-2 border-gray-200 p-2 rounded mt-1"
          />
          <label className="text-sm font-semibold mt-3">To</label>
          <input
            type="text"
            placeholder="Enter your destination"
            className="border-2 border-gray-200 p-2 rounded mt-1"
          />
          <button className="bg-black text-white rounded p-2 mt-3 hover:bg-white hover:text-black transition-all ">
            Search
          </button>
        </form>
      </MyCard>
    </>
  );
};

export default SearchRide;
