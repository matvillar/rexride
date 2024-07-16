import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Link from 'next/link';
import Image from 'next/image';

import DCDropDownMenu from './DCDropDownMenu';

type Props = {
  id: Id<'conversations'>;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
};

const DirectChatItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
}: Props) => {
  return (
    <Link
      href={`/messages/${id}`}
      className="w-full flex justify-between p-2 shadow-sm border-b-2"
    >
      <div className="flex gap-4">
        <Image
          src={imageUrl}
          alt={username}
          className="w-full h-full rounded-full"
          width={24}
          height={24}
        />
        <div className="flex flex-col">
          <h4 className="font-bold">{username}</h4>
          {lastMessageSender && lastMessageContent ? (
            <span className="flex text-sm text-gray-500 overflow-ellipsis truncate">
              <p className="font-semibold">
                {lastMessageSender}
                {':'}&nbsp;
              </p>{' '}
              <p className="truncate text-gray-400  overflow-ellipsis">
                {lastMessageContent}
              </p>
            </span>
          ) : (
            <p className="text-sm truncate">Last Message</p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="text-gray-400">
          <DCDropDownMenu />
        </div>
      </div>
    </Link>
  );
};

export default DirectChatItem;
