import React from 'react';
import MyCard from './MyCard';

const SuggestedRides = () => {
  return (
    <>
      <MyCard>
        <h1 className="text-2xl font-bold">Suggested Rides</h1>
        <div className="flex flex-col mt-5">
          <div className="flex items-center gap-3">
            <img src="/" alt="Car" className="w-10 h-10" />
            <div>
              <h1 className="font-semibold">Lagos to Abuja</h1>
              <p className="text-sm">Price: N10,000</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <img src="/" alt="Car" className="w-10 h-10" />
            <div>
              <h1 className="font-semibold">Lagos to Ibadan</h1>
              <p className="text-sm">Price: N5,000</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <img src="/car.svg" alt="Car" className="w-10 h-10" />
            <div>
              <h1 className="font-semibold">Lagos to Ogun</h1>
              <p className="text-sm">Price: N3,000</p>
            </div>
          </div>
        </div>
      </MyCard>
    </>
  );
};

export default SuggestedRides;
