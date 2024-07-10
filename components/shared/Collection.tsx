import { CollectionParams } from '@/lib/constants/types/CollectionParams';
import React from 'react';
import SmallRideCard from './SmallRideCard';

const Collection = async ({
  data,
  noRidesTitle,
  noRidesForSpecificLocation,
  collectionType,
  limit,
  page,
  totalPage = 0,
  urlParamName,
}: CollectionParams) => {
  return (
    <section className="p-5">
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
            <SmallRideCard data={data} />
          </ul>
        </div>
      ) : (
        <div className="flex-center rounded-[14px] py-28 text-center">
          <h3 className="font-bold text-xl">{noRidesTitle}</h3>
        </div>
      )}
    </section>
  );
};

export default Collection;
