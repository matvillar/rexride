import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

type Props = {
  fromCurrUser: boolean;
  senderImageUrl: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: string;
};

const Messages = ({
  fromCurrUser,
  senderImageUrl,
  senderName,
  content,
  createdAt,
  lastByUser,
  type,
}: Props) => {
  const formattedTime = (timestamp: number) => {
    return format(timestamp, 'HH:mm');
  };
  return (
    <div className={cn('flex items-end', { 'justify-end': fromCurrUser })}>
      <div
        className={cn('flex flex-col w-full mx-2', {
          'order-1 items-end': fromCurrUser,
          'order-2 items-start': !fromCurrUser,
        })}
      >
        <div
          className={cn('px-4 py-2 rounded-lg max-w-[70%]', {
            'bg-blue-200 text-lg': fromCurrUser,
            'bg-slate-200 text-lg': !fromCurrUser,
            'rounded-br-none': !lastByUser && fromCurrUser,
            'rounded-bl-none': !lastByUser && !fromCurrUser,
          })}
        >
          {type === 'text' ? (
            <p className="text-wrap break-words whitespace-pre-wrap">
              {content}
            </p>
          ) : null}
          <p
            className={cn('text-xs flex w-full my-1', {
              'text-primary-foreground justify-end': fromCurrUser,
              'text-secondary-foreground justify-start': !fromCurrUser,
            })}
          >
            {formattedTime(createdAt)}
          </p>
        </div>
      </div>

      <Image
        src={senderImageUrl}
        alt={senderName}
        width={40}
        height={40}
        className={cn('rounded-full', {
          'order-2': fromCurrUser,
          'order-1': !fromCurrUser,
          invisible: lastByUser,
        })}
      />
    </div>
  );
};

export default Messages;
