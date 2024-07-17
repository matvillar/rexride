'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { useRouter } from 'next/navigation';

type Props = {
  conversationId?: Id<'conversations'>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function RemoveFriend({ conversationId, open, setOpen }: Props) {
  const router = useRouter();
  const { mutate: removeFriend, pending } = useMutationState(
    api.friend.removeFriend
  );

  const handleRemoveFriend = async () => {
    await removeFriend({ conversationId })
      .then(() => {
        toast.success('Friend removed');
        router.push('/messages');
      })
      .catch((err) => {
        toast.error(
          err instanceof ConvexError ? err.message : 'Something wrong'
        );
      });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All messages will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveFriend;
