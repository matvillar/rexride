'use client';
import React, { useState } from 'react';
import { addChatValidation } from '@/lib/validations/addChat.validation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertDialog } from '../ui/alert-dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useUser } from '@clerk/clerk-react';

import { Button } from '../ui/button';

import { Input } from '../ui/input';
import { toast } from 'sonner';

import { reviewValidation } from '@/lib/validations/review.validation';
import { createReview } from '@/lib/actions/review.actions';

import { Textarea } from '@/components/ui/textarea';
// import { OtherProfilePageParams } from '@/lib/constants/types/OtherProfilePageParams';
type Props = {
  otherUserId: string;
};
const ReviewForm = ({ otherUserId }: Props) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;
  const form = useForm<z.infer<typeof reviewValidation>>({
    resolver: zodResolver(reviewValidation),
    defaultValues: {
      userId,
      reviewedUserId: otherUserId,
      rating: 5,
      comment: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof reviewValidation>) => {
    try {
      const newReview = await createReview({
        userId,
        reviewedUserId: otherUserId,
        rating: values.rating,
        comment: values.comment,
      });
      if (newReview) {
        form.reset();
        toast.success('Review created successfully');
      }
    } catch (error) {
      console.error('Error creating review:', error);
      toast.error('Failed to create review');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex text-center items-center bg-white rounded-full px-4">
                  <Input
                    className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important"
                    type="number"
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
          name="comment"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl className="flex-1 text-medium-bold text-gray-400">
                <Textarea placeholder="Enter Review" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Post Review
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
