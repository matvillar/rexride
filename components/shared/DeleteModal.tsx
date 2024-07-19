'use client';
import React, { useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import { deleteRideById } from '@/lib/actions/ride.actions';
import { Button } from '../ui/button';

const DeleteModal = ({ rideId }: { rideId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="inline-block">
          <Button className="hover:bg-transparent hover:text-red-500">
            <RiDeleteBin5Fill size={24} />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your ride
            event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const result = await deleteRideById({ rideId, path: pathname });
                if (result.success) {
                  router.push('/');
                }
              })
            }
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
