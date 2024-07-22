import { IRide } from '@/lib/constants/interfaces/IRide';
import {
  formatDateFromIso,
  formatTimeFromIso,
  toCapitalize,
} from '@/lib/utils';
import React from 'react';

type Props = {
  data: IRide;
};

const MyRexRidesCard = ({ data }: any) => {
  return (
    <div key={data._id} className="flex justify-center">
      <div className="group min-h-52 min-w-72 relative flex w-full flex-col overflow-hidden bg-white border-4 border-black rounded-lg p-4 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="flex mb-3">
          <h2 className="flex items-center pl-5 font-bold text-lg"></h2>
        </div>
      </div>
    </div>
  );
};

export default MyRexRidesCard;
