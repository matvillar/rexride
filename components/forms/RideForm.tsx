'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RideFormParams } from '@/lib/constants/types/RideFormParams';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { rideValidation } from '@/lib/validations/ride.validation';
import { FaRegCalendarAlt } from 'react-icons/fa';
import * as z from 'zod';
import { RideDefaultValues } from '@/lib/constants/others/RideDefaultValues';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { createRide } from '@/lib/actions/ride.actions';
import { useRouter } from 'next/navigation';

const RideForm = ({ userId, type }: RideFormParams) => {
  const initValues = RideDefaultValues;
  const router = useRouter();
  const form = useForm<z.infer<typeof rideValidation>>({
    resolver: zodResolver(rideValidation),
    defaultValues: initValues,
  });

  const onSubmit = async (values: z.infer<typeof rideValidation>) => {
    const rideData = {
      ...values,
      pricePerSeat: Number(values.pricePerSeat), // Ensure it's a number
      description: values.description ?? undefined,
    };
    if (type === 'Create') {
      try {
        const newRide = await createRide({
          userId,
          rideEvent: rideData,
          path: '/profile',
        });
        if (newRide) {
          router.push(`/rides/${newRide._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 bg-red-50 p-5 md:p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
        >
          <FormField
            control={form.control}
            name="rideType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base-semibold text-light-2 text-md">
                  Are you a driver or a passenger for this ride?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="driver"
                    {...field}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="driver"
                        id="driver"
                        checked={field.value === 'driver'}
                      />
                      <Label htmlFor="driver">Driver</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="passenger"
                        id="passenger"
                        checked={field.value === 'passenger'}
                      />
                      <Label htmlFor="passenger">Passenger</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex text-center items-center bg-white rounded-full px-4">
                    <FaLocationDot />
                    <Input
                      className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important"
                      type="text"
                      placeholder="Enter City of Departure"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dropOffLocation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex text-center items-center bg-white rounded-full px-4">
                    <FaLocationDot />
                    <Input
                      className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important"
                      type="text"
                      placeholder="Enter City of Arrival"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex text-center  items-center bg-white rounded-full ">
                    <FaRegCalendarAlt className="m-4" />
                    <p className="text-gray-600 mr-3">Start Date: </p>
                    <DatePicker
                      className="text-gray-600 cursor-pointer"
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <FormField
              control={form.control}
              name="seatsAvailable"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base-semibold text-light-2 text-md">
                    Number of Seats Available
                  </FormLabel>
                  <div className="flex ">
                    <Button
                      type="button"
                      onClick={() => {
                        if (field.value === 1) return;
                        form.setValue('seatsAvailable', field.value - 1);
                      }}
                    >
                      -
                    </Button>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="w-[40px] text-center mx-3 focus-visible:ring-offset-0 focus-visible:ring-transparent !important"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => {
                        form.setValue('seatsAvailable', field.value + 1);
                      }}
                    >
                      +
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricePerSeat"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base-semibold text-light-2 text-md">
                    Price per seat
                  </FormLabel>

                  <FormControl>
                    <div className="flex text-center items-center bg-white rounded-full px-4">
                      <BsCurrencyDollar />
                      <Input
                        type="number"
                        {...field}
                        onChange={() =>
                          form.setValue('pricePerSeat', Number(field.value))
                        }
                        className="rounded-2xl focus-visible:ring-offset-0 border-none focus-visible:ring-transparent !important"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row"></div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Description (Optional)"
                      {...field}
                      className="rounded-2xl focus-visible:ring-offset-0 focus-visible:ring-transparent !important"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className=" hover:bg-red-600 text-white p-regular-16 px-4 py-3 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent !important"
          >
            {form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RideForm;
