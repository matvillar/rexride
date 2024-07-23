import SearchRide from '@/components/shared/SearchRide';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SearchParams } from '@/lib/constants/types/SearchParams';
import { getReservationsByRide } from '@/lib/actions/reservation.actions';
import { IReservationItem } from '@/lib/constants/interfaces/IReservation';
import { formatDateTimeOther, formatPrice } from '@/lib/utils';

const page = async ({ searchParams }: SearchParams) => {
  const rideId = (searchParams?.rideId as string) || '';
  const searchText = (searchParams?.query as string) || '';

  const reservations = await getReservationsByRide({
    rideId,
    searchString: searchText,
  });
  console.log('reservations', reservations);
  return (
    <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full items-center justify-center sm:justify-between">
      <h1 className="text-2xl font-semibold">Reservations</h1>
      <SearchRide />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ReservationID</TableHead>
            <TableHead>Trip To</TableHead>
            <TableHead>Passenger Name</TableHead>
            <TableHead>Created on</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations && reservations.length === 0 ? (
            <TableRow className="border-b">
              <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                No reservations found.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {reservations &&
                reservations.map((row: IReservationItem) => (
                  <TableRow
                    key={row._id}
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}
                  >
                    <td className="min-w-[250px] py-4 text-primary-500">
                      {row._id}
                    </td>
                    <td className="min-w-[200px] flex-1 py-4 pr-4">
                      {row.rideTitle}
                    </td>
                    <td className="min-w-[150px] py-4">{row.buyer.name}</td>
                    <td className="min-w-[100px] py-4">
                      {formatDateTimeOther(row.createdAt).dateTime}
                    </td>
                    <td className="min-w-[100px] py-4 text-right">
                      {formatPrice(row.totalAmount)}
                    </td>
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
