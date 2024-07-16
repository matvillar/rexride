'use client';
import React from 'react';
import { Input } from '../ui/input';
import { useQuery } from 'convex/react';
import AddChat from '../forms/AddChat';
import DirectChatItem from './DirectChatItem';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';

const LeftSideChat = () => {
  const conversations = useQuery(api.conversations.getConversations);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between p-2 border-b-2">
        <h2 className="font-bold text-2xl">Messages</h2>
        <AddChat />
      </div>
      <div className="flex flex-col items-center justify-center">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="h-full w-full">No Convos Found</p>
          ) : (
            conversations.map((convo) => {
              return (
                <DirectChatItem
                  key={convo.conversation._id}
                  id={convo.conversation._id}
                  imageUrl={convo.otherMember?.imageUrl || ''}
                  username={convo.otherMember?.username || ''}
                  lastMessageContent={convo.lastMessage?.content || ''}
                  lastMessageSender={convo.lastMessage?.sender || ''}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </div>
    </div>
  );
};

export default LeftSideChat;
