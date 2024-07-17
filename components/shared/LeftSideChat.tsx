'use client';
import React, { use, useState } from 'react';
import { Input } from '../ui/input';
import { useQuery } from 'convex/react';
import AddChat from '../forms/AddChat';
import DirectChatItem from './DirectChatItem';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import RemoveFriend from './RemoveFriend';
import { Id } from '@/convex/_generated/dataModel';
import { useParams } from 'next/navigation';

const LeftSideChat = () => {
  const conversations = useQuery(api.conversations.getConversations);

  // get the conversation id

  const [removeFriendDialog, setRemoveFriendDialog] = useState(false);
  const [goToProfileDialog, setGoToProfileDialog] = useState(false);
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
                <>
                  <RemoveFriend
                    open={removeFriendDialog}
                    setOpen={setRemoveFriendDialog}
                    conversationId={convo.conversation._id}
                  />
                  <DirectChatItem
                    key={convo.conversation._id}
                    id={convo.conversation._id}
                    imageUrl={convo.otherMember?.imageUrl || ''}
                    username={convo.otherMember?.username || ''}
                    lastMessageContent={convo.lastMessage?.content || ''}
                    lastMessageSender={convo.lastMessage?.sender || ''}
                    options={[
                      {
                        label: 'Remove friend',
                        destructive: true,
                        onClick: () => setRemoveFriendDialog(true),
                      },
                      {
                        label: 'Go to Profile',
                        destructive: false,
                        onClick: () => setGoToProfileDialog(true),
                      },
                    ]}
                  />
                </>
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
