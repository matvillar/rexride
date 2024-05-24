import React from 'react';
import { ItemParams } from '../../lib/constants/ItemParams';
const Item = ({ label, icon: Icon }: ItemParams) => {
  return (
    <>
      <div
        role="button"
        className="flex items-center justify-center cursor-pointer"
      >
        <div className="flex text-black hover:text-red-500 transition-all">
          <Icon size={24} />
          <span className="font-bold ml-3 uppercase">{label}</span>
        </div>
      </div>
    </>
  );
};

export default Item;
