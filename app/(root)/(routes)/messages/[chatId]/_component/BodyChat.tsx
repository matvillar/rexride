'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react';
import Messages from './Messages';

type Props = {};

function BodyChat({}: Props) {
  const { chatId } = useParams();

  const messages = useQuery(api.messages.getMessages, {
    id: chatId as Id<'conversations'>,
  });
  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(
        ({ message, senderImage, senderName, isCurrentUser }, index) => {
          const lastByUser =
            messages[index - 1]?.message.senderId ===
            messages[index].message.senderId;
          return (
            <Messages
              key={message._id}
              fromCurrUser={isCurrentUser}
              senderImageUrl={senderImage}
              senderName={senderName}
              lastByUser={lastByUser}
              content={message.content}
              createdAt={message._creationTime}
              type={message.type}
            />
          );
        }
      )}
    </div>
  );
}

export default BodyChat;
