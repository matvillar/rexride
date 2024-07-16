'use client';
import React from 'react';
import TopRightSideChat from './TopRightSideChat';
import BottomRightSideChat from './BottomRightSideChat';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

type Props = {
  data: Id<'conversations'>;
};

const RightSideChat = () => {
  return <div className="">oelo</div>;

  // return conversation === undefined ? (
  //   <div className="w-full h-full items-center justify-center">
  //     <Loader2 className="w-10 h-10" />
  //   </div>
  // ) : conversation === null ? (
  //   <div className="w-full h-full items-center justify-center">
  //     No conversation found
  //   </div>
  // ) : (
  //   <div className="flex flex-col">
  //     <TopRightSideChat
  //       imageUrl={conversation.otherMember.imageUrl}
  //       name={conversation.otherMember.username || 'Chat Time'}
  //     />
  //     <BottomRightSideChat />
  //   </div>
  // );
};

export default RightSideChat;
