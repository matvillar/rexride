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

const DCDropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <FaEllipsisV />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Add your notification items here */}
        <DropdownMenuItem onClick={() => console.log('pepe')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('pepe')}>
          Delete Chat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('pepe')}>
          Remove Friend
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DCDropDownMenu;
