import { Id } from '@/convex/_generated/dataModel';
import React from 'react';
import { Card } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { FaRegUser } from 'react-icons/fa';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Check, X } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useMutationState } from '@/hooks/useMutationState';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

type Props = {
  id: Id<'requests'>;
  imageUrl: string;
  username: string;
  email: string;
};

const NotificationItem = ({ id, imageUrl, username, email }: Props) => {
  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.denyRequest
  );
  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
    api.request.acceptRequest
  );
  return (
    <div className="w-full p-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 truncate">
        <Image
          className="rounded-full"
          src={imageUrl}
          alt="User Image"
          width={50}
          height={50}
        />
        <div className="flex flex-col truncate">
          <h3>{username}</h3> <p>{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="bg-blue-500"
          onClick={() => {
            acceptRequest({ requestId: id })
              .then(() => {
                toast.success('Request Accepted');
              })
              .catch((err) => {
                toast.error(
                  err instanceof ConvexError ? err.data : 'An error occurred'
                );
              });
          }}
          disabled={denyPending || acceptPending}
        >
          <Check />
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            denyRequest({ requestId: id })
              .then(() => {
                toast.success('Request Denied');
              })
              .catch((err) => {
                toast.error(
                  err instanceof ConvexError ? err.data : 'An error occurred'
                );
              });
          }}
          disabled={denyPending || acceptPending}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default NotificationItem;
