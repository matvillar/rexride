import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Link from 'next/link';
import Image from 'next/image';

import { FaEllipsisV } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

type Props = {
  id: Id<'conversations'>;
  imageUrl: string;
  username: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
};

const DirectChatItem = ({
  id,
  imageUrl,
  username,
  lastMessageContent,
  lastMessageSender,
  options,
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative">
              <FaEllipsisV />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options?.map((opt, id) => (
              <DropdownMenuItem
                key={id}
                className={cn('font-semibold', {
                  'text-red-500': opt.destructive,
                })}
                onClick={opt.onClick}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
};

export default DirectChatItem;
