import Link from 'next/link';
import React from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoMdSettings } from 'react-icons/io';
import { cn } from '@/lib/utils';

type Props = {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
};

const TopRightSideChat = ({ imageUrl, name, options }: Props) => {
  return (
    <div className="bg-white border-gray-200 border-b-2 shadow-xl p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="block lg:hidden">
            <RiArrowLeftSLine size={24} />
          </Link>
          <Image
            src={imageUrl || '/avatar.svg'}
            alt={name}
            className="rounded-full"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">{name}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative">
                <IoMdSettings size={24} />
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
      </div>
    </div>
  );
};

export default TopRightSideChat;
