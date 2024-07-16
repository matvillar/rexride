'use client';
import LeftSideChat from '@/components/shared/LeftSideChat';
import RightSideChat from '@/components/shared/RightSideChat';
import TopRightSideChat from '@/components/shared/TopRightSideChat';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';

import { useParams } from 'next/navigation';
import BodyChat from './_component/BodyChat';
import ChatInput from './_component/ChatInput';

// type Props = {
//   params: { conversationId: Id<'conversations'> };
// };

const ChatsPage = () => {
  const { chatId } = useParams();

  const conversation = useQuery(api.conversation.getConversation, {
    id: chatId as Id<'conversations'>,
  });

  return (
    <>
      <section className="md:py-10 mt-10">
        <div className="flex max-w-7xl bg-white shadow-md rounded-lg lg:mx-auto w-full min-h-[560px]">
          <div className="hidden w-full lg:block lg:w-1/3 p-5 lg:border-r border-gray-400">
            <LeftSideChat />
          </div>

          <div className="flex flex-col w-full lg:w-2/3 chat-bg rounded-r-lg">
            {conversation === undefined ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 />
              </div>
            ) : conversation === null ? (
              <div className="w-full h-full flex items-center justify-center">
                Something wrong
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <TopRightSideChat
                  imageUrl={conversation.otherMember.imageUrl}
                  name={conversation.otherMember.username || 'Chat Time'}
                />
                <BodyChat />
                <ChatInput />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatsPage;
