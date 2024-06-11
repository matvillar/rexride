import React from 'react';
import { ItemParams } from '../../lib/constants/types/ItemParams';

const Item = ({ label, icon: Icon }: ItemParams) => {
  return (
    <>
      <div
        role="button"
        className="flex items-center justify-center cursor-pointer"
      >
        <div className="flex text-black hover:text-red-500 transition-all">
          {Icon && <Icon size={24} />}

          <span className="font-semibold ml-3 uppercase">{label}</span>
        </div>
      </div>
    </>
  );
};

export default Item;
