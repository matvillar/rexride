import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaEllipsisV } from 'react-icons/fa';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  destructive: boolean;
  onClick: () => void;
};

const DCDropDownMenu = ({ label, destructive, onClick }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <FaEllipsisV />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Add your notification items here */}
        <DropdownMenuItem
          className={cn('font-semibold', { 'text-red-500': destructive })}
          onClick={() => onClick}
        >
          {label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DCDropDownMenu;
