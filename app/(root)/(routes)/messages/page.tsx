'use client';
import LeftSideChat from '@/components/shared/LeftSideChat';
import RightSideChat from '@/components/shared/RightSideChat';
import React from 'react';

const page = () => {
  return (
    <>
      <section className="md:py-10 ">
        <div className="flex max-w-7xl bg-white shadow-md rounded-lg lg:mx-auto w-full min-h-[560px]">
          <div className="w-full lg:w-1/3 p-5 lg:border-r border-gray-400">
            <LeftSideChat />
          </div>

          <div className="hidden lg:flex justify-center items-center w-2/3 bg-slate-200 rounded-r-lg ">
            <RightSideChat />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
